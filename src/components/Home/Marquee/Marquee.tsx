import Marquee from "react-fast-marquee";

const ScrollingMarquee = () => {
  const keywords = [
    { name: "CARROTS", emoji: "🥕" },
    { name: "POTATOES", emoji: "🥔" },
    { name: "TOMATOES", emoji: "🍅" },
    { name: "CABBAGE", emoji: "🥬" },
    { name: "BROCCOLI", emoji: "🥦" },
    { name: "SPINACH", emoji: "🍃" },
    { name: "LETTUCE", emoji: "🥗" },
    { name: "CUCUMBERS", emoji: "🥒" },
    { name: "PEPPERS", emoji: "🌶️" },
    { name: "ONIONS", emoji: "🧅" },
  ];

  const groupedKeywords = keywords.map((keyword, index) => (
    <span
      key={index}
      className="flex items-center space-x-6 text-2xl font-bold transition-all duration-300 transform hover:scale-110 hover:text-[#fff] hover:rotate-3 hover:shadow-lg"
    >
      <span className="text-4xl">{keyword.emoji}</span>
      <span className="text-[#F7F7F7]">{keyword.name}</span>
    </span>
  ));

  return (
    <div className=" overflow-hidden bg-gradient-to-l from-[#82C408] via-[#82C408] to-[#000] shadow-xl">
      <Marquee gradient={true} speed={80}>
        <div className="flex items-center space-x-12 mx-6">
          {groupedKeywords}
          <div className="mx-16" />
        </div>
        <div className="flex items-center space-x-12 mx-6">
          {groupedKeywords}
          <div className="mx-16" />
        </div>
        <div className="flex items-center space-x-12 mx-6">
          {groupedKeywords}
        </div>
      </Marquee>
    </div>
  );
};

export default ScrollingMarquee;
