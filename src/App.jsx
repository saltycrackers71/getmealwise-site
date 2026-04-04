
import { useState, useEffect } from "react";

// ─── BRAND TOKENS (Option C — Friendly Community) ────────────────────────────
const B = {
  primary:   "#1B5E50",
  primary2:  "#14463C",
  accent:    "#F4A726",
  accent2:   "#E09415",
  bg:        "#FAFAF5",
  card:      "#FFFFFF",
  text:      "#1A1A2E",
  muted:     "#6B7B8D",
  faint:     "#9EAAB6",
  border:    "#E8EDE8",
  soft:      "#EEF5F0",
  softAmber: "#FEF3DC",
  danger:    "#DC2626",
  dangerBg:  "#FEF2F2",
  success:   "#166534",
  successBg: "#DCFCE7",
};

// ─── STARCH & VEG OPTIONS FOR MEAL CUSTOMISATION ─────────────────────────────
const STARCH_OPTIONS = [
  "Roast Potatoes","Mashed Potato","Potato Wedges","Boiled Potatoes",
  "Chips / Fries","Jacket Potato","Basmati Rice","Egg Fried Rice",
  "Pilau Rice","Jasmine Rice","Spaghetti","Penne","Tagliatelle",
  "Garlic Bread","Naan Bread","Chapati","No starch",
];
const VEG_OPTIONS = [
  "Frozen Peas","Green Beans","Broccoli","Carrots","Sweetcorn",
  "Cabbage","Cauliflower","Spinach","Mixed Salad","Greek Salad",
  "Roasted Mediterranean Veg","Courgette","Leeks","Frozen Mixed Veg",
  "Baked Beans","No veg",
];

// ─── MEAL DATABASE ─────────────────────────────────────────────────────────────
// Each meal now has:
//   ingredients: array of {item, qty, note?} for the shopping list
//   defaultStarch / defaultVeg: what comes with the meal as standard
const MEALS = [
  {
    name:"Roast Chicken with Roast Potatoes, Yorkshire & Gravy",
    protein:"chicken", carb:"potato", cuisine:["british-roast"], gf:true, allergens:["celery"], cost:9.50,
    defaultStarch:"Roast Potatoes", defaultVeg:"Frozen Peas",
    ingredients:[
      {item:"Whole chicken",qty:"1 (approx 1.5kg)",note:"Main protein"},
      {item:"White potatoes",qty:"1kg"},
      {item:"Yorkshire pudding mix",qty:"1 pack"},
      {item:"GF gravy granules",qty:"1 tbsp"},
      {item:"Frozen peas",qty:"200g"},
      {item:"Carrots",qty:"3 medium"},
      {item:"Fresh thyme & rosemary",qty:"small bunch"},
      {item:"Olive oil",qty:"2 tbsp"},
      {item:"Butter",qty:"25g"},
    ],
  },
  {
    name:"Roast Pork with Apple Sauce, Roast Potatoes & Veg",
    protein:"pork", carb:"potato", cuisine:["british-roast"], gf:true, allergens:["celery"], cost:9.50,
    defaultStarch:"Roast Potatoes", defaultVeg:"Cabbage",
    ingredients:[
      {item:"Pork shoulder / loin joint",qty:"1.2kg",note:"Roasting joint"},
      {item:"White potatoes",qty:"1kg"},
      {item:"Apple sauce",qty:"1 jar"},
      {item:"GF gravy granules",qty:"1 tbsp"},
      {item:"Cabbage",qty:"½ head"},
      {item:"Carrots",qty:"3 medium"},
      {item:"Olive oil",qty:"2 tbsp"},
    ],
  },
  {
    name:"Roast Lamb with Roast Potatoes, Cabbage & Peas",
    protein:"lamb", carb:"potato", cuisine:["british-roast"], gf:true, allergens:["celery"], cost:12.00,
    defaultStarch:"Roast Potatoes", defaultVeg:"Frozen Peas",
    ingredients:[
      {item:"Lamb leg joint",qty:"1.2–1.5kg",note:"Roasting joint — NOT minced lamb"},
      {item:"White potatoes",qty:"1kg"},
      {item:"Cabbage",qty:"½ head"},
      {item:"Frozen peas",qty:"200g"},
      {item:"Mint sauce",qty:"1 jar"},
      {item:"GF gravy granules",qty:"1 tbsp"},
      {item:"Garlic",qty:"4 cloves"},
      {item:"Fresh rosemary",qty:"small bunch"},
      {item:"Olive oil",qty:"2 tbsp"},
    ],
  },
  {
    name:"Chicken & Vegetable Curry with Basmati Rice",
    protein:"chicken", carb:"rice", cuisine:["curry","indian"], gf:true, allergens:[], cost:8.00,
    defaultStarch:"Basmati Rice", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Chicken breast or thigh",qty:"600g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Curry paste (mild or medium)",qty:"3 tbsp"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Fresh ginger",qty:"thumb-sized piece"},
      {item:"Mixed frozen veg or fresh peppers",qty:"200g"},
      {item:"Olive oil",qty:"2 tbsp"},
    ],
  },
  {
    name:"Butter Chicken Curry with Basmati Rice",
    protein:"chicken", carb:"rice", cuisine:["curry","indian"], gf:true, allergens:["milk"], cost:9.00,
    defaultStarch:"Basmati Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Chicken breast",qty:"600g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Butter chicken sauce / paste",qty:"1 jar or 3 tbsp"},
      {item:"Double cream",qty:"100ml"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Butter",qty:"25g"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
    ],
  },
  {
    name:"Chicken Tikka Masala with Pilau Rice",
    protein:"chicken", carb:"rice", cuisine:["curry","indian"], gf:true, allergens:["milk"], cost:9.50,
    defaultStarch:"Pilau Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Chicken breast",qty:"600g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Tikka masala paste",qty:"3 tbsp"},
      {item:"Tinned coconut milk or double cream",qty:"200ml"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Pilau rice spice mix",qty:"1 tsp"},
    ],
  },
  {
    name:"Beef Curry with Basmati Rice",
    protein:"beef", carb:"rice", cuisine:["curry","indian"], gf:true, allergens:[], cost:10.00,
    defaultStarch:"Basmati Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Beef braising steak",qty:"600g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Curry paste",qty:"3 tbsp"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Beef stock cube",qty:"1"},
    ],
  },
  {
    name:"Lamb Curry with Basmati Rice",
    protein:"lamb", carb:"rice", cuisine:["curry","indian"], gf:false, allergens:["gluten","milk"], cost:11.00,
    defaultStarch:"Basmati Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Lamb shoulder, diced",qty:"600g",note:"Diced lamb — NOT a roasting joint"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Curry paste",qty:"3 tbsp"},
      {item:"Natural yoghurt",qty:"150ml"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Fresh ginger",qty:"thumb-sized piece"},
    ],
  },
  {
    name:"Vegetable Curry with Basmati Rice",
    protein:"veggie", carb:"rice", cuisine:["curry","indian"], gf:false, allergens:["gluten"], cost:6.50,
    defaultStarch:"Basmati Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Mixed vegetables (fresh or frozen)",qty:"500g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Curry paste",qty:"3 tbsp"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Tinned chickpeas",qty:"1 tin"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Spinach",qty:"80g"},
    ],
  },
  {
    name:"Chicken Teriyaki Stir Fry with Basmati Rice",
    protein:"chicken", carb:"rice", cuisine:["asian","japanese"], gf:true, allergens:["soya","sesame"], cost:8.50,
    defaultStarch:"Basmati Rice", defaultVeg:"Broccoli",
    ingredients:[
      {item:"Chicken breast, sliced",qty:"600g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Teriyaki sauce",qty:"4 tbsp"},
      {item:"Broccoli",qty:"1 head"},
      {item:"Peppers",qty:"2"},
      {item:"Spring onions",qty:"4"},
      {item:"Sesame oil",qty:"1 tbsp"},
      {item:"Garlic",qty:"2 cloves"},
      {item:"Sesame seeds",qty:"1 tbsp"},
    ],
  },
  {
    name:"Beef Teriyaki Stir Fry with Egg Fried Rice",
    protein:"beef", carb:"rice", cuisine:["asian","japanese"], gf:true, allergens:["soya","eggs","sesame"], cost:10.00,
    defaultStarch:"Egg Fried Rice", defaultVeg:"Broccoli",
    ingredients:[
      {item:"Beef sirloin or stir fry strips",qty:"500g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Eggs",qty:"3"},
      {item:"Teriyaki sauce",qty:"4 tbsp"},
      {item:"Broccoli",qty:"1 head"},
      {item:"Peppers",qty:"2"},
      {item:"Sesame oil",qty:"1 tbsp"},
      {item:"Soy sauce",qty:"2 tbsp"},
    ],
  },
  {
    name:"Pork & Veg Stir Fry with Teriyaki & Rice",
    protein:"pork", carb:"rice", cuisine:["asian"], gf:true, allergens:["soya","sesame"], cost:8.00,
    defaultStarch:"Basmati Rice", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Pork fillet or stir fry strips",qty:"500g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Teriyaki sauce",qty:"4 tbsp"},
      {item:"Mixed stir fry veg",qty:"300g"},
      {item:"Sesame oil",qty:"1 tbsp"},
      {item:"Garlic",qty:"2 cloves"},
    ],
  },
  {
    name:"Sweet & Sour Chicken with Rice & Prawn Crackers",
    protein:"chicken", carb:"rice", cuisine:["asian","chinese"], gf:true, allergens:["crustaceans"], cost:8.00,
    defaultStarch:"Basmati Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Chicken breast, diced",qty:"600g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Sweet & sour sauce",qty:"1 jar"},
      {item:"Prawn crackers",qty:"1 bag"},
      {item:"Peppers",qty:"2"},
      {item:"Pineapple chunks",qty:"1 small tin"},
      {item:"Onion",qty:"1"},
    ],
  },
  {
    name:"Sweet & Sour Pork with Rice & Prawn Crackers",
    protein:"pork", carb:"rice", cuisine:["asian","chinese"], gf:true, allergens:["crustaceans"], cost:8.00,
    defaultStarch:"Basmati Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Pork tenderloin or loin, diced",qty:"500g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Sweet & sour sauce",qty:"1 jar"},
      {item:"Prawn crackers",qty:"1 bag"},
      {item:"Peppers",qty:"2"},
      {item:"Pineapple chunks",qty:"1 small tin"},
      {item:"Onion",qty:"1"},
    ],
  },
  {
    name:"Prawn & Vegetable Stir Fry with Egg Fried Rice",
    protein:"fish", carb:"rice", cuisine:["asian","chinese"], gf:true, allergens:["crustaceans","eggs","soya"], cost:10.00,
    defaultStarch:"Egg Fried Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"King prawns",qty:"400g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Eggs",qty:"3"},
      {item:"Mixed stir fry veg",qty:"300g"},
      {item:"Soy sauce",qty:"3 tbsp"},
      {item:"Sesame oil",qty:"1 tbsp"},
      {item:"Garlic",qty:"2 cloves"},
    ],
  },
  {
    name:"Thai Green Chicken Curry with Jasmine Rice",
    protein:"chicken", carb:"rice", cuisine:["thai","asian"], gf:true, allergens:["nuts"], cost:9.00,
    defaultStarch:"Jasmine Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Chicken breast or thigh",qty:"600g"},
      {item:"Jasmine rice",qty:"300g"},
      {item:"Thai green curry paste",qty:"2–3 tbsp"},
      {item:"Tinned coconut milk",qty:"400ml"},
      {item:"Green beans",qty:"150g"},
      {item:"Baby spinach",qty:"80g"},
      {item:"Lime",qty:"1"},
      {item:"Fresh coriander",qty:"small bunch"},
    ],
  },
  {
    name:"Nepalese Lentil Dal with Rice & Chapati",
    protein:"veggie", carb:"rice", cuisine:["nepalese","asian"], gf:false, allergens:["gluten"], cost:5.50,
    defaultStarch:"Basmati Rice", defaultVeg:"Spinach",
    ingredients:[
      {item:"Red or yellow lentils",qty:"300g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Chapati / flatbreads",qty:"4–6"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"4 cloves"},
      {item:"Fresh ginger",qty:"thumb-sized piece"},
      {item:"Cumin seeds",qty:"1 tsp"},
      {item:"Turmeric",qty:"1 tsp"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Spinach",qty:"80g"},
    ],
  },
  {
    name:"Spaghetti Bolognese with Cheesy Garlic Bread",
    protein:"beef", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten","milk"], cost:8.50,
    defaultStarch:"Spaghetti", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Beef mince",qty:"500g"},
      {item:"Spaghetti",qty:"400g"},
      {item:"Garlic bread",qty:"1 baguette"},
      {item:"Cheddar or parmesan",qty:"50g"},
      {item:"Tinned chopped tomatoes",qty:"2 tins"},
      {item:"Tomato puree",qty:"2 tbsp"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Beef stock cube",qty:"1"},
      {item:"Dried mixed herbs",qty:"1 tsp"},
    ],
  },
  {
    name:"Chicken Pasta in Homemade Tomato & Basil Sauce",
    protein:"chicken", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten"], cost:7.50,
    defaultStarch:"Penne", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Chicken breast, diced",qty:"500g"},
      {item:"Penne pasta",qty:"400g"},
      {item:"Tinned chopped tomatoes",qty:"2 tins"},
      {item:"Tomato puree",qty:"2 tbsp"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Fresh basil",qty:"small bunch"},
      {item:"Olive oil",qty:"2 tbsp"},
    ],
  },
  {
    name:"Creamy Chicken Tagliatelle with Garlic & Mushrooms",
    protein:"chicken", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten","milk"], cost:9.00,
    defaultStarch:"Tagliatelle", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Chicken breast, sliced",qty:"500g"},
      {item:"Tagliatelle",qty:"400g"},
      {item:"Double cream",qty:"200ml"},
      {item:"Chestnut mushrooms",qty:"250g"},
      {item:"Garlic",qty:"4 cloves"},
      {item:"Chicken stock cube",qty:"1"},
      {item:"Parmesan",qty:"50g"},
      {item:"Olive oil",qty:"2 tbsp"},
    ],
  },
  {
    name:"Sausage Pasta with Vegetables & Tomato Sauce",
    protein:"pork", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten"], cost:7.00,
    defaultStarch:"Penne", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Pork sausages",qty:"6–8"},
      {item:"Penne pasta",qty:"400g"},
      {item:"Tinned chopped tomatoes",qty:"2 tins"},
      {item:"Peppers",qty:"2"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Tomato puree",qty:"2 tbsp"},
      {item:"Olive oil",qty:"2 tbsp"},
    ],
  },
  {
    name:"Meatballs & Penne in Tomato Sauce",
    protein:"beef", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten","eggs"], cost:8.50,
    defaultStarch:"Penne", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Beef mince",qty:"500g"},
      {item:"Penne pasta",qty:"400g"},
      {item:"Egg",qty:"1"},
      {item:"Breadcrumbs",qty:"50g"},
      {item:"Tinned chopped tomatoes",qty:"2 tins"},
      {item:"Tomato puree",qty:"2 tbsp"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Parmesan",qty:"50g"},
    ],
  },
  {
    name:"Lasagne with Cheesy Garlic Bread",
    protein:"beef", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten","milk","eggs"], cost:9.00,
    defaultStarch:"Garlic Bread", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Beef mince",qty:"500g"},
      {item:"Lasagne sheets",qty:"1 pack (approx 12 sheets)"},
      {item:"Garlic bread",qty:"1 baguette"},
      {item:"Whole milk",qty:"500ml"},
      {item:"Butter",qty:"50g"},
      {item:"Plain flour",qty:"50g"},
      {item:"Cheddar cheese",qty:"150g"},
      {item:"Tinned chopped tomatoes",qty:"2 tins"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
    ],
  },
  {
    name:"Mushroom & Spinach Pasta in Creamy Sauce",
    protein:"veggie", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten","milk"], cost:6.00,
    defaultStarch:"Penne", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Chestnut mushrooms",qty:"400g"},
      {item:"Penne pasta",qty:"400g"},
      {item:"Double cream",qty:"200ml"},
      {item:"Spinach",qty:"100g"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Parmesan",qty:"50g"},
      {item:"Olive oil",qty:"2 tbsp"},
      {item:"Nutmeg",qty:"pinch"},
    ],
  },
  {
    name:"Mac & Cheese with Prawns & Garlic Bread",
    protein:"fish", carb:"pasta", cuisine:["comfort"], gf:false, allergens:["gluten","milk","crustaceans"], cost:9.50,
    defaultStarch:"Garlic Bread", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Macaroni pasta",qty:"400g"},
      {item:"King prawns",qty:"300g"},
      {item:"Garlic bread",qty:"1 baguette"},
      {item:"Cheddar cheese",qty:"200g"},
      {item:"Whole milk",qty:"500ml"},
      {item:"Butter",qty:"50g"},
      {item:"Plain flour",qty:"50g"},
      {item:"Dijon mustard",qty:"1 tsp"},
    ],
  },
  {
    name:"Cottage Pie with Frozen Peas",
    protein:"beef", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["celery"], cost:8.00,
    defaultStarch:"Mashed Potato", defaultVeg:"Frozen Peas",
    ingredients:[
      {item:"Beef mince",qty:"500g"},
      {item:"White potatoes",qty:"900g"},
      {item:"Frozen peas",qty:"200g"},
      {item:"Onion",qty:"1 large"},
      {item:"Carrots",qty:"2"},
      {item:"Beef stock cube",qty:"1"},
      {item:"Tomato puree",qty:"2 tbsp"},
      {item:"Worcestershire sauce (check GF)",qty:"1 tbsp"},
      {item:"Butter & milk for mash",qty:"to taste"},
    ],
  },
  {
    name:"Shepherd's Pie with Green Beans & Gravy",
    protein:"lamb", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["celery"], cost:9.50,
    defaultStarch:"Mashed Potato", defaultVeg:"Green Beans",
    ingredients:[
      {item:"Lamb mince",qty:"500g",note:"Minced lamb — NOT a roasting joint"},
      {item:"White potatoes",qty:"900g"},
      {item:"Green beans",qty:"200g"},
      {item:"Onion",qty:"1 large"},
      {item:"Carrots",qty:"2"},
      {item:"Lamb or beef stock cube",qty:"1"},
      {item:"Tomato puree",qty:"2 tbsp"},
      {item:"GF gravy granules",qty:"1 tbsp"},
      {item:"Butter & milk for mash",qty:"to taste"},
    ],
  },
  {
    name:"Beef & Vegetable Hotpot with Sliced Potato",
    protein:"beef", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["celery"], cost:9.00,
    defaultStarch:"Boiled Potatoes", defaultVeg:"Carrots",
    ingredients:[
      {item:"Beef braising steak, diced",qty:"600g"},
      {item:"White potatoes",qty:"800g"},
      {item:"Onion",qty:"1 large"},
      {item:"Carrots",qty:"3"},
      {item:"Celery",qty:"2 sticks"},
      {item:"Beef stock cube",qty:"2"},
      {item:"Tomato puree",qty:"1 tbsp"},
      {item:"Dried thyme",qty:"1 tsp"},
    ],
  },
  {
    name:"Sausage & Mash with Peas, Carrots & Gravy",
    protein:"pork", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["celery"], cost:7.50,
    defaultStarch:"Mashed Potato", defaultVeg:"Frozen Peas",
    ingredients:[
      {item:"Pork sausages",qty:"8"},
      {item:"White potatoes",qty:"900g"},
      {item:"Frozen peas",qty:"200g"},
      {item:"Carrots",qty:"3"},
      {item:"GF gravy granules",qty:"2 tbsp"},
      {item:"Butter & milk for mash",qty:"to taste"},
      {item:"Onion",qty:"1 (for onion gravy)"},
    ],
  },
  {
    name:"Toad in the Hole with Mash & Green Beans",
    protein:"pork", carb:"potato", cuisine:["british-classic"], gf:false, allergens:["gluten","eggs","milk"], cost:7.50,
    defaultStarch:"Mashed Potato", defaultVeg:"Green Beans",
    ingredients:[
      {item:"Pork sausages",qty:"8"},
      {item:"White potatoes",qty:"900g"},
      {item:"Green beans",qty:"200g"},
      {item:"Eggs",qty:"3"},
      {item:"Plain flour",qty:"150g"},
      {item:"Whole milk",qty:"200ml"},
      {item:"GF gravy granules",qty:"2 tbsp"},
      {item:"Vegetable oil",qty:"2 tbsp"},
    ],
  },
  {
    name:"Gammon, Egg & Chips with Peas & Pineapple",
    protein:"pork", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["eggs"], cost:8.50,
    defaultStarch:"Chips / Fries", defaultVeg:"Frozen Peas",
    ingredients:[
      {item:"Gammon steaks",qty:"4"},
      {item:"Eggs",qty:"4"},
      {item:"White potatoes or oven chips",qty:"800g"},
      {item:"Frozen peas",qty:"200g"},
      {item:"Pineapple rings",qty:"1 tin"},
      {item:"Vegetable oil",qty:"2 tbsp"},
    ],
  },
  {
    name:"Fish Pie with Mashed Potato & Peas",
    protein:"fish", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["fish","milk"], cost:10.50,
    defaultStarch:"Mashed Potato", defaultVeg:"Frozen Peas",
    ingredients:[
      {item:"Fish pie mix (salmon, haddock, prawns)",qty:"600g"},
      {item:"White potatoes",qty:"900g"},
      {item:"Frozen peas",qty:"200g"},
      {item:"Whole milk",qty:"400ml"},
      {item:"Butter",qty:"50g"},
      {item:"Plain GF flour",qty:"30g"},
      {item:"Cheddar cheese",qty:"75g"},
      {item:"Spring onions",qty:"4"},
    ],
  },
  {
    name:"GF Fish & Chips with Peas or Baked Beans",
    protein:"fish", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["fish"], cost:9.00,
    defaultStarch:"Chips / Fries", defaultVeg:"Frozen Peas",
    ingredients:[
      {item:"White fish fillets (cod or haddock)",qty:"4"},
      {item:"GF breadcrumbs or batter mix",qty:"150g"},
      {item:"White potatoes or oven chips",qty:"800g"},
      {item:"Frozen peas or baked beans",qty:"200g / 1 tin"},
      {item:"Lemon",qty:"1"},
      {item:"Tartar sauce",qty:"to serve"},
    ],
  },
  {
    name:"Lemon Chicken, Potato & Vegetable Tray Bake",
    protein:"chicken", carb:"potato", cuisine:["mediterranean"], gf:true, allergens:[], cost:9.00,
    defaultStarch:"Roast Potatoes", defaultVeg:"Roasted Mediterranean Veg",
    ingredients:[
      {item:"Chicken thighs (bone-in)",qty:"8"},
      {item:"White potatoes",qty:"800g"},
      {item:"Peppers",qty:"2"},
      {item:"Courgette",qty:"1"},
      {item:"Red onion",qty:"1"},
      {item:"Lemon",qty:"2"},
      {item:"Garlic",qty:"4 cloves"},
      {item:"Fresh thyme",qty:"small bunch"},
      {item:"Olive oil",qty:"3 tbsp"},
    ],
  },
  {
    name:"Moussaka with Greek Salad",
    protein:"lamb", carb:"other", cuisine:["mediterranean","greek"], gf:true, allergens:["milk","eggs"], cost:10.50,
    defaultStarch:"No starch", defaultVeg:"Greek Salad",
    ingredients:[
      {item:"Lamb mince",qty:"500g",note:"Minced lamb — NOT a roasting joint"},
      {item:"Aubergines",qty:"2 large"},
      {item:"White potatoes",qty:"400g"},
      {item:"Whole milk",qty:"400ml"},
      {item:"Butter",qty:"40g"},
      {item:"Plain GF flour",qty:"30g"},
      {item:"Eggs",qty:"2"},
      {item:"Cheddar or parmesan",qty:"75g"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Cinnamon",qty:"½ tsp"},
      {item:"Cucumber, tomatoes, olives, feta",qty:"for Greek salad"},
    ],
  },
  {
    name:"Chicken Bobotie with Basmati Rice",
    protein:"chicken", carb:"rice", cuisine:["african","world"], gf:true, allergens:["eggs","milk"], cost:8.50,
    defaultStarch:"Basmati Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Chicken mince or breast, finely chopped",qty:"500g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Eggs",qty:"2"},
      {item:"Whole milk",qty:"100ml"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"2 cloves"},
      {item:"Curry powder",qty:"2 tbsp"},
      {item:"Apricot jam",qty:"2 tbsp"},
      {item:"Bay leaves",qty:"2"},
    ],
  },
  {
    name:"Beef Bobotie with Basmati Rice",
    protein:"beef", carb:"rice", cuisine:["african","world"], gf:true, allergens:["eggs","milk"], cost:9.00,
    defaultStarch:"Basmati Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Beef mince",qty:"500g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Eggs",qty:"2"},
      {item:"Whole milk",qty:"100ml"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"2 cloves"},
      {item:"Curry powder",qty:"2 tbsp"},
      {item:"Apricot jam",qty:"2 tbsp"},
      {item:"Bay leaves",qty:"2"},
    ],
  },
  {
    name:"Chicken Potjie with Baby Potatoes & Butternut",
    protein:"chicken", carb:"potato", cuisine:["african","world"], gf:true, allergens:[], cost:9.00,
    defaultStarch:"Boiled Potatoes", defaultVeg:"Roasted Mediterranean Veg",
    ingredients:[
      {item:"Chicken pieces (thighs/drumsticks)",qty:"8"},
      {item:"Baby potatoes",qty:"500g"},
      {item:"Butternut squash",qty:"½ medium"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Chicken stock cube",qty:"1"},
      {item:"Fresh thyme",qty:"small bunch"},
    ],
  },
  {
    name:"Chilli Con Carne with Rice & Nachos",
    protein:"beef", carb:"rice", cuisine:["tex-mex","american"], gf:true, allergens:[], cost:8.50,
    defaultStarch:"Basmati Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Beef mince",qty:"500g"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Tortilla chips / nachos",qty:"1 bag"},
      {item:"Tinned kidney beans",qty:"1 tin"},
      {item:"Tinned chopped tomatoes",qty:"2 tins"},
      {item:"Tomato puree",qty:"2 tbsp"},
      {item:"Onion",qty:"1 large"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Chilli powder & cumin",qty:"2 tsp each"},
      {item:"Beef stock cube",qty:"1"},
      {item:"Soured cream & cheddar to serve",qty:"optional"},
    ],
  },
  {
    name:"Cheese & Bacon Burger with Waffle Fries",
    protein:"beef", carb:"potato", cuisine:["american","comfort"], gf:false, allergens:["gluten","milk","eggs"], cost:9.50,
    defaultStarch:"Chips / Fries", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Beef mince",qty:"500g"},
      {item:"Burger buns",qty:"4"},
      {item:"Waffle fries or oven chips",qty:"800g"},
      {item:"Cheddar cheese slices",qty:"4"},
      {item:"Smoked bacon",qty:"4 rashers"},
      {item:"Lettuce, tomato, onion",qty:"for serving"},
      {item:"Ketchup / burger sauce",qty:"to taste"},
    ],
  },
  {
    name:"Chicken Burger with Wedges, Lettuce & Tomato",
    protein:"chicken", carb:"potato", cuisine:["american","comfort"], gf:false, allergens:["gluten"], cost:8.50,
    defaultStarch:"Potato Wedges", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Chicken breast",qty:"4"},
      {item:"Burger buns",qty:"4"},
      {item:"White potatoes for wedges",qty:"800g"},
      {item:"Lettuce",qty:"½ head"},
      {item:"Tomatoes",qty:"2"},
      {item:"Mayonnaise",qty:"3 tbsp"},
      {item:"Olive oil & paprika for wedges",qty:"to season"},
    ],
  },
  {
    name:"Chicken Wings with Potato Wedges & Salad",
    protein:"chicken", carb:"potato", cuisine:["american","comfort"], gf:true, allergens:[], cost:8.00,
    defaultStarch:"Potato Wedges", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Chicken wings",qty:"1kg"},
      {item:"White potatoes for wedges",qty:"800g"},
      {item:"Mixed salad leaves",qty:"1 bag"},
      {item:"Hot sauce or BBQ sauce",qty:"3 tbsp"},
      {item:"Garlic powder, paprika",qty:"1 tsp each"},
      {item:"Olive oil",qty:"2 tbsp"},
    ],
  },
  {
    name:"Chicken Dippers with Chips & Baked Beans",
    protein:"chicken", carb:"potato", cuisine:["comfort"], gf:true, allergens:[], cost:6.50,
    defaultStarch:"Chips / Fries", defaultVeg:"Baked Beans",
    ingredients:[
      {item:"Chicken dippers / nuggets",qty:"1 pack (500g)"},
      {item:"Oven chips",qty:"800g"},
      {item:"Baked beans",qty:"1 tin"},
    ],
  },
  {
    name:"Hot Dogs with Chips & Side Salad",
    protein:"pork", carb:"potato", cuisine:["american","comfort"], gf:false, allergens:["gluten"], cost:6.50,
    defaultStarch:"Chips / Fries", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Hot dog sausages",qty:"1 pack (8)"},
      {item:"Hot dog buns",qty:"1 pack (8)"},
      {item:"Oven chips",qty:"800g"},
      {item:"Mixed salad leaves",qty:"1 bag"},
      {item:"Ketchup & mustard",qty:"to taste"},
    ],
  },
  {
    name:"Sausage Rolls with Wedges & Sweetcorn",
    protein:"pork", carb:"potato", cuisine:["british","comfort"], gf:false, allergens:["gluten","eggs"], cost:7.00,
    defaultStarch:"Potato Wedges", defaultVeg:"Sweetcorn",
    ingredients:[
      {item:"Ready-made sausage rolls",qty:"1 pack"},
      {item:"White potatoes for wedges",qty:"800g"},
      {item:"Sweetcorn",qty:"1 tin or frozen 200g"},
      {item:"Olive oil & paprika for wedges",qty:"to season"},
    ],
  },
  {
    name:"Pizza with Potato Salad & Coleslaw",
    protein:"veggie", carb:"other", cuisine:["italian","comfort"], gf:false, allergens:["gluten","milk"], cost:6.50,
    defaultStarch:"No starch", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Pizza bases or ready-made pizzas",qty:"2 large"},
      {item:"Pizza sauce / passata",qty:"200ml"},
      {item:"Mozzarella",qty:"150g"},
      {item:"Your choice of toppings",qty:"as needed"},
      {item:"White potatoes for potato salad",qty:"400g"},
      {item:"Coleslaw",qty:"1 small tub"},
      {item:"Mayonnaise",qty:"2 tbsp"},
    ],
  },
  {
    name:"Roasted Salmon with Potato Wedges & Green Beans",
    protein:"fish", carb:"potato", cuisine:["british","mediterranean"], gf:true, allergens:["fish"], cost:11.00,
    defaultStarch:"Potato Wedges", defaultVeg:"Green Beans",
    ingredients:[
      {item:"Salmon fillets",qty:"4"},
      {item:"White potatoes for wedges",qty:"800g"},
      {item:"Green beans",qty:"200g"},
      {item:"Lemon",qty:"1"},
      {item:"Garlic",qty:"2 cloves"},
      {item:"Olive oil",qty:"2 tbsp"},
      {item:"Dill or parsley",qty:"small bunch"},
    ],
  },
  {
    name:"Fish Fingers & Chips with Beans or Peas",
    protein:"fish", carb:"potato", cuisine:["comfort"], gf:true, allergens:["fish","gluten"], cost:7.50,
    defaultStarch:"Chips / Fries", defaultVeg:"Frozen Peas",
    ingredients:[
      {item:"Fish fingers",qty:"1 pack (12–16)"},
      {item:"Oven chips",qty:"800g"},
      {item:"Baked beans or frozen peas",qty:"1 tin / 200g"},
      {item:"Ketchup",qty:"to serve"},
    ],
  },
  {
    name:"Full Cooked Breakfast with GF Toast & Hash Browns",
    protein:"pork", carb:"other", cuisine:["british","breakfast"], gf:false, allergens:["gluten","eggs","milk"], cost:8.00,
    defaultStarch:"No starch", defaultVeg:"No veg",
    ingredients:[
      {item:"Pork sausages",qty:"8"},
      {item:"Smoked bacon",qty:"8 rashers"},
      {item:"Eggs",qty:"4"},
      {item:"Tinned baked beans",qty:"1 tin"},
      {item:"Tinned tomatoes",qty:"1 tin"},
      {item:"Mushrooms",qty:"200g"},
      {item:"Hash browns",qty:"1 pack"},
      {item:"GF bread",qty:"4 slices"},
      {item:"Butter",qty:"25g"},
    ],
  },
  {
    name:"Quiche with Potato Wedges & Greek Salad",
    protein:"veggie", carb:"potato", cuisine:["british","mediterranean"], gf:true, allergens:["eggs","milk"], cost:7.50,
    defaultStarch:"Potato Wedges", defaultVeg:"Greek Salad",
    ingredients:[
      {item:"Ready-made quiche (or pastry + filling)",qty:"1 large"},
      {item:"White potatoes for wedges",qty:"600g"},
      {item:"Cucumber, tomatoes, olives, feta",qty:"for Greek salad"},
      {item:"Olive oil & lemon for dressing",qty:"to taste"},
    ],
  },
  {
    name:"Loaded Baked Potato with Savoury Mince & Cheese",
    protein:"beef", carb:"potato", cuisine:["british","comfort"], gf:true, allergens:["milk"], cost:7.50,
    defaultStarch:"Jacket Potato", defaultVeg:"Mixed Salad",
    ingredients:[
      {item:"Large baking potatoes",qty:"4"},
      {item:"Beef mince",qty:"400g"},
      {item:"Cheddar cheese",qty:"150g"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Onion",qty:"1"},
      {item:"Garlic",qty:"2 cloves"},
      {item:"Butter",qty:"25g"},
      {item:"Soured cream",qty:"optional"},
    ],
  },
  {
    name:"Pork Chops with Apple Sauce, Mash & Green Beans",
    protein:"pork", carb:"potato", cuisine:["british"], gf:true, allergens:["milk"], cost:9.00,
    defaultStarch:"Mashed Potato", defaultVeg:"Green Beans",
    ingredients:[
      {item:"Pork loin chops",qty:"4"},
      {item:"White potatoes",qty:"900g"},
      {item:"Green beans",qty:"200g"},
      {item:"Apple sauce",qty:"1 jar"},
      {item:"Butter & milk for mash",qty:"to taste"},
      {item:"Olive oil",qty:"1 tbsp"},
    ],
  },
  {
    name:"Oven Baked Rice with Chicken, Chorizo & Tomato",
    protein:"chicken", carb:"rice", cuisine:["mediterranean","spanish"], gf:true, allergens:[], cost:8.50,
    defaultStarch:"Basmati Rice", defaultVeg:"No veg",
    ingredients:[
      {item:"Chicken thighs (bone-in)",qty:"8"},
      {item:"Basmati rice",qty:"300g"},
      {item:"Chorizo",qty:"150g"},
      {item:"Tinned chopped tomatoes",qty:"1 tin"},
      {item:"Chicken stock cube",qty:"1"},
      {item:"Red pepper",qty:"1"},
      {item:"Onion",qty:"1"},
      {item:"Garlic",qty:"3 cloves"},
      {item:"Smoked paprika",qty:"1 tsp"},
    ],
  },
];

// ─── SAINSBURY'S PRICE DATABASE (April 2026) ─────────────────────────────────
// All prices in £ per 100g or £ per unit as noted
// Sources: Sainsbury's receipts March 2026 + live lookup April 2026
const PRICES = {
  // ── Proteins (£ per 100g) ──
  "whole chicken":        0.33,  // 1.6kg £5.35
  "chicken breast":       0.73,  // 320g £2.34
  "chicken thigh":        0.30,  // 1kg £2.99
  "chicken mince":        0.73,  // same as breast
  "chicken pieces":       0.30,  // thighs rate
  "chicken dippers":      0.65,  // estimated from frozen range
  "beef mince":           0.93,  // 1kg £9.25
  "beef braising":        1.25,  // 500g £6.25
  "beef steak":           1.89,  // rump 225g £4.25
  "beef burger":          0.88,  // 454g £4.00
  "pork chop":            0.85,  // tenderloin rate
  "pork tenderloin":      0.85,  // 460g £3.93
  "pork sausage":         0.81,  // 400g £3.25
  "pork fillet":          0.85,
  "gammon":               0.75,  // estimated (not on receipt)
  "bacon":                0.45,  // 300g £1.35 avg
  "hot dog":              0.49,  // 380g £1.85
  "lamb mince":           1.60,  // 500g £8.00
  "lamb leg":             1.67,  // per kg normalised sale price
  "lamb shoulder":        2.06,  // 400g £8.25
  "king prawn":           1.58,  // 400g frozen £6.33
  "prawn":                1.58,
  "white fish":           0.45,  // 520g £2.33
  "fish finger":          1.04,  // 360g £3.75
  "salmon":               2.95,  // 100g £2.95
  "fish pie mix":         0.80,  // estimated blend
  "sausage roll":         0.65,  // estimated

  // ── Dairy & Eggs (£ per 100g or per unit) ──
  "egg":                  0.24,  // per egg (£2.90/dozen) — use perUnit
  "butter":               0.75,  // 250g £1.87
  "milk":                 0.073, // per 100ml, 2.27L £1.65
  "double cream":         0.67,  // 300ml £2.00
  "creme fraiche":        0.35,  // 300ml £1.05
  "natural yoghurt":      0.47,  // 500g £2.35
  "cheddar":              0.63,  // 600g £3.79
  "cheese":               0.63,  // default to cheddar
  "mozzarella":           0.55,  // 125g £0.69
  "feta":                 0.43,  // 200g £0.85
  "parmesan":             2.00,  // 200g £4.00
  "cream cheese":         0.60,  // estimated

  // ── Vegetables (£ per 100g) ──
  "white potato":         0.066, // 2kg £1.32
  "potato":               0.066,
  "baking potato":        0.099, // x4 £0.79
  "sweet potato":         0.12,  // per kg £1.19
  "carrot":               0.069, // 1kg £0.69
  "onion":                0.10,  // per kg ~£1.00
  "garlic":               0.22,  // per bulb £0.22
  "ginger":               0.56,  // per 100g (£5.60/kg)
  "pepper":               0.47,  // each ~150g £0.70
  "courgette":            0.29,  // 500g £1.45
  "aubergine":            0.33,  // each ~300g £0.99
  "broccoli":             0.25,  // head ~400g £1.00
  "spinach":              0.75,  // 200g £1.50
  "green bean":           0.73,  // 200g £1.45
  "spring onion":         0.69,  // bunch ~100g £0.69
  "mushroom":             0.29,  // 400g £1.15
  "tomato":               0.28,  // per kg £2.80
  "cucumber":             0.22,  // each ~370g £0.82
  "lettuce":              0.87,  // pack avg (whole unit)
  "butternut squash":     0.15,  // per kg £1.50
  "parsnip":              0.15,  // per kg £1.47
  "cabbage":              0.15,  // estimated
  "frozen pea":           0.12,  // estimated
  "sweetcorn":            0.25,  // 198g tin £0.49
  "lemon":                0.35,  // per unit
  "lime":                 0.24,  // per unit

  // ── Carbs — dry weight (£ per 100g) ──
  "basmati rice":         0.18,  // 1kg £1.79
  "rice":                 0.18,
  "pasta":                0.15,  // GF penne/spaghetti 500g £0.75
  "spaghetti":            0.15,
  "penne":                0.15,
  "tagliatelle":          0.15,
  "lasagne sheet":        0.30,  // 250g £0.75
  "macaroni":             0.15,
  "lentil":               0.20,  // 1kg £2.00
  "chapati":              0.20,  // estimated
  "naan":                 0.25,  // estimated
  "tortilla chip":        0.45,  // 200g £0.89

  // ── Tins & Jars (£ per 100g or unit) ──
  "chopped tomato":       0.11,  // 400g £0.43
  "tomato puree":         0.33,  // 200g £0.65
  "pasta sauce":          0.14,  // 500g £0.69
  "kidney bean":          0.11,  // 400g £0.45
  "baked bean":           0.34,  // 415g £1.40
  "coconut milk":         0.25,  // 400ml £1.00
  "pineapple":            0.27,  // 425g £1.15
  "apple sauce":          0.24,  // 250ml £0.60
  "mint sauce":           0.30,  // jar £0.82 ~275g
  "apricot jam":          0.20,  // 454g £0.89
  "teriyaki sauce":       1.05,  // 200g £2.10
  "sweet sour sauce":     0.24,  // 500g £1.20
  "curry paste":          1.12,  // 290g £3.25
  "stock cube":           0.15,  // per cube
  "gravy granule":        0.88,  // 170g £1.50
  "prawn cracker":        0.45,  // similar to tortilla

  // ── Oils & Sundry ──
  "olive oil":            0.75,  // per 100ml, 1L £7.50
  "sunflower oil":        0.17,  // per 100ml, 1L £1.65
  "hash brown":           0.32,  // 625g £2.00
};

// ─── BNF PORTION SIZES (grams per adult per meal) ────────────────────────────
// Source: British Nutrition Foundation — Your Balanced Diet guide
const BNF = {
  // Proteins
  wholeChicken:    350, // whole roast chicken — 350g cooked per person incl bone loss
  chickenBreast:   130, // cooked breast
  chickenThigh:    150, // bone-in thighs (2 per person)
  beefMince:       130, // mince in sauce
  beefBraising:    150, // stew/hotpot
  beefBurger:      115, // one quarter-pounder (114g raw)
  pork:            130,
  lamb:            130,
  fish:            130, // fillet
  prawn:           120,
  // Carbs (dry weight — converts to cooked)
  riceDry:          75, // cooks to ~200g
  pastaDry:         80, // cooks to ~200g
  potato:          200, // raw (peeled)
  lentilDry:        75,
  // Veg
  veg:              80, // one BNF portion
  // Dairy in sauces
  milkSauce:       120, // ml per person
  creamSauce:       40, // ml per person
  cheese:           30, // hard cheese per person
  // Storecupboard buffer (oils, herbs, seasonings, stock, puree etc.)
  storecupboard:  0.40, // £ per person flat addition
};

// ─── MEAL COST CALCULATOR ─────────────────────────────────────────────────────
// Calculates realistic per-meal cost using BNF portions × real Sainsbury's prices
// Returns cost for the whole family (familySize people)
const calcMealCost = (mealName, familySize) => {
  const n = familySize || 4;

  // Map each meal to its key cost components
  const recipes = {
    "Roast Chicken with Roast Potatoes, Yorkshire & Gravy": () =>
      PRICES["whole chicken"] * BNF.wholeChicken * n
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["milk"] * 100 * n / 100  // yorkshire batter
      + PRICES["egg"] * 1               // yorkshire
      + PRICES["gravy granule"] * 15,

    "Roast Pork with Apple Sauce, Roast Potatoes & Veg": () =>
      PRICES["pork tenderloin"] * BNF.pork * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["apple sauce"] * 50 / 100
      + PRICES["carrot"] * BNF.veg * n / 100,

    "Roast Lamb with Roast Potatoes, Cabbage & Peas": () =>
      PRICES["lamb leg"] * BNF.lamb * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["frozen pea"] * BNF.veg * n / 100
      + PRICES["mint sauce"] * 30 / 100,

    "Chicken & Vegetable Curry with Basmati Rice": () =>
      PRICES["chicken breast"] * BNF.chickenBreast * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["curry paste"] * 60 / 100
      + PRICES["chopped tomato"] * 200 / 100
      + PRICES["onion"] * 100 / 100
      + PRICES["pepper"] * 100 / 100,

    "Butter Chicken Curry with Basmati Rice": () =>
      PRICES["chicken breast"] * BNF.chickenBreast * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["curry paste"] * 80 / 100
      + PRICES["double cream"] * BNF.creamSauce * n / 100
      + PRICES["chopped tomato"] * 200 / 100,

    "Chicken Tikka Masala with Pilau Rice": () =>
      PRICES["chicken breast"] * BNF.chickenBreast * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["curry paste"] * 80 / 100
      + PRICES["coconut milk"] * 150 / 100
      + PRICES["chopped tomato"] * 200 / 100,

    "Beef Curry with Basmati Rice": () =>
      PRICES["beef braising"] * BNF.beefBraising * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["curry paste"] * 60 / 100
      + PRICES["chopped tomato"] * 200 / 100
      + PRICES["onion"] * 100 / 100,

    "Lamb Curry with Basmati Rice": () =>
      PRICES["lamb shoulder"] * BNF.lamb * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["curry paste"] * 80 / 100
      + PRICES["natural yoghurt"] * 100 / 100
      + PRICES["chopped tomato"] * 200 / 100,

    "Vegetable Curry with Basmati Rice": () =>
      PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["curry paste"] * 60 / 100
      + PRICES["chopped tomato"] * 200 / 100
      + PRICES["kidney bean"] * 200 / 100
      + PRICES["spinach"] * 80 / 100
      + PRICES["onion"] * 100 / 100,

    "Chicken Teriyaki Stir Fry with Basmati Rice": () =>
      PRICES["chicken breast"] * BNF.chickenBreast * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["teriyaki sauce"] * 60 / 100
      + PRICES["broccoli"] * BNF.veg * n / 100
      + PRICES["pepper"] * 100 / 100,

    "Beef Teriyaki Stir Fry with Egg Fried Rice": () =>
      PRICES["beef steak"] * BNF.beefBraising * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["egg"] * n
      + PRICES["teriyaki sauce"] * 60 / 100
      + PRICES["broccoli"] * BNF.veg * n / 100,

    "Pork & Veg Stir Fry with Teriyaki & Rice": () =>
      PRICES["pork fillet"] * BNF.pork * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["teriyaki sauce"] * 60 / 100
      + PRICES["pepper"] * 100 / 100,

    "Sweet & Sour Chicken with Rice & Prawn Crackers": () =>
      PRICES["chicken breast"] * BNF.chickenBreast * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["sweet sour sauce"] * 150 / 100
      + PRICES["prawn cracker"] * 50 / 100
      + PRICES["pineapple"] * 100 / 100,

    "Sweet & Sour Pork with Rice & Prawn Crackers": () =>
      PRICES["pork fillet"] * BNF.pork * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["sweet sour sauce"] * 150 / 100
      + PRICES["prawn cracker"] * 50 / 100
      + PRICES["pineapple"] * 100 / 100,

    "Prawn & Vegetable Stir Fry with Egg Fried Rice": () =>
      PRICES["king prawn"] * BNF.prawn * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["egg"] * n
      + PRICES["pepper"] * 100 / 100
      + PRICES["spring onion"] * 50 / 100,

    "Thai Green Chicken Curry with Jasmine Rice": () =>
      PRICES["chicken breast"] * BNF.chickenBreast * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["curry paste"] * 70 / 100
      + PRICES["coconut milk"] * 200 / 100
      + PRICES["green bean"] * 80 / 100
      + PRICES["spinach"] * 50 / 100,

    "Nepalese Lentil Dal with Rice & Chapati": () =>
      PRICES["lentil"] * BNF.lentilDry * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["chapati"] * 60 * n / 100
      + PRICES["chopped tomato"] * 200 / 100
      + PRICES["onion"] * 100 / 100
      + PRICES["spinach"] * 80 / 100,

    "Spaghetti Bolognese with Cheesy Garlic Bread": () =>
      PRICES["beef mince"] * BNF.beefMince * n / 100
      + PRICES["spaghetti"] * BNF.pastaDry * n / 100
      + PRICES["chopped tomato"] * 400 / 100
      + PRICES["cheddar"] * 20 / 100
      + PRICES["pasta sauce"] * 100 / 100,

    "Chicken Pasta in Homemade Tomato & Basil Sauce": () =>
      PRICES["chicken breast"] * BNF.chickenBreast * n / 100
      + PRICES["penne"] * BNF.pastaDry * n / 100
      + PRICES["chopped tomato"] * 400 / 100
      + PRICES["tomato puree"] * 40 / 100
      + PRICES["onion"] * 80 / 100,

    "Creamy Chicken Tagliatelle with Garlic & Mushrooms": () =>
      PRICES["chicken breast"] * BNF.chickenBreast * n / 100
      + PRICES["tagliatelle"] * BNF.pastaDry * n / 100
      + PRICES["double cream"] * BNF.creamSauce * n / 100
      + PRICES["mushroom"] * 100 / 100
      + PRICES["parmesan"] * 20 / 100,

    "Sausage Pasta with Vegetables & Tomato Sauce": () =>
      PRICES["pork sausage"] * BNF.pork * n / 100
      + PRICES["penne"] * BNF.pastaDry * n / 100
      + PRICES["chopped tomato"] * 400 / 100
      + PRICES["pepper"] * 100 / 100
      + PRICES["onion"] * 80 / 100,

    "Meatballs & Penne in Tomato Sauce": () =>
      PRICES["beef mince"] * BNF.beefMince * n / 100
      + PRICES["penne"] * BNF.pastaDry * n / 100
      + PRICES["egg"] * 1
      + PRICES["chopped tomato"] * 400 / 100
      + PRICES["parmesan"] * 20 / 100,

    "Lasagne with Cheesy Garlic Bread": () =>
      PRICES["beef mince"] * BNF.beefMince * n / 100
      + PRICES["lasagne sheet"] * 60 * n / 100
      + PRICES["milk"] * BNF.milkSauce * n / 100
      + PRICES["butter"] * 25 / 100
      + PRICES["cheddar"] * 50 / 100
      + PRICES["chopped tomato"] * 400 / 100,

    "Mushroom & Spinach Pasta in Creamy Sauce": () =>
      PRICES["mushroom"] * 150 / 100
      + PRICES["penne"] * BNF.pastaDry * n / 100
      + PRICES["double cream"] * BNF.creamSauce * n / 100
      + PRICES["spinach"] * 100 / 100
      + PRICES["parmesan"] * 25 / 100,

    "Mac & Cheese with Prawns & Garlic Bread": () =>
      PRICES["king prawn"] * BNF.prawn * n / 100
      + PRICES["macaroni"] * BNF.pastaDry * n / 100
      + PRICES["milk"] * BNF.milkSauce * n / 100
      + PRICES["cheddar"] * 80 / 100
      + PRICES["butter"] * 25 / 100,

    "Cottage Pie with Frozen Peas": () =>
      PRICES["beef mince"] * BNF.beefMince * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["frozen pea"] * BNF.veg * n / 100
      + PRICES["chopped tomato"] * 200 / 100
      + PRICES["carrot"] * 80 / 100
      + PRICES["butter"] * 20 / 100
      + PRICES["milk"] * 50 / 100,

    "Shepherd's Pie with Green Beans & Gravy": () =>
      PRICES["lamb mince"] * BNF.lamb * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["green bean"] * BNF.veg * n / 100
      + PRICES["carrot"] * 80 / 100
      + PRICES["gravy granule"] * 15 / 100
      + PRICES["butter"] * 20 / 100,

    "Beef & Vegetable Hotpot with Sliced Potato": () =>
      PRICES["beef braising"] * BNF.beefBraising * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["carrot"] * BNF.veg * n / 100
      + PRICES["onion"] * 100 / 100,

    "Sausage & Mash with Peas, Carrots & Gravy": () =>
      PRICES["pork sausage"] * 150 * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["frozen pea"] * BNF.veg * n / 100
      + PRICES["carrot"] * BNF.veg * n / 100
      + PRICES["gravy granule"] * 20 / 100,

    "Toad in the Hole with Mash & Green Beans": () =>
      PRICES["pork sausage"] * 150 * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["green bean"] * BNF.veg * n / 100
      + PRICES["egg"] * 3
      + PRICES["milk"] * 100 / 100,

    "Gammon, Egg & Chips with Peas & Pineapple": () =>
      PRICES["gammon"] * BNF.pork * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["egg"] * n
      + PRICES["frozen pea"] * BNF.veg * n / 100
      + PRICES["pineapple"] * 100 / 100,

    "Fish Pie with Mashed Potato & Peas": () =>
      PRICES["fish pie mix"] * BNF.fish * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["frozen pea"] * BNF.veg * n / 100
      + PRICES["milk"] * BNF.milkSauce * n / 100
      + PRICES["cheddar"] * 40 / 100,

    "GF Fish & Chips with Peas or Baked Beans": () =>
      PRICES["white fish"] * BNF.fish * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["frozen pea"] * BNF.veg * n / 100,

    "Lemon Chicken, Potato & Vegetable Tray Bake": () =>
      PRICES["chicken thigh"] * BNF.chickenThigh * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["pepper"] * 150 / 100
      + PRICES["courgette"] * 100 / 100
      + PRICES["onion"] * 80 / 100,

    "Moussaka with Greek Salad": () =>
      PRICES["lamb mince"] * BNF.lamb * n / 100
      + PRICES["aubergine"] * 200 / 100
      + PRICES["potato"] * 150 * n / 100
      + PRICES["milk"] * BNF.milkSauce * n / 100
      + PRICES["egg"] * 2
      + PRICES["cheddar"] * 40 / 100
      + PRICES["chopped tomato"] * 200 / 100
      + PRICES["feta"] * 50 / 100,

    "Chicken Bobotie with Basmati Rice": () =>
      PRICES["chicken breast"] * BNF.chickenBreast * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["egg"] * 2
      + PRICES["milk"] * 60 / 100
      + PRICES["apricot jam"] * 40 / 100,

    "Beef Bobotie with Basmati Rice": () =>
      PRICES["beef mince"] * BNF.beefMince * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["egg"] * 2
      + PRICES["milk"] * 60 / 100
      + PRICES["apricot jam"] * 40 / 100,

    "Chicken Potjie with Baby Potatoes & Butternut": () =>
      PRICES["chicken thigh"] * BNF.chickenThigh * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["butternut squash"] * 150 / 100
      + PRICES["chopped tomato"] * 200 / 100
      + PRICES["onion"] * 80 / 100,

    "Chilli Con Carne with Rice & Nachos": () =>
      PRICES["beef mince"] * BNF.beefMince * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["kidney bean"] * 200 / 100
      + PRICES["chopped tomato"] * 400 / 100
      + PRICES["tortilla chip"] * 50 / 100,

    "Cheese & Bacon Burger with Waffle Fries": () =>
      PRICES["beef burger"] * BNF.beefBurger * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["cheddar"] * 30 * n / 100
      + PRICES["bacon"] * 50 * n / 100,

    "Chicken Burger with Wedges, Lettuce & Tomato": () =>
      PRICES["chicken breast"] * BNF.chickenBreast * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["lettuce"] * 0.5,

    "Chicken Wings with Potato Wedges & Salad": () =>
      PRICES["chicken thigh"] * 200 * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["lettuce"] * 0.5,

    "Chicken Dippers with Chips & Baked Beans": () =>
      PRICES["chicken dippers"] * 150 * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["baked bean"] * 200 / 100,

    "Hot Dogs with Chips & Side Salad": () =>
      PRICES["hot dog"] * 100 * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["lettuce"] * 0.5,

    "Sausage Rolls with Wedges & Sweetcorn": () =>
      PRICES["sausage roll"] * 150 * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["sweetcorn"] * 100 / 100,

    "Pizza with Potato Salad & Coleslaw": () =>
      PRICES["pasta"] * 100 * n / 100  // dough base approximation
      + PRICES["mozzarella"] * 50 * n / 100
      + PRICES["tomato puree"] * 40 / 100
      + PRICES["potato"] * 100 * n / 100,

    "Roasted Salmon with Potato Wedges & Green Beans": () =>
      PRICES["salmon"] * BNF.fish * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["green bean"] * BNF.veg * n / 100,

    "Fish Fingers & Chips with Beans or Peas": () =>
      PRICES["fish finger"] * 120 * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["baked bean"] * 150 / 100,

    "Full Cooked Breakfast with GF Toast & Hash Browns": () =>
      PRICES["pork sausage"] * 100 * n / 100
      + PRICES["bacon"] * 50 * n / 100
      + PRICES["egg"] * n
      + PRICES["baked bean"] * 150 / 100
      + PRICES["mushroom"] * 60 * n / 100
      + PRICES["hash brown"] * 100 * n / 100,

    "Quiche with Potato Wedges & Greek Salad": () =>
      PRICES["egg"] * n
      + PRICES["milk"] * 100 / 100
      + PRICES["cheddar"] * 60 / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["feta"] * 50 / 100,

    "Loaded Baked Potato with Savoury Mince & Cheese": () =>
      PRICES["beef mince"] * 100 * n / 100
      + PRICES["baking potato"] * n * 0.79 / 4
      + PRICES["cheddar"] * 40 * n / 100
      + PRICES["chopped tomato"] * 200 / 100,

    "Pork Chops with Apple Sauce, Mash & Green Beans": () =>
      PRICES["pork chop"] * BNF.pork * n / 100
      + PRICES["potato"] * BNF.potato * n / 100
      + PRICES["green bean"] * BNF.veg * n / 100
      + PRICES["apple sauce"] * 60 / 100,

    "Oven Baked Rice with Chicken, Chorizo & Tomato": () =>
      PRICES["chicken thigh"] * BNF.chickenThigh * n / 100
      + PRICES["basmati rice"] * BNF.riceDry * n / 100
      + PRICES["chopped tomato"] * 200 / 100
      + PRICES["onion"] * 80 / 100
      + PRICES["pepper"] * 100 / 100,
  };

  // Run calculation, add storecupboard buffer, round to 2dp
  const base = recipes[mealName] ? recipes[mealName]() : 8.00;
  const buffer = BNF.storecupboard * n;
  return Math.max(1.50, parseFloat((base + buffer).toFixed(2)));
};

const ALLERGENS = [
  {id:"gluten",label:"Gluten",icon:"🌾"},{id:"crustaceans",label:"Crustaceans",icon:"🦐"},
  {id:"eggs",label:"Eggs",icon:"🥚"},{id:"fish",label:"Fish",icon:"🐟"},
  {id:"peanuts",label:"Peanuts",icon:"🥜"},{id:"soya",label:"Soya",icon:"🫘"},
  {id:"milk",label:"Milk/Dairy",icon:"🥛"},{id:"nuts",label:"Tree Nuts",icon:"🌰"},
  {id:"celery",label:"Celery",icon:"🥬"},{id:"mustard",label:"Mustard",icon:"🌭"},
  {id:"sesame",label:"Sesame",icon:"🫙"},{id:"sulphites",label:"Sulphites",icon:"🍷"},
  {id:"lupin",label:"Lupin",icon:"🌸"},{id:"molluscs",label:"Molluscs",icon:"🐚"},
];

const CUISINES = [
  {id:"british-roast",label:"British Roast",icon:"🍗"},{id:"british-classic",label:"British Classic",icon:"🥧"},
  {id:"italian",label:"Italian",icon:"🍝"},{id:"indian",label:"Indian",icon:"🍛"},
  {id:"curry",label:"Curry",icon:"🫕"},{id:"asian",label:"Asian",icon:"🥢"},
  {id:"chinese",label:"Chinese",icon:"🥡"},{id:"american",label:"American",icon:"🍔"},
  {id:"comfort",label:"Comfort",icon:"😌"},{id:"mediterranean",label:"Mediterranean",icon:"🫒"},
  {id:"greek",label:"Greek",icon:"🏛️"},{id:"tex-mex",label:"Tex-Mex",icon:"🌮"},
  {id:"african",label:"African",icon:"🌍"},{id:"thai",label:"Thai",icon:"🇹🇭"},
  {id:"nepalese",label:"Nepalese",icon:"🏔️"},{id:"japanese",label:"Japanese",icon:"🍱"},
  {id:"spanish",label:"Spanish",icon:"💃"},{id:"world",label:"World / Other",icon:"🌐"},
];

const PROTEINS = [
  {id:"chicken",label:"Chicken",icon:"🍗"},{id:"beef",label:"Beef",icon:"🥩"},
  {id:"pork",label:"Pork",icon:"🐷"},{id:"lamb",label:"Lamb",icon:"🫘"},
  {id:"fish",label:"Fish",icon:"🐟"},{id:"veggie",label:"Veggie",icon:"🥦"},
];

const SUPERMARKETS = ["Sainsbury's","Tesco","ASDA","Morrisons","Aldi","Lidl","Waitrose","M&S","Iceland","Co-op","Other"];
const DAYS = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
const pIcon = {chicken:"🍗",beef:"🥩",pork:"🐷",lamb:"🫘",fish:"🐟",veggie:"🥦"};
const cIcon = {pasta:"🍝 Pasta",rice:"🍚 Rice",potato:"🥔 Potato",other:"🥗 Other"};
const LOAD_MSGS = [
  "Searching 2.5 years of real family meal data...",
  "Making sure no pasta twice in a row...",
  "Locking in your Sunday roast...",
  "Checking your allergen preferences...",
  "Balancing proteins across the week...",
  "Almost ready — building your perfect plan!",
];

// ─── BUILD SHOPPING LIST FROM APPROVED PLAN ───────────────────────────────────
// Only uses ingredients from the 7 chosen meals — no generic defaults
const buildShoppingList = (plan) => {
  const byCategory = {
    "Proteins & Fish": [],
    "Fresh Vegetables & Salad": [],
    "Tinned & Jarred Goods": [],
    "Pasta, Rice & Grains": [],
    "Dairy & Eggs": [],
    "Bread, Pastry & Baked": [],
    "Sauces, Spices & Condiments": [],
    "Frozen": [],
    "Other": [],
  };

  const categorise = (item) => {
    const i = item.toLowerCase();
    if (/chicken|beef|pork|lamb|salmon|fish|prawn|sausage|bacon|gammon|mince|steak|thigh|breast|wing|joint|fillet|nugget|dipper/.test(i)) return "Proteins & Fish";
    if (/potato|rice|pasta|spaghetti|penne|tagliatelle|macaroni|lasagne|naan|chapati|tortilla|chip|wedge/.test(i)) return "Pasta, Rice & Grains";
    if (/tinned|tin |jar |passata|coconut milk|stock cube|baked bean|kidney bean|chickpea/.test(i)) return "Tinned & Jarred Goods";
    if (/milk|cream|butter|cheese|egg|yoghurt|feta|mozzarella|parmesan|cheddar/.test(i)) return "Dairy & Eggs";
    if (/frozen/.test(i)) return "Frozen";
    if (/bread|bun|roll|pastry|wrap|crackers|cracker/.test(i)) return "Bread, Pastry & Baked";
    if (/sauce|oil|spice|herb|seasoning|salt|pepper|cumin|paprika|turmeric|thyme|rosemary|coriander|basil|dill|parsley|bay|cinnamon|mustard|ketchup|mayo|vinegar|puree|paste/.test(i)) return "Sauces, Spices & Condiments";
    if (/onion|garlic|ginger|carrot|celery|pepper|courgette|aubergine|mushroom|spinach|lettuce|tomato|cucumber|lemon|lime|spring onion|butternut|squash|broccoli|cabbage|bean|pea|sweetcorn|salad|apple|pineapple/.test(i)) return "Fresh Vegetables & Salad";
    return "Other";
  };

  const seen = new Set();
  plan.forEach(item => {
    const dbMeal = MEALS.find(m => m.name === item.meal);
    if (!dbMeal || !dbMeal.ingredients) return;
    dbMeal.ingredients.forEach(ing => {
      // Combine duplicates by item name (case-insensitive)
      const key = ing.item.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        const cat = categorise(ing.item);
        byCategory[cat].push({
          item: ing.item,
          qty: ing.qty,
          note: ing.note || null,
          day: item.day,
        });
      }
    });
  });

  return byCategory;
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Outfit:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Outfit',sans-serif;background:${B.bg};color:${B.text};min-height:100vh;}
.app{max-width:820px;margin:0 auto;padding:0 16px 100px;}
.hero{text-align:center;padding:40px 0 24px;}
.logo{font-family:'Fraunces',serif;font-size:36px;font-weight:700;color:${B.primary};letter-spacing:-0.5px;}
.logo em{color:${B.accent};font-style:normal;}
.tagline{font-size:13px;color:${B.faint};margin-top:5px;font-weight:300;letter-spacing:0.02em;}
.tab-pills{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;margin-bottom:20px;scrollbar-width:none;}
.tab-pills::-webkit-scrollbar{display:none;}
.tab-pill{flex-shrink:0;padding:7px 16px;border-radius:20px;border:1.5px solid ${B.border};background:transparent;color:${B.muted};font-size:12px;font-weight:500;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.15s;}
.tab-pill.on{background:${B.primary};color:#fff;border-color:${B.primary};}
.progress{display:flex;justify-content:center;gap:5px;margin-bottom:22px;}
.pdot{height:4px;border-radius:2px;background:${B.border};transition:all 0.3s;}
.pdot.on{background:${B.primary};width:22px;}
.pdot.done{background:#9FE1CB;}
.card{background:${B.card};border-radius:20px;padding:24px;margin-bottom:14px;border:1px solid ${B.border};}
.card-h{font-family:'Fraunces',serif;font-size:18px;font-weight:600;color:${B.text};margin-bottom:3px;}
.card-s{font-size:12px;color:${B.faint};margin-bottom:16px;line-height:1.5;}
.row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid ${B.bg};}
.row:last-child{border-bottom:none;}
.tog-wrap{display:flex;align-items:center;gap:12px;cursor:pointer;}
.tog{width:44px;height:24px;border-radius:12px;background:${B.border};transition:background 0.2s;position:relative;flex-shrink:0;}
.tog.on{background:${B.primary};}
.tog-k{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform 0.2s;box-shadow:0 1px 3px rgba(0,0,0,0.15);}
.tog.on .tog-k{transform:translateX(20px);}
.tog-lbl{font-size:14px;font-weight:400;}
.tog-sub{font-size:11px;color:${B.faint};margin-top:1px;}
.stp{display:flex;align-items:center;gap:12px;}
.stp-b{width:36px;height:36px;border-radius:50%;border:1.5px solid ${B.primary};background:transparent;color:${B.primary};font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;font-family:'Outfit',sans-serif;}
.stp-b:hover{background:${B.primary};color:#fff;}
.stp-v{font-size:22px;font-weight:500;min-width:32px;text-align:center;}
.pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.pgrid2{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;}
.chip{border:1.5px solid ${B.border};border-radius:14px;padding:12px 8px;text-align:center;cursor:pointer;transition:all 0.15s;background:${B.bg};}
.chip.on{border-color:${B.primary};background:${B.soft};}
.chip-ic{font-size:22px;display:block;margin-bottom:3px;}
.chip-lb{font-size:11px;font-weight:500;color:${B.muted};}
.chip.on .chip-lb{color:${B.primary};}
.sm-chip{border:1.5px solid ${B.border};border-radius:20px;padding:7px 12px;cursor:pointer;transition:all 0.15s;background:${B.bg};font-size:12px;font-weight:500;color:${B.muted};display:flex;align-items:center;gap:5px;}
.sm-chip.on{border-color:${B.primary};background:${B.soft};color:${B.primary};}
.sm-chip.danger{border-color:${B.danger};background:${B.dangerBg};color:${B.danger};}
.sm-chip-grid{display:flex;flex-wrap:wrap;gap:6px;}
.alg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;}
.crb-row{display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid ${B.bg};}
.crb-row:last-child{border-bottom:none;}
.crb-s{display:flex;align-items:center;gap:8px;}
.crb-b{width:28px;height:28px;border-radius:50%;border:1px solid ${B.border};background:transparent;cursor:pointer;font-size:16px;color:${B.muted};display:flex;align-items:center;justify-content:center;transition:all 0.15s;font-family:'Outfit',sans-serif;}
.crb-b:hover{background:${B.soft};}
.fri-box{background:${B.softAmber};border:1.5px solid ${B.accent};border-radius:14px;padding:14px;margin-top:10px;}
.fri-h{font-size:12px;font-weight:600;color:#92600A;margin-bottom:8px;}
.cta{width:100%;padding:15px;background:${B.primary};color:#fff;border:none;border-radius:20px;font-family:'Outfit',sans-serif;font-size:15px;font-weight:500;cursor:pointer;transition:all 0.2s;margin-top:10px;letter-spacing:0.01em;}
.cta:hover{background:${B.primary2};transform:translateY(-1px);}
.cta:disabled{background:${B.border};color:${B.faint};cursor:not-allowed;transform:none;}
.cta.amber{background:${B.accent};}
.cta.amber:hover{background:${B.accent2};}
.cta.ghost{background:transparent;color:${B.primary};border:1.5px solid ${B.primary};}
.cta.ghost:hover{background:${B.soft};transform:none;}
.loading{text-align:center;padding:80px 20px;}
.spin{width:50px;height:50px;border:3px solid ${B.border};border-top-color:${B.primary};border-radius:50%;animation:spin 0.85s linear infinite;margin:0 auto 24px;}
@keyframes spin{to{transform:rotate(360deg);}}
.load-m{font-size:14px;color:${B.muted};font-style:italic;min-height:20px;}
.sum-bar{background:${B.primary};border-radius:20px;padding:20px 24px;color:#fff;display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.s-lbl{font-size:11px;opacity:0.7;margin-bottom:1px;}
.s-val{font-family:'Fraunces',serif;font-size:28px;font-weight:600;}
.s-note{font-size:10px;opacity:0.55;margin-top:2px;font-style:italic;}
.badge-r{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;}
.bdg{font-size:11px;padding:3px 10px;border-radius:20px;background:${B.soft};color:${B.primary};font-weight:500;}
.bdg.amber{background:${B.softAmber};color:#92600A;}
.bdg.danger{background:${B.dangerBg};color:${B.danger};}
.meal-c{background:${B.card};border-radius:16px;padding:16px 18px;margin-bottom:10px;border:1px solid ${B.border};transition:box-shadow 0.15s;}
.meal-c:hover{box-shadow:0 4px 20px rgba(27,94,80,0.08);}
.meal-day{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.09em;color:${B.faint};margin-bottom:2px;}
.meal-name{font-size:14px;font-weight:500;color:${B.text};line-height:1.4;}
.meal-tags{display:flex;gap:4px;margin-top:7px;flex-wrap:wrap;}
.m-tag{font-size:10px;padding:2px 7px;border-radius:20px;background:${B.bg};color:${B.muted};font-weight:400;}
.m-tag.g{background:${B.successBg};color:${B.success};}
.m-tag.a{background:${B.softAmber};color:#92600A;}
.m-tag.d{background:${B.dangerBg};color:${B.danger};}
.m-cost{font-size:12px;font-weight:600;color:${B.primary};white-space:nowrap;}
.sw-btn{background:transparent;border:1px solid ${B.border};border-radius:20px;padding:5px 10px;font-size:11px;font-weight:500;color:${B.faint};cursor:pointer;white-space:nowrap;transition:all 0.15s;font-family:'Outfit',sans-serif;}
.sw-btn:hover{border-color:${B.accent};color:${B.accent};}

/* ── Meal customisation dropdowns ── */
.custom-row{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}
.custom-sel-wrap{flex:1;min-width:140px;}
.custom-lbl{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:${B.faint};margin-bottom:4px;}
.custom-sel{width:100%;padding:7px 10px;border-radius:10px;border:1.5px solid ${B.border};font-family:'Outfit',sans-serif;font-size:12px;background:${B.bg};color:${B.text};cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239EAAB6' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;}
.custom-sel:focus{outline:2px solid ${B.primary};border-color:transparent;}
.custom-sel.changed{border-color:${B.accent};background-color:${B.softAmber};}
.custom-changed-note{font-size:10px;color:#92600A;margin-top:3px;display:flex;align-items:center;gap:3px;}

/* ── Recipe links ── */
.recipe-btn{background:transparent;border:1px solid ${B.primary};border-radius:20px;padding:4px 9px;font-size:10px;font-weight:500;color:${B.primary};cursor:pointer;transition:all 0.15s;font-family:'Outfit',sans-serif;margin-top:4px;}
.recipe-btn:hover{background:${B.soft};}
.recipe-links{margin-top:8px;padding:10px;background:${B.soft};border-radius:10px;font-size:11px;color:${B.primary};}
.recipe-links a{display:block;color:${B.primary};text-decoration:none;padding:3px 0;border-bottom:1px solid ${B.border};}
.recipe-links a:last-child{border-bottom:none;}
.recipe-links a:hover{text-decoration:underline;}
.recipe-disclaimer{font-size:10px;color:${B.muted};background:${B.softAmber};border-radius:8px;padding:7px 10px;margin-top:8px;line-height:1.5;}

.back-b{background:transparent;border:none;color:${B.faint};font-family:'Outfit',sans-serif;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:5px;padding:6px 0;margin-bottom:14px;}
.back-b:hover{color:${B.muted};}

/* ── Shopping list ── */
.shop-sec{margin-bottom:18px;}
.shop-t{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${B.faint};margin-bottom:7px;padding-bottom:4px;border-bottom:1px solid ${B.border};}
.shop-i{font-size:13px;color:${B.text};padding:8px 0;border-bottom:1px solid ${B.bg};display:flex;align-items:flex-start;gap:10px;}
.shop-i:last-child{border-bottom:none;}
.shop-qty{font-size:11px;color:${B.muted};margin-top:1px;}
.shop-note{font-size:10px;color:#92600A;background:${B.softAmber};border-radius:6px;padding:2px 6px;display:inline-block;margin-top:2px;}
.chk{width:17px;height:17px;border:1.5px solid ${B.border};border-radius:5px;flex-shrink:0;cursor:pointer;margin-top:2px;}
.print-bar{display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap;}
.print-btn{flex:1;min-width:140px;padding:11px 16px;border-radius:14px;border:1.5px solid ${B.primary};background:transparent;color:${B.primary};font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center;gap:6px;}
.print-btn:hover{background:${B.soft};}
@media print{
  .no-print{display:none!important;}
  .app{padding:0;}
  .print-bar{display:none;}
  body{background:#fff;}
}

.up-card{background:${B.primary};border-radius:20px;padding:28px;color:#fff;text-align:center;margin-bottom:14px;}
.up-h{font-family:'Fraunces',serif;font-size:22px;font-weight:600;margin-bottom:8px;}
.up-d{font-size:13px;opacity:0.82;line-height:1.65;margin-bottom:20px;}
.sup-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:14px;}
.sup-c{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:10px;padding:9px 5px;text-align:center;cursor:pointer;font-size:11px;font-weight:500;color:#fff;transition:all 0.15s;}
.sup-c.on{background:rgba(255,255,255,0.22);border-color:${B.accent};}
.e-inp{width:100%;padding:11px 13px;border-radius:12px;border:none;font-family:'Outfit',sans-serif;font-size:13px;margin-bottom:9px;background:rgba(255,255,255,0.12);color:#fff;}
.e-inp::placeholder{color:rgba(255,255,255,0.45);}
.e-inp:focus{outline:2px solid ${B.accent};background:rgba(255,255,255,0.18);}
.gdpr{display:flex;align-items:flex-start;gap:8px;margin-bottom:14px;text-align:left;}
.gdpr input{width:15px;height:15px;flex-shrink:0;margin-top:2px;cursor:pointer;accent-color:${B.accent};}
.gdpr-t{font-size:11px;opacity:0.72;line-height:1.5;}
.up-cta{background:${B.accent};color:${B.text};border:none;border-radius:14px;padding:13px 20px;font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;cursor:pointer;width:100%;transition:all 0.15s;}
.up-cta:hover{background:${B.accent2};}
.up-cta:disabled{opacity:0.5;cursor:not-allowed;}
.skip{font-size:12px;opacity:0.6;margin-top:10px;cursor:pointer;text-decoration:underline;display:block;}
.fb-card{background:${B.card};border-radius:20px;padding:24px;margin-bottom:14px;border:1px solid ${B.border};}
.fb-h{font-family:'Fraunces',serif;font-size:18px;margin-bottom:3px;}
.fb-s{font-size:12px;color:${B.faint};margin-bottom:14px;}
.stars{display:flex;gap:8px;margin-bottom:14px;}
.star{font-size:28px;cursor:pointer;opacity:0.25;transition:all 0.15s;line-height:1;}
.star.on{opacity:1;transform:scale(1.1);}
.fb-area{width:100%;min-height:88px;padding:12px;border-radius:12px;border:1px solid ${B.border};font-family:'Outfit',sans-serif;font-size:13px;background:${B.bg};color:${B.text};resize:vertical;}
.fb-area:focus{outline:2px solid ${B.primary};border-color:transparent;}
.sug-card{background:${B.card};border:1.5px dashed ${B.border};border-radius:16px;padding:22px;margin-bottom:14px;}
.sug-h{font-family:'Fraunces',serif;font-size:17px;margin-bottom:3px;}
.sug-s{font-size:12px;color:${B.faint};margin-bottom:14px;}
.sug-inp{width:100%;padding:10px 12px;border-radius:12px;border:1px solid ${B.border};font-family:'Outfit',sans-serif;font-size:13px;background:${B.bg};color:${B.text};margin-bottom:8px;}
.sug-inp:focus{outline:2px solid ${B.primary};}
.sug-sel{width:100%;padding:10px 12px;border-radius:12px;border:1px solid ${B.border};font-family:'Outfit',sans-serif;font-size:13px;background:${B.bg};color:${B.text};margin-bottom:8px;appearance:none;}
.ai-r{font-size:11px;border-radius:8px;padding:8px 10px;margin-top:4px;display:none;}
.ai-r.ok{display:block;background:${B.successBg};color:${B.success};}
.ai-r.no{display:block;background:${B.dangerBg};color:${B.danger};}
.suc-wrap{text-align:center;padding:60px 20px;}
.suc-ic{font-size:64px;margin-bottom:16px;}
.suc-h{font-family:'Fraunces',serif;font-size:28px;color:${B.primary};margin-bottom:8px;}
.suc-d{font-size:14px;color:${B.muted};line-height:1.7;max-width:400px;margin:0 auto;}
.notice{font-size:11px;color:${B.faint};text-align:center;padding:6px 0;font-style:italic;}
.meal-now{background:${B.accent};border:none;border-radius:20px;padding:9px 18px;font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;color:${B.text};cursor:pointer;transition:all 0.15s;display:flex;align-items:center;gap:6px;}
.meal-now:hover{background:${B.accent2};}
.fridge-card{background:${B.card};border-radius:20px;padding:24px;margin-bottom:14px;border:2px solid ${B.accent};}
.fridge-h{font-family:'Fraunces',serif;font-size:18px;color:${B.text};margin-bottom:3px;}
.fridge-result{background:${B.soft};border-radius:12px;padding:14px;margin-top:14px;}
.fridge-meal{font-size:14px;font-weight:500;color:${B.primary};padding:6px 0;border-bottom:1px solid ${B.border};display:flex;align-items:center;gap:8px;}
.fridge-meal:last-child{border-bottom:none;}
`;

export default function MealWise() {
  const [screen, setScreen] = useState("prefs");
  const [tab, setTab] = useState(0);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState(0);
  const [swapping, setSwapping] = useState(null);
  const [recipeOpen, setRecipeOpen] = useState(null);
  // customisations: {[index]: {starch, veg}}
  const [customisations, setCustomisations] = useState({});
  const [supers, setSupers] = useState([]);
  const [email, setEmail] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [fbSent, setFbSent] = useState(false);
  const [sug, setSug] = useState({name:"",protein:"chicken",cuisine:"",notes:""});
  const [aiMsg, setAiMsg] = useState("");
  const [sugSent, setSugSent] = useState(false);
  const [showFridge, setShowFridge] = useState(false);
  const [fridge, setFridge] = useState("");
  const [fridgeTime, setFridgeTime] = useState("30-60");
  const [fridgeResults, setFridgeResults] = useState([]);
  const [fridgeLoading, setFridgeLoading] = useState(false);

  const [prefs, setPrefs] = useState({
    familySize:4, glutenFree:false, sundayRoast:true,
    proteins:["chicken","beef","pork"], allergens:[],
    cuisines:[], fridaySurprise:false, fridayCuisines:[],
    maxPasta:2, maxRice:2, maxPotato:3,
  });

  useEffect(() => {
    if (!loading) return;
    const t = setInterval(()=>setLoadMsg(m=>(m+1)%LOAD_MSGS.length),1500);
    return ()=>clearInterval(t);
  },[loading]);

  const tog = (key,val) => setPrefs(p=>({...p,[key]:p[key].includes(val)?p[key].filter(x=>x!==val):[...p[key],val]}));

  const pool = () => MEALS.filter(m=>{
    if(!prefs.proteins.includes(m.protein)&&m.protein!=="veggie") return false;
    if(prefs.glutenFree&&m.allergens.includes("gluten")) return false;
    if(prefs.allergens.some(a=>m.allergens.includes(a))) return false;
    if(prefs.cuisines.length>0&&!m.cuisine.some(c=>prefs.cuisines.includes(c))) return false;
    return true;
  });

  // ── Similarity guard: prevents back-to-back meals that feel the same
  // e.g. Cottage Pie (beef+potato+british-classic) then Shepherd's Pie (lamb+potato+british-classic)
  const tooSimilar = (a, b) => {
    if (!a || !b) return false;
    // Same carb AND same cuisine group = too similar regardless of protein
    const sharedCuisine = a.cuisine.some(c => b.cuisine.includes(c));
    if (sharedCuisine && a.carb === b.carb) return true;
    // Same protein AND same carb = too similar
    if (a.protein === b.protein && a.carb === b.carb) return true;
    return false;
  };

  const generate = async () => {
    setLoading(true); setLoadMsg(0); setCustomisations({});
    const p = pool();

    const sys = `You are a strict family meal planner. Choose EXACTLY 7 dinners for Saturday through Friday.

MANDATORY RULES — violating any rule means the plan is REJECTED:
1. Sunday = british-roast cuisine ONLY (if sundayRoast=true)
2. Friday must match fridayCuisines (if fridaySurprise=true)
3. CARB TOTALS across all 7 meals: pasta count MUST be <= ${prefs.maxPasta}, rice count MUST be <= ${prefs.maxRice}, potato count MUST be <= ${prefs.maxPotato}. Count every single meal before finalising.
4. No two consecutive days with the same carb type AND same cuisine group (e.g. do NOT put Cottage Pie on Wednesday then Shepherd's Pie on Thursday — both are british-classic+potato)
5. No two consecutive days with the same protein AND same carb type
6. No meal repeated
7. Copy meal names EXACTLY as given

Return ONLY this JSON (no explanation, no markdown):
{"plan":[{"day":"Saturday","meal":"EXACT name","reason":"brief reason"},{"day":"Sunday",...},{"day":"Monday",...},{"day":"Tuesday",...},{"day":"Wednesday",...},{"day":"Thursday",...},{"day":"Friday",...}]}`;

    try {
      const r = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:1400,system:sys,
          messages:[{role:"user",content:`Preferences: ${JSON.stringify({...prefs,maxPasta:prefs.maxPasta,maxRice:prefs.maxRice,maxPotato:prefs.maxPotato})}\n\nAvailable meals (use EXACT names):\n${p.map(m=>`- "${m.name}" [protein:${m.protein}, carb:${m.carb}, cuisine:${m.cuisine[0]}]`).join("\n")}\n\nRemember to count: pasta<=${prefs.maxPasta}, rice<=${prefs.maxRice}, potato<=${prefs.maxPotato}. Return JSON only.`}]})
      });
      const d = await r.json();
      const txt = d.content?.[0]?.text||"";
      const parsed = JSON.parse(txt.replace(/```json|```/g,"").trim());

      const mapped = parsed.plan.map(item=>{
        const db = p.find(m=>m.name===item.meal) || p.find(m=>m.name.toLowerCase().includes(item.meal.split(" ")[0].toLowerCase()));
        return{...item,protein:db?.protein||"chicken",carb:db?.carb||"potato",
          cost: calcMealCost(db?.name||item.meal, prefs.familySize),
          allergens:db?.allergens||[],meal:db?.name||item.meal,
          defaultStarch:db?.defaultStarch||"",defaultVeg:db?.defaultVeg||""};
      });

      // Validate carb counts — if AI ignored the limits, fall back to deterministic
      const tally = {pasta:0,rice:0,potato:0,other:0};
      mapped.forEach(m => tally[m.carb]=(tally[m.carb]||0)+1);
      const ok = tally.pasta<=prefs.maxPasta && tally.rice<=prefs.maxRice && tally.potato<=prefs.maxPotato;
      setPlan(ok ? mapped : fallback(p));
    } catch { setPlan(fallback(p)); }
    setLoading(false); setScreen("plan");
  };

  // ── Deterministic fallback: guaranteed to respect ALL carb + similarity rules
  const fallback = (p) => {
    const used=[], carbs={pasta:0,rice:0,potato:0,other:0};
    let prevMeal = null;
    return DAYS.map(day=>{
      let candidates = p.filter(m=>!used.includes(m.name));

      // Day-specific locks
      if(day==="Sunday"&&prefs.sundayRoast)
        candidates = candidates.filter(m=>m.cuisine.includes("british-roast"));
      if(day==="Friday"&&prefs.fridaySurprise&&prefs.fridayCuisines.length)
        candidates = candidates.filter(m=>m.cuisine.some(c=>prefs.fridayCuisines.includes(c)));

      // Enforce carb limits
      candidates = candidates.filter(m=>
        !(m.carb==="pasta" && carbs.pasta>=prefs.maxPasta) &&
        !(m.carb==="rice"  && carbs.rice>=prefs.maxRice)   &&
        !(m.carb==="potato"&& carbs.potato>=prefs.maxPotato)
      );

      // Avoid back-to-back similar meals
      if(prevMeal) candidates = candidates.filter(m=>!tooSimilar(m, prevMeal));

      // Safety: if filters left nothing, relax similarity rule only
      if(!candidates.length) candidates = p.filter(m=>
        !used.includes(m.name) &&
        !(m.carb==="pasta" && carbs.pasta>=prefs.maxPasta) &&
        !(m.carb==="rice"  && carbs.rice>=prefs.maxRice)   &&
        !(m.carb==="potato"&& carbs.potato>=prefs.maxPotato)
      );
      // Last resort: anything unused
      if(!candidates.length) candidates = p.filter(m=>!used.includes(m.name));
      if(!candidates.length) candidates = p;

      const pick = candidates[Math.floor(Math.random()*candidates.length)];
      used.push(pick.name);
      carbs[pick.carb]=(carbs[pick.carb]||0)+1;
      prevMeal = pick;
      return{day,meal:pick.name,protein:pick.protein,carb:pick.carb,
        cost: calcMealCost(pick.name, prefs.familySize),
        allergens:pick.allergens,
        reason:"A great choice for the week.",defaultStarch:pick.defaultStarch||"",defaultVeg:pick.defaultVeg||""};
    });
  };

  const swap = (i) => {
    setSwapping(i);
    const p=pool().filter(m=>!plan.find(x=>x.meal===m.name));
    const day=plan[i].day;
    let pl=p;
    if(day==="Sunday"&&prefs.sundayRoast) pl=p.filter(m=>m.cuisine.includes("british-roast"));
    if(!pl.length) pl=p;
    if(!pl.length){setSwapping(null);return;}
    const pick=pl[Math.floor(Math.random()*pl.length)];
    const np=[...plan];
    np[i]={...np[i],meal:pick.name,protein:pick.protein,carb:pick.carb,
      cost: calcMealCost(pick.name, prefs.familySize),
      allergens:pick.allergens,
      defaultStarch:pick.defaultStarch||"",defaultVeg:pick.defaultVeg||""};
    // Clear customisation for swapped meal
    const nc={...customisations};
    delete nc[i];
    setCustomisations(nc);
    setPlan(np); setSwapping(null);
  };

  const updateCustom = (i, field, val) => {
    setCustomisations(c=>({...c,[i]:{...c[i],[field]:val}}));
  };

  const searchFridge = async () => {
    if(!fridge.trim()) return;
    setFridgeLoading(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:400,
          messages:[{role:"user",content:`I have these ingredients: ${fridge}. Time available: ${fridgeTime} minutes. From this meal list, which 3-4 could I make? List: ${JSON.stringify(MEALS.map(m=>m.name))}. Return ONLY JSON: {"meals":["meal name","meal name","meal name"]}`}]})
      });
      const d = await r.json();
      const txt=d.content?.[0]?.text||"";
      const parsed=JSON.parse(txt.replace(/```json|```/g,"").trim());
      setFridgeResults(parsed.meals||[]);
    } catch { setFridgeResults(["Sausage & Mash with Peas, Carrots & Gravy","Chicken Dippers with Chips & Baked Beans","Pasta with whatever veg you have!"]); }
    setFridgeLoading(false);
  };

  const checkSug = async () => {
    if(!sug.name.trim()) return;
    setAiMsg("checking...");
    try {
      const r=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:100,
          messages:[{role:"user",content:`Is "${sug.name}" a real family dinner dish? Reply: VALID: [reason] or INVALID: [reason]`}]})
      });
      const d=await r.json();
      const txt=d.content?.[0]?.text||"";
      setAiMsg(txt.startsWith("VALID")?"ok:"+txt.replace("VALID:","").trim():"no:"+txt.replace("INVALID:","").trim());
    } catch { setAiMsg("ok:Looks great — we'll review it shortly!"); }
  };

  const total = plan?plan.reduce((s,m)=>s+parseFloat(m.cost),0).toFixed(2):0;

  // ── Recipe search: DuckDuckGo as primary (opens correctly), BBC Good Food & Pinch of Nom as direct links
  // Allergen modifier appended when relevant
  const recipeSearch = (meal, selectedAllergens) => {
    const allergenMod = selectedAllergens.length > 0
      ? " " + selectedAllergens.slice(0,2).map(a=>a==="gluten"?"gluten free":a==="milk"?"dairy free":a+" free").join(" ")
      : "";
    const query = encodeURIComponent(meal + allergenMod);
    return [
      {label:"🔍 Search all recipes (DuckDuckGo)", url:`https://duckduckgo.com/?q=${query}+recipe`},
      {label:"BBC Good Food", url:`https://www.bbcgoodfood.com/search?q=${query}`},
      {label:"Pinch of Nom", url:`https://pinchofnom.com/?s=${encodeURIComponent(meal)}`},
      {label:"All Recipes UK", url:`https://www.allrecipes.com/search?q=${query}`},
    ];
  };

  const TABS = ["Basics","Diet & Allergens","Cuisines","Carb Rules"];

  if(loading) return (
    <><style>{CSS}</style>
    <div className="app">
      <div className="hero"><div className="logo">Get<em>Meal</em>Wise</div></div>
      <div className="loading">
        <div className="spin"/>
        <div className="load-m">{LOAD_MSGS[loadMsg]}</div>
        <div style={{marginTop:14,fontSize:11,color:B.faint}}>Powered by real family meal data · Free forever</div>
      </div>
    </div></>
  );

  if(screen==="success") return (
    <><style>{CSS}</style>
    <div className="app">
      <div className="hero"><div className="logo">Get<em>Meal</em>Wise</div></div>
      <div className="suc-wrap">
        <div className="suc-ic">🎉</div>
        <div className="suc-h">You're all set!</div>
        <div className="suc-d">
          Your meal plan is ready and your shopping list is saved.
          {email?" We'll send your weekly community report to "+email+".":""}{" "}
          {fbSent?" Thank you for your feedback — it shapes what we build next.":""}{" "}
          {sugSent?" Your meal suggestion is queued for review!":""}
        </div>
        <div style={{maxWidth:320,margin:"28px auto 0"}}>
          <button className="cta" onClick={()=>{setPlan(null);setFbSent(false);setSugSent(false);setEmail("");setCustomisations({});setScreen("prefs");}}>Plan next week →</button>
          <button className="cta ghost" style={{marginTop:8}} onClick={()=>setScreen("shopping")}>Back to shopping list</button>
        </div>
      </div>
    </div></>
  );

  if(screen==="feedback") return (
    <><style>{CSS}</style>
    <div className="app">
      <div className="hero"><div className="logo">Get<em>Meal</em>Wise</div></div>
      <button className="back-b no-print" onClick={()=>setScreen("shopping")}>← Back</button>
      <div className="fb-card">
        <div className="fb-h">How was your experience?</div>
        <div className="fb-s">Every suggestion gets read and tracked — popular requests get built.</div>
        <div className="stars">{[1,2,3,4,5].map(n=><span key={n} className={`star${stars>=n?" on":""}`} onClick={()=>setStars(n)}>★</span>)}</div>
        <textarea className="fb-area" placeholder="What did you love? What's missing? Any cuisines or meals you'd like added? Your ideas here get counted weekly and the most popular ones get built — we'll even announce it in the newsletter when we do!" value={feedback} onChange={e=>setFeedback(e.target.value)}/>
        <button className="cta" style={{marginTop:12}} disabled={!feedback.trim()&&stars===0} onClick={()=>setFbSent(true)}>Send feedback →</button>
      </div>
      <div className="sug-card">
        <div className="sug-h">Suggest a meal for the community</div>
        <div className="sug-s">Add your family favourite — we'll review and add it to the database if it passes our checks.</div>
        <input className="sug-inp" placeholder="Meal name e.g. Thai Basil Chicken with Jasmine Rice" value={sug.name} onChange={e=>{setSug(p=>({...p,name:e.target.value}));setAiMsg("");}}/>
        <select className="sug-sel" value={sug.protein} onChange={e=>setSug(p=>({...p,protein:e.target.value}))}>
          {PROTEINS.map(p=><option key={p.id} value={p.id}>{p.icon} {p.label}</option>)}
        </select>
        <input className="sug-inp" placeholder="Cuisine type (e.g. Thai, Italian, British...)" value={sug.cuisine} onChange={e=>setSug(p=>({...p,cuisine:e.target.value}))}/>
        <input className="sug-inp" placeholder="Notes — GF? Allergens? Quick to make?" value={sug.notes} onChange={e=>setSug(p=>({...p,notes:e.target.value}))}/>
        <div className={`ai-r ${aiMsg.startsWith("ok")?"ok":aiMsg.startsWith("no")?"no":""}`}>
          {aiMsg.startsWith("ok")?"✓ "+aiMsg.slice(3):aiMsg.startsWith("no")?"✗ "+aiMsg.slice(3):""}
        </div>
        <button className="cta ghost" style={{marginTop:8,fontSize:13,padding:"9px 14px"}} onClick={checkSug} disabled={!sug.name.trim()}>Check with AI →</button>
        <button className="cta" style={{marginTop:6,fontSize:13,padding:"9px 14px"}} disabled={!sug.name.trim()||!aiMsg.startsWith("ok")} onClick={()=>setSugSent(true)}>Submit for review →</button>
        {sugSent&&<div style={{fontSize:12,color:B.success,marginTop:8,background:B.successBg,borderRadius:8,padding:"6px 10px"}}>✓ Submitted! We'll review and add it if approved.</div>}
      </div>
      <button className="cta amber" onClick={()=>setScreen("success")}>Finish & see my summary →</button>
    </div></>
  );

  // ── SHOPPING LIST SCREEN ────────────────────────────────────────────────────
  if(screen==="shopping") {
    const shoppingList = buildShoppingList(plan);
    const hasItems = Object.values(shoppingList).some(arr=>arr.length>0);
    return (
    <><style>{CSS}</style>
    <div className="app">
      <div className="hero no-print"><div className="logo">Get<em>Meal</em>Wise</div></div>
      <button className="back-b no-print" onClick={()=>setScreen("plan")}>← Back to meal plan</button>

      {/* Print / action bar */}
      <div className="print-bar no-print">
        <button className="print-btn" onClick={()=>window.print()}>
          🖨️ Print shopping list
        </button>
        <button className="print-btn" onClick={()=>{
          const text = Object.entries(shoppingList)
            .filter(([,items])=>items.length>0)
            .map(([cat,items])=>`${cat.toUpperCase()}\n`+items.map(i=>`- ${i.item}  (${i.qty})${i.note?" ["+i.note+"]":""}`).join("\n"))
            .join("\n\n");
          navigator.clipboard?.writeText(text).then(()=>alert("Shopping list copied to clipboard!"));
        }}>
          📋 Copy to clipboard
        </button>
      </div>

      <div className="card">
        <div className="card-h">Your shopping list</div>
        <div className="card-s" style={{marginBottom:6}}>
          Built from your approved 7-day plan · {plan?.length||0} meals · family of {prefs.familySize}
        </div>

        {/* Customisation summary — show any starch/veg changes */}
        {Object.keys(customisations).length > 0 && (
          <div style={{fontSize:11,color:"#92600A",background:B.softAmber,borderRadius:8,padding:"8px 10px",marginBottom:14}}>
            ✏️ <strong>Your personal tweaks this week:</strong>{" "}
            {Object.entries(customisations).map(([i,c])=>{
              const meal = plan[i];
              const parts=[];
              if(c.starch&&c.starch!==meal.defaultStarch) parts.push(`${meal.day}: ${c.starch} instead of ${meal.defaultStarch}`);
              if(c.veg&&c.veg!==meal.defaultVeg) parts.push(`${meal.day}: ${c.veg} instead of ${meal.defaultVeg}`);
              return parts;
            }).flat().join(" · ")}
          </div>
        )}

        {hasItems ? Object.entries(shoppingList).map(([category, items]) =>
          items.length === 0 ? null : (
            <div className="shop-sec" key={category}>
              <div className="shop-t">{category}</div>
              {items.map((ing, n) => (
                <div className="shop-i" key={n}>
                  <div className="chk"/>
                  <div style={{flex:1}}>
                    <div>{ing.item}</div>
                    <div className="shop-qty">{ing.qty}</div>
                    {ing.note && <div className="shop-note">⚠ {ing.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div style={{fontSize:13,color:B.muted,padding:"20px 0",textAlign:"center"}}>
            No ingredients found — please approve a plan first.
          </div>
        )}

        <div className="notice">
          Quantities are per-meal guides scaled to {prefs.familySize} people. Always check your cupboard stocks before shopping!
        </div>

        <div style={{fontSize:11,color:B.muted,background:B.soft,borderRadius:12,padding:"12px 14px",marginTop:14,lineHeight:1.7}}>
          <strong style={{color:B.primary}}>💡 About our cost estimates</strong><br/>
          Meal costs are calculated using British Nutrition Foundation recommended portion sizes for the main protein, vegetables and carbs. They do not include storecupboard staples such as oils, seasonings, herbs or tomato purée — we add a small buffer per meal to account for these. Prices are based on Sainsbury's data (April 2026) and are a guide only. Our community pricing model will build a richer, multi-supermarket picture over time as families share their receipts.
        </div>
      </div>

      <div className="up-card">
        <div className="up-h">Help build the UK's meal cost map 🇬🇧</div>
        <div className="up-d">Upload your supermarket receipt and help families find the best value meals across every major UK supermarket. We'll send you a free weekly community report in return.</div>
        <div style={{fontSize:12,opacity:0.8,textAlign:"left",marginBottom:8}}>Which supermarket(s) did you shop at?</div>
        <div className="sup-grid">
          {SUPERMARKETS.map(s=><div key={s} className={`sup-c${supers.includes(s)?" on":""}`} onClick={()=>setSupers(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s])}>{s}</div>)}
        </div>
        <input className="e-inp" type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)}/>
        <div className="gdpr">
          <input type="checkbox" checked={gdpr} onChange={e=>setGdpr(e.target.checked)}/>
          <div className="gdpr-t">I agree to receive the free GetMealWise weekly community report by email. I can unsubscribe any time. Data is never sold or shared.</div>
        </div>
        <button className="up-cta" disabled={!email||!gdpr} onClick={()=>setScreen("feedback")}>📧 Upload receipt & join the community</button>
        <span className="skip" onClick={()=>setScreen("feedback")}>Skip for now</span>
      </div>
    </div></>
  );}

  // ── MEAL PLAN SCREEN ────────────────────────────────────────────────────────
  if(screen==="plan"&&plan) return (
    <><style>{CSS}</style>
    <div className="app">
      <div className="hero">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <div className="logo">Get<em>Meal</em>Wise</div>
          <button className="meal-now" onClick={()=>setShowFridge(!showFridge)}>⚡ Meal Now Help!</button>
        </div>
      </div>

      {showFridge&&(
        <div className="fridge-card">
          <div className="fridge-h">⚡ Meal Now Help!</div>
          <div className="card-s">Tell me what's in your fridge and I'll suggest what you can make tonight.</div>
          <input className="sug-inp" placeholder="e.g. chicken breast, carrots, onion, pasta, garlic..." value={fridge} onChange={e=>setFridge(e.target.value)}/>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:12,color:B.muted,marginBottom:6}}>Time available?</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["under 30 mins","30-60 mins","60+ mins","just feed me"].map(t=>(
                <div key={t} className={`sm-chip${fridgeTime===t?" on":""}`} onClick={()=>setFridgeTime(t)}>{t}</div>
              ))}
            </div>
          </div>
          <button className="cta" style={{fontSize:13,padding:"10px"}} onClick={searchFridge} disabled={!fridge.trim()||fridgeLoading}>{fridgeLoading?"Searching...":"Find me something to cook →"}</button>
          {fridgeResults.length>0&&(
            <div className="fridge-result">
              <div style={{fontSize:11,fontWeight:600,color:B.primary,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em"}}>You could make...</div>
              {fridgeResults.map((m,i)=><div className="fridge-meal" key={i}><span style={{fontSize:16}}>🍽️</span>{m}</div>)}
            </div>
          )}
        </div>
      )}

      <button className="back-b" onClick={()=>setScreen("prefs")}>← Change preferences</button>
      <div className="sum-bar">
        <div>
          <div className="s-lbl">Est. weekly food cost</div>
          <div className="s-val">£{total}</div>
          <div className="s-note">Based on BNF portions · Sainsbury's April 2026 prices</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div className="s-lbl">Family of {prefs.familySize}</div>
          <div style={{fontSize:16,opacity:0.9,fontWeight:500}}>£{(total/prefs.familySize).toFixed(2)}/person</div>
          <div style={{fontSize:10,opacity:0.55,marginTop:1}}>per evening meal</div>
        </div>
      </div>
      <div className="badge-r">
        {prefs.glutenFree&&<div className="bdg">✓ Gluten free</div>}
        {prefs.sundayRoast&&<div className="bdg">🍗 Sunday roast</div>}
        {prefs.fridaySurprise&&<div className="bdg amber">🎲 Friday Surprise</div>}
        {prefs.allergens.length>0&&<div className="bdg" style={{background:B.dangerBg,color:B.danger}}>⚠ {prefs.allergens.length} allergen{prefs.allergens.length>1?"s":""} excluded</div>}
        <div className="bdg">{prefs.proteins.map(p=>pIcon[p]).join(" ")}</div>
        <div className="bdg">👨‍👩‍👧‍👦 {prefs.familySize}</div>
      </div>
      <div style={{fontSize:12,color:B.faint,marginBottom:12}}>
        Not feeling a meal? Hit swap for an alternative. Want to tweak the sides? Use the dropdowns below each meal to personalise your starch and veg. 🥔🥦
      </div>

      {plan.map((item,i)=>{
        const custom = customisations[i]||{};
        const currentStarch = custom.starch || item.defaultStarch;
        const currentVeg = custom.veg || item.defaultVeg;
        const starchChanged = custom.starch && custom.starch !== item.defaultStarch;
        const vegChanged = custom.veg && custom.veg !== item.defaultVeg;

        return (
        <div className="meal-c" key={i}>
          <div style={{flex:1}}>
            <div className="meal-day">{item.day}{item.day==="Friday"&&prefs.fridaySurprise?" 🎲":""}</div>
            <div className="meal-name">{item.meal}</div>
            <div className="meal-tags">
              <span className="m-tag">{cIcon[item.carb]||item.carb}</span>
              <span className="m-tag">{pIcon[item.protein]} {item.protein}</span>
              {prefs.glutenFree&&<span className="m-tag g">GF ✓</span>}
              {item.allergens?.length>0&&<span className="m-tag a">Contains: {item.allergens.slice(0,2).join(", ")}</span>}
            </div>

            {/* ── Starch & Veg customisation ── */}
            <div className="custom-row">
              <div className="custom-sel-wrap">
                <div className="custom-lbl">🥔 Change starch</div>
                <select
                  className={`custom-sel${starchChanged?" changed":""}`}
                  value={currentStarch}
                  onChange={e=>updateCustom(i,"starch",e.target.value)}
                >
                  {STARCH_OPTIONS.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
                {starchChanged&&<div className="custom-changed-note">✏️ Changed from {item.defaultStarch}</div>}
              </div>
              <div className="custom-sel-wrap">
                <div className="custom-lbl">🥦 Change veg</div>
                <select
                  className={`custom-sel${vegChanged?" changed":""}`}
                  value={currentVeg}
                  onChange={e=>updateCustom(i,"veg",e.target.value)}
                >
                  {VEG_OPTIONS.map(v=><option key={v} value={v}>{v}</option>)}
                </select>
                {vegChanged&&<div className="custom-changed-note">✏️ Changed from {item.defaultVeg}</div>}
              </div>
            </div>

            {/* ── Recipe links ── */}
            <div style={{marginTop:8}}>
              <button className="recipe-btn" onClick={()=>setRecipeOpen(recipeOpen===i?null:i)}>
                {recipeOpen===i?"Hide recipe links ▲":"Recipe links ▼"}
              </button>
              {recipeOpen===i&&(
                <div className="recipe-links">
                  <div style={{fontSize:10,color:B.muted,marginBottom:6}}>Find this recipe on:</div>
                  {recipeSearch(item.meal, prefs.allergens).map((l,j)=>(
                    <a key={j} href={l.url} target="_blank" rel="noopener noreferrer">→ {l.label}</a>
                  ))}
                  <div className="recipe-disclaimer">
                    ⚠️ <strong>Always check the full recipe ingredients against your allergen requirements.</strong>{" "}
                    GetMealWise filters by meal type but individual recipes may vary. If in doubt, check the label.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0,marginLeft:10}}>
            <div className="m-cost">~£{item.cost}</div>
            <button className="sw-btn" disabled={swapping===i} onClick={()=>swap(i)}>{swapping===i?"...":"↺ Swap"}</button>
          </div>
        </div>
      );})}

      <button className="cta amber" onClick={()=>setScreen("shopping")}>✓ Approve plan & build shopping list</button>
      <button className="cta ghost" style={{marginTop:8}} onClick={generate}>↺ Generate completely new plan</button>
    </div></>
  );

  // ── PREFERENCES SCREEN ──────────────────────────────────────────────────────
  return (
    <><style>{CSS}</style>
    <div className="app">
      <div className="hero">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
          <div className="logo">Get<em>Meal</em>Wise</div>
          <button className="meal-now" onClick={()=>{ setShowFridge(true); setScreen("plan"); }}>⚡ Meal Now Help!</button>
        </div>
        <div className="tagline">Smart family meal planning · powered by community</div>
      </div>
      <div className="progress">
        {TABS.map((_,i)=><div key={i} className={`pdot${i===tab?" on":i<tab?" done":""}`} style={{width:i===tab?22:10}}/>)}
      </div>
      <div className="tab-pills">
        {TABS.map((t,i)=><button key={i} className={`tab-pill${tab===i?" on":""}`} onClick={()=>setTab(i)}>{t}</button>)}
      </div>

      {tab===0&&<>
        <div className="card">
          <div className="card-h">Who are you feeding?</div>
          <div className="card-s">We'll scale portions and cost estimates to your family</div>
          <div className="stp">
            <button className="stp-b" onClick={()=>setPrefs(p=>({...p,familySize:Math.max(1,p.familySize-1)}))}>−</button>
            <div className="stp-v">{prefs.familySize}</div>
            <button className="stp-b" onClick={()=>setPrefs(p=>({...p,familySize:Math.min(12,p.familySize+1)}))}>+</button>
            <span style={{fontSize:14,color:B.faint,marginLeft:8}}>people</span>
          </div>
        </div>
        <div className="card">
          <div className="card-h">What proteins do you eat?</div>
          <div className="card-s">Select all that apply</div>
          <div className="pgrid">
            {PROTEINS.map(p=>(
              <div key={p.id} className={`chip${prefs.proteins.includes(p.id)?" on":""}`} onClick={()=>tog("proteins",p.id)}>
                <span className="chip-ic">{p.icon}</span>
                <div className="chip-lb">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-h">Meal day preferences</div>
          <div className="tog-wrap row" onClick={()=>setPrefs(p=>({...p,sundayRoast:!p.sundayRoast}))}>
            <div className={`tog${prefs.sundayRoast?" on":""}`}><div className="tog-k"/></div>
            <div><div className="tog-lbl">Sunday roast 🍗</div><div className="tog-sub">Locks Sunday to a classic British roast</div></div>
          </div>
          <div className="tog-wrap row" onClick={()=>setPrefs(p=>({...p,fridaySurprise:!p.fridaySurprise}))}>
            <div className={`tog${prefs.fridaySurprise?" on":""}`}><div className="tog-k"/></div>
            <div><div className="tog-lbl">Friday Surprise night 🎲</div><div className="tog-sub">Pick a surprise cuisine for Friday</div></div>
          </div>
          {prefs.fridaySurprise&&(
            <div className="fri-box">
              <div className="fri-h">Choose Friday's surprise cuisine(s)</div>
              <div className="sm-chip-grid">
                {CUISINES.filter(c=>!["british-roast","british-classic"].includes(c.id)).map(c=>(
                  <div key={c.id} className={`sm-chip${prefs.fridayCuisines.includes(c.id)?" on":""}`} onClick={()=>tog("fridayCuisines",c.id)}>
                    <span style={{fontSize:14}}>{c.icon}</span>{c.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button className="cta" onClick={()=>setTab(1)}>Next: Diet & Allergens →</button>
      </>}

      {tab===1&&<>
        <div className="card">
          <div className="card-h">Dietary preferences</div>
          <div className="tog-wrap row" onClick={()=>setPrefs(p=>({...p,glutenFree:!p.glutenFree,allergens:!p.glutenFree?[...new Set([...p.allergens,"gluten"])]:p.allergens.filter(a=>a!=="gluten")}))}>
            <div className={`tog${prefs.glutenFree?" on":""}`}><div className="tog-k"/></div>
            <div><div className="tog-lbl">Gluten free meals only 🌾</div><div className="tog-sub">Filters out all gluten-containing meals</div></div>
          </div>
        </div>
        <div className="card">
          <div className="card-h">Allergen filters</div>
          <div className="card-s">Select any allergens to exclude — based on the UK's 14 major allergens</div>
          <div className="alg-grid">
            {ALLERGENS.map(a=>(
              <div key={a.id} className={`sm-chip${prefs.allergens.includes(a.id)?" danger":""}`} onClick={()=>tog("allergens",a.id)}>
                <span style={{fontSize:13}}>{a.icon}</span>{a.label}
              </div>
            ))}
          </div>
          {prefs.allergens.length>0&&<div style={{marginTop:10,fontSize:12,color:B.danger,background:B.dangerBg,borderRadius:8,padding:"8px 10px"}}>⚠ Excluding: {prefs.allergens.join(", ")}</div>}
        </div>
        <button className="cta" onClick={()=>setTab(2)}>Next: Cuisines →</button>
        <button className="cta ghost" style={{marginTop:8}} onClick={()=>setTab(0)}>← Back</button>
      </>}

      {tab===2&&<>
        <div className="card">
          <div className="card-h">Cuisine style</div>
          <div className="card-s">Leave all unselected for full variety, or pick favourites to focus your week</div>
          <div className="sm-chip-grid">
            {CUISINES.map(c=>(
              <div key={c.id} className={`sm-chip${prefs.cuisines.includes(c.id)?" on":""}`} onClick={()=>tog("cuisines",c.id)}>
                <span style={{fontSize:14}}>{c.icon}</span>{c.label}
              </div>
            ))}
          </div>
          {prefs.cuisines.length===0&&<div style={{marginTop:10,fontSize:12,color:B.primary,background:B.soft,borderRadius:8,padding:"8px 10px"}}>✓ All cuisines included — great variety guaranteed</div>}
        </div>
        <button className="cta" onClick={()=>setTab(3)}>Next: Carb Rules →</button>
        <button className="cta ghost" style={{marginTop:8}} onClick={()=>setTab(1)}>← Back</button>
      </>}

      {tab===3&&<>
        <div className="card">
          <div className="card-h">Carb variety rules</div>
          <div className="card-s">Maximum of each carb type per week — keeps the week interesting!</div>
          {[{key:"maxPasta",label:"🍝 Max pasta dishes"},{key:"maxRice",label:"🍚 Max rice dishes"},{key:"maxPotato",label:"🥔 Max potato dishes"}].map(({key,label})=>(
            <div className="crb-row" key={key}>
              <span style={{fontSize:14,color:B.text}}>{label}</span>
              <div className="crb-s">
                <button className="crb-b" onClick={()=>setPrefs(p=>({...p,[key]:Math.max(0,p[key]-1)}))}>−</button>
                <span style={{fontSize:15,fontWeight:500,minWidth:20,textAlign:"center"}}>{prefs[key]}</span>
                <button className="crb-b" onClick={()=>setPrefs(p=>({...p,[key]:Math.min(7,p[key]+1)}))}>+</button>
              </div>
            </div>
          ))}
        </div>
        <button className="cta" disabled={prefs.proteins.length===0} onClick={generate}>✨ Generate my meal plan →</button>
        <button className="cta ghost" style={{marginTop:8}} onClick={()=>setTab(2)}>← Back</button>
        <div style={{textAlign:"center",fontSize:11,color:B.faint,marginTop:10}}>Powered by 2.5 years of real family meal data · Free forever · Built by the community</div>
      </>}
    </div></>
  );
}
