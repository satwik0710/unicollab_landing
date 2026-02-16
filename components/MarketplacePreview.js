function MarketplacePreview() {
  // Transform MOCK_PROJECTS to fit the Carousel's expected format
  const slides = MOCK_PROJECTS.map(project => ({
    id: project.id,
    src: project.image,
    href: "#", // Placeholder
    title: project.title,
    desc: project.department,
    tags: project.tags,
    members: project.members,
    status: project.status
  }));

  return (
    <section className="py-24 relative overflow-hidden" id="marketplace">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left relative z-10">
        <h2 className="text-3xl font-bold mb-2 text-white">Featured Projects</h2>
        <p className="text-slate-300">Join top-tier student initiatives happening now.</p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-6 mb-12 z-10">
        <ThreeDImageCarousel 
            slides={slides} 
            itemCount={5} 
            autoplay={true} 
            delay={5}
        />
      </div>
      
      {/* View All CTA */}
      <div className="text-center mt-8 relative z-10">
        <button className="btn-ghost border border-white/20 text-slate-300 hover:text-[var(--primary)] hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/10 px-8 py-3 text-base group">
          <span className="flex items-center gap-2">
            View All Projects
            <span className="icon-arrow-right group-hover:translate-x-1 transition-transform"></span>
          </span>
        </button>
      </div>
    </section>
  );
}