import { ChevronLeft, Search, Dumbbell, Timer, Flame, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";

interface Exercise {
  name: string;
  illustration: string; // ASCII-art style emoji illustration
  sets: string;
}

interface Workout {
  id: string;
  name: string;
  category: string;
  duration: string;
  calories: number;
  difficulty: "Easy" | "Medium" | "Hard";
  exercises: Exercise[];
  image: string;
}

const workouts: Workout[] = [
  { id: "1", name: "Upper Body Blast", category: "Strength", duration: "35 min", calories: 280, difficulty: "Medium", image: "💪",
    exercises: [
      { name: "Push Ups", illustration: "🧍‍♂️➡️🫳", sets: "3×15" },
      { name: "Dumbbell Press", illustration: "🏋️⬆️", sets: "4×12" },
      { name: "Shoulder Press", illustration: "🙆‍♂️⬆️", sets: "3×10" },
      { name: "Bicep Curls", illustration: "💪🔄", sets: "3×12" },
      { name: "Tricep Dips", illustration: "🪑⬇️⬆️", sets: "3×10" },
    ] },
  { id: "2", name: "Leg Day Crusher", category: "Strength", duration: "40 min", calories: 350, difficulty: "Hard", image: "🦵",
    exercises: [
      { name: "Squats", illustration: "🧍⬇️⬆️", sets: "4×12" },
      { name: "Lunges", illustration: "🚶‍♂️⬇️", sets: "3×10 each" },
      { name: "Leg Press", illustration: "🦵⬆️💨", sets: "4×10" },
      { name: "Calf Raises", illustration: "🦶⬆️", sets: "4×20" },
      { name: "Deadlifts", illustration: "🏋️‍♂️⬆️", sets: "4×8" },
      { name: "Box Jumps", illustration: "📦⬆️🦘", sets: "3×10" },
    ] },
  { id: "3", name: "Core Destroyer", category: "Core", duration: "20 min", calories: 180, difficulty: "Medium", image: "🔥",
    exercises: [
      { name: "Plank", illustration: "🫳━━━", sets: "3×60s" },
      { name: "Crunches", illustration: "🧘⬆️", sets: "3×20" },
      { name: "Russian Twists", illustration: "🔄🧘", sets: "3×15 each" },
      { name: "Leg Raises", illustration: "🦵⬆️", sets: "3×15" },
      { name: "Mountain Climbers", illustration: "🏔️🏃", sets: "3×30s" },
    ] },
  { id: "4", name: "Cardio HIIT", category: "Cardio", duration: "25 min", calories: 400, difficulty: "Hard", image: "🏃",
    exercises: [
      { name: "Burpees", illustration: "🧍⬇️🫳⬆️🦘", sets: "4×10" },
      { name: "Jump Squats", illustration: "🧍⬇️⬆️🦘", sets: "4×12" },
      { name: "High Knees", illustration: "🦵⬆️🏃", sets: "3×30s" },
      { name: "Sprint Intervals", illustration: "🏃💨💨", sets: "5×20s" },
      { name: "Jump Rope", illustration: "🤸🔄", sets: "3×60s" },
    ] },
  { id: "5", name: "Morning Stretch", category: "Flexibility", duration: "15 min", calories: 80, difficulty: "Easy", image: "🧘",
    exercises: [
      { name: "Hamstring Stretch", illustration: "🦵↔️", sets: "2×30s" },
      { name: "Quad Stretch", illustration: "🦵🔙", sets: "2×30s" },
      { name: "Cat-Cow", illustration: "🐱↔️🐄", sets: "10 reps" },
      { name: "Child's Pose", illustration: "🧒🫳", sets: "60s" },
      { name: "Sun Salutation", illustration: "☀️🙏", sets: "5 flows" },
    ] },
  { id: "6", name: "Full Body Power", category: "Strength", duration: "45 min", calories: 420, difficulty: "Hard", image: "⚡",
    exercises: [
      { name: "Deadlifts", illustration: "🏋️‍♂️⬆️", sets: "5×5" },
      { name: "Bench Press", illustration: "🛏️🏋️", sets: "4×8" },
      { name: "Pull Ups", illustration: "🔩⬆️🧍", sets: "4×8" },
      { name: "Squats", illustration: "🧍⬇️⬆️", sets: "4×10" },
      { name: "Overhead Press", illustration: "🙆⬆️🏋️", sets: "3×10" },
      { name: "Barbell Rows", illustration: "🏋️🔙", sets: "4×10" },
    ] },
  { id: "7", name: "Arm Sculptor", category: "Strength", duration: "30 min", calories: 220, difficulty: "Medium", image: "💪",
    exercises: [
      { name: "Hammer Curls", illustration: "🔨💪", sets: "3×12" },
      { name: "Skull Crushers", illustration: "💀⬇️⬆️", sets: "3×10" },
      { name: "Cable Curls", illustration: "🔌💪", sets: "3×12" },
      { name: "Dips", illustration: "🪑⬇️⬆️", sets: "3×10" },
      { name: "Concentration Curls", illustration: "🧘💪", sets: "3×10" },
    ] },
  { id: "8", name: "Yoga Flow", category: "Flexibility", duration: "30 min", calories: 120, difficulty: "Easy", image: "🧘",
    exercises: [
      { name: "Downward Dog", illustration: "🐕⬇️", sets: "5 breaths" },
      { name: "Warrior I", illustration: "⚔️🧍", sets: "5 breaths" },
      { name: "Warrior II", illustration: "⚔️↔️", sets: "5 breaths" },
      { name: "Tree Pose", illustration: "🌳🧍", sets: "30s each" },
      { name: "Cobra", illustration: "🐍⬆️", sets: "5 breaths" },
      { name: "Pigeon Pose", illustration: "🐦🧘", sets: "60s each" },
    ] },
  { id: "9", name: "Chest & Triceps", category: "Strength", duration: "40 min", calories: 310, difficulty: "Medium", image: "🏋️",
    exercises: [
      { name: "Flat Bench Press", illustration: "🛏️🏋️⬆️", sets: "4×10" },
      { name: "Incline DB Press", illustration: "📐🏋️", sets: "3×12" },
      { name: "Cable Flyes", illustration: "🔌↔️", sets: "3×12" },
      { name: "Close Grip Bench", illustration: "🤏🏋️", sets: "3×10" },
      { name: "Tricep Pushdown", illustration: "⬇️💪", sets: "3×12" },
      { name: "Overhead Extension", illustration: "⬆️💪🔙", sets: "3×10" },
    ] },
  { id: "10", name: "Back & Biceps", category: "Strength", duration: "45 min", calories: 340, difficulty: "Medium", image: "🦾",
    exercises: [
      { name: "Barbell Row", illustration: "🏋️🔙", sets: "4×10" },
      { name: "Lat Pulldown", illustration: "⬇️🔩", sets: "3×12" },
      { name: "Seated Row", illustration: "🪑🔙", sets: "3×12" },
      { name: "Barbell Curl", illustration: "🏋️💪", sets: "3×10" },
      { name: "Hammer Curl", illustration: "🔨💪", sets: "3×12" },
      { name: "Face Pull", illustration: "🔌😊", sets: "3×15" },
    ] },
  { id: "11", name: "Shoulder Shredder", category: "Strength", duration: "35 min", calories: 260, difficulty: "Hard", image: "🎯",
    exercises: [
      { name: "Military Press", illustration: "🎖️⬆️", sets: "4×8" },
      { name: "Arnold Press", illustration: "🔄⬆️", sets: "3×10" },
      { name: "Lateral Raise", illustration: "↔️⬆️", sets: "4×12" },
      { name: "Rear Delt Fly", illustration: "🔙↔️", sets: "3×12" },
      { name: "Upright Row", illustration: "⬆️🏋️", sets: "3×10" },
      { name: "Shrugs", illustration: "🤷⬆️", sets: "4×15" },
    ] },
  { id: "12", name: "Sprint Intervals", category: "Cardio", duration: "20 min", calories: 380, difficulty: "Hard", image: "🏃‍♂️",
    exercises: [
      { name: "400m Sprint", illustration: "🏃💨💨💨", sets: "4 rounds" },
      { name: "200m Recovery", illustration: "🚶‍♂️", sets: "4 rounds" },
      { name: "100m All-Out", illustration: "🏃‍♂️⚡", sets: "3 rounds" },
      { name: "Hill Sprints", illustration: "⛰️🏃", sets: "5×30s" },
      { name: "Cooldown Walk", illustration: "🚶☀️", sets: "5 min" },
    ] },
  { id: "13", name: "Tabata Burn", category: "Cardio", duration: "16 min", calories: 320, difficulty: "Hard", image: "⏱️",
    exercises: [
      { name: "Burpees 20s/10s", illustration: "🧍⬇️⬆️🦘", sets: "8 rounds" },
      { name: "Mountain Climbers", illustration: "🏔️🏃", sets: "8 rounds" },
      { name: "Jump Squats", illustration: "🧍⬇️🦘", sets: "8 rounds" },
      { name: "Plank Jacks", illustration: "🫳↔️", sets: "8 rounds" },
      { name: "High Knees", illustration: "🦵⬆️🏃", sets: "8 rounds" },
    ] },
  { id: "14", name: "Mobility Flow", category: "Flexibility", duration: "25 min", calories: 90, difficulty: "Easy", image: "🤸",
    exercises: [
      { name: "Hip 90/90", illustration: "🦵↔️", sets: "2 min" },
      { name: "World's Greatest Stretch", illustration: "🌍🧘", sets: "5 each" },
      { name: "Thoracic Rotation", illustration: "🔄🧍", sets: "10 each" },
      { name: "Ankle Circles", illustration: "🦶🔄", sets: "10 each" },
      { name: "Shoulder Dislocates", illustration: "🙆🔄", sets: "15 reps" },
    ] },
  { id: "15", name: "Glute Activator", category: "Strength", duration: "30 min", calories: 250, difficulty: "Medium", image: "🍑",
    exercises: [
      { name: "Hip Thrusts", illustration: "🍑⬆️", sets: "4×12" },
      { name: "Bulgarian Splits", illustration: "🪑🦵", sets: "3×10 each" },
      { name: "Glute Bridge", illustration: "🌉🍑", sets: "4×15" },
      { name: "Cable Kickbacks", illustration: "🔌🦵🔙", sets: "3×12" },
      { name: "Sumo Squats", illustration: "🧍↔️⬇️", sets: "3×12" },
    ] },
  { id: "16", name: "Abs & Obliques", category: "Core", duration: "15 min", calories: 150, difficulty: "Medium", image: "🎯",
    exercises: [
      { name: "Bicycle Crunches", illustration: "🚴🧘", sets: "3×20" },
      { name: "Side Plank", illustration: "🫳↕️", sets: "3×30s" },
      { name: "V-Ups", illustration: "🧘V⬆️", sets: "3×12" },
      { name: "Woodchops", illustration: "🪓↗️", sets: "3×12 each" },
      { name: "Dead Bug", illustration: "🐛🔄", sets: "3×10" },
    ] },
  { id: "17", name: "Calisthenics Basics", category: "Bodyweight", duration: "35 min", calories: 300, difficulty: "Medium", image: "🤸‍♂️",
    exercises: [
      { name: "Pull Ups", illustration: "🔩⬆️🧍", sets: "4×8" },
      { name: "Dips", illustration: "🪑⬇️⬆️", sets: "4×10" },
      { name: "Push Ups", illustration: "🫳⬆️", sets: "3×20" },
      { name: "Pistol Squats", illustration: "🦵🧍", sets: "3×6 each" },
      { name: "L-Sit Hold", illustration: "L🧍", sets: "3×15s" },
    ] },
  { id: "18", name: "Kettlebell Flow", category: "Strength", duration: "25 min", calories: 350, difficulty: "Medium", image: "⚙️",
    exercises: [
      { name: "KB Swing", illustration: "⚙️🔄", sets: "4×15" },
      { name: "Turkish Get Up", illustration: "🇹🇷⬆️", sets: "3×3 each" },
      { name: "Goblet Squat", illustration: "🏆⬇️", sets: "3×12" },
      { name: "KB Clean & Press", illustration: "⚙️⬆️", sets: "3×8 each" },
      { name: "Farmer Walk", illustration: "🧑‍🌾🚶", sets: "3×40s" },
    ] },
  { id: "19", name: "Boxing Cardio", category: "Cardio", duration: "30 min", calories: 450, difficulty: "Hard", image: "🥊",
    exercises: [
      { name: "Jab-Cross Combo", illustration: "👊👊", sets: "3×3min" },
      { name: "Hook Uppercut", illustration: "🪝⬆️👊", sets: "3×3min" },
      { name: "Speed Bag", illustration: "🥊🔄🔄", sets: "3×2min" },
      { name: "Heavy Bag Rounds", illustration: "🎒👊💥", sets: "3×3min" },
      { name: "Jump Rope", illustration: "🤸🔄", sets: "3×2min" },
    ] },
  { id: "20", name: "Recovery Day", category: "Flexibility", duration: "20 min", calories: 60, difficulty: "Easy", image: "🧊",
    exercises: [
      { name: "Foam Rolling", illustration: "🧽🔄", sets: "10 min" },
      { name: "Static Stretches", illustration: "🧘↔️", sets: "5 min" },
      { name: "Deep Breathing", illustration: "🌬️😌", sets: "3 min" },
      { name: "Light Walking", illustration: "🚶☀️", sets: "5 min" },
      { name: "Meditation", illustration: "🧘🕉️", sets: "5 min" },
    ] },
];

const categories = ["All", "Strength", "Cardio", "Core", "Flexibility", "Bodyweight"];

const difficultyColor = {
  Easy: "text-gym-green bg-gym-green/15",
  Medium: "text-gym-gold bg-gym-gold/15",
  Hard: "text-destructive bg-destructive/15",
};

const Workouts = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = workouts.filter((w) => {
    const matchCat = selectedCategory === "All" || w.category === selectedCategory;
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <MobileLayout>
      <div className="animate-fade-in px-4 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1"><ChevronLeft className="h-5 w-5" /></button>
          <h1 className="text-base font-bold">Workouts</h1>
          <div className="w-6" />
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search workouts..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none" />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${selectedCategory === cat ? "gym-gradient-orange text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3 pb-4">
          {filtered.map((workout) => {
            const isExpanded = expandedId === workout.id;
            return (
              <div key={workout.id} className="gym-gradient-card rounded-2xl overflow-hidden transition-all">
                <button onClick={() => setExpandedId(isExpanded ? null : workout.id)} className="flex w-full items-center gap-3 p-4 text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl">{workout.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold">{workout.name}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${difficultyColor[workout.difficulty]}`}>{workout.difficulty}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="flex items-center gap-1"><Timer className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">{workout.duration}</span></div>
                      <div className="flex items-center gap-1"><Flame className="h-3 w-3 text-primary" /><span className="text-[10px] text-muted-foreground">{workout.calories} cal</span></div>
                      <div className="flex items-center gap-1"><Dumbbell className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">{workout.exercises.length} exercises</span></div>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </button>
                {isExpanded && (
                  <div className="border-t border-border px-4 pb-4 pt-3 animate-fade-in">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Exercises</p>
                    <div className="mt-2 space-y-2">
                      {workout.exercises.map((ex, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-xl bg-secondary/50 p-2.5">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg">{ex.illustration.slice(0, 4)}</div>
                          <div className="flex-1">
                            <p className="text-xs font-bold">{ex.name}</p>
                            <p className="text-[9px] text-muted-foreground">{ex.sets}</p>
                          </div>
                          <span className="text-[10px] text-primary font-semibold">{ex.illustration}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => navigate("/workout")} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl gym-gradient-orange py-2.5 text-xs font-bold text-primary-foreground active:scale-95 transition-transform">
                      <Play className="h-3.5 w-3.5" /> Start Workout
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Workouts;
