import { useAuthStore } from "../store/auth";
import axios from "./axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const login = async (email, password) => {
  try {
    let username = email;
    const { data, status } = await axios.post("token/", {
      username,
      email,
      password,
    });
    if (status === 200) {
      setAuthUser(data.access, data.refresh);
    }
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response.data?.detail || "Something went wrong",
    };
  }
};

export const register = async (
  first_name,
  email,
  password,
  password2,
  is_empresa,
  is_candidato
) => {
  try {
    let username = email;
    const { data } = await axios.post("register/", {
      username,
      first_name,
      email,
      password,
      password2,
      is_empresa,
      is_candidato,
    });
    console.log(data);
    await login(email, password);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response.data || "Something went wrong",
    };
  }
};

export const register_candidato = async (
  first_name,
  email,
  password,
  password2,
  is_empresa,
  is_candidato,
  pretensao_salarial,
  experiencia,
  escolaridade
) => {
  try {
    let username = email;
    const { data } = await axios.post("register_candidato/", {
      username,
      first_name,
      email,
      password,
      password2,
      is_empresa,
      is_candidato,
      pretensao_salarial,
      experiencia,
      escolaridade,
    });

    await login(email, password);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response.data || "Something went wrong",
    };
  }
};

export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  useAuthStore.getState().setUser(null);
};

export const setUser = async () => {
  // ON PAGE LOAD
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  if (!accessToken || !refreshToken) {
    return;
  }
  if (isAccessTokenExpired(accessToken)) {
    const response = await getRefreshToken(refreshToken);
    setAuthUser(response.access, response.refresh);
  } else {
    setAuthUser(accessToken, refreshToken);
  }
};

export const setAuthUser = (access_token, refresh_token) => {
  Cookies.set("access_token", access_token, {
    expires: 1,
    secure: true,
  });

  Cookies.set("refresh_token", refresh_token, {
    expires: 7,
    secure: true,
  });

  const user = jwt_decode(access_token) ?? null;

  if (user) {
    useAuthStore.getState().setUser(user);
  }
  useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
  const refresh_token = Cookies.get("refresh_token");
  const response = await axios.post("token/refresh/", {
    refresh: refresh_token,
  });
  return response.data;
};

export const isAccessTokenExpired = (accessToken) => {
  try {
    const decodedToken = jwt_decode(accessToken);
    return decodedToken.exp < Date.now() / 1000;
  } catch (err) {
    return true; // Token is invalid or expired
  }
};