/*import {useState, useEffect} from "react";
import Logo from "../../img/Logo-removebg-preview.png";
import TrophyIcon from "../../img/trophy-solid-24.png";
import UserIcon from "../../img/user-solid-24.png";
import QuoteIcon from "../../img/message-dots-regular-24.png";
import DashboardImage from "../../img/man-with-laptop-removebg-preview.png";
import DashboardIcon from "../../img/dashboard-solid-24.png";

// Custom Hook for Fetching Users
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        alert(data.message);
        // Refetch users after deletion

      } catch (err) {
        setError(err);
        alert(`Error deleting user: ${err.message}`);
      }
    }
  };

  return {users, loading, error, deleteUser};
};

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [, setAdminData] = useState(null);
  const {users, loading, error, deleteUser} = useUsers(); // Use the custom hook

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) setAdminData(userData);
  }, []);

  const showSection = (id) => setActiveSection(id);

  return (
  <>
<aside class="menu">
  <h2><img src="C:\Users\HP\Downloads\Project-main\src\img\Logo-removebg-preview.png" width="250px"></h2>
  <nav>
    <ul>
      <li><a href="#" onclick="showSection('dashboard')"> <img src="C:\Users\HP\Downloads\Project-main\src\img\dashboard-solid-24.png" alt="trophy"style= "width: 30px; height: 30px; vertical-align: middle"> Dashboard </a></li>
      <li><a href="#" onclick="showSection('challenges')"><img src="C:\Users\HP\Downloads\Project-main\src\img\trophy-solid-24.png" alt="trophy"style= "width: 30px; height: 30px; vertical-align: middle"> Challenges</a></li>
      <li><a href="#" onclick="showSection('users')">  <img src="C:\Users\HP\Downloads\Project-main\src\img\user-solid-24.png" alt="User Icon" style="width: 30px; height: 30px; vertical-align: middle;"> User Management </a></li>
      <li><a href="#" onclick="showSection('quotes')"><img src="C:\Users\HP\Downloads\Project-main\src\img\message-dots-solid-24.png" alt="User Icon" style="width: 30px; height: 30px; vertical-align: middle;"> Quote Management</a></li>
    </ul>
  </nav>
</aside>

<main>
  <div id="admin-info">
    <h3>Admin Info</h3>
    <p id="admin-name"></p>
    <p id="admin-email"></p>
  </div>

  <section id="dashboard">
    <div class="dashboard-content">
      <div class="welcome-text">
        <h3>Welcome to the Dashboard</h3>
        <p>Select an option from the menu.</p>
      </div>
      <div class="dashboard-image">
        <img src="C:\Users\HP\Downloads\Project-main\src\img\man-with-laptop-removebg-preview.png" alt="Dashboard Image" />
      </div>
    </div>
  </section>


  <section id="users" class="hidden">
    <h3>User Management</h3>
    <table id="users-table">
      <thead>
        <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>

  <section id="quotes" class="hidden">
    <div class="quotes-content">
      <div class="quotes-text">
    <h3>Quote Management</h3>
    <form onsubmit="submitQuote(event)">
      <textarea id="quoteText" rows="3" placeholder="Enter quote"></textarea><br/>
      <input id="quoteText" type="text" placeholder="Enter source" /><br/>
      <button class="animated-button">
      <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
        ></path>
      </svg>
      <span class="text">Submit</span>
      <span class="circle"></span>
      <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
        ></path>
          </svg>
        </button>

        </div>
          <div class="quotes-image">
            <img src="C:\Users\HP\Downloads\Project-main\src\img\prize-light-removebg-preview.png" alt="Dashboard Image" />
          </div>
        </div>
    </form>
    <p id="quote-message"></p>
    <table id="quotes-table">
      <thead>
        <tr><th>Source</th><th>Quote</th><th>Actions</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>

  <section id="challenges" class="hidden">
    <h3>Challenge Management</h3>
    <table id="challenges-table">
      <thead>
        <tr><th>ID</th><th>Title</th><th>Description</th><th>Difficulty</th><th>Deadline</th><th>Type</th><th>Professor</th><th>Actions</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>
</main>
</>);
}export default AdminDashboard;
*/