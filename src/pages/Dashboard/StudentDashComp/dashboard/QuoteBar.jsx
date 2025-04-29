import { useState, useEffect } from "react";

function QuoteBar() {
  const [quotes, setQuotes] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/quotes");
        if (response.ok) {
          const data = await response.json();
          setQuotes(data);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;
    const timer = setTimeout(() => {
      setAnimationClass("animate__fadeOutRight");
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % quotes.length);
        setAnimationClass("animate__fadeInLeft");
      }, 500);
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentTextIndex, quotes]);

  if (quotes.length === 0) return <div>Loading texts...</div>;

  return (
    <div className="bg-indigo-600 h-35 rounded-2xl">
      <div className={`text-2xl p-6 text-white font-bold animate__animated ${animationClass}`}>
        {quotes[currentTextIndex]?.quoteDes || "No quote available"}
      </div>
    </div>
  );
}

export default QuoteBar;