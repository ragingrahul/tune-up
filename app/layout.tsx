import "./globals.css";
import { Inter, Roboto_Mono } from "next/font/google";
import { DataverseProvider } from "@/app/context/Context";
import { ToggleProvider } from "./context/ToggleContext";
import { WalletProvider } from "./context/WalletContext";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DataverseProvider>
      <WalletProvider>
        <ToggleProvider>
          <html lang="en">
            <body className={`${roboto.className} bg-black`}>{children}</body>
          </html>
        </ToggleProvider>
      </WalletProvider>
    </DataverseProvider>
  );
}
