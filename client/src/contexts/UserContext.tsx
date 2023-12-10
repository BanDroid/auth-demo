import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { IUser } from "../models/user";
import { generateUrlFromBasename } from "../utils/url";

type SignReturnType =
  | {
      accessToken: string;
    }
  | string
  | null
  | undefined
  | unknown;

const initValue: {
  user: IUser | null;
  signin?: (email: string, password: string) => Promise<SignReturnType>;
  signup?: (
    email: string,
    password: string,
    username: string
  ) => Promise<SignReturnType>;
  update?: (
    email: string,
    password: string,
    username: string
  ) => Promise<SignReturnType>;
  signout?: () => Promise<void>;
} = { user: null };

export type UserContextType = typeof initValue;
const UserContext = createContext<UserContextType>(initValue);

type UserContextProviderProps = {
  children?: ReactNode;
};
export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  axios.defaults.withCredentials = true;
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      if (!currentUser) {
        const res = await axios.get(
          generateUrlFromBasename("/api/auth/token", true),
          {
            withCredentials: true,
          }
        );
        const decoded = jwt_decode(res.data.accessToken);
        setCurrentUser(decoded as IUser);
      }
    };
    fetchToken()
      // .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const value = {
    user: currentUser,
    async signin(email: string, password: string): Promise<SignReturnType> {
      try {
        const res = await axios.post(
          generateUrlFromBasename("/api/auth/signin", true),
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        if (res.status !== 201) throw new Error(JSON.stringify(res));
        const decoded = jwt_decode(res.data.accessToken);
        setCurrentUser(decoded as IUser);
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        try {
          const errObj = JSON.parse(error as string);
          return errObj;
        } catch (e) {
          return error;
        }
      }
    },
    async signup(
      email: string,
      password: string,
      username: string
    ): Promise<SignReturnType> {
      try {
        const res = await axios.post(
          generateUrlFromBasename("/api/auth", true),
          {
            username,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        if (res.status !== 201) throw new Error(JSON.stringify(res));
        const decoded = jwt_decode(res.data.accessToken);
        setCurrentUser(decoded as IUser);
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        try {
          const errObj = JSON.parse(error as string);
          return errObj;
        } catch (e) {
          return error;
        }
      }
    },
    async update(
      email: string,
      password: string,
      username: string
    ): Promise<SignReturnType> {
      try {
        const { data: tokenData } = await axios.get(
          generateUrlFromBasename("/api/auth/token", true),
          { withCredentials: true }
        );
        const { data: userData, status } = await axios.get(
          generateUrlFromBasename("/api/auth", true),
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${tokenData.accessToken}` },
          }
        );
        console.log(status);
        console.log("User Data: ", userData);
        const res = await axios.put(
          generateUrlFromBasename("/api/auth", true),
          {
            id: currentUser?.id,
            username,
            email,
            password,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${tokenData.accessToken}`,
            },
          }
        );
        if (res.status !== 201) throw new Error(JSON.stringify(res));
        // setCurrentUser({
        //   ...currentUser,
        //   username,
        //   email,
        //   password
        // })
      } catch (error) {
        console.error(error);
        try {
          const errObj = JSON.parse(error as string);
          return errObj;
        } catch (e) {
          return error;
        }
      }
    },
    async signout() {
      try {
        const res = await axios.delete(
          generateUrlFromBasename("/api/auth/token", true),
          {
            withCredentials: true,
          }
        );
        if (res.status !== 200) throw new Error(JSON.stringify(res));
        setCurrentUser(() => {
          navigate("/signin", { replace: true });
          return null;
        });
      } catch (error) {
        console.error(error);
        try {
          const errObj = JSON.parse(error as string);
          return errObj;
        } catch (e) {
          return error;
        }
      }
    },
  };

  return (
    <UserContext.Provider value={value}>
      {error ? <pre>{error}</pre> : loading ? <></> : children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
