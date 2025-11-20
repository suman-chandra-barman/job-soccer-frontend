import Image from "next/image";
import { Globe, Eye, Briefcase } from "lucide-react";
import earth from "@/assets/home/earth.png";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Globe,
    title: "Global Access",
    description: "Connect with clubs and agents around the world",
  },
  {
    icon: Eye,
    title: "Visibility",
    description: "Showcase your talent. Get scouted. Go global!",
  },
  {
    icon: Briefcase,
    title: "Opportunities",
    description: "Discover job offers and trials worldwide",
  },
];

export function GlobalProfile() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Create your profile and get seen globally!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Build your professional presence and connect with opportunities
            worldwide
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Earth Image */}
          <div className="order-2 md:order-1">
            <Image
              src={earth}
              alt="Global opportunities worldwide"
              className="object-contain w-full"
              priority
            />
          </div>

          {/* Right Side - Content */}
          <div className="order-1 md:order-2">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <feature.icon
                        className="w-5 h-5 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#362F05] mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-[#A19C80] text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
