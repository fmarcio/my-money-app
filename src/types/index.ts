import { Timestamp } from 'firebase/firestore';

export interface Transaction {
  id: string;
  uid: string;
  name: string;
  amount: string;
  createdAt: Timestamp;
}
