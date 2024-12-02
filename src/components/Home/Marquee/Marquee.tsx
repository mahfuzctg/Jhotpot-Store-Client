import Marquee from "react-fast-marquee";

const ScrollingMarquee = () => {
  const keywords = [
    "JACKETS",
    "WOMEN",
    "SHIRTS",
    "SHOES",
    "HATS",
    "JEANS",
    "ACCESSORIES",
    "BAGS",
    "SNEAKERS",
    "HOODIES",
  ];

  const groupedKeywords = keywords.map((keyword, index) => (
    <span
      key={index}
      className="flex items-center space-x-4 text-2xl font-bold"
    >
      <span className="text-white">✷</span>
      <span>{keyword}</span>
    </span>
  ));

  return (
    <div className="bg-primary text-white py-6 overflow-hidden">
      <Marquee gradient={false} speed={80}>
        {/* Group 1 */}
        <div className="flex items-center space-x-6 mx-6">
          {groupedKeywords}
          <div className="mx-16" />
        </div>
        {/* Group 2 */}
        <div className="flex items-center space-x-6 mx-6">
          {groupedKeywords}
          <div className="mx-16" />
        </div>
        {/* Group 3 */}
        <div className="flex items-center space-x-6 mx-6">
          {groupedKeywords}
        </div>
      </Marquee>
    </div>
  );
};

export default ScrollingMarquee;

// previous
