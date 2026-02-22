"use client";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import React from "react";
import { deleteExhibit } from "../api/exhibitActions";

interface DeleteButtonProps {
  postId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteExhibit(postId);
      router.refresh();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleDelete} disabled={loading} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteButton;
