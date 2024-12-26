import { IChatLayoutProps } from "../../types/ChatTypes";

import { DISCLAIMER_TEXT } from "../../constants/content";

import BuddyProfile from "./BuddyProfile";

export const ChatLayout = ({ children, buddyData }: IChatLayoutProps) => {
  return (
    <>
      <div className="screen-main">
        <div className="chat-section">{children}</div>
        <div>
          <BuddyProfile buddyData={buddyData} />
        </div>
      </div>
      <div className="screen-disclaimer">
        <p>{DISCLAIMER_TEXT}</p>
      </div>
    </>
  );
};
