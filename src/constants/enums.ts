export enum ROLES {
  user = "user",
  assistant = "assistant",
}

export const getRoleLabel = (_role: ROLES, characterName?: string) => ({
  [ROLES.user]: "You",
  [ROLES.assistant]: `${characterName} AI` || "AI Assistant"
});