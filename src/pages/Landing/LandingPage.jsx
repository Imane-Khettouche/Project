import "./LandingPage.css";
import mainPh from "./img/illustration-1.webp";
import {Link} from "react-router-dom";
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
            <Link to="./Login" className="btn-start">
              Login
            </Link>
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
        <img src={mainPh} />
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
  return (
    <section className="FeaturesS">
      <h1>Our Key Features</h1>
      <div className="features">
        <ol className="featuresList">
          <div className="leftF">
            <li> Engage with real-world problems to boost your skills</li>
            <li> Visualize your achievements and track your growth</li>
            <li> Connect with peers and mentors to share insights</li>
            <li> Get tailored recommendations for improvement</li>
            <li> Earn badges to showcase your accomplishments</li>
          </div>
          <div className="rightF">
            <li> Push your limits with more complex problems</li>
            <li> Learn from others and share your progress</li>
            <li> Build expertise through continuous practice</li>
            <li> Display your completed challenges and milestones</li>
            <li> Stay inspired with progress analytics and stories</li>
          </div>
        </ol>
      </div>
    </section>
  );
}
function P_S() {
  return (
    <section className="P_S">
      <div className="PSS">
        {" "}
        <h1>Problems & Solutions</h1>
        <div className="content">
          <h3>
            As an IT student, one of the biggest challenges is knowing how and
            where to start practicing problem-solving skills. With countless
            resources available, it’s easy to feel lost and unsure about which
            challenges to focus on first. This uncertainty can make the journey
            feel overwhelming and discouraging
          </h3>
          <p>
            Imagine trying to master sorting algorithms like QuickSort or tackle
            complex graph problems without a clear path or guidance. You might
            spend hours searching for suitable challenges, only to end up
            feeling more confused than before
          </p>
          <p>
            Our platform takes the guesswork out of practice by offering guided
            challenges, interactive visualizations, and real-time feedback.
            Whether you’re starting with basic algorithms or advancing to
            dynamic programming, we help you build confidence step by step while
            tracking your progress effectively!
          </p>
        </div>
      </div>
      <div className="beneS">
        <h1>Benefits</h1>
        <div className="benefits">
          <div className="bene">
            <span className="benefit">
              <h2>Interactive Learning</h2>
              <p>Real-time code execution and visual feedback</p>
            </span>
            <span className="benefit">
              <h2>Progress Tracking</h2>
              <p>Personalized dashboards and performance analytics</p>
            </span>
            <span className="benefit">
              <h2>Skill-Based Challenges</h2>
              <p>Categorized problem sets with difficulty levels</p>
            </span>
          </div>
          <div className="bene">
            <span className="benefit">
              <h2>Community Support</h2>
              <p> Integrated discussion forums and community interactions</p>
            </span>
            <span className="benefit">
              <h2>Custom Challenge Creation</h2>
              <p> Challenge builder tool with customization options</p>
            </span>
            <span className="benefit">
              <h2>Expert Guidance</h2>
              <p>Access to curated tutorials and expert tips</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function FAQs() {
  return (
    <section className="FAQs">
      <h1>FAQs</h1>
      <div className="ques">
        <details>
          <summary>
            What makes this platform different from other coding challenge
            platforms?
          </summary>
          <p>
            Our platform focuses on interactive learning through visualizations
            and real-time feedback, making complex concepts easier to grasp. We
            also offer personalized progress tracking and community support to
            keep you motivated
          </p>
        </details>
        <details>
          <summary>Who can benefit from using this platform?</summary>
          <p>
            Both students and professionals can benefit from our platform.
            Whether you’re a beginner trying to build foundational skills or a
            seasoned developer looking to practice advanced algorithms, we’ve
            got you covered!
          </p>
        </details>
        <details>
          <summary>
            Can I track my progress and see improvements over time?
          </summary>
          <p>
            Yes! Our platform provides detailed analytics to help you monitor
            your performance, track completed challenges, and identify areas for
            improvement.
          </p>
        </details>
        <details>
          <summary>
            Are there challenges suited for different skill levels?
          </summary>
          <p>
            Absolutely! We offer challenges ranging from beginner to advanced
            levels, categorized by topics like sorting algorithms, dynamic
            programming, and graph theory.
          </p>
        </details>
        <details>
          <summary>Is there community support if I get stuck?</summary>
          <p>
            Yes, you can connect with peers and mentors through our integrated
            forums to ask questions, share solutions, and learn from others’
            experiences
          </p>
        </details>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <p>&copy; 2025 Challenge Platform. All rights reserved.</p>
      <p>
        Follow us on:
        <a href="#">Facebook</a> |<a href="#">Twitter</a> |
        <a href="#">LinkedIn</a>
      </p>
      <p>
        Contact us at:
        <a>support@challengeplatform.com</a>
      </p>
    </footer>
  );
}
export default function LandingPage() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Features />
      <P_S />
      <FAQs />
      <Footer />
    </>
  );
}
