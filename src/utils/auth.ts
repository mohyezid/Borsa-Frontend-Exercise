export const getToken = () => {
  const ls = localStorage.getItem("auth");
  const user = ls ? JSON.parse(ls) : null;
  return user ? user.token : null;
};
