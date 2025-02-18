import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { ErrorMessage } from "@hookform/error-message";
import { Label } from "@/components/ui/label";

interface MyReactSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  isMulti?: boolean;
  placeholder?: string;
  isClearable?: boolean;
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
  isClearable = true,
}: MyReactSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "35px",
      height: "35px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };

  return (
    <div>
      <div>
        <Label
          htmlFor={name}
          className={errors?.[name] ? "text-destructive" : ""}
        >
          {label}
        </Label>

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              styles={customStyles}
              isClearable={isClearable}
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
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className="text-destructive">{message}</p>}
      />
    </div>
  );
};
