import { ITextInputProps } from "../../types/InputTypes";

import { FormError } from "./FormError";

export const TextInput = ({
  id,
  register,
  placeholder,
  handleTextInputChange,
  handleKeyPress,
  error,
  showError,
}: ITextInputProps) => {
  return (
    <>
      <input
        {...register(id)}
        type="text"
        className="w-full text-5xl bg-transparent border-none outline-none focus:ring-0 text-indigo-600 dark:text-indigo-300 placeholder-indigo-300 dark:placeholder-indigo-600"
        placeholder={placeholder}
        onChange={(e) => handleTextInputChange(e.target.value, id)}
        onKeyDown={handleKeyPress}
        autoFocus
      />
      {error && showError && <FormError message={error} />}
    </>
  );
};
