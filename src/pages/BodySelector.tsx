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
        // Map new parts to closest existing route
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

  const muscleClass = (part: string) => {
    const isAnimating = animatingPart === part;
    const isBouncing = bouncingId === part;
    const isSelected = selectedPart === part;
    if (isAnimating || isBouncing) return "fill-primary/60 muscle-select-glow";
    if (isSelected) return "fill-primary/40 muscle-idle-glow";
    return "fill-secondary/70 hover:fill-primary/25 muscle-idle-glow";
  };

  // Proper anatomical bodybuilder SVG
  const BodyModel = () => (
    <svg viewBox="0 0 200 440" className="w-full h-full" style={{ filter: "drop-shadow(0 0 12px hsl(var(--primary) / 0.12))" }}>
      <defs>
        <radialGradient id="bgAura" cx="50%" cy="40%" r="50%">
          <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.08" />
          <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="200" rx="95" ry="200" fill="url(#bgAura)" />

      {/* Head */}
      <ellipse cx="100" cy="30" rx="16" ry="20" className="fill-secondary stroke-primary/20" strokeWidth="1" />
      {/* Jaw */}
      <path d="M86 36 Q100 52 114 36" className="fill-none stroke-primary/10" strokeWidth="0.8" />

      {/* Neck */}
      <rect x="90" y="48" width="20" height="16" rx="5" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("neck")}`} 
        strokeWidth="1" onClick={() => handlePartClick("neck")} />

      {/* Traps - wide sloping from neck to shoulders */}
      <path d="M78 64 L90 56 L100 54 L110 56 L122 64 L118 74 L82 74 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("traps")}`} 
        strokeWidth="1" onClick={() => handlePartClick("traps")} />

      {/* Shoulders - round deltoid caps */}
      <ellipse cx="62" cy="78" rx="18" ry="12" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("shoulders")}`} 
        strokeWidth="1" onClick={() => handlePartClick("shoulders")} />
      <ellipse cx="138" cy="78" rx="18" ry="12" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("shoulders")}`} 
        strokeWidth="1" onClick={() => handlePartClick("shoulders")} />

      {/* Rear Delts (small arcs behind shoulders) */}
      <path d="M46 74 Q52 68 58 74" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer fill-none ${animatingPart === "rear-delts" || bouncingId === "rear-delts" ? "stroke-primary stroke-[2]" : selectedPart === "rear-delts" ? "stroke-primary/60" : "stroke-primary/20"}`} 
        strokeWidth="2" onClick={() => handlePartClick("rear-delts")} style={{ cursor: "pointer" }} />
      <path d="M142 74 Q148 68 154 74" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer fill-none ${animatingPart === "rear-delts" || bouncingId === "rear-delts" ? "stroke-primary stroke-[2]" : selectedPart === "rear-delts" ? "stroke-primary/60" : "stroke-primary/20"}`} 
        strokeWidth="2" onClick={() => handlePartClick("rear-delts")} style={{ cursor: "pointer" }} />

      {/* Chest - two pec slabs with clear separation */}
      <path d="M80 80 L98 80 L96 108 Q88 114 80 106 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("chest")}`} 
        strokeWidth="1" onClick={() => handlePartClick("chest")} />
      <path d="M102 80 L120 80 L120 106 Q112 114 104 108 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("chest")}`} 
        strokeWidth="1" onClick={() => handlePartClick("chest")} />
      {/* Chest center line */}
      <line x1="100" y1="80" x2="100" y2="112" className="stroke-primary/12" strokeWidth="0.6" />

      {/* Lats - side of torso, wider than core */}
      <path d="M74 90 L80 90 L80 140 L78 150 L72 140 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("lats")}`} 
        strokeWidth="1" onClick={() => handlePartClick("lats")} />
      <path d="M120 90 L126 90 L128 140 L122 150 L120 140 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("lats")}`} 
        strokeWidth="1" onClick={() => handlePartClick("lats")} />

      {/* Upper Arms - biceps */}
      <path d="M44 86 Q38 100 38 114 Q40 126 46 130 L56 130 Q60 122 58 110 Q56 98 52 86 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("arms")}`} 
        strokeWidth="1" onClick={() => handlePartClick("arms")} />
      <path d="M148 86 Q154 100 154 114 Q152 126 148 130 L140 130 Q138 122 140 110 Q142 98 146 86 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("arms")}`} 
        strokeWidth="1" onClick={() => handlePartClick("arms")} />

      {/* Forearms */}
      <path d="M46 134 Q42 152 40 170 L52 170 Q54 156 54 138 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("forearms")}`} 
        strokeWidth="1" onClick={() => handlePartClick("forearms")} />
      <path d="M148 134 Q152 152 154 170 L142 170 Q140 156 140 138 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("forearms")}`} 
        strokeWidth="1" onClick={() => handlePartClick("forearms")} />

      {/* Core / Abs - 6 pack with clear lines */}
      <rect x="86" y="115" width="28" height="42" rx="4" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("core")}`} 
        strokeWidth="1" onClick={() => handlePartClick("core")} />
      {/* Ab grid lines */}
      <line x1="100" y1="117" x2="100" y2="155" className="stroke-primary/15" strokeWidth="0.5" />
      <line x1="88" y1="128" x2="112" y2="128" className="stroke-primary/12" strokeWidth="0.4" />
      <line x1="88" y1="139" x2="112" y2="139" className="stroke-primary/12" strokeWidth="0.4" />
      <line x1="88" y1="148" x2="112" y2="148" className="stroke-primary/12" strokeWidth="0.4" />

      {/* Obliques - flanking abs */}
      <path d="M80 116 L86 116 L84 158 L78 148 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("obliques")}`} 
        strokeWidth="1" onClick={() => handlePartClick("obliques")} />
      <path d="M114 116 L120 116 L122 148 L116 158 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("obliques")}`} 
        strokeWidth="1" onClick={() => handlePartClick("obliques")} />

      {/* Lower Back - behind core area */}
      <rect x="88" y="148" width="24" height="16" rx="3" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("lower-back")}`} 
        strokeWidth="1" onClick={() => handlePartClick("lower-back")} />

      {/* Hip flexors */}
      <ellipse cx="88" cy="172" rx="8" ry="6" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("hip-flexors")}`} 
        strokeWidth="1" onClick={() => handlePartClick("hip-flexors")} />
      <ellipse cx="112" cy="172" rx="8" ry="6" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("hip-flexors")}`} 
        strokeWidth="1" onClick={() => handlePartClick("hip-flexors")} />

      {/* Glutes */}
      <ellipse cx="90" cy="186" rx="14" ry="12" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("glutes")}`} 
        strokeWidth="1" onClick={() => handlePartClick("glutes")} />
      <ellipse cx="110" cy="186" rx="14" ry="12" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("glutes")}`} 
        strokeWidth="1" onClick={() => handlePartClick("glutes")} />

      {/* Quads */}
      <path d="M76 200 Q74 230 74 258 L92 258 Q94 240 94 220 Q92 208 90 200 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("legs")}`} 
        strokeWidth="1" onClick={() => handlePartClick("legs")} />
      <path d="M110 200 Q108 230 108 258 L126 258 Q128 240 128 220 Q126 208 124 200 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("legs")}`} 
        strokeWidth="1" onClick={() => handlePartClick("legs")} />
      {/* Quad separation */}
      <line x1="83" y1="208" x2="83" y2="254" className="stroke-primary/10" strokeWidth="0.4" />
      <line x1="117" y1="208" x2="117" y2="254" className="stroke-primary/10" strokeWidth="0.4" />

      {/* Hamstrings - back of thigh, shown slightly offset */}
      <path d="M76 202 L74 200 L72 240 L76 254 L78 240 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("hamstrings")}`} 
        strokeWidth="1" onClick={() => handlePartClick("hamstrings")} />
      <path d="M124 202 L126 200 L128 240 L124 254 L122 240 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("hamstrings")}`} 
        strokeWidth="1" onClick={() => handlePartClick("hamstrings")} />

      {/* Calves */}
      <path d="M76 262 Q74 280 74 300 Q76 316 82 320 L92 320 Q96 310 94 290 Q92 274 92 262 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("calves")}`} 
        strokeWidth="1" onClick={() => handlePartClick("calves")} />
      <path d="M108 262 Q106 280 106 300 Q108 316 114 320 L124 320 Q128 310 126 290 Q124 274 124 262 Z" 
        className={`transition-all duration-500 stroke-primary/25 cursor-pointer ${muscleClass("calves")}`} 
        strokeWidth="1" onClick={() => handlePartClick("calves")} />

      {/* Feet */}
      <ellipse cx="84" cy="328" rx="12" ry="6" className="fill-secondary/50 stroke-primary/10" strokeWidth="0.6" />
      <ellipse cx="116" cy="328" rx="12" ry="6" className="fill-secondary/50 stroke-primary/10" strokeWidth="0.6" />

      {/* Hands */}
      <ellipse cx="44" cy="178" rx="7" ry="8" className="fill-secondary/40 stroke-primary/10" strokeWidth="0.6" />
      <ellipse cx="150" cy="178" rx="7" ry="8" className="fill-secondary/40 stroke-primary/10" strokeWidth="0.6" />

      {/* Back hitbox (invisible) */}
      <rect x="82" y="82" width="36" height="28" className="fill-transparent cursor-pointer" onClick={() => handlePartClick("back")} />
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
            <div className="relative mx-auto pose-flex" style={{ width: 240, height: 380 }}>
              <BodyModel />
              {selectedPart && (
                <div className="absolute top-2 right-0 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground animate-scale-in shadow-lg">
                  {bodyParts.find(b => b.id === selectedPart)?.label} ✓
                </div>
              )}
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
