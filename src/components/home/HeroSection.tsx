import { Button } from "@/components/ui/button";
import Link from "next/link";
import bg from "@/assets/hero-bg.png";
import Image from "next/image";
import line from "@/assets/line.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left pt-15">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                <span className="relative inline-block">
                  Your next
                  <Image
                    src={line}
                    alt="Hand-drawn underline"
                    className="absolute -bottom-2 left-0 w-full h-auto"
                  />
                </span>{" "}
                job
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                starts here!
              </h1>
            </div>

            <div className="flex flex-row gap-2 justify-center lg:justify-start">
              <Button
                asChild
                className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-8 py-6 text-lg rounded-lg"
              >
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button
                asChild
                className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-8 py-6 text-lg rounded-lg"
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="relative pt-15"
            style={{
              background:
                "radial-gradient(circle,rgba(230, 161, 101, 1) 21%, rgba(255, 255, 255, 1) 76%)",
            }}
          >
            <div className="absolute inset-0 rounded-lg pt-8" />
            <div className="relative z-10">
              <Image
                src={bg}
                alt="Hero Background"
                className="h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
