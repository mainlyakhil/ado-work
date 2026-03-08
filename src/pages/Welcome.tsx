import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Dumbbell, ArrowRight, Sparkles } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"welcome" | "name">("welcome");
  const [name, setName] = useState("");

  const handleContinue = () => {
    if (step === "welcome") {
      setStep("name");
    } else if (name.trim().length >= 1) {
      localStorage.setItem("ado-user-name", name.trim());
      localStorage.setItem("ado-onboarded", "true");
      navigate("/", { replace: true });
    }
  };

  return (
    <MobileLayout hideNav>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 animate-fade-in">
        {step === "welcome" && (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl gym-gradient-orange mb-6">
              <Dumbbell className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-black">Welcome to Ado Work 💪</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Your personal fitness companion for tracking workouts, diet, and building healthy habits.
            </p>
            <div className="mt-8 space-y-3 w-full max-w-xs">
              {[
                { emoji: "🏋️", text: "Track workouts & body parts" },
                { emoji: "🥗", text: "Personalized diet plans" },
                { emoji: "📊", text: "Activity graphs & streaks" },
                { emoji: "😴", text: "Sleep & recovery tracking" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-secondary/50 px-4 py-3">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-xs font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
            <button onClick={handleContinue}
              className="mt-8 flex w-full max-w-xs items-center justify-center gap-2 rounded-full gym-gradient-orange px-6 py-4 text-sm font-bold text-primary-foreground transition-transform active:scale-95">
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === "name" && (
          <div className="flex flex-col items-center text-center w-full">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/20 mb-6">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-xl font-black">What's your name?</h1>
            <p className="mt-2 text-xs text-muted-foreground">We'll personalize your experience</p>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleContinue()}
              autoFocus
              maxLength={30}
              className="mt-6 w-full max-w-xs rounded-2xl bg-secondary px-5 py-4 text-center text-lg font-bold text-foreground placeholder:text-muted-foreground outline-none ring-2 ring-transparent focus:ring-primary transition-all"
            />
            <button onClick={handleContinue}
              disabled={name.trim().length < 1}
              className="mt-6 flex w-full max-w-xs items-center justify-center gap-2 rounded-full gym-gradient-orange px-6 py-4 text-sm font-bold text-primary-foreground transition-transform active:scale-95 disabled:opacity-40 disabled:scale-100">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Welcome;
