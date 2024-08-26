import { AxiosError } from "axios";
import { FieldErrors } from "react-hook-form";

interface FieldTypeErrors {
  frontErrors?: FieldErrors;
  serverErrors?: AxiosError | Error | null;
}

export type { FieldTypeErrors };
