interface SetTokensProps {
  access_token: string;
}

export const setTokens = ({ access_token }: SetTokensProps) => {
  localStorage.setItem("access_token", access_token);
};

export const setAccessToken = ({ access_token }: { access_token: string }) => {
  localStorage.setItem("access_token", access_token);
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
