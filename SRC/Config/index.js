// export const baseUrl = "https://b326-103-125-71-13.ngrok-free.app";
export const baseUrl = "https://qbid.ad-wize.net";
export const imageUrl = `${baseUrl}/api/images/`;
export const profilePicUrl = `${baseUrl}/uploads`

export const apiDataLimit = 10;
export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
