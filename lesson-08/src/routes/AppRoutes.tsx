import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";
import { RootState } from "../store/store";
import HomePage from "../layouts/HomePage";
import StripePage from "../layouts/StripePage";
import LoginForm from "../layouts/LoginPage";
import RegisterForm from "../layouts/RegisterPage";
import SinglePostPage from "../layouts/SinglePostPage";
import { UserStateType } from "../interfaces/userType";

const AppRoutes = () => {
  const authState = useSelector((state: RootState) => state.users.authState);
  const isAuth = authState === UserStateType.LOGGED_IN;

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
