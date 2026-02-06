import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: Branding */}
      <div className="flex-1 bg-foreground text-background relative overflow-hidden flex flex-col p-12 lg:p-24 justify-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grad)" />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 font-display tracking-tight leading-tight">
              Campus <br />
              <span className="text-primary">Nexus</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 font-light mb-8 leading-relaxed">
              Your digital campus companion. Connect, learn, and thrive with everything you need in one place.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Daily Pulse
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Student Exchange
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Explorer
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Academic Cockpit
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Login */}
      <div className="flex-1 bg-background flex flex-col justify-center p-12 lg:p-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-md w-full mx-auto space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground font-display">Welcome Back</h2>
            <p className="mt-2 text-muted-foreground">Sign in to access your campus dashboard</p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-xl border border-border/50">
            <Button 
              onClick={handleLogin}
              size="lg" 
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]"
            >
              Sign in with Replit
            </Button>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
