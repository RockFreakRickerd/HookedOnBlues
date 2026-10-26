import { 
  Mail, 
  Globe, 
  ArrowLeft,
  Music4
} from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube, FaSpotify } from 'react-icons/fa6';
import { motion } from "framer-motion";

const socialLinks = [
  { icon: <Globe className="w-5 h-5" />, href: "/", label: "Website" },
  { icon: <FaSpotify className="w-5 h-5" />, href: "https://open.spotify.com/playlist/0cvI8VD7kGabhzDxlVKXxk?si=ceaf015b74c844cc", label: "Spotify" },
  { icon: <FaInstagram className="w-5 h-5" />, href: "https://instagram.com/tributetogarymoore", label: "Instagram" },
  { icon: <FaFacebook className="w-5 h-5" />, href: "https://facebook.com/share/1DuG2XCvSC/?mibextid=wwXlfr", label: "Facebook" },
  { icon: <FaYoutube className="w-5 h-5" />, href: "https://youtube.com/@tributetogarymoore", label: "YouTube" },
];

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark selection:bg-primary selection:text-primary-foreground flex flex-col items-center justify-center px-4 py-12 relative overflow-x-hidden">
      
      {/* Background Graphic Style - Matching Venue Page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center gap-8">
        
        {/* Error State Icon Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-5 bg-card border border-border rounded-full flex items-center justify-center shadow-xl relative"
        >
          <Music4 className="w-12 h-12 text-primary animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary text-[10px] font-bold text-primary-foreground items-center justify-center">!</span>
          </span>
        </motion.div>

        {/* Typography Block */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            Error 404
          </span>
          <h1 className="font-display text-4xl md:text-5xl tracking-wider text-foreground">
            Te ver gebluest
          </h1>
          <p className="text-muted-foreground text-sm max-w-md tracking-wide leading-relaxed">
            De pagina die je zoekt zit buiten de verslaving helaas.
          </p>
          <div className="w-24 h-px bg-primary mt-4" />
        </motion.div>

        {/* Interactive Return & Support Blocks */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full bg-card/50 border border-border rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-medium text-foreground">Terug naar de verslaving?</h3>
            <p className="text-xs text-muted-foreground mt-1">Keer direct veilig terug naar onze officiële homepage.</p>
          </div>
          
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 text-xs font-display tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-3.5 px-6 shadow-md transition-transform duration-150 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" /> Terug naar Home
          </a>
        </motion.div>

        {/* Footer Connections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-4 mt-4"
        >
          <div className="flex gap-5 text-muted-foreground">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
                title={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <p className="text-muted-foreground/50 text-[11px]">
            © {new Date().getFullYear()} Hooked on Blues.
          </p>
        </motion.div>

      </div>
    </div>
  );
}

export default NotFoundPage;
