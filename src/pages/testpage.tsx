import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  MapPin, 
  Info, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Clock, 
  Navigation, 
  Music, 
  User, 
  Flame, 
  ChevronRight,
  Disc,
  Award,
  Maximize2
} from 'lucide-react';

const [activeTab, setActiveTab] = useState('radio'); // 'radio', 'map', 'info'
const [isPlaying, setIsPlaying] = useState(false);
const [currentStationIndex, setCurrentStationIndex] = useState(0);
const [isMuted, setIsMuted] = useState(false);
const [volume, setVolume] = useState(75);
const [currentTime, setCurrentTime] = useState('');
const [selectedGig, setSelectedGig] = useState(0);

// Audio samples list for Radio mode
const samples = [
  { title: "Still Got The Blues", freq: "88.5 FM", genre: "Slow Blues Lead", duration: "0:45", description: "Rauwe Gibson ES-335 solo via overstuurde buizenversterker." },
  { title: "Tequila Barroom Shuffle", freq: "94.2 FM", genre: "Chicago Blues", duration: "0:38", description: "Strakke ritmesectie met stuwende baslijn en pub-vibe." },
  { title: "Goeree-Overflakkee Stomp", freq: "101.8 FM", genre: "Delta Blues Rock", duration: "0:52", description: "Slide guitar riff met rauwe dynamiek en swing." },
  { title: "Midnight Cruiser Jam", freq: "106.4 FM", genre: "Vintage Rock 'n' Blues", duration: "0:40", description: "Improvisatie live opgenomen in de repetitieruimte." }
];

// Upcoming Gig Dates for Map / Navigation mode
const upcomingGigs = [
  { id: 1, venue: "Bluescafé De Spieghel", city: "Middelburg", date: "14 NOV 2026", time: "21:30", distance: "45 km", status: "BEVESTIGD", coords: { x: 35, y: 45 } },
  { id: 2, venue: "Café De Gouden Leeuw", city: "Sommelsdijk (Goeree)", date: "28 NOV 2026", time: "22:00", distance: "12 km", status: "THUISWEDSTRIJD", coords: { x: 55, y: 30 } },
  { id: 3, venue: "Rock & Blues Dock", city: "Rotterdam", date: "12 DEC 2026", time: "20:45", distance: "68 km", status: "LAATSTE KAARTEN", coords: { x: 70, y: 25 } },
  { id: 4, venue: "Festival Roots & Rhythm", city: "Breda", date: "09 JAN 2027", time: "19:15", distance: "85 km", status: "HEADLINER", coords: { x: 65, y: 65 } }
];

export function testPage() {
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

export default testPage;