import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Unsubscribe,
  User,
  sendPasswordResetEmail,
} from 'firebase/auth';

import {auth} from '../environment/firebase';
import React, {ReactNode, createContext, useContext, useState} from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  loadingAuth: boolean;
  checkIfLoggedIn: Unsubscribe;
  loggedInUser: User | undefined;
  loginWithEmail: (username: string, password: string) => Promise<void>;
  createEmailAccount: (
    email: string,
    password: string,
    confirmPassword: string,
  ) => void;
  forgotPassword: (email: string) => void;
  logout: () => void;
  userAuthError: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [userAuthError, setUserAuthError] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>();

  const checkIfLoggedIn = onAuthStateChanged(auth, user => {
    if (user) {
      setIsLoggedIn(true);
      setLoadingAuth(false);
      setLoggedInUser(user);
      return true;
    } else {
      setIsLoggedIn(false);
      setLoadingAuth(false);
      setLoggedInUser(undefined);
      return false;
    }
  });

  const logout = async () => {
    try {
      setLoadingAuth(true);
      await signOut(auth);
      setLoadingAuth(false);
    } catch (e) {
      addError('There was a problem logging out of your account');
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setLoggedInUser(userCredential.user);
      checkIfLoggedIn();
    } catch (error: any) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential'
      ) {
        addError('Your email or password was incorrect');
      } else if (error.code === 'auth/too-many-requests') {
        addError(
          'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).] auth/too-many-requests',
        );
      } else {
        addError('There was a problem with logging in');
      }
    }
  };

  const createEmailAccount = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      if (password === confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          setLoggedInUser(userCredential.user);
          checkIfLoggedIn();
        } catch (error: any) {
          if (error.code === 'auth/email-already-in-use') {
            addError('An account with this email already exists');
          }
        }
      } else {
        addError("Passwords don't match");
      }
    } catch (e) {
      addError('There was a problem creating your account');
    }
  };

  const forgotPassword = async (email: string) => {
    console.log('passwordReset', email);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e: any) {
      addError(e.code);
    }
  };

  function addError(arg0: string) {
    setUserAuthError(arg0);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loadingAuth,
        createEmailAccount,
        loginWithEmail,
        forgotPassword,
        logout,
        checkIfLoggedIn,
        loggedInUser,
        userAuthError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};