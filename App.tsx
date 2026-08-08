import React, { useState, useEffect, useRef } from "react";
import {
    Home, MapPin, CheckSquare, Bot, Search, Utensils, PartyPopper, Briefcase,
    ShieldAlert, Moon, Sun, ChevronRight, Send, Plus, Trash2, ChevronDown,
    Clock, TrendingUp, AlertTriangle, Phone, CalendarDays, Cloud, Quote,
    Menu as MenuIcon, LogOut, Building2, Navigation2, LogIn, Loader2, User
} from "lucide-react";

const THEME = {
    light: {
          paper: "#F3F4F6",      // Tailwind gray-100
          surface: "#FFFFFF",    // White
          navy: "#1E3A8A",       // Tailwind blue-900
          ink: "#111827",        // Tailwind gray-900
          sub: "#6B7280",        // Tailwind gray-500
          line: "#E5E7EB",       // Tailwind gray-200
          amber: "#F59E0B",      // Tailwind amber-500
          moss: "#10B981",       // Tailwind emerald-500
          brick: "#EF4444",      // Tailwind red-500
          sidebar: "#1E3A8A",    // Deep blue sidebar
          sidebarText: "#D1D5DB" // Tailwind gray-300
    },
    dark: {
          paper: "#0F172A",      // Tailwind slate-900
          surface: "#1E293B",    // Tailwind slate-800
          navy: "#020617",       // Tailwind slate-950
          ink: "#F9FAFB",        // Tailwind gray-50
          sub: "#9CA3AF",        // Tailwind gray-400
          line: "#334155",       // Tailwind slate-700
          amber: "#FBBF24",      // Tailwind amber-400
          moss: "#34D399",       // Tailwind emerald-400
          brick: "#F87171",      // Tailwind red-400
          sidebar: "#020617",    // Deepest slate
          sidebarText: "#94A3B8" // Tailwind slate-400
    }
};

const COLLEGES = [
  { code: "SVNIT", name: "Sardar Vallabhbhai NIT, Surat", domain: "svnit.ac.in" },
  { code: "IITB", name: "IIT Bombay", domain: "iitb.ac.in" },
  { code: "NITT", name: "NIT Tiruchirappalli", domain: "nitt.edu" },
  { code: "BITS", name: "BITS Pilani", domain: "bits-pilani.ac.in" },
  ];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIMETABLE = {
    Mon: [
      { time: "08:00–08:55", subject: "Operating Systems", room: "LH-3", faculty: "Dr. Rakesh Gohil" },
      { time: "09:00–09:55", subject: "Machine Learning", room: "LH-5", faculty: "Dr. Krupa Jariwala" },
      { time: "11:00–12:50", subject: "AI for Robotics Lab", room: "Lab 205", faculty: "Dr. Abhinav Malaviya" },
        ],
    Tue: [
      { time: "08:00–08:55", subject: "Foundation of Cryptography", room: "LH-1", faculty: "Dr. Alok Kumar" },
      { time: "10:00–10:55", subject: "Operating Systems", room: "LH-3", faculty: "Dr. Rakesh Gohil" },
        ],
    Wed: [
      { time: "09:00–09:55", subject: "Machine Learning", room: "LH-5", faculty: "Dr. Krupa Jariwala" },
        ],
    Thu: [
      { time: "08:00–08:55", subject: "Operating Systems", room: "LH-3", faculty: "Dr. Rakesh Gohil" },
      { time: "13:00–14:50", subject: "OS Lab", room: "Lab 205", faculty: "Dr. Rakesh Gohil" },
        ],
    Fri: [
      { time: "10:00–10:55", subject: "AI for Robotics", room: "LH-2", faculty: "Dr. Abhinav Malaviya" },
        ],
    Sat: [],
};

const ROOMS = [
  { name: "Computer Lab 3", building: "CS Department Block", floor: "2nd Floor", eta: "6 min", tags: "lab computer cs 205", route: ["Main Gate", "CS Block entrance", "Stairwell B", "Room 205, 2nd Floor"] },
  { name: "Central Library", building: "Academic Block A", floor: "Ground Floor", eta: "4 min", tags: "library books reading", route: ["Main Gate", "Academic Block A", "Ground Floor lobby"] },
  { name: "LH-3 Lecture Hall", building: "Academic Block B", floor: "1st Floor", eta: "5 min", tags: "lecture hall class lh3", route: ["Main Gate", "Academic Block B", "Stairwell A", "LH-3"] },
  { name: "Hostel Office", building: "Hostel Admin Block", floor: "Ground Floor", eta: "9 min", tags: "hostel warden admin", route: ["Main Gate", "Hostel Road", "Admin Block entrance"] },
  { name: "Canteen", building: "Student Activity Centre", floor: "Ground Floor", eta: "3 min", tags: "food canteen mess", route: ["Main Gate", "Student Activity Centre"] },
  ];

const INITIAL_SUBJECTS = [
  { name: "Operating Systems", attended: 34, total: 40 },
  { name: "Machine Learning", attended: 28, total: 40 },
  { name: "AI for Robotics", attended: 30, total: 38 },
  ];

const EVENTS = [
  { id: 1, title: "HackNITSurat 6.0", club: "Coding Club", type: "Hackathon", date: "18 Aug", desc: "24-hour build sprint, cash prizes worth ₹1L." },
  { id: 2, title: "Intro to ML Workshop", club: "AI Society", type: "Workshop", date: "14 Aug", desc: "Hands-on session on scikit-learn and model evaluation." },
  { id: 3, title: "Inter-Branch Football Cup", club: "Sports Council", type: "Sports", date: "20 Aug", desc: "Group stage kicks off at the main ground." },
  ];

const MENU = [
  { id: 1, name: "Masala Dosa", price: 60, prep: 8, veg: true, cat: "Breakfast" },
  { id: 2, name: "Veg Thali", price: 90, prep: 12, veg: true, cat: "Lunch" },
  { id: 3, name: "Chicken Roll", price: 80, prep: 10, veg: false, cat: "Snacks" },
  { id: 4, name: "Cold Coffee", price: 40, prep: 4, veg: true, cat: "Beverages" },
  ];

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "timetable", label: "Timetable", icon: CalendarDays },
  { key: "navigate", label: "Campus Navigation", icon: MapPin },
  { key: "attendance", label: "Attendance Tracker", icon: CheckSquare },
  { key: "assistant", label: "AI Assistant", icon: Bot },
  { key: "lostfound", label: "Lost & Found", icon: Search },
  { key: "canteen", label: "Canteen", icon: Utensils },
  { key: "events", label: "Events & Clubs", icon: PartyPopper },
  { key: "placement", label: "Placement Hub", icon: Briefcase },
  { key: "emergency", label: "Emergency & Help", icon: ShieldAlert },
  ];

function pct(a, t) { return t === 0 ? 0 : Math.round((a / t) * 1000) / 10; }
function classesNeededFor75(a, t) {
    const p = a / t;
    if (p >= 0.75) return 0;
    return Math.ceil((0.75 * t - a) / 0.25);
}
function classesCanSkip(a, t) {
    const p = a / t;
    if (p < 0.75) return 0;
    return Math.floor((a - 0.75 * t) / 0.75);
}

export default function CampusX() {
    const [dark, setDark] = useState(false);
    const [user, setUser] = useState(null); // null = not logged in
  const [showLogin, setShowLogin] = useState(false);
    const [toast, setToast] = useState(null);

  const c = dark ? THEME.dark : THEME.light;

  function fireToast(msg) {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
  }

  const handleLogin = (userData) => {
        setUser(userData);
        setShowLogin(false);
        fireToast(`Welcome back, ${userData.name.split(' ')[0]}!`);
  };

  const handleLogout = () => {
        setUser(null);
        fireToast("Successfully logged out.");
  };

  return (
        <div style={{ background: c.paper, color: c.ink, minHeight: "100vh", fontFamily: "'Inter', sans-serif", transition: "background .3s, color .3s" }}>
                <style>{`
                        @import url('/assets/fonts.css');
                                .cx-display { font-family: 'Space Grotesk', sans-serif; }
                                        .cx-mono { font-family: 'IBM Plex Mono', monospace; }
                                                .cx-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
                                                        .cx-scroll::-webkit-scrollbar-thumb { background: ${c.line}; border-radius: 4px; }
                                                                .cx-card { background: ${c.surface}; border: 1px solid ${c.line}; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); }
                                                                        .cx-btn-primary { background: ${c.amber}; color: #111827; border-radius: 12px; font-weight: 600; transition: all 0.2s; }
                                                                                .cx-btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
                                                                                        .cx-btn-ghost { border: 1px solid ${c.line}; border-radius: 12px; color: ${c.ink}; transition: all 0.2s; background: transparent; }
                                                                                                .cx-btn-ghost:hover { background: ${c.line}40; }
                                                                                                        .cx-input { background: ${c.paper}; border: 1px solid ${c.line}; border-radius: 12px; color: ${c.ink}; outline: none; transition: border 0.2s; }
                                                                                                                .cx-input:focus { border-color: ${c.amber}; }
                                                                                                                        .cx-input::placeholder { color: ${c.sub}; }
                                                                                                                              `}</style>style>
        
          {/* Global Topbar for both Authed and Unauthed views */}
              <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b" style={{ borderColor: c.line, background: `${c.surface}CC` }}>
                      <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center cx-display font-bold text-lg shadow-sm" style={{ background: c.amber, color: "#111827" }}>CX</div>div>
                                <div>
                                            <div className="cx-display font-bold text-lg leading-none tracking-tight">CampusX</div>div>
                                            <div className="text-[11px] font-medium tracking-wide mt-1" style={{ color: c.sub }}>STUDENT PORTAL</div>div>
                                </div>div>
                      </div>div>
              
                      <div className="flex items-center gap-3">
                                <button onClick={() => setDark(!dark)} className="p-2.5 rounded-full hover:bg-gray-500/10 transition-colors" title="Toggle Theme">
                                  {dark ? <Sun size={20} color={c.amber} /> : <Moon size={20} color={c.navy} />}
                                </button>button>
                                
                        {!user ? (
                      <button onClick={() => setShowLogin(true)} className="cx-btn-primary px-5 py-2 text-sm flex items-center gap-2 shadow-sm">
                                    <LogIn size={16} /> Sign In
                      </button>button>
                    ) : (
                      <div className="flex items-center gap-4">
                                    <div className="hidden sm:block text-right">
                                                    <div className="text-sm font-semibold">{user.name}</div>div>
                                                    <div className="text-xs cx-mono" style={{ color: c.sub }}>{user.id}</div>div>
                                    </div>div>
                                    <button onClick={handleLogout} className="cx-btn-ghost p-2.5" title="Log out">
                                                    <LogOut size={18} />
                                    </button>button>
                      </div>div>
                                )}
                      </div>div>
              </header>header>
        
          {/* Main Content Area */}
          {showLogin ? (
                  <LoginPage c={c} onLogin={handleLogin} onCancel={() => setShowLogin(false)} fireToast={fireToast} />
                ) : !user ? (
                  <LandingPage c={c} onSignInClick={() => setShowLogin(true)} />
                ) : (
                  <MainApp c={c} dark={dark} user={user} fireToast={fireToast} />
                )}
        
          {/* Global Toast */}
          {toast && (
                  <div className="fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 animate-bounce" style={{ background: c.ink, color: c.paper, zIndex: 100 }}>
                            <CheckSquare size={16} color={c.moss} /> {toast}
                  </div>div>
              )}
        </div>div>
      );
}

function LandingPage({ c, onSignInClick }) {
    return (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center" style={{ background: `linear-gradient(180deg, ${c.paper} 0%, ${c.surface} 100%)` }}>
                <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: c.amber + '20', color: c.amber }}>
                                  <PartyPopper size={14} /> Version 2.0 is now live
                        </div>div>
                        <h1 className="cx-display text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                                  Your Campus Life, <br />
                                  <span style={{ color: c.amber }}>Unified.</span>span>
                        </h1>h1>
                        <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto" style={{ color: c.sub }}>
                                  Timetable tracking, attendance analytics, live canteen orders, and an AI assistant—all tied to your official college ID.
                        </p>p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                  <button onClick={onSignInClick} className="cx-btn-primary text-lg px-8 py-3.5 flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg">
                                              Access Portal <ChevronRight size={20} />
                                  </button>button>
                        </div>div>
                        
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t" style={{ borderColor: c.line }}>
                          {[
            { label: "Colleges Supported", val: "14+" },
            { label: "Active Students", val: "22k+" },
            { label: "Classes Tracked", val: "1.2M" },
            { label: "AI Queries Answered", val: "500k+" }
                      ].map((stat, i) => (
                                    <div key={i}>
                                                  <div className="cx-display text-3xl font-bold" style={{ color: c.ink }}>{stat.val}</div>div>
                                                  <div className="text-xs uppercase tracking-wider font-semibold mt-1" style={{ color: c.sub }}>{stat.label}</div>div>
                                    </div>div>
                                  ))}
                        </div>div>
                </div>div>
          </div>div>
        );
}

function LoginPage({ c, onLogin, onCancel, fireToast }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = (e) => {
          e.preventDefault();
          setErr("");
      
          if (!email.trim() || !password.trim()) {
                  setErr("Please enter both email and password.");
                  return;
          }
      
          const emailRegex = /^[^\s@]+@[^\s@]+\.(edu|ac\.in)$/i;
          if (!emailRegex.test(email)) {
                  setErr("Access restricted. You must use a valid institutional email ending in .edu or .ac.in");
                  return;
          }
      
          if (password.length < 6) {
                  setErr("Password must be at least 6 characters long.");
                  return;
          }
      
          setLoading(true);
          setTimeout(() => {
                  setLoading(false);
                  const namePart = email.split('@')[0];
                  const name = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace('.', ' ');
                  
                  onLogin({
                            name: name,
                            id: email.toUpperCase(),
                            branch: "Computer Science & Engineering",
                            year: "3rd Year",
                            email: email
                  });
          }, 1200);
    };
  
    return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: `${c.navy}CC` }}>
                <div className="cx-card w-full max-w-md p-8 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        <button onClick={onCancel} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-500/10" style={{ color: c.sub }}>
                                  <Trash2 size={20} className="hidden" />
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line>line><line x1="6" y1="6" x2="18" y2="18"></line>line></svg>svg>
                        </button>button>
                
                        <div className="text-center mb-8">
                                  <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center cx-display font-bold text-2xl shadow-lg mb-4" style={{ background: c.amber, color: "#111827" }}>CX</div>div>
                                  <h2 className="cx-display text-2xl font-bold">Student Sign In</h2>h2>
                                  <p className="text-sm mt-2" style={{ color: c.sub }}>Institutional access only (.edu or .ac.in)</p>p>
                        </div>div>
                
                        <form onSubmit={handleSubmit} className="space-y-4">
                                  <div>
                                              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: c.sub }}>College Email</label>label>
                                              <div className="relative">
                                                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: c.sub }} />
                                                            <input 
                                                                              type="email" 
                                                              value={email} 
                                                              onChange={(e) => setEmail(e.target.value)} 
                                                              placeholder="student@college.edu" 
                                                              className="cx-input w-full pl-10 pr-4 py-3 text-sm"
                                                                            />
                                              </div>div>
                                  </div>div>
                        
                                  <div>
                                              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: c.sub }}>Password</label>label>
                                              <div className="relative">
                                                            <ShieldAlert size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: c.sub }} />
                                                            <input 
                                                                              type="password" 
                                                              value={password} 
                                                              onChange={(e) => setPassword(e.target.value)} 
                                                              placeholder="••••••••" 
                                                              className="cx-input w-full pl-10 pr-4 py-3 text-sm"
                                                                            />
                                              </div>div>
                                  </div>div>
                        
                          {err && (
                        <div className="p-3 rounded-xl flex items-start gap-2 text-sm font-medium" style={{ background: c.brick + '15', color: c.brick, border: `1px solid ${c.brick}40` }}>
                                      <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                                      <span>{err}</span>span>
                        </div>div>
                                  )}
                        
                                  <button type="submit" disabled={loading} className="cx-btn-primary w-full py-3.5 mt-2 flex justify-center items-center gap-2 text-base">
                                    {loading ? <Loader2 size={20} className="animate-spin" /> : "Authenticate"}
                                  </button>button>
                        </form>form>
                
                        <div className="mt-6 text-center text-xs" style={{ color: c.sub }}>
                                  Secure authentication powered by CampusX ID.
                        </div>div>
                </div>div>
          </div>div>
        );
}

function MainApp({ c, dark, user, fireToast }) {
    const [active, setActive] = useState("dashboard");
    const [navOpen, setNavOpen] = useState(false);
    const [college, setCollege] = useState(COLLEGES[0]);
    
    const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [lostFound, setLostFound] = useState([
      { id: 1, kind: "found", item: "Blue water bottle", location: "LH-3", contact: "9876543210", date: "Aug 6" }
        ]);
  
    const overallAttendance = pct(
          subjects.reduce((s, x) => s + x.attended, 0),
          subjects.reduce((s, x) => s + x.total, 0)
        );
  
    const pageProps = { c, dark, user, fireToast, subjects, setSubjects, cart, setCart, orders, setOrders, registeredEvents, setRegisteredEvents, lostFound, setLostFound, overallAttendance, college, setActive };
  
    return (
          <div className="flex max-w-[1600px] mx-auto relative">
                <Sidebar c={c} active={active} setActive={setActive} navOpen={navOpen} setNavOpen={setNavOpen} college={college} />
                
                <div className="flex-1 min-w-0 flex flex-col min-h-[calc(100vh-80px)]">
                        <TickerStrip c={c} subjects={subjects} overallAttendance={overallAttendance} />
                
                        <main className="flex-1 p-4 md:p-8">
                                  <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    {active === "dashboard" && <Dashboard {...pageProps} />}
                                    {active === "timetable" && <TimetablePage {...pageProps} />}
                                    {active === "navigate" && <NavigatePage {...pageProps} />}
                                    {active === "attendance" && <AttendancePage {...pageProps} />}
                                    {active === "assistant" && <AssistantPage {...pageProps} />}
                                    {active === "lostfound" && <LostFoundPage {...pageProps} />}
                                    {active === "canteen" && <CanteenPage {...pageProps} />}
                                    {active === "events" && <EventsPage {...pageProps} />}
                                    {active === "placement" && <PlacementPage {...pageProps} />}
                                    {active === "emergency" && <EmergencyPage {...pageProps} />}
                                  </div>div>
                        </main>main>
                </div>div>
          
                <button 
                          onClick={() => setNavOpen(!navOpen)} 
                  className="md:hidden fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-40" 
                  style={{ background: c.amber, color: "#111827" }}
                        >
                        <MenuIcon size={24} />
                </button>button>
          </div>div>
        );
}

function Sidebar({ c, active, setActive, navOpen, setNavOpen, college }) {
    return (
          <>
            {navOpen && <div className="fixed inset-0 bg-black/60 md:hidden z-40 backdrop-blur-sm" onClick={() => setNavOpen(false)} />}
                <aside
                          className={`fixed md:sticky top-[73px] h-[calc(100vh-73px)] w-72 flex flex-col shrink-0 transition-transform duration-300 z-50 md:translate-x-0 ${navOpen ? "translate-x-0" : "-translate-x-full"}`}
                          style={{ background: c.sidebar, color: c.sidebarText, borderRight: `1px solid ${c.line}40` }}
                        >
                        <div className="px-6 py-5 border-b" style={{ borderColor: `${c.line}20` }}>
                                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-2">Current Campus</div>div>
                                  <div className="flex items-center gap-2 text-white font-medium">
                                              <Building2 size={16} color={c.amber} /> {college.name}
                                  </div>div>
                        </div>div>
                
                        <nav className="flex-1 overflow-y-auto cx-scroll p-4 space-y-1.5">
                          {NAV.map((item, i) => {
                                      const Icon = item.icon;
                                      const isActive = active === item.key;
                                      return (
                                                      <button
                                                                        key={item.key}
                                                                        onClick={() => { setActive(item.key); setNavOpen(false); }}
                                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all duration-200 group"
                                                                        style={{
                                                                                            background: isActive ? `${c.amber}20` : "transparent",
                                                                                            color: isActive ? c.amber : "inherit",
                                                                        }}
                                                                      >
                                                                      <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="group-hover:scale-110 transition-transform" />
                                                                      <span className={`flex-1 ${isActive ? "font-semibold" : "font-medium"}`}>{item.label}</span>span>
                                                        {isActive && <ChevronRight size={16} />}
                                                      </button>button>
                                                    );
                        })}
                        </nav>nav>
                </aside>aside>
          </>>
        );
}

function TickerStrip({ c, subjects, overallAttendance }) {
    const [clock, setClock] = useState("");
    
    useEffect(() => {
          const updateTime = () => {
                  const now = new Date();
                  setClock(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
          };
          updateTime();
          const t = setInterval(updateTime, 1000);
          return () => clearInterval(t);
    }, []);
  
    const todayKey = DAYS[(new Date().getDay() + 6) % 7] in TIMETABLE ? DAYS[(new Date().getDay() + 6) % 7] : "Mon";
    const todays = TIMETABLE[todayKey] || [];
    
    const items = [
      { label: "LOCAL TIME", value: clock },
      { label: "TODAY'S CLASSES", value: `${todays.length}` },
      { label: "OVERALL ATTENDANCE", value: `${overallAttendance}%` },
      { label: "NEXT EXAM", value: `12 Days` },
        ];
  
    return (
          <div className="cx-mono text-xs overflow-x-auto cx-scroll sticky top-[73px] z-20 border-b shadow-sm" style={{ background: c.surface, color: c.ink, borderColor: c.line }}>
                <div className="flex items-stretch max-w-full">
                  {items.map((it, i) => (
                      <div key={i} className="flex items-center gap-2 px-5 py-3 shrink-0 border-r" style={{ borderColor: c.line }}>
                                  <span className="font-semibold" style={{ color: c.sub }}>{it.label}</span>span>
                                  <span className="font-bold px-2 py-0.5 rounded" style={{ background: c.amber + '20', color: c.amber }}>{it.value}</span>span>
                      </div>div>
                    ))}
                </div>div>
          </div>div>
        );
}

function Dashboard({ c, user, subjects, overallAttendance, setActive, registeredEvents }) {
    const [weather, setWeather] = useState({ temp: "--", desc: "Loading...", city: "Locating..." });
    const [weatherIcon, setWeatherIcon] = useState(<Cloud size={24} />);
  
    useEffect(() => {
          async function fetchLocationAndWeather() {
                  if ("geolocation" in navigator) {
                            navigator.geolocation.getCurrentPosition(async (position) => {
                                        try {
                                                      const lat = position.coords.latitude;
                                                      const lon = position.coords.longitude;
                                                      
                                                      const weatherRes = await fetch("/api/weather?latitude=" + lat + "&longitude=" + lon);
                                                      const weatherData = await weatherRes.json();
                                                      const temp = Math.round(weatherData.current_weather.temperature);
                                                      
                                                      const geoRes = await fetch("/api/geocode?lat=" + lat + "&lon=" + lon);
                                                      const geoData = await geoRes.json();
                                                      const city = geoData.address.city || geoData.address.town || geoData.address.state || "Campus Area";
                                          
                                                      setWeather({ temp: `${temp}°C`, desc: "Live Data Synced", city });
                                                      setWeatherIcon(<Sun size={24} color={c.amber} />);
                                        } catch (e) {
                                                      setWeather({ temp: "29°C", desc: "Partly Cloudy", city: "Surat (Default)" });
                                        }
                            }, () => {
                                        setWeather({ temp: "29°C", desc: "Partly Cloudy", city: "Surat (Default)" });
                            });
                  }
          }
          fetchLocationAndWeather();
    }, [c.amber]);
  
    const todayKey = DAYS[(new Date().getDay() + 6) % 7] in TIMETABLE ? DAYS[(new Date().getDay() + 6) % 7] : "Mon";
    const todays = TIMETABLE[todayKey] || [];
    const quote = "Consistency over intensity. Show up every day.";
  
    return (
          <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                                  <h1 className="cx-display text-3xl md:text-4xl font-bold">Good to see you, <span style={{ color: c.amber }}>{user.name.split(" ")[0]}</span>span>.</h1>h1>
                                  <p className="text-sm font-medium mt-2" style={{ color: c.sub }}>{user.branch} · {user.year}</p>p>
                        </div>div>
                </div>div>
          
                <div className="grid md:grid-cols-3 gap-5">
                        <div className="cx-card p-6 md:col-span-2 relative overflow-hidden group">
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-black opacity-5 rounded-bl-full pointer-events-none" />
                                  <div className="flex items-center justify-between mb-5">
                                              <div className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: c.sub }}>
                                                            <CalendarDays size={16} /> Today's Schedule
                                              </div>div>
                                              <button onClick={() => setActive("timetable")} className="text-sm font-semibold hover:underline" style={{ color: c.amber }}>View Full →</button>button>
                                  </div>div>
                                  <div className="space-y-3">
                                    {todays.length === 0 ? (
                          <div className="text-sm font-medium p-4 rounded-xl" style={{ background: c.paper, color: c.sub }}>No classes scheduled today. Enjoy the break!</div>div>
                        ) : (
                          todays.map((p, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-black/5" style={{ background: c.paper }}>
                                                              <div>
                                                                                  <div className="font-bold">{p.subject}</div>div>
                                                                                  <div className="text-xs font-medium mt-1" style={{ color: c.sub }}>{p.faculty} · <span style={{ color: c.ink }}>{p.room}</span>span></div>div>
                                                              </div>div>
                                                              <div className="cx-mono text-sm font-bold px-3 py-1 rounded-lg" style={{ background: c.surface, border: `1px solid ${c.line}` }}>{p.time}</div>div>
                                            </div>div>
                                          ))
                        )}
                                  </div>div>
                        </div>div>
                
                        <div className="cx-card p-6 flex flex-col justify-between" style={{ background: `linear-gradient(145deg, ${c.surface}, ${c.paper})` }}>
                                  <div>
                                              <div className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-4" style={{ color: c.sub }}>
                                                            <TrendingUp size={16} /> Attendance Status
                                              </div>div>
                                              <div className="cx-display text-6xl font-bold tracking-tighter" style={{ color: overallAttendance >= 75 ? c.moss : c.brick }}>
                                                {overallAttendance}%
                                              </div>div>
                                              <div className="text-sm font-medium mt-2" style={{ color: c.sub }}>
                                                {overallAttendance >= 75 ? "You are in the safe zone." : "Warning: Below 75% requirement."}
                                              </div>div>
                                  </div>div>
                                  <button onClick={() => setActive("attendance")} className="cx-btn-ghost w-full py-3 mt-6 font-semibold">Manage Attendance</button>button>
                        </div>div>
                </div>div>
          
                <div className="grid md:grid-cols-3 gap-5">
                        <div className="cx-card p-6 flex flex-col justify-between">
                                  <div>
                                              <div className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: c.sub }}>
                                                            <MapPin size={16} /> Real-Time Weather
                                              </div>div>
                                              <div className="flex items-center gap-4">
                                                {weatherIcon}
                                                            <div className="cx-display text-4xl font-bold">{weather.temp}</div>div>
                                              </div>div>
                                              <div className="text-sm font-medium mt-2" style={{ color: c.ink }}>{weather.city}</div>div>
                                              <div className="text-xs font-medium mt-1" style={{ color: c.sub }}>{weather.desc} via Open-Meteo API</div>div>
                                  </div>div>
                                  <div className="mt-6 pt-5 border-t text-sm font-medium italic flex items-start gap-2 leading-relaxed" style={{ borderColor: c.line, color: c.sub }}>
                                              <Quote size={16} className="shrink-0 mt-1" color={c.amber} /> {quote}
                                  </div>div>
                        </div>div>
                
                        <div className="cx-card p-6 md:col-span-2">
                                  <div className="text-sm font-bold uppercase tracking-wider mb-5 flex items-center gap-2" style={{ color: c.sub }}>
                                              <PartyPopper size={16} /> Upcoming Events
                                  </div>div>
                                  <div className="grid sm:grid-cols-2 gap-4">
                                    {EVENTS.slice(0, 4).map((e) => (
                          <div key={e.id} className="p-4 rounded-xl" style={{ background: c.paper }}>
                                          <div className="flex justify-between items-start mb-2">
                                                            <span className="text-[10px] uppercase font-bold px-2 py-1 rounded-md" style={{ background: c.amber + '25', color: c.amber }}>{e.type}</span>span>
                                                            <span className="text-xs font-bold cx-mono" style={{ color: c.sub }}>{e.date}</span>span>
                                          </div>div>
                                          <div className="font-bold text-sm">{e.title}</div>div>
                                          <div className="text-xs mt-1 font-medium" style={{ color: c.sub }}>{e.club}</div>div>
                          </div>div>
                        ))}
                                  </div>div>
                        </div>div>
                </div>div>
          </div>div>
        );
}

function AssistantPage({ c, fireToast }) {
    const [messages, setMessages] = useState([
      { from: "bot", text: "Hello! I am your AI Campus Assistant, powered by Gemini. Ask me about your campus, coding concepts, or general advice!" },
        ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const endRef = useRef(null);
  
    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  
    async function fetchAIResponse(query) {
          const apiKey = ""; 
          const apiUrl = "/api/gemini?key=" + apiKey;
          
          const systemPrompt = "You are a highly helpful, concise, and friendly AI assistant for college students using the 'CampusX' app. Keep your answers relatively short (1-3 paragraphs max) and format them beautifully. If asked about campus features, mention the app handles attendance, timetable, lost & found, canteen orders, and navigation.";
      
          try {
                  const payload = {
                            contents: [{ parts: [{ text: query }] }],
                            systemInstruction: { parts: [{ text: systemPrompt }] }
                  };
            
                  const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                  });
                  
                  const result = await response.json();
                  if (result.candidates && result.candidates[0].content) {
                            return result.candidates[0].content.parts[0].text;
                  }
                  return "I seem to have lost my connection to the server. Please try again.";
          } catch (e) {
                  console.error(e);
                  return "An error occurred connecting to the Gemini AI module. Check network.";
          }
    }
  
    async function send(text = null) {
          const query = (text ?? input).trim();
          if (!query || loading) return;
          
          setMessages((m) => [...m, { from: "user", text: query }]);
          setInput("");
          setLoading(true);
          
          const aiResponseText = await fetchAIResponse(query);
          
          setMessages((m) => [...m, { from: "bot", text: aiResponseText }]);
          setLoading(false);
    }
  
    const suggestions = ["Summarize Object Oriented Programming", "How do I calculate CGPA?", "Give me a motivation quote for exams", "Where is the library?"];
  
    return (
          <div className="space-y-6 h-full flex flex-col">
                <PageHeader c={c} icon={Bot} title="Gemini AI Assistant" sub="Live AI chat powered by Google Gemini 3 Flash." />
                
                <div className="cx-card flex flex-col flex-1 min-h-[500px]">
                        <div className="flex-1 overflow-y-auto cx-scroll p-6 space-y-4">
                          {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                                      <div className="max-w-[85%] px-5 py-3.5 rounded-2xl text-sm font-medium leading-relaxed" style={{
                                          background: m.from === "user" ? c.amber : c.paper,
                                          color: m.from === "user" ? "#111827" : c.ink,
                                          border: m.from === "user" ? "none" : `1px solid ${c.line}`,
                                          borderBottomRightRadius: m.from === "user" ? "4px" : "16px",
                                          borderBottomLeftRadius: m.from === "bot" ? "4px" : "16px",
                        }}>
                                        {m.text}
                                      </div>div>
                        </div>div>
                      ))}
                          {loading && (
                        <div className="flex justify-start">
                                      <div className="px-5 py-3.5 rounded-2xl text-sm font-medium bg-gray-100 dark:bg-gray-800 flex items-center gap-2">
                                                      <Loader2 size={16} className="animate-spin" /> Thinking...
                                      </div>div>
                        </div>div>
                                  )}
                                  <div ref={endRef} />
                        </div>div>
                        
                        <div className="p-4 border-t bg-gray-50/50 dark:bg-gray-900/50" style={{ borderColor: c.line, borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {suggestions.map((s) => (
                          <button key={s} onClick={() => send(s)} disabled={loading} className="text-xs font-semibold cx-btn-ghost px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            {s}
                          </button>button>
                        ))}
                                  </div>div>
                                  <div className="flex gap-2">
                                              <input 
                                                              value={input} 
                                                onChange={(e) => setInput(e.target.value)} 
                                                onKeyDown={(e) => e.key === "Enter" && send()} 
                                                placeholder="Message Gemini AI..." 
                                                className="cx-input flex-1 px-4 py-3 text-sm font-medium shadow-inner" 
                                                disabled={loading}
                                                            />
                                              <button onClick={() => send()} disabled={loading} className="cx-btn-primary px-5 py-3 shadow-md flex items-center justify-center">
                                                            <Send size={18} />
                                              </button>button>
                                  </div>div>
                        </div>div>
                </div>div>
          </div>div>
        );
}

function AttendancePage({ c, subjects, setSubjects, fireToast }) {
    const [form, setForm] = useState({ name: "", attended: "", total: "" });
  
    function addSubject() {
          if (!form.name || form.total === "" || form.attended === "") return fireToast("Fill in subject, attended and total classes.");
          const attended = Number(form.attended), total = Number(form.total);
          if (total <= 0 || attended < 0 || attended > total) return fireToast("Check your numbers — attended can't exceed total.");
          setSubjects((s) => [...s, { name: form.name, attended, total }]);
          setForm({ name: "", attended: "", total: "" });
          fireToast("Subject added successfully.");
    }
  
    function bump(i, field, delta) {
          setSubjects((s) => s.map((x, idx) => {
                  if (idx !== i) return x;
                  const next = { ...x, [field]: Math.max(0, x[field] + delta) };
                  if (field === "attended" && next.attended > next.total) next.attended = next.total;
                  return next;
          }));
    }
  
    function remove(i) { 
          setSubjects((s) => s.filter((_, idx) => idx !== i));
          fireToast("Subject removed.");
    }
  
    return (
          <div className="space-y-6">
                <PageHeader c={c} icon={CheckSquare} title="Attendance Tracker" sub="Dynamic calculations to maintain the 75% criteria." />
          
                <div className="grid gap-4">
                  {subjects.map((s, i) => {
                      const p = pct(s.attended, s.total);
                      const safe = p >= 75;
                      const need = classesNeededFor75(s.attended, s.total);
                      const canSkip = classesCanSkip(s.attended, s.total);
                      return (
                                    <div key={i} className="cx-card p-5">
                                                  <div className="flex items-start justify-between gap-4">
                                                                  <div className="min-w-0 flex-1">
                                                                                    <div className="font-bold text-lg">{s.name}</div>div>
                                                                                    <div className="text-sm font-medium mt-1" style={{ color: c.sub }}>
                                                                                                        <span className="cx-mono px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">{s.attended} / {s.total}</span>span> classes attended
                                                                                      </div>div>
                                                                  </div>div>
                                                                  <div className="flex items-center gap-4 shrink-0">
                                                                                    <div className="cx-display text-3xl font-bold" style={{ color: safe ? c.moss : c.brick }}>{p}%</div>div>
                                                                                    <button onClick={() => remove(i)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"><Trash2 size={18} /></button>button>
                                                                  </div>div>
                                                  </div>div>
                                    
                                                  <div className="w-full h-3 rounded-full mt-4 overflow-hidden" style={{ background: c.paper }}>
                                                                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, p)}%`, background: safe ? c.moss : c.brick }} />
                                                  </div>div>
                                    
                                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
                                                                  <div className="text-sm font-semibold flex items-center gap-2" style={{ color: safe ? c.moss : c.brick }}>
                                                                    {safe ? <><CheckSquare size={16} /> Safe to skip {canSkip} more class{canSkip === 1 ? "" : "es"}.</>>
                                                                                          : <><AlertTriangle size={16} /> Need {need} consecutive class{need === 1 ? "" : "es"} to hit 75%.</>>}
                                                                  </div>div>
                                                                  <div className="flex gap-2 shrink-0">
                                                                                    <button onClick={() => bump(i, "total", 1)} className="cx-btn-ghost px-4 py-2 text-sm font-bold">+1 Missed</button>button>
                                                                                    <button onClick={() => { bump(i, "total", 1); bump(i, "attended", 1); }} className="cx-btn-primary px-4 py-2 text-sm font-bold">+1 Attended</button>button>
                                                                  </div>div>
                                                  </div>div>
                                    </div>div>
                                  );
          })}
                </div>div>
          
                <div className="cx-card p-5 border-dashed border-2 bg-transparent" style={{ borderColor: c.line }}>
                        <div className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: c.sub }}>Register New Subject</div>div>
                        <div className="grid sm:grid-cols-4 gap-3">
                                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Subject Name (e.g. Data Structures)" className="cx-input px-4 py-2.5 text-sm sm:col-span-2 font-medium" />
                                  <input value={form.attended} onChange={(e) => setForm({ ...form, attended: e.target.value })} placeholder="Classes Attended" type="number" className="cx-input px-4 py-2.5 text-sm font-medium" />
                                  <input value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} placeholder="Total Held" type="number" className="cx-input px-4 py-2.5 text-sm font-medium" />
                        </div>div>
                        <button onClick={addSubject} className="cx-btn-primary px-6 py-2.5 text-sm mt-4 flex items-center justify-center gap-2 w-full sm:w-auto"><Plus size={16} /> Add to Tracker</button>button>
                </div>div>
          </div>div>
        );
}

function TimetablePage({ c }) {
    const todayInitial = DAYS[(new Date().getDay() + 6) % 7] in TIMETABLE ? DAYS[(new Date().getDay() + 6) % 7] : "Mon";
    const [day, setDay] = useState(todayInitial);
    
    return (
          <div className="space-y-6">
                <PageHeader c={c} icon={CalendarDays} title="Weekly Timetable" sub="Your synchronized class schedule." />
                <div className="flex gap-2 flex-wrap p-1 bg-gray-100 dark:bg-gray-800 rounded-xl inline-flex">
                  {DAYS.map((d) => (
                      <button key={d} onClick={() => setDay(d)} className="px-5 py-2 rounded-lg text-sm transition-all duration-200"
                                    style={{ 
                                                    background: d === day ? c.surface : "transparent", 
                                                    color: d === day ? c.ink : c.sub, 
                                                    boxShadow: d === day ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                                    fontWeight: d === day ? 700 : 500 
                                    }}>
                        {d}
                      </button>button>
                    ))}
                </div>div>
                <div className="cx-card overflow-hidden">
                  {(TIMETABLE[day] || []).length === 0 && <div className="p-8 text-center text-sm font-medium" style={{ color: c.sub }}>No classes scheduled for {day}.</div>div>}
                        <div className="divide-y" style={{ borderColor: c.line }}>
                          {(TIMETABLE[day] || []).map((p, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                      <div className="flex items-center gap-5">
                                                      <div className="cx-mono text-sm font-bold w-24 shrink-0 px-3 py-1.5 rounded-lg text-center" style={{ background: c.paper, color: c.ink }}>{p.time}</div>div>
                                                      <div>
                                                                        <div className="font-bold text-base">{p.subject}</div>div>
                                                                        <div className="text-sm font-medium mt-1" style={{ color: c.sub }}>Prof. {p.faculty}</div>div>
                                                      </div>div>
                                      </div>div>
                                      <div className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl self-start sm:self-auto shadow-sm" style={{ background: c.amber, color: "#111827" }}>
                                                      <MapPin size={16} /> {p.room}
                                      </div>div>
                        </div>div>
                      ))}
                        </div>div>
                </div>div>
          </div>div>
        );
}

function NavigatePage({ c }) {
    const [q, setQ] = useState("");
    const [selected, setSelected] = useState(null);
    const results = q.trim() === "" ? ROOMS : ROOMS.filter((r) => (r.name + " " + r.tags).toLowerCase().includes(q.toLowerCase()));
  
    return (
          <div className="space-y-6">
                <PageHeader c={c} icon={MapPin} title="Campus Directory & Maps" sub='Search any facility, lab, or office.' />
                <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: c.sub }} />
                        <input value={q} onChange={(e) => { setQ(e.target.value); setSelected(null); }} placeholder="e.g., Computer Lab 3, Library, Canteen..." className="cx-input w-full pl-12 pr-4 py-4 text-base font-medium shadow-sm" />
                </div>div>
          
            {selected ? (
                    <div className="cx-card p-6 animate-in fade-in slide-in-from-right-4">
                              <button onClick={() => setSelected(null)} className="text-sm font-bold mb-4 flex items-center gap-1 hover:underline" style={{ color: c.amber }}>← Back to Directory</button>button>
                              <div className="cx-display text-2xl font-bold">{selected.name}</div>div>
                              <div className="text-base font-medium mt-2" style={{ color: c.sub }}>{selected.building} · {selected.floor}</div>div>
                              
                              <div className="flex items-center gap-3 mt-6 p-4 rounded-xl" style={{ background: c.paper }}>
                                          <Navigation2 size={24} style={{ color: c.amber }} /> 
                                          <div>
                                                        <div className="text-xs uppercase tracking-wide font-bold" style={{ color: c.sub }}>Estimated Walk</div>div>
                                                        <div className="font-bold cx-mono text-lg">{selected.eta}</div>div>
                                          </div>div>
                              </div>div>
                              
                              <div className="mt-6">
                                          <div className="text-sm uppercase tracking-widest font-bold mb-4" style={{ color: c.sub }}>Step-by-Step Route</div>div>
                                          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                                            {selected.route.map((step, i) => (
                                      <div key={i} className="flex items-center gap-4 text-sm font-medium relative z-10">
                                                        <div className="w-6 h-6 rounded-full flex items-center justify-center cx-mono text-xs font-bold text-white shadow-md" style={{ background: c.navy }}>{i + 1}</div>div>
                                                        <div className="px-4 py-2 rounded-lg" style={{ background: c.surface, border: `1px solid ${c.line}` }}>{step}</div>div>
                                      </div>div>
                                    ))}
                                          </div>div>
                              </div>div>
                    </div>div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {results.map((r) => (
                                  <button key={r.name} onClick={() => setSelected(r)} className="cx-card p-5 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-b-4" style={{ borderBottomColor: c.amber }}>
                                                <div className="font-bold text-lg leading-tight mb-1">{r.name}</div>div>
                                                <div className="text-xs font-medium" style={{ color: c.sub }}>{r.building}</div>div>
                                                <div className="flex items-center gap-1.5 text-xs font-bold mt-4 px-3 py-1.5 rounded-md inline-flex" style={{ background: c.paper, color: c.ink }}><Navigation2 size={14} color={c.amber} /> {r.eta} walk</div>div>
                                  </button>button>
                                ))}
                      {results.length === 0 && <div className="text-sm font-medium col-span-full p-8 text-center" style={{ color: c.sub }}>No locations found. Try different keywords.</div>div>}
                    </div>div>
                )}
          </div>div>
        );
}

function LostFoundPage({ c, lostFound, setLostFound, fireToast }) {
    const [form, setForm] = useState({ kind: "lost", item: "", location: "", contact: "" });
  
    function post() {
          if (!form.item || !form.location || !form.contact) return fireToast("Fill all details to post.");
          setLostFound((l) => [{ id: Date.now(), ...form, date: "Just now" }, ...l]);
          setForm({ kind: "lost", item: "", location: "", contact: "" });
          fireToast("Posted successfully to the board.");
    }
  
    return (
          <div className="space-y-6">
                <PageHeader c={c} icon={Search} title="Lost & Found" sub="Community board for recovered and missing items." />
                
                <div className="cx-card p-6 border-2 border-dashed bg-transparent" style={{ borderColor: c.line }}>
                        <div className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: c.sub }}>Create a Listing</div>div>
                        <div className="flex gap-2 mb-4">
                          {["lost", "found"].map((k) => (
                        <button key={k} onClick={() => setForm({ ...form, kind: k })} className="px-6 py-2 rounded-lg text-sm capitalize font-bold transition-colors"
                                        style={{ background: form.kind === k ? c.amber : c.paper, color: form.kind === k ? "#111827" : c.sub }}>
                                      I {k} something
                        </button>button>
                      ))}
                        </div>div>
                        <div className="grid md:grid-cols-3 gap-4">
                                  <input value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} placeholder="Item Name (e.g. AirPods Pro)" className="cx-input px-4 py-3 text-sm font-medium" />
                                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Last seen / Found at" className="cx-input px-4 py-3 text-sm font-medium" />
                                  <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Your Contact Number" className="cx-input px-4 py-3 text-sm font-medium" />
                        </div>div>
                        <button onClick={post} className="cx-btn-primary px-8 py-3 text-sm mt-4 font-bold shadow-md">Post Listing</button>button>
                </div>div>
          
                <div className="grid md:grid-cols-2 gap-4">
                  {lostFound.map((x) => (
                      <div key={x.id} className="cx-card p-5 relative overflow-hidden">
                                  <div className="absolute top-0 right-0 w-2 h-full" style={{ background: x.kind === "lost" ? c.brick : c.moss }} />
                                  <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded" style={{ background: x.kind === "lost" ? c.brick + "20" : c.moss + "20", color: x.kind === "lost" ? c.brick : c.moss }}>{x.kind}</span>span>
                                                <span className="text-xs font-medium" style={{ color: c.sub }}>{x.date}</span>span>
                                  </div>div>
                                  <div className="font-bold text-lg mb-1">{x.item}</div>div>
                                  <div className="text-sm font-medium mb-3" style={{ color: c.ink }}>📍 {x.location}</div>div>
                                  <div className="text-xs font-bold px-3 py-2 rounded-lg inline-block" style={{ background: c.paper, color: c.sub }}>📞 {x.contact}</div>div>
                      </div>div>
                    ))}
                </div>div>
          </div>div>
        );
}

function CanteenPage({ c, cart, setCart, orders, setOrders, fireToast }) {
    const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  
    function add(item) {
          setCart((cur) => {
                  const existing = cur.find((x) => x.id === item.id);
                  if (existing) return cur.map((x) => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
                  return [...cur, { ...item, qty: 1 }];
          });
    }
    
    function placeOrder() {
          if (cart.length === 0) return;
          const maxPrep = Math.max(...cart.map((x) => x.prep));
          const order = { id: Date.now(), items: cart, total, status: "Preparing", eta: maxPrep };
          setOrders((o) => [order, ...o]);
          setCart([]);
          fireToast("Order placed successfully. Paid digitally via campus wallet.");
    }
  
    return (
          <div className="space-y-6">
                <PageHeader c={c} icon={Utensils} title="Smart Canteen" sub="Pre-order food to skip the queue." />
          
                <div className="grid md:grid-cols-2 gap-6">
                        <div>
                                  <div className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: c.sub }}>Menu</div>div>
                                  <div className="grid gap-3">
                                    {MENU.map((m) => (
                          <div key={m.id} className="cx-card p-4 flex items-center justify-between hover:border-amber-400 transition-colors">
                                          <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                                <span className="w-4 h-4 border-2 rounded-sm flex items-center justify-center shrink-0" style={{ borderColor: m.veg ? c.moss : c.brick }}>
                                                                                                      <span className="w-2 h-2 rounded-full" style={{ background: m.veg ? c.moss : c.brick }} />
                                                                                  </span>span>
                                                                                <span className="font-bold">{m.name}</span>span>
                                                            </div>div>
                                                            <div className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 inline-block" style={{ color: c.sub }}>~{m.prep} mins prep</div>div>
                                          </div>div>
                                          <div className="flex items-center gap-4">
                                                            <div className="font-bold cx-mono text-lg">₹{m.price}</div>div>
                                                            <button onClick={() => add(m)} className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110" style={{ background: c.amber, color: "#111827" }}><Plus size={20} /></button>button>
                                          </div>div>
                          </div>div>
                        ))}
                                  </div>div>
                        </div>div>
                
                        <div className="space-y-6">
                                  <div className="cx-card p-6" style={{ background: c.navy, color: "#fff", borderColor: c.navy }}>
                                              <div className="text-sm font-bold uppercase tracking-wide mb-4 opacity-80">Current Cart</div>div>
                                    {cart.length === 0 ? (
                          <div className="text-sm opacity-60 italic">Cart is empty.</div>div>
                        ) : (
                          <>
                                          <div className="space-y-3 mb-6">
                                            {cart.map((x) => (
                                                <div key={x.id} className="flex justify-between items-center text-sm font-medium">
                                                                      <span>{x.qty}x {x.name}</span>span>
                                                                      <span className="cx-mono">₹{x.price * x.qty}</span>span>
                                                </div>div>
                                              ))}
                                          </div>div>
                                          <div className="flex items-center justify-between pt-4 border-t border-white/20">
                                                            <span className="font-bold text-lg">Total: ₹{total}</span>span>
                                                            <button onClick={placeOrder} className="cx-btn-primary px-6 py-2.5 shadow-lg">Checkout</button>button>
                                          </div>div>
                          </>>
                        )}
                                  </div>div>
                                  
                          {orders.length > 0 && (
                        <div>
                                      <div className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: c.sub }}>Active Orders</div>div>
                                      <div className="space-y-3">
                                        {orders.map((o) => (
                                            <div key={o.id} className="cx-card p-4 border-l-4" style={{ borderLeftColor: c.amber }}>
                                                                <div className="flex justify-between items-start mb-2">
                                                                                      <div className="font-bold text-sm">Order #{String(o.id).slice(-4)}</div>div>
                                                                                      <div className="text-xs font-bold px-2 py-1 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">{o.status}</div>div>
                                                                </div>div>
                                                                <div className="text-xs font-medium mb-2" style={{ color: c.sub }}>{o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</div>div>
                                                                <div className="text-xs font-bold flex items-center gap-1"><Clock size={14} /> Ready in ~{o.eta} mins</div>div>
                                            </div>div>
                                          ))}
                                      </div>div>
                        </div>div>
                                  )}
                        </div>div>
                </div>div>
          </div>div>
        );
}

function EventsPage({ c, registeredEvents, setRegisteredEvents, fireToast }) {
    function toggle(id, title) {
          if (registeredEvents.includes(id)) {
                  setRegisteredEvents((r) => r.filter((x) => x !== id));
                  fireToast(`Unregistered from ${title}.`);
          } else {
                  setRegisteredEvents((r) => [...r, id]);
                  fireToast(`Successfully registered for ${title}. Added to calendar.`);
          }
    }
  
    return (
          <div className="space-y-6">
                <PageHeader c={c} icon={PartyPopper} title="Events & Fests" sub="Campus happenings, workshops, and extracurriculars." />
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {EVENTS.map((e) => {
                      const reg = registeredEvents.includes(e.id);
                      return (
                                    <div key={e.id} className="cx-card p-6 flex flex-col h-full hover:shadow-lg transition-shadow">
                                                  <div className="flex justify-between items-start mb-4">
                                                                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md" style={{ background: c.amber + '20', color: c.amber }}>{e.type}</span>span>
                                                                  <span className="text-xs font-bold cx-mono px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800">{e.date}</span>span>
                                                  </div>div>
                                                  <div className="font-bold text-xl mb-1">{e.title}</div>div>
                                                  <div className="text-sm font-semibold mb-4" style={{ color: c.sub }}>By {e.club}</div>div>
                                                  <p className="text-sm font-medium leading-relaxed mb-6 flex-1" style={{ color: c.ink }}>{e.desc}</p>p>
                                                  <button onClick={() => toggle(e.id, e.title)} className={`w-full py-3 text-sm font-bold rounded-xl transition-all ${reg ? 'border-2' : ''}`} style={{ 
                                                      background: reg ? 'transparent' : c.navy, 
                                                      color: reg ? c.navy : '#fff',
                                                      borderColor: reg ? c.navy : 'transparent'
                                    }}>
                                                    {reg ? "✓ Registered" : "RSVP Now"}
                                                  </button>button>
                                    </div>div>
                                  );
          })}
                </div>div>
          </div>div>
        );
}

function PlacementPage({ c }) {
    return (
          <div className="space-y-6">
                <PageHeader c={c} icon={Briefcase} title="Placement Hub" sub="Internships, jobs, and interview prep." />
                <div className="cx-card p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                        <Briefcase size={48} color={c.sub} className="mb-4 opacity-50" />
                        <h2 className="text-xl font-bold mb-2">Placement Season Drive</h2>h2>
                        <p className="text-sm font-medium max-w-md mx-auto" style={{ color: c.sub }}>
                                  Integration with your university's TPO portal is pending API approval. 
                                  Once approved, live internship postings and company schedules will appear here.
                        </p>p>
                </div>div>
          </div>div>
        );
}

function EmergencyPage({ c, fireToast }) {
    const contacts = [
      { label: "Campus Security (24x7)", number: "1800-123-4567", icon: ShieldAlert },
      { label: "Medical Emergency", number: "102 / Campus Clinic", icon: AlertTriangle },
      { label: "Anti-Ragging Squad", number: "1800-180-5522", icon: Phone },
        ];
    return (
          <div className="space-y-6">
                <PageHeader c={c} icon={ShieldAlert} title="Emergency Contacts" sub="Tap any card to initiate a call immediately." />
                <div className="grid md:grid-cols-2 gap-4">
                  {contacts.map((x) => {
                      const Icon = x.icon;
                      return (
                                    <button key={x.label} onClick={() => fireToast(`Initiating secure call to ${x.label}...`)} className="cx-card p-6 flex items-center gap-5 text-left hover:shadow-lg hover:-translate-y-1 transition-all group">
                                                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ background: c.brick + "20", color: c.brick }}>
                                                                  <Icon size={24} />
                                                  </div>div>
                                                  <div>
                                                                  <div className="font-bold text-lg mb-1">{x.label}</div>div>
                                                                  <div className="text-base font-bold cx-mono" style={{ color: c.sub }}>{x.number}</div>div>
                                                  </div>div>
                                    </button>button>
                                  );
          })}
                </div>div>
          </div>div>
        );
}

function PageHeader({ c, icon: Icon, title, sub }) {
    return (
          <div className="mb-8">
                <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ background: c.amber, color: "#111827" }}>
                                  <Icon size={24} strokeWidth={2.5} />
                        </div>div>
                        <h1 className="cx-display text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>h1>
                </div>div>
                <p className="text-base font-medium mt-2 max-w-2xl" style={{ color: c.sub }}>{sub}</p>p>
          </div>div>
        );
}</></></></></style>
