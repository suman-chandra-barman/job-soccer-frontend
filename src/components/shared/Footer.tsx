import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo_with_domain.svg";
import { FaFacebook, FaInstagram, FaLinkedin, } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-yellow-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-8">
          <div className="w-full md:w-auto text-center md:text-left">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start mb-4"
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
            <h3 className="font-semibold text-gray-900 mb-4">Policy</h3>
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
            </ul>
          </div>

          {/* Subscribe */}
          <div className="w-full md:w-auto">
            <h3 className="font-semibold text-gray-900 mb-4 text-center md:text-left">
              Subscribe
            </h3>
            <p className="text-gray-600 text-sm mb-4 text-center md:text-left">
              Subscribe to our email alerts
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                className="sm:flex-1 text-sm bg-white p-5"
              />
              <Button
                size="lg"
                className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-3 rounded-lg"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 border-t border-b border-gray-200 mt-8">
        {/* Social Media Icons */}
        <div className="flex space-x-4 items-center justify-center gap-4">
          <Link href="" className="text-blue-600 hover:text-blue-700">
            <FaFacebook className="h-6 w-6" />
          </Link>
          <Link
            href=""
            className="flex items-center justify-center h-6 w-6 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600"
          >
            <FaInstagram className="h-4 w-4 text-white" />
          </Link>

          <Link href="" className="text-blue-500 hover:text-blue-600">
            <FaLinkedin className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
