import { Dumbbell, UtensilsCrossed, ArrowRight, ChevronRight, Flame, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import ProgressRing from "@/components/ProgressRing";
import offersBanner from "@/assets/offers-banner.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="animate-fade-in space-y-5 px-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button className="rounded-full border border-border p-2">
            <div className="h-4 w-5 space-y-1">
              <div className="h-0.5 w-full rounded bg-foreground" />
              <div className="h-0.5 w-3 rounded bg-foreground" />
            </div>
          </button>
          <h1 className="text-lg font-bold">FitTrack</h1>
          <div className="w-9" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/workout")}
            className="flex flex-1 items-center gap-2 rounded-full gym-gradient-orange px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            <Dumbbell className="h-4 w-4" />
            Track Workout
          </button>
          <button
            onClick={() => navigate("/diet")}
            className="flex flex-1 items-center gap-2 rounded-full gym-gradient-orange px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            <UtensilsCrossed className="h-4 w-4" />
            Track Diet
          </button>
        </div>

        {/* Offers Card */}
        <div className="gym-gradient-card relative overflow-hidden rounded-2xl p-4">
          <div className="relative z-10">
            <h3 className="text-base font-bold">Offers & Coupons</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              You can explore coupons and rewards
            </p>
            <button className="mt-3 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform active:scale-95">
              View My Offers
            </button>
          </div>
          <img
            src={offersBanner}
            alt="Offers"
            className="absolute -right-4 bottom-0 top-0 h-full w-40 object-contain opacity-80"
          />
        </div>

        {/* Track Your Goal */}
        <div>
          <h2 className="mb-3 text-lg font-bold">Track your goal</h2>
          <div className="gym-gradient-card rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <ProgressRing progress={12} size={70} strokeWidth={5} />
              <div className="flex-1 space-y-3">
                <button
                  onClick={() => navigate("/diet-insight")}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                      <UtensilsCrossed className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">
                        <span className="text-foreground">0</span>
                        <span className="text-muted-foreground text-xs">/2,784.65 Kcal</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">Calories Consumed</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>

                <button
                  onClick={() => navigate("/diet-insight")}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gym-green/20">
                      <Flame className="h-3.5 w-3.5 text-gym-green" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">
                        <span className="text-foreground">0</span>
                        <span className="text-muted-foreground text-xs">/712.53 Kcal</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">Calories Burnt</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* My Fitness Goal */}
        <div className="gym-gradient-card overflow-hidden rounded-2xl">
          <div className="gym-gradient-orange py-3 text-center">
            <h3 className="text-sm font-bold text-primary-foreground">My Fitness Goal</h3>
          </div>
          <div className="relative p-4">
            <div className="absolute right-3 top-3 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
              2%
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">
                    6<span className="text-xs text-muted-foreground">/260</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground">Workout Sessions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">364</p>
                  <p className="text-[10px] text-muted-foreground">Total Days</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/diet-insight")}
              className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-border py-2.5 text-xs font-semibold text-foreground transition-colors active:bg-secondary"
            >
              View Goal Analysis <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
