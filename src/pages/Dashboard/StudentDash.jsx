import {useEffect, useState} from "react";

function QuoteBar() {
  const [quotes, setQuotes] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");

  // Fetch quotes on mount
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/quotes");
        if (response.ok) {
          const data = await response.json();
          setQuotes(data);
        } else {
          console.error("Failed to fetch quotes:", response.status);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  // Animate text transitions
  useEffect(() => {
    if (quotes.length === 0) return;

    const timer = setTimeout(() => {
      setAnimationClass("animate__fadeOutRight");

      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % quotes.length);
        setAnimationClass("animate__fadeInLeft");
      }, 500); // Match fadeOut duration
    }, 8000); // Total display time per quote

    return () => clearTimeout(timer);
  }, [currentTextIndex, quotes]);

  if (quotes.length === 0) {
    return <div>Loading texts...</div>;
  }

  return (
    <div className="bg-indigo-600 m-10 h-35 rounded-2xl">
      <div
        className={` text-2xl p-6 text-white font-bold animate__animated ${animationClass}`}>
        {quotes[currentTextIndex]?.quoteDes || "No quote available"}
      </div>
    </div>
  );
}

function ChallengeBar() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch("http://localhost:5000/api/challenges");
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    }
    fetchChallenges();
  }, []);

  return (
    <>
      <div className="flex   w-screen h-100 p-10">
        {challenges.map((c) => (
          <div
            key={c.id}
            className=" grid items-center bg-gray-100 h-80 w-100 border border-gray-400 rounded-2xl shadow-2xl p-5 m-6 text-xl  ">
            <h1>
              <span className=" font-bold">Title:</span>
              {c.title}
            </h1>
            <h3>
              <span className=" font-bold">difficulty:</span> {c.difficulty}
            </h3>
            <h3>
              <span className=" font-bold"> deadline:</span>
              {c.deadline}
            </h3>
            <h3>
              <span className=" font-bold">challengeType:</span>{" "}
              {c.challengeType}
            </h3>
            <h3>
              <span className=" font-bold">professor:</span>
              {}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}
function Dashboard() {
  return (
    <>
      <QuoteBar />;
      <ChallengeBar />
    </>
  );
}

export default Dashboard;
