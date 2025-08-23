import { Brain, Globe, FileText, BarChart3, Play, Handshake } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Talent Matching",
      description: "Let our smart algorithm recommend jobs based on your skills, position, and career goals.",
      iconColor: "text-pink-500",
    },
    {
      icon: Brain,
      title: "Specialized in soccer staffing",
      description: "Let our smart algorithm recommend jobs based on your skills, position, and career goals.",
      iconColor: "text-pink-500",
    },
    {
      icon: FileText,
      title: "Fair, Transparent, and Structured Process",
      description:
        "Create a professional football profile that showcases your career, style, and achievement — just like LinkedIn, but for football",
      iconColor: "text-blue-500",
    },
    {
      icon: Globe,
      title: "Global Access & Visibility",
      description: "Get personalized suggestions to improve your chances of getting hired or scouted",
      iconColor: "text-green-500",
    },
    {
      icon: BarChart3,
      title: "Performance Analysis",
      description: "Get personalized suggestions to improve your chances of getting hired or scouted",
      iconColor: "text-yellow-500",
    },
    {
      icon: Play,
      title: "Videos Evaluation",
      description: "Get personalized suggestions to improve your chances of getting hired or scouted",
      iconColor: "text-red-500",
    },
    {
      icon: Handshake,
      title: "Pre-Employment Assessment",
      description:
        "We work directly with verified clubs, coaches, and recruiters to ensure you're applying to real, relevant opportunities",
      iconColor: "text-purple-500",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Why is Jobsoccer unique?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                    <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
