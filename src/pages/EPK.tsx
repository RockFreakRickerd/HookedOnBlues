import { 
  Mail, 
  Globe, 
  CalendarDays, 
  Download, 
  FileText, 
  Play, 
  CheckCircle2, 
  Users 
} from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube, FaSpotify } from 'react-icons/fa6';
import { motion } from "framer-motion";

// Reusable configurations matching your Linktree data
const socialLinks = [
  { icon: <Globe className="w-5 h-5" />, href: "/", label: "Website" },
  { icon: <FaSpotify className="w-5 h-5" />, href: "https://open.spotify.com/playlist/0cvI8VD7kGabhzDxlVKXxk?si=ceaf015b74c844cc", label: "Spotify" },
  { icon: <FaInstagram className="w-5 h-5" />, href: "https://instagram.com/tributetogarymoore", label: "Instagram" },
  { icon: <FaFacebook className="w-5 h-5" />, href: "https://facebook.com/share/1DuG2XCvSC/?mibextid=wwXlfr", label: "Facebook" },
  { icon: <FaYoutube className="w-5 h-5" />, href: "https://youtube.com/@tributetogarymoore", label: "YouTube" },
];

const highLights = [
  { icon: <Users className="w-5 h-5 text-primary" />, label: "Volledige Band", desc: "Power trio; Drums, Bas, gitaar & zang" },
  { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, label: "Setlist Lengte", desc: "Tot 2x 60 minuten aan Gary Moores discografie." },
  { icon: <FileText className="w-5 h-5 text-primary" />, label: "Eigen P.A.", desc: "In overleg beschikbaar voor kleinere locaties." },
];

export function VenueInfoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark selection:bg-primary selection:text-primary-foreground flex flex-col items-center justify-start px-4 py-12 md:py-20 relative overflow-x-hidden">
      
      {/* Background Graphic Style - Consistent with your Linktree */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-12">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-3"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            Electronic Press Kit (EPK)
          </span>
          <h1 className="font-display text-4xl md:text-5xl tracking-wider text-foreground">
            TRIBUTE TO GARY MOORE
          </h1>
          <p className="text-muted-foreground text-base max-w-xl tracking-wide">
            Gary Moore · Thin Lizzy · Scars · Greeny · Hendrix
          </p>
          <div className="w-40 h-px bg-primary mt-2" />
        </motion.div>

        {/* Grid: Promo Video & Quick Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Video / Showreel Column (7 out of 12 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-4"
          >
            <h2 className="text-xl font-display tracking-wide flex items-center gap-2">
              <Play className="w-5 h-5 text-primary fill-primary/20" /> Live Video Clip
            </h2>
            
            {/* Aspect Ratio Box for Video Embed */}
            <div className="relative w-full aspect-video bg-card border border-border rounded-2xl overflow-hidden group shadow-xl">
              {/* Replace the URL below with your YouTube embedded link or native video address */}
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/IIgRlcG0_jg?si=ECfh0KApL4F_SOJr&amp;start=26" // Template placeholder link
                title="Tribute to Gary Moore Live"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-xs text-muted-foreground italic px-2">
              Bekijk hier een impressie van onze live performance en sound.
            </p>
          </motion.div>

          {/* Booker Quick Reference Column (5 out of 12 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-display tracking-wide text-foreground">Boekings Informatie</h2>
              </div>

              {/* Specs List */}
              <div className="flex flex-col gap-4">
                {highLights.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="p-2 bg-background border border-border rounded-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Downloads: Tech Rider & Presskit assets */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href="/Technische Rider Tribute To Gary Moore.pdf" // Placeholder asset path
                  download 
                  className="flex-1 flex items-center justify-center gap-2 text-xs font-medium border border-border bg-background hover:border-primary hover:bg-card/50 rounded-xl py-3 px-4 transition-all duration-200"
                >
                  <Download className="w-4 h-4 text-primary" /> Technical Rider
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bio / About the Show section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card/50 border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12"
        >
          <div className="md:w-1/3 flex flex-col gap-3">
            <h3 className="text-lg font-display tracking-wide text-primary">Over de Show</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Een energieke ode aan de legendarische Ierse gitaargrootmeester. Wij brengen de emotie en pure kracht van Gary Moore in power trio formatie.
            </p>
          </div>
          <div className="md:w-2/3 text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p>
              Van de meeslepende blues-era met parels zoals <span className="text-foreground font-medium">"Still Got The Blues"</span> en <span className="text-foreground font-medium">"Parisienne Walkways"</span> tot het stevigere rockwerk uit zijn tijd met <span className="text-foreground font-medium">Thin Lizzy</span>. Onze performance staat garant voor jankende gitaarsolo's, herkenbare arrangementen en een ijzersterke ritmesectie.
            </p>
            <p>
              Perfect geschikt voor poppodia, bluescafés, en classic rock festivals die op zoek zijn naar een authentieke, kwalitatieve tribute act die het publiek weet te raken.
            </p>
          </div>
        </motion.div>

        {/* Call to Action Form / Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center shadow-lg border border-primary"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-display tracking-wide">Interesse om ons te boeken?</h3>
            <p className="text-sm text-primary-foreground/80 max-w-sm">
              Neem direct contact op voor prijzen, beschikbaarheid en technische vragen. We reageren doorgaans binnen 24 uur.
            </p>
            
            {/* Quick Icon Links within CTA Box */}
            <div className="flex gap-4 mt-4 text-primary-foreground/70">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary-foreground transition-colors"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Contact Action Button / Mail Router */}
          <div className="flex flex-col gap-3 items-stretch md:items-end w-full">
            <a
              href="mailto:booking@tributetogarymoore.nl?subject=Boekingsaanvraag%20Tribute%20to%20Gary%20Moore"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-background text-foreground hover:bg-background/90 font-display tracking-wide text-sm px-6 py-4 rounded-xl shadow-md transition-transform duration-150 active:scale-95"
            >
              <Mail className="w-5 h-5 text-primary" /> Stuur een E-mail
            </a>
            <span className="text-xs text-primary-foreground/60 text-center md:text-right w-full">
              Of mail rechtstreeks naar: <span className="underline">booking@tributetogarymoore.nl</span>
            </span>
          </div>
        </motion.div>

        {/* Footer section matching your current footer code */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-xs text-center mt-4"
        >
          © {new Date().getFullYear()} Tribute to Gary Moore. All assets & riders up-to-date.
        </motion.p>
      </div>
    </div>
  );
}

export default VenueInfoPage;
