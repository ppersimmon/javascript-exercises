import { useState } from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router";
import NewPost from "../layouts/NewPost";
import { logout } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/hooks";
import { RootState } from "../store/store";
import { ExhibitType } from "../interfaces/ExhibitType";
import { UserStateType } from "../interfaces/userType";

interface ControlBarProps {
  onPostCreated?: (post: ExhibitType) => void;
}

const ControlBar = ({ onPostCreated }: ControlBarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const authState = useSelector((state: RootState) => state.users.authState);
  const isAuth = authState === UserStateType.LOGGED_IN;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handlePostSuccess = (post: ExhibitType) => {
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
            <Button sx={{ color: "#ffffff" }} onClick={() => navigate("/")}>
              All Posts
            </Button>
            {isAuth && (
              <Button
                sx={{ color: "#ffffff" }}
                onClick={() => navigate("/my-profile")}
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
                  onClick={() => navigate("/sign-in")}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "#ffffff", borderColor: "#ffffff" }}
                  onClick={() => navigate("/sign-up")}
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
