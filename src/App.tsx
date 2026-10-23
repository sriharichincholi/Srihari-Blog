import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import fm from 'front-matter';
import { motion } from 'framer-motion';
import { 
  FileText, 
  FolderCode,
  Tag as TagIcon, 
  User, 
  Sun, 
  Moon, 
  ChevronRight, 
  SortAsc, 
  Calendar, 
  Check, 
  X,
  Terminal,
  Cpu,
  ExternalLink,
  Code2,
  Gamepad2,
  GraduationCap,
  Sparkles,
  Send
} from 'lucide-react';
import { TetrisCanvas } from './components/TetrisCanvas';
import { TypewriterOnScroll } from './components/TypewriterOnScroll';
import { PROJECTS_DATA, type ProjectItem } from './projectsData';

// --- TYPES ---
export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  readTime: string;
  excerpt: string;
}

export interface Post {
  id: string;
  frontmatter: PostFrontmatter;
  content: string;
}

// --- DYNAMICALLY LOAD ALL MARKDOWN POSTS ---
const rawPostFiles = import.meta.glob(['./Posts/*.md*', './posts/*.md*'], { query: '?raw', import: 'default', eager: true });

const POSTS: Post[] = Object.keys(rawPostFiles).map((filePath) => {
  const fileContent = rawPostFiles[filePath] as string;
  const parsed = fm<PostFrontmatter>(fileContent);
  const id = filePath.replace(/^.*\//, '').replace(/\.md(\.md)?$/, '');

  return {
    id,
    frontmatter: parsed.attributes,
    content: parsed.body,
  };
});

// Extract all unique tags across all posts
const ALL_TAGS = Array.from(
  new Set(POSTS.flatMap(p => p.frontmatter.tags || []))
);

export default function App() {
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'Posts' | 'Projects' | 'Tags' | 'About me'>('Posts');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<'Date' | 'Alphabetical'>('Date');
  const [isPostsMenuOpen, setIsPostsMenuOpen] = useState<boolean>(false);
  const [isTagsMenuOpen, setIsTagsMenuOpen] = useState<boolean>(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Tabbed Section State for "WHAT I KNOW"
  const [skillsTab, setSkillsTab] = useState<'Skills' | 'Education' | 'Currently Learning'>('Skills');

  // Flip Card states
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredPosts = POSTS.filter(post => {
    if (selectedTags.length === 0) return true;
    return selectedTags.every(tag => post.frontmatter.tags?.includes(tag));
  }).sort((a, b) => {
    if (sortOption === 'Date') {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    } else {
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    }
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  const scrollToAboutMe = () => {
    setShowLanding(false);
    setActiveTab('About me');
    setActivePost(null);
    setActiveProject(null);
    setTimeout(() => {
      const el = document.getElementById('about-me');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // --- MATRIX CANVAS EFFECT FOR BACKGROUND ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '0101010101ABCDEF0123456789<>/{}[];:=+*#';
    const fontSize = 14;
    const maxColumns = Math.floor((canvas.width * 0.5) / fontSize);
    const drops: number[] = Array(maxColumns).fill(1);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      ctx.fillStyle = darkMode ? 'rgba(5, 7, 5, 0.12)' : 'rgba(248, 250, 252, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (darkMode) {
        ctx.fillStyle = (!showLanding && activeTab === 'Projects') ? '#00f0ff' : '#00ff66';
      } else {
        ctx.fillStyle = '#8b5cf6';
      }
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showLanding, activeTab, darkMode]);

  // --- TOP FLOATING NAVBAR ---
  const TopNavbar = () => (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 rounded-full bg-emerald-950/40 backdrop-blur-md border border-emerald-500/20 shadow-lg shadow-emerald-950/50 flex items-center gap-6 text-xs font-mono">
      <button
        onClick={() => setShowLanding(true)}
        className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer"
      >
        Home
      </button>
      <button
        onClick={scrollToAboutMe}
        className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer"
      >
        About
      </button>
      <button
        onClick={() => {
          setShowLanding(false);
          setActiveTab('About me');
          setActivePost(null);
          setActiveProject(null);
          setTimeout(() => {
            const el = document.getElementById('skills-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer"
      >
        Skills
      </button>
      <button
        onClick={() => {
          setShowLanding(false);
          setActiveTab('Projects');
          setActivePost(null);
          setActiveProject(null);
        }}
        className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        Projects
      </button>
      <button
        onClick={() => {
          setShowLanding(false);
          setActiveTab('Posts');
          setActivePost(null);
          setActiveProject(null);
        }}
        className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer"
      >
        Blog
      </button>
    </nav>
  );

  // --- LANDING PAGE ---
  if (showLanding) {
    return (
      <div className={`relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden ${darkMode ? 'bg-[#050705] text-gray-100' : 'bg-slate-50 text-gray-900'}`}>
        <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-70" />

        <TopNavbar />

        <div className="relative z-10 p-6 flex justify-end pt-20">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-lg border transition-all ${
              darkMode 
                ? 'border-gray-800 bg-[#0a0d0a]/80 text-[#00ff66] hover:border-[#00ff66]' 
                : 'border-gray-200 bg-white/80 text-[#8b5cf6] hover:border-[#8b5cf6]'
            }`}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <main className="relative z-10 max-w-6xl mx-auto px-6 w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              RESEARCH & ENGINEERING LAB
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-mono mb-4">
              <span className="inline-block">SRIHARI</span>{' '}
              <span className={`inline-block ${darkMode ? 'text-[#00ff66]' : 'text-[#8b5cf6]'}`}>
                CHINCHOLI
              </span>
            </h1>

            <div className="text-lg md:text-xl text-gray-400 max-w-2xl font-light mb-8 leading-relaxed font-mono min-h-[3.5rem]">
              <TypewriterOnScroll
                text="Experimenting with low-latency architectures, algorithmic efficiency, and quantitative systems."
                speed={25}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setActiveTab('Posts');
                  setActivePost(null);
                  setActiveProject(null);
                  setShowLanding(false);
                }}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded font-mono font-medium transition-all duration-200 cursor-pointer bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
              >
                <span>Posts</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('Projects');
                  setActivePost(null);
                  setActiveProject(null);
                  setShowLanding(false);
                }}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded font-mono font-medium border transition-all duration-200 cursor-pointer bg-emerald-900/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
              >
                <Code2 size={16} />
                <span>Projects</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToAboutMe}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded font-mono font-medium border transition-all duration-200 cursor-pointer bg-rose-950/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/20"
              >
                <User size={16} />
                <span>About me</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Tetris Visualization */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <TetrisCanvas darkMode={darkMode} />
          </div>
        </main>

        <footer className="relative z-10 text-center py-6 text-xs font-mono text-gray-500 border-t border-gray-800/40">
          © Srihari Chincholi
        </footer>
      </div>
    );
  }

  // Determine active dark mode primary accent for current view
  const isProjectsView = activeTab === 'Projects';

  // --- MAIN BLOG / PROJECTS INTERFACE ---
  return (
    <div className={`relative min-h-screen flex flex-col justify-between ${darkMode ? 'bg-[#050705] text-gray-200' : 'bg-slate-50 text-gray-800'}`}>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-70" />

      <TopNavbar />

      {/* Top Controls */}
      <header className={`relative z-40 w-full border-b px-6 py-4 pt-16 flex justify-between items-center backdrop-blur sticky top-0 ${
        darkMode ? 'border-gray-800/60 bg-[#050705]/90' : 'border-gray-200 bg-slate-50/90'
      }`}>
        <button 
          onClick={() => setShowLanding(true)}
          className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Terminal size={14} className={darkMode ? (isProjectsView ? 'text-[#00f0ff]' : 'text-[#00ff66]') : 'text-[#8b5cf6]'} />
          <span>[return to intro]</span>
        </button>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded border transition-all cursor-pointer ${
            darkMode 
              ? isProjectsView
                ? 'border-cyan-900/60 bg-[#0a0d0a] text-[#00f0ff] hover:border-[#00f0ff]'
                : 'border-gray-800 bg-[#0a0d0a] text-[#00ff66] hover:border-[#00ff66]'
              : 'border-gray-200 bg-white text-[#8b5cf6] hover:border-[#8b5cf6]'
          }`}
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      {/* Main Grid */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-10 flex-1 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: TITLE & NAVIGATION */}
        <aside className="md:col-span-4 lg:col-span-4 flex flex-col justify-start">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight font-sans leading-tight">
              <TypewriterOnScroll text="Srihari's Blog." className="block" speed={30} />
              <div className="text-gray-400 font-normal mt-1">
                <TypewriterOnScroll text="Experimenting and" speed={30} delay={400} />
              </div>
              <div className="text-gray-400 font-normal">
                <TypewriterOnScroll text="Implementing" speed={30} delay={800} />
              </div>
              <div className={`font-mono font-bold ${
                darkMode
                  ? isProjectsView ? 'text-[#00f0ff]' : 'text-[#00ff66]'
                  : 'text-[#8b5cf6]'
              }`}>
                <TypewriterOnScroll text="Efficient code" speed={30} delay={1200} />
              </div>
            </h1>
          </div>

          <nav className="flex flex-col gap-3 relative" aria-label="Primary Navigation">
            {/* Nav 1: Posts */}
            <div 
              className="relative"
              onMouseEnter={() => setIsPostsMenuOpen(true)}
              onMouseLeave={() => setIsPostsMenuOpen(false)}
            >
              <button
                onClick={() => {
                  setActiveTab('Posts');
                  setActivePost(null);
                  setActiveProject(null);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded border text-left font-mono text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === 'Posts'
                    ? darkMode 
                      ? 'border-[#00ff66] bg-[#00ff66]/10 text-[#00ff66]' 
                      : 'border-[#8b5cf6] bg-[#8b5cf6]/10 text-[#8b5cf6]'
                    : darkMode
                      ? 'border-gray-800 bg-[#0a0d0a] text-gray-300 hover:border-[#00ff66] hover:text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-[#8b5cf6] hover:text-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText size={16} />
                  <span className="font-semibold">Posts</span>
                </div>
                <span className="text-xs opacity-60 font-mono">[{filteredPosts.length}]</span>
              </button>

              {/* Posts Hover Secondary Menu */}
              {isPostsMenuOpen && (
                <div className={`absolute top-full left-0 mt-1 w-full p-3 rounded border z-30 shadow-xl backdrop-blur transition-all duration-200 ${
                  darkMode ? 'bg-[#0a0d0a]/95 border-emerald-500/40 text-gray-200' : 'bg-white/95 border-violet-200 text-gray-800'
                }`}>
                  <div className="text-xs font-mono font-semibold mb-2 text-gray-400 uppercase tracking-wider">
                    Select specific tags
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_TAGS.map(tag => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`text-xs px-2.5 py-1 rounded font-mono cursor-pointer transition-all ${
                            isSelected
                              ? darkMode
                                ? 'bg-[#00ff66] text-black font-semibold'
                                : 'bg-[#8b5cf6] text-white font-semibold'
                              : darkMode
                                ? 'bg-gray-900 border border-gray-800 text-gray-300 hover:border-[#00ff66]'
                                : 'bg-gray-100 border border-gray-200 text-gray-700 hover:border-[#8b5cf6]'
                          }`}
                        >
                          {isSelected && '✓ '}{tag}
                        </button>
                      );
                    })}
                  </div>
                  {selectedTags.length > 0 && (
                    <button 
                      onClick={clearTags}
                      className="mt-2.5 text-[11px] font-mono text-red-400 hover:underline block cursor-pointer"
                    >
                      Clear selected tags
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Nav 2: Projects */}
            <div>
              <button
                onClick={() => {
                  setActiveTab('Projects');
                  setActivePost(null);
                  setActiveProject(null);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded border text-left font-mono text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === 'Projects'
                    ? darkMode
                      ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff]'
                      : 'border-[#8b5cf6] bg-[#8b5cf6]/10 text-[#8b5cf6]'
                    : darkMode
                      ? 'border-gray-800 bg-[#0a0d0a] text-gray-300 hover:border-[#00f0ff] hover:text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-[#8b5cf6] hover:text-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderCode size={16} />
                  <span className="font-semibold">Projects</span>
                </div>
                <span className="text-xs opacity-60 font-mono">[{PROJECTS_DATA.length}]</span>
              </button>
            </div>

            {/* Nav 3: Tags */}
            <div 
              className="relative"
              onMouseEnter={() => setIsTagsMenuOpen(true)}
              onMouseLeave={() => setIsTagsMenuOpen(false)}
            >
              <button
                onClick={() => {
                  setActiveTab('Tags');
                  setActivePost(null);
                  setActiveProject(null);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded border text-left font-mono text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === 'Tags'
                    ? darkMode 
                      ? 'border-[#00ff66] bg-[#00ff66]/10 text-[#00ff66]' 
                      : 'border-[#8b5cf6] bg-[#8b5cf6]/10 text-[#8b5cf6]'
                    : darkMode
                      ? 'border-gray-800 bg-[#0a0d0a] text-gray-300 hover:border-[#00ff66] hover:text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-[#8b5cf6] hover:text-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <TagIcon size={16} />
                  <span className="font-semibold">Tags</span>
                </div>
                <span className="text-xs opacity-60 font-mono">[{selectedTags.length ? `${selectedTags.length} active` : 'All'}]</span>
              </button>

              {/* Tags Hover Secondary Menu */}
              {isTagsMenuOpen && (
                <div className={`absolute top-full left-0 mt-1 w-full p-3 rounded border z-30 shadow-xl backdrop-blur transition-all duration-200 ${
                  darkMode ? 'bg-[#0a0d0a]/95 border-emerald-500/40 text-gray-200' : 'bg-white/95 border-violet-200 text-gray-800'
                }`}>
                  <div className="text-xs font-mono font-semibold mb-2 text-gray-400 uppercase tracking-wider">
                    Sorting Modes
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setSortOption('Date')}
                      className={`flex items-center justify-between px-3 py-1.5 rounded text-xs font-mono cursor-pointer transition-colors ${
                        sortOption === 'Date'
                          ? darkMode ? 'bg-[#00ff66]/20 text-[#00ff66] font-bold' : 'bg-[#8b5cf6]/20 text-[#8b5cf6] font-bold'
                          : 'hover:bg-gray-800/50'
                      }`}
                    >
                      <span className="flex items-center gap-2"><Calendar size={12}/> Sort by Date</span>
                      {sortOption === 'Date' && <Check size={12} />}
                    </button>
                    <button
                      onClick={() => setSortOption('Alphabetical')}
                      className={`flex items-center justify-between px-3 py-1.5 rounded text-xs font-mono cursor-pointer transition-colors ${
                        sortOption === 'Alphabetical'
                          ? darkMode ? 'bg-[#00ff66]/20 text-[#00ff66] font-bold' : 'bg-[#8b5cf6]/20 text-[#8b5cf6] font-bold'
                          : 'hover:bg-gray-800/50'
                      }`}
                    >
                      <span className="flex items-center gap-2"><SortAsc size={12}/> Sort Alphabetically</span>
                      {sortOption === 'Alphabetical' && <Check size={12} />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Nav 4: About me */}
            <div>
              <button
                onClick={() => {
                  setActiveTab('About me');
                  setActivePost(null);
                  setActiveProject(null);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded border text-left font-mono text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === 'About me'
                    ? darkMode 
                      ? 'border-[#00ff66] bg-[#00ff66]/10 text-[#00ff66]' 
                      : 'border-[#8b5cf6] bg-[#8b5cf6]/10 text-[#8b5cf6]'
                    : darkMode
                      ? 'border-gray-800 bg-[#0a0d0a] text-gray-300 hover:border-[#00ff66] hover:text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-[#8b5cf6] hover:text-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User size={16} />
                  <span className="font-semibold">About me</span>
                </div>
                <span className="text-xs opacity-60 font-mono">[Profile]</span>
              </button>
            </div>
          </nav>

          <div className="mt-12 p-4 rounded border border-gray-800/80 bg-[#0a0d0a]/40 text-xs font-mono text-gray-400 hidden md:block">
            <div className="flex items-center gap-2 mb-2 text-gray-300">
              <Cpu size={14} className={darkMode ? (isProjectsView ? 'text-[#00f0ff]' : 'text-[#00ff66]') : 'text-[#8b5cf6]'} />
              <span>SYSTEM STATUS</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div>Mode: <span className="text-gray-200">{darkMode ? (isProjectsView ? 'Terminal Cyan' : 'Terminal Dark') : 'Academic Light'}</span></div>
              <div>Sort: <span className="text-gray-200">{sortOption}</span></div>
              <div>Filter: <span className="text-gray-200">{selectedTags.length ? selectedTags.join(', ') : 'None'}</span></div>
              <div>Loaded: <span className="text-gray-200">{POSTS.length} posts / {PROJECTS_DATA.length} projects</span></div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: CONTENT */}
        <main className="md:col-span-8 lg:col-span-8 flex flex-col gap-12">
          {/* ACTIVE POST DETAIL */}
          {activePost ? (
            <article className={`p-6 md:p-8 rounded border transition-all ${
              darkMode ? 'bg-[#0a0d0a] border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <button 
                onClick={() => setActivePost(null)}
                className="text-xs font-mono mb-6 text-gray-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                ← Back to posts
              </button>
              <div className="flex items-center gap-3 text-xs font-mono text-gray-400 mb-3">
                <span>{activePost.frontmatter.date}</span>
                <span>•</span>
                <span>{activePost.frontmatter.readTime}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-sans mb-4">
                <TypewriterOnScroll text={activePost.frontmatter.title} speed={25} />
              </h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {activePost.frontmatter.tags?.map((t: string) => (
                  <span key={t} className={`text-xs px-2.5 py-0.5 rounded font-mono ${
                    darkMode ? 'bg-emerald-950/60 border border-emerald-800/50 text-emerald-300' : 'bg-violet-50 border border-violet-200 text-violet-700'
                  }`}>
                    #{t}
                  </span>
                ))}
              </div>
              
              {/* MARKDOWN RENDERER BODY */}
              <div className="prose prose-invert max-w-none font-sans leading-relaxed text-gray-300 space-y-4">
                <ReactMarkdown>{activePost.content}</ReactMarkdown>
              </div>
            </article>
          ) : activeProject ? (
            /* ACTIVE PROJECT DETAIL */
            <article className={`p-6 md:p-8 rounded border transition-all ${
              darkMode
                ? 'bg-[#0a0d0a] border-cyan-900/40 text-gray-200'
                : 'bg-white border-gray-200 text-gray-800'
            }`}>
              <button
                onClick={() => setActiveProject(null)}
                className="text-xs font-mono mb-6 text-gray-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                ← Back to projects
              </button>

              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-3">
                <span>{activeProject.date}</span>
                {activeProject.category && (
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                    darkMode ? 'bg-cyan-950/80 border border-cyan-800/60 text-[#00f0ff]' : 'bg-violet-50 border border-violet-200 text-[#8b5cf6]'
                  }`}>
                    [{activeProject.category}]
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold font-sans mb-3">
                <TypewriterOnScroll text={activeProject.title} speed={25} />
              </h2>
              <p className="text-sm font-sans text-gray-400 leading-relaxed mb-6">
                <TypewriterOnScroll text={activeProject.description} speed={15} />
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {activeProject.technologies.map((tech: string) => (
                  <span key={tech} className={`text-xs px-2.5 py-0.5 rounded font-mono ${
                    darkMode ? 'bg-cyan-950/60 border border-cyan-800/50 text-cyan-300' : 'bg-violet-50 border border-violet-200 text-violet-700'
                  }`}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* PROJECT DETAILS / README */}
              <div className="prose prose-invert max-w-none font-sans leading-relaxed text-gray-300 space-y-4 mb-10 pb-6 border-b border-gray-800/60">
                <ReactMarkdown>{activeProject.readme}</ReactMarkdown>
              </div>

              {/* REPOSITORY & DEPLOYMENT LINKS STRICTLY AT THE END */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {activeProject.repositoryUrl && (
                  <a
                    href={activeProject.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono text-xs font-semibold border transition-all cursor-pointer ${
                      darkMode
                        ? 'border-[#00f0ff]/60 bg-[#00f0ff]/10 text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/20'
                        : 'border-[#8b5cf6]/60 bg-[#8b5cf6]/10 text-[#8b5cf6] hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/20'
                    }`}
                  >
                    <span>GitHub Repository</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {activeProject.deploymentUrl && (
                  <a
                    href={activeProject.deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono text-xs font-semibold border transition-all cursor-pointer ${
                      darkMode
                        ? 'border-gray-700 bg-gray-900 text-gray-200 hover:border-[#00f0ff] hover:text-[#00f0ff]'
                        : 'border-gray-200 bg-gray-100 text-gray-800 hover:border-[#8b5cf6] hover:text-[#8b5cf6]'
                    }`}
                  >
                    <span>Live Deployment</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </article>
          ) : (
            <>
              {/* POSTS LIST VIEW */}
              {activeTab === 'Posts' && (
                <div className="space-y-6">
                  {selectedTags.length > 0 && (
                    <div className="flex items-center justify-between p-3 rounded border border-emerald-500/30 bg-emerald-500/5 text-xs font-mono">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-gray-400">Filtering by:</span>
                        {selectedTags.map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00ff66]/20 text-[#00ff66]">
                            {tag}
                            <X size={12} className="cursor-pointer hover:text-white" onClick={() => toggleTag(tag)} />
                          </span>
                        ))}
                      </div>
                      <button onClick={clearTags} className="text-gray-400 hover:text-white underline cursor-pointer">
                        Clear all
                      </button>
                    </div>
                  )}

                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-gray-800 rounded font-mono text-gray-500 text-sm">
                      No posts match the selected tag criteria.
                    </div>
                  ) : (
                    filteredPosts.map(post => (
                      <article
                        key={post.id}
                        onClick={() => setActivePost(post)}
                        className={`group p-6 rounded border cursor-pointer transition-all duration-200 ${
                          darkMode
                            ? 'bg-[#0a0d0a] border-gray-800/80 hover:border-[#00ff66]'
                            : 'bg-white border-gray-200 hover:border-[#8b5cf6]'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-mono text-gray-400">{post.frontmatter.date}</span>
                          <span className="text-xs font-mono text-gray-400">{post.frontmatter.readTime}</span>
                        </div>
                        <h2 className="text-xl font-bold font-sans mb-3 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                          <TypewriterOnScroll text={post.frontmatter.title} speed={25} />
                          <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </h2>
                        <div className="text-sm text-gray-400 font-sans leading-relaxed mb-4 line-clamp-2">
                          <TypewriterOnScroll text={post.frontmatter.excerpt} speed={15} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {post.frontmatter.tags?.map(tag => (
                            <span
                              key={tag}
                              className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                                darkMode
                                  ? 'bg-gray-900 border border-gray-800 text-gray-300'
                                  : 'bg-gray-100 border border-gray-200 text-gray-700'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))
                  )}
                </div>
              )}

              {/* PROJECTS LIST VIEW */}
              {activeTab === 'Projects' && (
                <div className="space-y-6">
                  {PROJECTS_DATA.map((project: ProjectItem) => (
                    <article
                      key={project.id}
                      onClick={() => setActiveProject(project)}
                      className={`group p-6 rounded border cursor-pointer transition-all duration-200 ${
                        darkMode
                          ? 'bg-[#0a0d0a] border-cyan-950/50 hover:border-[#00f0ff]'
                          : 'bg-white border-gray-200 hover:border-[#8b5cf6]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-gray-400">{project.date}</span>
                        {project.category && (
                          <span className={`text-[11px] font-mono opacity-80 ${
                            darkMode ? 'text-[#00f0ff]' : 'text-[#8b5cf6]'
                          }`}>
                            [{project.category}]
                          </span>
                        )}
                      </div>
                      <h2 className={`text-xl font-bold font-sans mb-3 transition-colors flex items-center justify-between ${
                        darkMode ? 'group-hover:text-[#00f0ff]' : 'group-hover:text-[#8b5cf6]'
                      }`}>
                        <TypewriterOnScroll text={project.title} speed={25} />
                        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h2>
                      <div className="text-sm text-gray-400 font-sans leading-relaxed mb-4 line-clamp-2">
                        <TypewriterOnScroll text={project.description} speed={15} />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                              darkMode
                                ? 'bg-cyan-950/40 border border-cyan-900/60 text-cyan-300'
                                : 'bg-violet-50 border border-violet-200 text-violet-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* TAGS VIEW */}
              {activeTab === 'Tags' && (
                <div className={`p-6 md:p-8 rounded border ${darkMode ? 'bg-[#0a0d0a] border-gray-800' : 'bg-white border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-800/60">
                    <h2 className="text-xl font-bold font-sans">Tag Registry</h2>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                      <span>Sort:</span>
                      <button 
                        onClick={() => setSortOption(sortOption === 'Date' ? 'Alphabetical' : 'Date')}
                        className={`px-2 py-1 rounded border cursor-pointer ${darkMode ? 'border-gray-700 text-[#00ff66]' : 'border-gray-300 text-[#8b5cf6]'}`}
                      >
                        {sortOption}
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 font-sans mb-6">
                    Select tags to filter technical posts and research write-ups:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ALL_TAGS.map(tag => {
                      const count = POSTS.filter(p => p.frontmatter.tags?.includes(tag)).length;
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <div
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`p-4 rounded border cursor-pointer flex justify-between items-center font-mono text-sm transition-all ${
                            isSelected
                              ? darkMode 
                                ? 'border-[#00ff66] bg-[#00ff66]/10 text-[#00ff66]' 
                                : 'border-[#8b5cf6] bg-[#8b5cf6]/10 text-[#8b5cf6]'
                              : darkMode
                                ? 'border-gray-800 bg-gray-900/50 hover:border-gray-700 text-gray-300'
                                : 'border-gray-200 bg-slate-50 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <span className="font-medium">#{tag}</span>
                          <span className="text-xs opacity-60">[{count} posts]</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ABOUT ME VIEW */}
              {activeTab === 'About me' && (
                <div id="about-me" className="space-y-12 scroll-mt-24">
                  {/* ABOUT ME SECTION CONTAINER */}
                  <div className={`p-6 md:p-8 rounded border space-y-8 ${
                    darkMode ? 'bg-[#0a0d0a] border-gray-800 text-gray-300' : 'bg-white border-gray-200 text-gray-700'
                  }`}>
                    {/* Header with Typewriter */}
                    <div>
                      <h2 className="text-2xl font-bold font-mono text-emerald-400 mb-1 flex items-center gap-2">
                        <span>$</span>
                        <TypewriterOnScroll text="who-am-i" speed={40} />
                      </h2>
                      <p className="text-xs font-mono text-gray-500">// Systems & Quantitative Research</p>
                    </div>

                    {/* 3 Interactive Flip Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Box 1: Dynamic Projects Count */}
                      <div
                        className="perspective h-28 cursor-pointer"
                        onMouseEnter={() => setFlippedCard(1)}
                        onMouseLeave={() => setFlippedCard(null)}
                      >
                        <motion.div
                          className="w-full h-full relative rounded border border-emerald-500/30 bg-emerald-950/20 p-4 flex flex-col justify-center items-center text-center transition-transform duration-500"
                          animate={{ rotateY: flippedCard === 1 ? 180 : 0 }}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {/* Front */}
                          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 [backface-visibility:hidden]">
                            <span className="text-2xl font-bold font-mono text-emerald-400">
                              {PROJECTS_DATA.length} PROJECTS
                            </span>
                            <span className="text-[11px] font-mono text-gray-500 mt-1">
                              Dynamic Portfolio Counter
                            </span>
                          </div>
                          {/* Back */}
                          <div
                            className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-emerald-900/80 rounded border border-emerald-400 text-emerald-100 font-mono text-xs font-semibold [backface-visibility:hidden] cursor-pointer"
                            style={{ transform: 'rotateY(180deg)' }}
                            onClick={() => {
                              setActiveTab('Projects');
                              setActivePost(null);
                              setActiveProject(null);
                            }}
                          >
                            <span>Visit Projects ↗</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Box 2: 4 Spoken Languages */}
                      <div
                        className="perspective h-28 cursor-pointer"
                        onMouseEnter={() => setFlippedCard(2)}
                        onMouseLeave={() => setFlippedCard(null)}
                      >
                        <motion.div
                          className="w-full h-full relative rounded border border-emerald-500/30 bg-emerald-950/20 p-4 flex flex-col justify-center items-center text-center transition-transform duration-500"
                          animate={{ rotateY: flippedCard === 2 ? 180 : 0 }}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {/* Front */}
                          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 [backface-visibility:hidden]">
                            <span className="text-2xl font-bold font-mono text-emerald-400">
                              4 SPOKEN LANGUAGES
                            </span>
                            <span className="text-[11px] font-mono text-gray-500 mt-1">
                              Linguistic Proficiency
                            </span>
                          </div>
                          {/* Back */}
                          <div
                            className="absolute inset-0 flex flex-col justify-center items-center p-2 bg-emerald-900/80 rounded border border-emerald-400 text-emerald-100 font-mono text-[11px] [backface-visibility:hidden]"
                            style={{ transform: 'rotateY(180deg)' }}
                          >
                            <div className="flex flex-wrap gap-1.5 justify-center">
                              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50">• English</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50">• Hindi</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50">• Telugu</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50">• Kannada</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Box 3: Open to Roles */}
                      <div
                        className="perspective h-28 cursor-pointer"
                        onMouseEnter={() => setFlippedCard(3)}
                        onMouseLeave={() => setFlippedCard(null)}
                      >
                        <motion.div
                          className="w-full h-full relative rounded border border-emerald-500/30 bg-emerald-950/20 p-4 flex flex-col justify-center items-center text-center transition-transform duration-500"
                          animate={{ rotateY: flippedCard === 3 ? 180 : 0 }}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {/* Front */}
                          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 [backface-visibility:hidden]">
                            <span className="text-2xl font-bold font-mono text-emerald-400">
                              OPEN TO ROLES
                            </span>
                            <span className="text-[11px] font-mono text-gray-500 mt-1">
                              Opportunities
                            </span>
                          </div>
                          {/* Back */}
                          <div
                            className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-emerald-900/80 rounded border border-emerald-400 text-emerald-100 font-mono text-xs font-semibold [backface-visibility:hidden]"
                            style={{ transform: 'rotateY(180deg)' }}
                          >
                            <span>Quant Research & GameDev</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Bio Copy with Scroll-Triggered Typewriter */}
                    <div className="space-y-4 text-sm font-sans leading-relaxed text-gray-300 border-l-2 border-emerald-500/40 pl-4 py-1">
                      <p>
                        <TypewriterOnScroll
                          text="An 18-year-old Information Technology Engineering student at CBIT who experiments, makes (and breaks) code for fun, pursues GameDev and Quantitative Research while managing college studies."
                          speed={18}
                        />
                      </p>
                      <p>
                        <TypewriterOnScroll
                          text="When I'm not on my IDE, you'll find me singing, making or listening to music, playing the guitar, or playing video games."
                          speed={18}
                          delay={1200}
                        />
                      </p>
                    </div>

                    {/* ⚡ CURRENTLY Status Board */}
                    <div className="p-5 rounded border border-emerald-500/20 bg-emerald-950/10 space-y-3 font-mono text-xs">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-wider uppercase mb-2">
                        <Sparkles size={14} />
                        <span>⚡ CURRENTLY</span>
                      </div>
                      <div className="space-y-2 text-gray-300">
                        <div className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-violet-400 mt-1 shrink-0"></span>
                          <span className="text-violet-300">
                            <strong>Learning:</strong> C, C++, and JavaScript for system-level multitasking and low-latency code.
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                          <span className="text-blue-300">
                            <strong>Building:</strong> A web-game built with Next.js and React, powered by Vercel.
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-yellow-400 mt-1 shrink-0"></span>
                          <span className="text-yellow-300">
                            <strong>Working:</strong> On a parallel repository focused on Quantitative Research.
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-orange-400 mt-1 shrink-0"></span>
                          <span className="text-orange-300">
                            <strong>Aspiring:</strong> Quantitative Research or Game Development roles.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 02 — SKILLS & EDUCATION (TABBED SECTION) */}
                  <div id="skills-section" className={`p-6 md:p-8 rounded border space-y-6 ${
                    darkMode ? 'bg-[#0a0d0a] border-gray-800' : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/60 pb-4">
                      <div>
                        <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-1">
                          02 — SKILLS & EDUCATION
                        </div>
                        <h3 className="text-2xl font-bold font-sans text-gray-100">What I Know</h3>
                      </div>

                      {/* Triple Select Tabs */}
                      <div className="inline-flex p-1 rounded-lg bg-gray-900 border border-gray-800 text-xs font-mono">
                        {(['Skills', 'Education', 'Currently Learning'] as const).map(tab => (
                          <button
                            key={tab}
                            onClick={() => setSkillsTab(tab)}
                            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                              skillsTab === tab
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                                : 'text-gray-400 hover:text-gray-200'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Skills Tab Content */}
                    {skillsTab === 'Skills' && (
                      <div className="space-y-6">
                        <div>
                          <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Languages</div>
                          <div className="flex flex-wrap gap-2">
                            {['Python', 'TypeScript', 'C++', 'C', 'JavaScript'].map(lang => (
                              <span key={lang} className="px-3 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Frameworks</div>
                          <div className="flex flex-wrap gap-2">
                            {['Next.js', 'Node.js', 'Three.js', 'Tailwind'].map(fw => (
                              <span key={fw} className="px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                                {fw}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Tools</div>
                          <div className="flex flex-wrap gap-2">
                            {['WebSockets', 'Web Audio API', 'Web Scraping'].map(tool => (
                              <span key={tool} className="px-3 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Education Tab Content */}
                    {skillsTab === 'Education' && (
                      <div className="space-y-4">
                        <div className="p-4 rounded border border-gray-800 bg-gray-900/40 flex items-start gap-3">
                          <GraduationCap size={20} className="text-emerald-400 mt-1 shrink-0" />
                          <div>
                            <div className="font-bold text-sm text-gray-200">CBIT, Hyderabad</div>
                            <div className="text-xs font-mono text-emerald-400">B.E. in Information Technology (2026 — Present)</div>
                          </div>
                        </div>

                        <div className="p-4 rounded border border-gray-800 bg-gray-900/40 flex items-start gap-3">
                          <GraduationCap size={20} className="text-cyan-400 mt-1 shrink-0" />
                          <div>
                            <div className="font-bold text-sm text-gray-200">Resonance Eduventures</div>
                            <div className="text-xs font-mono text-cyan-400">Senior Secondary</div>
                          </div>
                        </div>

                        <div className="p-4 rounded border border-gray-800 bg-gray-900/40 flex items-start gap-3">
                          <GraduationCap size={20} className="text-purple-400 mt-1 shrink-0" />
                          <div>
                            <div className="font-bold text-sm text-gray-200">DAV Public School</div>
                            <div className="text-xs font-mono text-purple-400">Schooling</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Currently Learning Tab Content */}
                    {skillsTab === 'Currently Learning' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded border border-emerald-500/30 bg-emerald-950/20 space-y-2">
                          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">RIGHT NOW</div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {['Next.js', 'WebSockets', 'Three.js'].map(item => (
                              <span key={item} className="px-2.5 py-1 rounded bg-emerald-900/40 border border-emerald-500/40 text-emerald-200 text-xs font-mono">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded border border-cyan-500/30 bg-cyan-950/20 space-y-2">
                          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">UP NEXT</div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {['Low-Latency C++', 'Quant Models'].map(item => (
                              <span key={item} className="px-2.5 py-1 rounded bg-cyan-900/40 border border-cyan-500/40 text-cyan-200 text-xs font-mono">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 03 — PROJECTS / GITHUB ACTIVITY & GAMEDEV MULTIPLAYER CONNECT */}
                  <div className={`p-6 md:p-8 rounded border space-y-8 ${
                    darkMode ? 'bg-[#0a0d0a] border-gray-800' : 'bg-white border-gray-200'
                  }`}>
                    <div>
                      <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-1">
                        03 — PROJECTS
                      </div>
                      <h3 className="text-2xl font-bold font-sans text-gray-100">What I Have Built</h3>
                    </div>

                    {/* GitHub Heatmap Card */}
                    <div className="p-5 rounded border border-gray-800 bg-gray-900/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                          <Code2 size={16} />
                          <span>GitHub Activity Contributions</span>
                        </div>
                        <a
                          href="https://github.com/sriharichincholi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-gray-400 hover:text-emerald-400 flex items-center gap-1"
                        >
                          <span>@sriharichincholi</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>

                      {/* Embed Heatmap Image */}
                      <div className="w-full overflow-x-auto rounded bg-black/40 p-3 border border-gray-800/80">
                        <img
                          src="https://ghchart.rshah.org/00ff66/sriharichincholi"
                          alt="Srihari's GitHub Contribution Chart"
                          className="w-full min-w-[600px] opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>

                    {/* GameDev Multiplayer Connect Footer */}
                    <div className="p-6 rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-[#0a0d0a] to-emerald-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="space-y-2 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-xl font-bold text-gray-100 font-sans">
                          <Gamepad2 size={22} className="text-emerald-400" />
                          <span>🎮 Let's Build & Play Together!</span>
                        </div>
                        <p className="text-xs text-gray-400 font-sans leading-relaxed max-w-xl">
                          Got a game mechanic idea, quant algorithm, or multiplayer project? Let's turn it into real-time code.
                        </p>
                      </div>

                      <a
                        href="https://github.com/sriharichincholi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold text-emerald-300 bg-emerald-900/30 border border-emerald-500/40 hover:bg-emerald-500/20 transition-all cursor-pointer shrink-0"
                      >
                        <span>Join Lobby / Reach Out →</span>
                        <Send size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <footer className="relative z-10 w-full py-8 border-t border-gray-800/40 mt-16 text-center text-xs font-mono text-gray-500">
        © Srihari Chincholi
      </footer>
    </div>
  );
}
