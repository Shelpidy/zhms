"use client";
import "./globals.css";
import "primeicons/primeicons.css";
import "primereact/primereact.all";
import "react-chat-elements/dist/main.css";

// import { Inter, Poppins } from "next/font/google";
import { CssBaseline, createTheme, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useMemo, useReducer, useState } from "react";
import Footer from "@/components/Footer";
import Provider from "react-redux";
import Store from "@/redux/store";
import Header from "@/components/NavHeader/Header";
import { CookiesProvider } from "react-cookie";

// const inter = Inter({ subsets: ['latin'] })
// const poppinsLight = Poppins({weight:"300",variable:"--poppinsLight",subsets: ['latin']})
// const poppinsMedium = Poppins({weight:"500",variable:"--poppinsMedium",subsets: ['latin']})

export const metadata = {
  title: "SLMS",
  description: "Digital Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode || themeMode === "dark" ? "dark" : "light",
          primary: {
            main:
              prefersDarkMode || themeMode === "dark" ? "#f49d37" : "#140f2d",
            light:
              prefersDarkMode || themeMode === "light" ? "#f49d37" : "#140f2d",
          },
          secondary: {
            main:
              prefersDarkMode || themeMode === "dark" ? "#e6bdbd" : "#765657",
          },
        },
        typography: {
          fontFamily: ["PoppinsLight","PoppinsMedium", "Inter"].join(","),
        },
      }),
    [prefersDarkMode, themeMode],
  );

  return (
    <html lang="en">
      <body
        className={
          themeMode === "dark"
            ? "hide-scrollbar bg-black"
            : "hide-scrollbar bg-white"
        }
      >
        <div>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header
                setThemeMode={() =>
                  setThemeMode(themeMode == "light" ? "dark" : "light")
                }
              />
              {children}
              <Footer />
            </ThemeProvider>
          </CookiesProvider>
        </div>
      </body>
    </html>
  );
}
