import { ChevronLeft, Play, Clock, Flame, Dumbbell, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import ProgressRing from "@/components/ProgressRing";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  completed: boolean;
}

const bodyPartData: Record<string, { title: string; emoji: string; exercises: Exercise[] }> = {
  chest: {
    title: "Chest", emoji: "🫁",
    exercises: [
      { name: "Barbell Bench Press", sets: 4, reps: "8-10", completed: false },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", completed: false },
      { name: "Cable Flyes", sets: 3, reps: "12-15", completed: false },
      { name: "Push Ups (Wide)", sets: 3, reps: "15-20", completed: false },
      { name: "Dumbbell Pullover", sets: 3, reps: "12", completed: false },
      { name: "Pec Deck Machine", sets: 3, reps: "12-15", completed: false },
    ],
  },
  back: {
    title: "Back", emoji: "🔙",
    exercises: [
      { name: "Deadlifts", sets: 4, reps: "6-8", completed: false },
      { name: "Pull Ups", sets: 4, reps: "8-12", completed: false },
      { name: "Barbell Rows", sets: 3, reps: "10-12", completed: false },
      { name: "Lat Pulldown", sets: 3, reps: "12", completed: false },
      { name: "Seated Cable Row", sets: 3, reps: "12-15", completed: false },
      { name: "T-Bar Row", sets: 3, reps: "10-12", completed: false },
    ],
  },
  shoulders: {
    title: "Shoulders", emoji: "🤷",
    exercises: [
      { name: "Overhead Press", sets: 4, reps: "8-10", completed: false },
      { name: "Lateral Raises", sets: 4, reps: "12-15", completed: false },
      { name: "Face Pulls", sets: 3, reps: "15", completed: false },
      { name: "Front Raises", sets: 3, reps: "12", completed: false },
      { name: "Arnold Press", sets: 3, reps: "10-12", completed: false },
      { name: "Reverse Pec Deck", sets: 3, reps: "12-15", completed: false },
    ],
  },
  arms: {
    title: "Arms", emoji: "💪",
    exercises: [
      { name: "Barbell Curls", sets: 3, reps: "10-12", completed: false },
      { name: "Skull Crushers", sets: 3, reps: "10-12", completed: false },
      { name: "Hammer Curls", sets: 3, reps: "12", completed: false },
      { name: "Tricep Pushdown", sets: 3, reps: "12-15", completed: false },
      { name: "Concentration Curls", sets: 3, reps: "12", completed: false },
      { name: "Overhead Tricep Extension", sets: 3, reps: "12", completed: false },
    ],
  },
  forearms: {
    title: "Forearms", emoji: "🦾",
    exercises: [
      { name: "Wrist Curls", sets: 4, reps: "15-20", completed: false },
      { name: "Reverse Wrist Curls", sets: 3, reps: "15", completed: false },
      { name: "Farmer's Walk", sets: 3, reps: "40m", completed: false },
      { name: "Plate Pinch Hold", sets: 3, reps: "30 sec", completed: false },
      { name: "Towel Pull-ups", sets: 3, reps: "8-10", completed: false },
    ],
  },
  legs: {
    title: "Legs", emoji: "🦵",
    exercises: [
      { name: "Barbell Squats", sets: 4, reps: "8-10", completed: false },
      { name: "Romanian Deadlifts", sets: 3, reps: "10-12", completed: false },
      { name: "Leg Press", sets: 3, reps: "12", completed: false },
      { name: "Walking Lunges", sets: 3, reps: "12 each", completed: false },
      { name: "Leg Curls", sets: 3, reps: "12-15", completed: false },
      { name: "Leg Extensions", sets: 3, reps: "12-15", completed: false },
      { name: "Calf Raises", sets: 4, reps: "15-20", completed: false },
    ],
  },
  core: {
    title: "Core", emoji: "🔥",
    exercises: [
      { name: "Plank", sets: 3, reps: "60 sec", completed: false },
      { name: "Hanging Leg Raises", sets: 3, reps: "12-15", completed: false },
      { name: "Russian Twists", sets: 3, reps: "20", completed: false },
      { name: "Ab Wheel Rollout", sets: 3, reps: "10-12", completed: false },
      { name: "Cable Woodchops", sets: 3, reps: "12 each", completed: false },
      { name: "Bicycle Crunches", sets: 3, reps: "20", completed: false },
    ],
  },
  glutes: {
    title: "Glutes", emoji: "🍑",
    exercises: [
      { name: "Hip Thrusts", sets: 4, reps: "10-12", completed: false },
      { name: "Bulgarian Split Squats", sets: 3, reps: "10 each", completed: false },
      { name: "Sumo Deadlifts", sets: 3, reps: "10-12", completed: false },
      { name: "Cable Kickbacks", sets: 3, reps: "12 each", completed: false },
      { name: "Glute Bridge", sets: 3, reps: "15", completed: false },
      { name: "Step Ups", sets: 3, reps: "12 each", completed: false },
    ],
  },
  calves: {
    title: "Calves", emoji: "🏔️",
    exercises: [
      { name: "Standing Calf Raises", sets: 4, reps: "15-20", completed: false },
      { name: "Seated Calf Raises", sets: 4, reps: "15-20", completed: false },
      { name: "Donkey Calf Raises", sets: 3, reps: "15", completed: false },
      { name: "Single Leg Calf Raise", sets: 3, reps: "12 each", completed: false },
      { name: "Jump Rope", sets: 3, reps: "60 sec", completed: false },
    ],
  },
  neck: {
    title: "Neck", emoji: "🦴",
    exercises: [
      { name: "Neck Flexion (Plate)", sets: 3, reps: "12-15", completed: false },
      { name: "Neck Extension", sets: 3, reps: "12-15", completed: false },
      { name: "Lateral Neck Flexion", sets: 3, reps: "12 each", completed: false },
      { name: "Neck Harness", sets: 3, reps: "15", completed: false },
      { name: "Shrugs", sets: 4, reps: "12-15", completed: false },
    ],
  },
  traps: {
    title: "Traps", emoji: "🔺",
    exercises: [
      { name: "Barbell Shrugs", sets: 4, reps: "12-15", completed: false },
      { name: "Dumbbell Shrugs", sets: 3, reps: "15", completed: false },
      { name: "Face Pulls", sets: 3, reps: "15", completed: false },
      { name: "Upright Rows", sets: 3, reps: "12", completed: false },
      { name: "Farmer's Walk", sets: 3, reps: "40m", completed: false },
    ],
  },
};

const BodyPartWorkout = () => {
  const navigate = useNavigate();
  const { part } = useParams<{ part: string }>();
  const data = bodyPartData[part || "chest"];
  const [exercises, setExercises] = useState<Exercise[]>(data?.exercises || []);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [interval, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  if (!data) {
    return (
      <MobileLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <p className="text-muted-foreground">Body part not found</p>
        </div>
      </MobileLayout>
    );
  }

  const completedCount = exercises.filter((e) => e.completed).length;
  const progress = (completedCount / exercises.length) * 100;

  const toggleExercise = (index: number) => {
    setExercises((prev) => prev.map((e, i) => (i === index ? { ...e, completed: !e.completed } : e)));
  };

  const startWorkout = () => {
    setIsActive(true);
    const id = setInterval(() => setTimer((t) => t + 1), 1000);
    setIntervalId(id);
  };

  const stopWorkout = () => {
    setIsActive(false);
    if (interval) clearInterval(interval);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <MobileLayout>
      <div className="animate-fade-in px-4 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1"><ChevronLeft className="h-5 w-5" /></button>
          <h1 className="text-base font-bold">{data.emoji} {data.title} Workout</h1>
          <div className="w-6" />
        </div>

        <div className="mt-4 gym-gradient-card rounded-2xl p-5">
          <div className="flex items-center gap-5">
            <ProgressRing progress={progress} size={80} strokeWidth={5} />
            <div className="flex-1">
              <h3 className="text-sm font-bold">{data.title} Day</h3>
              <p className="mt-1 text-2xl font-bold gym-text-gradient">{completedCount}/{exercises.length}</p>
              <p className="text-[10px] text-muted-foreground">exercises done</p>
            </div>
          </div>
          <div className="mt-3 flex gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold">{formatTime(timer)}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
              <Flame className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold">{Math.round(timer * 0.15)} Cal</span>
            </div>
          </div>
        </div>

        <button
          onClick={isActive ? stopWorkout : startWorkout}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-transform active:scale-95 ${
            isActive ? "bg-destructive text-destructive-foreground" : "gym-gradient-orange text-primary-foreground"
          }`}
        >
          <Play className="h-4 w-4" />
          {isActive ? "End Workout" : "Start Workout"}
        </button>

        <div className="mt-4 space-y-2 pb-4">
          {exercises.map((exercise, index) => (
            <button
              key={index}
              onClick={() => toggleExercise(index)}
              className={`flex w-full items-center gap-3 rounded-xl p-3 transition-all active:scale-[0.98] ${
                exercise.completed ? "bg-primary/10 border border-primary/30" : "bg-secondary"
              }`}
            >
              {exercise.completed ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              ) : (
                <div className="h-5 w-5 shrink-0 rounded-full border-2 border-muted-foreground" />
              )}
              <div className="flex-1 text-left">
                <p className={`text-xs font-semibold ${exercise.completed ? "text-primary" : ""}`}>{exercise.name}</p>
                <p className="text-[10px] text-muted-foreground">{exercise.sets} sets × {exercise.reps}</p>
              </div>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default BodyPartWorkout;
