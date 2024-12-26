import { motion } from "framer-motion";

import { IPersonalityTrait } from "../../types/PersonaTypes";

interface PersonaTraitsInputProps {
  selectedTraits: IPersonalityTrait[];
  onTraitToggle: (trait: IPersonalityTrait) => void;
}

export const PersonalityTraitsInput = ({
  selectedTraits,
  onTraitToggle,
}: PersonaTraitsInputProps) => {
  const allTraits: IPersonalityTrait[] = [
    "Funny",
    "Sarcastic",
    "Serious",
    "Curious",
    "Empathetic",
    "Adventurous",
    "Analytical",
    "Creative",
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {allTraits.map((trait) => (
        <motion.button
          key={trait}
          type="button"
          className={`
            p-4 rounded-xl border-2 text-lg font-medium transition-all duration-300
            ${
              selectedTraits.includes(trait)
                ? "bg-indigo-500 text-white border-indigo-700"
                : "bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50"
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTraitToggle(trait)}
        >
          {trait}
        </motion.button>
      ))}
    </div>
  );
};
