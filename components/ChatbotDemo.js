function ChatbotDemo() {
  const [messages, setMessages] = React.useState(MOCK_CHAT_HISTORY);
  const [inputValue, setInputValue] = React.useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg = { role: 'user', content: inputValue };
    setMessages([...messages, newUserMsg]);
    setInputValue("");

    // Simulate AI typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "That's an interesting question. Based on the documentation, you should consider implementing a custom hook for that specific logic." }]);
    }, 1000);
  };

  // Safe access to Motion
  const Motion = window.Motion;
  const MotionDiv = Motion ? Motion.motion.div : 'div';
  const animationProps = Motion ? {
    initial: { opacity: 0, x: 200, scale: 0.8 },
    whileInView: { opacity: 1, x: 0, scale: 1 },
    const MotionH2 = Motion ? Motion.motion.h2 : 'h2';
    const MotionP = Motion ? Motion.motion.p : 'p';
    const MotionUl = Motion ? Motion.motion.ul : 'ul';
    const MotionLi = Motion ? Motion.motion.li : 'li';
    const MotionButton = Motion ? Motion.motion.button : 'button';

    const containerVariants = Motion ? {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    } : {};

    const itemVariants = Motion ? {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    } : {};

    const chatBoxVariants = Motion ? {
      hidden: { opacity: 0, x: 200, scale: 0.8 },
      visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
    } : {};

    return(
    <section className = "py-24" id = "ai-guide" >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left Content - Animated Text */}
            <MotionDiv
              className="w-full lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }} // Changed once: false
              variants={containerVariants}
            >
              <MotionDiv variants={itemVariants} className="inline-block px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6 border border-[var(--primary)]/20">
                24/7 Technical Support
              </MotionDiv>
              <MotionH2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Your always-on <br />
                <span className="text-[var(--primary)]">Technical Mentor.</span>
              </MotionH2>
              <MotionP variants={itemVariants} className="text-lg text-slate-300 mb-8 leading-relaxed">
                Stuck on a bug at 2 AM? The AI Project Guide understands your project context, stack, and goals. It offers code snippets, architectural advice, and resource recommendations instantly.
              </MotionP>

              <MotionUl variants={itemVariants} className="space-y-4 mb-8">
                {[
                  "Context-aware code suggestions",
                  "Debug assistance for specific errors",
                  "Resource library tailored to your stack",
                  "Project timeline estimation"
                ].map((item, i) => (
                  <MotionLi key={i} variants={itemVariants} className="flex items-center gap-3 text-slate-200">
                    <span className="icon-check text-[var(--primary)]"></span>
                    {item}
                  </MotionLi>
                ))}
              </MotionUl>

              <MotionButton variants={itemVariants} className="btn-primary">
                Try the Demo
              </MotionButton>
            </MotionDiv>

            {/* Right Content: Chat Interface - Extreme Fly-in */}
            <div className="w-full lg:w-1/2 perspective-1000"> {/* Added perspective if needed, though simple 2d transform works */}
              <MotionDiv
                className="glass-panel rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }} // Changed once: false
                variants={chatBoxVariants}
              >
                {/* Header */}
                <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-xs text-slate-400 font-mono">AI Project Guide — v2.4.0</div>
                </div>

                {/* Chat Area */}
                <div className="h-[400px] p-6 overflow-y-auto bg-transparent flex flex-col gap-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${msg.role === 'user'
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-white/10 text-slate-200 border border-white/10'
                        }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a technical question..."
                    className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--primary)] placeholder-slate-500"
                  />
                  <button type="submit" className="p-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg text-white transition-colors">
                    <span className="icon-send"></span>
                  </button>
                </form>
              </MotionDiv>
            </div>

          </div>
        </div>
    </section >
  );
}