import Image from "next/image";

import Announcement from "@/components/Announcement";
import HomeCarousel from "@/components/HomeCarousel";
import Menu from "@/components/Menu";

export default function Home() {
  return (
    <div>
      <HomeCarousel />
      <Menu />
      <Announcement />
    </div>
  );
}
