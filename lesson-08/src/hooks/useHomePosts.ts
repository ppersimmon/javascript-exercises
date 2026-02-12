import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../store/hooks";
import { getEveryUserExhibit, deleteExhibit } from "../api/exhibitActions";
import { ExhibitType } from "../interfaces/ExhibitType";

export const useHomePosts = (page: number) => {
  const [posts, setPosts] = useState<ExhibitType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useAppSelector((state) => state.users.singleUser);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: any = await getEveryUserExhibit(page);

        if (response.data && Array.isArray(response.data)) {
          setPosts(response.data);
          setTotalPages(response.lastPage || 1);
        } else if (Array.isArray(response)) {
          setPosts(response);
          setTotalPages(1);
        } else {
          setPosts([]);
          setTotalPages(1);
        }
      } catch (err: any) {
        setError("Failed to load your posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  const handleDeletePost = useCallback(async (id: number) => {
    try {
      await deleteExhibit(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  }, []);

  const handlePostCreated = useCallback(
    (newPost: ExhibitType) => {
      if (page === 1) {
        setPosts((prev) => [newPost, ...prev]);
      }
    },
    [page],
  );

  return {
    posts,
    totalPages,
    loading,
    error,
    currentUser,
    handleDeletePost,
    handlePostCreated,
  };
};
