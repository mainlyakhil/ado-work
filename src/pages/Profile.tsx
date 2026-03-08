import { ChevronLeft, Settings, Award, TrendingUp, Calendar, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import ProgressRing from "@/components/ProgressRing";

const stats = [
  { icon: Calendar, label: "Days Active", value: "45" },
  { icon: TrendingUp, label: "Workouts", value: "38" },
  { icon: Target, label: "Goals Met", value: "12" },
  { icon: Award, label: "Streak", value: "7" },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="animate-fade-in px-4 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold">Profile</h1>
          <Settings className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Avatar */}
        <div className="mt-6 flex flex-col items-center">
          <div className="relative">
            <ProgressRing progress={72} size={100} strokeWidth={4} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-2xl font-bold text-primary">
                JD
              </div>
            </div>
          </div>
          <h2 className="mt-3 text-lg font-bold">John Doe</h2>
          <p className="text-xs text-muted-foreground">Fitness Enthusiast</p>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="gym-gradient-card rounded-xl p-4 text-center">
              <stat.icon className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 text-xl font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Summary */}
        <div className="mt-5 gym-gradient-card rounded-2xl p-4">
          <h3 className="text-sm font-bold">This Week</h3>
          <div className="mt-3 space-y-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const val = [60, 80, 45, 90, 70, 30, 0][i];
              return (
                <div key={day} className="flex items-center gap-3">
                  <span className="w-8 text-[10px] text-muted-foreground">{day}</span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[10px] font-semibold">{val}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Profile;
