import { ThemeProvider } from "@/components/theme-provider";
import { ActiveMapProvider } from "@/context/ActiveMapContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ActiveMapProvider>
        <Component {...pageProps} />
      </ActiveMapProvider>
    </ThemeProvider>
  )
}
