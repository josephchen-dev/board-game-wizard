import { useMemo, useState } from "react";
import { Dice5, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { MakeKitButton, ProgressBar, StepHeader } from "./components/wizard-shell";
import {
  DEFAULT_FILTERS,
  Filters,
  StepAge,
  StepCategories,
  StepDifficulty,
  StepMood,
  StepPlayers,
  StepTime,
} from "./components/steps";
import { filterGames, ResultsView } from "./components/results";
import { GameDetailView } from "./components/game-detail";
import { GAMES } from "./data/games";

const STEPS = [
  {
    id: "categories",
    title: "What kind of games do you love?",
    subtitle: "Pick the genres that hit. We'll use this as a starting net.",
  },
  {
    id: "players",
    title: "How many at the table?",
    subtitle: "From a solo session to a packed dining room — we'll only show games that scale.",
  },
  {
    id: "age",
    title: "Who's playing?",
    subtitle: "Age range affects rules complexity and theme suitability.",
  },
  {
    id: "difficulty",
    title: "How crunchy do you want it?",
    subtitle: "Game weight runs 1 (light) to 5 (brain-burner) on BoardGameGeek.",
  },
  {
    id: "time",
    title: "How long do you have?",
    subtitle: "Tonight's session length, plus how patient you are with rulebooks.",
  },
  {
    id: "mood",
    title: "Set the vibe.",
    subtitle: "Optional flavor and a quality floor. The rest is taste.",
  },
] as const;

export default function App() {
  const [step, setStep] = useState(0);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showResults, setShowResults] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const liveCount = useMemo(() => filterGames(filters).length, [filters]);
  const selectedGame = useMemo(() => GAMES.find((g) => g.id === selectedGameId) ?? null, [selectedGameId]);
  const total = STEPS.length;
  const progress = ((step + 1) / total) * 100;

  const reset = () => {
    setFilters(DEFAULT_FILTERS);
    setStep(0);
    setShowResults(false);
    setSelectedGameId(null);
  };

  return (
    <div className="size-full min-h-screen bg-app-bg">
      <div className="max-w-[1280px] mx-auto px-[24px] md:px-[40px] py-[32px] flex flex-col gap-[28px]">
        <Header onReset={reset} />

        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <GameDetailView game={selectedGame} onBack={() => setSelectedGameId(null)} />
            </motion.div>
          ) : !showResults ? (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-[24px]"
            >
              {/* SC 2.4.1 / 1.3.6: landmark labels distinguish multiple regions */}
              <main
                aria-label="Game finder wizard"
                className="rounded-[30px] border-[1.5px] border-app-border bg-app-surface p-[32px] md:p-[48px] flex flex-col gap-[32px] min-h-[560px]"
              >
                <div className="flex flex-col gap-[16px]">
                  <ProgressBar value={progress} step={step + 1} total={total} />
                  {/* SC 2.4.3: visual step tracker is decorative — aria-hidden */}
                  <div
                    className="flex justify-between text-[12px] tracking-[0.08em] uppercase text-app-text-muted"
                    aria-hidden="true"
                  >
                    {STEPS.map((s, i) => (
                      <span
                        key={s.id}
                        className={`hidden md:inline tabular-nums ${i === step ? "text-app-text-primary" : ""}`}
                      >
                        {String(i + 1).padStart(2, "0")} · {s.id}
                      </span>
                    ))}
                  </div>
                </div>

                <StepHeader
                  step={step + 1}
                  total={total}
                  title={STEPS[step].title}
                  subtitle={STEPS[step].subtitle}
                />

                <div className="flex-1 relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {step === 0 && <StepCategories filters={filters} set={setFilters} />}
                      {step === 1 && <StepPlayers filters={filters} set={setFilters} />}
                      {step === 2 && <StepAge filters={filters} set={setFilters} />}
                      {step === 3 && <StepDifficulty filters={filters} set={setFilters} />}
                      {step === 4 && <StepTime filters={filters} set={setFilters} />}
                      {step === 5 && <StepMood filters={filters} set={setFilters} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between gap-[12px] pt-[16px] border-t-[1.5px] border-app-border">
                  <MakeKitButton
                    variant="ghost"
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    aria-label={step === 0 ? "Back (already on first step)" : `Back to step ${step}: ${STEPS[step - 1].id}`}
                  >
                    <ArrowLeft size={16} aria-hidden="true" /> Back
                  </MakeKitButton>

                  {/* SC 4.1.3: politely announce live count to screen readers */}
                  <div
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className="text-[13px] text-app-text-secondary"
                  >
                    <span className="tabular-nums">{liveCount}</span>{" "}
                    match{liveCount === 1 ? "" : "es"} so far
                  </div>

                  {step === total - 1 ? (
                    <MakeKitButton
                      variant="primary"
                      onClick={() => setShowResults(true)}
                      aria-label={`See all ${liveCount} matching game${liveCount === 1 ? "" : "s"}`}
                    >
                      See {liveCount} matches <ArrowRight size={16} aria-hidden="true" />
                    </MakeKitButton>
                  ) : (
                    <MakeKitButton
                      variant="primary"
                      onClick={() => setStep(step + 1)}
                      aria-label={`Next: ${STEPS[step + 1].id} (step ${step + 2} of ${total})`}
                    >
                      Next <ArrowRight size={16} aria-hidden="true" />
                    </MakeKitButton>
                  )}
                </div>
              </main>

              <Sidebar filters={filters} liveCount={liveCount} step={step} setStep={setStep} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ResultsView
                filters={filters}
                onReset={reset}
                onBack={() => setShowResults(false)}
                onOpen={setSelectedGameId}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}

function Header({ onReset }: { onReset: () => void }) {
  return (
    <header className="flex items-center justify-between rounded-[30px] border-[1.5px] border-app-border bg-app-surface px-[20px] py-[14px]">
      <div className="flex items-center gap-[12px]">
        <div className="size-[36px] rounded-[30px] border-[1.5px] border-app-border bg-app-accent flex items-center justify-center" aria-hidden="true">
          <Dice5 size={22} strokeWidth={2} className="text-app-accent-fg" />
        </div>
        <div className="flex flex-col">
          <span className="text-[18px] leading-none tracking-[-0.01em] text-app-text-primary">Tabletop Sieve</span>
          <span className="text-[11px] tracking-[0.12em] uppercase text-app-text-muted">
            A Make Kit board-game finder
          </span>
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <span className="hidden md:inline text-[12px] text-app-text-muted" aria-hidden="true">
          {GAMES.length} games indexed
        </span>
        <MakeKitButton variant="subtle" size="sm" onClick={onReset} aria-label="Reset all filters and start over">
          <RotateCcw size={14} aria-hidden="true" /> Reset
        </MakeKitButton>
      </div>
    </header>
  );
}

function Sidebar({
  filters,
  liveCount,
  step,
  setStep,
}: {
  filters: Filters;
  liveCount: number;
  step: number;
  setStep: (n: number) => void;
}) {
  const summary: Array<[string, string, number]> = [
    ["Genres",     filters.categories.length ? filters.categories.join(", ") : "Any", 0],
    ["Players",    `${filters.players}`, 1],
    ["Age",        filters.ageGroup, 2],
    ["Weight",     `${filters.weight[0]}–${filters.weight[1]} / 5`, 3],
    ["Play time",  filters.playTime >= 240 ? "Any" : `≤ ${filters.playTime}m`, 4],
    ["Learn time", filters.learnTime >= 60 ? "Any" : `≤ ${filters.learnTime}m`, 4],
    ["Mood",       filters.moods.length ? filters.moods.join(", ") : "Any", 5],
    ["Min rating", filters.minRating.toFixed(1), 5],
  ];
  return (
    <aside aria-label="Filter summary and quick navigation">
      <div className="flex flex-col gap-[16px]">
        {/* SC 4.1.3: live region so AT announces count updates */}
        <div
          className="rounded-[30px] border-[1.5px] border-app-border bg-app-ink text-app-ink-fg p-[24px]"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`${liveCount} out of ${GAMES.length} games match your current filters`}
        >
          <div className="text-[12px] uppercase tracking-[0.08em] opacity-70" aria-hidden="true">Live match count</div>
          <div className="text-[72px] leading-none tabular-nums mt-[8px]" aria-hidden="true">{liveCount}</div>
          <div className="text-[13px] opacity-80 mt-[4px]" aria-hidden="true">out of {GAMES.length} games</div>
          <div className="h-[6px] rounded-[30px] overflow-hidden bg-app-ink-fg/20 mt-[16px]" aria-hidden="true">
            <div
              className="h-full rounded-[30px] bg-app-positive transition-all"
              style={{ width: `${Math.min(100, (liveCount / GAMES.length) * 100)}%` }}
            />
          </div>
        </div>

        <nav aria-label="Jump to filter step">
          <div className="rounded-[30px] border-[1.5px] border-app-border bg-app-surface p-[20px] flex flex-col gap-[10px]">
            <div className="text-[12px] uppercase tracking-[0.08em] text-app-text-muted" aria-hidden="true">
              Your filters
            </div>
            {summary.map(([k, v, jumpStep]) => (
              <button
                key={k}
                onClick={() => setStep(jumpStep)}
                aria-label={`Go to ${k} filter (step ${jumpStep + 1}), currently: ${v}`}
                aria-current={step === jumpStep ? "step" : undefined}
                className={`flex items-baseline justify-between gap-[12px] py-[8px] border-b-[1px] border-border last:border-b-0 text-left hover:bg-app-surface-hover ${
                  step === jumpStep ? "bg-app-accent/30" : ""
                }`}
              >
                <span className="text-[12px] uppercase tracking-[0.06em] text-app-text-muted" aria-hidden="true">{k}</span>
                <span className="text-[13px] text-right truncate max-w-[180px] text-app-text-primary" aria-hidden="true">{v}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="rounded-[30px] border-[1.5px] border-app-border bg-app-surface px-[20px] py-[14px] flex items-center justify-between text-[12px] text-app-text-muted">
      <span>Built with the Make Kit · {GAMES.length} games · 6 filter dimensions</span>
      <span className="tracking-[0.12em] uppercase">v 1.0</span>
    </footer>
  );
}
