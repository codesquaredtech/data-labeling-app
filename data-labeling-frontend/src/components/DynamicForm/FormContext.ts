import { createContext } from "react";
import * as React from 'react';

export interface ContextType{
    handleChange: (id:any,e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormContext = React.createContext<ContextType | null>(null);
