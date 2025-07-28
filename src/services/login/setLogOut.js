import requestApi from "../requestApi";

export default async function setLogOut(token, refreshToken) {
  const config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_URL_API_AUTH}login`,
    data: {
      token: token,
      refreshToken: refreshToken,
    },
  };
  return requestApi(config);
}
