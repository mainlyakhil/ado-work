import { ChevronLeft, ChevronRight, Flame, Droplets, Beef, Wheat, Apple, Clock, Star, Sparkles, Leaf, Coffee, Sun, Moon, Sunset, Zap, Heart, Check, Plus, Minus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";

type Goal = "lose" | "maintain" | "gain" | "bulk";
type DietType = "balanced" | "highProtein" | "keto" | "vegan" | "paleo" | "mediterranean";

interface MealItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  emoji: string;
  quantity: string;
}

interface Meal {
  id: string;
  name: string;
  time: string;
  icon: typeof Sun;
  items: MealItem[];
  totalCalories: number;
}

const goalConfig: Record<Goal, { label: string; emoji: string; color: string; desc: string; calorieAdjust: number }> = {
  lose: { label: "Fat Loss", emoji: "🔥", color: "from-red-500/20 to-orange-500/20", desc: "Calorie deficit for steady fat loss", calorieAdjust: -500 },
  maintain: { label: "Maintain", emoji: "⚖️", color: "from-blue-500/20 to-cyan-500/20", desc: "Keep your current physique", calorieAdjust: 0 },
  gain: { label: "Lean Gain", emoji: "💪", color: "from-green-500/20 to-emerald-500/20", desc: "Build muscle with minimal fat", calorieAdjust: 300 },
  bulk: { label: "Bulk Up", emoji: "🦍", color: "from-purple-500/20 to-violet-500/20", desc: "Maximum muscle and strength gains", calorieAdjust: 700 },
};

const dietTypes: Record<DietType, { label: string; emoji: string; desc: string }> = {
  balanced: { label: "Balanced", emoji: "⚖️", desc: "50/30/20 macro split" },
  highProtein: { label: "High Protein", emoji: "🥩", desc: "40% protein focus" },
  keto: { label: "Keto", emoji: "🥑", desc: "High fat, very low carb" },
  vegan: { label: "Plant-Based", emoji: "🌱", desc: "100% vegan meals" },
  paleo: { label: "Paleo", emoji: "🍖", desc: "Whole foods, no grains" },
  mediterranean: { label: "Mediterranean", emoji: "🫒", desc: "Heart-healthy fats" },
};

const mealPlans: Record<DietType, Record<Goal, Meal[]>> = {
  balanced: {
    lose: [
      { id: "b1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 350, items: [
        { name: "Egg White Omelette", calories: 150, protein: 22, carbs: 2, fat: 5, emoji: "🍳", quantity: "3 whites" },
        { name: "Whole Wheat Toast", calories: 80, protein: 3, carbs: 15, fat: 1, emoji: "🍞", quantity: "1 slice" },
        { name: "Greek Yogurt", calories: 100, protein: 15, carbs: 6, fat: 3, emoji: "🥛", quantity: "150g" },
        { name: "Berries", calories: 20, protein: 0, carbs: 5, fat: 0, emoji: "🫐", quantity: "handful" },
      ]},
      { id: "b2", name: "Mid-Morning Snack", time: "10:00 AM", icon: Coffee, totalCalories: 180, items: [
        { name: "Apple", calories: 80, protein: 0, carbs: 21, fat: 0, emoji: "🍎", quantity: "1 medium" },
        { name: "Almonds", calories: 100, protein: 4, carbs: 3, fat: 9, emoji: "🥜", quantity: "15 pcs" },
      ]},
      { id: "b3", name: "Lunch", time: "1:00 PM", icon: Sun, totalCalories: 450, items: [
        { name: "Grilled Chicken Breast", calories: 200, protein: 38, carbs: 0, fat: 4, emoji: "🍗", quantity: "180g" },
        { name: "Brown Rice", calories: 130, protein: 3, carbs: 28, fat: 1, emoji: "🍚", quantity: "100g" },
        { name: "Mixed Vegetables", calories: 60, protein: 3, carbs: 12, fat: 0, emoji: "🥗", quantity: "1 cup" },
        { name: "Olive Oil Dressing", calories: 60, protein: 0, carbs: 0, fat: 7, emoji: "🫒", quantity: "1 tbsp" },
      ]},
      { id: "b4", name: "Afternoon Snack", time: "4:00 PM", icon: Sunset, totalCalories: 200, items: [
        { name: "Protein Shake", calories: 120, protein: 24, carbs: 3, fat: 1, emoji: "🥤", quantity: "1 scoop" },
        { name: "Banana", calories: 80, protein: 1, carbs: 20, fat: 0, emoji: "🍌", quantity: "1 medium" },
      ]},
      { id: "b5", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 400, items: [
        { name: "Salmon Fillet", calories: 230, protein: 25, carbs: 0, fat: 14, emoji: "🐟", quantity: "150g" },
        { name: "Sweet Potato", calories: 100, protein: 2, carbs: 23, fat: 0, emoji: "🍠", quantity: "1 medium" },
        { name: "Steamed Broccoli", calories: 40, protein: 4, carbs: 7, fat: 0, emoji: "🥦", quantity: "1 cup" },
        { name: "Lemon Herb Sauce", calories: 30, protein: 0, carbs: 2, fat: 3, emoji: "🍋", quantity: "1 tbsp" },
      ]},
      { id: "b6", name: "Evening Snack", time: "9:00 PM", icon: Moon, totalCalories: 120, items: [
        { name: "Cottage Cheese", calories: 90, protein: 12, carbs: 3, fat: 4, emoji: "🧀", quantity: "100g" },
        { name: "Cinnamon", calories: 5, protein: 0, carbs: 1, fat: 0, emoji: "✨", quantity: "1 tsp" },
        { name: "Walnuts", calories: 25, protein: 1, carbs: 0, fat: 2, emoji: "🥜", quantity: "3 pcs" },
      ]},
    ],
    maintain: [
      { id: "m1", name: "Breakfast", time: "7:30 AM", icon: Sun, totalCalories: 500, items: [
        { name: "Scrambled Eggs", calories: 220, protein: 18, carbs: 2, fat: 16, emoji: "🍳", quantity: "3 whole" },
        { name: "Avocado Toast", calories: 200, protein: 4, carbs: 22, fat: 12, emoji: "🥑", quantity: "1 slice" },
        { name: "Orange Juice", calories: 80, protein: 1, carbs: 18, fat: 0, emoji: "🍊", quantity: "200ml" },
      ]},
      { id: "m2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 650, items: [
        { name: "Turkey Wrap", calories: 350, protein: 30, carbs: 35, fat: 10, emoji: "🌯", quantity: "1 large" },
        { name: "Mixed Greens Salad", calories: 80, protein: 3, carbs: 10, fat: 3, emoji: "🥗", quantity: "1 bowl" },
        { name: "Hummus", calories: 120, protein: 5, carbs: 12, fat: 7, emoji: "🫘", quantity: "3 tbsp" },
        { name: "Pita Chips", calories: 100, protein: 2, carbs: 16, fat: 3, emoji: "🫓", quantity: "10 pcs" },
      ]},
      { id: "m3", name: "Snack", time: "3:30 PM", icon: Coffee, totalCalories: 250, items: [
        { name: "Protein Bar", calories: 200, protein: 20, carbs: 22, fat: 8, emoji: "🍫", quantity: "1 bar" },
        { name: "Green Tea", calories: 5, protein: 0, carbs: 0, fat: 0, emoji: "🍵", quantity: "1 cup" },
        { name: "Dark Chocolate", calories: 45, protein: 1, carbs: 5, fat: 3, emoji: "🍫", quantity: "2 squares" },
      ]},
      { id: "m4", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 600, items: [
        { name: "Steak", calories: 300, protein: 35, carbs: 0, fat: 18, emoji: "🥩", quantity: "200g" },
        { name: "Baked Potato", calories: 160, protein: 4, carbs: 36, fat: 0, emoji: "🥔", quantity: "1 large" },
        { name: "Caesar Salad", calories: 140, protein: 5, carbs: 8, fat: 10, emoji: "🥗", quantity: "1 serving" },
      ]},
    ],
    gain: [
      { id: "g1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 650, items: [
        { name: "Oatmeal", calories: 200, protein: 7, carbs: 36, fat: 4, emoji: "🥣", quantity: "1 cup" },
        { name: "Whole Eggs", calories: 220, protein: 18, carbs: 2, fat: 16, emoji: "🍳", quantity: "3 large" },
        { name: "Banana", calories: 100, protein: 1, carbs: 25, fat: 0, emoji: "🍌", quantity: "1 large" },
        { name: "Peanut Butter", calories: 130, protein: 5, carbs: 4, fat: 11, emoji: "🥜", quantity: "2 tbsp" },
      ]},
      { id: "g2", name: "Mid-Morning", time: "10:00 AM", icon: Coffee, totalCalories: 400, items: [
        { name: "Mass Gainer Shake", calories: 300, protein: 30, carbs: 40, fat: 5, emoji: "🥤", quantity: "1 serving" },
        { name: "Mixed Nuts", calories: 100, protein: 3, carbs: 4, fat: 9, emoji: "🥜", quantity: "30g" },
      ]},
      { id: "g3", name: "Lunch", time: "1:00 PM", icon: Sun, totalCalories: 750, items: [
        { name: "Chicken Thighs", calories: 280, protein: 32, carbs: 0, fat: 16, emoji: "🍗", quantity: "200g" },
        { name: "Jasmine Rice", calories: 250, protein: 5, carbs: 55, fat: 1, emoji: "🍚", quantity: "200g" },
        { name: "Black Beans", calories: 120, protein: 8, carbs: 20, fat: 1, emoji: "🫘", quantity: "100g" },
        { name: "Guacamole", calories: 100, protein: 1, carbs: 5, fat: 9, emoji: "🥑", quantity: "3 tbsp" },
      ]},
      { id: "g4", name: "Pre-Workout", time: "4:00 PM", icon: Zap, totalCalories: 350, items: [
        { name: "Rice Cakes", calories: 70, protein: 1, carbs: 15, fat: 0, emoji: "🍘", quantity: "2 pcs" },
        { name: "Honey", calories: 60, protein: 0, carbs: 16, fat: 0, emoji: "🍯", quantity: "1 tbsp" },
        { name: "Whey Protein", calories: 120, protein: 24, carbs: 3, fat: 1, emoji: "🥤", quantity: "1 scoop" },
        { name: "Banana", calories: 100, protein: 1, carbs: 25, fat: 0, emoji: "🍌", quantity: "1 large" },
      ]},
      { id: "g5", name: "Dinner", time: "7:30 PM", icon: Moon, totalCalories: 700, items: [
        { name: "Beef Stir Fry", calories: 350, protein: 35, carbs: 15, fat: 18, emoji: "🥩", quantity: "250g" },
        { name: "Noodles", calories: 200, protein: 6, carbs: 40, fat: 2, emoji: "🍜", quantity: "150g" },
        { name: "Stir-Fry Veggies", calories: 80, protein: 3, carbs: 12, fat: 2, emoji: "🥦", quantity: "1 cup" },
        { name: "Sesame Oil", calories: 70, protein: 0, carbs: 0, fat: 8, emoji: "🫙", quantity: "1 tbsp" },
      ]},
      { id: "g6", name: "Before Bed", time: "10:00 PM", icon: Moon, totalCalories: 300, items: [
        { name: "Casein Protein", calories: 130, protein: 24, carbs: 4, fat: 2, emoji: "🥛", quantity: "1 scoop" },
        { name: "Peanut Butter", calories: 130, protein: 5, carbs: 4, fat: 11, emoji: "🥜", quantity: "2 tbsp" },
        { name: "Honey", calories: 40, protein: 0, carbs: 11, fat: 0, emoji: "🍯", quantity: "1 tsp" },
      ]},
    ],
    bulk: [
      { id: "bk1", name: "Breakfast", time: "6:30 AM", icon: Sun, totalCalories: 800, items: [
        { name: "Pancakes", calories: 300, protein: 8, carbs: 50, fat: 8, emoji: "🥞", quantity: "3 large" },
        { name: "Whole Eggs + Bacon", calories: 350, protein: 25, carbs: 2, fat: 28, emoji: "🥓", quantity: "3 eggs + 3 strips" },
        { name: "Milk", calories: 150, protein: 8, carbs: 12, fat: 8, emoji: "🥛", quantity: "350ml" },
      ]},
      { id: "bk2", name: "Mid-Morning", time: "9:30 AM", icon: Coffee, totalCalories: 500, items: [
        { name: "Trail Mix", calories: 250, protein: 7, carbs: 25, fat: 15, emoji: "🥜", quantity: "60g" },
        { name: "Mass Shake", calories: 250, protein: 30, carbs: 30, fat: 5, emoji: "🥤", quantity: "1 serving" },
      ]},
      { id: "bk3", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 900, items: [
        { name: "Double Chicken Burger", calories: 500, protein: 45, carbs: 40, fat: 18, emoji: "🍔", quantity: "1 large" },
        { name: "Sweet Potato Fries", calories: 250, protein: 3, carbs: 40, fat: 10, emoji: "🍟", quantity: "1 portion" },
        { name: "Coleslaw", calories: 150, protein: 1, carbs: 12, fat: 11, emoji: "🥗", quantity: "1 cup" },
      ]},
      { id: "bk4", name: "Pre-Workout", time: "3:30 PM", icon: Zap, totalCalories: 450, items: [
        { name: "Bagel w/ Cream Cheese", calories: 300, protein: 10, carbs: 50, fat: 8, emoji: "🥯", quantity: "1 large" },
        { name: "Protein Shake", calories: 150, protein: 30, carbs: 5, fat: 2, emoji: "🥤", quantity: "1 scoop" },
      ]},
      { id: "bk5", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 850, items: [
        { name: "Ribeye Steak", calories: 400, protein: 40, carbs: 0, fat: 26, emoji: "🥩", quantity: "250g" },
        { name: "Mashed Potatoes", calories: 250, protein: 4, carbs: 35, fat: 12, emoji: "🥔", quantity: "200g" },
        { name: "Buttered Corn", calories: 120, protein: 3, carbs: 20, fat: 4, emoji: "🌽", quantity: "1 cob" },
        { name: "Dinner Roll", calories: 80, protein: 2, carbs: 14, fat: 2, emoji: "🍞", quantity: "1 roll" },
      ]},
      { id: "bk6", name: "Night Snack", time: "10:00 PM", icon: Moon, totalCalories: 400, items: [
        { name: "PB&J Sandwich", calories: 350, protein: 12, carbs: 45, fat: 14, emoji: "🥪", quantity: "1 large" },
        { name: "Whole Milk", calories: 150, protein: 8, carbs: 12, fat: 8, emoji: "🥛", quantity: "300ml" },
      ]},
    ],
  },
  highProtein: {
    lose: [
      { id: "hp1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 400, items: [
        { name: "Egg Whites", calories: 100, protein: 22, carbs: 1, fat: 0, emoji: "🍳", quantity: "6 whites" },
        { name: "Turkey Sausage", calories: 120, protein: 14, carbs: 1, fat: 7, emoji: "🌭", quantity: "2 links" },
        { name: "Spinach", calories: 20, protein: 3, carbs: 2, fat: 0, emoji: "🥬", quantity: "2 cups" },
        { name: "Cottage Cheese", calories: 160, protein: 24, carbs: 6, fat: 5, emoji: "🧀", quantity: "200g" },
      ]},
      { id: "hp2", name: "Lunch", time: "12:00 PM", icon: Sun, totalCalories: 450, items: [
        { name: "Tuna Steak", calories: 200, protein: 42, carbs: 0, fat: 2, emoji: "🐟", quantity: "200g" },
        { name: "Quinoa", calories: 120, protein: 4, carbs: 21, fat: 2, emoji: "🌾", quantity: "80g" },
        { name: "Asparagus", calories: 40, protein: 4, carbs: 6, fat: 0, emoji: "🥦", quantity: "8 spears" },
        { name: "Lemon Vinaigrette", calories: 40, protein: 0, carbs: 1, fat: 4, emoji: "🍋", quantity: "1 tbsp" },
      ]},
      { id: "hp3", name: "Snack", time: "3:30 PM", icon: Coffee, totalCalories: 200, items: [
        { name: "Protein Shake", calories: 120, protein: 24, carbs: 3, fat: 1, emoji: "🥤", quantity: "1 scoop" },
        { name: "Celery + PB", calories: 80, protein: 3, carbs: 4, fat: 6, emoji: "🥜", quantity: "2 stalks" },
      ]},
      { id: "hp4", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 500, items: [
        { name: "Grilled Tilapia", calories: 200, protein: 40, carbs: 0, fat: 4, emoji: "🐟", quantity: "250g" },
        { name: "Steamed Vegetables", calories: 60, protein: 4, carbs: 10, fat: 0, emoji: "🥦", quantity: "2 cups" },
        { name: "Cauliflower Rice", calories: 50, protein: 2, carbs: 8, fat: 0, emoji: "🍚", quantity: "1 cup" },
        { name: "Tzatziki", calories: 40, protein: 2, carbs: 3, fat: 2, emoji: "🫙", quantity: "2 tbsp" },
      ]},
    ],
    maintain: [
      { id: "hpm1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 550, items: [
        { name: "Protein Oats", calories: 350, protein: 30, carbs: 40, fat: 8, emoji: "🥣", quantity: "1 bowl" },
        { name: "Greek Yogurt", calories: 120, protein: 18, carbs: 6, fat: 4, emoji: "🥛", quantity: "200g" },
        { name: "Blueberries", calories: 40, protein: 0, carbs: 10, fat: 0, emoji: "🫐", quantity: "½ cup" },
        { name: "Honey Drizzle", calories: 40, protein: 0, carbs: 11, fat: 0, emoji: "🍯", quantity: "1 tsp" },
      ]},
      { id: "hpm2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 650, items: [
        { name: "Chicken Breast", calories: 250, protein: 46, carbs: 0, fat: 6, emoji: "🍗", quantity: "220g" },
        { name: "Sweet Potato", calories: 180, protein: 3, carbs: 42, fat: 0, emoji: "🍠", quantity: "1 large" },
        { name: "Green Beans", calories: 50, protein: 3, carbs: 8, fat: 0, emoji: "🫛", quantity: "1 cup" },
        { name: "Tahini Dressing", calories: 70, protein: 2, carbs: 3, fat: 6, emoji: "🫙", quantity: "1 tbsp" },
      ]},
      { id: "hpm3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 600, items: [
        { name: "Lean Ground Beef", calories: 300, protein: 35, carbs: 0, fat: 18, emoji: "🥩", quantity: "200g" },
        { name: "Pasta", calories: 200, protein: 7, carbs: 40, fat: 1, emoji: "🍝", quantity: "100g" },
        { name: "Marinara Sauce", calories: 50, protein: 2, carbs: 10, fat: 1, emoji: "🍅", quantity: "½ cup" },
        { name: "Parmesan", calories: 50, protein: 4, carbs: 1, fat: 3, emoji: "🧀", quantity: "1 tbsp" },
      ]},
    ],
    gain: [
      { id: "hpg1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 700, items: [
        { name: "Whole Eggs", calories: 280, protein: 24, carbs: 2, fat: 20, emoji: "🍳", quantity: "4 large" },
        { name: "Oatmeal + Protein", calories: 320, protein: 30, carbs: 40, fat: 6, emoji: "🥣", quantity: "1 bowl" },
        { name: "Fruit Bowl", calories: 100, protein: 1, carbs: 25, fat: 0, emoji: "🍓", quantity: "1 cup" },
      ]},
      { id: "hpg2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 800, items: [
        { name: "Double Chicken Breast", calories: 400, protein: 72, carbs: 0, fat: 10, emoji: "🍗", quantity: "350g" },
        { name: "Brown Rice", calories: 250, protein: 5, carbs: 52, fat: 2, emoji: "🍚", quantity: "200g" },
        { name: "Avocado", calories: 150, protein: 2, carbs: 8, fat: 14, emoji: "🥑", quantity: "½ large" },
      ]},
      { id: "hpg3", name: "Dinner", time: "7:30 PM", icon: Moon, totalCalories: 750, items: [
        { name: "Salmon", calories: 350, protein: 40, carbs: 0, fat: 20, emoji: "🐟", quantity: "250g" },
        { name: "Quinoa", calories: 200, protein: 8, carbs: 36, fat: 3, emoji: "🌾", quantity: "150g" },
        { name: "Roasted Veggies", calories: 100, protein: 3, carbs: 15, fat: 4, emoji: "🥦", quantity: "1.5 cups" },
        { name: "Olive Oil", calories: 100, protein: 0, carbs: 0, fat: 11, emoji: "🫒", quantity: "1 tbsp" },
      ]},
    ],
    bulk: [
      { id: "hpb1", name: "Breakfast", time: "6:30 AM", icon: Sun, totalCalories: 900, items: [
        { name: "5-Egg Omelette", calories: 400, protein: 35, carbs: 3, fat: 28, emoji: "🍳", quantity: "5 eggs" },
        { name: "Hash Browns", calories: 250, protein: 3, carbs: 30, fat: 13, emoji: "🥔", quantity: "200g" },
        { name: "Protein Shake", calories: 250, protein: 50, carbs: 8, fat: 3, emoji: "🥤", quantity: "2 scoops" },
      ]},
      { id: "hpb2", name: "Lunch", time: "12:00 PM", icon: Sun, totalCalories: 950, items: [
        { name: "Grilled Chicken Thighs", calories: 400, protein: 48, carbs: 0, fat: 22, emoji: "🍗", quantity: "300g" },
        { name: "White Rice", calories: 300, protein: 6, carbs: 66, fat: 1, emoji: "🍚", quantity: "250g" },
        { name: "Kidney Beans", calories: 150, protein: 10, carbs: 25, fat: 1, emoji: "🫘", quantity: "100g" },
        { name: "Sour Cream", calories: 100, protein: 1, carbs: 2, fat: 10, emoji: "🫙", quantity: "3 tbsp" },
      ]},
      { id: "hpb3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 900, items: [
        { name: "T-Bone Steak", calories: 500, protein: 50, carbs: 0, fat: 32, emoji: "🥩", quantity: "300g" },
        { name: "Loaded Baked Potato", calories: 300, protein: 8, carbs: 45, fat: 10, emoji: "🥔", quantity: "1 large" },
        { name: "Grilled Asparagus", calories: 50, protein: 4, carbs: 6, fat: 2, emoji: "🥦", quantity: "10 spears" },
        { name: "Garlic Butter", calories: 50, protein: 0, carbs: 0, fat: 6, emoji: "🧈", quantity: "1 tbsp" },
      ]},
    ],
  },
  keto: {
    lose: [
      { id: "k1", name: "Breakfast", time: "8:00 AM", icon: Sun, totalCalories: 450, items: [
        { name: "Bacon & Eggs", calories: 350, protein: 22, carbs: 1, fat: 28, emoji: "🥓", quantity: "3 eggs + 4 strips" },
        { name: "Avocado Half", calories: 100, protein: 1, carbs: 4, fat: 9, emoji: "🥑", quantity: "½" },
      ]},
      { id: "k2", name: "Lunch", time: "1:00 PM", icon: Sun, totalCalories: 500, items: [
        { name: "Bunless Burger Patty", calories: 300, protein: 28, carbs: 0, fat: 20, emoji: "🥩", quantity: "200g" },
        { name: "Cheese Slice", calories: 110, protein: 7, carbs: 0, fat: 9, emoji: "🧀", quantity: "2 slices" },
        { name: "Lettuce Wrap + Tomato", calories: 20, protein: 1, carbs: 3, fat: 0, emoji: "🥬", quantity: "2 leaves" },
        { name: "Mayo", calories: 70, protein: 0, carbs: 0, fat: 8, emoji: "🫙", quantity: "1 tbsp" },
      ]},
      { id: "k3", name: "Dinner", time: "6:30 PM", icon: Moon, totalCalories: 550, items: [
        { name: "Grilled Salmon", calories: 300, protein: 34, carbs: 0, fat: 18, emoji: "🐟", quantity: "200g" },
        { name: "Zucchini Noodles", calories: 30, protein: 2, carbs: 4, fat: 0, emoji: "🥒", quantity: "1 cup" },
        { name: "Butter Sauce", calories: 120, protein: 0, carbs: 0, fat: 14, emoji: "🧈", quantity: "1.5 tbsp" },
        { name: "Parmesan", calories: 50, protein: 4, carbs: 0, fat: 3, emoji: "🧀", quantity: "1 tbsp" },
      ]},
    ],
    maintain: [
      { id: "km1", name: "Breakfast", time: "8:00 AM", icon: Sun, totalCalories: 600, items: [
        { name: "Bulletproof Coffee", calories: 250, protein: 1, carbs: 0, fat: 28, emoji: "☕", quantity: "1 cup" },
        { name: "Cheese Omelette", calories: 350, protein: 24, carbs: 2, fat: 28, emoji: "🍳", quantity: "3 eggs + cheese" },
      ]},
      { id: "km2", name: "Lunch", time: "1:00 PM", icon: Sun, totalCalories: 650, items: [
        { name: "Chicken Caesar (no croutons)", calories: 400, protein: 35, carbs: 5, fat: 28, emoji: "🥗", quantity: "1 bowl" },
        { name: "Macadamia Nuts", calories: 200, protein: 2, carbs: 4, fat: 21, emoji: "🥜", quantity: "30g" },
        { name: "Olive Oil", calories: 50, protein: 0, carbs: 0, fat: 6, emoji: "🫒", quantity: "½ tbsp" },
      ]},
      { id: "km3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 700, items: [
        { name: "Ribeye Steak", calories: 450, protein: 40, carbs: 0, fat: 32, emoji: "🥩", quantity: "250g" },
        { name: "Creamed Spinach", calories: 150, protein: 5, carbs: 6, fat: 12, emoji: "🥬", quantity: "1 cup" },
        { name: "Garlic Butter", calories: 100, protein: 0, carbs: 0, fat: 11, emoji: "🧈", quantity: "1 tbsp" },
      ]},
    ],
    gain: [
      { id: "kg1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 750, items: [
        { name: "4-Egg Omelette w/ Cheese", calories: 500, protein: 35, carbs: 2, fat: 40, emoji: "🍳", quantity: "4 eggs" },
        { name: "Avocado", calories: 200, protein: 2, carbs: 8, fat: 18, emoji: "🥑", quantity: "1 whole" },
        { name: "Sausage Links", calories: 250, protein: 12, carbs: 1, fat: 22, emoji: "🌭", quantity: "3 links" },
      ]},
      { id: "kg2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 800, items: [
        { name: "Double Salmon", calories: 500, protein: 50, carbs: 0, fat: 32, emoji: "🐟", quantity: "300g" },
        { name: "Cauliflower Mash", calories: 150, protein: 3, carbs: 8, fat: 12, emoji: "🥦", quantity: "1.5 cups" },
        { name: "MCT Oil", calories: 100, protein: 0, carbs: 0, fat: 14, emoji: "🫙", quantity: "1 tbsp" },
      ]},
      { id: "kg3", name: "Dinner", time: "7:30 PM", icon: Moon, totalCalories: 850, items: [
        { name: "Lamb Chops", calories: 450, protein: 35, carbs: 0, fat: 34, emoji: "🍖", quantity: "250g" },
        { name: "Roasted Brussels Sprouts", calories: 100, protein: 4, carbs: 10, fat: 5, emoji: "🥬", quantity: "1 cup" },
        { name: "Blue Cheese Crumbles", calories: 100, protein: 6, carbs: 1, fat: 8, emoji: "🧀", quantity: "30g" },
        { name: "Olive Oil Drizzle", calories: 100, protein: 0, carbs: 0, fat: 11, emoji: "🫒", quantity: "1 tbsp" },
      ]},
    ],
    bulk: [
      { id: "kb1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 950, items: [
        { name: "Mega Egg Scramble", calories: 500, protein: 35, carbs: 3, fat: 40, emoji: "🍳", quantity: "5 eggs + cheese + bacon" },
        { name: "Avocado", calories: 200, protein: 2, carbs: 8, fat: 18, emoji: "🥑", quantity: "1 whole" },
        { name: "Cream Cheese", calories: 100, protein: 2, carbs: 1, fat: 10, emoji: "🧀", quantity: "2 tbsp" },
        { name: "Bulletproof Coffee", calories: 150, protein: 0, carbs: 0, fat: 17, emoji: "☕", quantity: "1 cup" },
      ]},
      { id: "kb2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 1000, items: [
        { name: "Double Burger (no bun)", calories: 600, protein: 50, carbs: 2, fat: 44, emoji: "🥩", quantity: "2 patties" },
        { name: "Bacon", calories: 200, protein: 14, carbs: 0, fat: 16, emoji: "🥓", quantity: "4 strips" },
        { name: "Cheese & Mayo", calories: 200, protein: 5, carbs: 1, fat: 18, emoji: "🧀", quantity: "generous" },
      ]},
      { id: "kb3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 950, items: [
        { name: "Prime Rib", calories: 550, protein: 45, carbs: 0, fat: 40, emoji: "🥩", quantity: "300g" },
        { name: "Creamed Spinach", calories: 200, protein: 5, carbs: 6, fat: 16, emoji: "🥬", quantity: "1.5 cups" },
        { name: "Butter & Herb Sauce", calories: 200, protein: 0, carbs: 0, fat: 22, emoji: "🧈", quantity: "2 tbsp" },
      ]},
    ],
  },
  vegan: {
    lose: [
      { id: "v1", name: "Breakfast", time: "7:30 AM", icon: Sun, totalCalories: 350, items: [
        { name: "Tofu Scramble", calories: 180, protein: 16, carbs: 4, fat: 12, emoji: "🥘", quantity: "200g" },
        { name: "Whole Grain Toast", calories: 80, protein: 3, carbs: 15, fat: 1, emoji: "🍞", quantity: "1 slice" },
        { name: "Fruit Smoothie", calories: 90, protein: 2, carbs: 20, fat: 0, emoji: "🥤", quantity: "200ml" },
      ]},
      { id: "v2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 400, items: [
        { name: "Lentil Soup", calories: 200, protein: 14, carbs: 30, fat: 2, emoji: "🍲", quantity: "1.5 cups" },
        { name: "Kale Salad", calories: 80, protein: 4, carbs: 10, fat: 2, emoji: "🥗", quantity: "2 cups" },
        { name: "Tahini Dressing", calories: 70, protein: 2, carbs: 3, fat: 6, emoji: "🫙", quantity: "1 tbsp" },
        { name: "Seeds Mix", calories: 50, protein: 3, carbs: 2, fat: 4, emoji: "🌻", quantity: "1 tbsp" },
      ]},
      { id: "v3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 400, items: [
        { name: "Chickpea Curry", calories: 250, protein: 12, carbs: 35, fat: 8, emoji: "🍛", quantity: "1.5 cups" },
        { name: "Cauliflower Rice", calories: 50, protein: 3, carbs: 8, fat: 0, emoji: "🍚", quantity: "1 cup" },
        { name: "Naan (small)", calories: 100, protein: 3, carbs: 18, fat: 2, emoji: "🫓", quantity: "½ piece" },
      ]},
    ],
    maintain: [
      { id: "vm1", name: "Breakfast", time: "7:30 AM", icon: Sun, totalCalories: 500, items: [
        { name: "Acai Bowl", calories: 350, protein: 6, carbs: 55, fat: 12, emoji: "🫐", quantity: "1 bowl" },
        { name: "Granola", calories: 100, protein: 3, carbs: 18, fat: 3, emoji: "🥣", quantity: "30g" },
        { name: "Hemp Seeds", calories: 50, protein: 5, carbs: 1, fat: 4, emoji: "🌱", quantity: "1 tbsp" },
      ]},
      { id: "vm2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 600, items: [
        { name: "Buddha Bowl", calories: 400, protein: 15, carbs: 50, fat: 16, emoji: "🥗", quantity: "1 large" },
        { name: "Tempeh", calories: 150, protein: 18, carbs: 8, fat: 7, emoji: "🥘", quantity: "100g" },
        { name: "Miso Dressing", calories: 50, protein: 2, carbs: 4, fat: 3, emoji: "🫙", quantity: "2 tbsp" },
      ]},
      { id: "vm3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 550, items: [
        { name: "Black Bean Tacos", calories: 350, protein: 15, carbs: 45, fat: 12, emoji: "🌮", quantity: "3 tacos" },
        { name: "Guacamole", calories: 120, protein: 2, carbs: 6, fat: 10, emoji: "🥑", quantity: "3 tbsp" },
        { name: "Pico de Gallo", calories: 30, protein: 1, carbs: 6, fat: 0, emoji: "🍅", quantity: "3 tbsp" },
      ]},
    ],
    gain: [
      { id: "vg1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 700, items: [
        { name: "Vegan Protein Pancakes", calories: 400, protein: 25, carbs: 50, fat: 10, emoji: "🥞", quantity: "3 large" },
        { name: "Maple Syrup", calories: 100, protein: 0, carbs: 26, fat: 0, emoji: "🍯", quantity: "2 tbsp" },
        { name: "Soy Milk Latte", calories: 100, protein: 7, carbs: 8, fat: 4, emoji: "☕", quantity: "1 large" },
        { name: "Banana", calories: 100, protein: 1, carbs: 25, fat: 0, emoji: "🍌", quantity: "1 large" },
      ]},
      { id: "vg2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 800, items: [
        { name: "Tofu Stir-Fry", calories: 300, protein: 22, carbs: 15, fat: 18, emoji: "🥘", quantity: "250g" },
        { name: "Jasmine Rice", calories: 300, protein: 6, carbs: 65, fat: 1, emoji: "🍚", quantity: "250g" },
        { name: "Edamame", calories: 120, protein: 12, carbs: 8, fat: 5, emoji: "🫛", quantity: "100g" },
        { name: "Teriyaki Sauce", calories: 50, protein: 1, carbs: 10, fat: 0, emoji: "🫙", quantity: "2 tbsp" },
      ]},
      { id: "vg3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 700, items: [
        { name: "Seitan & Veggie Bowl", calories: 350, protein: 35, carbs: 20, fat: 14, emoji: "🥘", quantity: "1 bowl" },
        { name: "Couscous", calories: 200, protein: 7, carbs: 36, fat: 1, emoji: "🌾", quantity: "150g" },
        { name: "Roasted Chickpeas", calories: 100, protein: 5, carbs: 15, fat: 3, emoji: "🫘", quantity: "80g" },
        { name: "Tahini Drizzle", calories: 50, protein: 2, carbs: 2, fat: 4, emoji: "🫙", quantity: "1 tbsp" },
      ]},
    ],
    bulk: [
      { id: "vb1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 850, items: [
        { name: "Massive Smoothie Bowl", calories: 500, protein: 20, carbs: 80, fat: 12, emoji: "🥤", quantity: "1 bowl" },
        { name: "Granola & Nuts", calories: 250, protein: 7, carbs: 30, fat: 12, emoji: "🥣", quantity: "60g" },
        { name: "Coconut Yogurt", calories: 100, protein: 1, carbs: 6, fat: 8, emoji: "🥛", quantity: "100g" },
      ]},
      { id: "vb2", name: "Lunch", time: "12:00 PM", icon: Sun, totalCalories: 900, items: [
        { name: "Beyond Burger", calories: 400, protein: 25, carbs: 30, fat: 22, emoji: "🍔", quantity: "2 patties" },
        { name: "Sweet Potato Fries", calories: 300, protein: 3, carbs: 45, fat: 12, emoji: "🍟", quantity: "large" },
        { name: "Vegan Mayo", calories: 100, protein: 0, carbs: 1, fat: 11, emoji: "🫙", quantity: "2 tbsp" },
        { name: "Side Salad", calories: 100, protein: 3, carbs: 10, fat: 5, emoji: "🥗", quantity: "1 bowl" },
      ]},
      { id: "vb3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 800, items: [
        { name: "Peanut Noodle Bowl", calories: 500, protein: 20, carbs: 60, fat: 22, emoji: "🍜", quantity: "1 large" },
        { name: "Crispy Tofu", calories: 200, protein: 16, carbs: 10, fat: 12, emoji: "🥘", quantity: "150g" },
        { name: "Coconut Milk Curry", calories: 100, protein: 2, carbs: 4, fat: 8, emoji: "🍛", quantity: "½ cup" },
      ]},
    ],
  },
  paleo: {
    lose: [
      { id: "p1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 400, items: [
        { name: "Eggs & Sweet Potato Hash", calories: 300, protein: 18, carbs: 25, fat: 14, emoji: "🍳", quantity: "2 eggs + 100g SP" },
        { name: "Mixed Berries", calories: 50, protein: 1, carbs: 12, fat: 0, emoji: "🫐", quantity: "½ cup" },
        { name: "Coconut Oil", calories: 50, protein: 0, carbs: 0, fat: 6, emoji: "🥥", quantity: "½ tbsp" },
      ]},
      { id: "p2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 450, items: [
        { name: "Grilled Chicken", calories: 200, protein: 38, carbs: 0, fat: 4, emoji: "🍗", quantity: "180g" },
        { name: "Roasted Root Veggies", calories: 150, protein: 3, carbs: 30, fat: 4, emoji: "🥕", quantity: "1.5 cups" },
        { name: "Olive Oil", calories: 60, protein: 0, carbs: 0, fat: 7, emoji: "🫒", quantity: "½ tbsp" },
        { name: "Lemon Squeeze", calories: 5, protein: 0, carbs: 1, fat: 0, emoji: "🍋", quantity: "½ lemon" },
      ]},
      { id: "p3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 500, items: [
        { name: "Wild Salmon", calories: 280, protein: 32, carbs: 0, fat: 16, emoji: "🐟", quantity: "200g" },
        { name: "Cauliflower Mash", calories: 80, protein: 3, carbs: 10, fat: 4, emoji: "🥦", quantity: "1 cup" },
        { name: "Sautéed Kale", calories: 60, protein: 3, carbs: 6, fat: 3, emoji: "🥬", quantity: "2 cups" },
        { name: "Ghee", calories: 45, protein: 0, carbs: 0, fat: 5, emoji: "🧈", quantity: "½ tbsp" },
      ]},
    ],
    maintain: [
      { id: "pm1", name: "Breakfast", time: "7:30 AM", icon: Sun, totalCalories: 550, items: [
        { name: "Steak & Eggs", calories: 400, protein: 38, carbs: 0, fat: 28, emoji: "🥩", quantity: "150g steak + 2 eggs" },
        { name: "Avocado", calories: 100, protein: 1, carbs: 4, fat: 9, emoji: "🥑", quantity: "½" },
        { name: "Sweet Potato", calories: 50, protein: 1, carbs: 12, fat: 0, emoji: "🍠", quantity: "small" },
      ]},
      { id: "pm2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 600, items: [
        { name: "Turkey Lettuce Wraps", calories: 300, protein: 30, carbs: 6, fat: 18, emoji: "🥬", quantity: "3 wraps" },
        { name: "Fruit Salad", calories: 150, protein: 1, carbs: 35, fat: 0, emoji: "🍓", quantity: "1 cup" },
        { name: "Macadamia Nuts", calories: 150, protein: 2, carbs: 3, fat: 16, emoji: "🥜", quantity: "20g" },
      ]},
      { id: "pm3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 650, items: [
        { name: "Grilled Lamb", calories: 350, protein: 30, carbs: 0, fat: 25, emoji: "🍖", quantity: "200g" },
        { name: "Roasted Squash", calories: 120, protein: 2, carbs: 22, fat: 3, emoji: "🎃", quantity: "1 cup" },
        { name: "Asparagus", calories: 50, protein: 4, carbs: 6, fat: 1, emoji: "🥦", quantity: "8 spears" },
        { name: "Herbed Ghee", calories: 80, protein: 0, carbs: 0, fat: 9, emoji: "🧈", quantity: "1 tbsp" },
      ]},
    ],
    gain: [
      { id: "pg1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 700, items: [
        { name: "3-Egg Scramble w/ Sausage", calories: 400, protein: 30, carbs: 2, fat: 30, emoji: "🍳", quantity: "3 eggs + 2 sausages" },
        { name: "Sweet Potato", calories: 150, protein: 2, carbs: 35, fat: 0, emoji: "🍠", quantity: "1 medium" },
        { name: "Coconut Oil", calories: 100, protein: 0, carbs: 0, fat: 11, emoji: "🥥", quantity: "1 tbsp" },
        { name: "Fresh Fruit", calories: 50, protein: 1, carbs: 12, fat: 0, emoji: "🍓", quantity: "½ cup" },
      ]},
      { id: "pg2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 750, items: [
        { name: "Bison Steak", calories: 350, protein: 42, carbs: 0, fat: 20, emoji: "🥩", quantity: "250g" },
        { name: "Mashed Plantains", calories: 200, protein: 1, carbs: 50, fat: 1, emoji: "🍌", quantity: "1.5 cups" },
        { name: "Sautéed Greens", calories: 80, protein: 4, carbs: 8, fat: 4, emoji: "🥬", quantity: "2 cups" },
        { name: "Avocado Oil", calories: 80, protein: 0, carbs: 0, fat: 9, emoji: "🫒", quantity: "1 tbsp" },
      ]},
      { id: "pg3", name: "Dinner", time: "7:30 PM", icon: Moon, totalCalories: 700, items: [
        { name: "Roasted Chicken Thighs", calories: 350, protein: 35, carbs: 0, fat: 22, emoji: "🍗", quantity: "250g" },
        { name: "Root Veggie Medley", calories: 200, protein: 3, carbs: 40, fat: 4, emoji: "🥕", quantity: "2 cups" },
        { name: "Bone Broth", calories: 50, protein: 10, carbs: 1, fat: 1, emoji: "🍲", quantity: "1 cup" },
        { name: "Olive Oil", calories: 60, protein: 0, carbs: 0, fat: 7, emoji: "🫒", quantity: "½ tbsp" },
      ]},
    ],
    bulk: [
      { id: "pbu1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 900, items: [
        { name: "Steak & 4 Eggs", calories: 600, protein: 50, carbs: 0, fat: 42, emoji: "🥩", quantity: "200g + 4 eggs" },
        { name: "Sweet Potato Mash", calories: 200, protein: 2, carbs: 45, fat: 1, emoji: "🍠", quantity: "200g" },
        { name: "Coconut Milk", calories: 100, protein: 1, carbs: 2, fat: 10, emoji: "🥥", quantity: "150ml" },
      ]},
      { id: "pbu2", name: "Lunch", time: "12:00 PM", icon: Sun, totalCalories: 950, items: [
        { name: "Whole Roasted Chicken Leg", calories: 500, protein: 40, carbs: 0, fat: 36, emoji: "🍗", quantity: "1 large" },
        { name: "Plantain Chips", calories: 250, protein: 1, carbs: 35, fat: 13, emoji: "🍌", quantity: "100g" },
        { name: "Guacamole", calories: 150, protein: 2, carbs: 8, fat: 13, emoji: "🥑", quantity: "4 tbsp" },
      ]},
      { id: "pbu3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 850, items: [
        { name: "Bison Burger (no bun)", calories: 400, protein: 40, carbs: 0, fat: 26, emoji: "🥩", quantity: "250g" },
        { name: "Roasted Root Vegetables", calories: 250, protein: 4, carbs: 50, fat: 5, emoji: "🥕", quantity: "2.5 cups" },
        { name: "Bone Marrow", calories: 100, protein: 1, carbs: 0, fat: 11, emoji: "🦴", quantity: "1 bone" },
        { name: "Mixed Nuts", calories: 100, protein: 3, carbs: 4, fat: 9, emoji: "🥜", quantity: "25g" },
      ]},
    ],
  },
  mediterranean: {
    lose: [
      { id: "md1", name: "Breakfast", time: "7:30 AM", icon: Sun, totalCalories: 350, items: [
        { name: "Greek Yogurt w/ Honey", calories: 150, protein: 15, carbs: 15, fat: 4, emoji: "🥛", quantity: "200g" },
        { name: "Walnuts & Figs", calories: 120, protein: 3, carbs: 14, fat: 7, emoji: "🥜", quantity: "3 walnuts + 2 figs" },
        { name: "Green Tea", calories: 5, protein: 0, carbs: 0, fat: 0, emoji: "🍵", quantity: "1 cup" },
      ]},
      { id: "md2", name: "Lunch", time: "1:00 PM", icon: Sun, totalCalories: 450, items: [
        { name: "Grilled Fish", calories: 200, protein: 35, carbs: 0, fat: 6, emoji: "🐟", quantity: "180g" },
        { name: "Tabbouleh", calories: 120, protein: 3, carbs: 18, fat: 4, emoji: "🥗", quantity: "1 cup" },
        { name: "Hummus", calories: 80, protein: 4, carbs: 8, fat: 4, emoji: "🫘", quantity: "2 tbsp" },
        { name: "Olive Oil", calories: 50, protein: 0, carbs: 0, fat: 6, emoji: "🫒", quantity: "½ tbsp" },
      ]},
      { id: "md3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 400, items: [
        { name: "Chicken Souvlaki", calories: 250, protein: 30, carbs: 5, fat: 12, emoji: "🍢", quantity: "2 skewers" },
        { name: "Greek Salad", calories: 100, protein: 4, carbs: 8, fat: 7, emoji: "🥗", quantity: "1 bowl" },
        { name: "Tzatziki", calories: 50, protein: 2, carbs: 4, fat: 3, emoji: "🫙", quantity: "3 tbsp" },
      ]},
    ],
    maintain: [
      { id: "mdm1", name: "Breakfast", time: "7:30 AM", icon: Sun, totalCalories: 500, items: [
        { name: "Shakshuka", calories: 300, protein: 18, carbs: 20, fat: 16, emoji: "🍳", quantity: "2 eggs in sauce" },
        { name: "Pita Bread", calories: 120, protein: 4, carbs: 22, fat: 1, emoji: "🫓", quantity: "1 piece" },
        { name: "Feta Cheese", calories: 80, protein: 5, carbs: 1, fat: 6, emoji: "🧀", quantity: "30g" },
      ]},
      { id: "mdm2", name: "Lunch", time: "1:00 PM", icon: Sun, totalCalories: 600, items: [
        { name: "Lamb Kofta", calories: 300, protein: 25, carbs: 5, fat: 20, emoji: "🍖", quantity: "3 koftas" },
        { name: "Couscous", calories: 180, protein: 6, carbs: 36, fat: 1, emoji: "🌾", quantity: "1 cup" },
        { name: "Roasted Eggplant", calories: 80, protein: 2, carbs: 10, fat: 4, emoji: "🍆", quantity: "1 cup" },
        { name: "Pomegranate Seeds", calories: 40, protein: 1, carbs: 9, fat: 0, emoji: "🍎", quantity: "2 tbsp" },
      ]},
      { id: "mdm3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 550, items: [
        { name: "Sea Bass", calories: 250, protein: 35, carbs: 0, fat: 12, emoji: "🐟", quantity: "200g" },
        { name: "Risotto", calories: 200, protein: 4, carbs: 35, fat: 5, emoji: "🍚", quantity: "1 cup" },
        { name: "Grilled Vegetables", calories: 60, protein: 2, carbs: 10, fat: 2, emoji: "🥦", quantity: "1 cup" },
        { name: "Lemon & Olive Oil", calories: 40, protein: 0, carbs: 1, fat: 4, emoji: "🍋", quantity: "drizzle" },
      ]},
    ],
    gain: [
      { id: "mdg1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 650, items: [
        { name: "Full Mediterranean Plate", calories: 400, protein: 20, carbs: 40, fat: 18, emoji: "🍳", quantity: "eggs, feta, olives, bread" },
        { name: "Fresh Orange Juice", calories: 120, protein: 2, carbs: 28, fat: 0, emoji: "🍊", quantity: "300ml" },
        { name: "Dates & Almonds", calories: 130, protein: 3, carbs: 22, fat: 5, emoji: "🌴", quantity: "4 dates + 10 almonds" },
      ]},
      { id: "mdg2", name: "Lunch", time: "12:30 PM", icon: Sun, totalCalories: 750, items: [
        { name: "Mixed Grill Platter", calories: 450, protein: 45, carbs: 0, fat: 28, emoji: "🍖", quantity: "lamb, chicken, kofta" },
        { name: "Hummus & Pita", calories: 200, protein: 7, carbs: 28, fat: 8, emoji: "🫓", quantity: "generous" },
        { name: "Fattoush Salad", calories: 100, protein: 2, carbs: 12, fat: 5, emoji: "🥗", quantity: "1 bowl" },
      ]},
      { id: "mdg3", name: "Dinner", time: "7:30 PM", icon: Moon, totalCalories: 700, items: [
        { name: "Whole Grilled Salmon", calories: 400, protein: 45, carbs: 0, fat: 24, emoji: "🐟", quantity: "280g" },
        { name: "Orzo Pasta", calories: 200, protein: 7, carbs: 40, fat: 1, emoji: "🍝", quantity: "150g" },
        { name: "Roasted Peppers", calories: 50, protein: 1, carbs: 8, fat: 2, emoji: "🫑", quantity: "1 cup" },
        { name: "Extra Virgin Olive Oil", calories: 50, protein: 0, carbs: 0, fat: 6, emoji: "🫒", quantity: "½ tbsp" },
      ]},
    ],
    bulk: [
      { id: "mdb1", name: "Breakfast", time: "7:00 AM", icon: Sun, totalCalories: 850, items: [
        { name: "Double Shakshuka", calories: 450, protein: 28, carbs: 25, fat: 28, emoji: "🍳", quantity: "4 eggs" },
        { name: "Pita & Labneh", calories: 250, protein: 8, carbs: 30, fat: 12, emoji: "🫓", quantity: "2 pitas" },
        { name: "Fresh Fruit & Honey", calories: 150, protein: 1, carbs: 38, fat: 0, emoji: "🍯", quantity: "1 cup" },
      ]},
      { id: "mdb2", name: "Lunch", time: "12:00 PM", icon: Sun, totalCalories: 900, items: [
        { name: "Lamb Shawarma Plate", calories: 550, protein: 40, carbs: 35, fat: 28, emoji: "🍖", quantity: "large plate" },
        { name: "Rice Pilaf", calories: 250, protein: 5, carbs: 50, fat: 4, emoji: "🍚", quantity: "200g" },
        { name: "Baba Ganoush", calories: 100, protein: 2, carbs: 8, fat: 7, emoji: "🍆", quantity: "3 tbsp" },
      ]},
      { id: "mdb3", name: "Dinner", time: "7:00 PM", icon: Moon, totalCalories: 800, items: [
        { name: "Grilled Swordfish", calories: 350, protein: 40, carbs: 0, fat: 20, emoji: "🐟", quantity: "250g" },
        { name: "Pasta w/ Pesto", calories: 350, protein: 10, carbs: 45, fat: 14, emoji: "🍝", quantity: "200g" },
        { name: "Caprese Salad", calories: 100, protein: 6, carbs: 3, fat: 7, emoji: "🍅", quantity: "1 serving" },
      ]},
    ],
  },
};

const DietPlan = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState<Goal>("maintain");
  const [dietType, setDietType] = useState<DietType>("balanced");
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  const [weight, setWeight] = useState(() => parseInt(localStorage.getItem("ado-weight") || "70"));
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [showDietPicker, setShowDietPicker] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const baseCalories = Math.round(weight * 30);
  const totalCalories = baseCalories + goalConfig[goal].calorieAdjust;
  const meals = mealPlans[dietType]?.[goal] || mealPlans.balanced.maintain;
  const mealCalories = meals.reduce((sum, m) => sum + m.totalCalories, 0);

  const totalMacros = meals.reduce((acc, meal) => {
    meal.items.forEach(item => {
      acc.protein += item.protein;
      acc.carbs += item.carbs;
      acc.fat += item.fat;
    });
    return acc;
  }, { protein: 0, carbs: 0, fat: 0 });

  const toggleItem = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem("ado-weight", weight.toString());
  }, [weight]);

  return (
    <MobileLayout>
      <div className="animate-fade-in px-4 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1"><ChevronLeft className="h-5 w-5" /></button>
          <h1 className="text-base font-bold">🥗 Diet Plan</h1>
          <div className="w-6" />
        </div>

        {/* Hero Card */}
        <div className="mt-4 relative overflow-hidden rounded-2xl gym-gradient-orange p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
          <div className="absolute -right-4 bottom-0 h-20 w-20 rounded-full bg-primary-foreground/5" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
              <span className="text-xs font-bold text-primary-foreground/80">Personalized Plan</span>
            </div>
            <p className="text-2xl font-black text-primary-foreground">{mealCalories.toLocaleString()}</p>
            <p className="text-xs text-primary-foreground/70">calories / day · Target: {totalCalories.toLocaleString()}</p>
            <div className="mt-3 flex gap-4">
              <div className="text-center">
                <p className="text-lg font-black text-primary-foreground">{totalMacros.protein}g</p>
                <p className="text-[9px] text-primary-foreground/60">Protein</p>
              </div>
              <div className="h-8 w-px bg-primary-foreground/20" />
              <div className="text-center">
                <p className="text-lg font-black text-primary-foreground">{totalMacros.carbs}g</p>
                <p className="text-[9px] text-primary-foreground/60">Carbs</p>
              </div>
              <div className="h-8 w-px bg-primary-foreground/20" />
              <div className="text-center">
                <p className="text-lg font-black text-primary-foreground">{totalMacros.fat}g</p>
                <p className="text-[9px] text-primary-foreground/60">Fat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weight Input */}
        <div className="mt-4 flex items-center justify-between gym-gradient-card rounded-2xl p-4">
          <div>
            <p className="text-xs font-bold">Your Weight</p>
            <p className="text-[10px] text-muted-foreground">Adjusts calorie targets</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setWeight(w => Math.max(30, w - 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary active:scale-90 transition-transform">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-14 text-center text-lg font-black">{weight}<span className="text-xs text-muted-foreground">kg</span></span>
            <button onClick={() => setWeight(w => Math.min(200, w + 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary active:scale-90 transition-transform">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Goal Selector */}
        <div className="mt-4">
          <button onClick={() => setShowGoalPicker(!showGoalPicker)}
            className="flex w-full items-center justify-between gym-gradient-card rounded-2xl p-4 transition-transform active:scale-[0.98]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{goalConfig[goal].emoji}</span>
              <div>
                <p className="text-xs font-bold">{goalConfig[goal].label}</p>
                <p className="text-[10px] text-muted-foreground">{goalConfig[goal].desc}</p>
              </div>
            </div>
            <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${showGoalPicker ? "rotate-90" : ""}`} />
          </button>
          {showGoalPicker && (
            <div className="mt-2 grid grid-cols-2 gap-2 animate-fade-in">
              {(Object.entries(goalConfig) as [Goal, typeof goalConfig.lose][]).map(([key, val]) => (
                <button key={key} onClick={() => { setGoal(key); setShowGoalPicker(false); setCheckedItems(new Set()); }}
                  className={`rounded-2xl p-3 text-left transition-all active:scale-95 ${
                    goal === key ? "ring-2 ring-primary bg-primary/10" : "gym-gradient-card"
                  }`}>
                  <span className="text-xl">{val.emoji}</span>
                  <p className="text-xs font-bold mt-1">{val.label}</p>
                  <p className="text-[9px] text-muted-foreground">{val.calorieAdjust > 0 ? "+" : ""}{val.calorieAdjust} cal</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Diet Type Selector */}
        <div className="mt-3">
          <button onClick={() => setShowDietPicker(!showDietPicker)}
            className="flex w-full items-center justify-between gym-gradient-card rounded-2xl p-4 transition-transform active:scale-[0.98]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{dietTypes[dietType].emoji}</span>
              <div>
                <p className="text-xs font-bold">{dietTypes[dietType].label}</p>
                <p className="text-[10px] text-muted-foreground">{dietTypes[dietType].desc}</p>
              </div>
            </div>
            <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${showDietPicker ? "rotate-90" : ""}`} />
          </button>
          {showDietPicker && (
            <div className="mt-2 grid grid-cols-2 gap-2 animate-fade-in">
              {(Object.entries(dietTypes) as [DietType, typeof dietTypes.balanced][]).map(([key, val]) => (
                <button key={key} onClick={() => { setDietType(key); setShowDietPicker(false); setCheckedItems(new Set()); }}
                  className={`rounded-2xl p-3 text-left transition-all active:scale-95 ${
                    dietType === key ? "ring-2 ring-primary bg-primary/10" : "gym-gradient-card"
                  }`}>
                  <span className="text-xl">{val.emoji}</span>
                  <p className="text-xs font-bold mt-1">{val.label}</p>
                  <p className="text-[9px] text-muted-foreground">{val.desc}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Macro Bars */}
        <div className="mt-4 gym-gradient-card rounded-2xl p-4">
          <h3 className="text-xs font-bold mb-3 flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-primary" /> Daily Macros Breakdown</h3>
          {[
            { label: "Protein", value: totalMacros.protein, max: Math.round(totalCalories * 0.35 / 4), color: "bg-red-500", unit: "g" },
            { label: "Carbs", value: totalMacros.carbs, max: Math.round(totalCalories * 0.45 / 4), color: "bg-blue-500", unit: "g" },
            { label: "Fat", value: totalMacros.fat, max: Math.round(totalCalories * 0.30 / 9), color: "bg-yellow-500", unit: "g" },
          ].map(macro => (
            <div key={macro.label} className="mb-2.5 last:mb-0">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] font-semibold">{macro.label}</span>
                <span className="text-[10px] text-muted-foreground">{macro.value}{macro.unit} / {macro.max}{macro.unit}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full ${macro.color} transition-all duration-700`}
                  style={{ width: `${Math.min(100, (macro.value / macro.max) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Water Intake */}
        <div className="mt-3 gym-gradient-card rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-xs font-bold">Water Intake</p>
                <p className="text-[10px] text-muted-foreground">Recommended: {Math.round(weight * 0.035 * 10) / 10}L / day</p>
              </div>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`h-6 w-2 rounded-full transition-all ${i < 3 ? "bg-blue-400" : "bg-muted"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Meals */}
        <div className="mt-5">
          <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Apple className="h-4 w-4 text-primary" /> Today's Meals
            <span className="ml-auto text-[10px] text-muted-foreground">{meals.length} meals</span>
          </h2>
          <div className="space-y-3">
            {meals.map((meal, mi) => {
              const isExpanded = expandedMeal === meal.id;
              const MealIcon = meal.icon;
              const mealChecked = meal.items.filter((_, ii) => checkedItems.has(`${meal.id}-${ii}`)).length;
              return (
                <div key={meal.id} className={`rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? "ring-1 ring-primary/30" : ""}`}>
                  <button onClick={() => setExpandedMeal(isExpanded ? null : meal.id)}
                    className="flex w-full items-center gap-3 gym-gradient-card p-4 transition-transform active:scale-[0.98]">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      mealChecked === meal.items.length && mealChecked > 0 ? "bg-primary/20" : "bg-secondary"
                    }`}>
                      <MealIcon className={`h-5 w-5 ${mealChecked === meal.items.length && mealChecked > 0 ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold">{meal.name}</p>
                        {mealChecked === meal.items.length && mealChecked > 0 && <Check className="h-3 w-3 text-primary" />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] text-muted-foreground flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{meal.time}</span>
                        <span className="text-[9px] text-muted-foreground flex items-center gap-0.5"><Flame className="h-2.5 w-2.5" />{meal.totalCalories} cal</span>
                      </div>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                  </button>
                  {isExpanded && (
                    <div className="bg-card/50 p-3 space-y-2 animate-fade-in">
                      {meal.items.map((item, ii) => {
                        const itemId = `${meal.id}-${ii}`;
                        const isChecked = checkedItems.has(itemId);
                        return (
                          <button key={ii} onClick={() => toggleItem(itemId)}
                            className={`flex w-full items-center gap-3 rounded-xl p-3 transition-all active:scale-[0.98] ${
                              isChecked ? "bg-primary/10 ring-1 ring-primary/20" : "bg-secondary/50"
                            }`}>
                            <span className="text-lg">{item.emoji}</span>
                            <div className="flex-1 text-left">
                              <p className={`text-[11px] font-semibold ${isChecked ? "text-primary" : ""}`}>{item.name}</p>
                              <p className="text-[9px] text-muted-foreground">{item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-bold">{item.calories} cal</p>
                              <p className="text-[8px] text-muted-foreground">P:{item.protein} C:{item.carbs} F:{item.fat}</p>
                            </div>
                            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all ${
                              isChecked ? "border-primary bg-primary" : "border-muted-foreground"
                            }`}>
                              {isChecked && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                            </div>
                          </button>
                        );
                      })}
                      <div className="flex justify-between pt-2 border-t border-border/50 px-1">
                        <span className="text-[9px] text-muted-foreground">Meal Total</span>
                        <div className="flex gap-3">
                          <span className="text-[9px] font-bold text-primary">{meal.totalCalories} cal</span>
                          <span className="text-[9px] text-muted-foreground">
                            P:{meal.items.reduce((s, i) => s + i.protein, 0)}g
                            C:{meal.items.reduce((s, i) => s + i.carbs, 0)}g
                            F:{meal.items.reduce((s, i) => s + i.fat, 0)}g
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-5 gym-gradient-card rounded-2xl p-4 mb-4">
          <h3 className="text-xs font-bold flex items-center gap-2"><Heart className="h-3.5 w-3.5 text-primary" /> Quick Tips</h3>
          <div className="mt-2 space-y-2">
            {[
              { emoji: "💧", tip: "Drink water 30 min before meals to reduce appetite" },
              { emoji: "🕐", tip: "Eat slowly — it takes 20 min for your brain to feel full" },
              { emoji: "🥦", tip: "Fill half your plate with vegetables first" },
              { emoji: "📱", tip: "Track everything — even small bites add up" },
              { emoji: "😴", tip: "Poor sleep increases hunger hormones by 25%" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl bg-secondary/50 px-3 py-2">
                <span className="text-sm">{t.emoji}</span>
                <p className="text-[10px] text-muted-foreground">{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default DietPlan;
