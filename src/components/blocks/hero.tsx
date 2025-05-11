"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ChevronDown, Shield } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface NebulaAnimationProps {
  intensity?: "subtle" | "medium" | "intense";
  speed?: "slow" | "normal" | "fast";
  palette?: "cosmic" | "neon" | "inferno" | "toxic";
  interactive?: boolean;
}

function InteractiveNebulaAnimation({
  intensity = "medium",
  speed = "normal",
  palette = "cosmic",
  interactive = true,
}: NebulaAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Adjust particle count based on screen size for better performance
  const getParticleCount = (baseCount: number) => {
    if (windowSize.width < 768) return Math.floor(baseCount * 0.5);
    if (windowSize.width < 1024) return Math.floor(baseCount * 0.7);
    return baseCount;
  };

  const intensityMap = {
    subtle: { opacity: 0.4, count: getParticleCount(5), scale: 0.9 },
    medium: { opacity: 0.6, count: getParticleCount(8), scale: 1 },
    intense: { opacity: 0.8, count: getParticleCount(12), scale: 1.2 },
  };

  const speedMap = {
    slow: 1.5,
    normal: 1,
    fast: 0.6,
  };

  const paletteMap = {
    cosmic: [
      "bg-purple-600 dark:bg-purple-500",
      "bg-blue-500 dark:bg-blue-400",
      "bg-fuchsia-500 dark:bg-fuchsia-400",
      "bg-indigo-400 dark:bg-indigo-300",
    ],
    neon: [
      "bg-green-400 dark:bg-green-300",
      "bg-yellow-400 dark:bg-yellow-300",
      "bg-pink-500 dark:bg-pink-400",
      "bg-blue-400 dark:bg-blue-300",
    ],
    inferno: [
      "bg-red-600 dark:bg-red-500",
      "bg-orange-500 dark:bg-orange-400",
      "bg-yellow-400 dark:bg-yellow-300",
      "bg-red-400 dark:bg-red-300",
    ],
    toxic: [
      "bg-lime-400 dark:bg-lime-300",
      "bg-emerald-500 dark:bg-emerald-400",
      "bg-teal-400 dark:bg-teal-300",
      "bg-yellow-300 dark:bg-yellow-200",
    ],
  };

  const config = intensityMap[intensity] || intensityMap.medium;
  const durationMultiplier = speedMap[speed] || speedMap.normal;
  const colors = paletteMap[palette] || paletteMap.cosmic;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [interactive]);

  // Create particles with staggered rendering for better performance
  const particles = Array.from({ length: config.count }).map((_, i) => (
    <InteractiveParticle
      key={i}
      color={colors[i % colors.length]}
      opacity={config.opacity}
      size={200 + (i % 4) * 120 * config.scale}
      duration={6 * durationMultiplier * (0.8 + Math.random() * 0.4)}
      delay={i * (durationMultiplier / 3)}
      mousePosition={mousePosition}
      isHovering={isHovering}
      interactive={interactive}
      influenceFactor={0.3 + (i % 3) * 0.2}
    />
  ));

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-gradient-to-tl from-green-400 via-blue-500 to-purple-800/60 dark:from-green-900 dark:via-blue-900 dark:to-purple-900/80"
    >
      <div className="absolute inset-0">
        <svg className="absolute w-full h-full">
          <defs>
            <filter
              id="nebula-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="20"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 30 -10"
                result="glow"
              />
              <feBlend in="SourceGraphic" in2="glow" mode="screen" />
            </filter>
          </defs>
        </svg>

        <div className="absolute inset-0">
          {particles}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-black/80 dark:via-black/60 dark:to-black/80" />

          {/* Star field overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-transparent">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-px bg-white rounded-full animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive particle that responds to mouse movement
interface ParticleProps {
  color: string;
  opacity: number;
  size: number;
  duration: number;
  delay: number;
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  interactive: boolean;
  influenceFactor: number;
}

const InteractiveParticle: React.FC<ParticleProps> = ({
  color,
  opacity,
  size,
  duration,
  delay,
  mousePosition,
  isHovering,
  interactive,
  influenceFactor,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [basePosition, setBasePosition] = useState({
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
  });
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isAnimating || !particleRef.current) return;

    const animateParticle = () => {
      const x = Math.random() * 100 - 50;
      const y = Math.random() * 100 - 50;
      const rotation = Math.random() * 360;
      const scale = 0.8 + Math.random() * 0.4;
      setBasePosition({ x, y, rotation, scale });
    };

    animateParticle();
    const intervalId = setInterval(animateParticle, duration * 1000);

    return () => clearInterval(intervalId);
  }, [isAnimating, duration]);

  const getTransform = () => {
    if (!interactive || !isHovering) {
      return `translate(${basePosition.x}%, ${basePosition.y}%) rotate(${basePosition.rotation}deg) scale(${basePosition.scale})`;
    }

    const mouseInfluenceX = (mousePosition.x - 0.5) * 200 * influenceFactor;
    const mouseInfluenceY = (mousePosition.y - 0.5) * 200 * influenceFactor;

    const finalX = basePosition.x + mouseInfluenceX;
    const finalY = basePosition.y + mouseInfluenceY;
    const interactiveScale = basePosition.scale * 1.1;

    return `translate(${finalX}%, ${finalY}%) rotate(${basePosition.rotation}deg) scale(${interactiveScale})`;
  };

  const baseStyles: React.CSSProperties = {
    position: "absolute",
    width: `${size}px`,
    height: `${size}px`,
    opacity: opacity,
    filter: `url(#nebula-glow) brightness(${
      isHovering && interactive ? 1.2 : 1.1
    }) contrast(1.1)`,
    borderRadius: "50%",
    mixBlendMode: "screen",
    boxShadow: `0 0 ${
      isHovering && interactive ? "60px" : "40px"
    } rgba(255, 255, 255, 0.2)`,
    transform: getTransform(),
    transition: `transform ${
      isHovering && interactive ? "0.3s" : duration + "s"
    } cubic-bezier(0.4, 0.1, 0.3, 1), filter 0.3s ease, box-shadow 0.3s ease`,
    willChange: "transform, filter, box-shadow", // Performance hint
  };

  return (
    <div
      ref={particleRef}
      className={`absolute top-1/2 left-1/2 ${color}`}
      style={baseStyles}
    />
  );
};

interface OnePolicyHeroProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  features?: string[];
}

const OnePolicyHero: React.FC<OnePolicyHeroProps> = ({
  title = "Generate Legal Pages for Your Website in Seconds",
  subtitle = "Privacy Policy, Terms & Conditions, Cookie Policy — all in one place.",
  primaryButtonText = "Get Started Free",
  secondaryButtonText = "Try Demo",
  features = [
    "No signup required",
    "PDF export",
    "100% Free",
    "GDPR Compliant",
  ],
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {isClient && (
        <InteractiveNebulaAnimation
          intensity="medium"
          speed="slow"
          palette="cosmic"
          interactive={true}
        />
      )}

      <div className="relative z-10 w-full h-[calc(100vh-76px)] flex flex-col items-center justify-center px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl w-full text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-md px-4 py-2 rounded-full text-white">
            <Shield size={16} className="text-blue-300" />
            <span>Legal compliance made simple</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 h-14 px-8 text-lg rounded-full shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 transition-all duration-300"
            >
              {primaryButtonText}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 h-14 px-8 text-lg rounded-full"
            >
              {secondaryButtonText}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-center text-gray-200"
              >
                <Check size={18} className="mr-1.5 text-green-400" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-10 h-14 border-2 border-white/30 rounded-full flex justify-center mb-2">
            <motion.div
              className="w-1.5 h-3 bg-white rounded-full mt-3"
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
          <span className="text-white/70 text-sm font-medium flex items-center gap-1">
            Scroll Down <ChevronDown size={14} />
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default OnePolicyHero;
