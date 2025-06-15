import React, { createContext, ReactElement, ReactNode, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut as firebaseSignOut } from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

type UserType = FirebaseAuthTypes.User | null;

type AuthContextType = {
  user: UserType;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const authContext = createContext<AuthContextType | null>(null);

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await user.getIdToken(true);
          setUser(user);
        } catch (error) {
          console.log("Token cassé ou utilisateur supprimé => déconnexion");
          await firebaseSignOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Erreur de connexion :", error.message);
      throw new Error(error.message || "Échec de la connexion");
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Erreur d'inscription :", error.message);
      throw new Error(error.message || "Échec de l'inscription");
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      console.log('User signed out!');
    } catch (error: any) {
      throw new Error(error.message || "Échec de la déconnexion");
    }
  };



  return (
    <authContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {props.children}
    </authContext.Provider>
  );
};

export { AuthProvider };
