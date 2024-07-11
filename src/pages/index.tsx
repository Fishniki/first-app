import Navbar from "@/components/layouts/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-red-500">Hello Word</h1>
    </div>
  );
}
