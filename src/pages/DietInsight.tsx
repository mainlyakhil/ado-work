import { ChevronLeft, ChevronDown, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts";
import MobileLayout from "@/components/MobileLayout";

const chartData = [
  { day: "Mon\n02", value: 200 },
  { day: "Tue\n03", value: 800 },
  { day: "Wed\n04", value: 2900 },
  { day: "Thu\n05", value: 1200 },
  { day: "Fri\n06", value: 2600 },
  { day: "Sat\n07", value: 400 },
  { day: "Sun\n08", value: 1800 },
];

const macros = [
  { name: "Protein", pct: 14.9, color: "hsl(var(--primary))" },
  { name: "Carbs", pct: 60.16, color: "hsl(var(--primary))" },
  { name: "Fats", pct: 17.32, color: "hsl(var(--primary))" },
  { name: "Fiber", pct: 7.62, color: "hsl(var(--primary))" },
];

const DietInsight = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="animate-fade-in px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold">Diet Insight</h1>
          <div className="w-6" />
        </div>

        {/* Chart Section */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-muted-foreground">
              Calories Consumption Analysis
            </h2>
            <button className="flex items-center gap-1 text-[10px] font-semibold text-primary">
              Current Week <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          <div className="mt-3 flex gap-6">
            <div>
              <p className="text-lg font-bold gym-text-gradient">7382.00 Kcal</p>
              <p className="text-[10px] text-muted-foreground">Weekly Total</p>
            </div>
            <div>
              <p className="text-lg font-bold">1476.00 Kcal</p>
              <p className="text-[10px] text-muted-foreground">Average Per Day</p>
            </div>
          </div>

          <div className="mt-3 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(27, 96%, 54%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(27, 96%, 54%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  ticks={[0, 580, 1160, 1740, 2320, 2900]}
                />
                <ReferenceLine
                  y={1476}
                  stroke="hsl(0, 70%, 50%)"
                  strokeDasharray="6 4"
                  strokeWidth={1.5}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(27, 96%, 54%)"
                  strokeWidth={2.5}
                  fill="url(#colorValue)"
                  dot={{ fill: "hsl(27, 96%, 54%)", r: 4, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Macronutrients Breakdown */}
        <div className="mt-5 gym-gradient-card rounded-2xl p-4">
          <h3 className="text-sm font-bold">Macronutrients Breakdown</h3>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <span className="text-lg">🍽</span>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-bold text-primary">7382.00</span>
                <span className="text-muted-foreground"> of 19492.55</span>
              </p>
              <p className="text-[10px] text-muted-foreground">Calories Consumed</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {macros.map((macro) => (
              <div key={macro.name} className="flex items-center gap-3">
                <span className="w-14 text-xs text-muted-foreground">{macro.name}</span>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${macro.pct}%` }}
                  />
                </div>
                <span className="w-12 text-right text-[10px] font-semibold">{macro.pct.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip */}
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-secondary p-3 pb-8">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-[10px] text-muted-foreground">
            <span className="font-semibold text-foreground">Pro Tip : </span>
            People who track their meals are very likely to achieve desired results.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default DietInsight;
