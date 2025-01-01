import { IPersonaInputs } from "../../types/PersonaTypes";

import buddyImage from "../../assets/botbuddy-logo-main.png";

interface IBuddyProfileProps {
  buddyData: IPersonaInputs;
}

const BuddyProfile = ({ buddyData }: IBuddyProfileProps) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-8 shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-400 shadow-xl mb-6 hover:scale-105 transition-transform duration-300">
          <img
            src={typeof buddyData.avatar === 'string' ? buddyData.avatar : buddyImage}
            className="w-full h-full object-cover"
            alt={`${buddyData.name}'s avatar`}
          />
        </div>
        <div className="flex flex-col gap-2 max-w-[25rem]">
          <h2 className="text-3xl font-bold text-indigo-900 tracking-wide truncate">
            {buddyData.name}
          </h2>
          <p className="text-lg text-indigo-600 font-medium italic line-clamp-6">
            {buddyData.tagline}
          </p>
        </div>
      </div>
    </div>
  );
};export default BuddyProfile;
