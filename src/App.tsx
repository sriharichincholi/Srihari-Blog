import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import fm from 'front-matter';
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
  Code2
} from 'lucide-react';
import { TetrisCanvas } from './components/TetrisCanvas';
import { PROJECTS, type Project } from './data/projectsData';

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
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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

  // --- LANDING PAGE ---
  if (showLanding) {
    return (
      <div className={`relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden ${darkMode ? 'bg-[#050705] text-gray-100' : 'bg-slate-50 text-gray-900'}`}>
        <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-70" />

        <div className="relative z-10 p-6 flex justify-end">
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

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light mb-8 leading-relaxed">
              Experimenting with low-latency architectures, algorithmic efficiency, and quantitative systems.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setActiveTab('Posts');
                  setActivePost(null);
                  setActiveProject(null);
                  setShowLanding(false);
                }}
                className={`group inline-flex items-center gap-3 px-6 py-3.5 rounded font-mono font-medium transition-all duration-200 cursor-pointer ${
                  darkMode
                    ? 'bg-[#00ff66] text-black hover:bg-emerald-400'
                    : 'bg-[#8b5cf6] text-white hover:bg-violet-600'
                }`}
              >
                <span>Check posts</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('Projects');
                  setActivePost(null);
                  setActiveProject(null);
                  setShowLanding(false);
                }}
                className={`group inline-flex items-center gap-3 px-6 py-3.5 rounded font-mono font-medium border transition-all duration-200 cursor-pointer ${
                  darkMode
                    ? 'border-[#00f0ff]/60 bg-[#00f0ff]/10 text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/20'
                    : 'border-[#8b5cf6]/60 bg-[#8b5cf6]/10 text-[#8b5cf6] hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/20'
                }`}
              >
                <Code2 size={16} />
                <span>Projects</span>
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

      {/* Top Controls */}
      <header className={`relative z-40 w-full border-b px-6 py-4 flex justify-between items-center backdrop-blur sticky top-0 ${
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
              <div>Srihari's Blog.</div>
              <div className="text-gray-400 font-normal">Experimenting and</div>
              <div className="text-gray-400 font-normal">Implementing</div>
              <div className={`font-mono font-bold ${
                darkMode
                  ? isProjectsView ? 'text-[#00f0ff]' : 'text-[#00ff66]'
                  : 'text-[#8b5cf6]'
              }`}>
                Efficient code
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

            {/* Nav 2: Projects (New Control beside/below Posts) */}
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
                <span className="text-xs opacity-60 font-mono">[{PROJECTS.length}]</span>
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
              <div>Loaded: <span className="text-gray-200">{POSTS.length} posts / {PROJECTS.length} projects</span></div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: CONTENT */}
        <main className="md:col-span-8 lg:col-span-8 flex flex-col">
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
              <h2 className="text-2xl md:text-3xl font-bold font-sans mb-4">{activePost.frontmatter.title}</h2>
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
                {activeProject.status && (
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                    darkMode ? 'bg-cyan-950/80 border border-cyan-800/60 text-[#00f0ff]' : 'bg-violet-50 border border-violet-200 text-[#8b5cf6]'
                  }`}>
                    [{activeProject.status}]
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold font-sans mb-3">{activeProject.name}</h2>
              <p className="text-sm font-sans text-gray-400 leading-relaxed mb-6">
                {activeProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {activeProject.tags.map((t: string) => (
                  <span key={t} className={`text-xs px-2.5 py-0.5 rounded font-mono ${
                    darkMode ? 'bg-cyan-950/60 border border-cyan-800/50 text-cyan-300' : 'bg-violet-50 border border-violet-200 text-violet-700'
                  }`}>
                    #{t}
                  </span>
                ))}
                {activeProject.technologies.map((tech: string) => (
                  <span key={tech} className={`text-xs px-2.5 py-0.5 rounded font-mono ${
                    darkMode ? 'bg-gray-900 border border-gray-800 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'
                  }`}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* PROJECT DETAILS / README */}
              <div className="prose prose-invert max-w-none font-sans leading-relaxed text-gray-300 space-y-4 mb-10 pb-6 border-b border-gray-800/60">
                <ReactMarkdown>{activeProject.details}</ReactMarkdown>
              </div>

              {/* REPOSITORY & DEPLOYMENT LINKS STRICTLY AT THE END */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {activeProject.repoUrl && (
                  <a
                    href={activeProject.repoUrl}
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
                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
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
                          <span>{post.frontmatter.title}</span>
                          <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </h2>
                        <p className="text-sm text-gray-400 font-sans leading-relaxed mb-4 line-clamp-2">
                          {post.frontmatter.excerpt}
                        </p>
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
                  {PROJECTS.map((project: Project) => (
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
                        {project.status && (
                          <span className={`text-[11px] font-mono opacity-80 ${
                            darkMode ? 'text-[#00f0ff]' : 'text-[#8b5cf6]'
                          }`}>
                            [{project.status}]
                          </span>
                        )}
                      </div>
                      <h2 className={`text-xl font-bold font-sans mb-3 transition-colors flex items-center justify-between ${
                        darkMode ? 'group-hover:text-[#00f0ff]' : 'group-hover:text-[#8b5cf6]'
                      }`}>
                        <span>{project.name}</span>
                        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h2>
                      <p className="text-sm text-gray-400 font-sans leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                              darkMode
                                ? 'bg-cyan-950/40 border border-cyan-900/60 text-cyan-300'
                                : 'bg-violet-50 border border-violet-200 text-violet-700'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                        {project.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                              darkMode
                                ? 'bg-gray-900 border border-gray-800 text-gray-400'
                                : 'bg-gray-100 border border-gray-200 text-gray-600'
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
                <div className={`p-6 md:p-8 rounded border space-y-8 ${
                  darkMode ? 'bg-[#0a0d0a] border-gray-800 text-gray-300' : 'bg-white border-gray-200 text-gray-700'
                }`}>
                  <div>
                    <h2 className="text-2xl font-bold font-sans text-gray-100 mb-2">Srihari Chincholi</h2>
                    <p className="text-sm font-mono text-gray-400">// Systems & Quantitative Research</p>
                  </div>

                  <section className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">
                      [ Introduction ]
                    </h3>
                    <p className="text-sm leading-relaxed font-sans">
                      Focused on low-latency C++ systems, code optimization, numerical analysis, and quantitative research models.
                    </p>
                  </section>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <section className="space-y-2">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">
                        [ Technical Interests ]
                      </h3>
                      <ul className="text-sm font-sans space-y-1.5 list-disc list-inside text-gray-300">
                        <li>Low-latency C++ / Systems Architecture</li>
                        <li>Custom Arena Allocators & Cache Locality</li>
                        <li>Lock-Free Data Structures & Atomicity</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">
                        [ Research Focus ]
                      </h3>
                      <ul className="text-sm font-sans space-y-1.5 list-disc list-inside text-gray-300">
                        <li>Matrix Decomposition & Floating-Point Stability</li>
                        <li>High-Throughput Concurrent Systems</li>
                        <li>Algorithmic Trading & Statistical Modeling</li>
                      </ul>
                    </section>
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