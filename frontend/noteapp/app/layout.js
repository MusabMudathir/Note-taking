"use clinet";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from '@chakra-ui/react'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Note App",
  description: "Software Api Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full bg-gray-800 text-white p-4 mb-3">
          <ul className="flex justify-between">
            <li>
              <a href="/">Notes App</a>
            </li>
          </ul>
        </div>
        <ChakraProvider>
        <div className="flex w-full h-full  items-center justify-center ">{children}</div>
        </ChakraProvider>
      </body>
    </html>
  );
}
