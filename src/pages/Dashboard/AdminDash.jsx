import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Logo from "../../img/Logo.jpg";
import dashIcon from "../../img/Dashboard.svg";
import {useUser} from "../UserContext.jsx";

function AdminInfo() {
  const {userData} = useUser();
  if (!userData) {
    return <p className="text-center mt-5 text-red-500">There is no info</p>;
  }

  return (
    <div className="justify-center  bg-gray-100 p-5 h-screen">
      <div className="bg-gray-200 rounded-full w-30 h-29 text-5xl flex justify-center place-items-center ">
        {" "}
        <p className="place-items-center p-5">{userData.name[0]}</p>
      </div>
      <h1 className="font-bold text-xl">{userData.name}</h1>
      <p className="">{userData.email}</p>
    </div>
  );
}
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert(data.message || "Error deleting user");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to connect to the server");
    }
  };

  return (
    <div className="bg-gray-100 m-4 p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">User Management</h3>

      {users.length > 0 ? (
        <table className="w-full table-auto bg-white rounded-lg shadow">
          <thead>
            <tr className="font-bold">
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    className="text-red-600 px-2 mx-5 py-1 rounded-lg cursor-pointer"
                    onClick={() => deleteUser(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
}

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
}

function ChallengeList() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch("http://localhost:5000/api/Challenges");
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error("Error fetching Challenges:", error);
      }
    }

    fetchChallenges();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this challenge?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/challenges/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setChallenges((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(data.message || "Error deleting challenge");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to connect to the server");
    }
  };

  return (
    <section id="challenges" className="mt-10">
      <h3 className="text-lg font-bold mb-4">Challenge Management</h3>

      <table className="w-full table-auto bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr>
            <td className="p-2">ID</td>
            <td className="p-2">Title</td>
            <td className="p-2">Description</td>
            <td className="p-2">Difficulty</td>
            <td className="p-2">Deadline</td>
            <td className="p-2">Type</td>
            <td className="p-2">Professor</td>
            <td className="p-2">Actions</td>
          </tr>
        </thead>
        <tbody>
          {challenges.map((c) => (
            <tr key={c.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{c.id}</td>
              <td className="border border-gray-300 px-4 py-2">{c.title}</td>
              <td className="border border-gray-300 px-4 py-2 overflow-x-hidden">
                {c.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {c.difficulty}
              </td>
              <td className="border border-gray-300 px-4 py-2">{c.deadline}</td>
              <td className="border border-gray-300 px-4 py-2">
                {c.challengeType}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {c.professorID}
              </td>
              <td className="flex p-2 ">
                <button
                  className="text-red-500 px-2 mx-0.5 py-1 rounded-lg"
                  onClick={() => handleDelete(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Aside() {
  const [displayedContent, setDisplayedContent] = useState(null);

  const handleButtonClick = (Component) => {
    setDisplayedContent(<Component />);
  };

  return (
    <>
      <aside className="w-1/5 bg-white p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          <img src={Logo} width="250px" />
        </h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a
                href="#"
                className="flex  text-gray-600 hover:text-indigo-600"
                onClick={() => handleButtonClick(Dashboard)}>
                <img src={dashIcon} className="w-5" /> Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => handleButtonClick(ChallengeList)}>
                🏆 Challenges
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => handleButtonClick(UserList)}>
                👤 User Management
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#quotes"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => handleButtonClick(QuotesList)}>
                💬 Quote Management
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      {displayedContent}
    </>
  );
}
function Dashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [challengesCount, setChallengesCount] = useState(0);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [quotesCount, setQuotesCount] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state to show while fetching data
  const [error, setError] = useState(null); // Error state to handle any fetch errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("http://localhost:5000/api/users");
        const userData = await userRes.json();
        setUsersCount(userData.length);

        const challengeRes = await fetch(
          "http://localhost:5000/api/challenges"
        );
        const challengeData = await challengeRes.json();
        setChallengesCount(challengeData.length);

        const attemptRes = await fetch("http://localhost:5000/api/attempts");
        const attemptData = await attemptRes.json();
        setAttemptsCount(attemptData.length);

        const quoteRes = await fetch("http://localhost:5000/api/quotes");
        const quoteData = await quoteRes.json();
        setQuotesCount(quoteData.length);

        setLoading(false); // Data is fetched, set loading to false
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data"); // Set error message if fetch fails
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  if (loading) {
    return <p className="text-center text-gray-600">جارٍ تحميل البيانات...</p>; // Display loading message
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; // Display error message if fetch fails
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">لوحة التحكم</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="👥 إجمالي المستخدمين"
          count={usersCount}
          color="bg-blue-100"
        />
        <Card
          title="🧩 إجمالي التحديات"
          count={challengesCount}
          color="bg-green-100"
        />
        <Card
          title="📝 إجمالي المحاولات"
          count={attemptsCount}
          color="bg-yellow-100"
        />
        <Card
          title="💬 إجمالي الاقتباسات"
          count={quotesCount}
          color="bg-purple-100"
        />
      </div>
    </div>
  );
}

function Card({title, count}) {
  return (
    <div className={`rounded-xl shadow p-6 bg-indigo-500`}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-gray-800">{count}</p>
    </div>
  );
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
const Main = () => {
  return (
    <div className="flex h-screen">
      <Aside />
      <main className="flex-1  overflow-auto">
        <div className="flex justify-end items-center ">
          <AdminInfo />
        </div>
      </main>
    </div>
  );
};

export default Main;
