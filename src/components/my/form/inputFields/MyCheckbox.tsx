import { Label } from "@/components/ui/label";
import { MyControlledCheckbox } from "@/components/ui/MyControlledCheckbox";
import { ErrorMessage } from "@hookform/error-message";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
}

export default function MyCheckbox({ name, label, className }: IProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <MyControlledCheckbox onChange={onChange} value={value} id={name} />
        )}
      />
      <Label
        htmlFor={name}
        className={errors?.[name] ? "text-destructive" : ""}
      >
        {label}
      </Label>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-destructive ml-2">{message}</p>
        )}
      />
    </div>
  );
}
