import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { Transaction } from "../../types";
import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import EmptyState from "../../components/EmptyState";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection<Transaction>(
    "transactions",
    ["uid", "==", user?.uid],
    ["createdAt", "desc"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && documents.length > 0 && <TransactionList transactions={documents} />}
        {documents && documents.length === 0 && <EmptyState />}
      </div>
      <div className={styles.sidebar}>
        {user && <TransactionForm uid={user.uid} transactions={documents} />}
      </div>
    </div>
  );
}
