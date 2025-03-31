import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { Home, Search, Bookmark, User } from "lucide-react";

const MobileNav = () => {
  const [location] = useLocation();
  
  // Don't show on login/signup pages
  if (location === '/login' || location === '/signup') {
    return null;
  }

  const links = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/bible", label: "Search", icon: <Search className="h-5 w-5" /> },
    { href: "/lessons", label: "Library", icon: <Bookmark className="h-5 w-5" /> },
    { href: "/settings", label: "Profile", icon: <User className="h-5 w-5" /> }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card shadow-md z-30 border-t">
      <div className="flex justify-around items-center py-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <a
              className={cn(
                "flex flex-col items-center p-2",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.icon}
              <span className="text-xs mt-1">{link.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
