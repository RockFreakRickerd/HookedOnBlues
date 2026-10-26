import {
  Mail,
  Music2,
  Globe,
  CalendarDays,
} from "lucide-react";
// Pull your high-quality social brand icons from FontAwesome via react-icons
import { FaInstagram, FaFacebook, FaYoutube, FaFile } from 'react-icons/fa6';
import { motion } from "framer-motion";

const links = [
  {
    icon: <Globe className="w-5 h-5" />,
    label: "Onze Website",
    sub: "hookedonblues.nl",
    href: "/",
    primary: true,
  },
  {/*{
    icon: <Music2 className="w-5 h-5" />,
    label: "Onze favoriete liedjes",
    sub: "A tribute to gary moore",
    href: "https://open.spotify.com/playlist/0cvI8VD7kGabhzDxlVKXxk?si=ceaf015b74c844cc",
    external: true,
  },
  {
    icon: <FaInstagram className="w-5 h-5" />,
    label: "Instagram",
    sub: "@tributetogarymoore",
    href: "https://instagram.com/tributetogarymoore",
    external: true,
  },*/}
  {
    icon: <FaFacebook className="w-5 h-5" />,
    label: "Facebook",
    sub: "Hooked on Blues",
    href: "https://www.facebook.com/p/Hooked-On-Blues-61564335914863/",
    external: true,
  },
  {
    icon: <FaYoutube className="w-5 h-5" />,
    label: "YouTube",
    sub: "Flakkeese Dagen 2025",
    href: "https://www.youtube.com/watch?v=AdiU0PtkAjg",
    external: true,
  },
  {
    icon: <FaFile className="w-5 h-5" />,
    label: "EPK",
    sub: "Electronic Press kit",
    href: "/info",
  },
];

export function LinktreePage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark selection:bg-primary selection:text-primary-foreground flex flex-col items-center justify-start px-4 py-16">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <span class="font-display text-3xl tracking-wider text-primary">
            Hooked on Blues
          </span>
          <p className="text-muted-foreground text-sm text-center tracking-wide">
            Blues · Rock & Roll · BluesRock
          </p>
          <div className="w-30 h-px bg-primary" />
        </motion.div>

        {/* Links */}
        <div className="w-full flex flex-col gap-3 mt-2">
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              className={`
                flex items-center gap-4 w-full rounded-xl px-5 py-4 border transition-all duration-200
                group cursor-pointer
                ${
                  link.primary
                    ? "bg-primary border-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-card border-border hover:border-primary hover:bg-card/80"
                }
              `}
            >
              <span
                className={`flex-shrink-0 ${link.primary ? "text-primary-foreground" : "text-primary"}`}
              >
                {link.icon}
              </span>
              <div className="flex flex-col min-w-0">
                <span
                  className={`font-display tracking-wide text-sm ${link.primary ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {link.label}
                </span>
                <span
                  className={`text-xs truncate ${link.primary ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {link.sub}
                </span>
              </div>
              <span
                className={`ml-auto text-lg transition-transform group-hover:translate-x-1 ${link.primary ? "text-primary-foreground/70" : "text-muted-foreground"}`}
              >
                →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground text-xs mt-4 text-center"
        >
          © {new Date().getFullYear()} Hooked on Blues.
        </motion.p>
      </div>
    </div>
  );
}

export default LinktreePage;
