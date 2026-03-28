import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  type FieldValues,
  type DefaultValues,
  type Path,
  type SubmitHandler,
} from "react-hook-form";
import { type z } from "zod";

interface FormProps<T extends FieldValues> {
  schema: z.ZodType<T, any, any>;
  onSubmit: SubmitHandler<T>;
  fields: {
    name: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
  }[];
  isLoading: boolean;
  defaultValues?: DefaultValues<T>;
  isError?: boolean;
  isErrorLabel?: string;
}

const Form = <T extends FieldValues>({
  schema,
  fields,
  isLoading,
  onSubmit,
  defaultValues,
  isError,
  isErrorLabel,
}: FormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item) => (
        <div key={item.name as string} className="flex flex-col space-y-1">
          <label
            htmlFor={item.name as string}
            className="text-sm font-medium text-gray-700"
          >
            {item.label}
          </label>

          <Controller
            control={control}
            name={item.name}
            render={({ field }) => (
              <input
                {...field}
                type={item.type || "text"}
                id={item.name as string}
                placeholder={item.placeholder || ""}
                autoComplete="off"
                className={`w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 ${
                  errors[item.name as string]
                    ? "border-red-500 focus:outline-1 focus:outline-red-500"
                    : "focus:outline-2 focus:outline-indigo-500"
                }`}
              />
            )}
          />

          {errors[item.name as string] && (
            <small className="font-semibold text-red-500">
              {errors[item.name as string]?.message as string}
            </small>
          )}
        </div>
      ))}

      {isError && (
        <small className="block font-semibold text-red-500">
          {isErrorLabel}
        </small>
      )}

      <button
        type="submit"
        className="mt-2 w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:bg-indigo-400"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Sign in"}
      </button>
    </form>
  );
};

export default Form;
