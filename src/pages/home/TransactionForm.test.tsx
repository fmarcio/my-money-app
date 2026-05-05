import { render, screen, fireEvent } from '@testing-library/react';
import TransactionForm from './TransactionForm';
import { vi, describe, it, expect } from 'vitest';

const mockAddDocument = vi.fn();
vi.mock('../../hooks/useFirestore', () => ({
  useFirestore: () => ({
    addDocument: mockAddDocument,
    response: { isPending: false, success: null },
  }),
}));

describe('TransactionForm Component', () => {
  it('updates input fields on change', () => {
    render(<TransactionForm uid="123" transactions={[]} />);

    const nameInput = screen.getByLabelText(/Transaction name:/i) as HTMLInputElement;
    const amountInput = screen.getByLabelText(/Amount \(\$\):/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Buy Milk' } });
    fireEvent.change(amountInput, { target: { value: '5' } });

    expect(nameInput.value).toBe('Buy Milk');
    expect(amountInput.value).toBe('5');
  });

  it('calls addDocument on form submit', () => {
    render(<TransactionForm uid="123" transactions={[]} />);

    const nameInput = screen.getByLabelText(/Transaction name:/i);
    const amountInput = screen.getByLabelText(/Amount \(\$\):/i);
    const submitBtn = screen.getByRole('button', { name: /Add Transaction/i });

    fireEvent.change(nameInput, { target: { value: 'Rent' } });
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.click(submitBtn);

    expect(mockAddDocument).toHaveBeenCalledWith({
      uid: '123',
      name: 'Rent',
      amount: '1000',
    });
  });
});
