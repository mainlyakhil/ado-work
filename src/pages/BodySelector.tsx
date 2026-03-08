import { ChevronLeft, Dumbbell, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";

const bodyParts = [
  { id: "chest", label: "Chest" }, { id: "shoulders", label: "Shoulders" },
  { id: "arms", label: "Arms" }, { id: "forearms", label: "Forearms" },
  { id: "back", label: "Back" }, { id: "core", label: "Core" },
  { id: "glutes", label: "Glutes" }, { id: "legs", label: "Legs" },
  { id: "calves", label: "Calves" }, { id: "neck", label: "Neck" },
  { id: "traps", label: "Traps" },
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
      if (id === "none") { setStep("noequip"); } else { navigate(`/body/${selectedPart}`); }
    }, 300);
  };

  const suggestedEquip = selectedPart
    ? selectedPart === "legs" || selectedPart === "glutes" ? ["none", "barbell", "bands", "kettlebell"]
      : selectedPart === "back" ? ["pullup-bar", "dumbbells", "barbell", "cables"]
        : selectedPart === "chest" ? ["none", "dumbbells", "barbell", "cables"]
          : ["none", "dumbbells", "bands", "kettlebell"]
    : [];

  const filteredNoEquip = selectedPart
    ? noEquipWorkouts.filter(w => w.bodyPart === selectedPart || w.bodyPart === "full")
    : noEquipWorkouts;

  const muscleClass = (part: string) => {
    const isSelected = selectedPart === part;
    const isAnimating = animatingPart === part;
    const isBouncing = bouncingId === part;
    if (isAnimating || isBouncing) return "fill-primary/60 muscle-select-glow";
    if (isSelected) return "fill-primary/40 muscle-idle-glow";
    return "fill-secondary/80 hover:fill-primary/25 muscle-idle-glow";
  };

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

        {/* STEP 1: Muscular Bodybuilder Model */}
        {step === "body" && (
          <div className="mt-4 animate-fade-in">
            <p className="text-center text-xs text-muted-foreground mb-3">Tap a muscle group to target</p>
            <div className="relative mx-auto pose-flex" style={{ width: 280, height: 400 }}>
              <svg viewBox="0 0 280 400" className="w-full h-full" style={{ filter: "drop-shadow(0 0 15px hsl(var(--primary) / 0.15))" }}>
                <defs>
                  <radialGradient id="bodyAura" cx="50%" cy="42%" r="48%">
                    <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.1" />
                    <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" className="[stop-color:hsl(var(--secondary))]" stopOpacity="1" />
                    <stop offset="100%" className="[stop-color:hsl(var(--muted))]" stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="muscleGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                
                {/* Background aura */}
                <ellipse cx="140" cy="190" rx="130" ry="180" fill="url(#bodyAura)" />

                {/* HEAD - detailed with jaw */}
                <ellipse cx="140" cy="32" rx="22" ry="26" className="fill-secondary stroke-primary/20" strokeWidth="1" />
                {/* Jawline */}
                <path d="M120 38 Q140 60 160 38" className="fill-none stroke-primary/15" strokeWidth="1" />
                {/* Hair hint */}
                <path d="M118 20 Q140 8 162 20" className="fill-none stroke-primary/20" strokeWidth="1.5" />
                
                {/* NECK - thick muscular */}
                <path d="M127 55 L127 68 Q140 72 153 68 L153 55" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("neck")}`} 
                  strokeWidth="1" onClick={() => handlePartClick("neck")} />
                
                {/* TRAPS - wide diamond shape */}
                <path d="M100 72 L127 62 L140 58 L153 62 L180 72 L175 88 L105 88 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("traps")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("traps")} />

                {/* LEFT SHOULDER - rounded deltoid */}
                <ellipse cx="82" cy="88" rx="22" ry="14" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("shoulders")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("shoulders")} />
                {/* RIGHT SHOULDER */}
                <ellipse cx="198" cy="88" rx="22" ry="14" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("shoulders")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("shoulders")} />

                {/* CHEST - two defined pec slabs */}
                <path d="M102 90 L138 90 L136 120 Q120 126 102 118 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("chest")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("chest")} />
                <path d="M142 90 L178 90 L178 118 Q160 126 144 120 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("chest")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("chest")} />
                {/* Chest line */}
                <line x1="140" y1="90" x2="140" y2="125" className="stroke-primary/15" strokeWidth="0.8" />

                {/* CORE / ABS - 6-pack grid */}
                <rect x="114" y="128" width="52" height="50" rx="6" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("core")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("core")} />
                {/* Ab lines */}
                <line x1="140" y1="130" x2="140" y2="176" className="stroke-primary/20" strokeWidth="0.6" />
                <line x1="116" y1="143" x2="164" y2="143" className="stroke-primary/15" strokeWidth="0.5" />
                <line x1="116" y1="156" x2="164" y2="156" className="stroke-primary/15" strokeWidth="0.5" />
                <line x1="116" y1="168" x2="164" y2="168" className="stroke-primary/15" strokeWidth="0.5" />

                {/* LEFT BICEP / ARM */}
                <path d="M60 96 Q52 108 50 120 Q48 132 54 140 L72 140 Q78 130 76 118 Q74 106 68 96 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("arms")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("arms")} />
                {/* RIGHT BICEP / ARM */}
                <path d="M212 96 Q218 108 220 120 Q222 132 218 140 L200 140 Q194 130 196 118 Q198 106 204 96 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("arms")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("arms")} />

                {/* LEFT FOREARM */}
                <path d="M54 144 Q48 164 46 184 L62 184 Q66 168 68 148 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("forearms")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("forearms")} />
                {/* RIGHT FOREARM */}
                <path d="M218 144 Q222 164 224 184 L210 184 Q206 168 204 148 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("forearms")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("forearms")} />

                {/* BACK hitbox (invisible, behind torso) */}
                <rect x="110" y="90" width="60" height="34" className="fill-transparent cursor-pointer" onClick={() => handlePartClick("back")} />

                {/* V-TAPER OBLIQUES */}
                <path d="M102 120 L110 178 L114 128 Z" className="fill-secondary/40 stroke-primary/10" strokeWidth="0.5" />
                <path d="M178 120 L170 178 L166 128 Z" className="fill-secondary/40 stroke-primary/10" strokeWidth="0.5" />

                {/* GLUTES */}
                <ellipse cx="125" cy="194" rx="20" ry="16" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("glutes")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("glutes")} />
                <ellipse cx="155" cy="194" rx="20" ry="16" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("glutes")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("glutes")} />

                {/* LEFT QUAD / LEG */}
                <path d="M100 210 Q96 242 94 270 Q96 282 108 282 L130 282 Q132 270 128 242 Q126 225 130 210 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("legs")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("legs")} />
                {/* RIGHT QUAD / LEG */}
                <path d="M150 210 Q154 242 156 270 Q154 282 144 282 L172 282 Q176 270 174 242 Q172 225 170 210 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("legs")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("legs")} />
                {/* Quad separation lines */}
                <line x1="112" y1="220" x2="114" y2="275" className="stroke-primary/10" strokeWidth="0.5" />
                <line x1="160" y1="220" x2="158" y2="275" className="stroke-primary/10" strokeWidth="0.5" />

                {/* LEFT CALF */}
                <path d="M98 286 Q94 306 96 330 Q98 346 106 350 L122 350 Q126 340 124 316 Q122 296 124 286 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("calves")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("calves")} />
                {/* RIGHT CALF */}
                <path d="M150 286 Q154 306 152 330 Q150 346 158 350 L174 350 Q178 340 176 316 Q174 296 172 286 Z" 
                  className={`transition-all duration-500 stroke-primary/30 cursor-pointer ${muscleClass("calves")}`} 
                  strokeWidth="1.2" onClick={() => handlePartClick("calves")} />

                {/* FEET */}
                <ellipse cx="110" cy="358" rx="16" ry="7" className="fill-secondary/60 stroke-primary/15" strokeWidth="0.8" />
                <ellipse cx="162" cy="358" rx="16" ry="7" className="fill-secondary/60 stroke-primary/15" strokeWidth="0.8" />

                {/* HANDS */}
                <ellipse cx="52" cy="192" rx="8" ry="10" className="fill-secondary/50 stroke-primary/10" strokeWidth="0.8" />
                <ellipse cx="220" cy="192" rx="8" ry="10" className="fill-secondary/50 stroke-primary/10" strokeWidth="0.8" />
              </svg>

              {selectedPart && (
                <div className="absolute top-2 right-2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground animate-scale-in shadow-lg">
                  {bodyParts.find(b => b.id === selectedPart)?.label} ✓
                </div>
              )}
            </div>

            {/* Quick Select Grid */}
            <div className="mt-3 grid grid-cols-4 gap-2 pb-4">
              {bodyParts.map(part => (
                <button key={part.id} onClick={() => handlePartClick(part.id)}
                  className={`flex flex-col items-center gap-1 rounded-xl p-2.5 text-[10px] font-semibold transition-all duration-300 ${
                    bouncingId === part.id ? "animate-bounce scale-110" : "active:scale-90"
                  } ${selectedPart === part.id ? "bg-primary/20 ring-1 ring-primary text-primary" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
                >
                  <Dumbbell className="h-3.5 w-3.5" />{part.label}
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

        {/* STEP 3: No Equipment Workouts */}
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
                      <button onClick={() => navigate(`/body/${selectedPart || "chest"}`)}
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
