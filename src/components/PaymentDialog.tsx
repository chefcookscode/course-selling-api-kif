"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getTimeBasedQRCodeUrl, UPI_ID, GOOGLE_FORM_LINK } from "@/lib/courses";
import { QrCode, CreditCard, ExternalLink, Copy, Check } from "lucide-react";

type PaymentMethod = "qr" | "upi" | null;

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseName: string;
  courseId: string;
  price: number;
}

export default function PaymentDialog({
  open,
  onOpenChange,
  courseName,
  courseId,
  price,
}: PaymentDialogProps) {
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [copied, setCopied] = useState(false);

  const qrUrl = getTimeBasedQRCodeUrl(courseId, price);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without clipboard API permission
      const el = document.createElement("textarea");
      el.value = UPI_ID;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) setMethod(null);
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-[var(--ink)] border-[var(--edge)]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[var(--frost)] font-black font-playfair tracking-wide">
            Complete Your Payment
          </DialogTitle>
          <DialogDescription className="text-[var(--frost-faint)] font-sans">
            {courseName} &mdash;{" "}
            <span className="text-[var(--gold)] font-mono tracking-widest font-bold">₹{price.toLocaleString("en-IN")}</span>
          </DialogDescription>
        </DialogHeader>

        {!method ? (
          <div className="space-y-6 py-4">
            <p className="text-[var(--frost-dim)] text-[10px] font-mono tracking-widest uppercase text-center">
              Choose your preferred payment method
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setMethod("qr")}
                className="flex flex-col items-center gap-3 p-6 rounded-sm border border-[var(--edge)] bg-[var(--surface)] hover:border-[var(--gold)]/50 hover:bg-[var(--gold-dim)]/20 transition-all duration-200 group cursor-pointer"
              >
                <QrCode className="h-10 w-10 text-[var(--gold)] group-hover:scale-110 transition-transform" />
                <span className="text-[var(--frost)] font-bold text-sm tracking-wide">QR Code</span>
                <span className="text-[var(--frost-faint)] text-xs text-center font-sans tracking-wide">Scan &amp; Pay instantly</span>
              </button>
              <button
                onClick={() => setMethod("upi")}
                className="flex flex-col items-center gap-3 p-6 rounded-sm border border-[var(--edge)] bg-[var(--surface)] hover:border-[var(--gold)]/50 hover:bg-[var(--gold-dim)]/20 transition-all duration-200 group cursor-pointer"
              >
                <CreditCard className="h-10 w-10 text-[var(--gold)] group-hover:scale-110 transition-transform" />
                <span className="text-[var(--frost)] font-bold text-sm tracking-wide">UPI ID</span>
                <span className="text-[var(--frost-faint)] text-xs text-center font-sans tracking-wide">Pay via any UPI app</span>
              </button>
            </div>
          </div>
        ) : method === "qr" ? (
          <div className="space-y-5 py-2">
            <div className="flex flex-col items-center gap-4">
              <div className="relative p-4 bg-white rounded-sm shadow-xl shadow-[var(--gold)]/10">
                <Image
                  src={qrUrl}
                  alt="Payment QR Code"
                  width={200}
                  height={200}
                  className="rounded-sm"
                  unoptimized
                />
              </div>
              <div className="text-center space-y-1.5">
                <p className="text-[var(--frost)] font-bold tracking-wide text-sm">Scan with any UPI app</p>
                <p className="text-[var(--frost-dim)] text-[10px] font-mono tracking-widest uppercase">
                  PhonePe · Google Pay · Paytm · BHIM
                </p>
                <p className="text-[var(--gold)] text-[10px] font-mono font-bold tracking-widest uppercase">
                  ⏱ QR refreshes every 5 mins
                </p>
              </div>
            </div>
            <div className="p-4 rounded-sm bg-[var(--gold-dim)]/10 border border-[var(--gold)]/20">
              <p className="text-[var(--gold)] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 mb-3">
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                After payment, fill the confirmation form
              </p>
              <a
                href={GOOGLE_FORM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 px-4 rounded-sm bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[var(--ink)] text-[10px] font-bold tracking-widest uppercase transition-colors"
              >
                Fill Form After Payment →
              </a>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-[var(--frost-dim)] hover:text-[var(--frost)] font-mono tracking-widest uppercase text-[10px]"
              onClick={() => setMethod(null)}
            >
              ← Change payment method
            </Button>
          </div>
        ) : (
          <div className="space-y-5 py-2">
            <div className="text-center space-y-3">
              <p className="text-[var(--frost-dim)] text-[10px] font-mono uppercase tracking-widest">Send payment to this UPI ID</p>
              <div className="flex items-center gap-2 p-4 rounded-sm bg-[var(--surface)] border border-[var(--edge)]">
                <div className="flex-1 text-left">
                  <p className="text-[10px] font-mono tracking-widest uppercase text-[var(--frost-dim)] mb-0.5">UPI ID</p>
                  <p className="text-[var(--frost)] font-mono font-bold text-lg tracking-wider">{UPI_ID}</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2.5 rounded-sm bg-[var(--edge)] hover:bg-[var(--edge-bright)] transition-colors text-[var(--frost-faint)] hover:text-[var(--frost)]"
                  title="Copy UPI ID"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {["PhonePe", "GPay", "Paytm"].map((app) => (
                  <div
                    key={app}
                    className="py-2.5 px-3 rounded-sm bg-[var(--surface)] border border-[var(--edge)] text-[var(--frost-dim)] text-[10px] font-mono uppercase tracking-widest text-center"
                  >
                    {app}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-sm bg-[var(--surface)] border border-[var(--edge)] text-left">
                <p className="text-[var(--frost-dim)] text-[10px] font-mono uppercase tracking-widest">Amount to pay</p>
                <p className="text-[var(--frost)] font-black text-2xl font-playfair tracking-wide mt-1">
                  ₹{price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <div className="p-4 rounded-sm bg-[var(--gold-dim)]/10 border border-[var(--gold)]/20 shadow-md">
              <p className="text-[var(--gold)] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 mb-3">
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                After payment, fill the confirmation form
              </p>
              <a
                href={GOOGLE_FORM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 px-4 rounded-sm bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[var(--ink)] text-[10px] font-bold tracking-widest uppercase transition-colors"
              >
                Fill Form After Payment →
              </a>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-[var(--frost-dim)] hover:text-[var(--frost)] font-mono tracking-widest uppercase text-[10px]"
              onClick={() => setMethod(null)}
            >
              ← Change payment method
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
