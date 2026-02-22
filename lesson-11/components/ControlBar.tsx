"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AppBar, Toolbar, Box, Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import NewPost from "./NewPost";
import { logout } from "../store/slices/userSlice";
import { RootState } from "../store/store";
import Cookies from "js-cookie";

interface ControlBarProps {
  onPostCreated?: (post: any) => void;
  serverIsAuth: boolean;
}

const ControlBar = ({ onPostCreated, serverIsAuth }: ControlBarProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const user = useAppSelector((state: RootState) => state.users.singleUser);
  const isAuth = !!user || serverIsAuth;

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token", { path: "/" });
    router.push("/");
    router.refresh();
  };

  const handlePostSuccess = (post: any) => {
    if (onPostCreated) {
      onPostCreated(post);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Stack
          direction="row"
          sx={{ width: "100%", height: "100%" }}
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            {isAuth && (
              <Button
                sx={{ color: "#ffffff" }}
                onClick={() => setModalOpen(true)}
              >
                Add New Post
              </Button>
            )}
          </Box>

          <Box
            sx={{ flex: 1, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button sx={{ color: "#ffffff" }} onClick={() => router.push("/")}>
              All Posts
            </Button>
            {isAuth && (
              <Button
                sx={{ color: "#ffffff" }}
                onClick={() => router.push("/my-profile")}
              >
                My Posts
              </Button>
            )}
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            {isAuth ? (
              <Button sx={{ color: "#ffffff" }} onClick={handleLogout}>
                Log Out
              </Button>
            ) : (
              <>
                <Button
                  sx={{ color: "#ffffff" }}
                  onClick={() => router.push("/sign-in")}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "#ffffff", borderColor: "#ffffff" }}
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Stack>

        <NewPost
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          onPostCreated={handlePostSuccess}
        />
      </Toolbar>
    </AppBar>
  );
};

export default ControlBar;
