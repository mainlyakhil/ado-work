import { ChevronLeft, Lightbulb, Share2, Copy, Check, RefreshCw, Users, TrendingUp, Heart, Bookmark } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { useToast } from "@/hooks/use-toast";

interface Tip {
  id: number;
  title: string;
  content: string;
  category: string;
  liked: boolean;
  saved: boolean;
}

const allTips: Tip[] = [
  { id: 1, title: "Progressive Overload", content: "Gradually increase weight, reps, or sets each week. This is the #1 principle for muscle growth. Even adding 1 rep per session compounds into massive gains over months.", category: "💪 Muscle", liked: false, saved: false },
  { id: 2, title: "Protein Timing", content: "Consume 20-40g of protein within 2 hours post-workout. Your muscles are most receptive to amino acids during this anabolic window for optimal recovery.", category: "🍗 Nutrition", liked: false, saved: false },
  { id: 3, title: "Sleep for Gains", content: "Aim for 7-9 hours of quality sleep. Growth hormone peaks during deep sleep phases. Poor sleep can reduce muscle protein synthesis by up to 18%.", category: "😴 Recovery", liked: false, saved: false },
  { id: 4, title: "Compound Movements First", content: "Start workouts with compound lifts (squat, deadlift, bench, overhead press). They recruit multiple muscle groups and trigger the greatest hormonal response.", category: "💪 Muscle", liked: false, saved: false },
  { id: 5, title: "Hydration Matters", content: "Drink at least 3-4 liters of water daily. Even 2% dehydration can reduce strength by 10% and endurance by 20%. Add electrolytes during intense sessions.", category: "🍗 Nutrition", liked: false, saved: false },
  { id: 6, title: "Mind-Muscle Connection", content: "Focus on feeling the target muscle contract during each rep. Studies show this can increase muscle activation by up to 20%, leading to better growth.", category: "💪 Muscle", liked: false, saved: false },
  { id: 7, title: "Creatine Supplementation", content: "Take 3-5g of creatine monohydrate daily. It's the most researched supplement, proven to increase strength, power, and lean muscle mass.", category: "🍗 Nutrition", liked: false, saved: false },
  { id: 8, title: "Deload Weeks", content: "Every 4-6 weeks, reduce training volume by 40-60%. This prevents overtraining, allows full recovery, and often leads to strength breakthroughs after.", category: "😴 Recovery", liked: false, saved: false },
  { id: 9, title: "Track Your Lifts", content: "Keep a workout log to ensure progressive overload. If you're not tracking, you're guessing. Data-driven training leads to 30% faster progress.", category: "📊 Strategy", liked: false, saved: false },
  { id: 10, title: "Eat in Surplus", content: "To build muscle, eat 300-500 calories above maintenance. Focus on lean proteins, complex carbs, and healthy fats. Clean bulking minimizes fat gain.", category: "🍗 Nutrition", liked: false, saved: false },
  { id: 11, title: "Warm Up Properly", content: "Spend 5-10 min warming up with dynamic stretches and light cardio. This increases blood flow, reduces injury risk by 50%, and improves performance.", category: "📊 Strategy", liked: false, saved: false },
  { id: 12, title: "Rest Between Sets", content: "For strength: rest 2-5 min. For hypertrophy: 60-90 sec. For endurance: 30-60 sec. Proper rest intervals maximize your training stimulus.", category: "📊 Strategy", liked: false, saved: false },
];

const Community = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tips, setTips] = useState<Tip[]>([]);
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const inviteCode = "FITTRACK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const [savedInvite] = useState(inviteCode);

  const getDailyTips = useCallback(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const shuffled = [...allTips].sort((a, b) => {
      const hashA = (a.id * seed) % 100;
      const hashB = (b.id * seed) % 100;
      return hashA - hashB;
    });
    return shuffled.slice(0, 6);
  }, []);

  useEffect(() => {
    setTips(getDailyTips());
  }, [getDailyTips]);

  const refreshTips = () => {
    const shuffled = [...allTips].sort(() => Math.random() - 0.5).slice(0, 6);
    setTips(shuffled);
    toast({ title: "Tips refreshed!", description: "New fitness tips loaded for you." });
  };

  const toggleLike = (id: number) => {
    setTips((prev) => prev.map((t) => (t.id === id ? { ...t, liked: !t.liked } : t)));
  };

  const toggleSave = (id: number) => {
    setTips((prev) => prev.map((t) => (t.id === id ? { ...t, saved: !t.saved } : t)));
  };

  const copyInvite = () => {
    navigator.clipboard.writeText(`Join me on FitTrack! Use my invite code: ${savedInvite}\nDownload: https://fittrack.app/invite/${savedInvite}`);
    setCopied(true);
    toast({ title: "Invite link copied!", description: "Share it with your friends to compare progress." });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareInvite = async () => {
    const shareData = {
      title: "Join FitTrack!",
      text: `Join me on FitTrack and let's compare our fitness progress! Use code: ${savedInvite}`,
      url: `https://fittrack.app/invite/${savedInvite}`,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      copyInvite();
    }
  };

  const categories = ["All", "💪 Muscle", "🍗 Nutrition", "😴 Recovery", "📊 Strategy"];
  const filteredTips = selectedCategory === "All" ? tips : tips.filter((t) => t.category === selectedCategory);

  return (
    <MobileLayout>
      <div className="animate-fade-in px-4 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold">Community</h1>
          <button onClick={refreshTips} className="p-1">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Invite Card */}
        <div className="mt-4 gym-gradient-orange rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary-foreground" />
            <h3 className="text-sm font-bold text-primary-foreground">Challenge Your Friends</h3>
          </div>
          <p className="mt-1 text-[10px] text-primary-foreground/80">
            Share your invite link and compare workout progress with friends!
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-background/20 px-3 py-2">
            <code className="flex-1 text-[10px] font-mono font-bold text-primary-foreground">{savedInvite}</code>
            <button onClick={copyInvite} className="p-1">
              {copied ? (
                <Check className="h-4 w-4 text-primary-foreground" />
              ) : (
                <Copy className="h-4 w-4 text-primary-foreground" />
              )}
            </button>
          </div>
          <button
            onClick={shareInvite}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-background py-2.5 text-xs font-bold text-primary active:scale-95 transition-transform"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share Invite Link
          </button>
        </div>

        {/* Progress Comparison Teaser */}
        <div className="mt-4 gym-gradient-card rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-bold">Friends Leaderboard</h3>
          </div>
          <div className="mt-3 space-y-2">
            {[
              { name: "You", workouts: 6, streak: 3 },
              { name: "Invite friends to compare!", workouts: 0, streak: 0 },
            ].map((friend, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-xl p-2.5 ${i === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary"}`}>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-xs font-semibold">{friend.name}</p>
                  {friend.workouts > 0 && (
                    <p className="text-[10px] text-muted-foreground">{friend.workouts} workouts · {friend.streak} day streak</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Tips */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-gym-gold" />
            <h2 className="text-sm font-bold">Daily Fitness Tips</h2>
          </div>

          <div className="mt-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "gym-gradient-orange text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-3 space-y-3 pb-4">
            {filteredTips.map((tip) => (
              <div key={tip.id} className="gym-gradient-card rounded-2xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary">{tip.category}</span>
                    <h3 className="mt-0.5 text-sm font-bold">{tip.title}</h3>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{tip.content}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
                  <button onClick={() => toggleLike(tip.id)} className="flex items-center gap-1">
                    <Heart className={`h-3.5 w-3.5 transition-colors ${tip.liked ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                    <span className="text-[10px] text-muted-foreground">{tip.liked ? "Liked" : "Like"}</span>
                  </button>
                  <button onClick={() => toggleSave(tip.id)} className="flex items-center gap-1">
                    <Bookmark className={`h-3.5 w-3.5 transition-colors ${tip.saved ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                    <span className="text-[10px] text-muted-foreground">{tip.saved ? "Saved" : "Save"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Community;
