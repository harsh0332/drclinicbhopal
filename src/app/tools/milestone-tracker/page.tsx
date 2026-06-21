"use client";

import { useState } from "react";
import Link from "next/link";
import { getBreadcrumbSchema } from "@/lib/schemas";
import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";
import { 
  ArrowLeft, 
  ShieldAlert, 
  Calendar,
  CheckCircle,
  HelpCircle,
  Activity,
  Smile,
  MessageCircle,
  Brain
} from "lucide-react";

interface MilestoneItem {
  id: string;
  text: string;
  category: "motor" | "language" | "cognitive" | "social";
}

interface MilestoneAgeGroup {
  ageLabel: string;
  milestones: MilestoneItem[];
}

const milestoneData: Record<string, MilestoneAgeGroup> = {
  "2m": {
    ageLabel: "2 Months",
    milestones: [
      { id: "2m-m1", text: "Holds head up when on tummy", category: "motor" },
      { id: "2m-m2", text: "Makes smoother movements with arms and legs", category: "motor" },
      { id: "2m-l1", text: "Coos and makes gurgling sounds", category: "language" },
      { id: "2m-l2", text: "Turns head towards sounds", category: "language" },
      { id: "2m-c1", text: "Pays attention to faces", category: "cognitive" },
      { id: "2m-c2", text: "Follows things with eyes and recognizes people at a distance", category: "cognitive" },
      { id: "2m-s1", text: "Begins to smile at people", category: "social" },
      { id: "2m-s2", text: "Can briefly calm down (may bring hands to mouth)", category: "social" }
    ]
  },
  "4m": {
    ageLabel: "4 Months",
    milestones: [
      { id: "4m-m1", text: "Holds head steady, unsupported", category: "motor" },
      { id: "4m-m2", text: "Pushes down on legs when feet are on a hard surface", category: "motor" },
      { id: "4m-m3", text: "Rolls from tummy to back", category: "motor" },
      { id: "4m-l1", text: "Babbles with expression and copies sounds heard", category: "language" },
      { id: "4m-c1", text: "Reaches for toy with one hand", category: "cognitive" },
      { id: "4m-c2", text: "Uses hands and eyes together (sees toy, reaches for it)", category: "cognitive" },
      { id: "4m-s1", text: "Smiles spontaneously, especially at people", category: "social" },
      { id: "4m-s2", text: "Likes to play with people and might cry when playing stops", category: "social" }
    ]
  },
  "6m": {
    ageLabel: "6 Months",
    milestones: [
      { id: "6m-m1", text: "Rolls over in both directions (front to back, back to front)", category: "motor" },
      { id: "6m-m2", text: "Begins to sit without support", category: "motor" },
      { id: "6m-l1", text: "Responds to own name", category: "language" },
      { id: "6m-l2", text: "Makes sounds back when talked to (babbles chains of consonants)", category: "language" },
      { id: "6m-c1", text: "Brings things to mouth to explore", category: "cognitive" },
      { id: "6m-c2", text: "Shows curiosity about things and reaches for distant items", category: "cognitive" },
      { id: "6m-s1", text: "Knows familiar faces and begins to notice strangers", category: "social" },
      { id: "6m-s2", text: "Likes to look at self in a mirror", category: "social" }
    ]
  },
  "9m": {
    ageLabel: "9 Months",
    milestones: [
      { id: "9m-m1", text: "Crawls or scoots on bottom", category: "motor" },
      { id: "9m-m2", text: "Pulls up to stand holding furniture", category: "motor" },
      { id: "9m-l1", text: "Understands the word 'no'", category: "language" },
      { id: "9m-l2", text: "Makes a lot of different sounds (e.g. 'mamama', 'bababa')", category: "language" },
      { id: "9m-c1", text: "Looks for objects they see you hide", category: "cognitive" },
      { id: "9m-c2", text: "Uses thumb and index finger to pick things up (pincer grasp)", category: "cognitive" },
      { id: "9m-s1", text: "May be afraid of strangers or clingy with familiar adults", category: "social" },
      { id: "9m-s2", text: "Has favorite toys that they prefer", category: "social" }
    ]
  },
  "12m": {
    ageLabel: "12 Months (1 Year)",
    milestones: [
      { id: "12m-m1", text: "Walks holding on to furniture (cruising)", category: "motor" },
      { id: "12m-m2", text: "May take a few steps without holding on", category: "motor" },
      { id: "12m-l1", text: "Says basic words like 'mama' or 'dada' or simple approximations", category: "language" },
      { id: "12m-l2", text: "Responds to simple verbal requests and shakes head 'no'", category: "language" },
      { id: "12m-c1", text: "Explores objects by shaking, banging, or throwing them", category: "cognitive" },
      { id: "12m-c2", text: "Points to objects or waves goodbye", category: "cognitive" },
      { id: "12m-s1", text: "Shy or anxious with strangers, cries when parents leave", category: "social" },
      { id: "12m-s2", text: "Shows fear in some situations", category: "social" }
    ]
  },
  "18m": {
    ageLabel: "18 Months",
    milestones: [
      { id: "18m-m1", text: "Walks alone independently", category: "motor" },
      { id: "18m-m2", text: "Drinks from a cup and eats with a spoon", category: "motor" },
      { id: "18m-l1", text: "Says several single words", category: "language" },
      { id: "18m-l2", text: "Points to show someone what they want", category: "language" },
      { id: "18m-c1", text: "Knows what ordinary things are for (e.g. phone, spoon)", category: "cognitive" },
      { id: "18m-c2", text: "Points to one body part when asked", category: "cognitive" },
      { id: "18m-s1", text: "Shows affection to familiar people", category: "social" },
      { id: "18m-s2", text: "Plays simple pretend, like feeding a doll", category: "social" }
    ]
  },
  "2y": {
    ageLabel: "2 Years",
    milestones: [
      { id: "2y-m1", text: "Runs easily, kicks a ball, and throws overhand", category: "motor" },
      { id: "2y-m2", text: "Walks up and down stairs holding on", category: "motor" },
      { id: "2y-l1", text: "Says sentences with 2 to 4 words", category: "language" },
      { id: "2y-l2", text: "Points to things or pictures when named", category: "language" },
      { id: "2y-c1", text: "Begins to sort shapes and colors", category: "cognitive" },
      { id: "2y-c2", text: "Finds things even when hidden under two or three covers", category: "cognitive" },
      { id: "2y-s1", text: "Copies others, especially adults and older children", category: "social" },
      { id: "2y-s2", text: "Plays mainly alongside other children (parallel play)", category: "social" }
    ]
  },
  "3y": {
    ageLabel: "3 Years",
    milestones: [
      { id: "3y-m1", text: "Climbs well, runs easily, and pedals a tricycle", category: "motor" },
      { id: "3y-l1", text: "Carries on a simple conversation using 2 or 3 sentences", category: "language" },
      { id: "3y-l2", text: "Names most familiar items and understood by family", category: "language" },
      { id: "3y-c1", text: "Works toys with buttons, levers, and moving parts", category: "cognitive" },
      { id: "3y-c2", text: "Plays make-believe with dolls, animals, and people", category: "cognitive" },
      { id: "3y-s1", text: "Shows affection for friends without prompting", category: "social" },
      { id: "3y-s2", text: "Takes turns in games and understands 'mine' and 'yours'", category: "social" }
    ]
  },
  "4y": {
    ageLabel: "4 Years",
    milestones: [
      { id: "4y-m1", text: "Pours, cuts with safety scissors, and mashes own food", category: "motor" },
      { id: "4y-m2", text: "Hops and stands on one foot for up to 2 seconds", category: "motor" },
      { id: "4y-l1", text: "Tells simple stories and speaks clearly enough for strangers", category: "language" },
      { id: "4y-c1", text: "Names some colors and numbers, understands basic counting", category: "cognitive" },
      { id: "4y-c2", text: "Draws a person with 2 to 4 body parts", category: "cognitive" },
      { id: "4y-s1", text: "Would rather play with other children than alone", category: "social" },
      { id: "4y-s2", text: "Cooperates with other children in play", category: "social" }
    ]
  },
  "5y": {
    ageLabel: "5 Years",
    milestones: [
      { id: "5y-m1", text: "Stands on one foot for 10 seconds or longer, hops, somersaults", category: "motor" },
      { id: "5y-m2", text: "Swings and climbs on playground equipment", category: "motor" },
      { id: "5y-l1", text: "Speaks very clearly, using full sentences", category: "language" },
      { id: "5y-l2", text: "Tells a simple story using full sentences and recalls names", category: "language" },
      { id: "5y-c1", text: "Counts 10 or more objects and draws a person with 6+ parts", category: "cognitive" },
      { id: "5y-c2", text: "Knows about things used daily, like money or food", category: "cognitive" },
      { id: "5y-s1", text: "Wants to please and be like friends, agrees to rules", category: "social" },
      { id: "5y-s2", text: "Shows more independence and can distinguish real from make-believe", category: "social" }
    ]
  }
};

export default function MilestoneTrackerPage() {
  const [selectedAge, setSelectedAge] = useState<string>("2m");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const currentGroup = milestoneData[selectedAge];
  const milestones = currentGroup.milestones;

  // Toggle checkbox state
  const handleToggle = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Calculate stats for current age group
  const totalInGroup = milestones.length;
  const checkedInGroup = milestones.filter((item) => checkedItems[item.id]).length;
  const percentage = Math.round((checkedInGroup / totalInGroup) * 100) || 0;

  // Reset checked items for current age group
  const handleResetGroup = () => {
    const updated = { ...checkedItems };
    milestones.forEach((item) => {
      delete updated[item.id];
    });
    setCheckedItems(updated);
  };

  // Category layout mapping helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "motor":
        return <Activity className="w-4 h-4 text-[#2E6CF6]" />;
      case "language":
        return <MessageCircle className="w-4 h-4 text-[#34C7A4]" />;
      case "cognitive":
        return <Brain className="w-4 h-4 text-[#FF8A7A]" />;
      case "social":
        return <Smile className="w-4 h-4 text-[#FFC53D]" />;
      default:
        return <HelpCircle className="w-4 h-4 text-muted-text" />;
    }
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Parent Tools", item: "/tools" },
    { name: "Milestone Tracker", item: "/tools/milestone-tracker" }
  ]);

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Header */}
      <section className="bg-surface-tint border-b border-gray-100 py-10 relative overflow-hidden">
        {/* Background SVGs */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 select-none">
          <div className="absolute right-[12%] top-[10%]">
            <Cloud className="w-36 h-20 fill-primary" />
          </div>
          <div className="absolute left-[30%] bottom-[-10px]">
            <BabyFootprints className="w-12 h-10 rotate-[15deg] fill-primary" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline w-max"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to home</span>
            </Link>
            
            <span className="text-[10px] font-bold text-primary bg-white border border-primary/10 py-1 px-2.5 rounded-full uppercase tracking-wider w-max">
              Parent Utility Tool
            </span>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Child Development Milestone Tracker
            </h1>
            
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Interactive CDC &amp; WHO-aligned child growth checklist. Track motor, speech, cognitive, and social milestones from 2 months up to 5 years.
            </p>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
            
            {/* Left Column: Interactive Checklists */}
            <div className="lg:col-span-8 flex flex-col gap-6 text-left">
              
              {/* Age Selection Tabs */}
              <div className="bg-white border border-gray-150 p-2.5 rounded-2xl shadow-soft overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-none">
                {Object.entries(milestoneData).map(([key, group]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAge(key)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold font-heading transition-all cursor-pointer inline-block shrink-0 ${
                      selectedAge === key
                        ? "bg-primary text-white"
                        : "bg-surface-tint text-primary-dark hover:bg-blue-100/50"
                    }`}
                  >
                    {group.ageLabel}
                  </button>
                ))}
              </div>

              {/* Milestones Card */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6 relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary rounded-t-3xl" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold font-heading text-primary-dark">
                      Milestones Checklist for {currentGroup.ageLabel}
                    </h2>
                    <p className="text-xs text-muted-text font-sans">
                      Select the skills your child is consistently demonstrating.
                    </p>
                  </div>
                  <button
                    onClick={handleResetGroup}
                    className="text-xs font-semibold text-muted-text hover:text-primary transition-colors cursor-pointer w-max"
                  >
                    Reset Checkboxes
                  </button>
                </div>

                {/* Items List */}
                <div className="flex flex-col gap-4">
                  {milestones.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleToggle(item.id)}
                        className={`p-4 border rounded-2xl cursor-pointer flex gap-4 items-start transition-all duration-200 select-none ${
                          isChecked
                            ? "bg-surface-tint border-primary/20"
                            : "bg-white border-gray-150 hover:bg-gray-50/50"
                        }`}
                      >
                        {/* Custom checkbox */}
                        <div className="pt-0.5 shrink-0">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                            isChecked
                              ? "bg-primary border-primary text-white"
                              : "border-gray-300"
                          }`}>
                            {isChecked && <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        {/* Text & tag */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs sm:text-sm font-sans text-gray-800 leading-relaxed font-medium">
                            {item.text}
                          </span>
                          
                          {/* Domain tag */}
                          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-text">
                            {getCategoryIcon(item.category)}
                            <span className="font-heading">{item.category} Domain</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Progress & Advice */}
            <div className="lg:col-span-4 flex flex-col gap-6 text-left">
              
              {/* Progress Panel */}
              <div className="bg-white border border-gray-150 p-6 rounded-3xl shadow-soft flex flex-col gap-5">
                <h3 className="text-sm font-bold font-heading text-primary-dark border-b border-gray-50 pb-2">
                  Development Progress
                </h3>
                
                {/* Progress Circle & Text */}
                <div className="flex items-center gap-5">
                  {/* Dynamic Progress Indicator */}
                  <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        className="stroke-gray-100 fill-none"
                        strokeWidth="7"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        className="stroke-primary fill-none transition-all duration-500 ease-out"
                        strokeWidth="7"
                        strokeDasharray={2 * Math.PI * 34}
                        strokeDashoffset={2 * Math.PI * 34 * (1 - percentage / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-base font-bold font-heading text-primary-dark">
                      {percentage}%
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-bold font-heading text-primary-dark">
                      {checkedInGroup} of {totalInGroup} Met
                    </span>
                    <span className="text-[11px] text-muted-text font-sans">
                      Skills logged for {currentGroup.ageLabel}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  Checking these items off regularly helps identify subtle shifts in motor or communication parameters early.
                </p>
              </div>

              {/* Medical Notice / Warning */}
              <div className="bg-red-50/40 border border-red-100 rounded-3xl p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-emergency">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <h4 className="text-xs font-bold font-heading text-primary-dark">
                    Development Screening Guidance
                  </h4>
                </div>
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  Every child develops at their own individual rate. This screening checklist is designed for educational tracking only and does not diagnose autism, learning delays, or motor constraints.
                </p>
                <p className="text-xs text-muted-text font-sans leading-relaxed font-semibold text-gray-900 border-t border-red-150/50 pt-2.5 mt-1">
                  💡 **Seek pediatric consultation if:** Your child is missing multiple milestones, fails to respond to sound or name, or experiences any regression (loss of skills once achieved).
                </p>
              </div>

              {/* Consultation CTA */}
              <div className="bg-surface-tint border border-primary/5 p-6 rounded-3xl flex flex-col gap-4">
                <h4 className="text-sm font-bold font-heading text-primary-dark">
                  Need a specialist review?
                </h4>
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  Dr. Manisha Bangarwa Arya specializes in neonatal milestones and growth tracking. Request a consultation slot.
                </p>
                <Link
                  href="/book-appointment"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white text-xs font-semibold py-3.5 rounded-xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>Book Milestone Assessment</span>
                </Link>
              </div>

            </div>

          </div>
          
        </div>
      </section>
    </main>
  );
}
