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
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-[var(--edge)] bg-[var(--ink)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[var(--gold)] flex items-center justify-center border border-[var(--edge-bright)]">
              <BookOpen className="h-4 w-4 text-[var(--ink)]" />
            </div>
            <span className="text-xl font-black font-playfair bg-gradient-to-br from-[var(--gold-bright)] to-[var(--gold)] bg-clip-text text-transparent tracking-wide">
              KIF
            </span>
            <span className="font-sans font-bold text-[var(--frost)]">Academy</span>
          </Link>
          <span className="text-[var(--edge-bright)] font-mono">/</span>
          <Link
            href="/#courses"
            className="flex items-center gap-1 text-[var(--frost-faint)] hover:text-[var(--gold)] transition-colors text-sm font-mono tracking-widest uppercase"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            All Courses
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[var(--ink-deep)] to-[var(--ink)]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[var(--gold)]/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[var(--blue)]/10 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
            {/* Left: Course Info */}
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-5xl border border-[var(--edge)] bg-[var(--surface)] p-3 rounded-sm">{course.icon}</span>
                <Badge className="font-mono text-[10px] uppercase tracking-widest bg-[var(--gold-dim)] text-[var(--gold)] border border-[var(--gold)]/30 rounded-none hover:bg-[var(--gold)] hover:text-[var(--ink)] px-3 py-1">
                  {course.badge}
                </Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-playfair text-[var(--frost)] leading-[1.1] tracking-tight">
                {course.title}
              </h1>
              <p className="text-lg text-[var(--frost-faint)] leading-relaxed max-w-2xl font-sans">
                {course.fullDescription}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm font-mono tracking-wider">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 text-sm text-[var(--frost-dim)] font-sans">
                    <CheckCircle2 className="h-5 w-5 text-[var(--gold)] mt-0 shrink-0" />
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
        <h2 className="text-3xl sm:text-4xl font-black font-playfair text-[var(--frost)] mb-10">
          Course <span className="text-[var(--gold)] italic">Syllabus</span>
        </h2>
        <div className="space-y-4">
          {course.syllabus.map((module, idx) => (
            <div
              key={module.module}
              className="rounded-sm border border-[var(--edge)] bg-[var(--surface)] hover:border-[var(--gold)]/30 transition-colors overflow-hidden group"
            >
              <div className="flex items-center gap-4 px-6 py-5 border-b border-[var(--edge)] bg-[var(--ink)]/50 group-hover:bg-[var(--gold-dim)]/20 transition-colors">
                <span className="flex items-center justify-center h-8 w-8 rounded-none bg-[var(--ink)] border border-[var(--gold)]/30 text-[var(--gold)] font-mono text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <h3 className="text-[var(--frost)] font-bold font-playfair text-lg tracking-wide">{module.module}</h3>
              </div>
              <ul className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[var(--surface)]">
                {module.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-[var(--frost-faint)] text-sm font-sans">
                    <span className="text-[var(--gold)] mt-1 shrink-0 px-1 font-mono text-[10px]">▸</span>
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
