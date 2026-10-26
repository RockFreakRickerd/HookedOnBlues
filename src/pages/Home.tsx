import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Make sure to install lucide-react if not present

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Mobile menu open/close state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 py-4 px-4 md:px-12 flex items-center justify-between transition-all duration-300 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <a href="/">
            <img
              src="/HOB_logo-removebg-preview.png"
              alt="Still Got the Blues Logo"
              className="w-28 h-12 md:w-35 md:h-15 object-contain"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center text-sm font-display tracking-widest">
          {/*<a href="#about" className="hover:text-primary transition-colors uppercase">Inspiratie</a>*/}
          <a href="#tour" className="hover:text-primary transition-colors uppercase">Speeldatums</a>
          <a href="/fotos" className="hover:text-primary transition-colors uppercase">Foto's</a>
          <a href="#contact" className="hover:text-primary transition-colors uppercase">Contact</a>
          <a href="#booking">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-widest uppercase rounded-none border-b-2 border-primary-foreground/50">
              Boeken
            </Button>
          </a>
        </div>

        {/* Mobile Fast-Track Navigation (Always Visible Actions for Bookers) */}
        <div className="flex md:hidden items-center gap-4 text-xs font-display tracking-wider">
          {/*<a href="#about" className="hover:text-primary transition-colors uppercase text-[11px]">
            Inspiratie
          </a>*/}
          <a href="#tour" className="hover:text-primary transition-colors uppercase text-[11px]">
            Datums
          </a>
          
          {/* Hamburger Trigger button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-1 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Hamburger Dropdown Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] bg-background/95 backdrop-blur-lg z-40 border-b border-border/40 py-8 px-6 flex flex-col gap-6 font-display tracking-widest uppercase text-center shadow-xl md:hidden"
          >
            {/*<a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg py-2 hover:text-primary transition-colors">Inspiratie</a>
            <a href="#music" onClick={() => setMobileMenuOpen(false)} className="text-lg py-2 hover:text-primary transition-colors">De periodes</a>*/}
            <a href="#trio" onClick={() => setMobileMenuOpen(false)} className="text-lg py-2 hover:text-primary transition-colors">De power trio</a>
            <a href="#tour" onClick={() => setMobileMenuOpen(false)} className="text-lg py-2 hover:text-primary transition-colors">Speeldatums</a>
            <a href="/fotos" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors uppercase">Foto's</a>
            <a href="/links" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors uppercase">socials</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors uppercase">Contact</a>
            <a href="#boeking" onClick={() => setMobileMenuOpen(false)} className="w-full mt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-widest uppercase rounded-none h-12">
                Booking Formulier
              </Button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
          <img
            src="/Hero_TTGM.jpg"
            alt="Band silhouette on stage"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="font-accent text-2xl md:text-5xl text-secondary mb-4 rotate-[-3deg]">
              De bluesverslaafde band
            </h2>
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl tracking-tighter leading-none mb-6 drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70">
              Hooked on <br />
              Blues
            </h1>
            <p className="font-sans text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Band die verslaafd is aan blues.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#tour" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-display tracking-widest uppercase h-14 px-8 text-lg"
                >
                  Zie speeldatums
                </Button>
              </a>
              <a href="#music" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-foreground/20 text-foreground hover:bg-foreground/10 rounded-none font-display tracking-widest uppercase h-14 px-8 text-lg"
                >
                  De perioden
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:block">
          <div className="w-[2px] h-16 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* 2. The Mission */}
      {/*<section
        id="about"
        className="py-24 md:py-32 px-6 relative bg-background"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-7xl mb-6 text-foreground leading-none uppercase">
              Emotie,
              <br />
              Ruimte &<br />
              <span className="text-primary">Erfenis</span>
            </h2>
            <div className="w-20 h-1 bg-secondary mb-8" />
            <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Gary Moore was een meester van de emotie.
                Waar veel gitaristen de neiging hebben om elke seconde te vullen, wist Gary de kracht van ruimte als geen ander te benutten.
                Een prachtig voorbeeld hiervan is de lange sustain op Parisienne Walkways: waarbij iedereen wacht tot het vervolg van zijn spel.
                Hiernaast had hij ook diep respect voor zijn eigen helden en wanneer hij hen eerde gaf hij er zijn eigen draai aan.
              </p>
              <p>
                <strong>Tribute to Gary Moore</strong> pakt deze insteek ook op. 
                Dit Power trio brengt daarom niet alleen het iconische werk van Gary zelf, maar pakt ook de nummers waarmee hij zijn helden heeft geëerd op.
                We spelen zowel zijn pakkende blues als stomende rockmuziek van zijn volledige repertoire. 
              </p>
              <p className="font-accent text-xl md:text-2xl text-foreground mt-8">
                "The blues is a minimalist thing - it's like sculpting, 
                 you chip away everything you don't need until you are left with the best bits.." ~ Gary Moore
              </p>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4 z-0" />
            <img
              src="/GuitarBas.jpg"
              alt="Vintage guitar being played"
              className="relative z-10 w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-10 -left-4 sm:--left-10 z-20 w-40 sm:w-50 h-20 sm:h-23 bg-background flex items-center justify-center p-4 border border-foreground/10">
              <img
                src="/HOB_logo-removebg-preview.png"
                alt="Still Got the Blues Logo"
                className="w-full h-full opacity-50 object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>*/}

      {/* 4. The Two Eras */}
      {/*<section
        id="music"
        className="py-24 md:py-32 bg-background relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[50vw] h-full bg-secondary/5 skew-x-12 origin-top-right z-0" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-6xl mb-4 uppercase">
              Drie kanten van de legende
            </h2>
            <p className="font-accent text-xl md:text-2xl text-secondary">
              De verschillende perioden van Gary Moore die wij brengen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:grid-cols-3 md:gap-12">
            {[
              {
                type: "Rock periode",
                title: "Thin Lizzy tot solo carrière",
                colorClass: "text-secondary",
                borderClass: "hover:border-secondary/50",
                desc: "Van de snelle licks tot de krachtige riffs. De hardrock jaren van Gary Moore uit de jaren 80.",
                tracks: ["Out in the Fields", "Over the Hills and Far Away", "The Boys are back in Town"]
              },
              {
                type: "Blues Periode",
                title: "Solo carrière tot icoon",
                colorClass: "text-primary",
                borderClass: "hover:border-primary/50",
                desc: "De zielevolle blues die Gary Moore tot een gitaaricoon bracht.",
                tracks: ["Still Got the Blues", "Walking By Myself", "Oh Pretty Woman", "Parisienne Walkways"]
              },
              {
                type: "Tribute uitstap",
                title: "Gitaarhelden eren",
                colorClass: "text-secondary",
                borderClass: "hover:border-secondary/50",
                desc: "Eren van zijn grootste inspiratiebronnen, Peter Green en Jimi Hendrix.",
                tracks: ["Purple Haze", "I loved another woman", "Fire", "Foxey Lady"]
              }
            ].map((era, index) => (
              <motion.div
                key={index}
                className={`glass-panel p-6 md:p-10 transition-colors group ${era.borderClass}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`${era.colorClass} font-display text-xl md:text-2xl mb-4 uppercase tracking-widest`}>
                  {era.type}
                </div>
                <h3 className="font-display text-3xl md:text-4xl mb-6 text-foreground">
                  {era.title}
                </h3>
                <p className="text-muted-foreground mb-8 text-base md:text-lg">
                  {era.desc}
                </p>
                <ul className="space-y-3 font-display tracking-wider text-sm">
                  {era.tracks.map((track, trackIndex) => (
                    <li key={trackIndex} className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${era.type === 'Blues Periode' ? 'bg-primary' : 'bg-secondary'}`} />
                      {track}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* 5. The Power Trio */}
      <section id="trio" className="py-24 md:py-32 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-7xl leading-none uppercase">
                De verslaafde bluesband
              </h2>
              <div className="w-20 h-1 bg-primary mt-6" />
            </div>
            <p className="text-muted-foreground max-w-md text-left md:text-right text-base md:text-lg">
              Blues verslaafde band die dit ook overbrengt aan het publiek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Martijn",
                role: "Gitarist en zanger",
                desc: "Spelend op een vintage Les Paul.",
                image: "/Bas.jpeg",
              },
              {
                name: "Leen",
                role: "Gitarist",
                desc: "Spelend op een Stratocaster.",
                image: "/Bas.jpeg",
              },
              {
                name: "Rick",
                role: "Bassist",
                desc: "Spelend op een P'51.",
                image: "/Rick.jpeg",
              },
              {
                name: "Martijn",
                role: "Drumer",
                desc: "Spelend op een yamaha kit.",
                image: "/HC_Jeroen.jpg",
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Changed layout rules to guarantee text exhibits perfectly on touch screens */}
                <div className="aspect-[3/4] border border-border p-5 md:p-6 flex flex-col justify-end relative overflow-hidden rounded-none">
                  {/* Background image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                  {/* Fixed Gradient Overlay: Darker base settings for effortless mobile contrast, smooth pass-through on desktop hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30 md:via-background/75 md:to-background/20 z-10 group-hover:via-background/70 group-hover:to-transparent transition-all duration-500" />
                  
                  <div className="relative z-20">
                    {/* Fixed Mobile visibility styling: visible dynamically or on hover transition */}
                    <div className="font-accent text-lg md:text-xl text-primary mb-1 md:mb-2">
                      {member.role}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl mb-2 md:mb-4 uppercase drop-shadow-lg text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:translate-y-4 md:group-hover:translate-y-0 delay-200">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Upcoming Shows */}
      <section
        id="tour"
        className="py-24 md:py-32 bg-card border-y border-border px-4 md:px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl mb-4 uppercase">
              Live optredens
            </h2>
            <p className="font-accent text-xl md:text-2xl text-primary">
              Kom de band bewonderen
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                date: "24 Apr",
                venue: "Oranjepop 2027",
                city: "Dirksland, NL",
                status: "Meer info",
                url: "https://oranjepopdirksland.nl/#ticket",
              },
              {
                date: "TBD",
                venue: "Oldtimersdag Oude tonge",
                city: "Oude Tonge, NL",
                status: "Meer info",
                url: "https://oranjepopdirksland.nl/#ticket",
              },
            ].map((show, i) => (
              <motion.div
                key={i}
                className="flex flex-col sm:flex-row items-center justify-between p-6 glass-panel border border-border/50 hover:border-primary/50 transition-colors group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-12 w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
                  <div className="font-display text-2xl text-secondary min-w-24 uppercase">
                    {show.date}
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl uppercase">
                      {show.venue}
                    </div>
                    <div className="text-muted-foreground text-xs tracking-widest uppercase mt-0.5">
                      {show.city}
                    </div>
                  </div>
                </div>
                {show.url ? (
                  <a href={show.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto rounded-none font-display uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90">
                      {show.status}
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="outline"
                    disabled
                    className="w-full sm:w-auto rounded-none font-display uppercase tracking-widest border-border text-muted-foreground"
                  >
                    Binnenkort
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section> 
      
      {/* 7. Booking Section */}
      <section
        id="booking"
        className="py-24 md:py-32 bg-background relative px-6 border-t border-border"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl mb-4 uppercase">
              Boek de blues band.
            </h2>
            <p className="font-accent text-3xl md:text-2xl text-primary">
              Raak net zo verslaafd aan blues als deze band.
            </p>
          </div>
          
          <form 
            action="https://api.web3forms.com/submit" 
            method="POST"
            className="space-y-6"
          >
            {/* Honeypot to block spam bots */}
            <input type="hidden" name="_id_your_honeypot" style={{ display: 'none' }} />
            <input type="hidden" name="_to" value="booking@tributetogarymoore.nl" />
            <input type="hidden" name="access_key" value="89133af7-a723-44e4-bbdc-e3b56d0a6580"/>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                  Naam / Organisatie
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="bg-card border border-border/60 rounded-none p-4 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  placeholder="Bijv. Poppodium Tribute"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="bg-card border border-border/60 rounded-none p-4 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  placeholder="jouw@email.nl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="bg-card border border-border/60 rounded-none p-4 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  placeholder="+31 6 1234 5678"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                  Type Evenement
                </label>
                <select
                name="event_type"
                required
                className="bg-card border border-border/60 rounded-none p-4 text-foreground focus:outline-none focus:border-primary transition-colors text-sm appearance-none cursor-pointer"
                 >
                 <option value="" disabled selected hidden>Kies type evenement...</option>
                  <option value="Poppodium / Club">Poppodium / Club</option>
                  <option value="Festival">Festival</option>
                   <option value="Café / Kroeg">Café / Kroeg</option>
                   <option value="Privéfeest">Privéfeest / Overig</option>
                 </select>
               </div>
            </div>
            
            {/* Row 3: Technical Options */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
             <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">
               Gewenste Tijdsduur
              </label>
              <select
                name="duration"
                required
                className="bg-card border border-border/60 rounded-none p-4 text-foreground focus:outline-none focus:border-primary transition-colors text-sm appearance-none cursor-pointer"
              >  
                 <option value="" disabled selected hidden>Kies tijdsduur...</option>
                 <option value="1x 60 minuten">1x 60 minuten</option>
                 <option value="2x 45 minuten">2x 45 minuten</option>
                 <option value="Volledige show (In overleg)">Volledige show (In overleg)</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                Geluidsinstallatie (P.A.)
              </label>
              <select
                name="sound_system"
                required
                className="bg-card border border-border/60 rounded-none p-4 text-foreground focus:outline-none focus:border-primary transition-colors text-sm appearance-none cursor-pointer"
              >
                <option value="" disabled selected hidden>Geluidsinstallatie-opties...</option>
                <option value="Locatie regelt P.A. / Geluidstechnicus">Locatie heeft eigen P.A. & techniek</option>
                <option value="Trio neemt eigen P.A. mee (Kleinere locaties)">Trio neemt eigen P.A. mee (Kleine locaties)</option>
              </select>
            </div>
          </div>

            <div className="flex flex-col gap-2">
              <label className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                Details over het optreden
              </label>
              <textarea
                name="message"
                rows={5}
                className="bg-card border border-border/60 rounded-none p-4 text-foreground focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                placeholder="Vertel ons over de locatie of specifieke wensen...."
              />
            </div>

            <div className="text-center pt-4">
              <Button 
                href="/thankyou"
                type="submit"
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-display tracking-widest uppercase h-14 px-12 text-lg"
              >
                Aanvraag Versturen
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer with Contact */}
      <footer
        id="contact"
        className="bg-card border-t border-border px-6 pt-16 pb-10 relative z-10"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
            {/* Logo + tagline */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <img
                src="/HOB_logo-removebg-preview.png"
                alt="Hooked on blues"
                className="w-44 h-20 md:w-50 md:h-23 object-contain opacity-80"
              />
              <span className="font-display text-base tracking-widest uppercase text-foreground">
                Hooked on blues
              </span>
              <p className="font-accent text-lg text-primary">
                Verslaafd aan de blues.
              </p>
            </div>

            {/* Quick links */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Navigate
              </h4>
              {[
                {/*{ label: "Over ons", href: "#about" },
                { label: "De periodes", href: "#music" },*/}
                { label: "De power trio", href: "#trio" },
                { label: "Speeldatums", href: "#tour" },
                { label: "Boeken", href: "#boeking" },
                { label: "Foto's", href: "images" },
                { label: "links",  href: "links" },
                { label: "EPK", href: "info"},
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-display text-sm tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Contact
              </h4>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  Email
                </span>
                <a href="mailto:hookedonbluesnl@gmail.com" 
                   className="font-display text-sm tracking-wider text-foreground hover:text-primary transition-colors">
                  hookedonbluesnl@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  Telefoon
                </span>
                <a href="tel:+31636464141" 
                   className="font-display text-sm tracking-wider text-foreground hover:text-primary transition-colors">
                  TBD
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 text-center">
            <div className="font-display tracking-widest uppercase text-muted-foreground text-xs">
              © {new Date().getFullYear()} Hooked on Blues. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
