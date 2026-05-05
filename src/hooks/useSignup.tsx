import { useEffect, useState, useRef } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const isCancelled = useRef(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    displayName: string,
  ): Promise<void> => {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password,
      );

      if (!response) {
        throw new Error('Could not complete sign up');
      }

      await updateProfile(response.user, { displayName });

      if (!isCancelled.current) {
        setIsPending(false);
        setError(null);
      }

      dispatch({ type: 'LOGIN', payload: response.user });
    } catch (error: any) {
      console.log(error.message);

      if (!isCancelled.current) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    isCancelled.current = false;
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return { error, isPending, signup };
};
