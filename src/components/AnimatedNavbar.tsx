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
