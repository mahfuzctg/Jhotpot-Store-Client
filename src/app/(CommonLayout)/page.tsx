import ScrollingMarquee from "@/src/components/Home/Marquee/Marquee";
import Banner from "../../components/Home/Banner/Banner";

const page = () => {
  return (
    <div className="pt-16 lg:pt-0">
      <Banner />
      <div className="">
        <ScrollingMarquee />
      </div>
    </div>
  );
};

export default page;
