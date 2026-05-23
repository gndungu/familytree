import api from "../api/axios";
import type { LoginPayload, RegisterPayload, AuthResponse } from "../services/auth";

export const login = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("accounts/login/", payload);

  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  return res.data;
};

export const register = async (payload: RegisterPayload) => {
  return api.post("register/", payload);
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("access");
}