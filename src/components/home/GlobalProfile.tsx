import Image from "next/image";
import { Button } from "@/components/ui/button";
import earth from "@/assets/home/earth.png";
import Link from "next/link";

export function GlobalProfile() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create your profile and get seen globally!
          </h2>
          <p className="text-gray-600 text-lg">
            We need more space for this section. It&apos;s too close to the
            section above.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Earth Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src={earth}
                alt="Global opportunities worldwide"
                fill
                className="object-contain"
                style={{
                  animation: "spin 50s linear infinite",
                }}
                priority
              />
              {/* <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style> */}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Feature Cards */}
            <div className="grid gap-4">
              {/* Global Access */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Global Access
                </h3>
                <p className="text-gray-600">
                  Connect with clubs & agents from 50+ countries
                </p>
              </div>

              {/* Visibility */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Visibility
                </h3>
                <p className="text-gray-600">
                  Showcase your game. Get scouted. Go global
                </p>
              </div>

              {/* Opportunities */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Opportunities
                </h3>
                <p className="text-gray-600">
                  1,253 active job offers from 62 countries
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-8 py-2 rounded-lg"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button
                size="lg"
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-8 py-2 rounded-lg"
              >
                <Link href="/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
