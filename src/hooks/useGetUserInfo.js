export const useGetUserInfo = () => {
  const { userId, name, photo, Isauth } = JSON.parse(
    localStorage.getItem("auth")
  );
  return { userId, name, photo, Isauth };
};
