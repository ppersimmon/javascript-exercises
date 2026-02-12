import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";
import { RootState } from "../store/store";
import HomePage from "../layouts/HomePage";
import StripePage from "../layouts/StripePage";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useAppDispatch } from "../store/hooks";
import { getUserData } from "../api/userActions";
import { setUser } from "../store/slices/userSlice";
import SinglePostPage from "../layouts/SinglePostPage";

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.users.singleUser);
  const isAuth = !!user || !!localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      getUserData()
        .then((userData) => {
          dispatch(setUser(userData));
        })
        .catch((err) => {
          console.error("Failed to restore user session", err);
        });
    }
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="/" element={<StripePage />} />
      <Route path="/post/:id" element={<SinglePostPage />} />
      <Route
        element={
          <ProtectedRoute isAllowed={!isAuth} redirectPath="/my-profile" />
        }
      >
        <Route path="/sign-in" element={<LoginForm />} />
        <Route path="/sign-up" element={<RegisterForm />} />
      </Route>
      <Route
        element={<ProtectedRoute isAllowed={isAuth} redirectPath="/sign-in" />}
      >
        <Route path="/my-profile" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
