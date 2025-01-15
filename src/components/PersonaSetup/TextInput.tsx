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
  autoFocus = true,
}: ITextInputProps) => {
  return (
    <>
      <input
        {...register(id)}
        type="text"
        className="w-full text-5xl bg-transparent border-none outline-none focus:ring-0 text-indigo-600 placeholder-indigo-300"
        placeholder={placeholder}
        onChange={(e) => handleTextInputChange(e.target.value, id)}
        onKeyDown={handleKeyPress}
        autoFocus={autoFocus}
      />
      {error && showError && <FormError message={error} />}
    </>
  );
};
