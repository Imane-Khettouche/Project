import {useState, useEffect} from "react";
import ChallengeDetails from "./ChallengeDetails.jsx";

function ChallengesBar() {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showChallenges, setShowChallenges] = useState(true);

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

  const formatDate = (deadline) => {
    const date = new Date(deadline);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBackToChallenges = () => {
    setShowChallenges(true);
    setSelectedChallenge(null);
  };

  const handleViewDetails = (challenge) => {
    setSelectedChallenge(challenge);
    setShowChallenges(false);
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
         <h1 className="text-2xl font-bold mb-6 text-center">All Challenges</h1>

         {showChallenges && (
           <div className="space-y-4">
             {challenges.length > 0 ? (
               challenges.map((ch) => {
                 return (
                   <div
                     key={ch.id}
                     className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
                     <div>
                       <h2 className="text-lg font-semibold text-gray-800">
                         {ch.title}
                       </h2>
                       <p className="text-sm text-gray-500">
                         Deadline: {formatDate(ch.deadline)}
                       </p>
                     </div>
                     <div className="flex gap-2">

                       <button
                         onClick={() => handleViewDetails(ch)}
                         className="px-4 py-2 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700 transition duration-300">
                         View Details
                       </button>
                     </div>
                   </div>
                 );
               })
             ) : (
               <p className="text-center text-gray-500">
                 No challenges available yet.
               </p>
             )}
           </div>
         )}

         {!showChallenges && selectedChallenge  && (
           <div>
             <button
               onClick={handleBackToChallenges}
               className="px-4 py-2 mb-4 rounded-lg text-white bg-gray-600 hover:bg-gray-700">
               Back to Challenges
             </button>
             <ChallengeDetails challenge={selectedChallenge} />
           </div>
         )}


       </div>
  );
}
export default ChallengesBar;
