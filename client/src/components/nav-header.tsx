import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { ChevronDown, Building2, UserCircle2 } from "lucide-react";

export default function NavHeader() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold text-primary flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            TalentSync
          </a>
        </Link>

        <nav>
          {user ? (
            <div className="flex items-center gap-4">
              {user.isEmployer && (
                <Button variant="outline" asChild>
                  <Link href="/post-job">Post a Job</Link>
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <UserCircle2 className="h-5 w-5" />
                    <span className="hidden sm:inline">
                      {user.isEmployer ? user.companyName : user.username}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => logoutMutation.mutate()}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild>
              <Link href="/auth">Login / Register</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
