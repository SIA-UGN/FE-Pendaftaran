import Announcement from "@/components/Announcement";
import HomeCarousel from "@/components/HomeCarousel";
import Menu from "@/components/Menu";
import News from "@/components/News";

export default function Home() {
  return (
    <div>
      <HomeCarousel />
      <Menu />
      <Announcement />
      <News />
    </div>
  );
}
