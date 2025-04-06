/*import {useState, useEffect} from "react";
import "animate.css";

function TextCarousel() {
  const texts = ["Text 1", "Text 2", "Text 3"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass("animate__fadeOutRight");
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setAnimationClass("animate__fadeInLeft");
      }, 500); // Match fadeOutRight duration
    }, 8000); // Show text for 3 seconds

    return () => clearTimeout(timer);
  }, [currentTextIndex, texts]);

  return (
    <div className=" bg-indigo-600 justify-center items-center">
      <div className={`text-3xl m-3 p-10 font-bold animate__animated ${animationClass}`}>
        {texts[currentTextIndex]}
      </div>
    </div>
  );
}

export default TextCarousel;
*/
/*import {useEffect, useState} from "react";

function AdminInfo() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Or handle the loading state
  }

  return (
    <>
      <div className="flex justify-center items-center h-50% bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md m-10">
          <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      </div>
    </>
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
        // Adjust the URL if necessary
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({quoteDes, owner}),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Success message from the server
        setQuote("");
        setOwner("");
      } else {
        setMessage(data.message || "Error creating quote"); // Error message
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to the server");
    }
  };
  return (
    <div className="flex justify-center items-center  h-50% bg-gray-100">
      <form
        className="grid bg-white p-8 rounded-lg shadow-md m-10"
        onSubmit={handleSubmit}>
        <h1>give the Quote</h1>
        <textarea
          type="text"
          className="border border-gray-500 mt-3"
          value={quoteDes}
          onChange={(e) => setQuote(e.target.value)}
        />
        <h1>give the owner</h1>
        <input
          type="text"
          className="border border-gray-500 mt-3"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-500 mt-3 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>{" "}
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
}

function QuotesList() {
  const [quotes, setQuotes] = useState([]);

  // Fetch quotes when the component loads
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

  return (
    <div className="bg-gray-100 m-20 p-5">
      <h2 className="text-xl font-bold mb-4">Quotes</h2>
      {quotes.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Owner</th>
              <th className="border border-gray-300 px-4 py-2">Quote</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{q.owner}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {q.quoteDes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading quotes...</p>
      )}
    </div>
  );
}
function UserList() {
  const [users, getUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        getUsers(data);
      } catch (error) {
        console.log("Error fetching quotes:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <>
      <div className="bg-gray-100 m-20 p-5">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">id</th>
                <th className="border border-gray-300 px-4 py-2">name</th>
                <th className="border border-gray-300 px-4 py-2">email</th>
                <th className="border border-gray-300 px-4 py-2">role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{u.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{u.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {u.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </>
  );
}*/
import {useState} from "react";

// Example functions (replace with yours)
function generateUserData() {
  return (
    <div>
      <h2>User Data</h2>
      <p>Name: John Doe</p>
      <p>Email: john.doe@example.com</p>
    </div>
  );
}

function displayQuote() {
  return (
    <div>
      <h2>Quote of the Day</h2>
      <p>
        "The only way to do great work is to love what you do." - Steve Jobs
      </p>
    </div>
  );
}

function NumberList() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {numbers.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
    </div>
  );
}
function FunctionDisplay() {
  const [displayedContent, setDisplayedContent] = useState(null);

  const handleButtonClick = (contentFunction) => {
    setDisplayedContent(contentFunction());
  };

  return (
    <div>
      <button onClick={() => handleButtonClick(generateUserData)}>
        Show User Data
      </button>
      <button onClick={() => handleButtonClick(displayQuote)}>
        Show Quote
      </button>
      <button onClick={() => handleButtonClick(NumberList)}>
        Show Numbers
      </button>

      {displayedContent}
    </div>
  );
}

export default FunctionDisplay; /*
export default function example() {
  return (
    <>

    </>
  );
}
*/
{
  /* Défis en cours */
}
{
  /* <h3 className="text-lg font-bold mb-4">Défis en cours</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold">📘 Développement Web</h4>
            <p className="text-gray-600 text-sm">
              Créer une application avec React.js
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold">🖥 Bases de Données</h4>
            <p className="text-gray-600 text-sm">
              Concevoir un schéma UML et implémenter avec MySQL
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold">⚡️ Interaction Enseignant-Étudiant</h4>
            <p className="text-gray-600 text-sm">
              Optimiser les retours sur les soumissions
            </p>
          </div>
        </div>*/
}
{
  /* Gestion des utilisateurs */
}
{
  /*  {activeTable === <UserList /> && (

        )}
      */
}
{
  /* Gestion des défis */
}
{
  /*} {activeTable === "challenges" && (
          <section id="challenges" className="mt-10">
            <h3 className="text-lg font-bold mb-4">Gestion des défis</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4">
              Ajouter un défi
            </button>
            <table className="w-full table-auto bg-white rounded-lg shadow">
              <thead>
                <tr>
                  <th className="p-2">Nom du défi</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Développement Web</td>
                  <td className="p-2">Créer une application avec React.js</td>
                  <td className="p-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded-lg">
                      Modifier
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-lg">
                      Supprimer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
        {/* Gestion des citations */
}
{
  /*}   {activeTable === "quotes" && (
     }     <section id="quotes" className="mt-10">
            <h3 className="text-lg font-bold mb-4">Gestion des citations</h3>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg mb-4">
              Ajouter une citation
            </button>
            <table className="w-full table-auto bg-white rounded-lg shadow">
              <thead>
                <tr>
                  <th className="p-2">Citation</th>
                  <th className="p-2">Source</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">&quot;Le savoir est le pouvoir&quot;</td>
                  <td className="p-2">Francis Bacon</td>
                  <td className="p-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded-lg">
                      Modifier
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-lg">
                      Supprimer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
        {/* Portfolio */
}
{
  /*}    {activeTable === "portfolio" && (
          <section id="portfolio" className="mt-10">
            <h3 className="text-lg font-bold mb-4">
              Portfolio des utilisateurs
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold">Projet Web</h4>
                <p className="text-gray-600 text-sm">
                  Description du projet...
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
}
function AdminDash() {
  return (
    <>
      <AdminDashboard />
    </>
  );
}
export default AdminDash;
*/
}
<section id="quotes" className="mt-10">
  <h3 className="text-lg font-bold mb-4">Gestion des citations</h3>
  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg mb-4">
    Ajouter une citation
  </button>
  <table className="w-full table-auto bg-white rounded-lg shadow">
    <thead>
      <tr>
        <th className="p-2">Citation</th>
        <th className="p-2">Source</th>
        <th className="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {quotes.map((q) => (
        <tr key={q.id} className="border border-gray-300">
          <td className="border border-gray-300 px-4 py-2">{q.owner}</td>
          <td className="border border-gray-300 px-4 py-2">{q.quoteDes}</td>
          <td className="p-2">
            <button className="bg-yellow-500 text-white px-2 mx-0.5 py-1 rounded-lg">
              Modifier
            </button>
            <button className="bg-red-500 text-white px-2 mx-0.5 py-1 rounded-lg">
              Supprimer
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</section>;
<section id="users" className="mt-10">
  <h3 className="text-lg font-bold mb-4">Gestion des utilisateurs</h3>
  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4">
    Ajouter un utilisateur
  </button>
  <table className="w-full table-auto bg-white rounded-lg shadow">
    <thead>
      <tr>
        <th className="p-2">Id</th>
        <th className="p-2">Nom</th>
        <th className="p-2">Email</th>
        <th className="p-2">Rôle</th>
        <th className="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr key={u.id}>
        <td className="p-2">{u.id}</td>
        <td className="p-2">{u.name}</td>
        <td className="p-2">{u.email}</td>
        <td className="p-2">{u.role}</td>
        <td className="p-2">
          <button className="bg-yellow-500 text-white px-2 py-1 rounded-lg">
            Modifier
          </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded-lg">
            Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</section>;
