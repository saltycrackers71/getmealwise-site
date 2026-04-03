import { useState } from "react";

const B = {
  primary:"#1B5E50", primary2:"#14463C", accent:"#F4A726", accent2:"#E09415",
  bg:"#FAFAF5", card:"#FFFFFF", text:"#1A1A2E", muted:"#6B7B8D", faint:"#9EAAB6",
  border:"#E8EDE8", soft:"#EEF5F0", softAmber:"#FEF3DC",
};

const YOUTUBE_ID = "c4oXZg5O20U";

const PALETTES = [
  { id:"A", name:"Forest & Sunshine",
    desc:"Deep teal meets sunshine yellow — warm, natural, food-inspired. Our current direction.",
    swatch:["#1B5E50","#F4A726","#FAFAF5","#1A1A2E"], votes:41 },
  { id:"B", name:"Forest & Berry",
    desc:"Deep green with a rich raspberry accent — premium but still approachable and warm.",
    swatch:["#1A4731","#C2185B","#F9F7FA","#1A1A2E"], votes:28 },
  { id:"C", name:"Slate & Citrus",
    desc:"Deep charcoal-blue with bright lime citrus — modern, bold and unexpected.",
    swatch:["#1E3A5F","#7CB518","#F5F8FA","#1A1A2E"], votes:19 },
];

const FEATURES = [
  { icon:"🍗", title:"AI-powered meal plans",
    desc:"Tell us your preferences, allergens and favourite cuisines. We build your perfect week in seconds — no repeats, balanced proteins, carb variety guaranteed." },
  { icon:"🌾", title:"Full allergen filtering",
    desc:"All 14 UK major allergens covered. Gluten free, dairy free, nut free — we filter the entire meal database so nothing unsafe ever appears in your plan." },
  { icon:"🎲", title:"Friday Surprise night",
    desc:"Pick a surprise cuisine — Thai, Nepalese, Japanese, Tex-Mex, Greek — and let us wow your family every Friday with something completely different." },
  { icon:"🛒", title:"UK supermarket price map",
    desc:"Community receipt uploads show which meals are cheapest at Sainsbury's, Tesco, Waitrose, ASDA and more. Real data, from real families, every week." },
  { icon:"⚡", title:"Meal Help Now! (coming soon)",
    desc:"Tell us what's in your fridge and we'll suggest what you can cook tonight — right now, in under a minute. No planning needed." },
  { icon:"📧", title:"Free weekly community report",
    desc:"Real pricing data, popular meal swaps, trending recipes and new additions — straight to your inbox every week. Built from community data, for the community." },
];

const KIT_FORM_ID = "32ef1c922f";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800&family=Outfit:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Outfit', sans-serif; background: ${B.bg}; color: ${B.text}; }
  .page { max-width: 920px; margin: 0 auto; padding: 0 20px 80px; }

  .nav { display: flex; align-items: center; justify-content: space-between; padding: 22px 0 0; }
  .logo { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: ${B.primary}; letter-spacing: -0.3px; text-decoration: none; }
  .logo em { color: ${B.accent}; font-style: normal; }
  .logo-sub { font-size: 10px; font-weight: 400; color: ${B.faint}; display: block; margin-top: 1px; letter-spacing: 0.04em; }
  .nav-cta { background: ${B.primary}; color: #fff; border: none; border-radius: 20px; padding: 10px 20px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; text-decoration: none; display: inline-block; }
  .nav-cta:hover { background: ${B.primary2}; }
  .nav-right { display: flex; align-items: center; gap: 10px; }
  .nav-app { background: transparent; color: ${B.primary}; border: 1.5px solid ${B.primary}; border-radius: 20px; padding: 9px 18px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; text-decoration: none; display: inline-block; }
  .nav-app:hover { background: ${B.soft}; }

  .hero { text-align: center; padding: 56px 0 44px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: ${B.softAmber}; color: #92600A; border-radius: 20px; padding: 6px 16px; font-size: 12px; font-weight: 600; margin-bottom: 22px; letter-spacing: 0.01em; }
  .hero-h { font-family: 'Fraunces', serif; font-size: clamp(30px, 6vw, 58px); font-weight: 800; color: ${B.text}; line-height: 1.12; margin-bottom: 18px; letter-spacing: -0.5px; }
  .hero-h em { color: ${B.primary}; font-style: normal; }
  .hero-h .acc { color: ${B.accent2}; }
  .hero-sub { font-size: clamp(14px, 2.5vw, 17px); color: ${B.muted}; max-width: 540px; margin: 0 auto 32px; line-height: 1.7; font-weight: 300; }

  .form-wrap { max-width: 500px; margin: 0 auto; }
  .inp-row { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 8px; }
  .w-inp { flex: 1; min-width: 220px; padding: 13px 16px; border-radius: 14px; border: 1.5px solid ${B.border}; font-family: 'Outfit', sans-serif; font-size: 14px; background: #fff; color: ${B.text}; transition: border-color 0.15s; }
  .w-inp:focus { outline: none; border-color: ${B.primary}; }
  .w-btn { padding: 13px 22px; background: ${B.primary}; color: #fff; border: none; border-radius: 14px; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
  .w-btn:hover { background: ${B.primary2}; transform: translateY(-1px); }
  .w-btn:disabled { background: ${B.faint}; cursor: not-allowed; transform: none; }
  .gdpr-row { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px; }
  .gdpr-row input { width: 15px; height: 15px; flex-shrink: 0; margin-top: 3px; cursor: pointer; accent-color: ${B.primary}; }
  .gdpr-t { font-size: 11px; color: ${B.faint}; line-height: 1.55; text-align: left; }
  .form-note { font-size: 11px; color: ${B.faint}; text-align: center; margin-top: 4px; }

  .success-box { background: ${B.soft}; border-radius: 16px; padding: 20px 24px; border: 2px solid ${B.primary}; text-align: center; }
  .sbox-h { font-family: 'Fraunces', serif; font-size: 20px; color: ${B.primary}; margin-bottom: 6px; }
  .sbox-d { font-size: 13px; color: ${B.muted}; line-height: 1.6; }

  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; max-width: 560px; margin: 36px auto 0; }
  .stat { text-align: center; background: #fff; border-radius: 16px; padding: 18px 12px; border: 1px solid ${B.border}; }
  .stat-n { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; color: ${B.primary}; line-height: 1.1; }
  .stat-l { font-size: 11px; color: ${B.faint}; margin-top: 3px; line-height: 1.4; }
  .stat-note { font-size: 10px; color: ${B.accent2}; font-weight: 600; margin-top: 2px; }

  .video-section { margin-top: 64px; }
  .video-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${B.accent2}; text-align: center; margin-bottom: 10px; }
  .video-h { font-family: 'Fraunces', serif; font-size: clamp(20px, 4vw, 30px); font-weight: 700; color: ${B.text}; text-align: center; margin-bottom: 8px; }
  .video-sub { font-size: 14px; color: ${B.muted}; text-align: center; max-width: 480px; margin: 0 auto 24px; line-height: 1.6; }
  .video-wrap { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 20px; border: 1px solid ${B.border}; box-shadow: 0 8px 32px rgba(27,94,80,0.1); }
  .video-wrap iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 20px; }
  .video-cta { text-align: center; margin-top: 20px; font-size: 14px; color: ${B.muted}; }
  .video-cta a { color: ${B.primary}; font-weight: 500; text-decoration: none; }
  .video-cta a:hover { text-decoration: underline; }

  .section { margin-top: 72px; }
  .sec-eyebrow { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${B.accent2}; text-align: center; margin-bottom: 10px; }
  .sec-h { font-family: 'Fraunces', serif; font-size: clamp(22px, 4vw, 36px); font-weight: 700; color: ${B.text}; text-align: center; margin-bottom: 8px; line-height: 1.2; }
  .sec-sub { font-size: 14px; color: ${B.muted}; text-align: center; max-width: 500px; margin: 0 auto 32px; line-height: 1.65; }

  .feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 14px; }
  .feat-card { background: #fff; border-radius: 18px; padding: 22px; border: 1px solid ${B.border}; transition: all 0.15s; }
  .feat-card:hover { box-shadow: 0 6px 24px rgba(27,94,80,0.07); transform: translateY(-2px); }
  .feat-ic { font-size: 26px; margin-bottom: 10px; display: block; }
  .feat-h { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 600; color: ${B.text}; margin-bottom: 6px; }
  .feat-d { font-size: 13px; color: ${B.muted}; line-height: 1.6; }

  .how-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
  .how-step { text-align: center; }
  .how-n { width: 38px; height: 38px; border-radius: 50%; background: ${B.primary}; color: #fff; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-family: 'Fraunces', serif; }
  .how-h { font-size: 14px; font-weight: 600; color: ${B.text}; margin-bottom: 5px; }
  .how-d { font-size: 12px; color: ${B.faint}; line-height: 1.55; }

  .super-strip { background: #fff; border-radius: 18px; padding: 24px; border: 1px solid ${B.border}; margin-top: 32px; }
  .super-h { font-size: 13px; font-weight: 600; color: ${B.text}; margin-bottom: 6px; text-align: center; }
  .super-sub { font-size: 12px; color: ${B.faint}; text-align: center; margin-bottom: 16px; }
  .super-logos { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
  .super-pill { padding: 6px 14px; border-radius: 20px; border: 1px solid ${B.border}; font-size: 12px; font-weight: 500; color: ${B.muted}; background: ${B.bg}; }
  .super-pill.live { border-color: ${B.primary}; background: ${B.soft}; color: ${B.primary}; }
  .super-pill.soon { border-color: ${B.accent}; background: ${B.softAmber}; color: #92600A; }

  .try-banner { background: ${B.primary}; border-radius: 18px; padding: 28px; display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 32px; flex-wrap: wrap; }
  .try-text { color: #fff; }
  .try-h { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; margin-bottom: 4px; }
  .try-d { font-size: 13px; opacity: 0.8; }
  .try-btn { background: ${B.accent}; color: ${B.text}; border: none; border-radius: 14px; padding: 12px 22px; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; text-decoration: none; display: inline-block; transition: all 0.15s; }
  .try-btn:hover { background: ${B.accent2}; }

  .vote-sec { background: #fff; border-radius: 24px; padding: 36px; border: 2px solid ${B.accent}; margin-top: 72px; }
  .vote-top { text-align: center; margin-bottom: 28px; }
  .founder-badge { display: inline-flex; align-items: center; gap: 6px; background: ${B.softAmber}; color: #92600A; border-radius: 20px; padding: 6px 14px; font-size: 11px; font-weight: 600; margin-bottom: 12px; }
  .vote-h { font-family: 'Fraunces', serif; font-size: clamp(20px, 4vw, 30px); font-weight: 700; color: ${B.text}; margin-bottom: 8px; }
  .vote-sub { font-size: 14px; color: ${B.muted}; max-width: 480px; margin: 0 auto; line-height: 1.6; }

  .pal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 22px; }
  .pal-card { border: 2px solid ${B.border}; border-radius: 16px; padding: 16px; cursor: pointer; transition: all 0.15s; background: ${B.bg}; }
  .pal-card:hover { border-color: ${B.primary}; }
  .pal-card.on { border-color: ${B.primary}; background: ${B.soft}; }
  .pal-swatches { display: flex; gap: 4px; margin-bottom: 10px; border-radius: 6px; overflow: hidden; }
  .pal-sw { flex: 1; height: 22px; }
  .pal-name { font-size: 13px; font-weight: 600; color: ${B.text}; margin-bottom: 4px; }
  .pal-desc { font-size: 11px; color: ${B.faint}; line-height: 1.45; margin-bottom: 6px; }
  .pal-votes { font-size: 10px; color: ${B.faint}; }
  .pal-sel { font-size: 11px; color: ${B.primary}; font-weight: 600; display: none; }
  .pal-card.on .pal-sel { display: block; }
  .pal-card.on .pal-votes { display: none; }
  .vote-bar { background: ${B.bg}; border-radius: 6px; height: 6px; margin-top: 6px; overflow: hidden; }
  .vote-bar-fill { height: 100%; border-radius: 6px; background: ${B.primary}; transition: width 0.3s; }
  .vote-form { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 8px; }
  .vote-note { font-size: 11px; color: ${B.faint}; text-align: center; margin-top: 8px; }
  .voted-box { background: ${B.soft}; border-radius: 14px; padding: 18px; text-align: center; border: 1px solid ${B.border}; }
  .voted-h { font-family: 'Fraunces', serif; font-size: 18px; color: ${B.primary}; margin-bottom: 5px; }
  .voted-d { font-size: 13px; color: ${B.muted}; line-height: 1.6; }

  .bottom-cta { background: ${B.primary}; border-radius: 24px; padding: 44px 32px; text-align: center; margin-top: 72px; color: #fff; }
  .bcta-h { font-family: 'Fraunces', serif; font-size: clamp(22px, 4vw, 36px); font-weight: 700; margin-bottom: 10px; line-height: 1.2; }
  .bcta-sub { font-size: 14px; opacity: 0.8; margin-bottom: 26px; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 1.65; }
  .bcta-btn { background: ${B.accent}; color: ${B.text}; border: none; border-radius: 14px; padding: 14px 30px; font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
  .bcta-btn:hover { background: ${B.accent2}; }
  .bcta-note { font-size: 11px; opacity: 0.5; margin-top: 12px; }

  .footer { display: flex; align-items: center; justify-content: space-between; padding: 28px 0 0; font-size: 12px; color: ${B.faint}; flex-wrap: wrap; gap: 8px; border-top: 1px solid ${B.border}; margin-top: 48px; }
  .footer a { color: ${B.faint}; text-decoration: none; }
  .footer a:hover { color: ${B.muted}; }

  @media (max-width: 600px) {
    .pal-grid { grid-template-columns: 1fr; }
    .stats { grid-template-columns: 1fr; max-width: 280px; }
    .try-banner { text-align: center; justify-content: center; }
    .nav-app { display: none; }
  }
`;

export default function Landing() {
  const [email, setEmail] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [joined, setJoined] = useState(false);
  const [memberNum, setMemberNum] = useState(null);
  const [palette, setPalette] = useState(null);
  const [voteEmail, setVoteEmail] = useState("");
  const [voteGdpr, setVoteGdpr] = useState(false);
  const [voted, setVoted] = useState(false);
  const [palVotes, setPalVotes] = useState({ A:41, B:28, C:19 });
  const totalVotes = Object.values(palVotes).reduce((a,b)=>a+b,0);

  const joinWaitlist = async () => {
    if (!email || !gdpr) return;
    const num = Math.floor(Math.random() * 12) + 248;
    setMemberNum(num);
    setJoined(true);
    if (!voteEmail) setVoteEmail(email);
    // Kit form submission — replace KIT_FORM_ID with your real ID
    if (KIT_FORM_ID !== "REPLACE_WITH_KIT_FORM_ID") {
      try {
        await fetch(`https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email_address: email }),
        });
      } catch (e) {
        console.log("Kit submission error:", e);
      }
    }
  };

  const submitVote = () => {
    if (!palette || !voteEmail || !voteGdpr) return;
    setPalVotes(p => ({ ...p, [palette]: p[palette] + 1 }));
    setVoted(true);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="page">

        <nav className="nav">
          <div>
            <a href="/" className="logo">Get<em>Meal</em>Wise</a>
            <span className="logo-sub">getmealwise.co.uk</span>
          </div>
          <div className="nav-right">
            <a href="/app" className="nav-app">Try the app →</a>
            <button className="nav-cta" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
              Join free
            </button>
          </div>
        </nav>

        <div className="hero">
          <div className="hero-badge">🚀 Beta launching soon · Be a founding member</div>
          <h1 className="hero-h">
            Get <em>Meal</em><span className="acc">Wise</span><br />
            the smarter way to feed<br />your family
          </h1>
          <p className="hero-sub">
            AI-powered weekly meal plans with full allergen filtering, UK supermarket price comparison,
            and a community data flywheel that gets smarter every single week. Free forever.
          </p>

          <div className="form-wrap" id="waitlist">
            {!joined ? <>
              <div className="inp-row">
                <input className="w-inp" type="email" placeholder="Your email address" value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && joinWaitlist()} />
                <button className="w-btn" disabled={!email || !gdpr} onClick={joinWaitlist}>Join free →</button>
              </div>
              <div className="gdpr-row">
                <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)} />
                <div className="gdpr-t">I'd like to join the GetMealWise founding members waitlist and receive beta launch updates. I can unsubscribe any time. My data will never be sold or shared.</div>
              </div>
              <div className="form-note">Free forever · No credit card · Unsubscribe any time</div>
            </> : (
              <div className="success-box">
                <div className="sbox-h">🎉 Welcome, Founding Member #{memberNum}!</div>
                <div className="sbox-d">
                  You're in! We'll email you the moment beta launches and you get first access to everything.
                  While you wait — scroll down and vote on our brand colours. Your vote genuinely counts! 🎨
                </div>
              </div>
            )}
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-n">2.5yr</div>
              <div className="stat-l">of real family meal data behind this</div>
            </div>
            <div className="stat">
              <div className="stat-n">834</div>
              <div className="stat-l">real meals already planned and tested</div>
            </div>
            <div className="stat">
              <div className="stat-n">7</div>
              <div className="stat-l">UK supermarkets at launch</div>
              <div className="stat-note">Aldi & Lidl coming soon</div>
            </div>
          </div>
        </div>

        <div className="video-section">
          <div className="video-label">See it in action</div>
          <h2 className="video-h">Watch how it all started</h2>
          <p className="video-sub">From a family meal spreadsheet to a community-powered meal planner — built in one evening with AI. Here's the story and the demo.</p>
          <div className="video-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
              title="GetMealWise — How it started and how it works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="video-cta">
            Liked what you saw? <a href="#waitlist" onClick={e => { e.preventDefault(); document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' }); }}>Join the waitlist above</a> or <a href="/app">try the demo now →</a>
          </div>
        </div>

        <div className="section">
          <div className="sec-eyebrow">What GetMealWise does</div>
          <h2 className="sec-h">Everything you need for the week's dinners</h2>
          <p className="sec-sub">From AI meal generation to allergen filtering, recipe links and community price data — all in one free tool, built by a real family for real families.</p>
          <div className="feat-grid">
            {FEATURES.map((f, i) => (
              <div className="feat-card" key={i}>
                <span className="feat-ic">{f.icon}</span>
                <div className="feat-h">{f.title}</div>
                <div className="feat-d">{f.desc}</div>
              </div>
            ))}
          </div>

          <div className="try-banner">
            <div className="try-text">
              <div className="try-h">Want to try it right now?</div>
              <div className="try-d">The demo is live — set your preferences and generate your week's meals in seconds.</div>
            </div>
            <a href="/app" className="try-btn">Try the demo app →</a>
          </div>
        </div>

        <div className="section">
          <div className="sec-eyebrow">How it works</div>
          <h2 className="sec-h">Your weekly meal plan in 4 simple steps</h2>
          <p className="sec-sub" style={{ marginBottom: 28 }}>Simple, quick and actually useful on a busy weeknight.</p>
          <div className="how-grid">
            {[
              { n:"1", h:"Set your preferences", d:"Family size, proteins, allergens, cuisines, carb rules. Takes about 60 seconds the first time." },
              { n:"2", h:"Generate your plan", d:"AI picks 7 dinners from our database. No repeats, balanced proteins, your allergen rules applied. Swap anything you don't fancy." },
              { n:"3", h:"Approve & shop", d:"One click builds your grouped shopping list. Upload your receipt to help build the UK's community price map." },
              { n:"4", h:"Get the weekly report", d:"Every week we email real pricing data, trending meals, popular swaps and new recipe ideas from the community." },
            ].map((s, i) => (
              <div className="how-step" key={i}>
                <div className="how-n">{s.n}</div>
                <div className="how-h">{s.h}</div>
                <div className="how-d">{s.d}</div>
              </div>
            ))}
          </div>

          <div className="super-strip">
            <div className="super-h">UK supermarket price comparison</div>
            <div className="super-sub">Community receipt uploads build real pricing data across every major UK supermarket. Which one is cheapest for YOUR weekly meals? We'll tell you.</div>
            <div className="super-logos">
              {[
                { name:"Sainsbury's", live:true },
                { name:"Tesco", live:true },
                { name:"Waitrose", live:true },
                { name:"ASDA", live:true },
                { name:"Morrisons", live:true },
                { name:"Ocado (incl. M&S)", live:true },
                { name:"Iceland", live:true },
                { name:"Aldi", live:false },
                { name:"Lidl", live:false },
              ].map(s => (
                <div key={s.name} className={`super-pill${s.live ? " live" : " soon"}`}>
                  {s.live ? "✓ " : ""}{s.name}{!s.live ? " — coming soon" : ""}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="vote-sec" id="vote">
          <div className="vote-top">
            <div className="founder-badge">🎨 Founding Member Exclusive</div>
            <div className="vote-h">You choose our brand colours</div>
            <div className="vote-sub">
              As a founding member you get a real say in how GetMealWise looks and feels.
              Vote for your favourite colour palette — the community decides.
              We'll reveal the winner at launch and announce it in our first newsletter.
            </div>
          </div>

          {!voted ? <>
            <div className="pal-grid">
              {PALETTES.map(p => {
                const pct = Math.round((palVotes[p.id] / totalVotes) * 100);
                return (
                  <div key={p.id} className={`pal-card${palette === p.id ? " on" : ""}`} onClick={() => setPalette(p.id)}>
                    <div className="pal-swatches">
                      {p.swatch.map((c, i) => <div key={i} className="pal-sw" style={{ background: c }} />)}
                    </div>
                    <div className="pal-name">{p.name}</div>
                    <div className="pal-desc">{p.desc}</div>
                    <div className="pal-votes">{pct}% of votes so far</div>
                    <div className="vote-bar"><div className="vote-bar-fill" style={{ width: pct + "%" }} /></div>
                    <div className="pal-sel">✓ I choose this one</div>
                  </div>
                );
              })}
            </div>

            {palette && <>
              <div className="vote-form">
                <input className="w-inp" type="email" placeholder="Your email to register your vote"
                  value={voteEmail} onChange={e => setVoteEmail(e.target.value)} style={{ maxWidth: 280 }} />
                <button className="w-btn" disabled={!voteEmail || !voteGdpr} onClick={submitVote}>Cast my vote →</button>
              </div>
              <div className="gdpr-row" style={{ maxWidth: 460, margin: "8px auto 0" }}>
                <input type="checkbox" checked={voteGdpr} onChange={e => setVoteGdpr(e.target.checked)} />
                <div className="gdpr-t">Add me to the founding members list and notify me when the winning palette is revealed at launch. I can unsubscribe any time.</div>
              </div>
            </>}
            {!palette && <p style={{ textAlign: "center", fontSize: 13, color: B.faint, marginTop: 4 }}>Select a palette above to cast your vote</p>}
            <div className="vote-note">All three options use the same fonts and layout — just different colour personalities. Most popular wins at launch!</div>
          </> : (
            <div className="voted-box">
              <div className="voted-h">🗳️ Vote registered — thank you!</div>
              <div className="voted-d">
                You voted for <strong>{PALETTES.find(p => p.id === palette)?.name}</strong>.
                We'll reveal the community winner in our launch email — watch your inbox! 🎨
              </div>
            </div>
          )}
        </div>

        <div className="bottom-cta">
          <div className="bcta-h">Ready to get meal wise?</div>
          <p className="bcta-sub">Join our founding members waitlist. Free forever, built by a real family, powered by the community.</p>
          <button className="bcta-btn" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
            Join the free waitlist →
          </button>
          <div className="bcta-note">getmealwise.co.uk · Beta launching soon · Free forever</div>
        </div>

        <div className="footer">
          <div>© 2026 GetMealWise · Built with ❤️ for busy UK families</div>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#">Privacy policy</a>
            <a href="#">Unsubscribe</a>
            <a href="#vote">Vote on our colours</a>
          </div>
        </div>

      </div>
    </>
  );
}
