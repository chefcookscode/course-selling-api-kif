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
