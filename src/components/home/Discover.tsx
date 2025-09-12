import Image from "next/image";
import left from "@/assets/home/discover-left.png";
import right from "@/assets/home/discover-right.png";

export function Discover() {
  return (
    <section className="pt-16  bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#362F05] mb-4">
            What You Will Discover Here
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image with Gradient Background */}
          <div
            className="relative rounded-2xl overflow-hidden pt-10"
            style={{
              background:
                "radial-gradient(circle, rgba(230, 161, 101, 1) 21%, rgba(255, 255, 255, 1) 55%)",
            }}
          >
            <div className="flex justify-center">
              <Image
                src={left}
                alt="Coach with young players"
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Diagram */}
          <div className="flex justify-center py-10">
            <Image
              src={right}
              alt="Soccer career paths diagram"
              className="object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
