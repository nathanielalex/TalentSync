import React, { ReactNode } from "react";
import Navbar from "./NavBar"; 
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      
      <div className="pt-16">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
