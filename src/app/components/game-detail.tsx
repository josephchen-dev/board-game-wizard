import { ArrowLeft, Users, Clock, Brain, Star, GraduationCap, Baby, Target } from "lucide-react";
import { Game } from "../data/games";
import { MakeKitButton } from "./wizard-shell";

const WEIGHT_LABEL = (w: number) =>
  w < 2 ? "Light" : w < 3 ? "Light-Medium" : w < 4 ? "Medium-Heavy" : "Heavy";

export function GameDetailView({ game, onBack }: { game: Game; onBack: () => void }) {
  const facts: Array<{ icon: React.ReactNode; label: string; value: string; srValue: string }> = [
    {
      icon: <Users size={20} strokeWidth={1.75} aria-hidden="true" />,
      label: "Players",
      value: game.minPlayers === game.maxPlayers ? `${game.minPlayers}` : `${game.minPlayers}–${game.maxPlayers}`,
      srValue: `${game.minPlayers} to ${game.maxPlayers} players`,
    },
    {
      icon: <Clock size={20} strokeWidth={1.75} aria-hidden="true" />,
      label: "Play time",
      value: `${game.playMinutes}m`,
      srValue: `${game.playMinutes} minutes to play`,
    },
    {
      icon: <GraduationCap size={20} strokeWidth={1.75} aria-hidden="true" />,
      label: "Learn time",
      value: `${game.learnMinutes}m`,
      srValue: `${game.learnMinutes} minutes to learn`,
    },
    {
      icon: <Brain size={20} strokeWidth={1.75} aria-hidden="true" />,
      label: "Weight",
      value: `${game.weight.toFixed(1)} · ${WEIGHT_LABEL(game.weight)}`,
      srValue: `Difficulty ${game.weight.toFixed(1)} out of 5, ${WEIGHT_LABEL(game.weight)}`,
    },
    {
      icon: <Baby size={20} strokeWidth={1.75} aria-hidden="true" />,
      label: "Min age",
      value: `${game.minAge}+`,
      srValue: `Minimum age ${game.minAge}`,
    },
    {
      icon: <Star size={20} strokeWidth={1.75} aria-hidden="true" />,
      label: "BGG rating",
      value: game.rating.toFixed(1),
      srValue: `Rating ${game.rating.toFixed(1)} out of 10`,
    },
  ];

  return (
    <article className="flex flex-col gap-[28px]">
      <MakeKitButton variant="ghost" size="sm" onClick={onBack} aria-label="Back to results">
        <ArrowLeft size={16} aria-hidden="true" /> Back to results
      </MakeKitButton>

      {/* Hero */}
      <header className="border-[1.5px] border-app-border bg-app-surface overflow-hidden">
        <div className="aspect-[21/9] relative flex items-end p-[24px] md:p-[32px] overflow-hidden">
          <img
            src={game.image}
            alt={`${game.name} board game`}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0" aria-hidden="true" style={{ background: "var(--app-card-overlay)" }} />
          <div className="relative z-10 flex flex-col gap-[8px]">
            <div className="flex flex-wrap gap-[6px]" aria-hidden="true">
              {game.categories.map((c) => (
                <span
                  key={c}
                  className="border-[1.5px] border-app-border bg-app-accent text-app-accent-fg px-[8px] py-[2px] text-[11px] uppercase tracking-[0.06em]"
                >
                  {c}
                </span>
              ))}
            </div>
            <h1 className="text-app-ink-fg text-[48px] leading-[1.05] tracking-[-0.02em] drop-shadow-[2px_2px_0_rgba(46,28,18,0.8)]">
              {game.name}
            </h1>
            <p className="text-app-ink-fg text-[16px] drop-shadow-[1px_1px_0_rgba(46,28,18,0.8)]">
              {game.designer} · {game.year}
            </p>
          </div>
        </div>
      </header>

      {/* Quick facts */}
      <section aria-label="Quick facts">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[12px]">
          {facts.map((f) => (
            <div key={f.label} className="border-[1.5px] border-app-border bg-app-surface p-[16px] flex flex-col gap-[8px]">
              <div className="flex items-center gap-[8px] text-app-text-primary">
                {f.icon}
                <span className="text-[11px] uppercase tracking-[0.06em] text-app-text-muted">{f.label}</span>
              </div>
              <span className="sr-only">{f.srValue}</span>
              <span className="text-[20px] tabular-nums text-app-text-primary" aria-hidden="true">{f.value}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-[24px]">
        <div className="flex flex-col gap-[24px]">
          {/* Background */}
          <section aria-labelledby="bg-heading" className="border-[1.5px] border-app-border bg-app-surface p-[24px] md:p-[32px] flex flex-col gap-[12px]">
            <div className="flex items-center gap-[10px]" id="bg-heading">
              <span className="border-[1.5px] border-app-border bg-app-ink text-app-ink-fg px-[8px] py-[2px] text-[12px] uppercase tracking-[0.08em]">
                Background
              </span>
            </div>
            <p className="text-[16px] leading-[1.6] text-app-text-secondary">{game.background}</p>
          </section>

          {/* Gameplay */}
          <section aria-labelledby="gp-heading" className="border-[1.5px] border-app-border bg-app-surface p-[24px] md:p-[32px] flex flex-col gap-[16px]">
            <div className="flex items-center gap-[10px]" id="gp-heading">
              <span className="border-[1.5px] border-app-border bg-app-accent text-app-accent-fg px-[8px] py-[2px] text-[12px] uppercase tracking-[0.08em]">
                Gameplay
              </span>
            </div>
            <p className="text-[16px] leading-[1.6] text-app-text-secondary">{game.gameplay}</p>
            <div className="flex items-start gap-[10px] border-t-[1px] border-border pt-[16px]">
              <Target size={20} strokeWidth={1.75} className="text-app-text-primary mt-[2px]" aria-hidden="true" />
              <div className="flex flex-col gap-[2px]">
                <span className="text-[12px] uppercase tracking-[0.08em] text-app-text-muted">Objective</span>
                <p className="text-[15px] leading-[1.5] text-app-text-primary">{game.objective}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Quick mechanics guide */}
        <aside aria-labelledby="mech-heading">
          <section className="border-[1.5px] border-app-border bg-app-surface-warm p-[24px] flex flex-col gap-[16px]">
            <div className="flex items-center gap-[10px]" id="mech-heading">
              <span className="border-[1.5px] border-app-border bg-app-positive text-app-positive-fg px-[8px] py-[2px] text-[12px] uppercase tracking-[0.08em]">
                Quick mechanics guide
              </span>
            </div>
            <ol className="flex flex-col gap-[12px] list-none p-0 m-0">
              {game.mechanics.map((m, idx) => (
                <li key={m} className="flex items-start gap-[12px]">
                  <span
                    className="shrink-0 size-[24px] border-[1.5px] border-app-border bg-app-ink text-app-ink-fg flex items-center justify-center text-[12px] tabular-nums"
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </span>
                  <span className="text-[14px] leading-[1.45] text-app-text-secondary">{m}</span>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-[6px] border-t-[1px] border-border pt-[16px]" aria-label="Mood tags">
              {game.mood.map((m) => (
                <span key={m} className="border-[1px] border-app-border px-[8px] py-[1px] text-[11px] text-app-text-primary">
                  {m}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}
