import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../store/hooks";
import { getEveryExhibit, deleteExhibit } from "../api/exhibitActions";
import { ExhibitType } from "../interfaces/ExhibitType";

export const useStripePosts = (page: number) => {
  const [posts, setPosts] = useState<ExhibitType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state) => state.users.singleUser);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: any = await getEveryExhibit(page);

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
      } catch (e) {
        console.error(e);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handleDeletePost = useCallback(async (id: number) => {
    try {
      await deleteExhibit(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
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
    user,
    handleDeletePost,
    handlePostCreated,
  };
};
