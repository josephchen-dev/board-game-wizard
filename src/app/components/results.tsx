import { useMemo } from "react";
import { Users, Clock, Brain, Star, GraduationCap } from "lucide-react";
import { GAMES, Game } from "../data/games";
import { Filters } from "./steps";
import { MakeKitButton } from "./wizard-shell";

const AGE_MAX: Record<Filters["ageGroup"], number> = { kids: 9, tween: 12, teen: 17, adult: 99 };
const AGE_MIN: Record<Filters["ageGroup"], number> = { kids: 6, tween: 10, teen: 12, adult: 14 };

export function filterGames(filters: Filters): Game[] {
  return GAMES.filter((g) => {
    if (filters.categories.length && !filters.categories.some((c) => g.categories.includes(c))) return false;
    if (g.minPlayers > filters.players || g.maxPlayers < filters.players) return false;
    if (g.minAge > AGE_MAX[filters.ageGroup] || g.minAge < AGE_MIN[filters.ageGroup] - 4) return false;
    if (g.weight < filters.weight[0] - 0.5 || g.weight > filters.weight[1] + 0.5) return false;
    if (filters.playTime < 240 && g.playMinutes > filters.playTime) return false;
    if (filters.learnTime < 60 && g.learnMinutes > filters.learnTime) return false;
    if (filters.moods.length && !filters.moods.some((m) => g.mood.includes(m))) return false;
    if (g.rating < filters.minRating) return false;
    return true;
  }).sort((a, b) => b.rating - a.rating);
}

export function ResultsView({
  filters,
  onReset,
  onBack,
  onOpen,
}: {
  filters: Filters;
  onReset: () => void;
  onBack: () => void;
  onOpen: (id: string) => void;
}) {
  const matches = useMemo(() => filterGames(filters), [filters]);
  const matchText = `${matches.length} game${matches.length === 1 ? "" : "s"} for your table`;
  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex items-end justify-between gap-[16px] flex-wrap">
        <div className="flex flex-col gap-[8px]">
          <div className="text-[12px] tracking-[0.08em] uppercase" aria-hidden="true">
            <span className="rounded-[30px] border-[1.5px] border-app-border px-[8px] py-[2px] bg-app-positive text-app-positive-fg">
              Match
            </span>
          </div>
          {/* SC 4.1.3: announced as a live region when ResultsView first mounts */}
          <h1
            className="text-[44px] leading-[1.05] tracking-[-0.02em] text-app-text-primary"
            aria-live="polite"
            aria-atomic="true"
          >
            {matchText}
          </h1>
          <p className="text-[16px] text-app-text-secondary">From {GAMES.length} candidates across the Adventure Network.</p>
        </div>
        <div className="flex gap-[10px]">
          <MakeKitButton variant="neutral" onClick={onBack} aria-label="Go back and tweak filters">
            ← Tweak filters
          </MakeKitButton>
          <MakeKitButton variant="primary" onClick={onReset} aria-label="Start the wizard over">
            Start over
          </MakeKitButton>
        </div>
      </div>

      {matches.length === 0 ? (
        <div
          role="status"
          className="rounded-[30px] border-[1.5px] border-app-border p-[48px] bg-app-accent text-center flex flex-col gap-[12px] items-center"
        >
          <div className="text-[32px] text-app-accent-fg">No games on this trail.</div>
          <div className="text-[15px] max-w-[420px] text-app-accent-fg">
            Switch to Conserve mode and widen the search — a broader weight range, more time,
            or fewer required categories will get you back in range.
          </div>
          <MakeKitButton onClick={onBack} aria-label="Go back and adjust filters">← Adjust filters</MakeKitButton>
        </div>
      ) : (
        /* SC 1.3.1: list semantics so AT announces "X items" */
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] list-none p-0 m-0"
          aria-label={`${matches.length} matched game${matches.length === 1 ? "" : "s"}, sorted by rating`}
        >
          {matches.map((g, i) => (
            <li key={g.id}>
              <GameCard game={g} rank={i + 1} onOpen={onOpen} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GameCard({ game, rank, onOpen }: { game: Game; rank: number; onOpen: (id: string) => void }) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(game.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(game.id);
        }
      }}
      className="rounded-[30px] overflow-hidden border-[1.5px] border-app-border bg-app-surface flex flex-col h-full cursor-pointer transition-transform hover:-translate-y-[2px] focus-visible:-translate-y-[2px]"
      aria-label={`${game.name}, ranked ${rank}. View details`}
    >
      <div className="aspect-[16/10] border-b-[1.5px] border-app-border relative flex items-end p-[14px] overflow-hidden">
        <img
          src={game.image}
          alt={`${game.name} board game`}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
        {/* SC 1.4.3: overlay ensures legibility of text over photos */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "var(--app-card-overlay)" }}
        />
        <div
          className="absolute top-[10px] left-[10px] bg-app-surface rounded-[30px] border-[1.5px] border-app-border px-[8px] py-[2px] text-[12px] tabular-nums z-10 text-app-text-primary"
          aria-hidden="true"
        >
          #{rank}
        </div>
        {/* SC 1.1.1 / 4.1.2: icon is decorative; rating text is the information */}
        <div
          className="absolute top-[10px] right-[10px] bg-app-ink text-app-ink-fg rounded-[30px] border-[1.5px] border-app-border px-[8px] py-[2px] text-[12px] flex items-center gap-[4px] z-10"
          aria-label={`Rating: ${game.rating.toFixed(1)} out of 10`}
        >
          <Star size={12} fill="white" aria-hidden="true" />
          <span aria-hidden="true">{game.rating.toFixed(1)}</span>
        </div>
        <div className="text-app-ink-fg text-[24px] leading-[1.1] drop-shadow-[2px_2px_0_rgba(0,0,0,0.7)] relative z-10" aria-hidden="true">
          {game.name}
        </div>
      </div>
      <div className="p-[16px] flex flex-col gap-[12px]">
        <div className="flex items-center justify-between text-[12px] text-app-text-muted">
          <span>{game.designer} · {game.year}</span>
        </div>
        <div className="flex flex-wrap gap-[6px]" aria-label="Categories">
          {game.categories.slice(0, 3).map((c) => (
            <span key={c} className="rounded-[30px] border-[1px] border-app-border px-[8px] py-[1px] text-[11px] text-app-text-primary">
              {c}
            </span>
          ))}
        </div>
        <p className="text-[13px] leading-[1.4] text-app-text-secondary">{game.blurb}</p>
        {/* SC 4.1.2: each stat has a contextual accessible label */}
        <div className="grid grid-cols-2 gap-x-[12px] gap-y-[6px] text-[12px] pt-[8px] border-t-[1px] border-border">
          <Stat
            icon={<Users size={14} />}
            label={`${game.minPlayers}–${game.maxPlayers}`}
            srLabel={`${game.minPlayers} to ${game.maxPlayers} players`}
          />
          <Stat
            icon={<Clock size={14} />}
            label={`${game.playMinutes}m`}
            srLabel={`Play time: ${game.playMinutes} minutes`}
          />
          <Stat
            icon={<Brain size={14} />}
            label={`${game.weight.toFixed(1)} / 5`}
            srLabel={`Difficulty: ${game.weight.toFixed(1)} out of 5`}
          />
          <Stat
            icon={<GraduationCap size={14} />}
            label={`${game.learnMinutes}m`}
            srLabel={`Learn time: ${game.learnMinutes} minutes`}
          />
        </div>
      </div>
    </article>
  );
}

function Stat({ icon, label, srLabel }: { icon: React.ReactNode; label: string; srLabel: string }) {
  return (
    <div className="flex items-center gap-[6px] text-app-text-secondary">
      <span aria-hidden="true">{icon}</span>
      <span className="sr-only">{srLabel}</span>
      <span className="tabular-nums" aria-hidden="true">{label}</span>
    </div>
  );
}
