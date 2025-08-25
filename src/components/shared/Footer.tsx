import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo_with_domain.png";
import facebook from "@/assets/socials/facebook.svg";
import youtube from "@/assets/socials/youtube.svg";
import X from "@/assets/socials/x.svg";

export function Footer() {
  return (
    <footer className="bg-yellow-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:justify-start mb-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                width={200}
                className="object-cover"
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1 w-full md:w-auto text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[#362F05] mb-2">
              JOB SOCCER
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Building champions on and off the pitch.
              <br />
              Dedicated to talent, teamwork, and a passion
              <br />
              for football since 2000.
            </p>
          </div>

          {/* Quick Action */}
          <div className="md:col-span-1 w-full md:w-auto text-center md:text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Action</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-coach"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Try the AI Coach - Free
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy */}
          <div className="md:col-span-1 w-full md:w-auto text-center md:text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Policy</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Terms of Condition
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="md:col-span-1 w-full md:w-auto">
            <h3 className="font-semibold text-gray-900 mb-4 text-center md:text-left">
              Subscribe
            </h3>
            <p className="text-gray-600 text-sm mb-4 text-center md:text-left">
              Subscribe to our email alerts
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 text-sm bg-white p-2"
              />
              <Button className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-3 rounded-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 border-t border-b border-gray-200 mt-8">
        {/* Social Media Icons */}
        <div className="flex space-x-4 items-center justify-center gap-4">
          <Link href="#" className="text-blue-600 hover:text-blue-700">
            <Image src={facebook} alt="Facebook" className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-gray-900 hover:text-gray-700">
            <Image src={X} alt="Twitter" className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-red-600 hover:text-red-700">
            <Image src={youtube} alt="Youtube" className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
