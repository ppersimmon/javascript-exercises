"use client";

import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockedOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../store/hooks";
import { loginUserThunk } from "../store/slices/userSlice";
import { registerUser } from "../api/userActions";

const RegisterSchema = Yup.object({
  username: Yup.string().required().min(3, "username is too short"),
  password: Yup.string()
    .required()
    .min(6, "password must be at least 6 symbols long"),
});

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (
    values: { username: string; password: string },
    { setSubmitting }: FormikHelpers<{ username: string; password: string }>,
  ) => {
    setServerError(null);

    try {
      await registerUser(values);
      const resultAction = await dispatch(loginUserThunk(values));
      if (loginUserThunk.fulfilled.match(resultAction)) {
        router.push("/my-profile");
      }
    } catch (err: any) {
      const serverMessage = err.response?.data?.message || err.message;
      setServerError(serverMessage || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={6}
          sx={{ padding: 4, textAlign: "center", width: "100%" }}
        >
          <Avatar sx={{ mx: "auto", mb: 1, bgcolor: "primary.main" }}>
            <LockedOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          {serverError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError}
            </Alert>
          )}

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Field
                  name="username"
                  as={TextField}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={touched.username && Boolean(errors.username)}
                  helperText={<ErrorMessage name="username" />}
                  sx={{ my: 1 }}
                />

                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={touched.password && Boolean(errors.password)}
                  helperText={<ErrorMessage name="password" />}
                  sx={{ m: 0 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1, mb: 3 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <Typography component="p">
                  Do you have an account? <Link href="/sign-in">Sign In</Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterForm;
