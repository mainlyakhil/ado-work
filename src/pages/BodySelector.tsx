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

  const handlePartClick = (id: string) => {
    setBouncingId(id);
    setTimeout(() => { setSelectedPart(id); setBouncingId(null); setStep("equipment"); }, 300);
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

        {/* STEP 1: Animated Body Model */}
        {step === "body" && (
          <div className="mt-4 animate-fade-in">
            <p className="text-center text-xs text-muted-foreground mb-3">Tap a muscle group to target</p>
            <div className="relative mx-auto body-glow" style={{ width: 260, height: 360 }}>
              <svg viewBox="0 0 260 360" className="w-full h-full">
                {/* Ambient glow behind body */}
                <defs>
                  <radialGradient id="bodyAura" cx="50%" cy="45%" r="45%">
                    <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.08" />
                    <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="130" cy="170" rx="110" ry="160" fill="url(#bodyAura)" />

                {/* Head */}
                <ellipse cx="130" cy="30" rx="20" ry="24" className="fill-secondary stroke-primary/30 muscle-breathe" strokeWidth="1.5" />
                {/* Neck */}
                <rect x="121" y="52" width="18" height="14" rx="4" className="fill-secondary stroke-primary/30" strokeWidth="1" onClick={() => handlePartClick("neck")} style={{ cursor: "pointer" }} />
                {/* Traps */}
                <path d="M102 66 L130 56 L158 66 L155 76 L105 76 Z" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "traps" || bouncingId === "traps" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1" onClick={() => handlePartClick("traps")} />
                {/* Torso */}
                <path d="M92 66 L168 66 L173 175 L87 175 Z" className="fill-secondary stroke-primary/30" strokeWidth="1.5" />
                {/* Shoulders */}
                <ellipse cx="82" cy="76" rx="17" ry="11" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "shoulders" || bouncingId === "shoulders" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("shoulders")} style={{ animationDelay: "0.2s" }} />
                <ellipse cx="178" cy="76" rx="17" ry="11" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "shoulders" || bouncingId === "shoulders" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("shoulders")} style={{ animationDelay: "0.4s" }} />
                {/* Chest */}
                <path d="M100 80 L160 80 L157 112 L103 112 Z" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "chest" || bouncingId === "chest" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("chest")} style={{ animationDelay: "0.1s" }} />
                {/* Core */}
                <rect x="110" y="114" width="40" height="38" rx="6" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "core" || bouncingId === "core" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("core")} style={{ animationDelay: "0.3s" }} />
                {/* Arms */}
                <rect x="54" y="84" width="19" height="50" rx="8" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "arms" || bouncingId === "arms" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("arms")} style={{ animationDelay: "0.5s" }} />
                <rect x="187" y="84" width="19" height="50" rx="8" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "arms" || bouncingId === "arms" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("arms")} style={{ animationDelay: "0.6s" }} />
                {/* Forearms */}
                <rect x="48" y="136" width="17" height="44" rx="7" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "forearms" || bouncingId === "forearms" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("forearms")} style={{ animationDelay: "0.7s" }} />
                <rect x="195" y="136" width="17" height="44" rx="7" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "forearms" || bouncingId === "forearms" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("forearms")} style={{ animationDelay: "0.8s" }} />
                {/* Glutes */}
                <ellipse cx="117" cy="185" rx="18" ry="13" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "glutes" || bouncingId === "glutes" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("glutes")} />
                <ellipse cx="143" cy="185" rx="18" ry="13" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "glutes" || bouncingId === "glutes" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("glutes")} />
                {/* Legs */}
                <rect x="94" y="200" width="26" height="65" rx="10" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "legs" || bouncingId === "legs" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("legs")} style={{ animationDelay: "0.3s" }} />
                <rect x="140" y="200" width="26" height="65" rx="10" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "legs" || bouncingId === "legs" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("legs")} style={{ animationDelay: "0.5s" }} />
                {/* Calves */}
                <rect x="97" y="268" width="20" height="48" rx="8" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "calves" || bouncingId === "calves" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("calves")} />
                <rect x="143" y="268" width="20" height="48" rx="8" className={`transition-all duration-500 stroke-primary/40 cursor-pointer ${selectedPart === "calves" || bouncingId === "calves" ? "fill-primary/50 muscle-breathe" : "fill-secondary hover:fill-primary/20 body-pulse"}`} strokeWidth="1.5" onClick={() => handlePartClick("calves")} />
                {/* Feet */}
                <ellipse cx="107" cy="322" rx="14" ry="7" className="fill-secondary stroke-primary/30" strokeWidth="1" />
                <ellipse cx="153" cy="322" rx="14" ry="7" className="fill-secondary stroke-primary/30" strokeWidth="1" />
                {/* Back invisible hitbox */}
                <rect x="102" y="80" width="56" height="32" className="fill-transparent cursor-pointer" onClick={() => handlePartClick("back")} />
              </svg>

              {selectedPart && (
                <div className="absolute top-2 right-2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground animate-scale-in">
                  {bodyParts.find(b => b.id === selectedPart)?.label} ✓
                </div>
              )}
            </div>

            {/* Quick Select */}
            <div className="mt-3 grid grid-cols-4 gap-2 pb-4">
              {bodyParts.map(part => (
                <button key={part.id} onClick={() => handlePartClick(part.id)}
                  className={`flex flex-col items-center gap-1 rounded-xl p-2.5 text-[10px] font-semibold transition-all duration-200 ${
                    bouncingId === part.id ? "animate-bounce scale-110" : "active:scale-90"
                  } ${selectedPart === part.id ? "bg-primary/20 ring-1 ring-primary text-primary" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
                >
                  <Dumbbell className="h-3.5 w-3.5" />{part.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Equipment - Horizontal card layout */}
        {step === "equipment" && (
          <div className="mt-4 animate-fade-in">
            <div className="gym-gradient-card rounded-2xl p-4 mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Selected Target</p>
              <p className="text-lg font-bold mt-1">{bodyParts.find(b => b.id === selectedPart)?.label}</p>
            </div>

            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">⭐ Suggested</h3>
            <div className="space-y-2 mb-4">
              {equipmentList.filter(e => suggestedEquip.includes(e.id)).map(eq => (
                <button key={eq.id} onClick={() => handleEquipmentClick(eq.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl p-3 ring-1 ring-primary/30 bg-primary/10 transition-all duration-200 ${
                    bouncingId === eq.id ? "animate-bounce scale-105" : "active:scale-95"
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-2xl">{eq.emoji}</div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-bold">{eq.label}</p>
                    <p className="text-[9px] text-muted-foreground">{eq.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>

            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">All Equipment</h3>
            <div className="space-y-2 pb-4">
              {equipmentList.filter(e => !suggestedEquip.includes(e.id)).map(eq => (
                <button key={eq.id} onClick={() => handleEquipmentClick(eq.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl gym-gradient-card p-3 transition-all duration-200 ${
                    bouncingId === eq.id ? "animate-bounce scale-105" : "active:scale-95 hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl">{eq.emoji}</div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-bold">{eq.label}</p>
                    <p className="text-[9px] text-muted-foreground">{eq.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
