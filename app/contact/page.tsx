"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setFormStatus("success");

    // Reset status after 5 seconds
    setTimeout(() => setFormStatus("idle"), 5000);
  };

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 lg:mb-24 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-secondary text-muted-foreground border border-border mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          Get In Touch
        </span>
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          We&apos;d love to hear <br /> from{" "}
          <span className="italic text-muted-foreground/60">you.</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-5 duration-1000">
          Whether you have a question about our scents, an order, or just want
          to share your fragrance story, our team is here to help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 pb-4 border-b border-border">
              Contact Details
            </h2>

            <div className="grid gap-10">
              <ContactInfoItem
                icon={<Mail className="text-muted-foreground" size={20} />}
                title="Email Us"
                content="@opalscents.com"
                subtext="Expect a reply within 24 hours"
              />
              <ContactInfoItem
                icon={<Phone className="text-muted-foreground" size={20} />}
                title="Call Us"
                content="+234 814-306-6124 "
                subtext="Mon-Fri from 9am to 6pm EST"
              />
              <ContactInfoItem
                icon={<MapPin className="text-muted-foreground" size={20} />}
                title="Our Studio"
                content="123 Lekki Avenue, Scent District"
                subtext="Lagos, Nigeria"
              />
              <ContactInfoItem
                icon={<Clock className="text-muted-foreground" size={20} />}
                title="Opening Hours"
                content="Monday — Saturday"
                subtext="10:00 AM — 08:00 PM"
              />
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-border">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
              Follow Our Story
            </h3>
            <div className="flex gap-4">
              <SocialLink icon={<Instagram size={20} />} href="#" />
              <SocialLink icon={<Twitter size={20} />} href="#" />
              <SocialLink icon={<Facebook size={20} />} href="#" />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card className="border-border bg-secondary/30 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5 rounded-3xl">
            <CardContent className="p-8 md:p-12">
              <div className="mb-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif tracking-tight text-foreground">
                    Send a Message
                  </h3>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-1 opacity-70">
                    We&apos;ll get back to you shortly
                  </p>
                </div>
              </div>

              {formStatus === "success" ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={32} />
                  </div>
                  <h4 className="text-2xl font-serif text-foreground">
                    Message Sent!
                  </h4>
                  <p className="text-muted-foreground font-medium max-w-xs mx-auto">
                    Thank you for reaching out. A member of our team will
                    contact you very soon.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 rounded-full px-8"
                    onClick={() => setFormStatus("idle")}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Full Name
                      </label>
                      <Input
                        placeholder="E.g. Alexander Opal"
                        required
                        className="bg-background/50 border-border rounded-xl h-14 px-5 text-sm font-medium transition-all focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="alex@example.com"
                        required
                        className="bg-background/50 border-border rounded-xl h-14 px-5 text-sm font-medium transition-all focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Subject
                    </label>
                    <Input
                      placeholder="How can we help?"
                      required
                      className="bg-background/50 border-border rounded-xl h-14 px-5 text-sm font-medium transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Your Message
                    </label>
                    <Textarea
                      placeholder="Write your message here..."
                      required
                      className="min-h-[180px] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Decorative background element */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50" />
    </div>
  );
}

function ContactInfoItem({
  icon,
  title,
  content,
  subtext,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  subtext: string;
}) {
  return (
    <div className="flex gap-6 group">
      <div className="w-12 h-12 rounded-2xl bg-secondary border border-border flex items-center justify-center transition-all group-hover:bg-primary/10 group-hover:border-primary/20 shrink-0">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
          {title}
        </h4>
        <p className="text-lg font-serif tracking-tight text-foreground">
          {content}
        </p>
        <p className="text-xs font-medium text-muted-foreground opacity-80">
          {subtext}
        </p>
      </div>
    </div>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-95"
    >
      {icon}
    </Link>
  );
}
