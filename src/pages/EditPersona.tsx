import { useLocation, useNavigate } from "react-router-dom";

import { EditPersonaForm } from "../components/PersonaSetup/EditPersonaForm";

import { PersonaFormData } from "../schemas/personaSchema";

export const EditPersona = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { buddyData } = state || {};

  const handleSave = (data: PersonaFormData) => {
    navigate("/chat", { state: { buddyData: data } });
  };

  return (
    <main className="flex flex-col bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex-1 flex">
        <div className="w-2/3 pr-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-8">
            Edit Your Buddy
          </h1>
          <EditPersonaForm buddyData={buddyData} onSave={handleSave} />
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
