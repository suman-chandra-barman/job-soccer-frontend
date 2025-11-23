"use client";

import Image from "next/image";
import left from "@/assets/home/discover-left.png";
import { CareerPathsDiagram } from "./CareerPathsDiagram";
import { diagramAnimations } from "./animations";

export function Discover() {
  return (
    <section className="pt-16 bg-white">
      {/* Animation Styles */}
      <style jsx>{diagramAnimations}</style>

      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-[#362F05] mb-4">
            What You Will Discover Here
          </h2>
        </header>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image with Gradient Background */}
          <div
            className="relative rounded-2xl overflow-hidden pt-10"
            style={{
              background:
                "radial-gradient(circle, rgba(230, 161, 101, 1) 21%, rgba(255, 255, 255, 1) 55%)",
            }}
            aria-label="Visual representation of coaching"
          >
            <div className="flex justify-center">
              <Image
                src={left}
                alt="Coach with young players"
                className="object-contain"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Animated Diagram */}
          <div className="flex justify-center py-10">
            <CareerPathsDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
