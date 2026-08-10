import { GitFork, Building2, Mail, Heart } from "lucide-react";
import { Separator } from "./ui/Separator";

const footerLinks = [
  { label: "GitHub", href: "#", icon: GitFork },
  { label: "LinkedIn", href: "#", icon: Building2 },
  { label: "Email", href: "#", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-12">
      <Separator className="mb-8" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1.5">
          <span>&copy; {new Date().getFullYear()} Kai Nakamura.</span>
          <span className="hidden sm:inline">Built with</span>
          <Heart size={12} className="hidden sm:inline text-accent fill-accent" />
        </div>
        <div className="flex items-center gap-6">
          {footerLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-white transition-colors duration-300"
            >
              <Icon size={14} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
