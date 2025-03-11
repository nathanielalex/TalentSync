import React, { useState } from "react";
import AuthButtons from "@/components/AuthButtons"
import { BriefcaseIcon, MenuIcon, X } from "lucide-react"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <BriefcaseIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">TalentSync</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-12 md:flex md:space-x-8">
              <a href="#" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">
                Home
              </a>
              <a href="/jobs" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                Find Work
              </a>
              <a href="/job-posting" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                Open Job
              </a>
              <a href="#" className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                About
              </a>
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <AuthButtons />
            {/* <Button size="sm">Sign up</Button> */}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-3 space-y-1 px-4 sm:px-6">
          <a href="#" className="bg-primary/10 text-primary block px-3 py-2 rounded-md text-base font-medium">
            Home
          </a>
          <a
            href="#"
            className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Find Work
          </a>
          <a
            href="#"
            className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Hire Talent
          </a>
          <a
            href="#"
            className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 px-4 sm:px-6 space-y-2">
          <AuthButtons />
          {/* <Button size="sm">Sign up</Button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
