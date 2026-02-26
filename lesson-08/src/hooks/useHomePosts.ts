import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../store/hooks";
import { getEveryUserExhibit, deleteExhibit } from "../api/exhibitActions";
import { ExhibitType, PaginatedResponse } from "../interfaces/ExhibitType";

export const useHomePosts = (page: number) => {
  const [data, setData] = useState<PaginatedResponse<ExhibitType>>({
    data: [],
    total: 0,
    page: page,
    lastPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useAppSelector((state) => state.users.singleUser);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await getEveryUserExhibit(page);
      setData(response);
    } catch (err: any) {
      setError("Failed to load your posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeletePost = useCallback(async (id: number) => {
    try {
      await deleteExhibit(id);
      setData((prev) => ({
        ...prev,
        data: prev.data.filter((post) => post.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  }, []);

  const handlePostCreated = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    currentUser,
    handleDeletePost,
    handlePostCreated,
  };
};
