import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { EditPersonaForm } from "../components/PersonaSetup/EditPersonaForm";

import { PersonaFormData } from "../schemas/personaSchema";

import { MainLayout } from "../layouts/MainLayout";

import { buddyService } from "../services";

export const EditPersona = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { buddyData } = state || {};

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: PersonaFormData) => {
    setIsSaving(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagline", data.tagline);
    formData.append("greeting", data.greeting);
    formData.append("purpose", data.purpose);
    formData.append("backstory", data.backstory);
    formData.append(
      "personality_traits",
      data.personalityTraits.map((trait) => trait).join(","),
    );

    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }

    try {
      const updatedBuddy = await buddyService.updateBuddy(
        buddyData.buddy_tag,
        formData,
      );
      navigate("/chat", { state: { buddyData: updatedBuddy } });
    } catch (error) {
      console.error("Error updating buddy:", error);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <MainLayout showLogo={false} centerGif={false}>
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">
        Edit Your Buddy
      </h1>
      <EditPersonaForm
        buddyData={buddyData}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </MainLayout>
  );
};
