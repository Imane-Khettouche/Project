import { useState } from "react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="navbar">
      <div className="logo">Challenge Platform</div>
      <nav>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#challenges">About </a></li>
          <li><a href="#leaderboard">Features</a></li>
          <li><a href="#about">Problems & Solutions</a></li>
          <li><a href="#contact">FAQs</a></li>
          {isLoggedIn ? (
            <>
              <li><a href="#profile">Profile</a></li>
              <li><button onClick={() => setIsLoggedIn(false)}>Logout</button></li>
            </>
          ) : (
            <>
              <li><a href="#login">Login</a></li>
              <li><a href="#signup">Sign Up</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
