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
      className="flex items-center space-x-4 text-2xl font-bold"
    >
      <span className="text-white">{keyword.emoji}</span>
      <span>{keyword.name}</span>
    </span>
  ));

  return (
    <div className="bg-gradient-to-r from-[#14B8A6] to-gray-800 text-white py-6 overflow-hidden">
      <Marquee gradient={false} speed={80}>
        <div className="flex items-center space-x-6 mx-6">
          {groupedKeywords}
          <div className="mx-16" />
        </div>
        <div className="flex items-center space-x-6 mx-6">
          {groupedKeywords}
          <div className="mx-16" />
        </div>
        <div className="flex items-center space-x-6 mx-6">
          {groupedKeywords}
        </div>
      </Marquee>
    </div>
  );
};

export default ScrollingMarquee;
