import type { Metadata } from "next";
import { ReduxProvider } from "../providers/Provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import NotificationComponent from "../providers/Notification";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <AppRouterCacheProvider>
          <ReduxProvider>
            <NotificationComponent>{children}</NotificationComponent>
          </ReduxProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
