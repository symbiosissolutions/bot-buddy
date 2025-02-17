import { ITextAreaInputProps } from "../../types/InputTypes";

import { FormError } from "./FormError";

export const TextAreaInput = ({
  id,
  register,
  placeholder,
  handleTextInputChange,
  error,
  showError,
  autoFocus= true,
}: ITextAreaInputProps) => {
  return (
    <>
      <textarea
        {...register(id)}
        className="w-full p-4 text-2xl bg-white/10 backdrop-blur-md rounded-xl border-2 border-indigo-200 focus:border-indigo-500 outline-none min-h-[200px] resize-none text-indigo-600"
        placeholder={placeholder}
        onChange={(e) => handleTextInputChange(e.target.value, id)}
        autoFocus={autoFocus}
      />
      {error && showError && <FormError message={error} />}
    </>
  );
};
