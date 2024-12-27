import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PersonaFormData, personaSchema } from "../../schemas/personaSchema";

import { TextInput } from "./TextInput";
import { TextAreaInput } from "./TextAreaInput";
import { PersonalityTraitsInput } from "./PersonaTraits";

import { IPersonalityTrait } from "../../types/PersonaTypes";
import { FormError } from "./FormError";
import { AvatarUpload } from "./AvatarUpload";

export const EditPersonaForm = ({
  buddyData,
  onSave,
}: {
  buddyData: PersonaFormData;
  onSave: (data: PersonaFormData) => void;
}) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonaFormData>({
    resolver: zodResolver(personaSchema),
    defaultValues: buddyData,
  });

  const handleTextInputChange = (
    value: string,
    fieldName: keyof PersonaFormData,
  ) => {
    setValue(fieldName, value, { shouldValidate: true });
  };

  const handleAvatarChange = (file: File | null) => {
    setValue("avatar", file, {
      shouldValidate: true,
    });
  };

  const handleTraitToggle = (trait: IPersonalityTrait) => {
    const currentTraits = watch("personalityTraits");
    const newTraits = currentTraits.includes(trait)
      ? currentTraits.filter((t) => t !== trait)
      : [...currentTraits, trait];
    setValue("personalityTraits", newTraits, {
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-6">
      <div>
        <label className="text-lg font-semibold text-indigo-900 mb-3 block">
          Name
        </label>
        <TextInput
          id="name"
          register={register}
          placeholder="Enter buddy's name"
          handleTextInputChange={handleTextInputChange}
          handleKeyPress={() => {}}
          error={errors.name?.message}
          showError={true}
        />
      </div>

      <div>
        <label className="text-lg font-semibold text-indigo-900 mb-3 block">
          Tagline
        </label>
        <TextAreaInput
          id="tagline"
          register={register}
          placeholder="Enter a catchy tagline"
          handleTextInputChange={handleTextInputChange}
          error={errors.tagline?.message}
          showError={true}
        />
      </div>

      <div>
        <label className="text-lg font-semibold text-indigo-900 mb-3 block">
          Greeting
        </label>
        <TextAreaInput
          id="greeting"
          register={register}
          placeholder="Write a signature greeting"
          handleTextInputChange={handleTextInputChange}
          error={errors.greeting?.message}
          showError={true}
        />
      </div>

      <div>
        <label className="text-lg font-semibold text-indigo-900 mb-3 block">
          Purpose
        </label>
        <TextAreaInput
          id="purpose"
          register={register}
          placeholder="What's your buddy's main purpose?"
          handleTextInputChange={handleTextInputChange}
          error={errors.purpose?.message}
          showError={true}
        />
      </div>

      <div>
        <label className="text-lg font-semibold text-indigo-900 mb-3 block">
          Backstory
        </label>
        <TextAreaInput
          id="backstory"
          register={register}
          placeholder="Write a brief backstory"
          handleTextInputChange={handleTextInputChange}
          error={errors.backstory?.message}
          showError={true}
        />
      </div>

      <div>
        <label className="text-lg font-semibold text-indigo-900">Avatar</label>
        <AvatarUpload
          onAvatarChange={handleAvatarChange}
          currentAvatar={
            watch("avatar") instanceof File
              ? URL.createObjectURL(watch("avatar"))
              : (buddyData.avatar as string)
          }
        />
      </div>

      <div>
        <label className="text-lg font-semibold text-indigo-900 mb-3 block">
          Personality Traits
        </label>
        <PersonalityTraitsInput
          selectedTraits={watch("personalityTraits") as IPersonalityTrait[]}
          onTraitToggle={handleTraitToggle}
        />
        {errors.personalityTraits && (
          <FormError message={errors.personalityTraits.message || ""} />
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
      >
        Save Changes
      </button>
    </form>
  );
};
