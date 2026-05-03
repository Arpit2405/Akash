import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Heart, ChevronDown, Sparkles, Gem, MapPin } from 'lucide-react';
import bgImg from './assets/images/pathway_bg_1777791883174.png';
import doorsImg from './assets/images/gate_doors_1777791900866.png';

const generatedPetals = Array.from({ length: 45 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 5,
  duration: 5 + Math.random() * 7,
  scale: 0.4 + Math.random() * 0.6,
  rotation: Math.random() * 360,
}));

const generatedSparkles = Array.from({ length: 40 }).map((_, i) => ({
  id: `sparkle-${i}`,
  left: `${Math.random() * 100}%`,
  bottom: `${-10 + Math.random() * 20}%`,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4,
  scale: 0.2 + Math.random() * 0.6,
}));

function Petals() {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden mix-blend-multiply">
      {generatedPetals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-10%] bg-rose-600/60 shadow-sm"
          style={{
            left: petal.left,
            width: '18px',
            height: '24px',
            borderRadius: '50% 0 50% 10%', 
            filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))',
          }}
          initial={{ y: 0, rotate: petal.rotation, opacity: 0, scale: petal.scale }}
          animate={{ y: '120vh', rotate: petal.rotation + 360, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function Sparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden mix-blend-screen">
      {generatedSparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute bg-amber-200 rounded-full blur-[1px]"
          style={{
            left: sparkle.left,
            bottom: sparkle.bottom,
            width: '8px',
            height: '8px',
            boxShadow: '0 0 15px 3px rgba(252, 211, 77, 0.9)'
          }}
          initial={{ y: 0, opacity: 0, scale: sparkle.scale }}
          animate={{ y: '-60vh', opacity: [0, 1, 0] }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

function TimeUnit({ value, label }: { value: number, label: string }) {
  const formatted = value < 10 ? `0${value}` : value;
  return (
    <div className="flex flex-col items-center">
      <div className="bg-black/40 border border-amber-500/30 backdrop-blur-md rounded-lg w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.15)] text-amber-400 font-cinzel text-2xl sm:text-4xl">
        {formatted}
      </div>
      <span className="text-amber-200/70 font-cinzel text-[10px] sm:text-xs uppercase tracking-widest mt-3">{label}</span>
    </div>
  );
}

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 sm:gap-8 justify-center mt-12 mb-20">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}

const journeyEvents = [
  {
    year: "2021",
    title: "The First Meeting",
    description: "A chance encounter changed our lives forever, turning a simple hello into endless conversations.",
    icon: Sparkles
  },
  {
    year: "2023",
    title: "The Proposal",
    description: "Under a canopy of stars, a magical question was asked, and a tearful 'Yes' became our promise.",
    icon: Gem
  },
  {
    year: "2025",
    title: "The Engagement",
    description: "Two families united in joy, celebrating the bond of love and the beginning of our forever.",
    icon: Heart
  }
];

const weddingEvents = [
  {
    title: "Mehendi & Sangeet",
    subtitle: "A night of colors and rhythms",
    date: "Thursday, 24th November",
    time: "6:00 PM onwards",
  },
  {
    title: "Haldi Ceremony",
    subtitle: "The auspicious beginning",
    date: "Friday, 25th November",
    time: "9:00 AM",
  },
  {
    title: "Wedding Ceremony",
    subtitle: "The sacred vows",
    date: "Friday, 25th November",
    time: "6:00 PM",
  },
  {
    title: "Grand Reception",
    subtitle: "A night of celebration",
    date: "Saturday, 26th November",
    time: "7:00 PM onwards",
  }
];

function InvitationContent() {
  return (
    <motion.div 
      className="absolute inset-0 z-30 overflow-y-auto overflow-x-hidden scroll-smooth"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
        <motion.div 
          className="max-w-2xl w-full border border-amber-500/40 bg-black/40 p-8 sm:p-14 rounded-xl backdrop-blur-md shadow-[0_0_50px_-10px_rgba(245,158,11,0.3)] relative"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
        >
          {/* Corner elegant ornaments */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-amber-500 -translate-x-2 -translate-y-2 opacity-60 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-amber-500 translate-x-2 -translate-y-2 opacity-60 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-amber-500 -translate-x-2 translate-y-2 opacity-60 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-amber-500 translate-x-2 translate-y-2 opacity-60 rounded-br-lg" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-amber-400 font-cinzel tracking-[0.3em] text-xs sm:text-sm uppercase mb-8 opacity-90">
              With the blessings of our elders
            </p>
            
            <div className="relative">
              <h1 className="text-5xl sm:text-7xl font-great-vibes text-[#FFEDD5] mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Ananya & Rohan
              </h1>
            </div>
            
            <p className="text-amber-100/90 font-playfair italic text-lg sm:text-2xl mb-10 tracking-wide font-light">
              Joyfully invite you to celebrate<br />
              the beginning of our forever
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-10 text-amber-500/70">
              <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-amber-500/70" />
              <Heart className="w-4 h-4 fill-amber-500/40" />
              <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-amber-500/70" />
            </div>
            
            <div className="font-cinzel text-amber-300 uppercase tracking-[0.25em] space-y-3 text-xs sm:text-sm">
              <p>Friday, 25th November 2026</p>
              <p>The Grand Palace, Udaipur</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 flex flex-col items-center text-amber-500/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest mb-2">Scroll Down</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.div>
      </div>

      <div className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center p-6 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="font-playfair italic text-3xl sm:text-5xl text-amber-100/90 mb-6 drop-shadow-md">
            The Countdown Begins
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/70 to-transparent mx-auto mb-10" />
          
          <Countdown targetDate="2026-11-25T00:00:00" />
          
          <p className="max-w-md mx-auto text-amber-200/70 font-playfair italic text-lg sm:text-xl font-light">
            We cannot wait to share these precious moments with you.
          </p>
        </motion.div>
      </div>

      {/* Our Journey Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl"
        >
          <div className="flex flex-col items-center justify-center mb-16 sm:mb-24 text-center w-full">
            <h2 className="font-playfair italic text-4xl sm:text-5xl text-amber-100/90 mb-4 drop-shadow-md">
              Our Journey
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/70 to-transparent mx-auto" />
          </div>

          <div className="relative w-full">
            {/* Center Line for Desktop */}
            <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-amber-500/10 via-amber-500/40 to-amber-500/10" />
            
            <div className="space-y-12 sm:space-y-0 w-full">
              {journeyEvents.map((event, idx) => {
                const Icon = event.icon;
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex flex-col sm:flex-row items-center w-full group py-0 sm:py-12"
                  >
                    {/* Desktop Icon */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-zinc-950 border border-amber-500/40 z-10 text-amber-500/60 group-hover:text-amber-400 group-hover:border-amber-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Content */}
                    <div className={`w-full sm:w-1/2 flex relative z-10 ${idx % 2 === 0 ? 'sm:justify-end sm:pr-16' : 'sm:justify-start sm:pl-16 sm:ml-auto'}`}>
                      {/* Mobile Icon */}
                      <div className="sm:hidden absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-950 border border-amber-500/40 text-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)] z-20">
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <div className={`bg-black/60 p-8 rounded-xl border border-amber-500/20 backdrop-blur-md hover:border-amber-500/40 transition-colors shadow-[0_0_30px_rgba(245,158,11,0.05)] w-full sm:max-w-md text-center pt-8 sm:pt-8 ${idx % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                        <span className="font-cinzel text-amber-500/80 text-sm tracking-widest">{event.year}</span>
                        <h3 className="text-2xl font-playfair text-[#FFEDD5] mt-2 mb-3">{event.title}</h3>
                        <p className="text-amber-200/60 font-playfair italic text-base leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="text-center w-full"
        >
          <div className="flex flex-col items-center justify-center mb-16">
            <Heart className="w-6 h-6 fill-amber-500/20 text-amber-500/40 mb-4" />
            <h2 className="font-playfair italic text-4xl sm:text-5xl text-amber-100/90 mb-4 drop-shadow-md">
              The Celebrations
            </h2>
            <p className="text-amber-400 font-cinzel tracking-[0.2em] text-xs sm:text-sm uppercase opacity-90">
              Order of Events
            </p>
          </div>

          <div className="relative flex flex-col items-center max-w-4xl mx-auto w-full">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
            
            <div className="space-y-12 sm:space-y-16 w-full relative z-10">
              {weddingEvents.map((event, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="flex flex-col items-center text-center bg-black/60 p-8 rounded-xl border border-amber-500/20 backdrop-blur-md max-w-md mx-auto shadow-[0_0_30px_rgba(245,158,11,0.05)] w-full relative group hover:border-amber-500/40 transition-colors"
                >
                  <div className="absolute -top-3 w-6 h-6 bg-zinc-950 rounded-full border border-amber-500/40 flex items-center justify-center">
                    <div className="w-2 h-2 bg-amber-500/70 rounded-full group-hover:bg-amber-400 transition-colors" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-playfair text-[#FFEDD5] mb-2 mt-2">{event.title}</h3>
                  <p className="text-amber-200/60 font-playfair italic text-lg mb-5">{event.subtitle}</p>
                  <div className="w-12 h-[1px] bg-amber-500/50 mb-5" />
                  <div className="font-cinzel text-amber-400/90 text-xs sm:text-sm tracking-widest space-y-2">
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Venue & Location Section */}
      <div className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center p-6 sm:p-8 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="w-full max-w-4xl text-center"
        >
          <div className="flex flex-col items-center justify-center mb-12 sm:mb-16">
            <MapPin className="w-6 h-6 text-amber-500/60 mb-4" />
            <h2 className="font-playfair italic text-4xl sm:text-5xl text-amber-100/90 mb-4 drop-shadow-md">
              The Venue
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/70 to-transparent mx-auto mb-6" />
            <p className="font-cinzel text-amber-300 uppercase tracking-[0.2em] text-sm sm:text-base">
              The Grand Palace, Udaipur
            </p>
            <p className="text-amber-200/60 font-playfair italic text-base mt-4 max-w-lg mx-auto">
              Lake Pichola, Udaipur, Rajasthan 313001, India
            </p>
          </div>

          <div className="relative w-full rounded-xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] aspect-video sm:aspect-[21/9] bg-black/50 p-2">
            <div className="absolute inset-0 z-10 pointer-events-none rounded-xl ring-1 ring-inset ring-amber-500/20" />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14513.799890695627!2d73.67067831034297!3d24.57685351865911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e565aa21f7bb%3A0xcfec739e55ccc5eb!2sTaj%20Lake%20Palace%2C%20Udaipur!5e0!3m2!1sen!2sin!4v1703668102341!5m2!1sen!2sin" 
              className="w-full h-full rounded-lg opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <a 
            href="https://maps.app.goo.gl/g6z2u6zZzZzZzZzZz" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block mt-10 px-8 py-3 font-cinzel text-sm uppercase tracking-[0.15em] text-amber-100 bg-amber-900/40 border border-amber-500/50 hover:bg-amber-800/60 hover:scale-105 hover:border-amber-400 transition-all rounded-sm backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            Get Directions
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const handleOpenGate = () => {
    setIsOpen(true);
    
    // Attempt to play audio
    // Using a subtle placeholder audio for the vibe.
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked by browser:', e));
    }

    setTimeout(() => {
      setShowContent(true);
    }, 2500); 
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-zinc-950 flex flex-col items-center justify-center">
      
      {/* Fallback audio element to simulate the requested Shehnai/Flute theme */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg" 
      />

      {/* Pathway Background */}
      <motion.div
        className="absolute inset-0 z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
        initial={{ scale: 1.15 }}
        animate={{ scale: isOpen ? 1 : 1.15 }}
        transition={{ duration: 4.5, ease: 'easeOut' }}
      />

      {/* Burst light effect when the gate opens */}
      <motion.div
        className="absolute inset-0 z-40 bg-amber-400 blur-[100px] origin-center pointer-events-none mix-blend-screen"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isOpen ? [0, 0.4, 0] : 0, scale: isOpen ? 1.5 : 0.5 }}
        transition={{ duration: 3.5, ease: 'easeOut' }}
      />

      {/* Left Gate Door */}
      <motion.div
        className="absolute inset-0 z-50 bg-cover bg-center shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
        style={{
          backgroundImage: `url(${doorsImg})`,
          clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
          willChange: 'transform'
        }}
        initial={{ x: 0 }}
        animate={{ x: isOpen ? '-55%' : 0 }}
        transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />

      {/* Right Gate Door */}
      <motion.div
        className="absolute inset-0 z-50 bg-cover bg-center shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
        style={{
          backgroundImage: `url(${doorsImg})`,
          clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
          willChange: 'transform'
        }}
        initial={{ x: 0 }}
        animate={{ x: isOpen ? '55%' : 0 }}
        transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />

      {/* Interactive Elements / Overlays */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="absolute z-60 flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="font-playfair text-amber-200/90 text-2xl mb-8 drop-shadow-xl"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              A Royal Celebration Awaits
            </motion.h2>
            <button
              onClick={handleOpenGate}
              className="px-8 py-4 font-cinzel text-lg sm:text-xl uppercase tracking-[0.2em] text-amber-100 bg-black/60 border border-amber-500/70 backdrop-blur-md hover:bg-black/80 hover:scale-105 hover:border-amber-400 transition-all outline-none rounded-sm cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
            >
              Open Gate
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reveal the particles and content after opened */}
      {isOpen && (
        <>
          <Petals />
          <Sparkles />
        </>
      )}

      {showContent && (
        <InvitationContent />
      )}

      {/* Mute/Unmute audio control */}
      {showContent && (
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={toggleMute}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 p-4 rounded-full bg-black/50 text-amber-300 border border-amber-500/40 backdrop-blur-md hover:bg-black/70 hover:scale-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center group"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 group-hover:opacity-80" /> : <Volume2 className="w-5 h-5 group-hover:opacity-80" />}
        </motion.button>
      )}
    </div>
  );
}
