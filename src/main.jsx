import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Braces,
  Brush,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  Command,
  Cpu,
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileCode2,
  Folder,
  Github,
  Globe2,
  Home,
  Image,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  Maximize2,
  Menu,
  Moon,
  Palette,
  PenTool,
  Play,
  RefreshCw,
  Search,
  Sparkles,
  Sun,
  Terminal,
  Type,
  User,
  Wand2,
  X,
  Zap
} from "lucide-react";
import { exhibition, experiences, galleryImages, profile, projects, repoStats } from "./data/profile.js";
import "./styles.css";

/* ─────────────────── static data ─────────────────── */

const activityItems = [
  { id: "explorer", label: "Explorer", icon: Folder },
  { id: "search", label: "Search", icon: Search },
  { id: "source", label: "Source Control", icon: Github },
  { id: "run", label: "Run", icon: Play },
  { id: "extensions", label: "Extensions", icon: Folder }
];

const editorFiles = [
  { id: "about", label: "about.ishrak", icon: User },
  { id: "stack", label: "tech-stack.json", icon: Braces },
  { id: "experience", label: "experience.md", icon: File },
  { id: "education", label: "education.md", icon: File },
  { id: "game", label: "game-dev.cs", icon: FileCode2 },
  { id: "contact", label: "contact.http", icon: Globe2 }
];

const designerTools = [
  { id: "brush", label: "Brush", icon: Brush },
  { id: "pen", label: "Pen", icon: PenTool },
  { id: "type", label: "Type", icon: Type },
  { id: "image", label: "Image", icon: Image },
  { id: "layers", label: "Layers", icon: Layers }
];

const designDocuments = [
  {
    id: "branding",
    label: "Branding_Work.psd",
    galleryKey: "branding",
    title: "Branding & Identity",
    subtitle: "Logo, brand systems, and visual direction"
  },
  {
    id: "uiupc",
    label: "UIUPC_Designs.ai",
    galleryKey: "uiupc",
    title: "UIU Photography Club",
    subtitle: "Event posters, campaigns, and club visuals"
  },
  {
    id: "creative",
    label: "Creative_Art.psd",
    galleryKey: "personal",
    title: "Creative Art & Explorations",
    subtitle: "Typography, Bangla lettering, and digital art"
  }
];

/* ─────────────────── hooks ─────────────────── */

function useRoute() {
  const getPath = () => (window.location.pathname || "/") + (window.location.search || "") + (window.location.hash || "");
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onPop = () => setPath(getPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (nextPath, { scrollToTop = true } = {}) => {
    if (nextPath === path) return;
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return [path, navigate];
}

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, () => setTheme((current) => (current === "dark" ? "light" : "dark"))];
}

/* ─────────────────── app root ─────────────────── */

function App() {
  const [path, navigate] = useRoute();
  const [theme, toggleTheme] = useTheme();

  const screen = useMemo(() => {
    if (path.startsWith("/developer")) return "developer";
    if (path.startsWith("/designer")) return "designer";
    return "home";
  }, [path]);

  return (
    <div className={`app-shell app-${screen}`}>
      <FloatingPixelIcons />
      {screen === "developer" ? (
        <DeveloperWorkspace navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      ) : screen === "designer" ? (
        <DesignerStudio path={path} navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      ) : (
        <HomePage navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      )}
    </div>
  );
}

/* ─────────────────── shared components ─────────────────── */

function FloatingPixelIcons() {
  const icons = useMemo(() => [
    { id: 1, type: "icon", Icon: PenTool, size: 28, left: "7%", top: "12%", anim: "float-path-1", duration: "38s", delay: "-2s", color: "var(--accent)" },
    { id: 2, type: "text", text: "✦", size: 34, left: "22%", top: "68%", anim: "float-path-2", duration: "45s", delay: "-14s", color: "var(--accent-2)" },
    { id: 3, type: "icon", Icon: Brush, size: 30, left: "35%", top: "25%", anim: "float-path-3", duration: "42s", delay: "-8s", color: "var(--moss)" },
    { id: 4, type: "text", text: "★", size: 26, left: "55%", top: "82%", anim: "float-path-4", duration: "50s", delay: "-25s", color: "var(--blue)" },
    { id: 5, type: "icon", Icon: Palette, size: 32, left: "75%", top: "18%", anim: "float-path-5", duration: "40s", delay: "-12s", color: "var(--accent)" },
    { id: 6, type: "text", text: "◆", size: 24, left: "88%", top: "58%", anim: "float-path-6", duration: "35s", delay: "-5s", color: "var(--muted)" },
    { id: 7, type: "icon", Icon: Layers, size: 28, left: "12%", top: "85%", anim: "float-path-3", duration: "48s", delay: "-30s", color: "var(--accent-2)" },
    { id: 8, type: "text", text: "✖", size: 28, left: "45%", top: "10%", anim: "float-path-1", duration: "55s", delay: "-18s", color: "var(--moss)" },
    { id: 9, type: "icon", Icon: Sparkles, size: 26, left: "65%", top: "45%", anim: "float-path-2", duration: "36s", delay: "-9s", color: "var(--accent)" },
    { id: 10, type: "text", text: "■", size: 22, left: "82%", top: "88%", anim: "float-path-4", duration: "44s", delay: "-22s", color: "var(--blue)" },
    { id: 11, type: "icon", Icon: Command, size: 30, left: "5%", top: "45%", anim: "float-path-5", duration: "52s", delay: "-15s", color: "var(--muted)" },
    { id: 12, type: "text", text: "✚", size: 32, left: "28%", top: "40%", anim: "float-path-6", duration: "39s", delay: "-7s", color: "var(--accent-2)" },
    { id: 13, type: "icon", Icon: Image, size: 28, left: "50%", top: "65%", anim: "float-path-1", duration: "47s", delay: "-33s", color: "var(--moss)" },
    { id: 14, type: "text", text: "❖", size: 30, left: "70%", top: "72%", anim: "float-path-3", duration: "41s", delay: "-19s", color: "var(--accent)" },
    { id: 15, type: "icon", Icon: Code2, size: 28, left: "92%", top: "28%", anim: "float-path-2", duration: "49s", delay: "-27s", color: "var(--blue)" },
    { id: 16, type: "text", text: "◈", size: 26, left: "18%", top: "92%", anim: "float-path-5", duration: "43s", delay: "-11s", color: "var(--muted)" },
    { id: 17, type: "icon", Icon: Type, size: 30, left: "60%", top: "15%", anim: "float-path-4", duration: "53s", delay: "-3s", color: "var(--accent-2)" },
    { id: 18, type: "text", text: "▦", size: 24, left: "38%", top: "88%", anim: "float-path-6", duration: "37s", delay: "-21s", color: "var(--moss)" },
    { id: 19, type: "icon", Icon: FileCode2, size: 28, left: "85%", top: "12%", anim: "float-path-1", duration: "46s", delay: "-16s", color: "var(--accent)" },
    { id: 20, type: "text", text: "▲", size: 26, left: "15%", top: "32%", anim: "float-path-3", duration: "42s", delay: "-29s", color: "var(--blue)" }
  ], []);

  return (
    <div className="floating-pixel-icons-overlay" aria-hidden="true">
      {icons.map((item) => (
        <div
          key={item.id}
          className={`floating-pixel-item ${item.type === "text" ? "pixel-char" : "pixel-svg"}`}
          style={{
            left: item.left,
            top: item.top,
            fontSize: `${item.size}px`,
            color: item.color,
            animationName: item.anim,
            animationDuration: item.duration,
            animationDelay: item.delay,
          }}
        >
          {item.type === "icon" ? <item.Icon size={item.size} /> : item.text}
        </div>
      ))}
    </div>
  );
}

function Typewriter({ words, speed = 120, delay = 1800 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => fullWord.slice(0, prev.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return (
    <span className="typewriter-text">
      {currentText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

function ThemeButton({ theme, toggleTheme, compact = false }) {
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button className={compact ? "icon-button" : "theme-button"} onClick={toggleTheme} aria-label="Toggle theme">
      <Icon size={18} />
      {!compact && <span>{theme === "dark" ? "Light" : "Dark"}</span>}
    </button>
  );
}



function HomePage({ navigate, theme, toggleTheme }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [hiddenLayers, setHiddenLayers] = useState([]);
  const [lockedLayers, setLockedLayers] = useState([]);


  // Close dropdowns on clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".ps-menu-wrapper")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const aboutLayers = useMemo(() => [
    { name: "Visual Design Lead", text: "Led visual designs for the UIU Photography Club as Head of Design for over two years", type: "shape" },
    { name: "Graphics Instructor", text: "Taught Photoshop and Illustrator classes to club members", type: "text" },
    { name: "Brand Founder", text: "Started Blooming Baby, a small brand for logos and social media designs", type: "shape" },
    { name: "CSE Student", text: "Currently studying Computer Science and Engineering at United International University", type: "text" }
  ], []);

  const toggleLayerVisibility = useCallback((index) => {
    if (lockedLayers.includes(index)) return; // Prevent toggling if locked
    setHiddenLayers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, [lockedLayers]);

  const toggleLayerLock = useCallback((index) => {
    setLockedLayers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  return (
    <>
      {/* Photoshop App Frame Navbar */}
      <header className="ps-header-wrapper">
        {/* Title Bar */}
        <div className="ps-titlebar">
          <div className="ps-titlebar-left">
            <span className="ps-app-logo">Ps</span>
          </div>
          <div className="ps-titlebar-center">
            <span>ishrak_portfolio.psd @ 100% ({theme === "dark" ? "RGB/8" : "CMYK/8"})*</span>
          </div>
          <div className="ps-titlebar-right">
            <div className="ps-window-controls">
              <span className="win-min"></span>
              <span className="win-max"></span>
              <span className="win-close"></span>
            </div>
          </div>
        </div>

        {/* Menu Bar & Options Bar */}
        <div className="ps-navbar-row">
          <div className="ps-menus">
            <div className="ps-menu-wrapper">
              <button 
                className={`ps-menu-trigger ${activeDropdown === "file" ? "active" : ""}`}
                onClick={() => setActiveDropdown(activeDropdown === "file" ? null : "file")}
              >
                File
              </button>
              {activeDropdown === "file" && (
                <div className="ps-dropdown-menu">
                  <button onClick={() => { navigate("/developer"); setActiveDropdown(null); }}>
                    <span className="shortcut">Ctrl+D</span>Open Developer Space
                  </button>
                  <a href={`mailto:${profile.email}`} onClick={() => setActiveDropdown(null)}>
                    <span className="shortcut">Ctrl+M</span>Send Email
                  </a>
                </div>
              )}
            </div>

            <div className="ps-menu-wrapper">
              <button 
                className={`ps-menu-trigger ${activeDropdown === "edit" ? "active" : ""}`}
                onClick={() => setActiveDropdown(activeDropdown === "edit" ? null : "edit")}
              >
                Edit
              </button>
              {activeDropdown === "edit" && (
                <div className="ps-dropdown-menu">
                  <button onClick={() => { toggleTheme(); setActiveDropdown(null); }}>
                    <span className="shortcut">Ctrl+T</span>Toggle Theme ({theme === "dark" ? "Light" : "Dark"})
                  </button>
                </div>
              )}
            </div>

            <div className="ps-menu-wrapper">
              <button 
                className={`ps-menu-trigger ${activeDropdown === "view" ? "active" : ""}`}
                onClick={() => setActiveDropdown(activeDropdown === "view" ? null : "view")}
              >
                View
              </button>
              {activeDropdown === "view" && (
                <div className="ps-dropdown-menu">
                  <button onClick={() => { setShowGrid(!showGrid); setActiveDropdown(null); }}>
                    <span className="shortcut">Ctrl+'</span>Toggle Layout Grid ({showGrid ? "Hide" : "Show"})
                  </button>
                  <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveDropdown(null); }}>
                    <span className="shortcut">Ctrl+0</span>Fit Screen (Scroll to Top)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preset Workspaces */}
          <div className="ps-workspaces">
            <span className="workspace-label">Workspace:</span>
            <button className="workspace-btn active" onClick={() => navigate("/")}>Designer</button>
            <button className="workspace-btn" onClick={() => navigate("/developer")}>Developer</button>
            <ThemeButton theme={theme} toggleTheme={toggleTheme} compact />
          </div>
        </div>
      </header>

      {/* Background guide lines overlay (when layout grid is active) */}
      {showGrid && (
        <div className="ps-layout-guides" aria-hidden="true">
          <div className="guide-line vertical" style={{ left: "15vw" }}></div>
          <div className="guide-line vertical" style={{ left: "30vw" }}></div>
          <div className="guide-line vertical" style={{ left: "50vw" }}></div>
          <div className="guide-line vertical" style={{ left: "70vw" }}></div>
          <div className="guide-line vertical" style={{ left: "85vw" }}></div>
          <div className="guide-line horizontal" style={{ top: "25vh" }}></div>
          <div className="guide-line horizontal" style={{ top: "50vh" }}></div>
          <div className="guide-line horizontal" style={{ top: "75vh" }}></div>
        </div>
      )}

      <main className="home-layout">
        {/* ── Hero ── */}
        <section className="home-hero">
          <div className="hero-copy">
            <h1 className="hero-name glow-text">{profile.name}</h1>
            <p className="hero-role-line fade-in-item delay-1"><Typewriter words={["Designer", "Developer", "Creative Creator"]} /></p>
            <p className="hero-oneliner fade-in-item delay-2">
              I design branding materials, posters, and digital art. I also write code and build web apps.
            </p>
            <div className="hero-actions fade-in-item delay-3">
              <button className="primary-action" onClick={() => navigate("/designer")}>
                <PenTool size={18} />
                View My Work
              </button>
            </div>
            <div className="quick-links fade-in-item delay-4" aria-label="Social links">
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon li">
                <Linkedin size={18} />
              </a>
              <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon ig">
                <Instagram size={18} />
              </a>
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon gh">
                <Github size={18} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="social-icon email">
                <Mail size={18} />
              </a>
            </div>
          </div>
          <div className="hero-portrait fade-in-item delay-2" aria-hidden="true">
            {/* Accent shape layers */}
            <div className="portrait-accent-rect"></div>
            <div className="portrait-accent-dots"></div>
            {/* Main image frame */}
            <div className="portrait-frame">
              <img src={profile.portrait} alt={`${profile.name} portrait`} className="hero-portrait-img" />
              <div className="portrait-glare"></div>
            </div>
            {/* Corner brackets */}
            <span className="portrait-bracket top-left">&#x250C;</span>
            <span className="portrait-bracket bottom-right">&#x2518;</span>
            {/* Floating label */}
            <span className="portrait-tag">Ps &bull; Ai &bull; Lr</span>
          </div>
        </section>

        {/* ── Selected Works Preview ── */}
        <section className="featured-works" aria-label="Selected design works">
          <h2 className="section-title">Selected Works</h2>
          <div className="featured-grid">
            {profile.featuredWorks.map((work) => {
              const Icon = work.tab === "uiupc" ? Camera : work.tab === "branding" ? PenTool : Brush;
              return (
                <button
                  key={work.src}
                  className="featured-item hybrid-card ant-selection"
                  onClick={() => navigate(`/designer?tab=${work.tab}`)}
                  aria-label={`View ${work.label} in Designer Studio`}
                >
                  <div className="hybrid-img-wrapper">
                    <img src={work.src} alt={`${work.label} design work`} loading="lazy" />
                  </div>
                  <div className="hybrid-overlay">
                    <div className="hybrid-icon-center">
                      <div className="hybrid-icon-circle">
                        <Icon size={32} />
                      </div>
                    </div>
                    <div className="hybrid-caption">
                      <span className="hybrid-label">{work.label}</span>
                      <span className="hybrid-subtext">Click to explore gallery ✦</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <button className="see-all-link" onClick={() => navigate("/designer")}>
            Browse all 70+ works
            <ArrowRight size={16} />
          </button>
        </section>

        {/* ── Tools & Skills (Infinite Marquee) ── */}
        <section className="marquee-section" aria-label="Tools and skills">
          <h2 className="section-title">Tools & Skills</h2>
          
          {/* Row 1: Design Stack */}
          <div className="marquee-wrapper">
            <h4 className="marquee-label">Design Stack</h4>
            <div className="marquee" data-direction="left">
              <div className="marquee-track">
                <div className="marquee-item"><i className="devicon-photoshop-plain colored"></i><span>Adobe Photoshop</span></div>
                <div className="marquee-item"><i className="devicon-illustrator-plain colored"></i><span>Adobe Illustrator</span></div>
                <div className="marquee-item"><i className="devicon-figma-plain colored"></i><span>Figma</span></div>
                <div className="marquee-item"><i className="devicon-lightroom-plain colored"></i><span>Adobe Lightroom</span></div>
                <div className="marquee-item"><img src="https://cdn.simpleicons.org/picsart/FF1E83" alt="PicsArt" style={{ width: 20, height: 20, borderRadius: 4 }} /><span>PicsArt</span></div>
                <div className="marquee-item"><i className="fa-solid fa-clapperboard" style={{ color: "#00BCFF" }}></i><span>Vegas Pro</span></div>
                <div className="marquee-item"><i className="fa-solid fa-scissors" style={{ color: "#00D2FF" }}></i><span>Capcut</span></div>
                <div className="marquee-item"><i className="fa-brands fa-adobe" style={{ color: "#FF0000" }}></i><span>Adobe Express</span></div>
                
                {/* Duplicated for infinite loop */}
                <div className="marquee-item"><i className="devicon-photoshop-plain colored"></i><span>Adobe Photoshop</span></div>
                <div className="marquee-item"><i className="devicon-illustrator-plain colored"></i><span>Adobe Illustrator</span></div>
                <div className="marquee-item"><i className="devicon-figma-plain colored"></i><span>Figma</span></div>
                <div className="marquee-item"><i className="devicon-lightroom-plain colored"></i><span>Adobe Lightroom</span></div>
                <div className="marquee-item"><img src="https://cdn.simpleicons.org/picsart/FF1E83" alt="PicsArt" style={{ width: 20, height: 20, borderRadius: 4 }} /><span>PicsArt</span></div>
                <div className="marquee-item"><i className="fa-solid fa-clapperboard" style={{ color: "#00BCFF" }}></i><span>Vegas Pro</span></div>
                <div className="marquee-item"><i className="fa-solid fa-scissors" style={{ color: "#00D2FF" }}></i><span>Capcut</span></div>
                <div className="marquee-item"><i className="fa-brands fa-adobe" style={{ color: "#FF0000" }}></i><span>Adobe Express</span></div>
              </div>
            </div>
          </div>

          {/* Row 2: Skills & AI Workflows */}
          <div className="marquee-wrapper">
            <h4 className="marquee-label">Skills & AI Workflows</h4>
            <div className="marquee" data-direction="right">
              <div className="marquee-track">
                <div className="marquee-item"><i className="fa-solid fa-wand-magic-sparkles" style={{ color: "#e2a16f" }}></i><span>AI-Assisted Design</span></div>
                <div className="marquee-item"><i className="fa-solid fa-diagram-project" style={{ color: "#8ba17f" }}></i><span>AI Workflows</span></div>
                <div className="marquee-item"><i className="fa-solid fa-terminal" style={{ color: "#85a7bd" }}></i><span>Prompt Engineering</span></div>
                <div className="marquee-item"><i className="fa-solid fa-fingerprint" style={{ color: "#c96f3d" }}></i><span>Brand Identity</span></div>
                <div className="marquee-item"><i className="fa-solid fa-palette" style={{ color: "#dd6b5c" }}></i><span>Poster Design</span></div>
                <div className="marquee-item"><i className="fa-solid fa-font" style={{ color: "#b9aa98" }}></i><span>Typography</span></div>
                <div className="marquee-item"><i className="fa-solid fa-border-all" style={{ color: "#85a7bd" }}></i><span>Layout & Composition</span></div>
                <div className="marquee-item"><i className="fa-solid fa-sliders" style={{ color: "#8ba17f" }}></i><span>Photo Retouching</span></div>
                
                {/* Duplicated for infinite loop */}
                <div className="marquee-item"><i className="fa-solid fa-wand-magic-sparkles" style={{ color: "#e2a16f" }}></i><span>AI-Assisted Design</span></div>
                <div className="marquee-item"><i className="fa-solid fa-diagram-project" style={{ color: "#8ba17f" }}></i><span>AI Workflows</span></div>
                <div className="marquee-item"><i className="fa-solid fa-terminal" style={{ color: "#85a7bd" }}></i><span>Prompt Engineering</span></div>
                <div className="marquee-item"><i className="fa-solid fa-fingerprint" style={{ color: "#c96f3d" }}></i><span>Brand Identity</span></div>
                <div className="marquee-item"><i className="fa-solid fa-palette" style={{ color: "#dd6b5c" }}></i><span>Poster Design</span></div>
                <div className="marquee-item"><i className="fa-solid fa-font" style={{ color: "#b9aa98" }}></i><span>Typography</span></div>
                <div className="marquee-item"><i className="fa-solid fa-border-all" style={{ color: "#85a7bd" }}></i><span>Layout & Composition</span></div>
                <div className="marquee-item"><i className="fa-solid fa-sliders" style={{ color: "#8ba17f" }}></i><span>Photo Retouching</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── About Me (Layers Panel Style) ── */}
        <section className="home-about-section" id="about-me">
          <div className="about-content">
            <h2 className="section-title">About Me</h2>
            
            <div className="ps-layers-panel">
              <div className="layers-header">
                <span className="layers-title"><i className="fa-solid fa-layer-group" style={{ marginRight: 6 }}></i>Layers</span>
                <div className="layers-controls-bar">
                  <span className="layer-opacity-label">Opacity: {100 - hiddenLayers.length * 25}%</span>
                </div>
              </div>
              
              <div className="layers-stack">
                {aboutLayers.map((layer, index) => {
                  const isHidden = hiddenLayers.includes(index);
                  const isLocked = lockedLayers.includes(index);
                  return (
                    <div 
                      key={index} 
                      className={`layer-row ${isHidden ? "layer-hidden" : ""} ${isLocked ? "layer-locked" : ""}`}
                    >
                      {/* Visibility Column */}
                      <button 
                        className="layer-visibility-btn" 
                        onClick={() => toggleLayerVisibility(index)}
                        disabled={isLocked}
                        title={isLocked ? "Unlock to toggle visibility" : isHidden ? "Show layer" : "Hide layer"}
                      >
                        {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>

                      {/* Thumbnail Column */}
                      <div className="layer-thumbnail">
                        {layer.type === "text" ? (
                          <span className="layer-type-t">T</span>
                        ) : (
                          <i className="fa-solid fa-shapes" style={{ color: "var(--accent)" }}></i>
                        )}
                      </div>

                      {/* Content Column */}
                      <div className="layer-info">
                        <span className="layer-name-tag">{layer.name}</span>
                        <p className="layer-text-body">{layer.text}</p>
                      </div>

                      {/* Lock Column */}
                      <button 
                        className="layer-lock-btn" 
                        onClick={() => toggleLayerLock(index)}
                        title={isLocked ? "Unlock layer" : "Lock layer"}
                      >
                        {isLocked ? (
                          <i className="fa-solid fa-lock" style={{ color: "#E2A16F" }}></i>
                        ) : (
                          <i className="fa-solid fa-lock-open unlock-icon"></i>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Designing with AI ── */}
        <section className="home-ai-section">
          <div 
            className="ai-content-card ant-selection"
            title="AI enhanced workflow"
          >
            <div className="ai-generation-anim"></div>
            <div className="ai-card-title-row" style={{ position: 'relative', zIndex: 2 }}>
              <Sparkles size={20} className="ai-spark-icon" />
              <h3>{profile.aiDesign.headline}</h3>
            </div>
            <p className="ai-description" style={{ position: 'relative', zIndex: 2 }}>{profile.aiDesign.description}</p>
          </div>
        </section>

        {/* ── Art Exhibition Spotlight ── */}
        <section className="home-exhibition-section">
          <div className="exhibition-visual ant-selection">
            <img src={exhibition.photo} alt="Ishrak at the exhibition" className="exhibition-main-img" />
          </div>
          <div className="exhibition-details-panel">
            <div className="exhibition-header-row">
              <Award size={20} className="exhibition-award-icon" />
              <span className="exhibition-eyebrow">Art Exhibition</span>
            </div>
            <h2>{exhibition.segment}</h2>
            <p className="exhibition-event-title">{exhibition.title}</p>
            <p className="exhibition-text">{exhibition.description}</p>
            <div className="exhibition-tag-list">
              {exhibition.posters.map((poster) => (
                <span key={poster.number} className="exhibition-tag">
                  #{poster.number} {poster.title}
                </span>
              ))}
            </div>
          </div>
        </section>
        

        {/* ── Contact footer ── */}
        <footer className="home-footer">
          <div className="footer-contact">
            <a href={`mailto:${profile.email}`}>
              <Mail size={16} />
              {profile.email}
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
          <button className="footer-dev-link" onClick={() => navigate("/developer")}>
            <Code2 size={16} />
            View Developer Portfolio
            <ArrowRight size={14} />
          </button>
        </footer>
      </main>
    </>
  );
}

/* ─────────────────── DEVELOPER WORKSPACE (kept intact) ─────────────────── */

function DeveloperWorkspace({ navigate, theme, toggleTheme }) {
  const [activeActivity, setActiveActivity] = useState("explorer");
  const [openFile, setOpenFile] = useState("about");
  const [openTabs, setOpenTabs] = useState([{ key: "file:about", type: "file", id: "about", label: "about.ishrak" }]);
  const [activeProject, setActiveProject] = useState(projects[0].name);
  const [searchValue, setSearchValue] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState([
    "portfolio@ishrak: workspace ready",
    "Loaded developer profile, projects, experience, and contact links."
  ]);
  const activeProjectData = projects.find((project) => project.name === activeProject) || projects[0];
  const currentTabKey = openFile === "project" ? `project:${activeProject}` : `file:${openFile}`;

  const addTerminalLine = (line) => {
    setTerminalLines((current) => [...current.slice(-6), line]);
  };

  const ensureTab = (tab) => {
    setOpenTabs((current) => (current.some((item) => item.key === tab.key) ? current : [...current, tab]));
  };

  const openDocument = (fileId) => {
    const file = editorFiles.find((item) => item.id === fileId);
    setOpenFile(fileId);
    ensureTab({ key: `file:${fileId}`, type: "file", id: fileId, label: file?.label || "portfolio.md" });
    addTerminalLine(`Opened ${file?.label || fileId}`);
  };

  const openProject = (projectName) => {
    setActiveProject(projectName);
    setOpenFile("project");
    ensureTab({ key: `project:${projectName}`, type: "project", id: projectName, label: `${projectName}.md` });
    addTerminalLine(`Opened projects/${projectName.toLowerCase().replaceAll(" ", "-")}.md`);
  };

  const activateTab = (tab) => {
    if (tab.type === "project") {
      setActiveProject(tab.id);
      setOpenFile("project");
      return;
    }
    setOpenFile(tab.id);
  };

  const closeTab = (event, tab) => {
    event.stopPropagation();
    setOpenTabs((current) => {
      if (current.length === 1) return current;
      const nextTabs = current.filter((item) => item.key !== tab.key);
      if (tab.key === currentTabKey) {
        const nextTab = nextTabs[nextTabs.length - 1];
        setTimeout(() => activateTab(nextTab), 0);
      }
      return nextTabs;
    });
  };

  const runCommand = (command) => {
    const outputs = {
      "npm run projects": `${projects.length} projects loaded from Ishrak's portfolio data.`,
      "git remote -v": `origin ${profile.socials.github}`,
      "cat contact.http": `${profile.email} | ${profile.socials.linkedin}`,
      "node ai-workflow.js": "AI workflow: prompt engineering, model selection, vision workflows, assisted development.",
      "open designer": "Switching to the Photoshop-inspired designer studio.",
      "clear": "Terminal cleared."
    };
    if (command === "clear") {
      setTerminalLines(["portfolio@ishrak: terminal cleared"]);
      return;
    }
    if (command === "open designer") {
      addTerminalLine(`> ${command}`);
      addTerminalLine(outputs[command]);
      navigate("/designer");
      return;
    }
    addTerminalLine(`> ${command}`);
    addTerminalLine(outputs[command] || `Command not found: ${command}`);
  };

  const submitTerminal = (event) => {
    event.preventDefault();
    const command = terminalInput.trim();
    if (!command) return;
    setTerminalInput("");
    runCommand(command);
  };

  const executeCommand = (command) => {
    setPaletteOpen(false);
    setCommandQuery("");
    command.action();
  };

  const commandItems = [
    { label: "Open about.ishrak", group: "File", action: () => openDocument("about") },
    { label: "Open tech-stack.json", group: "File", action: () => openDocument("stack") },
    { label: "Open experience.md", group: "File", action: () => openDocument("experience") },
    { label: "Open contact.http", group: "File", action: () => openDocument("contact") },
    { label: "Show project search", group: "View", action: () => setActiveActivity("search") },
    { label: "Show source control", group: "View", action: () => setActiveActivity("source") },
    { label: "Run npm run projects", group: "Run", action: () => runCommand("npm run projects") },
    { label: "Run AI workflow", group: "Run", action: () => runCommand("node ai-workflow.js") },
    { label: "Open designer studio", group: "Go", action: () => navigate("/designer") },
    ...projects.map((project) => ({
      label: `Open ${project.name}`,
      group: "Projects",
      action: () => openProject(project.name)
    }))
  ];

  const filteredCommands = commandItems.filter((item) =>
    `${item.group} ${item.label}`.toLowerCase().includes(commandQuery.toLowerCase())
  );

  const menuItems = {
    File: [
      { label: "Open About", action: () => openDocument("about") },
      { label: "Open Contact", action: () => openDocument("contact") }
    ],
    Edit: [
      { label: "Copy Email", action: () => navigator.clipboard?.writeText(profile.email) },
      { label: "Clear Terminal", action: () => runCommand("clear") }
    ],
    Selection: [
      { label: "Select AEGIS", action: () => openProject("AEGIS") },
      { label: "Select Echo", action: () => openProject("Echo") }
    ],
    View: [
      { label: "Explorer", action: () => setActiveActivity("explorer") },
      { label: "Search", action: () => setActiveActivity("search") },
      { label: "Extensions", action: () => setActiveActivity("extensions") }
    ],
    Go: [
      { label: "Developer Home", action: () => openDocument("about") },
      { label: "Designer Studio", action: () => navigate("/designer") },
      { label: "Landing Page", action: () => navigate("/") }
    ],
    Run: [
      { label: "List Projects", action: () => runCommand("npm run projects") },
      { label: "AI Workflow", action: () => runCommand("node ai-workflow.js") }
    ],
    Terminal: [
      { label: "Git Remote", action: () => runCommand("git remote -v") },
      { label: "Contact Route", action: () => runCommand("cat contact.http") },
      { label: "Clear", action: () => runCommand("clear") }
    ],
    Help: [
      { label: "GitHub Profile", action: () => window.open(profile.socials.github, "_blank", "noopener") },
      { label: "LinkedIn Profile", action: () => window.open(profile.socials.linkedin, "_blank", "noopener") }
    ]
  };

  return (
    <div className="desktop-frame vscode-frame">
      <header className="vscode-titlebar">
        <div className="window-controls">
          <span />
          <span />
          <span />
        </div>
        <nav className="desktop-menu" aria-label="Developer menu">
          {["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"].map((item) => (
            <span className="menu-wrap" key={item}>
              <button onClick={() => setActiveMenu(activeMenu === item ? null : item)}>{item}</button>
              {activeMenu === item && (
                <div className="menu-popover">
                  {menuItems[item].map((menuItem) => (
                    <button
                      key={menuItem.label}
                      onClick={() => {
                        setActiveMenu(null);
                        menuItem.action();
                      }}
                    >
                      {menuItem.label}
                    </button>
                  ))}
                </div>
              )}
            </span>
          ))}
        </nav>
        <button className="command-center" onClick={() => setPaletteOpen(true)}>
          <Search size={14} />
          <span>ishrak-portfolio</span>
        </button>
        <div className="desktop-actions">
          <button className="icon-button" onClick={() => navigate("/")} aria-label="Home">
            <Home size={17} />
          </button>
          <ThemeButton theme={theme} toggleTheme={toggleTheme} compact />
        </div>
      </header>

      <div className="vscode-body">
        <aside className="activity-bar">
          {activityItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={activeActivity === item.id ? "active" : ""}
                onClick={() => setActiveActivity(item.id)}
                title={item.label}
                aria-label={item.label}
              >
                <Icon size={21} />
              </button>
            );
          })}
          <button className="activity-bottom" onClick={() => navigate("/designer")} title="Designer" aria-label="Designer">
            <Palette size={21} />
          </button>
        </aside>

        <DeveloperSidebar
          activeActivity={activeActivity}
          openFile={openFile}
          setOpenFile={setOpenFile}
          activeProject={activeProject}
          openProject={openProject}
          openDocument={openDocument}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          runCommand={runCommand}
        />

        <main className="editor-area">
          <div className="editor-tabs">
            {openTabs.map((tab) => (
              <button
                key={tab.key}
                className={currentTabKey === tab.key ? "active" : ""}
                onClick={() => activateTab(tab)}
              >
                {tab.label}
                <span
                  role="button"
                  tabIndex={0}
                  className="tab-close"
                  onClick={(event) => closeTab(event, tab)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") closeTab(event, tab);
                  }}
                >
                  <X size={13} />
                </span>
              </button>
            ))}
          </div>

          <section className="editor-content">
            <EditorFileContent
              openFile={openFile}
              activeProject={activeProjectData}
              openProject={openProject}
              setOpenFile={openDocument}
            />
          </section>

          <section className="terminal-panel">
            <div className="terminal-tabs">
              <span>TERMINAL</span>
              <span>PORTFOLIO</span>
            </div>
            <div className="terminal-output">
              {terminalLines.map((line, index) => (
                <p key={`${line}-${index}`}>{line}</p>
              ))}
            </div>
            <form className="terminal-input" onSubmit={submitTerminal}>
              <span>$</span>
              <input
                value={terminalInput}
                onChange={(event) => setTerminalInput(event.target.value)}
                placeholder="Try npm run projects, git remote -v, cat contact.http"
              />
            </form>
          </section>
        </main>
      </div>

      {paletteOpen && (
        <div className="command-palette" role="dialog" aria-label="Command palette">
          <div className="palette-box">
            <label>
              <Command size={17} />
              <input
                autoFocus
                value={commandQuery}
                onChange={(event) => setCommandQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setPaletteOpen(false);
                }}
                placeholder="Search files, projects, commands"
              />
              <button onClick={() => setPaletteOpen(false)} aria-label="Close command palette">
                <X size={17} />
              </button>
            </label>
            <div className="palette-results">
              {filteredCommands.slice(0, 9).map((command) => (
                <button key={`${command.group}-${command.label}`} onClick={() => executeCommand(command)}>
                  <span>{command.group}</span>
                  {command.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="status-bar">
        <span>main</span>
        <span>{projects.length} projects</span>
        <span>UTF-8</span>
        <span>{profile.location}</span>
      </footer>
    </div>
  );
}

/* ─────────────────── DEVELOPER SIDEBAR ─────────────────── */

function DeveloperSidebar({
  activeActivity,
  openFile,
  openDocument,
  activeProject,
  openProject,
  searchValue,
  setSearchValue,
  runCommand
}) {
  const matchingProjects = projects.filter((project) =>
    `${project.name} ${project.description} ${project.stack.join(" ")}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  if (activeActivity === "search") {
    return (
      <aside className="developer-sidebar">
        <SidebarHeading title="Search" />
        <input
          className="sidebar-input"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search projects or skills"
        />
        <div className="search-results">
          {(searchValue ? matchingProjects : projects.slice(0, 5)).map((project) => (
            <button key={project.name} onClick={() => openProject(project.name)}>
              <Search size={14} />
              <span>{project.name}</span>
              <small>{project.type}</small>
            </button>
          ))}
        </div>
      </aside>
    );
  }

  if (activeActivity === "source") {
    return (
      <aside className="developer-sidebar">
        <SidebarHeading title="Source Control" />
        <div className="repo-summary">
          <Github size={20} />
          <div>
            <strong>Ishrak-1520</strong>
            <span>{repoStats.publicRepos} public repositories</span>
          </div>
        </div>
        <div className="repo-list">
          {projects
            .filter((project) => project.repo)
            .map((project) => (
              <a key={project.name} href={project.repo} target="_blank" rel="noreferrer">
                <Github size={14} />
                {project.name}
              </a>
            ))}
        </div>
      </aside>
    );
  }

  if (activeActivity === "run") {
    return (
      <aside className="developer-sidebar">
        <SidebarHeading title="Run" />
        <div className="command-list">
          {["npm run projects", "git remote -v", "cat contact.http", "node ai-workflow.js"].map((command) => (
            <button key={command} onClick={() => runCommand(command)}>
              <Play size={14} />
              {command}
            </button>
          ))}
        </div>
      </aside>
    );
  }

  if (activeActivity === "extensions") {
    return (
      <aside className="developer-sidebar">
        <SidebarHeading title="Extensions" />
        <div className="extension-grid">
          {profile.developerStack.slice(0, 12).map((skill) => (
            <button key={skill} onClick={() => openDocument("stack")}>
              <CheckCircle2 size={14} />
              <span>{skill}</span>
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="developer-sidebar">
      <SidebarHeading title="Explorer" />
      <div className="tree-root">
        <button className="tree-folder">
          <ChevronDown size={14} />
          ISHRAK
        </button>
        <div className="tree-files">
          {editorFiles.map((file) => {
            const Icon = file.icon;
            return (
              <button
                key={file.id}
                className={openFile === file.id ? "active" : ""}
                onClick={() => openDocument(file.id)}
              >
                <Icon size={14} />
                {file.label}
              </button>
            );
          })}
          <button className="tree-folder nested">
            <ChevronDown size={14} />
            projects
          </button>
          <div className="tree-projects">
            {projects.map((project) => (
              <button
                key={project.name}
                className={activeProject === project.name && openFile === "project" ? "active" : ""}
                onClick={() => openProject(project.name)}
              >
                <FileCode2 size={13} />
                {project.name}.md
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarHeading({ title }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="sidebar-heading">
        <span>{title}</span>
        <button onClick={() => setOpen((current) => !current)} aria-label="Panel options">
          <Menu size={15} />
        </button>
      </div>
      {open && (
        <div className="sidebar-options">
          <span>{title} panel active</span>
          <span>Use the items below to open files, projects, and commands.</span>
        </div>
      )}
    </>
  );
}

/* ─────────────────── EDITOR FILE CONTENT ─────────────────── */

function EditorFileContent({ openFile, activeProject, openProject, setOpenFile }) {
  if (openFile === "stack") {
    const devEnd = 3 + profile.developerStack.length;
    const aiStart = devEnd + 1;
    const aiEnd = aiStart + 1 + profile.aiSkills.length;
    return (
      <div className="code-doc">
        <CodeLine n="01" code={'{'} />
        <CodeLine n="02" code={'  "developer": ['} />
        <TagLines start={3} values={profile.developerStack} />
        <CodeLine n={String(devEnd).padStart(2, "0")} code={"  ],"} />
        <CodeLine n={String(devEnd + 1).padStart(2, "0")} code={'  "ai": ['} />
        <TagLines start={aiStart + 1} values={profile.aiSkills} />
        <CodeLine n={String(aiEnd).padStart(2, "0")} code={"  ],"} />
        <CodeLine n={String(aiEnd + 1).padStart(2, "0")} code={'  "projects": "GitHub + private Unity build"'} />
        <CodeLine n={String(aiEnd + 2).padStart(2, "0")} code={"}"} />
      </div>
    );
  }

  if (openFile === "experience") {
    return (
      <div className="markdown-doc">
        <h2>Experience</h2>
        <div className="timeline-list">
          {experiences.map((item) => (
            <article key={`${item.title}-${item.period}`}>
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <strong>{item.org}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (openFile === "education") {
    return (
      <div className="markdown-doc">
        <h2>Education</h2>
        <div className="education-grid">
          {profile.education.map((item) => (
            <article key={item.institution}>
              <span>{item.period}</span>
              <h3>{item.institution}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (openFile === "game") {
    return (
      <div className="code-doc">
        <CodeLine n="01" code={"public class IshrakPlatformer : UnityGame"} />
        <CodeLine n="02" code={"{"} />
        <CodeLine n="03" code={'  engine = "Unity 6";'} />
        <CodeLine n="04" code={'  genre = "2D platformer";'} />
        <CodeLine n="05" code={'  language = "C#";'} />
        <CodeLine n="06" code={'  repository = "private";'} />
        <CodeLine n="07" code={"  experience = true;"} />
        <CodeLine n="08" code={"}"} />
      </div>
    );
  }

  if (openFile === "contact") {
    return (
      <div className="http-doc">
        <p>
          <span>GET</span> /contact
        </p>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.socials.github} target="_blank" rel="noreferrer">
          {profile.socials.github}
        </a>
        <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
          {profile.socials.linkedin}
        </a>
        <a href={profile.socials.instagram} target="_blank" rel="noreferrer">
          {profile.socials.instagram}
        </a>
      </div>
    );
  }

  if (openFile === "project") {
    return (
      <div className="project-doc">
        <div className="doc-toolbar">
          <span>{activeProject.type}</span>
          <div>
            {activeProject.live && (
              <a href={activeProject.live} target="_blank" rel="noreferrer">
                <ExternalLink size={15} />
                Live
              </a>
            )}
            {activeProject.repo && (
              <a href={activeProject.repo} target="_blank" rel="noreferrer">
                <Github size={15} />
                GitHub
              </a>
            )}
          </div>
        </div>
        <h2>{activeProject.name}</h2>
        <p>{activeProject.description}</p>
        <div className="project-meta">
          <span>{activeProject.year}</span>
          <span>{activeProject.status}</span>
        </div>
        <div className="stack-row">
          {activeProject.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="detail-list">
          {activeProject.details.map((item) => (
            <p key={item}>
              <CheckCircle2 size={15} />
              {item}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="about-doc">
      <div className="about-header">
        <img src={profile.portrait} alt="Ishrak Ahmed" />
        <div>
          <span className="eyebrow">about.ishrak</span>
          <h2>{profile.name}</h2>
          <p>{profile.role}</p>
        </div>
      </div>
      <div className="about-grid-editor">
        <article>
          <h3>Developer profile</h3>
          {profile.developerHighlights.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </article>
        <article>
          <h3>Current focus</h3>
          <p>
            Full-stack apps, AI tools, cybersecurity utilities, desktop assistants, practical databases, and interactive
            portfolio experiences.
          </p>
        </article>
      </div>
      <div className="project-switcher">
        {projects.slice(0, 6).map((project) => (
          <button key={project.name} onClick={() => openProject(project.name)}>
            <FileCode2 size={15} />
            {project.name}
          </button>
        ))}
        <button onClick={() => setOpenFile("stack")}>
          <Database size={15} />
          Tech stack
        </button>
      </div>
    </div>
  );
}

function CodeLine({ n, code }) {
  return (
    <p className="code-line">
      <span>{n}</span>
      <code>{code}</code>
    </p>
  );
}

function TagLines({ start, values }) {
  return values.map((value, index) => (
    <CodeLine
      key={value}
      n={String(start + index).padStart(2, "0")}
      code={`    "${value}"${index === values.length - 1 ? "" : ","}`}
    />
  ));
}

/* ─────────────────── DESIGNER STUDIO (decluttered) ─────────────────── */

function DesignerStudio({ path, navigate, theme, toggleTheme }) {
  const getDocIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab") || params.get("doc") || window.location.hash.replace("#", "");
    if (tabParam) {
      const found = designDocuments.find((d) => d.id === tabParam || d.galleryKey === tabParam);
      if (found) return found.id;
    }
    return null;
  };

  const [activeTool, setActiveTool] = useState("brush");
  const [selectedDoc, setSelectedDoc] = useState(() => getDocIdFromUrl() || designDocuments[0].id);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [showExhibition, setShowExhibition] = useState(false);

  useEffect(() => {
    const targetDocId = getDocIdFromUrl();
    if (targetDocId && targetDocId !== selectedDoc) {
      setSelectedDoc(targetDocId);
    }
  }, [path]);

  const selectedDocument = designDocuments.find((d) => d.id === selectedDoc) || designDocuments[0];
  const currentImages = galleryImages[selectedDocument.galleryKey] || [];
  const activeToolMeta = designerTools.find((tool) => tool.id === activeTool) || designerTools[0];

  const selectDocument = (documentId) => {
    const doc = designDocuments.find((d) => d.id === documentId);
    if (!doc) return;
    setSelectedDoc(documentId);
    if (navigate) {
      navigate(`/designer?tab=${doc.galleryKey || doc.id}`, { scrollToTop: false });
    }
  };

  const openLightbox = (imageSrc) => setLightboxImage(imageSrc);
  const closeLightbox = () => setLightboxImage(null);

  const navigateLightbox = (direction) => {
    if (!lightboxImage) return;
    const idx = currentImages.indexOf(lightboxImage);
    if (idx === -1) return;
    const nextIdx = (idx + direction + currentImages.length) % currentImages.length;
    setLightboxImage(currentImages[nextIdx]);
  };

  return (
    <div className="desktop-frame photoshop-frame">
      <header className="photoshop-titlebar">
        <div className="ps-brand">
          <span>Ps</span>
          <strong>{selectedDocument.label}</strong>
        </div>
        <nav className="desktop-menu" aria-label="Designer menu">
          {["File", "Edit", "Image", "Layer", "Type", "Select", "Filter", "View"].map((item) => (
            <button key={item}>{item}</button>
          ))}
        </nav>
        <div className="desktop-actions">
          <button className="icon-button" onClick={() => navigate("/")} aria-label="Home">
            <Home size={17} />
          </button>
          <button className="icon-button" onClick={() => navigate("/developer")} aria-label="Developer">
            <Code2 size={17} />
          </button>
          <ThemeButton theme={theme} toggleTheme={toggleTheme} compact />
        </div>
      </header>

      <section className="ps-options">
        <span>{activeToolMeta.label}</span>
        <span className="ps-options-doc">{selectedDocument.title}</span>
        <span className="ps-options-count">{currentImages.length} works</span>
        <button onClick={() => setShowExhibition(true)}>
          <Award size={15} />
          Exhibition
        </button>
      </section>

      <div className="photoshop-body">
        <aside className="tool-rail">
          {designerTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                className={activeTool === tool.id ? "active" : ""}
                onClick={() => setActiveTool(tool.id)}
                title={tool.label}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </aside>

        <main className="studio-canvas-zone">
          <div className="document-tabs">
            {designDocuments.map((document) => (
              <button
                key={document.id}
                className={selectedDoc === document.id ? "active" : ""}
                onClick={() => selectDocument(document.id)}
              >
                {document.label}
              </button>
            ))}
          </div>

          <section className="canvas-stage gallery-stage">
            <div className="gallery-header">
              <div>
                <h2 className="gallery-title">{selectedDocument.title}</h2>
                <p className="gallery-subtitle">{selectedDocument.subtitle}</p>
              </div>
              <span className="gallery-count">{currentImages.length} works</span>
            </div>
            <div className="gallery-grid">
              {currentImages.map((src, index) => (
                <button
                  key={src}
                  className="gallery-item"
                  onClick={() => openLightbox(src)}
                  aria-label={`View design ${index + 1}`}
                >
                  <img src={src} alt={`${selectedDocument.title} design ${index + 1}`} loading="lazy" />
                  <span className="gallery-item-overlay">
                    <Maximize2 size={20} />
                  </span>
                </button>
              ))}
            </div>
          </section>
        </main>

        <aside className="studio-panels">
          <section className="panel-block">
            <div className="panel-title">
              <Layers size={15} />
              Categories
            </div>
            <div className="panel-list">
              {designDocuments.map((doc) => (
                <button
                  key={doc.id}
                  className={selectedDoc === doc.id ? "active" : ""}
                  onClick={() => selectDocument(doc.id)}
                >
                  {doc.title}
                </button>
              ))}
            </div>
          </section>

          <section className="panel-block">
            <div className="panel-title">
              <Award size={15} />
              Exhibition
            </div>
            <div className="panel-exhibition">
              <button className="exhibition-panel-btn" onClick={() => setShowExhibition(true)}>
                <img src={exhibition.photo} alt="Exhibition" />
                <div>
                  <strong>{exhibition.segment}</strong>
                  <small>{exhibition.posters.length} posters selected</small>
                </div>
              </button>
            </div>
          </section>
        </aside>
      </div>

      <footer className="ps-status">
        <span>{activeToolMeta.label}</span>
        <span>{selectedDocument.title}</span>
        <span>{currentImages.length} works</span>
        <a href={profile.socials.instagram} target="_blank" rel="noreferrer">
          Instagram portfolio
        </a>
      </footer>

      {/* ── Lightbox ── */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox} role="dialog" aria-label="Full-view image">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            <X size={24} />
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <img
            src={lightboxImage}
            alt="Full-view design"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
          <span className="lightbox-counter">
            {currentImages.indexOf(lightboxImage) + 1} / {currentImages.length}
          </span>
        </div>
      )}

      {/* ── Exhibition overlay ── */}
      {showExhibition && (
        <div className="lightbox-overlay exhibition-overlay" onClick={() => setShowExhibition(false)} role="dialog" aria-label="Exhibition details">
          <div className="exhibition-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setShowExhibition(false)} aria-label="Close">
              <X size={24} />
            </button>
            <img src={exhibition.photo} alt="Ishrak at the exhibition" className="exhibition-modal-image" />
            <div className="exhibition-modal-content">
              <span className="eyebrow">
                <Award size={14} />
                Exhibition feature
              </span>
              <h2>{exhibition.segment}</h2>
              <p className="exhibition-event-name">{exhibition.title}</p>
              <p className="exhibition-organizer">Organized by {exhibition.organizer}</p>
              <p>{exhibition.description}</p>
              <div className="exhibition-posters">
                <h3>Selected Posters</h3>
                {exhibition.posters.map((poster) => (
                  <div key={poster.number} className="exhibition-poster-item">
                    <span className="poster-number">#{poster.number}</span>
                    <span className="poster-title">{poster.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}createRoot(document.getElementById("root")).render(<App />);
