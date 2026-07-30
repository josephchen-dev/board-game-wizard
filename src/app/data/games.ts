export type Game = {
  id: string;
  name: string;
  designer: string;
  year: number;
  categories: string[];
  minPlayers: number;
  maxPlayers: number;
  minAge: number;
  weight: number;
  playMinutes: number;
  learnMinutes: number;
  rating: number;
  mood: string[];
  cover: string;
  image: string;
  blurb: string;
  /* Landing-page detail */
  background: string;
  gameplay: string;
  objective: string;
  mechanics: string[];
};

const COVERS = [
  "linear-gradient(135deg,#FFD43B,#FF6B35)",
  "linear-gradient(135deg,#3B82F6,#1E1B4B)",
  "linear-gradient(135deg,#14AE5C,#064E3B)",
  "linear-gradient(135deg,#F472B6,#7C3AED)",
  "linear-gradient(135deg,#FB923C,#7F1D1D)",
  "linear-gradient(135deg,#22D3EE,#0F766E)",
  "linear-gradient(135deg,#E11D48,#1E1E1E)",
  "linear-gradient(135deg,#A7F3D0,#1E40AF)",
  "linear-gradient(135deg,#FCD34D,#1E1E1E)",
  "linear-gradient(135deg,#C084FC,#1E1B4B)",
];

const IMAGE_POOL: Record<string, string[]> = {
  Strategy: [
    "https://images.unsplash.com/photo-1761716475966-77b500b6b29f?w=800&q=80",
    "https://images.unsplash.com/photo-1762072015068-b92d5a41dfc1?w=800&q=80",
    "https://images.unsplash.com/photo-1762068383473-f59f4dc614e0?w=800&q=80",
    "https://images.unsplash.com/photo-1763875067516-e947790c74ac?w=800&q=80",
    "https://images.unsplash.com/photo-1653080583611-9a015c15462f?w=800&q=80",
    "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&q=80",
  ],
  Family: [
    "https://images.unsplash.com/photo-1585504198199-20277593b94f?w=800&q=80",
    "https://images.unsplash.com/photo-1577897113292-3b95936e5206?w=800&q=80",
    "https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?w=800&q=80",
    "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800&q=80",
    "https://images.unsplash.com/photo-1582921017967-79d1cb6702ee?w=800&q=80",
  ],
  Party: [
    "https://images.unsplash.com/photo-1577897113292-3b95936e5206?w=800&q=80",
    "https://images.unsplash.com/photo-1698188667999-753bc61fcca4?w=800&q=80",
    "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&q=80",
    "https://images.unsplash.com/photo-1769893494602-54d305d7f3bf?w=800&q=80",
  ],
  Cooperative: [
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80",
    "https://images.unsplash.com/photo-1549056572-75914d5d5fd4?w=800&q=80",
    "https://images.unsplash.com/photo-1640461470346-c8b56497850a?w=800&q=80",
  ],
  Deduction: [
    "https://images.unsplash.com/photo-1559898311-9617e719bc26?w=800&q=80",
    "https://images.unsplash.com/photo-1659691283219-eb50b55042be?w=800&q=80",
    "https://images.unsplash.com/photo-1646808911016-21d14de4df38?w=800&q=80",
    "https://images.unsplash.com/photo-1627457909148-00932761cd2d?w=800&q=80",
  ],
  "Worker Placement": [
    "https://images.unsplash.com/photo-1761716475966-77b500b6b29f?w=800&q=80",
    "https://images.unsplash.com/photo-1762068383473-f59f4dc614e0?w=800&q=80",
    "https://images.unsplash.com/photo-1653080583611-9a015c15462f?w=800&q=80",
    "https://images.unsplash.com/photo-1653080583495-2d2a4e459ed3?w=800&q=80",
  ],
  "Deck Builder": [
    "https://images.unsplash.com/photo-1708863828286-63b56b08f292?w=800&q=80",
    "https://images.unsplash.com/photo-1673892139721-e4f7cda4ba21?w=800&q=80",
    "https://images.unsplash.com/photo-1709540239548-4ded6fa386cc?w=800&q=80",
    "https://images.unsplash.com/photo-1653080583976-b25842d831c6?w=800&q=80",
  ],
  "Roll & Write": [
    "https://images.unsplash.com/photo-1547638375-ebf04735d792?w=800&q=80",
    "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&q=80",
    "https://images.unsplash.com/photo-1589804845133-49b5e06cc415?w=800&q=80",
    "https://images.unsplash.com/photo-1735469078499-63f1ca27b44b?w=800&q=80",
    "https://images.unsplash.com/photo-1662559810796-3bf57763a3cf?w=800&q=80",
    "https://images.unsplash.com/photo-1605216391936-b8a1fbf96dd6?w=800&q=80",
  ],
  Abstract: [
    "https://images.unsplash.com/photo-1614770493132-50abd86a4f33?w=800&q=80",
    "https://images.unsplash.com/photo-1776518985040-a5b7a9bcf6d3?w=800&q=80",
    "https://images.unsplash.com/photo-1773101883545-a7330245c3f1?w=800&q=80",
    "https://images.unsplash.com/photo-1769081872368-d74ab3ba69b8?w=800&q=80",
  ],
  Thematic: [
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80",
    "https://images.unsplash.com/photo-1549056572-75914d5d5fd4?w=800&q=80",
    "https://images.unsplash.com/photo-1642056446459-1f10774273f2?w=800&q=80",
  ],
  Wargame: [
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80",
    "https://images.unsplash.com/photo-1549056572-75914d5d5fd4?w=800&q=80",
    "https://images.unsplash.com/photo-1761716475966-77b500b6b29f?w=800&q=80",
    "https://images.unsplash.com/photo-1666355704025-4b9346d0369a?w=800&q=80",
  ],
  Legacy: [
    "https://images.unsplash.com/photo-1640461470346-c8b56497850a?w=800&q=80",
    "https://images.unsplash.com/photo-1614096602618-38a342f139c5?w=800&q=80",
    "https://images.unsplash.com/photo-1719494206741-79831f9f4d51?w=800&q=80",
  ],
  Dexterity: [
    "https://images.unsplash.com/photo-1629760946220-5693ee4c46ac?w=800&q=80",
    "https://images.unsplash.com/photo-1560698230-e2dd6602f33d?w=800&q=80",
    "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800&q=80",
  ],
  Auction: [
    "https://images.unsplash.com/photo-1559898311-9617e719bc26?w=800&q=80",
    "https://images.unsplash.com/photo-1646808911016-21d14de4df38?w=800&q=80",
    "https://images.unsplash.com/photo-1677188010559-0667a1ed33a0?w=800&q=80",
  ],
  Trivia: [
    "https://images.unsplash.com/photo-1640461470346-c8b56497850a?w=800&q=80",
    "https://images.unsplash.com/photo-1719494206741-79831f9f4d51?w=800&q=80",
    "https://images.unsplash.com/photo-1614096602618-38a342f139c5?w=800&q=80",
  ],
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1547638375-ebf04735d792?w=800&q=80",
  "https://images.unsplash.com/photo-1761716475966-77b500b6b29f?w=800&q=80",
  "https://images.unsplash.com/photo-1763875067516-e947790c74ac?w=800&q=80",
];

const CATS = ["Strategy", "Family", "Party", "Cooperative", "Deduction", "Worker Placement", "Deck Builder", "Roll & Write", "Abstract", "Thematic", "Wargame", "Legacy", "Dexterity", "Auction", "Trivia"];
const MOODS = ["Cozy", "Cutthroat", "Brainy", "Silly", "Tense", "Chill", "Epic"];

function pick<T>(arr: T[], n: number, seed: number): T[] {
  const out: T[] = [];
  const used = new Set<number>();
  let s = seed;
  while (out.length < n && used.size < arr.length) {
    s = (s * 9301 + 49297) % 233280;
    const idx = Math.floor((s / 233280) * arr.length);
    if (!used.has(idx)) { used.add(idx); out.push(arr[idx]); }
  }
  return out;
}

const NAMES: Array<[string, string, string[]]> = [
  ["Catan", "Klaus Teuber", ["Strategy", "Family"]],
  ["Wingspan", "Elizabeth Hargrave", ["Strategy", "Family"]],
  ["Pandemic", "Matt Leacock", ["Cooperative", "Strategy"]],
  ["Codenames", "Vlaada Chvátil", ["Party", "Deduction"]],
  ["Azul", "Michael Kiesling", ["Abstract", "Family"]],
  ["7 Wonders", "Antoine Bauza", ["Strategy", "Auction"]],
  ["Ticket to Ride", "Alan R. Moon", ["Family", "Strategy"]],
  ["Carcassonne", "Klaus-Jürgen Wrede", ["Family", "Abstract"]],
  ["Scythe", "Jamey Stegmaier", ["Strategy", "Worker Placement", "Thematic"]],
  ["Terraforming Mars", "Jacob Fryxelius", ["Strategy", "Thematic"]],
  ["Gloomhaven", "Isaac Childres", ["Cooperative", "Thematic", "Legacy"]],
  ["Splendor", "Marc André", ["Strategy", "Family"]],
  ["Dixit", "Jean-Louis Roubira", ["Party", "Family"]],
  ["The Crew", "Thomas Sing", ["Cooperative", "Strategy"]],
  ["Spirit Island", "R. Eric Reuss", ["Cooperative", "Strategy", "Thematic"]],
  ["Brass: Birmingham", "Wallace/Schwarz", ["Strategy", "Worker Placement"]],
  ["Cascadia", "Randy Flynn", ["Family", "Abstract"]],
  ["Everdell", "James A. Wilson", ["Strategy", "Worker Placement"]],
  ["Root", "Cole Wehrle", ["Strategy", "Thematic", "Wargame"]],
  ["Power Grid", "Friedemann Friese", ["Strategy", "Auction"]],
  ["Dominion", "Donald X. Vaccarino", ["Deck Builder", "Strategy"]],
  ["Concordia", "Mac Gerdts", ["Strategy", "Deck Builder"]],
  ["Lost Ruins of Arnak", "Min/Rozek", ["Strategy", "Worker Placement", "Deck Builder"]],
  ["Ark Nova", "Mathias Wigge", ["Strategy", "Thematic"]],
  ["Cosmic Encounter", "Bill Eberle", ["Party", "Strategy"]],
  ["King of Tokyo", "Richard Garfield", ["Family", "Party"]],
  ["Sushi Go!", "Phil Walker-Harding", ["Family", "Party"]],
  ["Just One", "Bombyx", ["Party", "Cooperative"]],
  ["Telestrations", "USAopoly", ["Party", "Silly"]],
  ["Wavelength", "Wolfgang Warsch", ["Party", "Deduction"]],
  ["Decrypto", "Thomas Dagenais-Lespérance", ["Party", "Deduction"]],
  ["The Mind", "Wolfgang Warsch", ["Cooperative", "Party"]],
  ["Hanabi", "Antoine Bauza", ["Cooperative", "Abstract"]],
  ["Forbidden Island", "Matt Leacock", ["Cooperative", "Family"]],
  ["Forbidden Desert", "Matt Leacock", ["Cooperative", "Family"]],
  ["Mysterium", "Oleksandr Nevskiy", ["Cooperative", "Deduction"]],
  ["Sherlock Holmes", "Various", ["Cooperative", "Deduction"]],
  ["Detective", "Ignacy Trzewiczek", ["Cooperative", "Deduction"]],
  ["Risk", "Albert Lamorisse", ["Wargame", "Strategy"]],
  ["Twilight Imperium", "Christian T. Petersen", ["Wargame", "Strategy", "Thematic"]],
  ["Star Wars Rebellion", "Corey Konieczka", ["Wargame", "Thematic"]],
  ["War of the Ring", "Roberto Di Meglio", ["Wargame", "Thematic"]],
  ["Memoir '44", "Richard Borg", ["Wargame", "Strategy"]],
  ["Pax Pamir", "Cole Wehrle", ["Strategy", "Wargame"]],
  ["Ra", "Reiner Knizia", ["Auction", "Strategy"]],
  ["Modern Art", "Reiner Knizia", ["Auction", "Strategy"]],
  ["Welcome To...", "Benoit Turpin", ["Roll & Write", "Family"]],
  ["Railroad Ink", "Hjalmar Hach", ["Roll & Write", "Family"]],
  ["Cartographers", "Jordy Adan", ["Roll & Write", "Family"]],
  ["Fleet: The Dice Game", "Ben Pinchback", ["Roll & Write", "Strategy"]],
  ["Pandemic Legacy", "Daviau/Leacock", ["Cooperative", "Legacy", "Thematic"]],
  ["Charterstone", "Jamey Stegmaier", ["Legacy", "Strategy"]],
  ["My City", "Reiner Knizia", ["Legacy", "Family"]],
  ["Flick 'em Up!", "Jean Yves Monpertuis", ["Dexterity", "Family"]],
  ["Crokinole", "Eckhardt Wettlaufer", ["Dexterity", "Family", "Abstract"]],
  ["Klask", "Mikkel Bertelsen", ["Dexterity", "Party"]],
  ["Junk Art", "Pierluca Zizzi", ["Dexterity", "Family"]],
  ["Trivial Pursuit", "Scott Abbott", ["Trivia", "Party"]],
  ["Wits & Wagers", "Dominic Crapuchettes", ["Trivia", "Party"]],
  ["Anomia", "Andrew Innes", ["Party", "Trivia"]],
  ["Chess", "Classic", ["Abstract", "Strategy"]],
  ["Go", "Classic", ["Abstract", "Strategy"]],
  ["Hive", "John Yianni", ["Abstract", "Strategy"]],
  ["Patchwork", "Uwe Rosenberg", ["Abstract", "Family"]],
  ["Tigris & Euphrates", "Reiner Knizia", ["Strategy", "Abstract"]],
  ["Agricola", "Uwe Rosenberg", ["Worker Placement", "Strategy"]],
  ["Caverna", "Uwe Rosenberg", ["Worker Placement", "Strategy"]],
  ["Viticulture", "Jamey Stegmaier", ["Worker Placement", "Strategy"]],
  ["Tzolk'in", "Daniele Tascini", ["Worker Placement", "Strategy"]],
  ["Lords of Waterdeep", "Peter Lee", ["Worker Placement", "Strategy", "Thematic"]],
  ["Star Realms", "Robert Dougherty", ["Deck Builder", "Strategy"]],
  ["Legendary", "Devin Low", ["Deck Builder", "Cooperative"]],
  ["Marvel Champions", "Caleb Grace", ["Deck Builder", "Cooperative", "Thematic"]],
  ["Aeon's End", "Kevin Riley", ["Deck Builder", "Cooperative"]],
  ["Clank!", "Paul Dennen", ["Deck Builder", "Strategy"]],
  ["Eldritch Horror", "Corey Konieczka", ["Cooperative", "Thematic"]],
  ["Arkham Horror", "Richard Launius", ["Cooperative", "Thematic"]],
  ["Mansions of Madness", "Nikki Valens", ["Cooperative", "Thematic"]],
  ["Betrayal at House on the Hill", "Bruce Glassco", ["Thematic", "Cooperative"]],
  ["Dead of Winter", "Vega/Gilmour", ["Cooperative", "Thematic"]],
  ["Robinson Crusoe", "Ignacy Trzewiczek", ["Cooperative", "Thematic"]],
  ["Camel Up", "Steffen Bogen", ["Family", "Party"]],
  ["Snake Oil", "Jeff Ochs", ["Party", "Silly"]],
  ["Spyfall", "Alexandr Ushan", ["Party", "Deduction"]],
  ["Resistance", "Don Eskridge", ["Party", "Deduction"]],
  ["Avalon", "Don Eskridge", ["Party", "Deduction"]],
  ["One Night Werewolf", "Akihisa Okui", ["Party", "Deduction"]],
  ["Secret Hitler", "Mac Schubert", ["Party", "Deduction"]],
  ["Photosynthesis", "Hjalmar Hach", ["Strategy", "Family"]],
  ["Tokaido", "Antoine Bauza", ["Family", "Abstract"]],
  ["Takenoko", "Antoine Bauza", ["Family", "Strategy"]],
  ["Kingdomino", "Bruno Cathala", ["Family", "Abstract"]],
  ["Quacks of Quedlinburg", "Wolfgang Warsch", ["Family", "Strategy"]],
  ["My Little Scythe", "Hoffman/Loring", ["Family", "Strategy"]],
  ["Mysterium Park", "Oleksandr Nevskiy", ["Cooperative", "Family"]],
  ["Exit: The Game", "Inka & Markus Brand", ["Cooperative", "Deduction"]],
  ["Unlock!", "Cyril Demaegd", ["Cooperative", "Deduction"]],
  ["Decked Out", "Various", ["Deck Builder", "Family"]],
  ["Coup", "Rikki Tahta", ["Party", "Deduction"]],
  ["Love Letter", "Seiji Kanai", ["Party", "Deduction"]],
  ["For Sale", "Stefan Dorra", ["Auction", "Family"]],
  ["High Society", "Reiner Knizia", ["Auction", "Family"]],
  ["Furnace", "Ivan Lashin", ["Auction", "Strategy"]],
  ["Galaxy Trucker", "Vlaada Chvátil", ["Strategy", "Thematic"]],
  ["Through the Ages", "Vlaada Chvátil", ["Strategy"]],
  ["Mage Knight", "Vlaada Chvátil", ["Strategy", "Thematic"]],
];

/* ─── Detail content generators ─────────────────────────────────────────── */

const MECHANICS_BY_CAT: Record<string, string[]> = {
  Strategy: ["Engine building — early actions compound into later power", "Tight action economy: every turn counts", "Long-term planning rewarded over luck"],
  Family: ["Simple, teachable rules with a shared goal", "Light decisions that keep everyone included", "Quick turns to minimize downtime"],
  Party: ["Fast, social rounds built for a crowd", "Communication and reading the room drive scoring", "Plays best with laughter and a full table"],
  Cooperative: ["Players win or lose together against the game", "Shared information and joint planning each round", "An escalating threat that pushes the team"],
  Deduction: ["Hidden information you piece together from clues", "Bluffing and reading opponents matters", "Deduce the truth before your rivals do"],
  "Worker Placement": ["Assign limited workers to action spaces", "Spaces block once claimed — timing is everything", "Convert gathered resources into victory points"],
  "Deck Builder": ["Start with a weak deck and improve it over time", "Buy stronger cards from a shared market", "Thin and tune your deck for reliable combos"],
  "Roll & Write": ["Roll dice, then mark results on your own sheet", "Everyone plays simultaneously — no downtime", "Optimize a personal grid or track for points"],
  Abstract: ["Pure strategy with no hidden information", "Elegant rules, deep decision space", "Positional play and pattern building"],
  Thematic: ["Story and setting drive the decisions", "Rich, immersive world with narrative arcs", "Rules bend to serve the theme"],
  Wargame: ["Area control across a contested map", "Manage forces, supply, and positioning", "Direct conflict decides the outcome"],
  Legacy: ["The game permanently changes across sessions", "Choices carry forward into future plays", "Unlock new content as a campaign unfolds"],
  Dexterity: ["Physical skill — flick, stack, or balance pieces", "Steady hands beat deep strategy", "Tense, tactile moments at the table"],
  Auction: ["Bid for goods against your opponents", "Judge true value versus what rivals will pay", "Manage a tight budget across rounds"],
  Trivia: ["Answer questions to earn points", "Broad knowledge and quick recall reward players", "Wager or guess when unsure"],
};

const MOOD_PHRASE: Record<string, string> = {
  Cozy: "warm and low-stakes",
  Cutthroat: "sharp and competitive",
  Brainy: "cerebral and demanding",
  Silly: "loud and lighthearted",
  Tense: "nail-bitingly tense",
  Chill: "relaxed and easygoing",
  Epic: "sweeping and ambitious",
};

function weightWord(w: number): string {
  if (w < 2) return "light";
  if (w < 3) return "light-to-medium";
  if (w < 4) return "medium-heavy";
  return "heavy";
}

function buildBackground(name: string, designer: string, year: number, cats: string[], moods: string[]): string {
  const vibe = moods.map((m) => MOOD_PHRASE[m] ?? m.toLowerCase()).join(" and ");
  return `${name} is a ${cats[0].toLowerCase()} game designed by ${designer} and first published in ${year}. It has earned a lasting place at tables for its ${vibe} feel, blending ${cats.map((c) => c.toLowerCase()).join(", ")} into a single cohesive experience. Whether you are new to the hobby or a seasoned player, ${name} offers a session that is easy to appreciate and rewarding to master.`;
}

function buildGameplay(name: string, minP: number, maxP: number, playMinutes: number, learnMinutes: number, weight: number, cats: string[]): string {
  const players = minP === maxP ? `${minP} players` : `${minP}–${maxP} players`;
  return `A game of ${name} plays in about ${playMinutes} minutes with ${players}. Expect roughly ${learnMinutes} minutes to teach thanks to its ${weightWord(weight)} complexity (${weight.toFixed(1)}/5). Turns center on ${cats[0].toLowerCase()} decisions, and as the game progresses your early choices in ${cats[cats.length - 1].toLowerCase()} begin to pay off, building toward a satisfying final stretch where every point matters.`;
}

function buildObjective(cats: string[]): string {
  if (cats.includes("Cooperative")) return "Work together as a team to overcome the game before it beats you all.";
  if (cats.includes("Deduction")) return "Uncover hidden information and outwit your opponents to come out ahead.";
  if (cats.includes("Wargame")) return "Command your forces, control the map, and outmaneuver your rivals for victory.";
  if (cats.includes("Auction")) return "Spend wisely, win the right lots, and finish with the most valuable position.";
  return "Score more points than your opponents by the end of the game.";
}

function buildMechanics(cats: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const c of cats) {
    for (const m of MECHANICS_BY_CAT[c] ?? []) {
      if (!seen.has(m)) { seen.add(m); out.push(m); }
    }
  }
  return out.slice(0, 5);
}

export const GAMES: Game[] = NAMES.map((row, i) => {
  const [name, designer, baseCats] = row;
  const seed = i * 17 + 3;
  const weight = 1 + ((seed * 7) % 40) / 10; // 1.0–4.9
  const minP = 1 + (seed % 3); // 1-3
  const maxP = minP + 1 + (seed % 5);
  const minAge = [6, 8, 10, 12, 14][seed % 5];
  const playMinutes = [15, 30, 45, 60, 90, 120, 180][seed % 7];
  const learnMinutes = Math.max(5, Math.round(playMinutes / 6 + (seed % 10)));
  const rating = 6.5 + ((seed * 13) % 35) / 10;
  const primaryCat = baseCats[0];
  const pool = IMAGE_POOL[primaryCat] ?? FALLBACK_IMAGES;
  const image = pool[seed % pool.length];
  return {
    id: `g${i + 1}`,
    name,
    designer,
    year: 1995 + (seed % 30),
    categories: Array.from(new Set([...baseCats, ...pick(CATS, 1, seed)])),
    minPlayers: minP,
    maxPlayers: maxP,
    minAge,
    weight: Math.round(weight * 10) / 10,
    playMinutes,
    learnMinutes,
    rating: Math.round(rating * 10) / 10,
    mood: pick(MOODS, 2, seed + 5),
    cover: COVERS[i % COVERS.length],
    image,
    blurb: `${baseCats[0]} game by ${designer}. A standout ${baseCats[baseCats.length - 1].toLowerCase()} experience.`,
    background: buildBackground(name, designer, 1995 + (seed % 30), baseCats, pick(MOODS, 2, seed + 5)),
    gameplay: buildGameplay(name, minP, maxP, playMinutes, learnMinutes, Math.round(weight * 10) / 10, baseCats),
    objective: buildObjective(baseCats),
    mechanics: buildMechanics(baseCats),
  };
});

export const ALL_CATEGORIES = CATS;
export const ALL_MOODS = MOODS;
