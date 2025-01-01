import { useLocation, useNavigate } from "react-router-dom";

import { EditPersonaForm } from "../components/PersonaSetup/EditPersonaForm";

import { PersonaFormData } from "../schemas/personaSchema";

import { SECRET_KEY, BASE_URL } from "../constants/config";
import { useState } from "react";

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
    <main className="flex flex-col bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex-1 flex">
        <div className="w-2/3 pr-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-8">
            Edit Your Buddy
          </h1>
          <EditPersonaForm
            buddyData={buddyData}
            onSave={handleSave}
            isSaving={isSaving}
          />
        </div>
        <div className="w-1/3 ml-4 flex justify-center">
          <iframe
            className="w-full h-96 max-w-md"
            src="https://lottie.host/embed/9fb0ec9e-d9a7-4bb3-98d1-996497f2ae5e/IeKDVPiKUJ.lottie"
          ></iframe>
        </div>
      </div>
    </main>
  );
};
