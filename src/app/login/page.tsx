import Image from "next/image";
import AuthForm from "@/components/auth/AuthForm";
import { Activity, LineChart, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Login | KRIYO — Heritage Intelligence Platform",
  description: "Sign in to access the KRIYO Heritage Intelligence Platform.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full relative flex flex-col md:flex-row overflow-hidden bg-[#FCF8F0]">
      {/* Full-screen Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/auth-bg.jpg"
          alt="Artisan working with traditional pottery in warm sunset lighting"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle warm ivory overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FCF8F0]/90 via-[#FCF8F0]/60 to-[#FCF8F0]/30 mix-blend-normal"></div>
        
        {/* Decorative corner motifs (subtle) */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#8B4513]">
            <path d="M0,0 L100,0 C100,55.23 55.23,100 0,100 L0,0 Z" />
            <circle cx="20" cy="20" r="5" />
            <circle cx="40" cy="20" r="3" />
            <circle cx="20" cy="40" r="3" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none transform rotate-180">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#8B4513]">
            <path d="M0,0 L100,0 C100,55.23 55.23,100 0,100 L0,0 Z" />
            <circle cx="20" cy="20" r="5" />
            <circle cx="40" cy="20" r="3" />
            <circle cx="20" cy="40" r="3" />
          </svg>
        </div>
      </div>

      {/* Left Column: Branding and Hero */}
      <div className="relative z-10 w-full md:w-[55%] lg:w-[60%] p-8 md:p-16 lg:p-24 flex flex-col justify-between min-h-[50vh] md:min-h-screen">
        
        {/* Branding */}
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-14 h-14 bg-[#C36C39] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C36C39]/20 border border-white/20">
            <span className="text-white font-serif font-bold text-2xl tracking-wider">KR</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-[0.15em] text-[#4A2E1B] uppercase">
              Kriyo
            </h1>
            <p className="text-xs md:text-sm tracking-[0.2em] text-[#8B6B5D] uppercase mt-0.5">
              Heritage Intelligence
            </p>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="max-w-xl">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#4A2E1B] leading-[1.1] mb-6">
            Preserving Crafts.<br />
            <span className="text-[#8B4513]">Powering Futures.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#5C3A21] leading-relaxed mb-12 max-w-md font-medium opacity-90">
            KRIYO connects artisans, crafts, markets and heritage through intelligence, insight and innovation.
          </p>

          {/* Feature Strip */}
          <div className="flex flex-wrap md:flex-nowrap items-start gap-y-6">
            <div className="flex flex-col space-y-3 w-1/2 md:w-auto md:pr-8 border-transparent md:border-[rgba(139,69,19,0.15)] md:border-r">
              <Activity className="w-6 h-6 text-[#C36C39]" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-[#4A2E1B] leading-tight">Monitor<br/>Ecosystem</span>
            </div>
            <div className="flex flex-col space-y-3 w-1/2 md:w-auto md:px-8 border-transparent md:border-[rgba(139,69,19,0.15)] md:border-r">
              <LineChart className="w-6 h-6 text-[#C36C39]" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-[#4A2E1B] leading-tight">Analyze<br/>Trends</span>
            </div>
            <div className="flex flex-col space-y-3 w-1/2 md:w-auto md:px-8 border-transparent md:border-[rgba(139,69,19,0.15)] md:border-r">
              <ShieldCheck className="w-6 h-6 text-[#C36C39]" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-[#4A2E1B] leading-tight">Preserve<br/>Heritage</span>
            </div>
            <div className="flex flex-col space-y-3 w-1/2 md:w-auto md:pl-8">
              <Zap className="w-6 h-6 text-[#C36C39]" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-[#4A2E1B] leading-tight">Enable<br/>Revival</span>
            </div>
          </div>
        </div>

        {/* Bottom Left */}
        <div className="mt-16 md:mt-0 flex items-center space-x-4 opacity-80">
          <div className="h-[1px] w-12 bg-[#8B6B5D]"></div>
          <span className="text-xs font-semibold tracking-[0.2em] text-[#4A2E1B] uppercase">India's Living Craft Ecosystem</span>
          <div className="h-[1px] w-12 bg-[#8B6B5D]"></div>
        </div>
      </div>

      {/* Right Column: Auth Card */}
      <div className="relative z-10 w-full md:w-[45%] lg:w-[40%] flex items-center justify-center p-8 md:p-12 min-h-[50vh] md:min-h-screen">
        <AuthForm />
      </div>
    </div>
  );
}
