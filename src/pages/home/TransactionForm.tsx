import { useState, useEffect, FormEvent } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { Transaction } from '../../types';

interface TransactionFormProps {
  uid: string;
  transactions: Transaction[] | null;
}

export default function TransactionForm({ uid, transactions }: TransactionFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { addDocument, deleteDocuments, response } = useFirestore('transactions');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      amount,
    });
  };

  const handleClearAll = () => {
    if (transactions && transactions.length > 0) {
      if (window.confirm("Are you sure you want to clear all transactions?")) {
        const ids = transactions.map(t => t.id);
        deleteDocuments(ids);
      }
    }
  };

  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type='text'
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type='number'
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button disabled={response.isPending}>
          {response.isPending ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
      
      {transactions && transactions.length > 0 && (
        <button 
          className="btn" 
          onClick={handleClearAll} 
          disabled={response.isPending}
          style={{ marginTop: '10px', backgroundColor: '#e2e2e2', color: '#333' }}
        >
          {response.isPending ? 'Processing...' : 'Clear all Transactions'}
        </button>
      )}
    </>
  );
}
