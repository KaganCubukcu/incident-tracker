import api from "../lib/api";
import type { AuthDto, AuthResponse } from "../types/auth";

export const authService = {
  login: async (data: AuthDto): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
  signup: async (data: AuthDto): Promise<AuthResponse> => {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },
};
