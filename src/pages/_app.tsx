import AppShell from "@/components/layouts/Appshel";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
      <div>Content</div>
    </AppShell>

  )
}
