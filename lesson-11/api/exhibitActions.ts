import { fetchClient } from "./fetchClient";
import { ExhibitType } from "../interfaces/ExhibitType";

export const postExhibit = async (formData: FormData) => {
  return await fetchClient<ExhibitType>("/api/exhibits", {
    method: "POST",
    body: formData,
  });
};

export const getEveryExhibit = async (page: number = 1) => {
  return await fetchClient<ExhibitType[]>(
    `/api/exhibits?page=${page}&limit=10`,
  );
};

export const getEveryUserExhibit = async (page: number = 1, token?: string) => {
  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return await fetchClient<ExhibitType[]>(
    `/api/exhibits/my-posts?page=${page}&limit=10`,
    { headers },
  );
};

export const getSingleExhibit = async (id: number) => {
  return await fetchClient<ExhibitType>(`/api/exhibits/post/${id}`);
};

export const deleteExhibit = async (id: number) => {
  return await fetchClient(`/api/exhibits/${id}`, {
    method: "DELETE",
  });
};
