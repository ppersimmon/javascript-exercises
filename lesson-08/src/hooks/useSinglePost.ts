import { useState, useEffect } from "react";
import { getSingleExhibit } from "../api/exhibitActions";
import { ExhibitType } from "../interfaces/ExhibitType";
import { useAppSelector } from "../store/hooks";

export const useSinglePost = (id: string | undefined) => {
  const [data, setData] = useState<ExhibitType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useAppSelector((state) => state.users.singleUser);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getSingleExhibit(Number(id));
        setData(response);
      } catch (e) {
        console.error(e);
        setError("Post not found or deleted");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const showDelete = currentUser?.id === data?.user?.id;

  return {
    data,
    loading,
    error,
    showDelete,
  };
};
