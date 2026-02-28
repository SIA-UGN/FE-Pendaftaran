import Announcement from "@/components/landing-page/Announcement";
import HomeCarousel from "@/components/landing-page/HomeCarousel";
import Menu from "@/components/landing-page/Menu";
import News from "@/components/landing-page/News";
import StatsStrip from "@/components/landing-page/StatsStrip";

export default function Home() {
  return (
    <div>
      <HomeCarousel />
      <StatsStrip />
      <Menu />
      <Announcement />
      <News />
    </div>
  );
}
