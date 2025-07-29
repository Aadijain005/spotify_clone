// import { route } from "react-router-dom"
import {backendUrl} from "../utils/config";

export async function makeUnauthenticatedPOSTRequest(route, body) {
  const res = await fetch(backendUrl + route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const formattedResponse = await res.json();
  return formattedResponse;
  // return res.json();
}

export async function makeAuthenticatedPOSTRequest(
  // url,
  // body,
  // token
  route , body
) {
  const token = getToken();
  const res = await fetch(backendUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  // return res.json();
  const formattedResponse = await res.json();
  return formattedResponse;
}

const getToken = () =>{
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
  "$1"  );
  return accessToken;
};