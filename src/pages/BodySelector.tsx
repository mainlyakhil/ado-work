import { ChevronLeft, Dumbbell, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";

const bodyParts = [
  { id: "chest", label: "Chest" }, { id: "shoulders", label: "Shoulders" },
  { id: "arms", label: "Arms" }, { id: "forearms", label: "Forearms" },
  { id: "back", label: "Back" }, { id: "lats", label: "Lats" },
  { id: "core", label: "Core" }, { id: "obliques", label: "Obliques" },
  { id: "glutes", label: "Glutes" }, { id: "hip-flexors", label: "Hip Flexors" },
  { id: "hamstrings", label: "Hamstrings" }, { id: "legs", label: "Quads" },
  { id: "calves", label: "Calves" }, { id: "neck", label: "Neck" },
  { id: "traps", label: "Traps" }, { id: "rear-delts", label: "Rear Delts" },
  { id: "lower-back", label: "Lower Back" },
];

const equipmentList = [
  { id: "none", emoji: "🤸", label: "No Equipment", desc: "Bodyweight only" },
  { id: "dumbbells", emoji: "🏋️", label: "Dumbbells", desc: "Adjustable weights" },
  { id: "barbell", emoji: "🏋️‍♂️", label: "Barbell", desc: "Olympic bar + plates" },
  { id: "bands", emoji: "🔗", label: "Resistance Bands", desc: "Elastic training" },
  { id: "kettlebell", emoji: "⚙️", label: "Kettlebell", desc: "Swing & press" },
  { id: "pullup-bar", emoji: "🔩", label: "Pull-up Bar", desc: "Doorframe mount" },
  { id: "machine", emoji: "🏗️", label: "Gym Machines", desc: "Full gym access" },
  { id: "cables", emoji: "🔌", label: "Cables", desc: "Cable station" },
];

interface NoEquipWorkout {
  id: string; name: string; bodyPart: string; duration: string; reps: string;
  color: string; emoji: string; description: string; steps: string[];
}

const noEquipWorkouts: NoEquipWorkout[] = [
  { id: "1", name: "Push-Up Variations", bodyPart: "chest", duration: "15 min", reps: "4×15", color: "from-red-500/20 to-orange-500/20", emoji: "💪", description: "Diamond, wide, decline, archer push-ups", steps: ["10 Wide Push-ups", "10 Diamond Push-ups", "8 Decline Push-ups", "6 Archer Push-ups (each)"] },
  { id: "2", name: "Pistol Squat Flow", bodyPart: "legs", duration: "20 min", reps: "3×8 each", color: "from-blue-500/20 to-cyan-500/20", emoji: "🦵", description: "Single-leg strength builder", steps: ["Assisted Pistol Squats 3×8", "Bulgarian Split Squats 3×10", "Jump Squats 3×12", "Wall Sit 3×45s"] },
  { id: "3", name: "Plank Universe", bodyPart: "core", duration: "12 min", reps: "5 rounds", color: "from-yellow-500/20 to-amber-500/20", emoji: "🔥", description: "Every plank variation you need", steps: ["Front Plank 60s", "Side Plank 30s each", "Plank Shoulder Taps 20", "Plank Jacks 15", "Up-Down Plank 10"] },
  { id: "4", name: "Handstand Prep", bodyPart: "shoulders", duration: "18 min", reps: "4 rounds", color: "from-purple-500/20 to-pink-500/20", emoji: "🤸", description: "Build shoulder strength for handstands", steps: ["Pike Push-ups 3×10", "Wall Walks 3×5", "Shoulder Taps (Wall) 3×10", "L-Sit Hold 3×20s"] },
  { id: "5", name: "Superman Series", bodyPart: "back", duration: "15 min", reps: "4 rounds", color: "from-green-500/20 to-emerald-500/20", emoji: "🦸", description: "Strengthen your posterior chain", steps: ["Superman Hold 4×30s", "Reverse Snow Angels 3×12", "Prone Y Raises 3×15", "Bird Dog 3×10 each"] },
  { id: "6", name: "Burpee Blitz", bodyPart: "full", duration: "10 min", reps: "AMRAP", color: "from-red-600/20 to-rose-500/20", emoji: "💥", description: "Maximum calorie burn, no equipment", steps: ["Burpees ×10", "Mountain Climbers ×20", "High Knees ×30", "Rest 30s", "Repeat 4 rounds"] },
  { id: "7", name: "Tricep Destroyer", bodyPart: "arms", duration: "12 min", reps: "4 rounds", color: "from-indigo-500/20 to-violet-500/20", emoji: "💎", description: "Bodyweight tricep isolation", steps: ["Close-Grip Push-ups 3×15", "Bench Dips 3×12", "Diamond Push-ups 3×10", "Tricep Plank 3×30s"] },
  { id: "8", name: "Calf Raises Circuit", bodyPart: "calves", duration: "10 min", reps: "5×20", color: "from-teal-500/20 to-sky-500/20", emoji: "🏔️", description: "Single & double leg raises", steps: ["Double Calf Raises 5×20", "Single Leg Raises 3×15 each", "Jump Rope (Imaginary) 3×30s", "Toe Walks 2×30s"] },
  { id: "9", name: "Glute Bridge Flow", bodyPart: "glutes", duration: "15 min", reps: "4 rounds", color: "from-pink-500/20 to-fuchsia-500/20", emoji: "🍑", description: "Build and activate your glutes", steps: ["Glute Bridges 4×15", "Single Leg Bridges 3×10 each", "Donkey Kicks 3×15 each", "Fire Hydrants 3×12 each"] },
  { id: "10", name: "Neck Resistance", bodyPart: "neck", duration: "8 min", reps: "3 rounds", color: "from-stone-500/20 to-zinc-500/20", emoji: "🦴", description: "Self-resisted neck strengthening", steps: ["Neck Flexion (Hand Resist) 3×10", "Neck Extension 3×10", "Lateral Flexion 3×10 each", "Neck Circles 2×10"] },
  { id: "11", name: "Bear Crawl HIIT", bodyPart: "full", duration: "14 min", reps: "4 rounds", color: "from-orange-500/20 to-yellow-500/20", emoji: "🐻", description: "Full body animal flow workout", steps: ["Bear Crawl 30s", "Crab Walk 30s", "Frog Jumps ×10", "Inchworms ×8", "Duck Walk 20s"] },
  { id: "12", name: "Wall Workout", bodyPart: "full", duration: "16 min", reps: "3 rounds", color: "from-cyan-500/20 to-blue-500/20", emoji: "🧱", description: "Only need a wall for full body burn", steps: ["Wall Sit 60s", "Wall Push-ups 3×15", "Wall Angels 3×12", "Single Leg Wall Sit 3×20s each"] },
  { id: "13", name: "Nordic Hamstring Flow", bodyPart: "hamstrings", duration: "15 min", reps: "4 rounds", color: "from-emerald-500/20 to-green-500/20", emoji: "🦵", description: "Bodyweight hamstring strength", steps: ["Nordic Curls (Assisted) 3×5", "Single Leg RDL 3×10 each", "Glute-Ham Walk Out 3×8", "Good Morning Stretch 3×15"] },
  { id: "14", name: "Lower Back Relief", bodyPart: "lower-back", duration: "12 min", reps: "3 rounds", color: "from-amber-500/20 to-orange-500/20", emoji: "🔙", description: "Strengthen and mobilize", steps: ["Cat-Cow 2×15", "Bird Dog 3×10 each", "Superman Hold 3×30s", "Pelvic Tilts 3×15"] },
  { id: "15", name: "Hip Flexor Unlock", bodyPart: "hip-flexors", duration: "10 min", reps: "3 rounds", color: "from-violet-500/20 to-purple-500/20", emoji: "🧘", description: "Open tight hip flexors", steps: ["Kneeling Lunge Stretch 2×30s each", "Leg Swings 3×15 each", "Couch Stretch 2×45s each", "Psoas March 3×12 each"] },
];

const BodySelector = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [step, setStep] = useState<"body" | "equipment" | "noequip">("body");
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);
  const [bouncingId, setBouncingId] = useState<string | null>(null);
  const [animatingPart, setAnimatingPart] = useState<string | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handlePartClick = (id: string) => {
    setAnimatingPart(id);
    setBouncingId(id);
    setTimeout(() => {
      setSelectedPart(id);
      setBouncingId(null);
      setTimeout(() => {
        setAnimatingPart(null);
        setStep("equipment");
      }, 400);
    }, 300);
  };

  const handleEquipmentClick = (id: string) => {
    setBouncingId(id);
    setTimeout(() => {
      setBouncingId(null);
      if (id === "none") { setStep("noequip"); } else {
        const routeMap: Record<string, string> = {
          "lats": "back", "obliques": "core", "hip-flexors": "legs",
          "hamstrings": "legs", "rear-delts": "shoulders", "lower-back": "back",
        };
        navigate(`/body/${routeMap[selectedPart || ""] || selectedPart}`);
      }
    }, 300);
  };

  const suggestedEquip = selectedPart
    ? selectedPart === "legs" || selectedPart === "glutes" || selectedPart === "hamstrings" || selectedPart === "hip-flexors" ? ["none", "barbell", "bands", "kettlebell"]
      : selectedPart === "back" || selectedPart === "lats" || selectedPart === "lower-back" ? ["pullup-bar", "dumbbells", "barbell", "cables"]
        : selectedPart === "chest" ? ["none", "dumbbells", "barbell", "cables"]
          : ["none", "dumbbells", "bands", "kettlebell"]
    : [];

  const filteredNoEquip = selectedPart
    ? noEquipWorkouts.filter(w => w.bodyPart === selectedPart || w.bodyPart === "full")
    : noEquipWorkouts;

  // SVG styling helpers
  const partState = (id: string) => {
    if (animatingPart === id || bouncingId === id) return "active";
    if (selectedPart === id) return "selected";
    if (hoveredPart === id) return "hovered";
    return "idle";
  };

  const fillFor = (id: string) => {
    const s = partState(id);
    if (s === "active") return "hsl(var(--primary) / 0.6)";
    if (s === "selected") return "hsl(var(--primary) / 0.35)";
    if (s === "hovered") return "hsl(var(--primary) / 0.2)";
    return "hsl(var(--muted) / 0.5)";
  };

  const strokeFor = (id: string) => {
    const s = partState(id);
    if (s === "active") return "hsl(var(--primary))";
    if (s === "selected") return "hsl(var(--primary) / 0.8)";
    if (s === "hovered") return "hsl(var(--primary) / 0.6)";
    return "hsl(var(--primary) / 0.2)";
  };

  const strokeW = (id: string) => {
    const s = partState(id);
    return s === "active" ? 2.5 : s === "selected" ? 2 : s === "hovered" ? 1.5 : 0.8;
  };

  const scaleFor = (id: string) => {
    const s = partState(id);
    return s === "active" ? "scale(1.06)" : s === "selected" ? "scale(1.03)" : "scale(1)";
  };

  const glowFilter = (id: string) => {
    const s = partState(id);
    if (s === "active") return "drop-shadow(0 0 8px hsl(var(--primary) / 0.7))";
    if (s === "selected") return "drop-shadow(0 0 5px hsl(var(--primary) / 0.4))";
    return "none";
  };

  const partProps = (id: string) => ({
    onClick: () => handlePartClick(id),
    onMouseEnter: () => setHoveredPart(id),
    onMouseLeave: () => setHoveredPart(null),
    style: {
      cursor: "pointer",
      fill: fillFor(id),
      stroke: strokeFor(id),
      strokeWidth: strokeW(id),
      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      transform: scaleFor(id),
      transformOrigin: "center",
      filter: glowFilter(id),
    } as React.CSSProperties,
  });

  // Label line data: from body part center to label position
  const labelData: { id: string; label: string; cx: number; cy: number; lx: number; ly: number; align: "left" | "right" }[] = [
    { id: "neck", label: "Neck", cx: 100, cy: 58, lx: 160, ly: 50, align: "right" },
    { id: "traps", label: "Traps", cx: 100, cy: 72, lx: 160, ly: 68, align: "right" },
    { id: "shoulders", label: "Shoulders", cx: 60, cy: 88, lx: 10, ly: 80, align: "left" },
    { id: "chest", label: "Chest", cx: 100, cy: 102, lx: 160, ly: 100, align: "right" },
    { id: "arms", label: "Arms", cx: 44, cy: 118, lx: 4, ly: 114, align: "left" },
    { id: "back", label: "Back", cx: 100, cy: 110, lx: 160, ly: 118, align: "right" },
    { id: "lats", label: "Lats", cx: 72, cy: 118, lx: 10, ly: 132, align: "left" },
    { id: "core", label: "Core", cx: 100, cy: 140, lx: 160, ly: 138, align: "right" },
    { id: "obliques", label: "Obliques", cx: 78, cy: 138, lx: 10, ly: 150, align: "left" },
    { id: "forearms", label: "Forearms", cx: 40, cy: 154, lx: 4, ly: 168, align: "left" },
    { id: "lower-back", label: "Lower Back", cx: 100, cy: 158, lx: 160, ly: 156, align: "right" },
    { id: "hip-flexors", label: "Hip Flexors", cx: 90, cy: 178, lx: 10, ly: 182, align: "left" },
    { id: "glutes", label: "Glutes", cx: 100, cy: 192, lx: 160, ly: 176, align: "right" },
    { id: "legs", label: "Quads", cx: 86, cy: 230, lx: 10, ly: 224, align: "left" },
    { id: "hamstrings", label: "Hamstrings", cx: 114, cy: 230, lx: 170, ly: 218, align: "right" },
    { id: "calves", label: "Calves", cx: 84, cy: 298, lx: 10, ly: 296, align: "left" },
    { id: "rear-delts", label: "Rear Delts", cx: 140, cy: 88, lx: 170, ly: 86, align: "right" },
  ];

  const activeLabel = labelData.find(l => l.id === (hoveredPart || selectedPart || animatingPart));

  const BodyModel = () => (
    <svg viewBox="0 0 200 370" className="w-full h-full">
      <defs>
        <radialGradient id="bodyAura" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.06" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ambient background aura */}
      <ellipse cx="100" cy="180" rx="90" ry="170" fill="url(#bodyAura)" />

      {/* === WIREFRAME BODY STRUCTURE === */}

      {/* Head */}
      <ellipse cx="100" cy="28" rx="14" ry="18" fill="none" stroke="hsl(var(--primary) / 0.25)" strokeWidth="1.2">
        <animate attributeName="ry" values="18;18.5;18" dur="3s" repeatCount="indefinite" />
      </ellipse>
      {/* Face lines */}
      <line x1="95" y1="24" x2="95" y2="26" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.8" />
      <line x1="105" y1="24" x2="105" y2="26" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.8" />
      <path d="M96 32 Q100 35 104 32" fill="none" stroke="hsl(var(--primary) / 0.12)" strokeWidth="0.6" />

      {/* Neck */}
      <rect x="91" y="46" width="18" height="14" rx="4" {...partProps("neck")} />

      {/* Traps */}
      <path d="M76 66 L91 54 L100 52 L109 54 L124 66 L120 76 L80 76 Z" {...partProps("traps")} />

      {/* Shoulders */}
      <ellipse cx="60" cy="82" rx="20" ry="13" {...partProps("shoulders")} />
      <ellipse cx="140" cy="82" rx="20" ry="13" {...partProps("shoulders")} />

      {/* Rear Delts - arcs */}
      <path d="M42 78 Q50 70 58 78" fill="none" {...partProps("rear-delts")} />
      <path d="M142 78 Q150 70 158 78" fill="none" {...partProps("rear-delts")} />

      {/* Chest - two pec slabs */}
      <path d="M80 82 L98 82 L96 112 Q88 118 80 108 Z" {...partProps("chest")} />
      <path d="M102 82 L120 82 L120 108 Q112 118 104 112 Z" {...partProps("chest")} />
      {/* Chest separation line */}
      <line x1="100" y1="82" x2="100" y2="115" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.5" />

      {/* Back - invisible hitbox */}
      <rect x="82" y="84" width="36" height="26" rx="4" opacity="0" {...partProps("back")} />

      {/* Lats */}
      <path d="M72 92 L80 92 L80 142 L76 154 L70 140 Z" {...partProps("lats")} />
      <path d="M120 92 L128 92 L130 140 L124 154 L120 142 Z" {...partProps("lats")} />

      {/* Arms / Biceps */}
      <path d="M42 90 Q36 106 36 120 Q38 134 44 138 L54 138 Q58 128 56 114 Q54 102 50 90 Z" {...partProps("arms")}>
        <animate attributeName="d" values="M42 90 Q36 106 36 120 Q38 134 44 138 L54 138 Q58 128 56 114 Q54 102 50 90 Z;M42 89 Q35 105 35 119 Q37 133 43 137 L53 137 Q57 127 55 113 Q53 101 49 89 Z;M42 90 Q36 106 36 120 Q38 134 44 138 L54 138 Q58 128 56 114 Q54 102 50 90 Z" dur="4s" repeatCount="indefinite" />
      </path>
      <path d="M150 90 Q156 106 156 120 Q154 134 148 138 L138 138 Q134 128 136 114 Q138 102 142 90 Z" {...partProps("arms")}>
        <animate attributeName="d" values="M150 90 Q156 106 156 120 Q154 134 148 138 L138 138 Q134 128 136 114 Q138 102 142 90 Z;M151 89 Q157 105 157 119 Q155 133 149 137 L139 137 Q135 127 137 113 Q139 101 143 89 Z;M150 90 Q156 106 156 120 Q154 134 148 138 L138 138 Q134 128 136 114 Q138 102 142 90 Z" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Forearms */}
      <path d="M44 142 Q40 160 38 178 L50 178 Q52 164 52 146 Z" {...partProps("forearms")} />
      <path d="M148 142 Q152 160 154 178 L142 178 Q140 164 140 146 Z" {...partProps("forearms")} />

      {/* Hands */}
      <ellipse cx="44" cy="186" rx="7" ry="8" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.6" />
      <ellipse cx="148" cy="186" rx="7" ry="8" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.6" />

      {/* Core / Abs */}
      <rect x="86" y="118" width="28" height="42" rx="4" {...partProps("core")} />
      {/* Ab grid */}
      <line x1="100" y1="120" x2="100" y2="158" stroke="hsl(var(--primary) / 0.12)" strokeWidth="0.5" />
      <line x1="88" y1="130" x2="112" y2="130" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.4" />
      <line x1="88" y1="140" x2="112" y2="140" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.4" />
      <line x1="88" y1="150" x2="112" y2="150" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.4" />

      {/* Obliques */}
      <path d="M78 118 L86 118 L84 162 L76 150 Z" {...partProps("obliques")} />
      <path d="M114 118 L122 118 L124 150 L116 162 Z" {...partProps("obliques")} />

      {/* Lower Back */}
      <rect x="88" y="152" width="24" height="14" rx="3" {...partProps("lower-back")} />

      {/* Hip Flexors */}
      <ellipse cx="88" cy="176" rx="9" ry="7" {...partProps("hip-flexors")} />
      <ellipse cx="112" cy="176" rx="9" ry="7" {...partProps("hip-flexors")} />

      {/* Glutes */}
      <ellipse cx="90" cy="192" rx="15" ry="12" {...partProps("glutes")} />
      <ellipse cx="110" cy="192" rx="15" ry="12" {...partProps("glutes")} />

      {/* Quads */}
      <path d="M74 204 Q72 234 72 262 L92 262 Q94 244 94 224 Q92 212 88 204 Z" {...partProps("legs")}>
        <animate attributeName="d" values="M74 204 Q72 234 72 262 L92 262 Q94 244 94 224 Q92 212 88 204 Z;M74 203 Q71 233 71 261 L91 261 Q93 243 93 223 Q91 211 87 203 Z;M74 204 Q72 234 72 262 L92 262 Q94 244 94 224 Q92 212 88 204 Z" dur="5s" repeatCount="indefinite" />
      </path>
      <path d="M112 204 Q108 234 108 262 L128 262 Q130 244 130 224 Q128 212 126 204 Z" {...partProps("legs")}>
        <animate attributeName="d" values="M112 204 Q108 234 108 262 L128 262 Q130 244 130 224 Q128 212 126 204 Z;M112 203 Q107 233 107 261 L127 261 Q129 243 129 223 Q127 211 125 203 Z;M112 204 Q108 234 108 262 L128 262 Q130 244 130 224 Q128 212 126 204 Z" dur="5s" repeatCount="indefinite" />
      </path>
      {/* Quad separation lines */}
      <line x1="82" y1="212" x2="82" y2="258" stroke="hsl(var(--primary) / 0.08)" strokeWidth="0.4" />
      <line x1="118" y1="212" x2="118" y2="258" stroke="hsl(var(--primary) / 0.08)" strokeWidth="0.4" />

      {/* Hamstrings */}
      <path d="M74 206 L72 204 L70 244 L74 258 L78 244 Z" {...partProps("hamstrings")} />
      <path d="M126 206 L128 204 L130 244 L126 258 L122 244 Z" {...partProps("hamstrings")} />

      {/* Calves */}
      <path d="M74 266 Q72 284 72 304 Q74 322 82 326 L92 326 Q96 316 94 296 Q92 278 90 266 Z" {...partProps("calves")}>
        <animate attributeName="d" values="M74 266 Q72 284 72 304 Q74 322 82 326 L92 326 Q96 316 94 296 Q92 278 90 266 Z;M74 265 Q71 283 71 303 Q73 321 81 325 L91 325 Q95 315 93 295 Q91 277 89 265 Z;M74 266 Q72 284 72 304 Q74 322 82 326 L92 326 Q96 316 94 296 Q92 278 90 266 Z" dur="4.5s" repeatCount="indefinite" />
      </path>
      <path d="M110 266 Q108 284 108 304 Q110 322 118 326 L128 326 Q132 316 130 296 Q128 278 126 266 Z" {...partProps("calves")}>
        <animate attributeName="d" values="M110 266 Q108 284 108 304 Q110 322 118 326 L128 326 Q132 316 130 296 Q128 278 126 266 Z;M110 265 Q107 283 107 303 Q109 321 117 325 L127 325 Q131 315 129 295 Q127 277 125 265 Z;M110 266 Q108 284 108 304 Q110 322 118 326 L128 326 Q132 316 130 296 Q128 278 126 266 Z" dur="4.5s" repeatCount="indefinite" />
      </path>

      {/* Feet */}
      <ellipse cx="82" cy="336" rx="12" ry="5" fill="none" stroke="hsl(var(--primary) / 0.12)" strokeWidth="0.6" />
      <ellipse cx="118" cy="336" rx="12" ry="5" fill="none" stroke="hsl(var(--primary) / 0.12)" strokeWidth="0.6" />

      {/* === LABEL LINE + TEXT for active/hovered/selected part === */}
      {activeLabel && (
        <g className="animate-fade-in" style={{ transition: "all 0.3s ease" }}>
          {/* Connector line */}
          <line
            x1={activeLabel.cx} y1={activeLabel.cy}
            x2={activeLabel.lx} y2={activeLabel.ly}
            stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" opacity="0.7"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
          </line>
          {/* Dot at muscle */}
          <circle cx={activeLabel.cx} cy={activeLabel.cy} r="3" fill="hsl(var(--primary))" opacity="0.9">
            <animate attributeName="r" values="3;4;3" dur="1.2s" repeatCount="indefinite" />
          </circle>
          {/* Label background */}
          <rect
            x={activeLabel.align === "left" ? activeLabel.lx - 4 : activeLabel.lx - 2}
            y={activeLabel.ly - 8}
            width={activeLabel.label.length * 6.5 + 10}
            height="16" rx="4"
            fill="hsl(var(--primary))" opacity="0.9"
          />
          {/* Label text */}
          <text
            x={activeLabel.align === "left" ? activeLabel.lx + 1 : activeLabel.lx + 3}
            y={activeLabel.ly + 3}
            fill="hsl(var(--primary-foreground))"
            fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif"
          >
            {activeLabel.label}
          </text>
        </g>
      )}

      {/* Subtle breathing animation on the whole body */}
      <animateTransform attributeName="transform" type="scale" values="1,1;1.003,1.005;1,1" dur="3s" repeatCount="indefinite" additive="sum" />
    </svg>
  );

  return (
    <MobileLayout>
      <div className="animate-fade-in px-4 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => step === "body" ? navigate(-1) : step === "noequip" ? setStep("equipment") : setStep("body")} className="p-1 transition-transform active:scale-90">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold">
            {step === "body" ? "Select Body Part" : step === "equipment" ? "Choose Equipment" : "No Equipment Workouts"}
          </h1>
          <div className="w-6" />
        </div>

        {/* STEP 1 */}
        {step === "body" && (
          <div className="mt-4 animate-fade-in">
            <p className="text-center text-xs text-muted-foreground mb-2">Tap a muscle group to target</p>
            <div className="relative mx-auto" style={{ maxWidth: 300, height: 440 }}>
              <BodyModel />
            </div>

            <div className="mt-2 grid grid-cols-4 gap-1.5 pb-4">
              {bodyParts.map(part => (
                <button key={part.id} onClick={() => handlePartClick(part.id)}
                  className={`flex flex-col items-center gap-0.5 rounded-xl p-2 text-[9px] font-semibold transition-all duration-300 ${
                    bouncingId === part.id ? "animate-bounce scale-110" : "active:scale-90"
                  } ${selectedPart === part.id ? "bg-primary/20 ring-1 ring-primary text-primary" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
                >
                  <Dumbbell className="h-3 w-3" />{part.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Equipment */}
        {step === "equipment" && (
          <div className="mt-4 animate-fade-in">
            <div className="gym-gradient-card rounded-2xl p-4 mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Selected Target</p>
              <p className="text-lg font-bold mt-1">{bodyParts.find(b => b.id === selectedPart)?.label}</p>
            </div>

            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">⭐ Suggested</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {equipmentList.filter(e => suggestedEquip.includes(e.id)).map(eq => (
                <button key={eq.id} onClick={() => handleEquipmentClick(eq.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl p-4 ring-1 ring-primary/30 bg-primary/10 transition-all duration-200 ${
                    bouncingId === eq.id ? "animate-bounce scale-105" : "active:scale-95"
                  }`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-3xl">{eq.emoji}</div>
                  <p className="text-xs font-bold text-center">{eq.label}</p>
                  <p className="text-[9px] text-muted-foreground text-center">{eq.desc}</p>
                </button>
              ))}
            </div>

            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">All Equipment</h3>
            <div className="grid grid-cols-2 gap-2 pb-4">
              {equipmentList.filter(e => !suggestedEquip.includes(e.id)).map(eq => (
                <button key={eq.id} onClick={() => handleEquipmentClick(eq.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl gym-gradient-card p-4 transition-all duration-200 ${
                    bouncingId === eq.id ? "animate-bounce scale-105" : "active:scale-95 hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-3xl">{eq.emoji}</div>
                  <p className="text-xs font-bold text-center">{eq.label}</p>
                  <p className="text-[9px] text-muted-foreground text-center">{eq.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: No Equipment */}
        {step === "noequip" && (
          <div className="mt-4 animate-fade-in">
            <div className="gym-gradient-orange rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary-foreground" />
                <div>
                  <p className="text-sm font-bold text-primary-foreground">Bodyweight Only 💪</p>
                  <p className="text-[10px] text-primary-foreground/70">No gym? No problem.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 pb-4">
              {filteredNoEquip.map(workout => (
                <div key={workout.id} className="rounded-2xl overflow-hidden gym-gradient-card">
                  <button onClick={() => setExpandedWorkout(expandedWorkout === workout.id ? null : workout.id)}
                    className="flex w-full items-center gap-3 p-4 text-left transition-all active:scale-[0.98]"
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${workout.color} text-3xl`}>{workout.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold">{workout.name}</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{workout.description}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[9px] font-semibold text-primary">{workout.duration}</span>
                        <span className="text-[9px] text-muted-foreground">{workout.reps}</span>
                      </div>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${expandedWorkout === workout.id ? "rotate-90" : ""}`} />
                  </button>
                  {expandedWorkout === workout.id && (
                    <div className="border-t border-border px-4 pb-4 pt-3 animate-fade-in">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Exercises</p>
                      {workout.steps.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 mb-1.5">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">{i + 1}</span>
                          <span className="text-xs">{s}</span>
                        </div>
                      ))}
                      <button onClick={() => {
                        const routeMap: Record<string, string> = {
                          "lats": "back", "obliques": "core", "hip-flexors": "legs",
                          "hamstrings": "legs", "rear-delts": "shoulders", "lower-back": "back",
                        };
                        navigate(`/body/${routeMap[selectedPart || ""] || selectedPart || "chest"}`);
                      }}
                        className="mt-3 w-full rounded-xl gym-gradient-orange py-2.5 text-xs font-bold text-primary-foreground active:scale-95 transition-transform"
                      >Start Workout 🔥</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default BodySelector;
