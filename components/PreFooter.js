function PreFooter() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 skew-y-3 transform origin-bottom-left scale-110 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 border-b border-white/10 pb-16">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2 border border-white/10">
              <span className="icon-shield-check text-[var(--primary)] text-xl"></span>
            </div>
            <h4 className="font-bold text-lg text-white">University Verified</h4>
            <p className="text-sm text-slate-300">All students verified via .edu email.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2 border border-white/10">
              <span className="icon-zap text-[var(--primary)] text-xl"></span>
            </div>
            <h4 className="font-bold text-lg text-white">Instant Connection</h4>
            <p className="text-sm text-slate-300">Direct messaging without friction.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2 border border-white/10">
              <span className="icon-heart text-[var(--primary)] text-xl"></span>
            </div>
            <h4 className="font-bold text-lg text-white">Trusted Community</h4>
            <p className="text-sm text-slate-300">Safe, inclusive, and professional.</p>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to break the silos?</h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Join thousands of students building the future today. No more notice boards, no more cold emails.
        </p>
        <button className="btn-primary text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform">
          Get Started for Free
        </button>
      </div>
    </section>
  );
}