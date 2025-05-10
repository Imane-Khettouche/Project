import {useState} from "react";
function QuoteForm() {
  const [quoteDes, setQuote] = useState("");
  const [owner, setOwner] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({quoteDes, owner}),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setQuote("");
        setOwner("");
      } else {
        setMessage(data.message || "Error creating quote");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to the server");
    }
  };

  return (
    <>
      <form
        className="grid bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}>
        <h1>Enter the Quote</h1>
        <textarea
          rows={3}
          className="border border-gray-500 mt-3"
          value={quoteDes}
          onChange={(e) => setQuote(e.target.value)}
        />
        <h1>Enter the Source</h1>
        <input
          type="text"
          className="border border-gray-500 mt-3"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 mt-3 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </>
  );
}
export default QuoteForm;
