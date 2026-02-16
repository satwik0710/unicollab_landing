function ThreeDImageCarousel({
    slides,
    itemCount = 5,
    autoplay = false,
    delay = 3,
    pauseOnHover = true,
    className = '',
}) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const autoplayIntervalRef = React.useRef(null);
    const total = slides.length;

    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const swipeThreshold = 50;

    const getSlideClasses = (index, activeIndex, total, visibleCount) => {
        const diff = index - activeIndex;
        if (diff === 0) return 'now';
        if (diff === 1 || diff === -total + 1) return 'next';
        if (visibleCount === 5 && (diff === 2 || diff === -total + 2)) return 'next2';
        if (diff === -1 || diff === total - 1) return 'prev';
        if (visibleCount === 5 && (diff === -2 || diff === total - 2)) return 'prev2';
        return '';
    };

    const navigate = React.useCallback((direction) => {
        setActiveIndex(current => {
            if (direction === 'next') {
                return (current + 1) % total;
            } else {
                return (current - 1 + total) % total;
            }
        });
    }, [total]);

    const startAutoplay = React.useCallback(() => {
        if (autoplay && total > 1) {
            if (autoplayIntervalRef.current) {
                clearInterval(autoplayIntervalRef.current);
            }
            autoplayIntervalRef.current = window.setInterval(() => {
                navigate('next');
            }, delay * 1000);
        }
    }, [autoplay, delay, navigate, total]);

    const stopAutoplay = React.useCallback(() => {
        if (autoplayIntervalRef.current) {
            clearInterval(autoplayIntervalRef.current);
            autoplayIntervalRef.current = null;
        }
    }, []);

    React.useEffect(() => {
        startAutoplay();
        return () => { stopAutoplay(); };
    }, [startAutoplay, stopAutoplay]);

    // Handler to stop autoplay on hover
    const handleMouseEnter = () => {
        if (autoplay && pauseOnHover) {
            stopAutoplay();
        }
    };

    // Handler to start autoplay on mouse exit AND handle drag cancellation
    const handleExit = (e) => {
        // 1. Autoplay resume logic
        if (autoplay && pauseOnHover) {
            startAutoplay();
        }

        // 2. Drag cancellation logic
        if (isDragging) {
            handleEnd(e.clientX);
        }
    };

    // --- Touch/Mouse Drag Logic ---
    const handleStart = (clientX) => {
        setIsDragging(true);
        setStartX(clientX);
        stopAutoplay();
    };

    const handleEnd = (clientX) => {
        if (!isDragging) return;

        const distance = clientX - startX;

        if (Math.abs(distance) > swipeThreshold) {
            if (distance < 0) {
                navigate('next'); // Swipe left (negative distance) -> show next slide
            } else {
                navigate('prev'); // Swipe right (positive distance) -> show previous slide
            }
        }

        setIsDragging(false);
        setStartX(0);
    };

    const onMouseDown = (e) => handleStart(e.clientX);
    const onMouseUp = (e) => {
        handleEnd(e.clientX);
        startAutoplay(); 
    };

    const onTouchStart = (e) => handleStart(e.touches[0].clientX);
    const onTouchEnd = (e) => {
        handleEnd(e.changedTouches[0].clientX);
        startAutoplay(); 
    };

    return (
        <div
            className={`cascade-slider_container ${className} bg-transparent min-w-full md:min-w-[600px] h-[400px] md:h-[500px]`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleExit}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className="cascade-slider_slides">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`cascade-slider_item ${getSlideClasses(index, activeIndex, total, itemCount)}`}
                        data-slide-number={index}
                    >
                        <div className="relative group cursor-pointer bg-[var(--bg-card)] rounded-[20px] shadow-2xl overflow-hidden h-full">
                            <div className="relative h-48 w-full overflow-hidden">
                                <img src={slide.src} alt={slide.title}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = `https://placehold.co/350x200/4F46E5/ffffff?text=${slide.title}`;
                                    }}
                                />
                                <div className="absolute top-2 right-2 bg-[var(--white)]/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-[var(--primary)] shadow-sm">
                                    {slide.status || 'Active'}
                                </div>
                            </div>
                            
                            <div className="p-5 flex flex-col gap-2">
                                <h3 className="text-[var(--white)] text-lg font-bold truncate">{slide.title}</h3>
                                <div className="text-[var(--text-muted)] text-xs font-medium uppercase tracking-wider">{slide.desc}</div>
                                
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {slide.tags && slide.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-1 bg-[var(--bg-page)] text-[var(--text-muted)] rounded-md border border-[var(--text-muted)]/20">
                                            {tag}
                                        </span>
                                    ))}
                                    {slide.tags && slide.tags.length > 2 && (
                                        <span className="text-[10px] px-2 py-1 bg-[var(--bg-page)] text-[var(--text-muted)] rounded-md border border-[var(--text-muted)]/20">
                                            +{slide.tags.length - 2}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-muted)] border-t border-[var(--text-muted)]/10 pt-3">
                                    <div className="flex items-center gap-1">
                                        <span className="icon-users text-sm"></span>
                                        {slide.members} members
                                    </div>
                                    <div className="group-hover:text-[var(--primary)] transition-colors flex items-center gap-1">
                                        View Details <span className="icon-arrow-right"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {total > 1 && (
                <>
                    <span
                        className="cascade-slider_arrow cascade-slider_arrow-left rounded-full bg-[var(--white)]/10 text-[var(--primary)] p-2 hover:bg-[var(--primary)] hover:text-white transition-colors duration-300 backdrop-blur-sm border border-[var(--text-muted)]/20 shadow-lg"
                        onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                        data-action="prev"
                    >
                        <span className="icon-chevron-left text-2xl"></span>
                    </span>
                    <span
                        className="cascade-slider_arrow cascade-slider_arrow-right rounded-full bg-[var(--white)]/10 text-[var(--primary)] p-2 hover:bg-[var(--primary)] hover:text-white transition-colors duration-300 backdrop-blur-sm border border-[var(--text-muted)]/20 shadow-lg"
                        onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                        data-action="next"
                    >
                        <span className="icon-chevron-right text-2xl"></span>
                    </span>
                </>
            )}
        </div>
    );
}