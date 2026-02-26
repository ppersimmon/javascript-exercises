import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./store/store";
import NotificationComponent from "./providers/Notification";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NotificationComponent>
          <AppRoutes />
        </NotificationComponent>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
