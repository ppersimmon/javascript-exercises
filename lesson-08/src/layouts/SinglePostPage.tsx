import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blue } from "@mui/material/colors";

import Post from "../components/Post";
import { getSingleExhibit } from "../api/exhibitActions";
import { ExhibitType } from "../interfaces/ExhibitType";
import { useAppSelector } from "../store/hooks";

const SinglePostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<ExhibitType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useAppSelector((state) => state.users.singleUser);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getSingleExhibit(Number(id));
        setPost(data);
      } catch (e) {
        console.error(e);
        setError("Post not found or deleted");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: blue[50],
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 4,
        pb: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            variant="outlined"
          >
            Back
          </Button>
        </Box>

        <Post post={post} showDelete={currentUser?.id === post.user.id} />
      </Container>
    </Box>
  );
};

export default SinglePostPage;
