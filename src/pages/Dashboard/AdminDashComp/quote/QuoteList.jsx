import {useEffect} from "react";
import {useState} from "react";
import QuoteForm from "./QuoteForm"
function QuotesList() {
  const [quotes, setQuotes] = useState([]);
  const [displayedContent, setDisplayedContent] = useState(null);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch("http://localhost:5000/api/quotes");
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    }
    fetchQuotes();
  }, []);

  const handleButtonClick = (Component) => {
    setDisplayedContent(<Component />);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this quote?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:5000/api/quotes/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setQuotes((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(data.message || "Error deleting quote");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to connect to the server");
    }
  };

  return (
    <section id="quotes" className="mt-10">
      <h3 className="text-lg font-bold mb-4">Quote Management</h3>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => handleButtonClick(QuoteForm)}>
        Add a Quote
      </button>
      {displayedContent}
      <table className="w-full table-auto bg-white rounded-lg shadow">
        <thead>
          <tr>
            <td className="p-2">Source</td>
            <td className="p-2">Quote</td>
            <td className="p-2">Actions</td>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr key={q.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{q.owner}</td>
              <td className="border border-gray-300 px-4 py-2">{q.quoteDes}</td>
              <td className="flex p-2 ">
                <button
                  className="text-red-500 px-2 mx-0.5 py-1 rounded-lg"
                  onClick={() => handleDelete(q.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}export default QuotesList;
