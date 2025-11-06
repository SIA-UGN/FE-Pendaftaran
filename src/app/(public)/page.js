import Announcement from "@/components/landing-page/Announcement";
import HomeCarousel from "@/components/landing-page/HomeCarousel";
import Menu from "@/components/landing-page/Menu";
import News from "@/components/landing-page/News";

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
