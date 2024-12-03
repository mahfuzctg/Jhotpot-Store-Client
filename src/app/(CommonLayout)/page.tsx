import FeatureSection from "@/src/components/Home/Feature/Feature";
import Footer from "@/src/components/Home/Footer/Footer";
import ScrollingMarquee from "@/src/components/Home/Marquee/Marquee";
import Banner from "../../components/Home/Banner/Banner";

const page = () => {
  return (
    <div className="pt-16 lg:pt-0">
      <Banner />
      <>
        <ScrollingMarquee />
      </>

      <div className="py-16">
        <FeatureSection />
      </div>
      <div className="pt-16">
        <Footer />
      </div>
    </div>
  );
};

export default page;
