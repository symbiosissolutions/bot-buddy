import { ITextAreaInputProps } from "../../types/InputTypes";

import { FormError } from "./FormError";

export const TextAreaInput = ({
  id,
  register,
  placeholder,
  handleTextInputChange,
  error,
  showError,
}: ITextAreaInputProps) => {
  return (
    <>
      <textarea
        {...register(id)}
        className="w-full p-4 text-2xl bg-white/10 backdrop-blur-md rounded-xl border-2 border-indigo-200 dark:border-indigo-700 focus:border-indigo-500 outline-none min-h-[200px] resize-none text-indigo-600 dark:text-indigo-300"
        placeholder={placeholder}
        onChange={(e) => handleTextInputChange(e.target.value, id)}
        autoFocus
      />
      {error && showError && <FormError message={error} />}
    </>
  );
};
