import api from "./axiosInstance";
import { ExhibitType, PaginatedResponse } from "../interfaces/ExhibitType";

export const postExhibit = async (formData: FormData) => {
  const response = await api.post<ExhibitType>("/api/exhibits", formData);
  return response.data;
};

export const getEveryExhibit = async (page: number = 1) => {
  const response = await api.get<PaginatedResponse<ExhibitType>>(
    "/api/exhibits",
    {
      params: { page, limit: 10 },
    },
  );
  return response.data;
};

export const getEveryUserExhibit = async (page: number = 1) => {
  const response = await api.get<PaginatedResponse<ExhibitType>>(
    "/api/exhibits/my-posts",
    {
      params: { page, limit: 10 },
    },
  );
  return response.data;
};

export const getSingleExhibit = async (id: number) => {
  const response = await api.get<ExhibitType>(`/api/exhibits/post/${id}`);
  return response.data;
};

export const deleteExhibit = async (id: number) => {
  const response = await api.delete(`/api/exhibits/${id}`);
  return response.data;
};
