"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnimatedNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--edge)] bg-[var(--ink)]/90 backdrop-blur-xl shadow-lg shadow-black/30"
          : "border-b border-transparent bg-[var(--ink)]/60 backdrop-blur-md"
      }`}
    >
      {/* top gold accent line that grows on scroll */}
      <div
        className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-bright)] transition-all duration-500 ${
          scrolled ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-[var(--gold)] flex items-center justify-center border border-[var(--edge-bright)] group-hover:animate-gold-pulse transition-all">
            <BookOpen className="h-4 w-4 text-[var(--ink)]" />
          </div>
          <span className="text-2xl font-black font-playfair bg-gradient-to-br from-[var(--gold-bright)] to-[var(--gold)] bg-clip-text text-transparent tracking-wide">
            KIF
          </span>
          <span className="font-sans font-bold text-[var(--frost)]">Academy</span>
        </Link>
