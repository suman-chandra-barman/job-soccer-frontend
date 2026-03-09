import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo_with_domain.svg";

export function Footer() {
  return (
    <footer className="bg-yellow-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-8">
          <div className="w-full md:w-auto text-center md:text-left">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center md:text-left justify-center md:justify-start mb-4"
            >
              <Image
                src={logo}
                alt="Logo"
                width={200}
                className="object-cover"
              />
            </Link>
          </div>
          {/* Quick Action */}
          <div className="w-full md:w-auto text-center md:text-left">
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
                  href=""
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy */}
          <div className="w-full md:w-auto text-center md:text-left">
            <ul className="space-y-2">
              <li>
                <Link
                  href=""
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
               <a
                  href="mailto:info@jobsoccer.com"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  info@jobsoccer.com
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="w-full md:w-auto">
            <p className="text-sm mb-4 text-center md:text-left">
              Subscribe To Our Newsletter
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                className="sm:flex-1 text-sm bg-white p-5"
              />
              <Button
                size="lg"
                className="bg-yellow-300 hover:scale-105 text-black px-4 py-3 rounded-lg"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} JobSoccer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
