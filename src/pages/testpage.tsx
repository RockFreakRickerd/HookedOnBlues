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

// Real-time clock logic for dashboard
useEffect(() => {
  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };
  updateTime();
  const timer = setInterval(updateTime, 1000);
  return () => clearInterval(timer);
}, []);

// Equalizer visualizer effect simulation
const [eqHeights, setEqHeights] = useState([40, 70, 30, 85, 50, 95, 60, 40, 80, 45]);
useEffect(() => {
  let interval;
  if (isPlaying) {
    interval = setInterval(() => {
      setEqHeights(prev => prev.map(() => Math.floor(Math.random() * 85) + 15));
    }, 150);
  } else {
    setEqHeights([15, 15, 15, 15, 15, 15, 15, 15, 15, 15]);
  }
  return () => clearInterval(interval);
}, [isPlaying]);


export function testPage() {
  return (
    <div className="min-h-screen bg-[#060709] text-[#E0E6ED] font-sans flex flex-col items-center justify-center p-2 sm:p-6 select-none relative overflow-hidden">
      
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FFCC00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#D32F2F]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* DASHBOARD OUTER FRAME / CAR CONSOLE */}
      <div className="w-full max-w-5xl bg-gradient-to-b from-[#1b1e24] via-[#121418] to-[#0a0b0d] rounded-2xl sm:rounded-3xl border-4 border-[#2d323e] p-3 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative">
        
        {/* TOP CAR DASHBOARD BAR (Status & Steering Wheel Trim) */}
        <div className="flex items-center justify-between border-b border-[#2d323e] pb-3 mb-4 text-xs font-mono text-[#8a94a6]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFCC00] animate-pulse" />
            <span className="font-bold tracking-wider text-[#FFCC00]">HOOKED ON BLUES • INFOTAINMENT v2.6</span>
          </div>

          {/* Center Climate / Clock Display */}
          <div className="hidden sm:flex items-center gap-4 bg-[#0a0b0d] px-4 py-1 rounded-full border border-[#262a36]">
            <span className="text-[#FFCC00] font-bold">21.5°C</span>
            <span>•</span>
            <span className="text-white font-mono tracking-widest">{currentTime || '22:00'}</span>
          </div>

          {/* Quick Engine Status */}
          <div className="flex items-center gap-2 text-[#4cd964]">
            <Flame className="w-4 h-4 text-[#D32F2F]" />
            <span className="hidden sm:inline">ENGINE: READY TO ROCK</span>
          </div>
        </div>

        {/* MAIN INFOTAINMENT SCREEN CONTAINER */}
        <div className="bg-[#08090c] rounded-xl border-2 border-[#1e222d] shadow-inner overflow-hidden relative flex flex-col md:flex-row min-h-[480px]">
          
          {/* SIDE NAVIGATION BAR (Dash Buttons) */}
          <div className="w-full md:w-56 bg-[#0f1117] border-b md:border-b-0 md:border-r border-[#1e222d] p-3 flex md:flex-col justify-between gap-2 z-10">
            <div className="flex md:flex-col gap-2 w-full">
              
              {/* BUTTON 1: RADIO / SAMPLES */}
              <button
                onClick={() => setActiveTab('radio')}
                className={`flex-1 md:w-full p-3 rounded-lg flex items-center justify-center md:justify-start gap-3 font-mono text-sm uppercase tracking-wider transition-all border ${
                  activeTab === 'radio'
                    ? 'bg-[#FFCC00] text-[#050505] font-extrabold border-[#FFCC00] shadow-[0_0_15px_rgba(255,204,0,0.3)]'
                    : 'bg-[#141720] text-[#8a94a6] hover:text-white border-[#222735] hover:border-[#383f54]'
                }`}
              >
                <Radio className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline">Radio (Samples)</span>
                <span className="sm:hidden text-xs">Radio</span>
              </button>

              {/* BUTTON 2: MAP / TOUR DATES */}
              <button
                onClick={() => setActiveTab('map')}
                className={`flex-1 md:w-full p-3 rounded-lg flex items-center justify-center md:justify-start gap-3 font-mono text-sm uppercase tracking-wider transition-all border ${
                  activeTab === 'map'
                    ? 'bg-[#FFCC00] text-[#050505] font-extrabold border-[#FFCC00] shadow-[0_0_15px_rgba(255,204,0,0.3)]'
                    : 'bg-[#141720] text-[#8a94a6] hover:text-white border-[#222735] hover:border-[#383f54]'
                }`}
              >
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline">Navi (Optredens)</span>
                <span className="sm:hidden text-xs">Navi</span>
              </button>

              {/* BUTTON 3: INFO / BAND */}
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 md:w-full p-3 rounded-lg flex items-center justify-center md:justify-start gap-3 font-mono text-sm uppercase tracking-wider transition-all border ${
                  activeTab === 'info'
                    ? 'bg-[#FFCC00] text-[#050505] font-extrabold border-[#FFCC00] shadow-[0_0_15px_rgba(255,204,0,0.3)]'
                    : 'bg-[#141720] text-[#8a94a6] hover:text-white border-[#222735] hover:border-[#383f54]'
                }`}
              >
                <Info className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline">Boordcomputer</span>
                <span className="sm:hidden text-xs">Info</span>
              </button>
            </div>

            {/* Quick Volume / Audio Knob Mini Display */}
            <div className="hidden md:block bg-[#141720] p-3 rounded-lg border border-[#222735] text-center">
              <div className="text-[10px] font-mono text-[#8a94a6] mb-1">HOOFDVOLUMETRIE</div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className="p-1.5 rounded bg-[#1e222d] text-[#FFCC00] hover:bg-[#282d3c]"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#D32F2F]" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={isMuted ? 0 : volume} 
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-[#FFCC00] bg-[#1e222d] h-1.5 rounded cursor-pointer" 
                />
              </div>
            </div>
          </div>

          {/* DYNAMIC SCREEN DISPLAY AREA */}
          <div className="flex-1 p-4 sm:p-6 relative bg-[#0a0c10] overflow-y-auto">

            {/* SCREEN VIEW 1: RADIO & AUDIO SAMPLES */}
            {activeTab === 'radio' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#1e222d] pb-3">
                  <div>
                    <h2 className="text-xl font-bold font-mono text-[#FFCC00] uppercase tracking-wider flex items-center gap-2">
                      <Radio className="w-5 h-5 text-[#D32F2F]" /> BLUES SAMPLES RADIO
                    </h2>
                    <p className="text-xs text-[#8a94a6]">Kies een frequentie om de rauwe sound van Hooked On Blues te beluisteren</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#D32F2F]/20 border border-[#D32F2F] text-[#D32F2F] text-xs font-mono font-bold">
                    LIVE STREAM
                  </span>
                </div>

                {/* Main Radio Tuner Player Box */}
                <div className="bg-gradient-to-r from-[#12151e] to-[#0d0f15] p-5 rounded-xl border border-[#222735] shadow-lg relative">
                  
                  {/* Digital Frequency Readout */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-[#07080b] p-4 rounded-lg border border-[#1b1f2b]">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#FFCC00]/10 border-2 border-[#FFCC00] flex items-center justify-center text-[#FFCC00]">
                        <Disc className={`w-7 h-7 ${isPlaying ? 'animate-spin' : ''}`} />
                      </div>
                      <div>
                        <div className="text-2xl font-mono font-black text-[#FFCC00] tracking-widest">
                          {samples[currentStationIndex].freq}
                        </div>
                        <div className="text-sm font-bold text-white">
                          {samples[currentStationIndex].title}
                        </div>
                        <div className="text-xs text-[#8a94a6] font-mono">
                          {samples[currentStationIndex].genre} • {samples[currentStationIndex].duration}
                        </div>
                      </div>
                    </div>

                    {/* Equalizer Visualizer */}
                    <div className="flex items-end gap-1.5 h-12 px-3 bg-[#0c0e14] rounded border border-[#1a1e29]">
                      {eqHeights.map((h, i) => (
                        <div
                          key={i}
                          className="w-2 bg-gradient-to-t from-[#D32F2F] to-[#FFCC00] rounded-t transition-all duration-150"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Player Description */}
                  <p className="text-xs text-[#b0b8c6] mb-5 bg-[#171a24] p-3 rounded border border-[#222735]">
                    💡 <strong className="text-white">Track Note:</strong> {samples[currentStationIndex].description}
                  </p>

                  {/* Playback Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-[#FFCC00] hover:bg-[#e6b800] text-[#050505] font-mono font-bold uppercase px-6 py-3 rounded-lg flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(255,204,0,0.3)] transition-all"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                      <span>{isPlaying ? 'Pauzeer Sample' : 'Speel Sample Af'}</span>
                    </button>

                    {/* Station Selector Buttons */}
                    <div className="flex items-center gap-2">
                      {samples.map((sample, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentStationIndex(idx);
                            setIsPlaying(true);
                          }}
                          className={`px-3 py-2 rounded font-mono text-xs font-bold transition-all ${
                            currentStationIndex === idx
                              ? 'bg-[#D32F2F] text-white border border-white/20'
                              : 'bg-[#181b26] text-[#8a94a6] hover:text-white border border-[#262b3a]'
                          }`}
                        >
                          P{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Preset List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {samples.map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setCurrentStationIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        currentStationIndex === idx
                          ? 'bg-[#FFCC00]/10 border-[#FFCC00]'
                          : 'bg-[#0f121a] border-[#1e222d] hover:border-[#383f54]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#FFCC00]">{s.freq}</span>
                        <div>
                          <div className="text-xs font-bold text-white">{s.title}</div>
                          <div className="text-[10px] text-[#8a94a6] font-mono">{s.genre}</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${currentStationIndex === idx ? 'text-[#FFCC00]' : 'text-[#444]'}`} />
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* SCREEN VIEW 2: MAP & UPCOMING GIG NAVIGATION */}
            {activeTab === 'map' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#1e222d] pb-3">
                  <div>
                    <h2 className="text-xl font-bold font-mono text-[#FFCC00] uppercase tracking-wider flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-[#D32F2F]" /> GPS NAVIGATIE • OPTREDENS
                    </h2>
                    <p className="text-xs text-[#8a94a6]">Stel de navigatie in naar het dichtstbijzijnde optreden van Hooked On Blues</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#FFCC00]/20 border border-[#FFCC00] text-[#FFCC00] text-xs font-mono font-bold">
                    GPS LOCK: ACTIVE
                  </span>
                </div>

                {/* Interactive Map Layout & Details Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  
                  {/* Simulated GPS Vector Radar Screen */}
                  <div className="lg:col-span-7 bg-[#06080d] border border-[#1e222d] rounded-xl p-4 relative min-h-[260px] flex items-center justify-center overflow-hidden">
                    
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#141824_1px,transparent_1px),linear-gradient(to_bottom,#141824_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
                    
                    {/* Compass Ring */}
                    <div className="absolute w-56 h-56 rounded-full border border-[#FFCC00]/20 pointer-events-none flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full border border-[#D32F2F]/20" />
                    </div>

                    {/* Home Marker (Goeree-Overflakkee HQ) */}
                    <div className="absolute top-[35%] left-[25%] flex flex-col items-center">
                      <span className="w-3 h-3 rounded-full bg-white animate-ping absolute" />
                      <span className="w-3 h-3 rounded-full bg-white relative" />
                      <span className="text-[9px] font-mono font-bold text-white bg-black/80 px-1.5 py-0.5 rounded border border-white/20 mt-1">
                        HQ: Goeree
                      </span>
                    </div>

                    {/* Dynamic Gig Map Pins */}
                    {upcomingGigs.map((gig, idx) => (
                      <div
                        key={gig.id}
                        onClick={() => setSelectedGig(idx)}
                        style={{ top: `${gig.coords.y}%`, left: `${gig.coords.x}%` }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                      >
                        <div className={`p-1.5 rounded-full border-2 transition-transform ${
                          selectedGig === idx 
                            ? 'bg-[#FFCC00] border-white scale-125 shadow-[0_0_15px_rgba(255,204,0,0.8)]' 
                            : 'bg-[#D32F2F] border-[#FFCC00] group-hover:scale-110'
                        }`}>
                          <MapPin className={`w-4 h-4 ${selectedGig === idx ? 'text-black' : 'text-white'}`} />
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded block mt-1 whitespace-nowrap border ${
                          selectedGig === idx 
                            ? 'bg-[#FFCC00] text-black border-white' 
                            : 'bg-[#0a0c10]/90 text-[#FFCC00] border-[#222735]'
                        }`}>
                          {gig.city}
                        </span>
                      </div>
                    ))}

                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[#666] bg-black/80 px-2 py-1 rounded border border-[#222]">
                      REGIO: NL / ZUID-HOLLAND & ZEELAND
                    </div>
                  </div>

                  {/* Selected Location Details Panel */}
                  <div className="lg:col-span-5 bg-[#0e111a] p-4 rounded-xl border border-[#1e222d] flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-[#D32F2F] uppercase tracking-widest mb-1">GEKOZEN BESTEMMING</div>
                      <h3 className="text-lg font-bold text-white font-mono">
                        {upcomingGigs[selectedGig].venue}
                      </h3>
                      <div className="text-xs text-[#FFCC00] font-mono mb-3">
                        {upcomingGigs[selectedGig].city} • {upcomingGigs[selectedGig].distance}
                      </div>

                      <div className="space-y-2 bg-[#08090d] p-3 rounded border border-[#1d212c] text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-[#8a94a6]">Datum:</span>
                          <span className="text-white font-bold">{upcomingGigs[selectedGig].date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8a94a6]">Aanvang:</span>
                          <span className="text-white font-bold">{upcomingGigs[selectedGig].time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8a94a6]">Status:</span>
                          <span className="text-[#4cd964] font-bold">{upcomingGigs[selectedGig].status}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Navigatie gestart naar ${upcomingGigs[selectedGig].venue} in ${upcomingGigs[selectedGig].city}!`)}
                      className="mt-4 w-full bg-[#D32F2F] hover:bg-[#b72424] text-white font-mono font-bold text-xs uppercase py-3 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(211,47,47,0.4)] transition-all"
                    >
                      <Navigation className="w-4 h-4 fill-current" />
                      Start Navigatie Naar Zaal
                    </button>
                  </div>

                </div>

                {/* All Gigs Quick Selector Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {upcomingGigs.map((gig, idx) => (
                    <button
                      key={gig.id}
                      onClick={() => setSelectedGig(idx)}
                      className={`p-2.5 rounded-lg border text-left font-mono transition-all ${
                        selectedGig === idx 
                          ? 'bg-[#FFCC00]/10 border-[#FFCC00]' 
                          : 'bg-[#0d0f17] border-[#1d212c] hover:border-[#333a4d]'
                      }`}
                    >
                      <div className="text-[10px] text-[#D32F2F] font-bold">{gig.date}</div>
                      <div className="text-xs font-bold text-white truncate">{gig.city}</div>
                      <div className="text-[10px] text-[#8a94a6] truncate">{gig.venue}</div>
                    </button>
                  ))}
                </div>

              </div>
            )}

            {/* SCREEN VIEW 3: BOORDCOMPUTER / BAND INFO */}
            {activeTab === 'info' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#1e222d] pb-3">
                  <div>
                    <h2 className="text-xl font-bold font-mono text-[#FFCC00] uppercase tracking-wider flex items-center gap-2">
                      <Info className="w-5 h-5 text-[#D32F2F]" /> BOORDCOMPUTER • OVER HOOKED ON BLUES
                    </h2>
                    <p className="text-xs text-[#8a94a6]">Systeeminformatie, bandhistorie en technische specificaties</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#1e222d] text-[#8a94a6] text-xs font-mono">
                    BAND PROFIEL
                  </span>
                </div>

                {/* Main Story & Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  
                  {/* Band History */}
                  <div className="md:col-span-7 bg-[#0f121b] p-5 rounded-xl border border-[#1e222d] space-y-4">
                    <h3 className="text-sm font-bold font-mono text-[#FFCC00] uppercase tracking-wider flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#D32F2F]" /> DE BLUESVERSLAAFDE BAND
                    </h3>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed">
                      <strong className="text-white">Hooked On Blues</strong> is ontstaan vanuit een onuitblusbare passie voor rauwe, authentieke barroom blues en bluesrock. Met roots op het eiland <strong>Goeree-Overflakkee</strong> reist dit trio kroegen, zalen en festivals af om het publiek mee te zuigen in een dampende muzikale stroomversnelling.
                    </p>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed">
                      Geen platgepolijste backing tracks, maar 100% pure ambacht: scheurende gitaarsolo's op vintage Gibson instrumenten, strakke groovy drumlines en zware basfundamenten.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded bg-[#161a26] text-[#FFCC00] border border-[#2a3044] text-[11px] font-mono">
                        🎸 Semi-Hollow Sunburst Tone
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#161a26] text-[#FFCC00] border border-[#2a3044] text-[11px] font-mono">
                        🥁 100% Live Vibe
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#161a26] text-[#FFCC00] border border-[#2a3044] text-[11px] font-mono">
                        🚗 Goeree-Overflakkee Roots
                      </span>
                    </div>
                  </div>

                  {/* Band Members & Tech Specs */}
                  <div className="md:col-span-5 bg-[#0f121b] p-5 rounded-xl border border-[#1e222d] space-y-4">
                    <h3 className="text-sm font-bold font-mono text-[#FFCC00] uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4 text-[#D32F2F]" /> BEZETTING & SETUP
                    </h3>

                    <div className="space-y-3">
                      <div className="bg-[#080a0f] p-3 rounded border border-[#1e2332]">
                        <div className="text-xs font-bold text-white font-mono">GITAAR & ZANG</div>
                        <div className="text-[11px] text-[#8a94a6]">Rauwe leadzang en jankende Gibson ES-335 riffs.</div>
                      </div>

                      <div className="bg-[#080a0f] p-3 rounded border border-[#1e2332]">
                        <div className="text-xs font-bold text-white font-mono">BASGITAAR</div>
                        <div className="text-[11px] text-[#8a94a6]">Diepe ronkende baslijnen die de groove dragen.</div>
                      </div>

                      <div className="bg-[#080a0f] p-3 rounded border border-[#1e2332]">
                        <div className="text-xs font-bold text-white font-mono">DRUMS & PERCUSSIE</div>
                        <div className="text-[11px] text-[#8a94a6]">Dynamic shuffle beat met barroom feel.</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Booking Contact Bar */}
                <div className="bg-gradient-to-r from-[#D32F2F]/20 via-[#181b26] to-[#FFCC00]/20 p-4 rounded-xl border border-[#D32F2F]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-white font-mono uppercase">BOEKINGEN & INFORMATIE</div>
                    <div className="text-xs text-[#8a94a6]">Wilt u Hooked On Blues boeken voor uw café, festival of evenement?</div>
                  </div>
                  <button 
                    onClick={() => alert("Neem contact op voor boekingen via info@hookedonblues.nl")}
                    className="bg-[#FFCC00] hover:bg-[#e6b800] text-black font-mono font-bold text-xs uppercase px-5 py-2.5 rounded shadow-lg transition-all whitespace-nowrap"
                  >
                    Direct Boeken
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* BOTTOM CAR CONSOLE DASHBOARD BUTTONS */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8a94a6]">
          <div className="flex items-center gap-4">
            <span>SOUND SYSTEM: <strong className="text-white">TUBE AMP STEREO</strong></span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">CRUISE CONTROL: <strong className="text-[#4cd964]">ACTIVE</strong></span>
          </div>
          <div className="text-[#FFCC00]">
            © {new Date().getFullYear()} HOOKED ON BLUES 
          </div>
        </div>

      </div>

    </div>
  );
}

export default testPage;