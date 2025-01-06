import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { EditPersonaForm } from "../components/PersonaSetup/EditPersonaForm";

import { PersonaFormData } from "../schemas/personaSchema";

import { SECRET_KEY, BASE_URL } from "../constants/config";

import { MainLayout } from "../layouts/MainLayout";

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
      const response = await fetch(
        `${BASE_URL}/api/v1/buddies/${buddyData.buddy_tag}`,
        {
          method: "PUT",
          headers: {
            "secret-key": SECRET_KEY,
            "buddy-tag": buddyData.buddy_tag,
          },
          body: formData,
        },
      );

      if (response.ok) {
        const updatedBuddy = await response.json();
        navigate("/chat", { state: { buddyData: updatedBuddy } });
      } else {
        throw new Error("Failed to update buddy");
      }
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
