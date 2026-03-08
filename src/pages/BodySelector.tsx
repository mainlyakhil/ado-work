import { ChevronLeft, Dumbbell, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import bodyModelImg from "@/assets/body-model.png";

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

  // Muscle hotspot zones mapped to percentage positions on the body image
  const muscleZones: { id: string; label: string; top: string; left: string; width: string; height: string }[] = [
    { id: "neck", label: "Neck", top: "12.5%", left: "40%", width: "20%", height: "3%" },
    { id: "traps", label: "Traps", top: "15.5%", left: "28%", width: "44%", height: "4%" },
    { id: "shoulders", label: "Shoulders", top: "18%", left: "14%", width: "18%", height: "6%" },
    { id: "shoulders", label: "Shoulders", top: "18%", left: "68%", width: "18%", height: "6%" },
    { id: "chest", label: "Chest", top: "21%", left: "30%", width: "40%", height: "7%" },
    { id: "arms", label: "Arms", top: "22%", left: "10%", width: "16%", height: "10%" },
    { id: "arms", label: "Arms", top: "22%", left: "74%", width: "16%", height: "10%" },
    { id: "forearms", label: "Forearms", top: "33%", left: "5%", width: "14%", height: "10%" },
    { id: "forearms", label: "Forearms", top: "33%", left: "81%", width: "14%", height: "10%" },
    { id: "lats", label: "Lats", top: "25%", left: "22%", width: "10%", height: "10%" },
    { id: "lats", label: "Lats", top: "25%", left: "68%", width: "10%", height: "10%" },
    { id: "core", label: "Core", top: "30%", left: "35%", width: "30%", height: "9%" },
    { id: "obliques", label: "Obliques", top: "30%", left: "24%", width: "12%", height: "8%" },
    { id: "obliques", label: "Obliques", top: "30%", left: "64%", width: "12%", height: "8%" },
    { id: "lower-back", label: "Lower Back", top: "37%", left: "35%", width: "30%", height: "4%" },
    { id: "hip-flexors", label: "Hip Flexors", top: "41%", left: "30%", width: "14%", height: "5%" },
    { id: "hip-flexors", label: "Hip Flexors", top: "41%", left: "56%", width: "14%", height: "5%" },
    { id: "glutes", label: "Glutes", top: "42%", left: "32%", width: "36%", height: "6%" },
    { id: "legs", label: "Quads", top: "48%", left: "25%", width: "22%", height: "16%" },
    { id: "legs", label: "Quads", top: "48%", left: "53%", width: "22%", height: "16%" },
    { id: "hamstrings", label: "Hamstrings", top: "52%", left: "22%", width: "12%", height: "12%" },
    { id: "hamstrings", label: "Hamstrings", top: "52%", left: "66%", width: "12%", height: "12%" },
    { id: "calves", label: "Calves", top: "68%", left: "24%", width: "18%", height: "14%" },
    { id: "calves", label: "Calves", top: "68%", left: "58%", width: "18%", height: "14%" },
    { id: "back", label: "Back", top: "22%", left: "36%", width: "28%", height: "6%" },
    { id: "rear-delts", label: "Rear Delts", top: "18%", left: "18%", width: "10%", height: "4%" },
    { id: "rear-delts", label: "Rear Delts", top: "18%", left: "72%", width: "10%", height: "4%" },
  ];

  const getZoneStyle = (zone: typeof muscleZones[0]) => {
    const isActive = animatingPart === zone.id || bouncingId === zone.id;
    const isSelected = selectedPart === zone.id;
    return {
      position: "absolute" as const,
      top: zone.top,
      left: zone.left,
      width: zone.width,
      height: zone.height,
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      background: isActive
        ? "radial-gradient(ellipse, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.15) 70%, transparent 100%)"
        : isSelected
        ? "radial-gradient(ellipse, hsl(var(--primary) / 0.35) 0%, hsl(var(--primary) / 0.08) 70%, transparent 100%)"
        : "transparent",
      boxShadow: isActive
        ? "0 0 24px 8px hsl(var(--primary) / 0.5), inset 0 0 12px hsl(var(--primary) / 0.3)"
        : isSelected
        ? "0 0 16px 4px hsl(var(--primary) / 0.25), inset 0 0 8px hsl(var(--primary) / 0.15)"
        : "none",
      transform: isActive ? "scale(1.15)" : isSelected ? "scale(1.05)" : "scale(1)",
      border: isActive
        ? "1.5px solid hsl(var(--primary) / 0.7)"
        : isSelected
        ? "1px solid hsl(var(--primary) / 0.3)"
        : "1px solid transparent",
    };
  };

  const BodyModel = () => (
    <div className="relative w-full h-full">
      {/* Ambient glow behind the model */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      />
      {/* The actual body image */}
      <img
        src={bodyModelImg}
        alt="Human body muscle map"
        className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_hsl(var(--primary)/0.2)]"
        draggable={false}
        style={{ userSelect: "none" }}
      />
      {/* Clickable hotspot overlays */}
      <div className="absolute inset-0 z-20">
        {muscleZones.map((zone, i) => (
          <div
            key={`${zone.id}-${i}`}
            style={getZoneStyle(zone)}
            onClick={() => handlePartClick(zone.id)}
            className="hover:bg-primary/10 active:bg-primary/20"
          />
        ))}
      </div>
      {/* Selected label floating tag */}
      {selectedPart && (
        <div
          className="absolute z-30 left-1/2 -translate-x-1/2 bottom-2 rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold text-primary-foreground animate-scale-in shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
        >
          {bodyParts.find(b => b.id === selectedPart)?.label} ✓
        </div>
      )}
    </div>
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
            <div className="relative mx-auto pose-flex" style={{ width: 260, height: 460 }}>
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
