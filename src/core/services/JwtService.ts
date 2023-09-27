const ID_TOKEN_KEY = "id_token" as string;

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};
//TODO: REMOVE static token
const dummyToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI4Zjc3N2NjOC00NGMyLTQ5NDUtYWVkNi0wZTc0ODFjOGFlYjAiLCJOYW1lIjoiU2hlcm1hbiBVbmEgTWFyaWVsYSIsIlJvbGUiOiJBZG1pbiIsIlBlcm1pc3Npb25zIjoiWzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNDgsNDksNTAsNTEsNTIsNTMsNTQsNTUsNTYsNTcsNTgsNTksNjAsNjEsNjIsNjNdIiwiRW1haWxDb25maXJtZWQiOiJUcnVlIiwiRW1haWwiOiJBZG1pbl9fMl9fbW9oYW1tZWRhbGJvc2lmaTE5OTBAZ21haWwuY29tIiwiZXhwIjoxNzI2OTA2NzM4LCJpc3MiOiJodHRwczovL2Rldi5iZWRheWF0LmNvbS5seSIsImF1ZCI6Imh0dHBzOi8vZGV2LmJlZGF5YXQuY29tLmx5In0.LTjRq_0-v-qvnkThxANuXArnaoSUk7KIKrEEgYPi3cc";
saveToken(dummyToken);
export default { getToken, saveToken, destroyToken };
