import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

type User = {
  username: string;
  firstName: string;
  lastName: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn");
    console.log(savedIsLoggedIn);
    return savedIsLoggedIn ? savedIsLoggedIn === "true" : false;
  });

  const [user, setUser] = useState<User>({
    username: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
