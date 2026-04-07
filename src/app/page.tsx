import Link from "next/link";
import { courses } from "@/lib/courses";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import {
  Clock,
  BarChart2,
  Star,
  Users,
  ChevronRight,
  BookOpen,
  Award,
  Zap,
  Target,
  Wrench,
  Trophy,
  MessageCircle,
  Infinity,
  Rocket,
} from "lucide-react";

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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--ink)]">
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Dot-grid background pattern */}
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />

        {/* Ambient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-[var(--gold)]/20 blur-[120px] animate-float-slow" />
          <div className="absolute top-32 -left-48 w-[400px] h-[400px] rounded-full bg-[var(--blue)]/15 blur-[100px] animate-float" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 rounded-full bg-[var(--gold)]/8 blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          {/* Pulsing badge */}
          <div className="inline-flex items-center gap-2 font-mono px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-semibold uppercase tracking-widest mb-8 animate-scale-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--gold)]" />
            </span>
            Industry-Aligned Tech Courses
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-playfair text-[var(--frost)] leading-[1.1] mb-6 tracking-tight animate-slide-up">
            Build Real Skills.
            <br />
            <span className="shimmer-text italic pr-2">
              Launch Your Career.
            </span>
          </h1>
          <p className="text-lg text-[var(--frost-faint)] max-w-2xl mx-auto mb-10 leading-relaxed font-sans animate-slide-up" style={{animationDelay:"0.12s"}}>
            Expert-led courses in the most in-demand technologies. Structured
            curriculum, hands-on projects, and lifetime access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay:"0.22s"}}>
            <Button size="xl" className="font-semibold uppercase tracking-widest bg-[var(--gold)] hover:bg-[var(--gold-bright)] hover:scale-105 active:scale-95 text-[var(--ink)] rounded-sm py-6 shadow-lg shadow-[var(--gold)]/25 transition-all" asChild>
              <Link href="#courses">
                Explore Courses <ChevronRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="font-semibold uppercase tracking-widest text-[var(--frost-dim)] border-[var(--edge-bright)] hover:border-[var(--gold)] hover:text-[var(--gold)] hover:scale-105 active:scale-95 rounded-sm py-6 bg-transparent transition-all" asChild>
              <Link href="#why-us">Learn More</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-[1px] max-w-4xl mx-auto bg-[var(--edge)] border-y border-[var(--edge)]">
            {[
              { icon: Users,    label: "Students Enrolled",  value: "12,000+" },
              { icon: BookOpen, label: "Expert Courses",      value: "5+"      },
              { icon: Award,    label: "Certificates Issued", value: "8,500+"  },
              { icon: Star,     label: "Average Rating",      value: "4.8/5"   },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="p-8 bg-[var(--ink)] hover:bg-[var(--surface)] transition-all duration-300 text-center group cursor-default"
              >
                <div className="h-10 w-10 rounded-full bg-[var(--gold-dim)] border border-[var(--gold)]/20 flex items-center justify-center mx-auto mb-4 group-hover:border-[var(--gold)]/50 group-hover:bg-[var(--gold)]/20 transition-all duration-300">
                  <Icon className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <p className="text-3xl font-black font-playfair text-[var(--gold)] group-hover:scale-110 transition-transform duration-300 inline-block">{value}</p>
                <p className="text-[10px] font-mono tracking-widest text-[var(--frost-faint)] mt-2 uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[var(--ink-deep)]">
        {/* subtle radial glow center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,97,26,0.07),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-mono tracking-widest text-[var(--gold)] uppercase mb-3">Our Curriculum</p>
            <h2 className="text-4xl sm:text-5xl font-black font-playfair text-[var(--frost)] mb-6">
              Explore <span className="text-[var(--gold)] italic">Courses</span>
            </h2>
            <p className="text-[var(--frost-faint)] max-w-xl mx-auto text-lg leading-relaxed">
              Choose from our carefully crafted courses designed to take you
              from beginner to job-ready professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="glow-card gradient-border group flex flex-col border-[var(--edge)] bg-[var(--surface)] hover:bg-[var(--surface-raised)] hover:border-[var(--gold)]/40 rounded-sm overflow-hidden"
              >
                {/* animated top accent bar */}
                <div className="h-[3px] w-0 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-bright)] group-hover:w-full transition-all duration-500" />
                <CardHeader className="pb-3 pt-6 px-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl border border-[var(--edge)] p-3 bg-[var(--ink)] rounded-sm group-hover:border-[var(--gold)]/50 group-hover:bg-[var(--gold-dim)]/30 transition-all duration-300">
                      {course.icon}
                    </div>
                    <Badge className="font-mono text-[10px] uppercase tracking-widest bg-[var(--gold-dim)] text-[var(--gold)] border border-[var(--gold)]/30 rounded-none hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors">
                      {course.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-playfair font-bold text-[var(--frost)] group-hover:text-[var(--gold)] transition-colors line-clamp-1">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-[var(--frost-faint)] line-clamp-2 mt-2 leading-relaxed">
                    {course.shortDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4 px-6">
                  {/* Rating stars */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(course.rating) ? "text-[var(--gold)] fill-[var(--gold)]" : "text-[var(--edge-bright)]"}`} />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-[var(--gold)] font-bold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-[var(--frost-dim)] font-mono text-xs">
                      <Clock className="h-3.5 w-3.5 text-[var(--gold)]" />
                      {course.duration}
                    </div>
                    <div className={`flex items-center gap-1.5 font-mono text-xs ${levelColorMap[course.level] ?? "text-[var(--frost-dim)]"}`}>
                      <BarChart2 className="h-3.5 w-3.5 opacity-70" />
                      {course.level}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {course.syllabus[0].topics.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-mono tracking-wider px-2 py-1 bg-[var(--ink)] border border-[var(--edge)] text-[var(--frost-dim)] uppercase hover:border-[var(--gold)]/30 hover:text-[var(--gold)] transition-colors cursor-default">
                        {t.split(" ").slice(0, 2).join(" ")}
                      </span>
                    ))}
                    <span className="text-[10px] font-mono tracking-wider px-2 py-1 bg-[var(--ink)] border border-[var(--edge)] text-[var(--frost-dim)] uppercase">+more</span>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between pt-4 pb-6 px-6 border-t border-[var(--edge)] bg-[var(--ink)]/50 mt-4">
                  <div>
                    <p className="text-2xl font-bold font-playfair text-[var(--frost)] group-hover:text-[var(--gold)] transition-colors">
                      ₹{course.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] font-mono text-[var(--frost-faint)] uppercase tracking-widest mt-1">one-time · no hidden fees</p>
                  </div>
                  <Button asChild size="sm" className="bg-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold-bright)] hover:scale-105 active:scale-95 transition-all rounded-sm font-semibold uppercase tracking-wider text-xs shadow-md shadow-[var(--gold)]/20">
                    <Link href={`/courses/${course.id}`}>
                      Details <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 border-y border-[var(--edge)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--gold)]/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-[10px] font-mono tracking-widest text-[var(--gold)] uppercase mb-3">Why KIF</p>
            <h2 className="text-4xl sm:text-5xl font-black font-playfair text-[var(--frost)] mb-6">
              Why Choose <span className="text-[var(--gold)] italic">KIF Academy?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[var(--edge)]">
            {[
              { icon: Target,        title: "Industry-Relevant",    desc: "Courses designed in collaboration with industry experts and updated regularly to reflect current market demands." },
              { icon: Wrench,        title: "Hands-On Projects",     desc: "Build real-world projects that go directly into your portfolio and demonstrate your skills to potential employers." },
              { icon: Trophy,        title: "Verifiable Certificate",desc: "Earn a verifiable certificate upon completing the course that you can share on LinkedIn and your resume." },
              { icon: MessageCircle, title: "Doubt Resolution",      desc: "Get your questions answered through our dedicated support channels and community forums." },
              { icon: Infinity,      title: "Lifetime Access",       desc: "Purchase once and access all materials including future updates forever, at no extra cost." },
              { icon: Rocket,        title: "Career Support",        desc: "Resume workshops, mock interviews, and job referrals to help you land your dream tech role." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="gradient-border p-10 bg-[var(--ink)] hover:bg-[var(--surface)] transition-all duration-300 group cursor-default">
                <div className="h-12 w-12 rounded-sm bg-[var(--gold-dim)] border border-[var(--gold)]/20 flex items-center justify-center mb-5 group-hover:border-[var(--gold)]/60 group-hover:bg-[var(--gold)]/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-6 w-6 text-[var(--gold)]" />
                </div>
                <h3 className="text-[var(--frost)] font-bold font-playfair text-xl mb-3 group-hover:text-[var(--gold)] transition-colors">{title}</h3>
                <p className="text-[var(--frost-faint)] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[var(--ink-deep)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(232,97,26,0.12),transparent)] pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 font-mono px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs uppercase tracking-widest mb-8">
            <Zap className="h-3.5 w-3.5" />
            Limited Seats Available
          </div>
          <h2 className="text-4xl sm:text-5xl font-black font-playfair text-[var(--frost)] mb-6 leading-tight">
            Ready to <span className="shimmer-text italic">Transform</span>
            <br />Your Career?
          </h2>
          <p className="text-[var(--frost-faint)] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join 12,000+ students already learning with KIF Academy. Expert mentorship, hands-on projects, and a certificate that gets you hired.
          </p>
          <Button size="xl" className="bg-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold-bright)] hover:scale-105 active:scale-95 transition-all rounded-sm font-semibold uppercase tracking-widest shadow-xl shadow-[var(--gold)]/30 animate-gold-pulse" asChild>
            <Link href="#courses">Browse All Courses <ChevronRight className="h-5 w-5 ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-4 bg-[var(--ink-deep)] border-t border-[var(--edge)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-[var(--gold)] flex items-center justify-center border border-[var(--edge-bright)]">
                  <BookOpen className="h-4 w-4 text-[var(--ink)]" />
                </div>
                <span className="text-xl font-black font-playfair bg-gradient-to-br from-[var(--gold-bright)] to-[var(--gold)] bg-clip-text text-transparent">KIF</span>
                <span className="font-sans font-bold text-[var(--frost-dim)]">Academy</span>
              </div>
              <p className="text-[var(--frost-faint)] text-sm leading-relaxed max-w-xs">
                Expert-led tech education for the next generation of developers and engineers.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-[var(--gold)] mb-4">Quick Links</p>
              <div className="flex flex-col gap-2">
                {["Courses", "Why Us", "Contact"].map((item) => (
                  <Link key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="hover-underline text-[var(--frost-faint)] hover:text-[var(--gold)] transition-colors text-sm w-fit">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            {/* Legal */}
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-[var(--gold)] mb-4">Legal</p>
              <div className="flex flex-col gap-2">
                {["Privacy Policy", "Terms of Service"].map((item) => (
                  <Link key={item} href="#"
                    className="hover-underline text-[var(--frost-faint)] hover:text-[var(--gold)] transition-colors text-sm w-fit">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--edge)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-wider text-[var(--frost-faint)]">
              © {new Date().getFullYear()} KIPM Innovators Foundation. All rights reserved.
            </p>
            <div className="flex gap-4 items-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--frost-faint)]">Made with</span>
              <span className="text-[var(--gold)]">♥</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--frost-faint)]">in India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
