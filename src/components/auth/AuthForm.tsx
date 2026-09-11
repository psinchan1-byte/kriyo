"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      // Implement a timeout promise to prevent getting stuck
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 10000)
      );

      const authPromise = supabase.auth.signInWithPassword({
        email,
        password,
      });

      const { data, error: authError } = await Promise.race([
        authPromise,
        timeoutPromise,
      ]) as any;

      if (authError) {
        setError("Invalid email or password.");
        return;
      }
      
      if (!data?.user) {
        throw new Error("No user returned");
      }

      router.replace("/");
      router.refresh();
    } catch (err: any) {
      console.log("[AUTH] Unexpected error:", err.message);
      if (err.message === "Timeout") {
        setError("Unable to connect to the authentication service. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError("Failed to send reset link. Please try again.");
    } else {
      setMessage("If the account exists, a password reset link has been sent.");
    }
    setLoading(false);
  };

  const handleSSO = () => {
    alert("Government SSO integration is currently in demo mode.");
  };

  return (
    <div className="w-full max-w-[440px] p-8 md:p-10 rounded-[28px] relative overflow-hidden backdrop-blur-md shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.18)] z-10"
         style={{
           backgroundColor: "rgba(252, 248, 240, 0.75)", 
           border: "1px solid rgba(255, 255, 255, 0.6)",
         }}>
      
      {/* Decorative top center motif */}
      <div className="flex justify-center mb-6 opacity-80">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2C21.5 8 26 12 32 14C26 16 21.5 20 20 26C18.5 20 14 16 8 14C14 12 18.5 8 20 2Z" fill="#8B4513" fillOpacity="0.8"/>
          <circle cx="20" cy="14" r="3" fill="#8B4513" fillOpacity="0.8"/>
        </svg>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-[#4A2E1B] mb-2">Welcome Back</h2>
        <p className="text-sm text-[#6D4C3D]">Sign in to access the KRIYO Intelligence Platform</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        
        {error && (
          <div className="bg-red-50/50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50/50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
            {message}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#4A2E1B] ml-1">Email Address</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-4 w-5 h-5 text-[#8B6B5D]" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kaarigarsetu.gov.in"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[rgba(139,69,19,0.15)] bg-[rgba(255,255,255,0.6)] text-[#4A2E1B] placeholder-[#A0887A] focus:outline-none focus:ring-2 focus:ring-[#C36C39] focus:border-transparent transition-all backdrop-blur-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#4A2E1B] ml-1">Password</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 w-5 h-5 text-[#8B6B5D]" />
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-[rgba(139,69,19,0.15)] bg-[rgba(255,255,255,0.6)] text-[#4A2E1B] placeholder-[#A0887A] focus:outline-none focus:ring-2 focus:ring-[#C36C39] focus:border-transparent transition-all backdrop-blur-sm"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-[#8B6B5D] hover:text-[#4A2E1B] transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-4 h-4 border border-[#8B6B5D] rounded bg-[rgba(255,255,255,0.5)] peer-checked:bg-[#C36C39] peer-checked:border-[#C36C39] transition-all"></div>
              <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm text-[#6D4C3D] group-hover:text-[#4A2E1B] transition-colors">Remember me</span>
          </label>

          <button 
            onClick={handleForgotPassword}
            className="text-sm text-[#C36C39] hover:text-[#9A4C22] font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="group relative w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-[#C36C39] hover:bg-[#B25D2B] hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C36C39] shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70"
          >
            {loading ? "Signing in..." : (
              <>
                Sign In 
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[rgba(139,69,19,0.15)]"></div>
        </div>
        <div className="relative px-4 bg-[#FCF8F0] bg-opacity-0 text-xs text-[#8B6B5D] uppercase tracking-wider backdrop-blur-[2px]">
          OR
        </div>
      </div>

      <div className="mt-8">
        <button 
          type="button" 
          onClick={handleSSO}
          className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl border border-[#C36C39] text-[#A65424] bg-transparent hover:bg-[#FDF4E7] hover:text-[#8B4513] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C36C39] transition-all duration-200 font-medium"
        >
          <Shield className="w-5 h-5 mr-2" />
          SSO Login (Government)
        </button>
      </div>

      <div className="mt-8 flex justify-center items-center text-xs text-[#8B6B5D] space-x-1.5 opacity-80">
        <Shield className="w-3.5 h-3.5" />
        <span>Secure &bull; Government Platform &bull; Authorized Access</span>
      </div>
    </div>
  );
}
