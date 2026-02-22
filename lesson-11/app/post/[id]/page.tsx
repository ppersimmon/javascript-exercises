import { Box, Typography, Button, Container } from "@mui/material";
import { blue } from "@mui/material/colors";
import Link from "next/link";
import { getSingleExhibit } from "../../../api/exhibitActions";
import SinglePostClient from "../../../components/SinglePostPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SinglePostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const postId = Number(resolvedParams.id);
  let post = null;
  let error = null;

  try {
    post = await getSingleExhibit(postId);
  } catch (e) {
    error = "Post not found";
  }

  if (error || !post) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Link href="/" passHref>
          <Button variant="contained">Go Home</Button>
        </Link>
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
        <SinglePostClient post={post} />
      </Container>
    </Box>
  );
}
