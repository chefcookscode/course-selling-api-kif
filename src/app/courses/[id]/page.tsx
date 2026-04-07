import { notFound } from "next/navigation";
import Link from "next/link";
import { courses, getCourseById } from "@/lib/courses";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, BarChart2, CheckCircle2, ChevronLeft, Star } from "lucide-react";
import CourseDetailClient from "./CourseDetailClient";
import AnimatedNavbar from "@/components/AnimatedNavbar";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const course = getCourseById(id);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} — KIF Academy`,
    description: course.fullDescription,
  };
}

const badgeVariantMap: Record<
  string,
  "bestseller" | "popular" | "hot" | "trending" | "new"
> = {
  Bestseller: "bestseller",
  Popular: "popular",
  Hot: "hot",
  Trending: "trending",
  New: "new",
};

const levelColorMap: Record<string, string> = {
  Beginner: "text-emerald-400",
  Intermediate: "text-[var(--blue)]",
  Advanced: "text-purple-400",
};

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const course = getCourseById(id);
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-[var(--ink)]">
      <AnimatedNavbar />

      {/* Breadcrumb strip */}
      <div className="border-b border-[var(--edge)] bg-[var(--ink-deep)]/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center gap-3">
          <Link href="/" className="text-[var(--frost-faint)] hover:text-[var(--gold)] transition-colors text-xs font-mono tracking-widest uppercase">Home</Link>
          <span className="text-[var(--edge-bright)] font-mono text-xs">/</span>
          <Link href="/#courses" className="flex items-center gap-1 text-[var(--frost-faint)] hover:text-[var(--gold)] transition-colors text-xs font-mono tracking-widest uppercase">
            <ChevronLeft className="h-3 w-3" /> Courses
          </Link>
          <span className="text-[var(--edge-bright)] font-mono text-xs">/</span>
          <span className="text-[var(--gold)] text-xs font-mono tracking-widest uppercase truncate">{course.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[var(--ink-deep)] to-[var(--ink)]">
        {/* dot-grid + orbs */}
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full bg-[var(--gold)]/12 blur-[120px] animate-float-slow" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[var(--blue)]/10 blur-[100px] animate-float" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
            {/* Left: Course Info */}
            <div className="flex-1 space-y-7">
              <div className="flex items-center gap-4">
                <span className="text-5xl border border-[var(--edge)] bg-[var(--surface)] p-3 rounded-sm hover:border-[var(--gold)]/50 hover:bg-[var(--gold-dim)]/30 transition-all duration-300">{course.icon}</span>
                <Badge className="font-mono text-[10px] uppercase tracking-widest bg-[var(--gold-dim)] text-[var(--gold)] border border-[var(--gold)]/30 rounded-none hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors px-3 py-1">
                  {course.badge}
                </Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-playfair text-[var(--frost)] leading-[1.1] tracking-tight animate-slide-up">
                {course.title}
              </h1>
              <p className="text-lg text-[var(--frost-faint)] leading-relaxed max-w-2xl font-sans">
                {course.fullDescription}
              </p>

              {/* Rating + meta row */}
              <div className="flex flex-wrap items-center gap-6 text-sm font-mono tracking-wider">
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= Math.round(course.rating) ? "text-[var(--gold)] fill-[var(--gold)]" : "text-[var(--edge-bright)]"}`} />
                  ))}
                  <span className="text-[var(--gold)] font-bold ml-1">{course.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--frost-dim)]">
                  <Clock className="h-4 w-4 text-[var(--gold)]" />
                  <span>{course.duration}</span>
                </div>
                <div className={`flex items-center gap-2 font-medium ${levelColorMap[course.level] ?? "text-[var(--frost-dim)]"}`}>
                  <BarChart2 className="h-4 w-4 opacity-70" />
                  {course.level}
                </div>
                <div className="flex items-center gap-2 text-[var(--frost-dim)]">
                  <BookOpen className="h-4 w-4 text-[var(--gold)]" />
                  {course.syllabus.length} Modules
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 text-sm text-[var(--frost-dim)] font-sans p-3 rounded-sm bg-[var(--surface)] border border-[var(--edge)] hover:border-[var(--gold)]/30 hover:bg-[var(--surface-raised)] hover:text-[var(--frost)] transition-all duration-200 group">
                    <CheckCircle2 className="h-4 w-4 text-[var(--gold)] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Pricing Card */}
            <div className="lg:w-80 xl:w-96 shrink-0 z-10">
              <CourseDetailClient course={course} />
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-[10px] font-mono tracking-widest text-[var(--gold)] uppercase mb-3">What You&apos;ll Learn</p>
        <h2 className="text-3xl sm:text-4xl font-black font-playfair text-[var(--frost)] mb-10">
          Course <span className="text-[var(--gold)] italic">Syllabus</span>
        </h2>
        <div className="space-y-4">
          {course.syllabus.map((module, idx) => (
            <div
              key={module.module}
              className="glow-card gradient-border rounded-sm border border-[var(--edge)] bg-[var(--surface)] overflow-hidden group"
            >
              <div className="flex items-center gap-4 px-6 py-5 border-b border-[var(--edge)] bg-[var(--ink)]/60 group-hover:bg-[var(--gold-dim)]/15 transition-colors">
                <span className="flex items-center justify-center h-9 w-9 rounded-sm bg-[var(--ink)] border border-[var(--gold)]/30 text-[var(--gold)] font-mono text-sm font-bold shrink-0 group-hover:border-[var(--gold)]/60 group-hover:bg-[var(--gold-dim)]/40 transition-all">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[var(--frost)] font-bold font-playfair text-lg tracking-wide group-hover:text-[var(--gold)] transition-colors">{module.module}</h3>
              </div>
              <ul className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[var(--surface)]">
                {module.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-[var(--frost-faint)] text-sm font-sans hover:text-[var(--frost-dim)] transition-colors">
                    <span className="text-[var(--gold)] mt-1 shrink-0 font-mono text-[10px]">▸</span>
                    <span className="leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--edge)] bg-[var(--ink-deep)] text-center text-[var(--frost-faint)] text-xs font-mono tracking-widest uppercase mt-12">
        <p>© {new Date().getFullYear()} KIPM Innovators Foundation. All rights reserved.</p>
      </footer>
    </div>
  );
}
