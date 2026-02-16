const { useEffect, useRef, useState } = React;

const MODULES = [
  {
    title: "Digital Passport",
    description: "Your skills and portfolio identity beyond GPA. Showcase your verified projects and stack.",
    icon: "icon-id-card",
    iconColor: "text-[var(--primary)]",
    blobClass: "top-0 right-0 w-64 h-64 bg-[var(--primary)]/20 blur-[80px] -translate-y-1/2 translate-x-1/2",
    tags: [
      { text: "Github Verified" },
      { text: "3 Projects" }
    ]
  },
  {
    title: "Smart Discovery",
    description: "Filter by dept, year, or skill in <30s. Find the perfect match for your next hackathon or semester project.",
    icon: "icon-search",
    iconColor: "text-[var(--accent)]",
    blobClass: "bottom-0 left-0 w-32 h-32 bg-[var(--accent)]/20 blur-[40px] translate-y-1/2 -translate-x-1/2"
  },
  {
    title: "Collaboration Engine",
    description: "Streamlined application tracking, role assignment, and automated notifications to keep teams aligned.",
    icon: "icon-users",
    iconColor: "text-purple-300",
    blobClass: "top-0 left-0 w-32 h-32 bg-purple-500/20 blur-[40px] -translate-y-1/2 -translate-x-1/2"
  },
  {
    title: "AI Project Guide",
    description: "The intelligent mentor for technical roadblocks. 24/7 support for debugging and architectural decisions.",
    icon: "icon-bot",
    iconColor: "text-[var(--primary)]",
    blobClass: "bottom-0 right-0 w-32 h-32 bg-[var(--primary)]/20 blur-[40px] translate-y-1/2 translate-x-1/2"
  },
  {
    title: "Admin Analytics",
    description: "Real-time data for university leads on campus trends, project success rates, and interdisciplinary collaboration.",
    icon: "icon-chart-bar",
    iconColor: "text-[var(--accent)]",
    blobClass: "top-1/2 left-1/2 w-48 h-48 bg-[var(--accent)]/20 blur-[60px] -translate-x-1/2 -translate-y-1/2"
  }
];

// Skiper16 StickyCard_001 implementation
const StickyCard = ({ i, title, description, icon, iconColor, blobClass, tags, progress, range, targetScale }) => {
  const container = useRef(null);
  const Motion = window.Motion;

  if (!Motion) return null;

  const { motion, useTransform } = Motion;
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center h-screen">
      <motion.div
        style={{
          scale,
          // Exact Skiper16 offset calculation: top: calc(-5vh + ${i * 20 + 250}px)
          // Adjusting slightly because our header is large, so 250px feels about right to start
          top: `calc(-5vh + ${i * 25 + 100}px)`,
        }}
        // Using "rounded-4xl" from snippet (might need tailwind config, defaulting to rounded-3xl if not)
        className="relative -top-1/4 flex flex-col w-[90vw] max-w-4xl h-[500px] origin-top rounded-3xl overflow-hidden backdrop-blur-md bg-slate-900/80 border border-white/10 shadow-2xl"
      >
        <div className={`absolute rounded-full transition-all ${blobClass} group-hover:scale-110`}></div>
        <div className="relative z-10 h-full flex flex-col p-10 md:p-14">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/20">
            <span className={`${icon} text-3xl ${iconColor}`}></span>
          </div>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white">{title}</h3>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed">
            {description}
          </p>
          {tags && (
            <div className="flex flex-wrap gap-3 mt-auto pt-8">
              {tags.map((tag, idx) => (
                <span key={idx} className="text-sm font-medium px-4 py-2 rounded-full bg-black/40 text-slate-200 border border-white/10 backdrop-blur-sm">
                  {tag.text}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

function CoreModules() {
  const container = useRef(null);
  const Motion = window.Motion;
  const useScroll = Motion ? Motion.useScroll : () => ({ scrollYProgress: { get: () => 0 } });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (window.Lenis) {
      // Initialize Lenis with snappier settings to reduce perceived latency
      // Initialize Lenis with smoother settings
      const lenis = new window.Lenis({
        duration: 2.0, // Increased for smoother, more fluid scrolling
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Keep exponential easing but longer duration
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      return () => lenis.destroy();
    }
  }, []);

  if (!Motion) {
    return (
      <section className="py-24 text-center text-white">
        <p>Loading animations...</p>
      </section>
    );
  }

  return (
    <section id="modules" className="relative bg-transparent">
      <div className="md:pt-32 pb-16 text-center z-10 relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">The Core 5 Modules</h2>
        <p className="text-slate-300 max-w-2xl mx-auto px-6">
          Everything you need to navigate the university ecosystem.
          Scroll down to explore the stack.
        </p>
      </div>

      <main ref={container} className="relative flex w-full flex-col items-center justify-center pb-[50vh]">
        {MODULES.map((module, i) => {
          // Exact Skiper16 scale math: Math.max(0.5, 1 - (projects.length - i - 1) * 0.1)
          const targetScale = Math.max(0.5, 1 - (MODULES.length - i - 1) * 0.1);

          return (
            <StickyCard
              key={i}
              i={i}
              {...module}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </section>
  );
}