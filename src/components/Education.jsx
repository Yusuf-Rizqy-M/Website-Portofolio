import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ArrowUpRight } from "lucide-react";
import { educationData } from "../data/portofolioData";

const Education = ({ isDarkMode }) => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, clientX: 0, clientY: 0 });
  const [hoveredImg, setHoveredImg] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], mouse: { x: null, y: null } });

  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y, clientX: e.clientX, clientY: e.clientY });
      stateRef.current.mouse = { x, y };
    }
  }, []);

  const handleMouseLeaveSection = useCallback(() => {
    stateRef.current.mouse = { x: null, y: null };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = 45;
    const initialParticles = [];

    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.2 + 0.8,
      });
    }
    stateRef.current.particles = initialParticles;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { particles, mouse } = stateRef.current;
      
      const nodeColor = isDarkMode ? "rgba(255, 255, 255, " : "rgba(9, 9, 11, ";
      const lineColor = isDarkMode ? "rgba(255, 255, 255, " : "rgba(9, 9, 11, ";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${nodeColor}0.3)`;
        ctx.fill();

        if (mouse.x !== null && mouse.y !== null) {
          const dxMouse = p.x - mouse.x;
          const dyMouse = p.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            const alphaMouse = (1 - distMouse / 150) * 0.25;
            ctx.strokeStyle = `${lineColor}${alphaMouse})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (selectedSchool) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "var(--scrollbar-width, 0px)";
      window.dispatchEvent(
        new CustomEvent("modal-state", { detail: { open: true } }),
      );
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      window.dispatchEvent(
        new CustomEvent("modal-state", { detail: { open: false } }),
      );
      setZoomedImg(null);
      setHoveredImg(null);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.dispatchEvent(
        new CustomEvent("modal-state", { detail: { open: false } }),
      );
    };
  }, [selectedSchool]);

  const POPUP_W = 160;
  const POPUP_H = 100;
  const OFFSET_X = 14;
  const OFFSET_Y = -POPUP_H / 2;

  const popupStyle = (() => {
    if (typeof window === "undefined" || !mousePos.clientX) return {};
    let left = mousePos.clientX + OFFSET_X;
    let top = mousePos.clientY + OFFSET_Y;
    if (left + POPUP_W > window.innerWidth - 16)
      left = mousePos.clientX - POPUP_W - OFFSET_X;
    if (top < 8) top = 8;
    if (top + POPUP_H > window.innerHeight - 8)
      top = window.innerHeight - POPUP_H - 8;
    return { left, top, width: POPUP_W, height: POPUP_H };
  })();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`relative px-4 sm:px-8 md:px-16 py-12 scroll-mt-6 transition-colors duration-500 overflow-hidden w-full  select-none ${isDarkMode ? "bg-[#0a0a0a] text-zinc-200" : "bg-zinc-50 text-zinc-800"}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveSection}
    >
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDarkMode ? "opacity-100" : "opacity-0"}`}>
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="w-full max-w-5xl mx-auto relative z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Education <span className="font-serif italic text-zinc-500">History</span>
          </h2>
        </motion.div>

        <div className="relative pl-10 md:pl-12">
          <div
            className={`absolute left-[18px] top-0 bottom-0 w-[1px] ${
              isDarkMode ? "bg-zinc-800/80" : "bg-zinc-200"
            }`}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="space-y-5"
          >
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                className="relative flex items-center w-full pointer-events-auto"
              >
                <div className="absolute -left-[43px] z-10 flex flex-col items-center pointer-events-none">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium border transition-all duration-300 ${
                      hoveredCard === edu.id
                        ? isDarkMode
                          ? "bg-zinc-900 border-zinc-600 text-white scale-110 shadow-md shadow-violet-500/10"
                          : "bg-zinc-100 border-zinc-400 text-zinc-950 scale-110 shadow-sm"
                        : isDarkMode
                        ? "bg-[#0b0b0b] border-zinc-800 text-zinc-400"
                        : "bg-white border-zinc-200 text-zinc-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>

                <div
                  className={`flex-1 relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-500 border ${
                    isDarkMode
                      ? "bg-[#0c0c0c]/70 backdrop-blur-sm border-zinc-900 hover:border-zinc-700/80 hover:shadow-xl hover:shadow-black/40"
                      : "bg-white/70 backdrop-blur-sm border-zinc-200 hover:border-zinc-300/80 hover:shadow-lg hover:shadow-zinc-200/50"
                  }`}
                  style={{ minHeight: "125px" }}
                  onMouseEnter={() => setHoveredCard(edu.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedSchool(edu)}
                >
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={edu.image}
                      alt={edu.school}
                      className="edu-card-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    
                    <div className={`absolute inset-0 transition-opacity duration-500 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-[#070709]/94 via-[#070709]/85 to-[#070709]/60 group-hover:from-[#070709]/85 group-hover:via-[#070709]/70 group-hover:to-[#070709]/35"
                        : "bg-gradient-to-r from-white/98 via-white/92 to-white/70 group-hover:from-white/90 group-hover:via-white/80 group-hover:to-white/45"
                    }`} />
                    
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-violet-500/10 via-transparent to-transparent"
                        : "bg-gradient-to-br from-violet-400/8 via-transparent to-transparent"
                    }`} />
                  </div>

                  <div
                    className="relative z-10 p-5 flex flex-col justify-between w-full"
                    style={{ minHeight: "125px" }}
                  >
                    <div className="flex items-start justify-between w-full gap-4">
                      <div className="space-y-0.5">
                        <h3
                          className={`text-base md:text-lg font-bold tracking-tight leading-snug transition-colors duration-300 ${
                            isDarkMode
                              ? "text-zinc-200 group-hover:text-white"
                              : "text-zinc-800 group-hover:text-zinc-950"
                          }`}
                        >
                          {edu.school}
                        </h3>
                        <p
                          className={`text-xs md:text-sm font-light tracking-wide transition-colors duration-300 ${
                            isDarkMode 
                              ? "text-zinc-400 group-hover:text-zinc-300" 
                              : "text-zinc-500 group-hover:text-zinc-600"
                          }`}
                        >
                          {edu.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-light tracking-wide transition-all duration-300 ${
                            isDarkMode
                              ? "bg-zinc-900/80 border-zinc-800/60 text-zinc-300 group-hover:border-zinc-700 group-hover:bg-zinc-900"
                              : "bg-zinc-10/10 border-zinc-100 text-zinc-900 group-hover:border-zinc-200 group-hover:bg-zinc-50"
                          }`}
                        >
                          <Calendar size={11} className="opacity-70" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-end justify-between w-full">
                      {edu.details?.[0]?.gallery?.length > 0 ? (
                        <div className="flex gap-2">
                          {edu.details[0].gallery.slice(0, 4).map((img, i) => (
                            <div
                              key={i}
                              className={`w-14 h-10 rounded-md overflow-hidden border flex-shrink-0 transition-all duration-300 ${
                                isDarkMode
                                  ? "border-zinc-800/80 group-hover:border-zinc-600/80 shadow-black/20 group-hover:shadow-md"
                                  : "border-zinc-200 group-hover:border-zinc-300/80 shadow-sm"
                              }`}
                            >
                              <img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          ))}
                          {edu.details[0].gallery.length > 4 && (
                            <div
                              className={`w-14 h-10 rounded-md overflow-hidden border flex-shrink-0 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                                isDarkMode
                                  ? "border-zinc-800 bg-zinc-900/60 text-zinc-400 group-hover:border-zinc-600 group-hover:text-zinc-300"
                                  : "border-zinc-200 bg-zinc-100/60 text-zinc-500 group-hover:border-zinc-300 group-hover:text-zinc-700"
                              }`}
                            >
                              <span className="text-[10px] font-semibold font-mono">
                                +{edu.details[0].gallery.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div />
                      )}

                      <motion.div
                        initial={{ opacity: 0, x: 8, y: 8, scale: 0.8 }}
                        animate={{
                          opacity: hoveredCard === edu.id ? 1 : 0,
                          x: hoveredCard === edu.id ? 0 : 8,
                          y: hoveredCard === edu.id ? 0 : 8,
                          scale: hoveredCard === edu.id ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border backdrop-blur-md flex-shrink-0 transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-zinc-900/70 border-zinc-800/80 text-zinc-200 hover:bg-zinc-800"
                            : "bg-white/80 border-zinc-200/80 text-zinc-800 hover:bg-zinc-100"
                        }`}
                      >
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedSchool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-center items-start p-4 pt-[110px] pb-6 backdrop-blur-[6px] bg-black/40 overflow-hidden"
            style={{ isolation: "isolate" }}
          >
            <div
              className="absolute inset-0"
              onClick={() => setSelectedSchool(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              className={`relative w-full max-w-xl rounded-xl shadow-2xl flex flex-col border backdrop-blur-md ${
                isDarkMode
                  ? "bg-[#0e0e0e]/95 border-zinc-800/80 text-zinc-200"
                  : "bg-white/95 border-zinc-200 text-zinc-800"
              }`}
              style={{ maxHeight: "calc(100vh - 140px)" }}
            >
              <div
                className={`shrink-0 px-6 py-4 flex items-start justify-between border-b ${
                  isDarkMode ? "border-zinc-800/60" : "border-zinc-100"
                }`}
              >
                <div className="space-y-0.5">
                  <h2
                    className={`text-base md:text-lg font-bold tracking-tight ${
                      isDarkMode ? "text-zinc-100" : "text-zinc-900"
                    }`}
                  >
                    {selectedSchool.school}
                  </h2>
                  <div className="flex items-center gap-1.5 text-[11px] font-light">
                    <span
                      className={isDarkMode ? "text-zinc-400" : "text-zinc-500"}
                    >
                      {selectedSchool.subtitle}
                    </span>
                    <span className="opacity-30">•</span>
                    <span
                      className={isDarkMode ? "text-zinc-500" : "text-zinc-400"}
                    >
                      {selectedSchool.period}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSchool(null)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                    isDarkMode
                      ? "bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-500 hover:text-zinc-700"
                  }`}
                >
                  <X size={14} />
                </button>
              </div>

              <div
                className="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar"
                style={{ overscrollBehavior: "contain" }}
              >
                <div className="relative">
                  <div
                    className={`absolute left-[5px] top-2 bottom-2 w-[1px] ${
                      isDarkMode ? "bg-zinc-800/60" : "bg-zinc-200/80"
                    }`}
                  />

                  <div className="space-y-6">
                    {selectedSchool.details.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06, duration: 0.28 }}
                        className="relative pl-6"
                      >
                        <div
                          className={`absolute left-0 top-[6px] w-[11px] h-[11px] rounded-full border z-10 ${
                            isDarkMode
                              ? "bg-[#0e0e0e] border-zinc-600"
                              : "bg-white border-zinc-400"
                          }`}
                        />

                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3
                            className={`font-bold text-sm tracking-tight ${
                              isDarkMode ? "text-zinc-200" : "text-zinc-800"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-light ${
                              isDarkMode
                                ? "bg-zinc-900 text-zinc-500"
                                : "bg-zinc-100 text-zinc-400"
                            }`}
                          >
                            {item.year}
                          </span>
                        </div>

                        <p
                          className={`text-xs font-light leading-relaxed mb-3 ${
                            isDarkMode ? "text-zinc-400" : "text-zinc-600"
                          }`}
                        >
                          {item.desc}
                        </p>

                        {item.gallery && item.gallery.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {item.gallery.map((img, i) => {
                              const imgKey = `${index}-${i}`;
                              const isHovered = hoveredImg === imgKey;
                              return (
                                <div
                                  key={i}
                                  className={`relative aspect-video rounded-xl overflow-hidden border cursor-pointer transition-all duration-200 ${
                                    isDarkMode
                                      ? `bg-zinc-900/40 ${isHovered ? "border-zinc-500 shadow-md shadow-black/50" : "border-zinc-800/80"}`
                                      : `bg-zinc-50 ${isHovered ? "border-zinc-400 shadow-sm" : "border-zinc-200/60"}`
                                  }`}
                                  onMouseEnter={() => {
                                    setHoveredImg(imgKey);
                                    setZoomedImg(img);
                                  }}
                                  onMouseLeave={() => {
                                    setHoveredImg(null);
                                    setZoomedImg(null);
                                  }}
                                  onClick={() => window.open(img, "_blank")}
                                >
                                  <img
                                    src={img}
                                    alt=""
                                    className={`w-full h-full object-cover transition-transform duration-300 ${
                                      isHovered ? "scale-105" : "scale-100"
                                    }`}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {zoomedImg && (
          <motion.div
            key={zoomedImg}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className={`fixed z-[200] pointer-events-none rounded-xl overflow-hidden shadow-xl border ${
              isDarkMode
                ? "border-zinc-700/80 bg-zinc-900"
                : "border-zinc-300 bg-white"
            }`}
            style={popupStyle}
          >
            <img
              src={zoomedImg}
              alt="preview"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Education;