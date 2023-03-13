import * as React from "react";
import { IUser } from "../interfaces/User";

export const TodoContext = React.createContext<IUser | null>(null);
