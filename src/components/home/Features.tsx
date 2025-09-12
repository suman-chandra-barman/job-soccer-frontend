export function Features() {
  const features = [
    {
      title: "Specialized in Football Staffing",
      lists: [
        "JOBSOCCER is 100% focused on the football ecosystem",
        "For coaches, analysts, scouts, players, medical staff.",
      ],
    },
    {
      title: "Pre-Employment Assessment",
      lists: [
        "Uses psychological & behavioral profiling.",
        "Helps employers understand how candidates think, communicate, and reacts under pressure.",
        "Pre-employment assessment helps employers make candidate selection easier and faster.",
        "Adds professionalism and objectivity to the hiring process.",
      ],
    },
    {
      title: "AI-Powered Talent Matching",
      lists: [
        "Uses AI to match clubs with the best-fit candidates according to their requirements.",
        "Clubs save time and candidates are fairly assessed.",
      ],
    },
    {
      title: "Global Access & Visibility",
      lists: [
        "Gives equal visibility to candidates worldwide not just those with the right contacts.",
        "Enables clubs at all levels to access a large pool of qualified candidates more quickly.",
      ],
    },
    {
      title: "Videos Evaluation",
      lists: [
        "Staff and players can upload pre-video interviews, video sessions, presentations, or highlights.",
        "The combination of AI and certified coach evaluations gives employers deeper insight than a traditional CV.",
      ],
    },

    {
      title: "Fair, Transparent, and Structured Process",
      lists: [
        "Clear application system.",
        "Reduces bias, improves diversity, and promotes merit-based recruitment.",
      ],
    },
  ];

  return (
    <section className="bg-[#F7F6F2]">
      <div className="py-8 text-center bg-[#FFF8CC]">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Why is Jobsoccer unique?
        </h2>
      </div>
      <div className="container mx-auto px-4 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.lists.map((item, idx) => (
                      <span key={idx} className="block mb-1">
                        • {item}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
