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
  CircularProgress,
  Alert,
} from "@mui/material";
import LockedOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { loginUserThunk } from "../store/slices/userSlice";

const LoginSchema = Yup.object({
  username: Yup.string().required().min(3, "username is too short"),
  password: Yup.string().required(),
});

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (
    values: { username: string; password: string },
    { setSubmitting }: FormikHelpers<{ username: string; password: string }>,
  ) => {
    setServerError(null);

    try {
      const resultAction = await dispatch(loginUserThunk(values));
      if (loginUserThunk.fulfilled.match(resultAction)) {
        navigate("/my-profile");
      } else {
        setServerError("Invalid username or password");
      }
    } catch (err) {
      setServerError("Login failed. Please try again.");
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
            Sign In
          </Typography>

          {serverError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError}
            </Alert>
          )}

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
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
                    "Sign In"
                  )}
                </Button>

                <Typography component="p">
                  Don't have an account? <Link to={"/sign-up"}>Sign Up</Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
