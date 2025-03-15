import { BriefcaseIcon } from 'lucide-react';
import { Link } from 'react-router-dom'; 

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TalentSync</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting businesses with top freelance talent worldwide.
            </p>
            <div className="flex gap-4">
              {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                <Link key={social} to={`#${social}`} className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">{social}</span>
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs">{social[0].toUpperCase()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">For Clients</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">How to Hire</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Talent Marketplace</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Project Catalog</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Enterprise Solutions</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">For Freelancers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Find Work</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Create Profile</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Community</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Skill Tests</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Help & Support</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Success Stories</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Blog</Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">Resources</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TalentSync. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs">
            <Link to="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
