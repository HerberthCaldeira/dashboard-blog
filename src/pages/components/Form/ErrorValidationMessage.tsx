import { FieldTypeErrors } from "./Fields/types/fieldsTypes";

interface ErrorValidationMessageProps extends FieldTypeErrors {
  field: string;
}

export default function ErrorValidationMessage({
  frontErrors,
  serverErrors,
  field,
}: ErrorValidationMessageProps) {
  console.log("ErrorValidation", frontErrors, serverErrors, field);
  let msg: string | null = null;

  if (
    (!frontErrors || Object.keys(frontErrors).length === 0) &&
    (!serverErrors || Object.keys(serverErrors).length === 0)
  ) {
    return null;
  }

  if (frontErrors?.[field]?.message) msg = frontErrors[field].message;

  if (serverErrors?.response?.data?.errors[field] && msg === null)
    msg = serverErrors?.response?.data?.errors[field][0];

  return <div>{msg}</div>;
}
