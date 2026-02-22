import { Box, Toolbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import { cookies } from "next/headers";
import { getEveryExhibit } from "../api/exhibitActions";
import ControlBar from "../components/ControlBar";
import PostList from "../components/PostList";
import AppPaginationWrapper from "../components/AppPaginationWrapper";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("token");

  const userIdCookie = cookieStore.get("userId")?.value;
  const currentUserId = userIdCookie ? Number(userIdCookie) : null;

  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);

  let posts = [];
  let totalPages = 1;
  let error = null;

  try {
    const response: any = await getEveryExhibit(page);

    if (response.data && Array.isArray(response.data)) {
      posts = response.data;
      totalPages = response.lastPage || 1;
    } else if (Array.isArray(response)) {
      posts = response;
      totalPages = 1;
    } else {
      posts = [];
      totalPages = 1;
    }
  } catch (err: any) {
    const errorMessage = err?.message || "";
  }

  const pathname = "/";
  return (
    <Box
      sx={{
        bgcolor: blue[50],
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        pb: 4,
      }}
    >
      <ControlBar serverIsAuth={hasToken} />
      <Toolbar />

      <PostList posts={posts} error={error} currentUserId={currentUserId} />

      {!error && totalPages > 1 && (
        <AppPaginationWrapper
          count={totalPages}
          page={page}
          pathname={pathname}
        />
      )}
    </Box>
  );
}
