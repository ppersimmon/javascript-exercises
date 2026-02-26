import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blue } from "@mui/material/colors";

import Post from "../components/Post";
import Loading from "../components/Loading";
import { useSinglePost } from "../hooks/useSinglePost";

const SinglePostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, showDelete } = useSinglePost(id);

  if (loading) {
    return (
      <Box sx={{ mt: 10 }}>
        <Loading />
      </Box>
    );
  }

  if (error || !data) {
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

        <Post {...data} showDelete={showDelete} />
      </Container>
    </Box>
  );
};

export default SinglePostPage;
