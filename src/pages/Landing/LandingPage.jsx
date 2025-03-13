import "./LandingPage.css";
import mainPh from "./img/illustration-1.webp"
function Header() {
  return (
    <header className="navbar">
      <div className="logo">Challenge Platform</div>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#challenges">About </a>
          </li>
          <li>
            <a href="#leaderboard">Features</a>
          </li>
          <li>
            <a href="#about">Problems & Solutions</a>
          </li>
          <li>
            <a href="#contact">FAQs</a>
          </li>

          <li>
            <a href="#login">Login</a>
          </li>
          <li>
            <a href="#signup">Sign Up</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <section className="homeSection">
      <div className="context">
        <h1>Sharpen Your Problem-Solving Skills with Interactive Challenges</h1>

        <p>
          Take on exciting challenges to improve your coding skills and build a
          strong foundation in algorithms and data structures
        </p>
        <button className="btn-start">Get Started</button>
      </div>
      <div className="photo">
        <img src={mainPh}  />
      </div>
    </section>
  );
}
function About() {
  return (
    <section className="AboutS">
      <div className="content">
        <h1>About Our Platform</h1>
        <p>
          we make problem-solving fun and interactive! Our platform helps you
          master algorithms through engaging challenges and real-time
          visualizations. Whether you&apos;re just starting or looking to level
          up, we&apos;ve got something for everyone.
        </p>
        <h3>
          Our mission is to make coding challenges accessible and enjoyable for
          all learners
        </h3>
      </div>
      <img />
    </section>
  );
}
function Features() {
  return <section className="FeaturesS"></section>;
}
export default function LandingPage() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Features />
    </>
  );
}


