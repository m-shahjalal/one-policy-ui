"use client";

const colorMapping = {
  cosmic: [
    { border: "rgba(147, 51, 234, 0.8)", bg: "rgba(147, 51, 234, 0.3)" },
    { border: "rgba(59, 130, 246, 0.8)", bg: "rgba(59, 130, 246, 0.3)" },
    { border: "rgba(217, 70, 239, 0.8)", bg: "rgba(217, 70, 239, 0.3)" },
    { border: "rgba(129, 140, 248, 0.8)", bg: "rgba(129, 140, 248, 0.3)" },
  ],
  neon: [
    { border: "rgba(74, 222, 128, 0.8)", bg: "rgba(74, 222, 128, 0.3)" },
    { border: "rgba(250, 204, 21, 0.8)", bg: "rgba(250, 204, 21, 0.3)" },
    { border: "rgba(236, 72, 153, 0.8)", bg: "rgba(236, 72, 153, 0.3)" },
    { border: "rgba(96, 165, 250, 0.8)", bg: "rgba(96, 165, 250, 0.3)" },
  ],
  inferno: [
    { border: "rgba(220, 38, 38, 0.8)", bg: "rgba(220, 38, 38, 0.3)" },
    { border: "rgba(249, 115, 22, 0.8)", bg: "rgba(249, 115, 22, 0.3)" },
    { border: "rgba(250, 204, 21, 0.8)", bg: "rgba(250, 204, 21, 0.3)" },
    { border: "rgba(248, 113, 113, 0.8)", bg: "rgba(248, 113, 113, 0.3)" },
  ],
  toxic: [
    { border: "rgba(163, 230, 53, 0.8)", bg: "rgba(163, 230, 53, 0.3)" },
    { border: "rgba(16, 185, 129, 0.8)", bg: "rgba(16, 185, 129, 0.3)" },
    { border: "rgba(45, 212, 191, 0.8)", bg: "rgba(45, 212, 191, 0.3)" },
    { border: "rgba(253, 224, 71, 0.8)", bg: "rgba(253, 224, 71, 0.3)" },
  ],
};

const ThemeableFullPageLoader = ({
  palette = "cosmic",
}: {
  palette?: "cosmic" | "neon" | "inferno" | "toxic";
}) => {
  const themeColors = colorMapping[palette] || colorMapping.cosmic;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div
        className="absolute inset-0 wired-gradient"
        style={{ backdropFilter: "blur(12px)" }}
      ></div>
      <div className="absolute inset-0 grid-overlay"></div>
      <div className="flex flex-col items-center gap-8 relative z-10">
        <div className="cube-container">
          <div className="cube">
            <div
              className="cube-face cube-face-front"
              style={{
                borderColor: themeColors[0].border,
                background: `linear-gradient(45deg, ${themeColors[0].bg}, ${themeColors[0].border})`,
              }}
            ></div>
            <div
              className="cube-face cube-face-back"
              style={{
                borderColor: themeColors[1].border,
                background: `linear-gradient(45deg, ${themeColors[1].bg}, ${themeColors[1].border})`,
              }}
            ></div>
            <div
              className="cube-face cube-face-right"
              style={{
                borderColor: themeColors[2].border,
                background: `linear-gradient(45deg, ${themeColors[2].bg}, ${themeColors[2].border})`,
              }}
            ></div>
            <div
              className="cube-face cube-face-left"
              style={{
                borderColor: themeColors[3].border,
                background: `linear-gradient(45deg, ${themeColors[3].bg}, ${themeColors[3].border})`,
              }}
            ></div>
            <div
              className="cube-face cube-face-top"
              style={{
                borderColor: themeColors[0].border,
                background: `linear-gradient(45deg, ${themeColors[0].bg}, ${themeColors[0].border})`,
              }}
            ></div>
            <div
              className="cube-face cube-face-bottom"
              style={{
                borderColor: themeColors[1].border,
                background: `linear-gradient(45deg, ${themeColors[1].bg}, ${themeColors[1].border})`,
              }}
            ></div>
          </div>
        </div>
        <div className="text-white text-2xl font-light tracking-wider relative">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
      <style jsx>{`
        .cube-container {
          perspective: 800px;
        }

        .cube {
          width: 80px;
          height: 80px;
          transform-style: preserve-3d;
          animation: rotate 3s infinite ease-in-out;
          position: relative;
        }

        @keyframes rotate {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: rotateX(90deg) rotateY(90deg);
          }
          50% {
            transform: rotateX(180deg) rotateY(180deg);
          }
          75% {
            transform: rotateX(270deg) rotateY(270deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }

        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid;
          border-radius: 4px;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .cube-face-front {
          transform: translateZ(40px);
        }

        .cube-face-back {
          transform: translateZ(-40px) rotateY(180deg);
        }

        .cube-face-right {
          transform: translateX(40px) rotateY(90deg);
        }

        .cube-face-left {
          transform: translateX(-40px) rotateY(-90deg);
        }

        .cube-face-top {
          transform: translateY(-40px) rotateX(90deg);
        }

        .cube-face-bottom {
          transform: translateY(40px) rotateX(-90deg);
        }

        .dot {
          opacity: 0;
          animation: dots 1.5s infinite ease-in-out;
          display: inline-block;
        }

        .dot:nth-child(1) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(2) {
          animation-delay: 0.4s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes dots {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .wired-gradient {
          background: linear-gradient(
            125deg,
            ${themeColors[0].bg},
            ${themeColors[1].bg},
            ${themeColors[2].bg},
            ${themeColors[3].bg}
          );
          background-size: 400% 400%;
          animation: gradientWire 15s ease infinite;
          opacity: 0.7;
        }

        .grid-overlay {
          background-image: linear-gradient(
              to right,
              ${themeColors[0].border}22 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              ${themeColors[1].border}22 1px,
              transparent 1px
            );
          background-size: 50px 50px;
          mask-image: radial-gradient(
            circle at 50% 50%,
            black 0%,
            transparent 90%
          );
          opacity: 0.5;
        }

        @keyframes gradientWire {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

// Demo component to show all themed loaders
const FullPageLoader = () => {
  // Using a static theme since theme selector is hidden
  const selectedTheme: keyof typeof colorMapping = "cosmic";

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <ThemeableFullPageLoader palette={selectedTheme} />
    </div>
  );
};

export default FullPageLoader;
