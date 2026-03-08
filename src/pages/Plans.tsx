import { ChevronLeft, Clock, Flame, Dumbbell, ChevronRight, Star, Zap, Trophy } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";

interface Plan {
  id: string;
  name: string;
  duration: string;
  level: string;
  calories: number;
  exercises: number;
  icon: typeof Dumbbell;
  color: string;
  days: string[];
  description: string;
}

const plans: Plan[] = [
  {
    id: "beginner",
    name: "Beginner Strength",
    duration: "4 Weeks",
    level: "Beginner",
    calories: 250,
    exercises: 5,
    icon: Dumbbell,
    color: "text-primary",
    days: ["Mon", "Wed", "Fri"],
    description: "Build foundational strength with basic compound movements. Perfect for those just starting their fitness journey.",
  },
  {
    id: "fat-burn",
    name: "Fat Burner HIIT",
    duration: "6 Weeks",
    level: "Intermediate",
    calories: 450,
    exercises: 8,
    icon: Flame,
    color: "text-destructive",
    days: ["Mon", "Tue", "Thu", "Fri"],
    description: "High intensity interval training designed to maximize calorie burn and improve cardiovascular fitness.",
  },
  {
    id: "muscle",
    name: "Muscle Builder Pro",
    duration: "8 Weeks",
    level: "Advanced",
    calories: 380,
    exercises: 7,
    icon: Zap,
    color: "text-gym-gold",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    description: "Advanced hypertrophy program focusing on progressive overload and muscle isolation techniques.",
  },
  {
    id: "full-body",
    name: "Full Body Flex",
    duration: "4 Weeks",
    level: "All Levels",
    calories: 320,
    exercises: 6,
    icon: Star,
    color: "text-gym-green",
    days: ["Mon", "Wed", "Fri", "Sat"],
    description: "A balanced full-body program that builds strength, flexibility, and endurance simultaneously.",
  },
  {
    id: "athlete",
    name: "Athlete Performance",
    duration: "12 Weeks",
    level: "Advanced",
    calories: 500,
    exercises: 10,
    icon: Trophy,
    color: "text-primary",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    description: "Elite training program for athletes looking to peak performance. Includes plyometrics, agility, and sport-specific drills.",
  },
];

const Plans = () => {
  const navigate = useNavigate();
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredPlans =
    selectedCategory === "All"
      ? plans
      : plans.filter((p) => p.level === selectedCategory || (selectedCategory === "Advanced" && p.level === "All Levels"));

  return (
    <MobileLayout>
      <div className="animate-fade-in px-4 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold">Workout Plans</h1>
          <div className="w-6" />
        </div>

        {/* Active Plan Banner */}
        {activePlan && (
          <div className="mt-4 gym-gradient-orange rounded-2xl p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/70">Active Plan</p>
            <p className="text-sm font-bold text-primary-foreground">
              {plans.find((p) => p.id === activePlan)?.name}
            </p>
            <div className="mt-2 h-1.5 rounded-full bg-primary-foreground/20">
              <div className="h-full w-1/3 rounded-full bg-primary-foreground" />
            </div>
            <p className="mt-1 text-[10px] text-primary-foreground/70">Week 1 of {plans.find((p) => p.id === activePlan)?.duration.split(" ")[0]}</p>
          </div>
        )}

        {/* Categories */}
        <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
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

        {/* Plans List */}
        <div className="mt-4 space-y-3 pb-4">
          {filteredPlans.map((plan) => {
            const Icon = plan.icon;
            const isActive = activePlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`gym-gradient-card rounded-2xl p-4 transition-all ${isActive ? "ring-1 ring-primary" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <Icon className={`h-5 w-5 ${plan.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold">{plan.name}</h3>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {plan.level}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{plan.description}</p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{plan.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-primary" />
                        <span className="text-[10px] text-muted-foreground">{plan.calories} cal/session</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Dumbbell className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{plan.exercises} exercises</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                        <span
                          key={d}
                          className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold ${
                            plan.days.includes(d) ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground/50"
                          }`}
                        >
                          {d[0]}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setActivePlan(isActive ? null : plan.id)}
                      className={`mt-3 w-full rounded-xl py-2.5 text-xs font-bold transition-all active:scale-95 ${
                        isActive
                          ? "border border-primary/30 bg-primary/10 text-primary"
                          : "gym-gradient-orange text-primary-foreground"
                      }`}
                    >
                      {isActive ? "Currently Active ✓" : "Start Plan"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Plans;
