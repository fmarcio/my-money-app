import { useReducer, useEffect, useRef } from "react";
import { projectFirestore, timestamp } from "../firebase/config";
import { collection, addDoc, deleteDoc, doc, DocumentData, writeBatch } from "firebase/firestore";

interface State<T> {
  document: T | null;
  isPending: boolean;
  error: string | null;
  success: boolean | null;
}

type Action<T> =
  | { type: "IS_PENDING" }
  | { type: "ADDED_DOCUMENT"; payload: T }
  | { type: "DELETED_DOCUMENT" }
  | { type: "ERROR"; payload: string };

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = <T,>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case "IS_PENDING":
      return { success: false, isPending: true, error: null, document: null };
    case "ERROR":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case "DELETED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: null,
      };
    default:
      return state;
  }
};

export const useFirestore = <T extends DocumentData = DocumentData>(collectionName: string) => {
  const [response, dispatch] = useReducer<React.Reducer<State<T>, Action<T>>>(
    firestoreReducer as React.Reducer<State<T>, Action<T>>,
    initialState as State<T>
  );
  const isCancelled = useRef(false);

  const ref = collection(projectFirestore, collectionName);

  const dispatchIfNotCancelled = (action: Action<T>) => {
    if (!isCancelled.current) {
      dispatch(action);
    }
  };

  const addDocument = async (data: any) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, { ...data, createdAt });
      
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument as unknown as T,
      });
    } catch (err: any) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const deleteDocument = async (id: string) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(projectFirestore, collectionName, id));
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (error: any) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message || "could not delete" });
    }
  };

  const deleteDocuments = async (ids: string[]) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const batch = writeBatch(projectFirestore);
      ids.forEach((id) => {
        batch.delete(doc(projectFirestore, collectionName, id));
      });
      await batch.commit();
      
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (error: any) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message || "could not delete all" });
    }
  };

  useEffect(() => {
    isCancelled.current = false;
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return { addDocument, deleteDocument, deleteDocuments, response };
};
