"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PaymentDialog from "@/components/PaymentDialog";
import { Course } from "@/lib/courses";
import { ShieldCheck, Star, Zap } from "lucide-react";

interface Props {
  course: Course;
}

export default function CourseDetailClient({ course }: Props) {
  const [paymentOpen, setPaymentOpen] = useState(false);

  return (
    <>
      <div className="glow-card rounded-sm border border-[var(--edge)] bg-[var(--surface)] shadow-2xl shadow-black/60 overflow-hidden sticky top-24 font-sans">
        {/* Animated gradient top bar */}
        <div className="h-[3px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold-bright)] to-[var(--gold)] bg-[length:200%_auto] animate-[shimmerGold_3s_linear_infinite]" />

        <div className="p-6 space-y-6">
          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black font-playfair text-[var(--frost)]">
                ₹{course.price.toLocaleString("en-IN")}
              </span>
              <span className="text-[var(--frost-dim)] text-xs font-mono tracking-widest uppercase">/ one-time</span>
            </div>
            <p className="text-[var(--frost-faint)] text-xs mt-1">No hidden charges · GST included</p>
          </div>

          {/* CTA Button */}
          <Button
            size="xl"
            className="w-full text-sm font-semibold uppercase tracking-widest bg-[var(--gold)] hover:bg-[var(--gold-bright)] hover:scale-105 active:scale-95 text-[var(--ink)] rounded-sm transition-all shadow-lg shadow-[var(--gold)]/25 animate-gold-pulse"
            onClick={() => setPaymentOpen(true)}
          >
            <Zap className="h-4 w-4 mr-2" />
            PAY NOW — ₹{course.price.toLocaleString("en-IN")}
          </Button>

          {/* Trust Badges */}
          <div className="flex items-center gap-2 text-xs text-[var(--frost-dim)] font-mono uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-[var(--gold)] shrink-0" />
            <span>Secure payment · Instant access</span>
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--edge)]" />

          {/* Course Meta */}
          <div className="space-y-3">
            <h4 className="text-[var(--frost)] font-bold font-playfair text-base tracking-wide">
              This course includes:
            </h4>
            {[
              { emoji: "🎥", text: "HD video lessons with lifetime access" },
              { emoji: "📁", text: "Downloadable resources & source code" },
              { emoji: "🏆", text: "Verifiable certificate of completion" },
              { emoji: "💬", text: "Community & doubt support" },
              { emoji: "📱", text: "Access on mobile, tablet & desktop" },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex items-start gap-3 text-sm text-[var(--frost-dim)] group/item hover:text-[var(--frost)] transition-colors">
                <span className="text-base leading-none mt-0.5 opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all">{emoji}</span>
                <span className="leading-relaxed">{text}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--edge)]" />

          {/* Ratings */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${
                    s <= Math.round(course.rating) ? "text-[var(--gold)] fill-[var(--gold)]" : "text-[var(--ink-deep)]"
                  }`}
                />
              ))}
            </div>
            <span className="text-[var(--frost)] font-bold text-sm tracking-wider">{course.rating}</span>
            <span className="text-[var(--frost-faint)]">(2,400+ reviews)</span>
          </div>
        </div>
      </div>

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        courseName={course.title}
        courseId={course.id}
        price={course.price}
      />
    </>
  );
}
