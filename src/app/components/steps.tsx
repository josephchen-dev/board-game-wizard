import { Users, Brain, Clock, GraduationCap, Sparkles, Baby, Star } from "lucide-react";
import { MakeKitTag } from "./wizard-shell";
import { ALL_CATEGORIES, ALL_MOODS } from "../data/games";

export type Filters = {
  categories: string[];
  players: number;
  ageGroup: "kids" | "tween" | "teen" | "adult";
  weight: [number, number];
  playTime: number;
  learnTime: number;
  moods: string[];
  minRating: number;
};

export const DEFAULT_FILTERS: Filters = {
  categories: [],
  players: 4,
  ageGroup: "adult",
  weight: [1, 5],
  playTime: 240,
  learnTime: 60,
  moods: [],
  minRating: 6.5,
};

export function StepCategories({ filters, set }: { filters: Filters; set: (f: Filters) => void }) {
  const toggle = (c: string) =>
    set({
      ...filters,
      categories: filters.categories.includes(c)
        ? filters.categories.filter((x) => x !== c)
        : [...filters.categories, c],
    });
  return (
    <div className="flex flex-col gap-[20px]">
      {/* SC 4.1.2: group role gives the tag cloud a collective label */}
      <div
        role="group"
        aria-label="Game genres — select one or more, or leave empty for any"
        className="flex flex-wrap gap-[10px]"
      >
        {ALL_CATEGORIES.map((c) => (
          <MakeKitTag key={c} selected={filters.categories.includes(c)} onClick={() => toggle(c)}>
            {c}
          </MakeKitTag>
        ))}
      </div>
      <p className="text-[13px] text-app-text-muted" aria-live="polite" aria-atomic="true">
        Pick any number — leave empty for "anything goes". Selected:{" "}
        <span className="tabular-nums">
          {filters.categories.length || "any"}
        </span>
        {filters.categories.length > 0 && ` (${filters.categories.join(", ")})`}.
      </p>
    </div>
  );
}

export function StepPlayers({ filters, set }: { filters: Filters; set: (f: Filters) => void }) {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex items-center gap-[16px]" aria-hidden="true">
        <Users size={28} strokeWidth={1.75} className="text-app-text-primary" />
        <div className="text-[64px] leading-none tabular-nums text-app-text-primary">{filters.players}</div>
        <div className="text-[18px] text-app-text-secondary mt-[28px]">
          player{filters.players === 1 ? "" : "s"}
        </div>
      </div>
      {/* SC 4.1.2: labelled range input */}
      <label htmlFor="players-range" className="sr-only">
        Number of players: {filters.players}
      </label>
      <input
        id="players-range"
        type="range"
        min={1}
        max={10}
        value={filters.players}
        aria-valuetext={`${filters.players} player${filters.players === 1 ? "" : "s"}`}
        onChange={(e) => set({ ...filters, players: Number(e.target.value) })}
        className="w-full"
      />
      <div className="flex justify-between text-[12px] text-app-text-muted tabular-nums" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}

export function StepAge({ filters, set }: { filters: Filters; set: (f: Filters) => void }) {
  const groups = [
    { id: "kids",  label: "Kids",   sub: "6–9",   min: 6 },
    { id: "tween", label: "Tweens", sub: "10–12", min: 10 },
    { id: "teen",  label: "Teens",  sub: "13–17", min: 12 },
    { id: "adult", label: "Adults", sub: "18+",   min: 14 },
  ] as const;
  return (
    /* SC 4.1.2: radiogroup role for exclusive-choice cards */
    <div role="radiogroup" aria-label="Age group" className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
      {groups.map((g) => {
        const active = filters.ageGroup === g.id;
        return (
          <button
            key={g.id}
            role="radio"
            aria-checked={active}
            onClick={() => set({ ...filters, ageGroup: g.id })}
            className={`text-left border-[1.5px] border-app-border p-[20px] transition-colors ${
              active
                ? "bg-app-ink text-app-ink-fg"
                : "bg-app-surface text-app-text-primary hover:bg-app-surface-hover"
            }`}
          >
            <Baby size={24} strokeWidth={1.75} aria-hidden="true" />
            <div className="text-[22px] mt-[12px]">{g.label}</div>
            <div className="text-[13px] opacity-70">Ages {g.sub}</div>
          </button>
        );
      })}
    </div>
  );
}

export function StepDifficulty({ filters, set }: { filters: Filters; set: (f: Filters) => void }) {
  const levels = [
    { v: 1, label: "Light",     desc: "Easy to grasp, casual fun" },
    { v: 2, label: "Light-Med", desc: "A few decisions to chew on" },
    { v: 3, label: "Medium",    desc: "Strategy with depth" },
    { v: 4, label: "Med-Heavy", desc: "Crunchy choices, longer arc" },
    { v: 5, label: "Heavy",     desc: "Brain-burner, deep systems" },
  ];
  const setRange = (lo: number, hi: number) => set({ ...filters, weight: [lo, hi] });
  const rangeLabel = `${levels.find((l) => l.v === filters.weight[0])?.label} to ${levels.find((l) => l.v === filters.weight[1])?.label}`;
  return (
    <div className="flex flex-col gap-[20px]">
      {/* SC 4.1.3: live region announces current selection to AT */}
      <div className="flex items-center gap-[16px]" aria-hidden="true">
        <Brain size={28} strokeWidth={1.75} className="text-app-text-primary" />
        <div className="text-[20px] text-app-text-primary">
          {levels.find((l) => l.v === filters.weight[0])?.label} →{" "}
          {levels.find((l) => l.v === filters.weight[1])?.label}
        </div>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Selected difficulty range: {rangeLabel}
      </span>
      {/* SC 4.1.2: group with toggle semantics */}
      <div
        role="group"
        aria-label="Difficulty range — tap to select, click two levels for a range"
        className="grid grid-cols-5 gap-[8px]"
      >
        {levels.map((l) => {
          const active = filters.weight[0] <= l.v && l.v <= filters.weight[1];
          return (
            <button
              key={l.v}
              aria-pressed={active}
              aria-label={`Difficulty ${l.v}: ${l.label} — ${l.desc}`}
              onClick={() => {
                if (filters.weight[0] === l.v && filters.weight[1] === l.v) setRange(1, 5);
                else if (active) setRange(l.v, l.v);
                else setRange(Math.min(filters.weight[0], l.v), Math.max(filters.weight[1], l.v));
              }}
              className={`border-[1.5px] border-app-border p-[16px] text-left transition-colors ${
                active
                  ? "bg-app-positive text-app-positive-fg"
                  : "bg-app-surface text-app-text-primary hover:bg-app-surface-hover"
              }`}
            >
              <div className="text-[28px] tabular-nums" aria-hidden="true">{l.v}</div>
              <div className="text-[13px] mt-[4px]">{l.label}</div>
              <div className="text-[11px] opacity-70 mt-[6px]">{l.desc}</div>
            </button>
          );
        })}
      </div>
      <p className="text-[12px] text-app-text-muted">
        Tap a single level to lock it, or click two ends for a range.
      </p>
    </div>
  );
}

export function StepTime({ filters, set }: { filters: Filters; set: (f: Filters) => void }) {
  const playLabel = filters.playTime >= 240 ? "any length" : `up to ${filters.playTime} minutes`;
  const learnLabel = filters.learnTime >= 60 ? "any length" : `up to ${filters.learnTime} minutes`;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
      <div className="border-[1.5px] border-app-border p-[24px] bg-app-surface flex flex-col gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <Clock size={24} strokeWidth={1.75} className="text-app-text-primary" aria-hidden="true" />
          <span className="text-[14px] uppercase tracking-[0.08em] text-app-text-primary" id="play-time-label">
            Max play time
          </span>
        </div>
        <div className="text-[56px] leading-none tabular-nums text-app-text-primary" aria-hidden="true">
          {filters.playTime >= 240 ? "Any" : `${filters.playTime}m`}
        </div>
        <input
          type="range"
          min={15}
          max={240}
          step={15}
          value={filters.playTime}
          aria-labelledby="play-time-label"
          aria-valuetext={playLabel}
          onChange={(e) => set({ ...filters, playTime: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-[12px] text-app-text-muted" aria-hidden="true">
          <span>15m</span><span>1h</span><span>2h</span><span>Any</span>
        </div>
      </div>
      <div className="border-[1.5px] border-app-border p-[24px] bg-app-accent flex flex-col gap-[16px]">
        <div className="flex items-center gap-[12px]">
          <GraduationCap size={24} strokeWidth={1.75} className="text-app-accent-fg" aria-hidden="true" />
          <span className="text-[14px] uppercase tracking-[0.08em] text-app-accent-fg" id="learn-time-label">
            Time to learn
          </span>
        </div>
        <div className="text-[56px] leading-none tabular-nums text-app-accent-fg" aria-hidden="true">
          {filters.learnTime >= 60 ? "Any" : `${filters.learnTime}m`}
        </div>
        <input
          type="range"
          min={5}
          max={60}
          step={5}
          value={filters.learnTime}
          aria-labelledby="learn-time-label"
          aria-valuetext={learnLabel}
          onChange={(e) => set({ ...filters, learnTime: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-[12px] text-app-accent-fg/70" aria-hidden="true">
          <span>5m</span><span>20m</span><span>40m</span><span>Any</span>
        </div>
      </div>
    </div>
  );
}

export function StepMood({ filters, set }: { filters: Filters; set: (f: Filters) => void }) {
  const toggle = (m: string) =>
    set({
      ...filters,
      moods: filters.moods.includes(m)
        ? filters.moods.filter((x) => x !== m)
        : [...filters.moods, m],
    });
  const ratingLabel = `Minimum BGG rating: ${filters.minRating.toFixed(1)} out of 9`;
  return (
    <div className="flex flex-col gap-[24px]">
      <div
        role="group"
        aria-label="Mood tags — select one or more to filter by vibe"
        className="flex flex-wrap gap-[10px]"
      >
        {ALL_MOODS.map((m) => (
          <MakeKitTag key={m} selected={filters.moods.includes(m)} onClick={() => toggle(m)} scheme="brand">
            <Sparkles size={14} strokeWidth={2} aria-hidden="true" /> {m}
          </MakeKitTag>
        ))}
      </div>
      <div className="border-[1.5px] border-app-border p-[20px] flex flex-col gap-[12px] bg-app-surface">
        <div className="flex items-center gap-[10px]">
          <Star size={20} strokeWidth={1.75} className="text-app-text-primary" aria-hidden="true" />
          <span
            className="text-[14px] uppercase tracking-[0.08em] text-app-text-primary"
            id="min-rating-label"
          >
            Minimum BGG rating
          </span>
          <span className="ml-auto text-[24px] tabular-nums text-app-text-primary" aria-hidden="true">
            {filters.minRating.toFixed(1)}
          </span>
        </div>
        <input
          type="range"
          min={6}
          max={9}
          step={0.1}
          value={filters.minRating}
          aria-labelledby="min-rating-label"
          aria-valuetext={ratingLabel}
          onChange={(e) => set({ ...filters, minRating: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-[12px] text-app-text-muted" aria-hidden="true">
          <span>6.0</span><span>7.0</span><span>8.0</span><span>9.0</span>
        </div>
      </div>
    </div>
  );
}
