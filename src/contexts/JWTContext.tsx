/* eslint-disable linebreak-style */
import { createContext, ReactNode, useEffect, useReducer } from 'react';
import React from 'react';
import { JWTContextType, ActionMap, AuthState, AuthUser } from '../types/auth';
import 'react-notifications-component/dist/theme.css';
// import axios from "../utils/axios";
import AuthService from '../services/auth-service';
// import { isValidToken, setSession } from "../utils/jwt";

// Note: If you're trying to connect JWT to your own backend, don't forget
// to remove the Axios mocks in the `/src/pages/_app.tsx` file.

const INITIALIZE = 'INITIALIZE';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SIGN_UP = 'SIGN_UP';

type AuthActionTypes = {
  [INITIALIZE]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [SIGN_IN]: {
    user: AuthUser;
  };
  [SIGN_OUT]: undefined;
  [SIGN_UP]: {
    user: AuthUser;
  };
};

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (
  state: AuthState,
  action: ActionMap<AuthActionTypes>[keyof ActionMap<AuthActionTypes>]
) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      /** validate current jwt token when page is initialized **/
      try {
        //AxiosResponse.data
        const user = await AuthService.validateJWT();
        if (!user) {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const encryptedPassword = await AuthService.encryptPassword(password);
      if (!encryptedPassword) {
        // TODO: show error
        console.log('Encrypt Password Failed at Frontend');
      } else {
        //AxiosResponse.data
        const user = await AuthService.login(username, encryptedPassword);
        console.log(user);
        if (user) {
          dispatch({
            type: SIGN_IN,
            payload: {
              user,
            },
          });
          return true;
        }
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const signOut = async () => {
    try {
      await AuthService.logOut();
    } catch (err) {
      console.error(err);
    }

    dispatch({ type: SIGN_OUT });
  };

  // const signOut = async () => {
  //   setSession(null);
  //   dispatch({ type: SIGN_OUT });
  // };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    // const response = await axios.post("/api/auth/sign-up", {
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    // });
    // const { accessToken, user } = response.data;
    // window.localStorage.setItem("accessToken", accessToken);
    // dispatch({
    //   type: SIGN_UP,
    //   payload: {
    //     user,
    //   },
    // });
  };

  const resetPassword = (email: string) => console.log(email);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
