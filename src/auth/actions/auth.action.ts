import ecommerceApi from "../../api/ecommerceApi";
import type { AuthResponse, UserFormValues } from "../interface/auth";

export const registerAction = async(data: UserFormValues): Promise<AuthResponse> => {
  const response = await ecommerceApi.post<AuthResponse>('/auth/register', data);
  return response.data;
}

export const loginAction = async(data: UserFormValues): Promise<AuthResponse> => {
  const response = await ecommerceApi.post<AuthResponse>('/auth/login', data);
  return response.data;
}

export const renewAction = async(): Promise<AuthResponse> => {
  const response = await ecommerceApi.post<AuthResponse>('/auth/renew');
  return response.data;
}


