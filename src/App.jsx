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

// ─── MEAL DATABASE ────────────────────────────────────────────────────────────
const MEALS = [
  { name:"Roast Chicken with Roast Potatoes, Yorkshire & Gravy", protein:"chicken", carb:"potato", cuisine:["british-roast"], gf:true, allergens:["celery"], cost:9.50 },
  { name:"Roast Pork with Apple Sauce, Roast Potatoes & Veg", protein:"pork", carb:"potato", cuisine:["british-roast"], gf:true, allergens:["celery"], cost:9.50 },
  { name:"Roast Lamb with Roast Potatoes, Cabbage & Peas", protein:"lamb", carb:"potato", cuisine:["british-roast"], gf:true, allergens:["celery"], cost:12.00 },
  { name:"Chicken & Vegetable Curry with Basmati Rice", protein:"chicken", carb:"rice", cuisine:["curry","indian"], gf:true, allergens:[], cost:8.00 },
  { name:"Butter Chicken Curry with Basmati Rice", protein:"chicken", carb:"rice", cuisine:["curry","indian"], gf:true, allergens:["milk"], cost:9.00 },
  { name:"Chicken Tikka Masala with Pilau Rice", protein:"chicken", carb:"rice", cuisine:["curry","indian"], gf:true, allergens:["milk"], cost:9.50 },
  { name:"Beef Curry with Basmati Rice", protein:"beef", carb:"rice", cuisine:["curry","indian"], gf:true, allergens:[], cost:10.00 },
  { name:"Lamb Curry with Basmati Rice", protein:"lamb", carb:"rice", cuisine:["curry","indian"], gf:false, allergens:["gluten","milk"], cost:11.00 },
  { name:"Vegetable Curry with Basmati Rice", protein:"veggie", carb:"rice", cuisine:["curry","indian"], gf:false, allergens:["gluten"], cost:6.50 },
  { name:"Chicken Teriyaki Stir Fry with Basmati Rice", protein:"chicken", carb:"rice", cuisine:["asian","japanese"], gf:true, allergens:["soya","sesame"], cost:8.50 },
  { name:"Beef Teriyaki Stir Fry with Egg Fried Rice", protein:"beef", carb:"rice", cuisine:["asian","japanese"], gf:true, allergens:["soya","eggs","sesame"], cost:10.00 },
  { name:"Pork & Veg Stir Fry with Teriyaki & Rice", protein:"pork", carb:"rice", cuisine:["asian"], gf:true, allergens:["soya","sesame"], cost:8.00 },
  { name:"Sweet & Sour Chicken with Rice & Prawn Crackers", protein:"chicken", carb:"rice", cuisine:["asian","chinese"], gf:true, allergens:["crustaceans"], cost:8.00 },
  { name:"Sweet & Sour Pork with Rice & Prawn Crackers", protein:"pork", carb:"rice", cuisine:["asian","chinese"], gf:true, allergens:["crustaceans"], cost:8.00 },
  { name:"Prawn & Vegetable Stir Fry with Egg Fried Rice", protein:"fish", carb:"rice", cuisine:["asian","chinese"], gf:true, allergens:["crustaceans","eggs","soya"], cost:10.00 },
  { name:"Thai Green Chicken Curry with Jasmine Rice", protein:"chicken", carb:"rice", cuisine:["thai","asian"], gf:true, allergens:["nuts"], cost:9.00 },
  { name:"Nepalese Lentil Dal with Rice & Chapati", protein:"veggie", carb:"rice", cuisine:["nepalese","asian"], gf:false, allergens:["gluten"], cost:5.50 },
  { name:"Spaghetti Bolognese with Cheesy Garlic Bread", protein:"beef", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten","milk"], cost:8.50 },
  { name:"Chicken Pasta in Homemade Tomato & Basil Sauce", protein:"chicken", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten"], cost:7.50 },
  { name:"Creamy Chicken Tagliatelle with Garlic & Mushrooms", protein:"chicken", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten","milk"], cost:9.00 },
  { name:"Sausage Pasta with Vegetables & Tomato Sauce", protein:"pork", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten"], cost:7.00 },
  { name:"Meatballs & Penne in Tomato Sauce", protein:"beef", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten","eggs"], cost:8.50 },
  { name:"Lasagne with Cheesy Garlic Bread", protein:"beef", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten","milk","eggs"], cost:9.00 },
  { name:"Mushroom & Spinach Pasta in Creamy Sauce", protein:"veggie", carb:"pasta", cuisine:["italian"], gf:false, allergens:["gluten","milk"], cost:6.00 },
  { name:"Mac & Cheese with Prawns & Garlic Bread", protein:"fish", carb:"pasta", cuisine:["comfort"], gf:false, allergens:["gluten","milk","crustaceans"], cost:9.50 },
  { name:"Cottage Pie with Frozen Peas", protein:"beef", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["celery"], cost:8.00 },
  { name:"Shepherd's Pie with Green Beans & Gravy", protein:"lamb", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["celery"], cost:9.50 },
  { name:"Beef & Vegetable Hotpot with Sliced Potato", protein:"beef", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["celery"], cost:9.00 },
  { name:"Sausage & Mash with Peas, Carrots & Gravy", protein:"pork", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["celery"], cost:7.50 },
  { name:"Toad in the Hole with Mash & Green Beans", protein:"pork", carb:"potato", cuisine:["british-classic"], gf:false, allergens:["gluten","eggs","milk"], cost:7.50 },
  { name:"Gammon, Egg & Chips with Peas & Pineapple", protein:"pork", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["eggs"], cost:8.50 },
  { name:"Fish Pie with Mashed Potato & Peas", protein:"fish", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["fish","milk"], cost:10.50 },
  { name:"GF Fish & Chips with Peas or Baked Beans", protein:"fish", carb:"potato", cuisine:["british-classic"], gf:true, allergens:["fish"], cost:9.00 },
  { name:"Lemon Chicken, Potato & Vegetable Tray Bake", protein:"chicken", carb:"potato", cuisine:["mediterranean"], gf:true, allergens:[], cost:9.00 },
  { name:"Moussaka with Greek Salad", protein:"lamb", carb:"other", cuisine:["mediterranean","greek"], gf:true, allergens:["milk","eggs"], cost:10.50 },
  { name:"Chicken Bobotie with Basmati Rice", protein:"chicken", carb:"rice", cuisine:["african","world"], gf:true, allergens:["eggs","milk"], cost:8.50 },
  { name:"Beef Bobotie with Basmati Rice", protein:"beef", carb:"rice", cuisine:["african","world"], gf:true, allergens:["eggs","milk"], cost:9.00 },
  { name:"Chicken Potjie with Baby Potatoes & Butternut", protein:"chicken", carb:"potato", cuisine:["african","world"], gf:true, allergens:[], cost:9.00 },
  { name:"Chilli Con Carne with Rice & Nachos", protein:"beef", carb:"rice", cuisine:["tex-mex","american"], gf:true, allergens:[], cost:8.50 },
  { name:"Cheese & Bacon Burger with Waffle Fries", protein:"beef", carb:"potato", cuisine:["american","comfort"], gf:false, allergens:["gluten","milk","eggs"], cost:9.50 },
  { name:"Chicken Burger with Wedges, Lettuce & Tomato", protein:"chicken", carb:"potato", cuisine:["american","comfort"], gf:false, allergens:["gluten"], cost:8.50 },
  { name:"Chicken Wings with Potato Wedges & Salad", protein:"chicken", carb:"potato", cuisine:["american","comfort"], gf:true, allergens:[], cost:8.00 },
  { name:"Chicken Dippers with Chips & Baked Beans", protein:"chicken", carb:"potato", cuisine:["comfort"], gf:true, allergens:[], cost:6.50 },
  { name:"Hot Dogs with Chips & Side Salad", protein:"pork", carb:"potato", cuisine:["american","comfort"], gf:false, allergens:["gluten"], cost:6.50 },
  { name:"Sausage Rolls with Wedges & Sweetcorn", protein:"pork", carb:"potato", cuisine:["british","comfort"], gf:false, allergens:["gluten","eggs"], cost:7.00 },
  { name:"Pizza with Potato Salad & Coleslaw", protein:"veggie", carb:"other", cuisine:["italian","comfort"], gf:false, allergens:["gluten","milk"], cost:6.50 },
  { name:"Roasted Salmon with Potato Wedges & Green Beans", protein:"fish", carb:"potato", cuisine:["british","mediterranean"], gf:true, allergens:["fish"], cost:11.00 },
  { name:"Fish Fingers & Chips with Beans or Peas", protein:"fish", carb:"potato", cuisine:["comfort"], gf:true, allergens:["fish","gluten"], cost:7.50 },
  { name:"Full Cooked Breakfast with GF Toast & Hash Browns", protein:"pork", carb:"other", cuisine:["british","breakfast"], gf:false, allergens:["gluten","eggs","milk"], cost:8.00 },
  { name:"Quiche with Potato Wedges & Greek Salad", protein:"veggie", carb:"potato", cuisine:["british","mediterranean"], gf:true, allergens:["eggs","milk"], cost:7.50 },
  { name:"Loaded Baked Potato with Savoury Mince & Cheese", protein:"beef", carb:"potato", cuisine:["british","comfort"], gf:true, allergens:["milk"], cost:7.50 },
  { name:"Pork Chops with Apple Sauce, Mash & Green Beans", protein:"pork", carb:"potato", cuisine:["british"], gf:true, allergens:["milk"], cost:9.00 },
  { name:"Oven Baked Rice with Chicken, Chorizo & Tomato", protein:"chicken", carb:"rice", cuisine:["mediterranean","spanish"], gf:true, allergens:[], cost:8.50 },
];

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
.meal-c{background:${B.card};border-radius:16px;padding:16px 18px;margin-bottom:10px;border:1px solid ${B.border};display:flex;align-items:flex-start;gap:12px;transition:box-shadow 0.15s;}
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
.recipe-btn{background:transparent;border:1px solid ${B.primary};border-radius:20px;padding:4px 9px;font-size:10px;font-weight:500;color:${B.primary};cursor:pointer;transition:all 0.15s;font-family:'Outfit',sans-serif;margin-top:4px;}
.recipe-btn:hover{background:${B.soft};}
.recipe-links{margin-top:8px;padding:10px;background:${B.soft};border-radius:10px;font-size:11px;color:${B.primary};}
.recipe-links a{display:block;color:${B.primary};text-decoration:none;padding:3px 0;border-bottom:1px solid ${B.border};}
.recipe-links a:last-child{border-bottom:none;}
.recipe-links a:hover{text-decoration:underline;}
.back-b{background:transparent;border:none;color:${B.faint};font-family:'Outfit',sans-serif;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:5px;padding:6px 0;margin-bottom:14px;}
.back-b:hover{color:${B.muted};}
.shop-sec{margin-bottom:14px;}
.shop-t{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${B.faint};margin-bottom:7px;padding-bottom:4px;border-bottom:1px solid ${B.border};}
.shop-i{font-size:13px;color:${B.text};padding:7px 0;border-bottom:1px solid ${B.bg};display:flex;align-items:center;gap:10px;}
.shop-i:last-child{border-bottom:none;}
.chk{width:17px;height:17px;border:1.5px solid ${B.border};border-radius:5px;flex-shrink:0;cursor:pointer;}
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
    maxPasta:2, maxRice:2, maxPotato:5,
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

  const generate = async () => {
    setLoading(true); setLoadMsg(0);
    const p = pool();
    const sys = `You are a family meal planner. Pick 7 dinners (Saturday–Friday) from the database.
Rules: Sunday MUST be british-roast if sundayRoast true. If fridaySurprise true, Friday must match fridayCuisines. Max pasta=${prefs.maxPasta}, max rice=${prefs.maxRice}. No repeats. Vary proteins and cuisines.
Return ONLY JSON: {"plan":[{"day":"Saturday","meal":"exact name","reason":"one sentence"},...]}`;
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:1200,system:sys,
          messages:[{role:"user",content:`Prefs:${JSON.stringify(prefs)}\nPool:${JSON.stringify(p.map(m=>({name:m.name,protein:m.protein,carb:m.carb,cuisine:m.cuisine})))}\nReturn JSON only.`}]})
      });
      const d = await r.json();
      const txt = d.content?.[0]?.text||"";
      const parsed = JSON.parse(txt.replace(/```json|```/g,"").trim());
      setPlan(parsed.plan.map(item=>{
        const db=p.find(m=>m.name===item.meal)||p.find(m=>m.name.toLowerCase().startsWith(item.meal.split(" ")[0].toLowerCase()));
        return{...item,protein:db?.protein||"chicken",carb:db?.carb||"potato",
          cost:db?(db.cost*(prefs.familySize/4)).toFixed(2):"8.00",
          allergens:db?.allergens||[],meal:db?.name||item.meal};
      }));
    } catch { setPlan(fallback(p)); }
    setLoading(false); setScreen("plan");
  };

  const fallback = (p) => {
    const used=[],carbs={};
    return DAYS.map(day=>{
      let pool2=p.filter(m=>!used.includes(m.name));
      if(day==="Sunday"&&prefs.sundayRoast) pool2=pool2.filter(m=>m.cuisine.includes("british-roast"));
      if(day==="Friday"&&prefs.fridaySurprise&&prefs.fridayCuisines.length) pool2=pool2.filter(m=>m.cuisine.some(c=>prefs.fridayCuisines.includes(c)));
      pool2=pool2.filter(m=>!(m.carb==="pasta"&&(carbs.pasta||0)>=prefs.maxPasta)&&!(m.carb==="rice"&&(carbs.rice||0)>=prefs.maxRice));
      if(!pool2.length) pool2=p.filter(m=>!used.includes(m.name));
      const pick=pool2[Math.floor(Math.random()*pool2.length)]||p[0];
      used.push(pick.name); carbs[pick.carb]=(carbs[pick.carb]||0)+1;
      return{day,meal:pick.name,protein:pick.protein,carb:pick.carb,
        cost:(pick.cost*(prefs.familySize/4)).toFixed(2),allergens:pick.allergens,reason:"A great choice."};
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
      cost:(pick.cost*(prefs.familySize/4)).toFixed(2),allergens:pick.allergens};
    setPlan(np); setSwapping(null);
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

  const recipeSearch = (meal) => [
    {label:"BBC Good Food",url:`https://www.bbcgoodfood.com/search?q=${encodeURIComponent(meal)}`},
    {label:"Pinch of Nom",url:`https://pinchofnom.com/?s=${encodeURIComponent(meal)}`},
    {label:"All Recipes UK",url:`https://www.allrecipes.com/search?q=${encodeURIComponent(meal)}`},
  ];

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
          <button className="cta" onClick={()=>{setPlan(null);setFbSent(false);setSugSent(false);setEmail("");setScreen("prefs");}}>Plan next week →</button>
          <button className="cta ghost" style={{marginTop:8}} onClick={()=>setScreen("shopping")}>Back to shopping list</button>
        </div>
      </div>
    </div></>
  );

  if(screen==="feedback") return (
    <><style>{CSS}</style>
    <div className="app">
      <div className="hero"><div className="logo">Get<em>Meal</em>Wise</div></div>
      <button className="back-b" onClick={()=>setScreen("shopping")}>← Back</button>
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

  if(screen==="shopping") return (
    <><style>{CSS}</style>
    <div className="app">
      <div className="hero"><div className="logo">Get<em>Meal</em>Wise</div></div>
      <button className="back-b" onClick={()=>setScreen("plan")}>← Back to meal plan</button>
      <div className="card">
        <div className="card-h">Your shopping list</div>
        <div className="card-s">Based on your approved 7-day meal plan for the week</div>
        <div className="shop-sec">
          <div className="shop-t">Proteins this week</div>
          {Object.entries(plan.reduce((a,m)=>{a[m.protein]=(a[m.protein]||0)+1;return a},{})).map(([p,n])=>(
            <div className="shop-i" key={p}><div className="chk"/>{pIcon[p]||"🍽️"} {p.charAt(0).toUpperCase()+p.slice(1)} — {n} meal{n>1?"s":""}</div>
          ))}
        </div>
        <div className="shop-sec">
          <div className="shop-t">Store cupboard & staples</div>
          {["White potatoes (large bag)","Carrots","White onions","Fresh garlic","Frozen peas","Frozen sweetcorn","Chicken stock cubes","Beef stock cubes","Tomato puree","Tinned chopped tomatoes","GF Gravy granules","Basmati / long grain rice","Olive oil","Fresh roasting herb mix","Butter or block margarine","Cheddar cheese"].map((i,n)=>(
            <div className="shop-i" key={n}><div className="chk"/>{i}</div>
          ))}
        </div>
        <div className="notice">Cost estimates based on typical UK prices. Upload your receipt below to help build real community pricing data!</div>
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
  );

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
          <div className="s-note">Community estimates · upload receipt for real prices</div>
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
      <div style={{fontSize:12,color:B.faint,marginBottom:12}}>Not feeling a meal? Hit swap for an alternative — or click "Recipe links" to see how to cook it.</div>
      {plan.map((item,i)=>(
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
            <div style={{marginTop:6}}>
              <button className="recipe-btn" onClick={()=>setRecipeOpen(recipeOpen===i?null:i)}>
                {recipeOpen===i?"Hide recipe links ▲":"Recipe links ▼"}
              </button>
              {recipeOpen===i&&(
                <div className="recipe-links">
                  <div style={{fontSize:10,color:B.muted,marginBottom:4}}>Find this recipe on:</div>
                  {recipeSearch(item.meal).map((l,j)=><a key={j} href={l.url} target="_blank" rel="noopener noreferrer">→ {l.label}</a>)}
                </div>
              )}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0}}>
            <div className="m-cost">~£{item.cost}</div>
            <button className="sw-btn" disabled={swapping===i} onClick={()=>swap(i)}>{swapping===i?"...":"↺ Swap"}</button>
          </div>
        </div>
      ))}
      <button className="cta amber" onClick={()=>setScreen("shopping")}>✓ Approve plan & build shopping list</button>
      <button className="cta ghost" style={{marginTop:8}} onClick={generate}>↺ Generate completely new plan</button>
    </div></>
  );

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
