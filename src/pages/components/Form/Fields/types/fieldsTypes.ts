import { FieldErrors } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type?: "text" | "email" | "time" | "password";
  placeholder?: string;
  errors?: FieldErrors;
}

export type { InputProps };
