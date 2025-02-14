import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { ErrorMessage } from "@hookform/error-message";

interface MyReactSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  isMulti?: boolean;
  placeholder?: string;
}

/**
 * Select Input using React Select library
 *
 *
 */
export const MyReactSelect = ({
  name,
  label,
  options,
  isMulti,
  placeholder = "Select an option",
}: MyReactSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div>
        <label htmlFor={name}>{label}</label>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange } }) => (
            <Select
              placeholder={placeholder}
              isMulti={isMulti}
              onChange={onChange}
              options={options}
              classNames={{
                control: (state) =>
                  `form__input py-[2.5px]  ${
                    Object.prototype.hasOwnProperty.call(errors, name) &&
                    !state.isFocused &&
                    "!border-2 !border-red-500"
                  } `,
              }}
            />
          )}
        />
      </div>
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};
