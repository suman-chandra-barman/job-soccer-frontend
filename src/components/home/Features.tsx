import Image from "next/image";
import brainIcon from "@/assets/home/ai_brain.svg";
import videoIcon from "@/assets/home/video.svg";
import global from "@/assets/home/global.svg";
import security from "@/assets/home/security.svg";
import chart from "@/assets/home/chart.svg"
import profile from "@/assets/home/profile.svg"
import footbal from "@/assets/home/footbal.svg"
import job from "@/assets/home/job.svg"

export function Features() {
  const features = [
    {
      icon: footbal,
      title: "Specialized in Soccer Staffing",
      lists: ["JOBSOCCER is 100% focused on the soccer ecosystem."],
    },
    {
      icon: brainIcon,
      title: "AI-Powered Talent Matching",
      lists: [
        "Seamlessly connects employers with candidates and candidates with employers.",
      ],
    },
    {
      icon: videoIcon,
      title: "AI video Evaluation",
      lists: ["Video interview analysis."],
    },
    {
      icon: security,
      title: "AI Profile Quality Score",
      lists: ["AI evaluates completeness and strength of each profile."],
    },
    {
      icon: job,
      title: "AI Powered job suggestions",
      lists: ["Personalized job recommendations for players and staff."],
    },
    {
      icon: chart,
      title: "AI Data-Driven Market Insights",
      lists: [
        "AI identifies rising talent trends, role demands, or regional needs.",
      ],
    },
    {
      icon: global,
      title: "Global Access & Visibility",
      lists: [
        "Gives equal visibility to candidates worldwide not just those with the right contacts.",
      ],
    },
    {
      icon: profile,
      title: "Fair, Transparent, and Structured Process",
      lists: [
        "Clear application system",
        "Reduces bias, improves diversity, and promotes merit- based recruitment",
      ],
    },
  ];

  return (
    <section className="bg-[#F7F6F2]">
      <div className="py-8 text-center bg-primary">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900">
          Why is Jobsoccer unique?
        </h2>
      </div>
      <div className="container mx-auto px-4 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <Image src={feature.icon} alt={feature.title + " icon"} width={40} height={40} />
                    <div>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
