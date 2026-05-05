import { render, screen } from '@testing-library/react';
import TransactionList from './TransactionList';
import { vi, describe, it, expect } from 'vitest';
import { Timestamp } from 'firebase/firestore';
import { Transaction } from '../../types';

vi.mock('../../hooks/useFirestore', () => ({
  useFirestore: () => ({
    deleteDocument: vi.fn(),
    response: { isPending: false, success: null },
  }),
}));

const mockTransactions: Transaction[] = [
  { id: '1', name: 'Coffee', amount: '5', uid: 'user1', createdAt: Timestamp.now() },
  { id: '2', name: 'Lunch', amount: '15', uid: 'user1', createdAt: Timestamp.now() },
];

describe('TransactionList Component', () => {
  it('renders the list of transactions', () => {
    render(<TransactionList transactions={mockTransactions} />);

    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('$5')).toBeInTheDocument();
    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('$15')).toBeInTheDocument();
  });

  it('renders a delete button for each transaction', () => {
    render(<TransactionList transactions={mockTransactions} />);

    const deleteButtons = screen.getAllByRole('button', { name: 'X' });
    expect(deleteButtons).toHaveLength(2);
  });
});
