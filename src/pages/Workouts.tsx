import { ChevronLeft, Search, Dumbbell, Timer, Flame, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";

interface Workout {
  id: string;
  name: string;
  category: string;
  duration: string;
  calories: number;
  difficulty: "Easy" | "Medium" | "Hard";
  exercises: string[];
  image: string;
}

const workouts: Workout[] = [
  {
    id: "1",
    name: "Upper Body Blast",
    category: "Strength",
    duration: "35 min",
    calories: 280,
    difficulty: "Medium",
    exercises: ["Push Ups", "Dumbbell Press", "Shoulder Press", "Bicep Curls", "Tricep Dips"],
    image: "💪",
  },
  {
    id: "2",
    name: "Leg Day Crusher",
    category: "Strength",
    duration: "40 min",
    calories: 350,
    difficulty: "Hard",
    exercises: ["Squats", "Lunges", "Leg Press", "Calf Raises", "Deadlifts", "Box Jumps"],
    image: "🦵",
  },
  {
    id: "3",
    name: "Core Destroyer",
    category: "Core",
    duration: "20 min",
    calories: 180,
    difficulty: "Medium",
    exercises: ["Plank", "Crunches", "Russian Twists", "Leg Raises", "Mountain Climbers"],
    image: "🔥",
  },
  {
    id: "4",
    name: "Cardio HIIT",
    category: "Cardio",
    duration: "25 min",
    calories: 400,
    difficulty: "Hard",
    exercises: ["Burpees", "Jump Squats", "High Knees", "Sprint Intervals", "Jump Rope"],
    image: "🏃",
  },
  {
    id: "5",
    name: "Morning Stretch",
    category: "Flexibility",
    duration: "15 min",
    calories: 80,
    difficulty: "Easy",
    exercises: ["Hamstring Stretch", "Quad Stretch", "Cat-Cow", "Child's Pose", "Sun Salutation"],
    image: "🧘",
  },
  {
    id: "6",
    name: "Full Body Power",
    category: "Strength",
    duration: "45 min",
    calories: 420,
    difficulty: "Hard",
    exercises: ["Deadlifts", "Bench Press", "Pull Ups", "Squats", "Overhead Press", "Rows"],
    image: "⚡",
  },
  {
    id: "7",
    name: "Arm Sculptor",
    category: "Strength",
    duration: "30 min",
    calories: 220,
    difficulty: "Medium",
    exercises: ["Hammer Curls", "Skull Crushers", "Cable Curls", "Dips", "Concentration Curls"],
    image: "💪",
  },
  {
    id: "8",
    name: "Yoga Flow",
    category: "Flexibility",
    duration: "30 min",
    calories: 120,
    difficulty: "Easy",
    exercises: ["Downward Dog", "Warrior I", "Warrior II", "Tree Pose", "Cobra", "Pigeon Pose"],
    image: "🧘",
  },
];

const categories = ["All", "Strength", "Cardio", "Core", "Flexibility"];

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
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold">Workouts</h1>
          <div className="w-6" />
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search workouts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* Categories */}
        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "gym-gradient-orange text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Workout Cards */}
        <div className="mt-4 space-y-3 pb-4">
          {filtered.map((workout) => {
            const isExpanded = expandedId === workout.id;
            return (
              <div
                key={workout.id}
                className="gym-gradient-card rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : workout.id)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl">
                    {workout.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold">{workout.name}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${difficultyColor[workout.difficulty]}`}>
                        {workout.difficulty}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Timer className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{workout.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-primary" />
                        <span className="text-[10px] text-muted-foreground">{workout.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Dumbbell className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{workout.exercises.length} exercises</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="border-t border-border px-4 pb-4 pt-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Exercises</p>
                    <div className="mt-2 space-y-1.5">
                      {workout.exercises.map((ex, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">
                            {i + 1}
                          </span>
                          <span className="text-xs text-foreground">{ex}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate("/workout")}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl gym-gradient-orange py-2.5 text-xs font-bold text-primary-foreground active:scale-95 transition-transform"
                    >
                      <Play className="h-3.5 w-3.5" />
                      Start Workout
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
