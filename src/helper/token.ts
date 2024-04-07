const tokenKey = "brew_master_token";
let token: string | undefined = "";

export const getToken = () => {
  if (token) return token;
  const savedToken = localStorage.getItem(tokenKey);
  if (savedToken) token = savedToken;
  return token;
};

export const setToken = (authToken: string) => {
  localStorage.setItem(tokenKey, authToken);
  token = authToken;
};

export const removeToken = () => {
  localStorage.removeItem(tokenKey);
  token = undefined;
};
