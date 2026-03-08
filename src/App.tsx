import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DietTracker from "./pages/DietTracker";
import DietInsight from "./pages/DietInsight";
import WorkoutTracker from "./pages/WorkoutTracker";
import Profile from "./pages/Profile";
import Plans from "./pages/Plans";
import Workouts from "./pages/Workouts";
import Community from "./pages/Community";
import BodyPartWorkout from "./pages/BodyPartWorkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diet" element={<DietTracker />} />
          <Route path="/diet-insight" element={<DietInsight />} />
          <Route path="/workout" element={<WorkoutTracker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/community" element={<Community />} />
          <Route path="/body/:part" element={<BodyPartWorkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
