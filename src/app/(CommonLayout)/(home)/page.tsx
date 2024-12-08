import Banner from "@/src/components/Home/Banner/Banner";
import FeatureSection from "@/src/components/Home/Feature/Feature";
import ScrollingMarquee from "@/src/components/Home/Marquee/Marquee";

const page = () => {
  return (
    <div className="pt-16 lg:pt-0">
      <Banner />
      <div className="py-14">
        <ScrollingMarquee />
      </div>
      <div className="pb-8">
        <FeatureSection />
      </div>
    </div>
  );
};

export default page;
