import { ChevronLeft, Settings, Award, TrendingUp, Calendar, Target, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import ProgressRing from "@/components/ProgressRing";
import { useToast } from "@/hooks/use-toast";

const animalAvatars = [
  { id: "wolf", emoji: "🐺", name: "Alpha Wolf" },
  { id: "lion", emoji: "🦁", name: "King Lion" },
  { id: "bear", emoji: "🐻", name: "Grizzly Bear" },
  { id: "gorilla", emoji: "🦍", name: "Silverback" },
  { id: "eagle", emoji: "🦅", name: "War Eagle" },
  { id: "bull", emoji: "🐂", name: "Raging Bull" },
  { id: "shark", emoji: "🦈", name: "Great White" },
  { id: "dragon", emoji: "🐉", name: "Fire Dragon" },
  { id: "panther", emoji: "🐆", name: "Black Panther" },
  { id: "rhino", emoji: "🦏", name: "Iron Rhino" },
  { id: "tiger", emoji: "🐅", name: "Bengal Tiger" },
  { id: "hawk", emoji: "🦅", name: "Night Hawk" },
];

const stats = [
  { icon: Calendar, label: "Days Active", value: "45" },
  { icon: TrendingUp, label: "Workouts", value: "38" },
  { icon: Target, label: "Goals Met", value: "12" },
  { icon: Award, label: "Streak", value: "7" },
];

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAvatar, setSelectedAvatar] = useState(() => localStorage.getItem("ado-avatar") || "wolf");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [bouncingId, setBouncingId] = useState<string | null>(null);

  const currentAvatar = animalAvatars.find(a => a.id === selectedAvatar) || animalAvatars[0];

  const handleAvatarSelect = (id: string) => {
    setBouncingId(id);
    setTimeout(() => {
      setSelectedAvatar(id);
      localStorage.setItem("ado-avatar", id);
      setBouncingId(null);
      setShowAvatarPicker(false);
      toast({ title: "Avatar updated!" });
    }, 400);
  };

  return (
    <MobileLayout>
      <div className="animate-fade-in px-4 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1"><ChevronLeft className="h-5 w-5" /></button>
          <h1 className="text-base font-bold">Profile</h1>
          <button onClick={() => navigate("/settings")} className="p-1 transition-transform active:scale-90"><Settings className="h-5 w-5 text-muted-foreground" /></button>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <button onClick={() => setShowAvatarPicker(true)} className="relative transition-transform active:scale-90 hover:scale-105">
            <ProgressRing progress={72} size={100} strokeWidth={4} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-3xl">{currentAvatar.emoji}</div>
            </div>
          </button>
          <h2 className="mt-3 text-lg font-bold">{currentAvatar.name}</h2>
          <p className="text-xs text-muted-foreground">Fitness Enthusiast · Level 4</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {stats.map(stat => (
            <div key={stat.label} className="gym-gradient-card rounded-xl p-4 text-center transition-transform active:scale-95">
              <stat.icon className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 text-xl font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 gym-gradient-card rounded-2xl p-4">
          <h3 className="text-sm font-bold">This Week</h3>
          <div className="mt-3 space-y-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const val = [60, 80, 45, 90, 70, 30, 0][i];
              return (
                <div key={day} className="flex items-center gap-3">
                  <span className="w-8 text-[10px] text-muted-foreground">{day}</span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500" style={{ width: `${val}%` }} />
                  </div>
                  <span className="w-8 text-right text-[10px] font-semibold">{val}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Avatar Picker */}
      {showAvatarPicker && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60" onClick={() => setShowAvatarPicker(false)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-md rounded-t-3xl bg-card p-5 pb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Choose Your Avatar</h2>
              <button onClick={() => setShowAvatarPicker(false)} className="p-1"><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {animalAvatars.map(avatar => (
                <button key={avatar.id} onClick={() => handleAvatarSelect(avatar.id)}
                  className={`flex flex-col items-center gap-1 rounded-2xl p-3 transition-all duration-300 ${bouncingId === avatar.id ? "animate-bounce scale-110" : ""} ${selectedAvatar === avatar.id ? "ring-2 ring-primary bg-primary/10 scale-105" : "gym-gradient-card active:scale-90 hover:scale-105"}`}>
                  <span className="text-2xl">{avatar.emoji}</span>
                  <span className="text-[8px] font-bold">{avatar.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  );
};

export default Profile;
