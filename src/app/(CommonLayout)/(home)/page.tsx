import Banner from "@/src/components/Home/Banner/Banner";
import FeatureSection from "@/src/components/Home/Feature/ChooseUs";
import ScrollingMarquee from "@/src/components/Home/Marquee/Marquee";

const page = () => {
  return (
    <div className="pt-16 lg:pt-0">
      <Banner />
      <>
        <ScrollingMarquee />
      </>
     
    </div>
  );
};

export default page;
