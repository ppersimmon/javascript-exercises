"use client";

import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Stack,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/navigation";
import { postExhibit } from "../api/exhibitActions";

interface FormValues {
  description: string;
  image: File | null;
}

interface NewPostProps {
  open: boolean;
  onClose: () => void;
  onPostCreated: (newPost: any) => void;
}

const NewPostSchema = Yup.object().shape({
  description: Yup.string().trim().required("text is required"),
  image: Yup.mixed().required("image is required"),
});

const NewPost = ({ open, onClose, onPostCreated }: NewPostProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      const formData = new FormData();
      formData.append("description", values.description);
      if (values.image) {
        formData.append("image", values.image);
      }
      const newPost = await postExhibit(formData);

      if (onPostCreated) {
        onPostCreated(newPost);
      }

      router.refresh();
      resetForm();
      setPreviewUrl(null);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = (resetForm: () => void) => {
    resetForm();
    setPreviewUrl(null);
    onClose();
  };

  return (
    <Formik<FormValues>
      initialValues={{ description: "", image: null }}
      validationSchema={NewPostSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        isSubmitting,
        submitForm,
        resetForm,
      }) => (
        <Dialog
          open={open}
          onClose={() => handleClose(resetForm)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Create New Post
            <IconButton onClick={() => handleClose(resetForm)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                autoFocus
                multiline
                minRows={3}
                placeholder="Write a post"
                variant="standard"
                fullWidth
                InputProps={{ disableUnderline: true }}
                name="description"
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              {previewUrl && (
                <Box sx={{ position: "relative", mt: 2 }}>
                  <Box
                    component="img"
                    src={previewUrl}
                    sx={{
                      width: "100%",
                      maxHeight: 300,
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      setFieldValue("image", null);
                      setPreviewUrl(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
              {touched.image && errors.image && (
                <FormHelperText error>{String(errors.image)}</FormHelperText>
              )}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
            <Box>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setFieldValue("image", file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
              />
              <IconButton
                color={
                  Boolean(errors.image && touched.image) ? "error" : "primary"
                }
                onClick={() => fileInputRef.current?.click()}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => submitForm()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "SEND"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

export default NewPost;
