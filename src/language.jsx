function Portfolio() {
  const userData = {
    name: "Nguyen Duc Thang",
    title: "UX/UI Designer",
    location: "Hanoi, Viet Nam",
    objective:
      "Challenge myself in a new environment to learn, develop, improve my skills through different projects and contribute more to the company with my abilities.",
    email: "thangndhe160978@gmail.com",
    phone: "0397 166 247",
    linkedin: "linkedin.com/in/thnnguyenc20",
    behance: "behance.net/thnnguyenc20",
    education: "FPT University - Graphic Design (2020 - Now)",
    softSkills: [
      "Teamwork",
      "Critical Thinking",
      "Communication",
      "Time Management",
    ],
    technicalSkills: [
      "Figma",
      "Premiere Pro",
      "After Effects",
      "Illustrator",
      "InDesign",
      "Photoshop",
    ],
    skillSet: [
      "User research",
      "Web Design",
      "Wireframing",
      "App Design",
      "Brainstorming",
      "Prototyping",
    ],
    interests: ["Design Trends", "Technology"],
    languages: ["Vietnamese (Native)", "English (Pre-intermediate)"],
  };

  const joinedChallenges = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      description:
        "Redesigning the user interface and improving the user experience of an existing e-commerce platform.",
      startDate: "2024-03-01",
    },
    {
      id: 2,
      title: "Mobile App Concept for Food Delivery",
      description:
        "Creating a concept and prototype for a new mobile application for food delivery services.",
      startDate: "2024-04-15",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen py-12 px-4 md:px-8 lg:px-16">
      <div className="relative bg-white rounded-xl shadow-xl overflow-hidden md:grid md:grid-cols-2 md:gap-10">
        {/* Background Circles */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-200 rounded-full -ml-24 -mt-24 opacity-50 animate-pulse slow-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full -mr-32 -mb-32 opacity-50 animate-pulse pulse"></div>

        {/* Left Side - About Me and Contact */}
        <div className="p-8 relative">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-indigo-700 mb-3">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {userData.privateSection}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-purple-600 mb-3">
              Contact
            </h3>
            <p className="text-gray-700 mb-2 flex items-center">
              {userData.email}
            </p>
            <p className="text-gray-700 mb-2 flex items-center">
              {userData.nickname}
            </p>
          </div>
        </div>

        {/* Right Side - Education, Skills, Interests, Languages */}
        <div className="p-8 md:border-l md:border-gray-200 relative">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Details</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              Education
            </h3>
            <p className="text-gray-700">{userData.education}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-600 mb-3">
              Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Soft Skills
                </h4>
                <ul className="list-disc list-inside text-gray-700">
                  {userData.softSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Technical Skills
                </h4>
                <ul className="list-disc list-inside text-gray-700">
                  {userData.technicalSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Skill Set</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {userData.skillSet.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              Interests
            </h3>
            <p className="text-gray-700">{userData.interests.join(" | ")}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              Languages
            </h3>
            <p className="text-gray-700">{userData.languages.join(" | ")}</p>
          </div>
        </div>
      </div>

      {joinedChallenges && joinedChallenges.length > 0 && (
        <div className="mt-10 bg-indigo-100 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Joined Challenges
          </h2>
          <ul className="space-y-6">
            {joinedChallenges.map((challenge) => (
              <li
                key={challenge.id}
                className="bg-white border border-indigo-200 rounded-md shadow-sm p-6">
                <h3 className="font-semibold text-indigo-600 text-lg mb-2">
                  {challenge.title}
                </h3>
                <p className="text-gray-700 mb-2">{challenge.description}</p>
                <p className="text-sm text-gray-500">
                  Start Date: {challenge.startDate}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
