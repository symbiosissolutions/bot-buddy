import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PersonaFormData, personaSchema } from "../../schemas/personaSchema";

import { IBuddyResponse, IPersonalityTrait } from "../../types/PersonaTypes";

import { TextInput } from "./TextInput";
import { TextAreaInput } from "./TextAreaInput";
import { PersonalityTraitsInput } from "./PersonaTraits";
import { FormError } from "./FormError";
import { AvatarUpload } from "./AvatarUpload";

export const EditPersonaForm = ({
  buddyData,
  onSave,
  isSaving,
}: {
  buddyData: IBuddyResponse;
  onSave: (data: PersonaFormData) => void;
  isSaving: boolean;
}) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonaFormData>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      ...buddyData,
      personalityTraits: Array.isArray(buddyData.personality_traits)
        ? buddyData.personality_traits
        : JSON.parse(buddyData.personality_traits || "[]"),
    },
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
    const currentTraits = watch("personalityTraits") || [];
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
          autoFocus={false}
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
          autoFocus={false}
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
          autoFocus={false}
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
          autoFocus={false}
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
          selectedTraits={
            Array.isArray(watch("personalityTraits"))
              ? watch("personalityTraits")
              : Array.isArray(buddyData.personality_traits)
                ? buddyData.personality_traits
                : JSON.parse(buddyData.personality_traits || "[]")
          }
          onTraitToggle={handleTraitToggle}
        />
        {errors.personalityTraits && (
          <FormError message={errors.personalityTraits.message || ""} />
        )}
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className={`w-full py-3 ${
          isSaving
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-500 hover:bg-indigo-600"
        } text-white rounded-lg transition-colors`}
      >
        {isSaving ? "Saving Changes..." : "Save Changes"}
      </button>
    </form>
  );
};
