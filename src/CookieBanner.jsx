import { useState, useEffect } from "react";

export const CONSENT_KEY = "gmw_cookie_consent";
export const GA_ID = "G-XXXXXXXXXX";
export const getCookieConsent = () => localStorage.getItem(CONSENT_KEY);

export const gtagEvent = (name, params = {}) => {
  if (typeof window.gtag !== "function") return;
  if (getCookieConsent() !== "accepted") return;
  window.gtag("event", name, params);
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    if (typeof window.gtag === "function") window.gtag("config", GA_ID);
  };
  const decline = () => { localStorage.setItem(CONSENT_KEY, "declined"); setVisible(false); };

  if (!visible) return null;

  return (
    <div style={{
      position:"fixed", bottom:0, left:0, right:0, zIndex:1000,
      background:"#1B5E50", color:"#fff", padding:"14px 20px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      gap:12, flexWrap:"wrap", fontFamily:"'Outfit',sans-serif",
      fontSize:13, lineHeight:1.5, boxShadow:"0 -2px 12px rgba(0,0,0,0.15)",
    }}>
      <p style={{margin:0, flex:1, minWidth:200}}>
        We use cookies to understand how families use GetMealWise and improve the app. No data is sold.{" "}
        <a href="/privacy" style={{color:"#F4A726", textDecoration:"underline"}}>Privacy policy</a>
      </p>
      <div style={{display:"flex", gap:8, flexShrink:0}}>
        <button onClick={decline} style={{
          background:"transparent", color:"#fff",
          border:"1.5px solid rgba(255,255,255,0.45)", borderRadius:20,
          padding:"8px 18px", fontFamily:"'Outfit',sans-serif", fontSize:13, cursor:"pointer",
        }}>Decline</button>
        <button onClick={accept} style={{
          background:"#F4A726", color:"#1A1A2E", border:"none", borderRadius:20,
          padding:"8px 18px", fontFamily:"'Outfit',sans-serif", fontSize:13,
          fontWeight:600, cursor:"pointer",
        }}>Accept</button>
      </div>
    </div>
  );
}
