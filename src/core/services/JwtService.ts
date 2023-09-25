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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI4Y2Y5ZmFmNS1lNWM0LTRlNDEtYWRmMC0xNzQ3ODA5ZmRmMGQiLCJOYW1lIjoiRWRtdW5kIEF1cmVsaW8gSGlyYW0iLCJSb2xlIjoiQWRtaW4iLCJQZXJtaXNzaW9ucyI6IlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDQ5LDUwLDUxLDUyLDUzLDU0LDU1LDU2LDU3LDU4LDU5LDYwLDYxLDYyLDYzLDY0LDY1LDY2LDY3LDY4LDY5LDcwLDcxLDcyLDczLDc0LDc1LDc2LDc3XSIsIkVtYWlsQ29uZmlybWVkIjoiVHJ1ZSIsIkRldmljZVVuaXF1ZUlkIjoiNDMwMWViZWUtNWMwMC00NGNmLTg1MGQtY2M1ZmQ5ZjBiMGE2IiwiRW1haWwiOiJBZG1pbl9fN19fbW9oYW1tZWRhbGJvc2lmaTE5OTBAZ21haWwuY29tIiwiZXhwIjoxNzI1MzY5NzQyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNjQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwNjQifQ.HEoA4eX0hzvyMv4HEV-n1E1yEXzIWmjb87qIirderUI";
saveToken(dummyToken);
export default { getToken, saveToken, destroyToken };
