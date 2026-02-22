import { Box, Toolbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import ControlBar from "../../components/ControlBar";
import PostList from "../../components/PostList";
import AppPaginationWrapper from "../../components/AppPaginationWrapper";
import { getEveryUserExhibit } from "../../api/exhibitActions";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function MyProfilePage({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("token");

  const userIdCookie = cookieStore.get("userId")?.value;
  const currentUserId = userIdCookie ? Number(userIdCookie) : null;
  const token = cookieStore.get("token")?.value;

  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);

  let posts = [];
  let totalPages = 1;
  let error = null;

  try {
    const response: any = await getEveryUserExhibit(page, token);

    let fetchedPosts = [];
    if (response.data && Array.isArray(response.data)) {
      fetchedPosts = response.data;
      totalPages = response.lastPage || 1;
    } else if (Array.isArray(response)) {
      fetchedPosts = response;
      totalPages = 1;
    } else {
      fetchedPosts = [];
      totalPages = 1;
    }

    posts = fetchedPosts;
  } catch (err: any) {
    const errorMessage = err?.message || "";
  }

  const pathname = "/my-profile";
  return (
    <div>
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
    </div>
  );
}
