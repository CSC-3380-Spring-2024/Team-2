// import {createContext, useContext} from 'react';

// interface AuthContextType {
//   isLoggedIn: boolean;
//   checkingAuthStatus: boolean;
//   //   signUp: (
//   //     username: string,
//   //     password: string,
//   //     fullName: string,
//   //   ) => Promise<SignUpOutput>;
//   //   autoLogin: () => Promise<SignInOutput>;
//   //   login: (username: string, password: string) => Promise<SignInOutput>;
//   logout: () => void;
//   deleteAccount: () => Promise<void>;
//   username: string | undefined;
//   accessToken: string | undefined;
//   updateAuthSession: () => Promise<boolean>;
//   //   userAttributes: FetchUserAttributesOutput | undefined;
//   checkIfLoggedIn: () => Promise<void>;
//   setAvoidRefetchOnLoginFlag: (value: boolean) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
