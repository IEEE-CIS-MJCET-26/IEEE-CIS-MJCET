import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Eye, ArrowLeft, X } from "lucide-react";
import jeopardyData from "../../data/jeopardyData";
import PageSEO from "../PageSEO";
import jeopardyLogo from "../../assets/jeopardy.png";

/* ─── tile colours — dark maroon glassmorphism with gold borders ─── */
const tierColors = {
  100: { bg: "from-[#2a0a0a] to-[#1a0505]", border: "border-[#d4af37]/25", glow: "rgba(212,175,55,0.10)" },
  200: { bg: "from-[#2e0c08] to-[#1c0604]", border: "border-[#d4af37]/30", glow: "rgba(212,175,55,0.12)" },
  300: { bg: "from-[#320e06] to-[#1e0803]", border: "border-[#d4af37]/35", glow: "rgba(212,175,55,0.14)" },
  400: { bg: "from-[#361008] to-[#200a04]", border: "border-[#d4af37]/40", glow: "rgba(212,175,55,0.16)" },
  500: { bg: "from-[#3a1210] to-[#220c06]", border: "border-[#d4af37]/50", glow: "rgba(212,175,55,0.20)" },
};

/* ─── category accent colours — Bollywood rich tints ─── */
const categoryColors = [
  { bg: "from-[#8b1a3a] to-[#5c1128]", text: "text-[#f5e6c8]" },  // Romance — deep rose
  { bg: "from-[#8b5e2f] to-[#5c3a18]", text: "text-[#f5e6c8]" },  // Drama — burnt orange
  { bg: "from-[#2d5a27] to-[#1a3a16]", text: "text-[#f5e6c8]" },  // Comedy — green
  { bg: "from-[#8b2020] to-[#5c1414]", text: "text-[#f5e6c8]" },  // Action — dark red
  { bg: "from-[#4a1a6b] to-[#2e1042]", text: "text-[#f5e6c8]" },  // Horror — dark purple
  { bg: "from-[#1a3a6b] to-[#102642]", text: "text-[#f5e6c8]" },  // Superhero — deep blue
];

/* ─── gold gradient style (reusable inline) ─── */
const goldTextStyle = {
  background: "linear-gradient(45deg, #f5e6c8, #d4af37, #f5e6c8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  filter: "drop-shadow(0 0 6px rgba(212,175,55,0.3))",
};

const goldTextStyleSubtle = {
  background: "linear-gradient(45deg, #f5e6c8, #d4af37, #f5e6c8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function Jeopardy() {
  const [board, setBoard] = useState(() =>
    jeopardyData.map((cat) => ({
      ...cat,
      questions: cat.questions.map((q) => ({ ...q })),
    }))
  );
  const [selected, setSelected] = useState(null); // { catIdx, qIdx }
  const [showAnswer, setShowAnswer] = useState(false);

  /* count of used tiles for progress indicator */
  const totalUsed = board.reduce(
    (acc, cat) => acc + cat.questions.filter((q) => q.used).length,
    0
  );
  const totalQuestions = board.reduce((a, c) => a + c.questions.length, 0);

  /* ── handlers ── */
  const openQuestion = useCallback((catIdx, qIdx) => {
    setSelected({ catIdx, qIdx });
    setShowAnswer(false);
  }, []);

  const closeQuestion = useCallback(() => {
    if (selected) {
      setBoard((prev) => {
        const copy = prev.map((cat) => ({
          ...cat,
          questions: cat.questions.map((q) => ({ ...q })),
        }));
        copy[selected.catIdx].questions[selected.qIdx].used = true;
        return copy;
      });
    }
    setSelected(null);
    setShowAnswer(false);
  }, [selected]);

  const resetBoard = useCallback(() => {
    setBoard(
      jeopardyData.map((cat) => ({
        ...cat,
        questions: cat.questions.map((q) => ({ ...q, used: false })),
      }))
    );
    setSelected(null);
    setShowAnswer(false);
  }, []);

  const activeQ =
    selected !== null
      ? board[selected.catIdx].questions[selected.qIdx]
      : null;

  const activeCat =
    selected !== null ? board[selected.catIdx].category : "";

  return (
    <>
      <PageSEO title="Jeopardy | IEEE CIS MJCET" />

      <div className="min-h-screen w-full text-white relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #1a0000 0%, #3b0000 30%, #2a0000 60%, #0a0000 100%)" }}
      >
        {/* ── Decorative background — cinematic red ── */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Dot grid with warm tint */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.04) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Central spotlight */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full blur-[150px]"
            style={{ background: "radial-gradient(circle, rgba(90,0,0,0.5) 0%, transparent 70%)" }}
          />
          {/* Bottom warm glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
          />
          {/* Vignette overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)" }}
          />
          {/* Subtle film grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* ── Logo ── */}
        <div className="relative z-10 flex justify-center pt-4 sm:pt-6">
          <motion.img
            src={jeopardyLogo}
            alt="Jeopardy"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-16 sm:h-32 lg:h-40 w-auto object-contain"
            style={{ filter: "drop-shadow(0 4px 20px rgba(212,175,55,0.3))" }}
          />
        </div>

        {/* ── Header ── */}
        <header className="relative z-10 pt-2 pb-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[#f5e6c8]/40 text-xs sm:text-sm font-inter mt-1 tracking-wide"
              >
                {totalUsed} / {totalQuestions} questions played
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetBoard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl
                         border border-[#d4af37]/30 bg-[#1a0000]/60 backdrop-blur-sm
                         text-[#f5e6c8]/70 hover:text-[#d4af37] hover:border-[#d4af37]/60
                         hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]
                         transition-all duration-300 text-sm font-inter"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Reset Board</span>
            </motion.button>
          </div>
        </header>

        {/* ── Board Grid ── */}
        <main className="relative z-10 px-3 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-[1400px] mx-auto">
            {/* Desktop / Tablet Grid */}
            <div className="hidden sm:grid grid-cols-6 gap-2 lg:gap-3">
              {/* Category Headers */}
              {board.map((cat, catIdx) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIdx * 0.08, duration: 0.5 }}
                  className="relative rounded-xl overflow-hidden p-3 lg:p-4 text-center"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${categoryColors[catIdx].bg}`}
                  />
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                  <div className="absolute inset-[1px] rounded-xl border border-[#d4af37]/20" />
                  <h2
                    className={`relative font-sairaStencil text-xs lg:text-sm xl:text-base tracking-widest uppercase ${categoryColors[catIdx].text}`}
                    style={{ filter: "drop-shadow(0 0 4px rgba(212,175,55,0.2))" }}
                  >
                    {cat.category}
                  </h2>
                </motion.div>
              ))}

              {/* Question Tiles — row by row */}
              {[0, 1, 2, 3, 4].map((qIdx) =>
                board.map((cat, catIdx) => {
                  const q = cat.questions[qIdx];
                  const colors = tierColors[q.points];
                  return (
                    <Tile
                      key={`${catIdx}-${qIdx}`}
                      question={q}
                      colors={colors}
                      catIdx={catIdx}
                      qIdx={qIdx}
                      onOpen={openQuestion}
                    />
                  );
                })
              )}
            </div>

            {/* Mobile Layout — horizontal scroll per category */}
            <div className="sm:hidden space-y-4">
              {board.map((cat, catIdx) => (
                <div key={cat.category}>
                  <motion.h2
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: catIdx * 0.1 }}
                    className="font-sairaStencil text-sm tracking-widest mb-2 uppercase"
                    style={goldTextStyleSubtle}
                  >
                    {cat.category}
                  </motion.h2>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {cat.questions.map((q, qIdx) => {
                      const colors = tierColors[q.points];
                      return (
                        <MobileTile
                          key={`${catIdx}-${qIdx}`}
                          question={q}
                          colors={colors}
                          catIdx={catIdx}
                          qIdx={qIdx}
                          onOpen={openQuestion}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* ── Question Modal ── */}
        <AnimatePresence>
          {selected !== null && activeQ && (
            <motion.div
              key="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 backdrop-blur-md"
                style={{ background: "rgba(10,0,0,0.88)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative z-10 w-full h-full sm:w-[90%] sm:h-auto sm:max-w-2xl
                           flex flex-col items-center justify-center
                           p-6 sm:p-10 sm:rounded-2xl
                           border-0 sm:border sm:border-[#d4af37]/20"
                style={{
                  background: "linear-gradient(180deg, rgba(42,10,10,0.97) 0%, rgba(10,0,0,0.98) 100%)",
                  boxShadow: "0 0 60px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.1)",
                }}
              >
                {/* Close X */}
                <button
                  onClick={closeQuestion}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6
                             text-[#f5e6c8]/30 hover:text-[#d4af37] transition-colors"
                  aria-label="Close"
                >
                  <X size={28} />
                </button>

                {/* Category + Points badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <span className="text-[#f5e6c8]/40 font-inter text-sm tracking-wider uppercase">
                    {activeCat}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full border border-[#d4af37]/40 font-sairaStencil text-sm"
                    style={{
                      ...goldTextStyleSubtle,
                      background: "linear-gradient(45deg, rgba(212,175,55,0.1), rgba(245,230,200,0.05))",
                      WebkitBackgroundClip: "unset",
                      WebkitTextFillColor: "#d4af37",
                      backgroundClip: "unset",
                    }}
                  >
                    {activeQ.points}
                  </span>
                </motion.div>

                {/* Question */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-[#f5e6c8] text-xl sm:text-2xl lg:text-3xl font-inter font-semibold
                             text-center leading-relaxed max-w-xl mb-10"
                >
                  {activeQ.question}
                </motion.p>

                {/* Answer reveal */}
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="mb-10 overflow-hidden"
                    >
                      <div
                        className="px-6 py-4 rounded-xl border border-[#d4af37]/25"
                        style={{ background: "rgba(212,175,55,0.08)" }}
                      >
                        <p
                          className="font-inter text-lg sm:text-xl text-center font-medium"
                          style={{ color: "#d4af37" }}
                        >
                          {activeQ.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  {!showAnswer && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowAnswer(true)}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto
                                 px-8 py-3.5 rounded-xl
                                 font-semibold font-inter
                                 transition-all duration-200"
                      style={{
                        background: "linear-gradient(135deg, #d4af37, #b8962e)",
                        color: "#1a0000",
                        boxShadow: "0 0 20px rgba(212,175,55,0.25)",
                      }}
                    >
                      <Eye size={18} />
                      Show Answer
                    </motion.button>
                  )}

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={closeQuestion}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto
                               px-8 py-3.5 rounded-xl
                               border border-[#d4af37]/30 bg-[#1a0000]/60
                               text-[#f5e6c8]/70 hover:text-[#d4af37] hover:border-[#d4af37]/60
                               hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]
                               font-inter transition-all duration-200"
                  >
                    <ArrowLeft size={18} />
                    Back to Board
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Round Complete Overlay ── */}
        <AnimatePresence>
          {totalUsed === totalQuestions && selected === null && (
            <motion.div
              key="round-complete-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 backdrop-blur-lg"
                style={{ background: "linear-gradient(180deg, rgba(26,0,0,0.95) 0%, rgba(10,0,0,0.97) 100%)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 22, stiffness: 260, delay: 0.1 }}
                className="relative z-10 flex flex-col items-center text-center px-6"
              >
                {/* Decorative glow behind text */}
                <div
                  className="absolute w-[500px] h-[300px] rounded-full blur-[100px] pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
                />

                <h2
                  className="relative font-sairaStencil text-4xl sm:text-5xl lg:text-7xl tracking-widest uppercase mb-4"
                  style={{
                    ...goldTextStyle,
                    filter: "drop-shadow(0 0 20px rgba(212,175,55,0.4))",
                  }}
                >
                  ROUND COMPLETE
                </h2>

                <p className="relative text-[#f5e6c8]/50 font-inter text-base sm:text-lg mb-10 tracking-wide">
                  All questions have been played
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetBoard}
                  className="relative flex items-center gap-2 px-8 py-4 rounded-xl
                             font-semibold font-inter text-lg
                             transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #d4af37, #b8962e)",
                    color: "#1a0000",
                    boxShadow: "0 0 30px rgba(212,175,55,0.3)",
                  }}
                >
                  <RotateCcw size={20} />
                  Reset Board
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   Desktop / Tablet Tile
   ═══════════════════════════════════════════════════ */
function Tile({ question, colors, catIdx, qIdx, onOpen }) {
  const isUsed = question.used;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: (catIdx * 5 + qIdx) * 0.03, duration: 0.4 }}
      whileHover={!isUsed ? { scale: 1.05, y: -2 } : {}}
      whileTap={!isUsed ? { scale: 0.97 } : {}}
      disabled={isUsed}
      onClick={() => onOpen(catIdx, qIdx)}
      className={`
        relative aspect-[4/3] lg:aspect-[3/2] rounded-xl overflow-hidden
        transition-all duration-300 group
        ${isUsed
          ? "cursor-not-allowed"
          : "cursor-pointer"
        }
      `}
      style={!isUsed ? { boxShadow: `0 0 25px ${colors.glow}` } : {}}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.bg} ${
          isUsed ? "opacity-20" : "opacity-100"
        } transition-opacity duration-500`}
      />

      {/* Border */}
      <div
        className={`absolute inset-[1px] rounded-xl border ${colors.border} ${
          isUsed ? "opacity-20" : "opacity-100"
        } transition-opacity duration-500`}
      />

      {/* Glass effect */}
      {!isUsed && (
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[1px]" />
      )}

      {/* Used overlay */}
      {isUsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/70 flex items-center justify-center"
        >
          <X className="text-[#d4af37]/15" size={36} strokeWidth={3} />
        </motion.div>
      )}

      {/* Points text */}
      <div className="relative h-full flex items-center justify-center">
        <span
          className={`font-sairaStencil text-xl lg:text-2xl xl:text-3xl tracking-wider transition-all duration-300 ${
            isUsed ? "opacity-10" : ""
          }`}
          style={
            isUsed
              ? { color: "rgba(245,230,200,0.1)" }
              : goldTextStyle
          }
        >
          {question.points}
        </span>
      </div>

      {/* Hover shimmer */}
      {!isUsed && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
            style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.06), transparent)" }}
          />
        </div>
      )}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════
   Mobile Tile
   ═══════════════════════════════════════════════════ */
function MobileTile({ question, colors, catIdx, qIdx, onOpen }) {
  const isUsed = question.used;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: qIdx * 0.05, duration: 0.3 }}
      whileTap={!isUsed ? { scale: 0.93 } : {}}
      disabled={isUsed}
      onClick={() => onOpen(catIdx, qIdx)}
      className={`
        flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden relative
        transition-all duration-300
        ${isUsed ? "cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.bg} ${
          isUsed ? "opacity-20" : "opacity-100"
        }`}
      />
      <div
        className={`absolute inset-[1px] rounded-xl border ${colors.border} ${
          isUsed ? "opacity-20" : "opacity-100"
        }`}
      />

      {isUsed && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <X className="text-[#d4af37]/15" size={24} strokeWidth={3} />
        </div>
      )}

      <div className="relative h-full flex items-center justify-center">
        <span
          className="font-sairaStencil text-base"
          style={isUsed ? { color: "rgba(245,230,200,0.1)" } : goldTextStyleSubtle}
        >
          {question.points}
        </span>
      </div>
    </motion.button>
  );
}
