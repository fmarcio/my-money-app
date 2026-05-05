import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot, query, where, orderBy, DocumentData, WhereFilterOp, OrderByDirection, QueryConstraint } from "firebase/firestore";

export const useCollection = <T extends DocumentData = DocumentData>(
  collectionName: string,
  _query?: [string, WhereFilterOp, any],
  _orderBy?: [string, OrderByDirection]
) => {
  const [documents, setDocuments] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const queryRef = useRef(_query).current;
  const orderByRef = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(projectFirestore, collectionName);

    const queryConstraints: QueryConstraint[] = [];
    if (queryRef) {
      queryConstraints.push(where(...queryRef));
    }
    if (orderByRef) {
      queryConstraints.push(orderBy(...orderByRef));
    }

    const q = query(ref, ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let results: T[] = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id } as T);
        });

        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    return () => unsubscribe();
  }, [collectionName, queryRef, orderByRef]);

  return { documents, error };
};
