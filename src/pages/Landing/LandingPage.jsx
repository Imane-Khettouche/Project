import mainPh from "./img/illustration-1.webp";
import {Link} from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-5 mx-auto w-11/12 bg-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center text-indigo-600">
        <div className="font-serif text-3xl font-extrabold">
          Challenge Platform
        </div>
        <nav>
          <ul className="flex space-x-5 font-semibold">
            <li>
              <a
                href="#home"
                className="hover:border-b-2 border-indigo-600 transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a
                href="#challenges"
                className="hover:border-b-2 border-indigo-600 transition-colors duration-300">
                About
              </a>
            </li>
            <li>
              <a
                href="#leaderboard"
                className="hover:border-b-2 border-indigo-600 transition-colors duration-300">
                Features
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:border-b-2 border-indigo-600 transition-colors duration-300">
                Problems & Solutions
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:border-b-2 border-indigo-600 transition-colors duration-300">
                FAQs
              </a>
            </li>
            <li>
              <Link
                to="./Login"
                className="bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-white hover:text-indigo-600 hover:shadow-lg transition-colors duration-300">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <section className="flex justify-between items-center py-20 px-12 bg-white overflow-hidden">
      <div className="flex-1 pr-10 animate-fade-left">
        <h1 className="font-serif text-4xl mb-5 relative leading-tight">
          Sharpen Your Problem-Solving Skills with Interactive Challenges
        </h1>
        <p className="text-xl mb-8">
          Take on exciting challenges to improve your coding skills and build a
          strong foundation in algorithms and data structures
        </p>
        <button className="bg-indigo-600 text-white py-4 px-8 rounded-full text-xl animate-pulse hover:translate-y-[-3px] transition-transform duration-300">
          Get Started
        </button>
      </div>
      <div className="flex-1 animate-fade-right">
        <img src={mainPh} alt="Main Illustration" className="w-full max-w-lg" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="flex items-center justify-between py-20 px-12 overflow-hidden">
      <div className="flex-1 pr-10 text-center animate-fade-left">
        <h1 className="font-serif text-5xl mb-5 text-indigo-600 animate-zoom-in">
          About Our Platform
        </h1>
        <p className="text-2xl mb-4 animate-fade-left delay-300">
          We make problem-solving fun and interactive! Our platform helps you
          master algorithms through engaging challenges and real-time
          visualizations. Whether you&apos;re just starting or looking to level
          up, we&apos;ve got something for everyone.
        </p>
        <h3 className="text-xl animate-zoom-in delay-500">
          Our mission is to make coding challenges accessible and enjoyable for
          all learners.
        </h3>
      </div>
      <div className="flex-1 animate-fade-right">
        <img
          src={mainPh}
          alt="About Illustration"
          className="w-full max-w-lg rounded-lg shadow-lg animate-float"
        />
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="bg-white mt-4 py-20 px-12 text-2xl">
      <h1 className="font-serif text-5xl text-center text-indigo-600 mb-12 relative">
        Our Key Features
      </h1>
      <div className="flex justify-center gap-12">
        <ol className="flex flex-col gap-5">
          <li className="p-4 border-l-8 border-indigo-600 shadow-sm">
            Engage with real-world problems to boost your skills
          </li>
          <li className="p-4 border-l-8 border-indigo-600 shadow-sm">
            Visualize your achievements and track your growth
          </li>
          <li className="p-4 border-l-8 border-indigo-600 shadow-sm">
            Connect with peers and mentors to share insights
          </li>
          <li className="p-4 border-l-8 border-indigo-600 shadow-sm">
            Get tailored recommendations for improvement
          </li>
          <li className="p-4 border-l-8 border-indigo-600 shadow-sm">
            Earn badges to showcase your accomplishments
          </li>
        </ol>
        <ol className="flex flex-col gap-5">
          <li className="p-4 border-l-8 border-indigo-600 shadow-sm">
            Push your limits with more complex problems
          </li>
          <li className="p-4 border-l-8 border-indigo-600 shadow-sm">
            Learn from others and share your progress
          </li>
          <li className="p-4 border-l-8 border-indigo-600 shadow-sm">
            Build expertise through continuous practice
          </li>
          <li className="p-4 border-l-8 border-indigo-600 shadow-sm">
            Display your completed challenges and milestones
          </li>
          <li className="p-4 border-l-8 border-indigo-600 shadow-sm">
            Stay inspired with progress analytics and stories
          </li>
        </ol>
      </div>
    </section>
  );
}
function P_S() {
  return (
    <section className="grid gap-10 py-20 px-12">
      <div className="pr-5">
        <h1 className="font-serif text-5xl text-indigo-600 mb-5 text-center relative">
          Problems & Solutions
        </h1>
        <div className="space-y-5">
          <h3 className="text-2xl">
            As an IT student, one of the biggest challenges is knowing how and
            where to start practicing problem-solving skills. With countless
            resources available, it’s easy to feel lost and unsure about which
            challenges to focus on first. This uncertainty can make the journey
            feel overwhelming and discouraging.
          </h3>
          <p className="text-xl">
            Imagine trying to master sorting algorithms like QuickSort or tackle
            complex graph problems without a clear path or guidance. You might
            spend hours searching for suitable challenges, only to end up
            feeling more confused than before.
          </p>
          <p className="text-xl">
            Our platform takes the guesswork out of practice by offering guided
            challenges, interactive visualizations, and real-time feedback.
            Whether you’re starting with basic algorithms or advancing to
            dynamic programming, we help you build confidence step by step while
            tracking your progress effectively!
          </p>
        </div>
      </div>
      <div className="bg-white p-8 mt-8">
        <h1 className="font-serif text-5xl text-indigo-600 mb-8">Benefits</h1>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <span className="border border-indigo-600 shadow-md p-4 w-80 h-40">
              <h2 className="text-2xl font-semibold">Interactive Learning</h2>
              <p>Real-time code execution and visual feedback</p>
            </span>
            <span className="border border-indigo-600 shadow-md p-4 w-80 h-40">
              <h2 className="text-2xl font-semibold">Progress Tracking</h2>
              <p>Personalized dashboards and performance analytics</p>
            </span>
            <span className="border border-indigo-600 shadow-md p-4 w-80 h-40">
              <h2 className="text-2xl font-semibold">Skill-Based Challenges</h2>
              <p>Categorized problem sets with difficulty levels</p>
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="border border-indigo-600 shadow-md p-4 w-80 h-40">
              <h2 className="text-2xl font-semibold">Community Support</h2>
              <p>Integrated discussion forums and community interactions</p>
            </span>
            <span className="border border-indigo-600 shadow-md p-4 w-80 h-40">
              <h2 className="text-2xl font-semibold">
                Custom Challenge Creation
              </h2>
              <p>Challenge builder tool with customization options</p>
            </span>
            <span className="border border-indigo-600 shadow-md p-4 w-80 h-40">
              <h2 className="text-2xl font-semibold">Expert Guidance</h2>
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
    <section className="mx-8 my-8">
      <h1 className="font-serif text-5xl text-indigo-600 text-center mb-8">
        FAQs
      </h1>
      <div className="space-y-4">
        <details className="border-b border-gray-300 pb-4">
          <summary className="text-xl font-semibold cursor-pointer">
            What makes this platform different from other coding challenge
            platforms?
          </summary>
          <p className="text-lg mt-2">
            Our platform focuses on interactive learning through visualizations
            and real-time feedback, making complex concepts easier to grasp. We
            also offer personalized progress tracking and community support to
            keep you motivated.
          </p>
        </details>
        <details className="border-b border-gray-300 pb-4">
          <summary className="text-xl font-semibold cursor-pointer">
            Who can benefit from using this platform?
          </summary>
          <p className="text-lg mt-2">
            Both students and professionals can benefit from our platform.
            Whether you’re a beginner trying to build foundational skills or a
            seasoned developer looking to practice advanced algorithms, we’ve
            got you covered!
          </p>
        </details>
        <details className="border-b border-gray-300 pb-4">
          <summary className="text-xl font-semibold cursor-pointer">
            Can I track my progress and see improvements over time?
          </summary>
          <p className="text-lg mt-2">
            Yes! Our platform provides detailed analytics to help you monitor
            your performance, track completed challenges, and identify areas for
            improvement.
          </p>
        </details>
        <details className="border-b border-gray-300 pb-4">
          <summary className="text-xl font-semibold cursor-pointer">
            Are there challenges suited for different skill levels?
          </summary>
          <p className="text-lg mt-2">
            Absolutely! We offer challenges ranging from beginner to advanced
            levels, categorized by topics like sorting algorithms, dynamic
            programming, and graph theory.
          </p>
        </details>
        <details className="border-b border-gray-300 pb-4">
          <summary className="text-xl font-semibold cursor-pointer">
            Is there community support if I get stuck?
          </summary>
          <p className="text-lg mt-2">
            Yes, you can connect with peers and mentors through our integrated
            forums to ask questions, share solutions, and learn from others’
            experiences.
          </p>
        </details>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-indigo-600 text-white py-8 text-center text-xl">
      <p>&copy; 2025 Challenge Platform. All rights reserved.</p>
      <p>
        Follow us on:
        <a href="#" className="mx-2 hover:underline">
          Facebook
        </a>{" "}
        |
        <a href="#" className="mx-2 hover:underline">
          Twitter
        </a>{" "}
        |
        <a href="#" className="mx-2 hover:underline">
          LinkedIn
        </a>
      </p>
      <p>
        Contact us at:
        <a
          href="mailto:support@challengeplatform.com"
          className="hover:underline">
          support@challengeplatform.com
        </a>
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
