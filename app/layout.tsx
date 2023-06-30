//"use client";
import "./globals.css";
import { Inter, Roboto_Mono } from "next/font/google";
import { DataverseContext, DataverseProvider } from "@/app/context/Context";
import { ToggleProvider } from "./context/ToggleContext";
import { Polybase, SignerResponse } from "@polybase/client";
import { Auth } from "@polybase/auth";
import { useContext } from "react";
import { SignMethod } from "@dataverse/runtime-connector";
import { PolybaseProvider } from "./context/PolybaseContext";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto_Mono({ subsets: ["latin"] });

const auth = typeof window !== "undefined" ? new Auth() : null;

export const metadata = {
  title: "Match",
  description: "Decentralized Dating App",
  img: "/LikeIcon.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { runtimeConnector } = useContext(DataverseContext);

  return (
    <DataverseProvider>
      <ToggleProvider>
        <html lang="en">
          <body className={`${roboto.className} bg-black`}>{children}</body>
        </html>
      </ToggleProvider>
    </DataverseProvider>
  );
}
