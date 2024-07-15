import { isBrowser } from './isBroswer'

const getCookie = (name: string) => {
  return (
    (isBrowser()
      &&  document.cookie
            .split("; ")
            .find((cookie) => cookie.startsWith(`${name}=`))
    ) ? true : false
  )
}

const getCookieValue = (name: string, initialValue = '') => {
  return (
    (isBrowser()
      && document.cookie
          .split("; ")
          .find((cookie) => cookie.startsWith(`${name}=`))
          ?.split("=")[1]
        || initialValue)
  )
}

const checkCookieExistence = () => {
  // const CheckCookieArray = ["authToken", "userId"];
  const CheckCookieArray = ["userId"];
  const CheckArray = CheckCookieArray
                      .map((cookie) => getCookie(cookie))
                      .find((cookie) => cookie === false);
  return CheckArray === undefined ? true : false;
}

const setCookie = (key: string, value: string) => {
  document.cookie = `${key} = ${value}; path=/;`;
};

const setCookieExpires = (key: string, value: string) => {
  let today: Date | string = new Date(Date.now() + (15 * 60 * 60 * 1000));
  today = today.toUTCString();
  document.cookie = `${key} = ${value}; path=/; expires=${today};`;
};

const deleteCookie = (key: string) => {
  let today: Date | string = new Date();
  today = today.toUTCString();
  document.cookie = `${key}=; path=/; expires=${today}`;
}

const setTokenHeaders = () => {
  const token = getCookieValue("authToken");
  const headers = {
    "X-Auth-Token": token,
  }
  
  return headers;
}

export { getCookieValue, checkCookieExistence, setCookie, setCookieExpires, deleteCookie, setTokenHeaders }