<<<<<<< HEAD
export const baseUrl = "https://e3b8-103-125-71-38.ngrok-free.app";
=======
export const baseUrl = "https://c935-103-125-71-38.ngrok-free.app";
>>>>>>> origin/Naneeta
// export const baseUrl = "https://4b54-113-203-241-1.in.ngrok.io";
export const imageUrl = `${baseUrl}/api/images/`;
export const profilePicUrl = `${baseUrl}/uploads`

export const apiDataLimit = 10;
export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
