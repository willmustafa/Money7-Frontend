export const TOKEN_KEY = "Money-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export function getName(): string{
  return localStorage.getItem("name") as string
}

export function getEmail(): string{
  return localStorage.getItem("email") as string
}

export function getId(): string{
  return localStorage.getItem("userid") as string
}

export const login = (token, name, email, userid) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("userid", userid);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("name");
  localStorage.removeItem("email")
  localStorage.removeItem("userid")
};