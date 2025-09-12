import Image from "next/image";
import earth from "@/assets/home/earth.png";

export function GlobalProfile() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl  font-bold text-gray-900 mb-4">
            Create your profile and get seen globally!
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-4 items-center">
          {/* Left Side - Earth Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg aspect-square overflow-hidden">
              <Image
                src={earth}
                alt="Global opportunities worldwide"
                fill
                className="object-contain absolute"
                style={{
                  animation: "spin 50s linear infinite",
                }}
                priority
              />
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {/* Global Access */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-[#362F05] mb-2">
                  Global Access
                </h3>
                <p className="text-[#A19C80] text-sm">
                  Connect with clubs and agent around the world
                </p>
              </div>

              {/* Visibility */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-[#362F05] mb-2">
                  Visibility
                </h3>
                <p className="text-[#A19C80] text-sm">
                  Showcase your talent. Get scouted. Go global!
                </p>
              </div>

              {/* Opportunities */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-[#362F05] mb-2">
                  Opportunities
                </h3>
                <p className="text-[#A19C80] text-sm">
                  Discover jobs offer and trials worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
