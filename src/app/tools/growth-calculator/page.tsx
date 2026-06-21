"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/schemas";
import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";
import { 
  Scale, 
  Ruler, 
  ArrowLeft, 
  ShieldAlert, 
  Calendar,
  Calculator,
  RefreshCw,
  Info
} from "lucide-react";

// WHO growth parameters by age (in months) for interpolation
interface GrowthDataPoint {
  ageMonths: number;
  weightMed: number;
  weightSD: number;
  heightMed: number;
  heightSD: number;
  bmiMed: number;
  bmiSD: number;
}

const boysGrowthData: GrowthDataPoint[] = [
  { ageMonths: 0, weightMed: 3.3, weightSD: 0.4, heightMed: 49.9, heightSD: 1.9, bmiMed: 13.0, bmiSD: 1.0 },
  { ageMonths: 3, weightMed: 6.4, weightSD: 0.6, heightMed: 61.4, heightSD: 2.0, bmiMed: 16.8, bmiSD: 1.1 },
  { ageMonths: 6, weightMed: 7.9, weightSD: 0.7, heightMed: 67.6, heightSD: 2.1, bmiMed: 17.5, bmiSD: 1.2 },
  { ageMonths: 9, weightMed: 8.9, weightSD: 0.8, heightMed: 72.0, heightSD: 2.2, bmiMed: 17.2, bmiSD: 1.2 },
  { ageMonths: 12, weightMed: 9.6, weightSD: 0.9, heightMed: 75.7, heightSD: 2.3, bmiMed: 16.8, bmiSD: 1.2 },
  { ageMonths: 18, weightMed: 10.9, weightSD: 1.0, heightMed: 82.3, heightSD: 2.5, bmiMed: 16.2, bmiSD: 1.1 },
  { ageMonths: 24, weightMed: 12.2, weightSD: 1.1, heightMed: 87.8, heightSD: 3.0, bmiMed: 16.0, bmiSD: 1.1 },
  { ageMonths: 36, weightMed: 14.3, weightSD: 1.3, heightMed: 96.1, heightSD: 3.5, bmiMed: 15.6, bmiSD: 1.0 },
  { ageMonths: 48, weightMed: 16.3, weightSD: 1.6, heightMed: 103.3, heightSD: 4.0, bmiMed: 15.3, bmiSD: 1.0 },
  { ageMonths: 60, weightMed: 18.3, weightSD: 1.9, heightMed: 110.0, heightSD: 4.5, bmiMed: 15.2, bmiSD: 1.0 },
  { ageMonths: 72, weightMed: 20.5, weightSD: 2.3, heightMed: 116.0, heightSD: 5.0, bmiMed: 15.3, bmiSD: 1.1 },
  { ageMonths: 96, weightMed: 25.6, weightSD: 3.5, heightMed: 127.0, heightSD: 6.0, bmiMed: 15.6, bmiSD: 1.3 },
  { ageMonths: 120, weightMed: 32.0, weightSD: 5.0, heightMed: 138.0, heightSD: 7.0, bmiMed: 16.5, bmiSD: 1.8 }
];

const girlsGrowthData: GrowthDataPoint[] = [
  { ageMonths: 0, weightMed: 3.2, weightSD: 0.4, heightMed: 49.1, heightSD: 1.9, bmiMed: 13.0, bmiSD: 1.0 },
  { ageMonths: 3, weightMed: 5.8, weightSD: 0.6, heightMed: 59.8, heightSD: 2.0, bmiMed: 16.2, bmiSD: 1.1 },
  { ageMonths: 6, weightMed: 7.3, weightSD: 0.7, heightMed: 65.7, heightSD: 2.1, bmiMed: 16.8, bmiSD: 1.2 },
  { ageMonths: 9, weightMed: 8.2, weightSD: 0.8, heightMed: 70.1, heightSD: 2.2, bmiMed: 16.6, bmiSD: 1.2 },
  { ageMonths: 12, weightMed: 8.9, weightSD: 0.9, heightMed: 74.0, heightSD: 2.3, bmiMed: 16.3, bmiSD: 1.2 },
  { ageMonths: 18, weightMed: 10.2, weightSD: 1.0, heightMed: 80.7, heightSD: 2.5, bmiMed: 15.8, bmiSD: 1.1 },
  { ageMonths: 24, weightMed: 11.5, weightSD: 1.1, heightMed: 86.4, heightSD: 3.0, bmiMed: 15.8, bmiSD: 1.1 },
  { ageMonths: 36, weightMed: 13.9, weightSD: 1.3, heightMed: 95.1, heightSD: 3.5, bmiMed: 15.4, bmiSD: 1.0 },
  { ageMonths: 48, weightMed: 15.5, weightSD: 1.6, heightMed: 102.7, heightSD: 4.0, bmiMed: 15.1, bmiSD: 1.0 },
  { ageMonths: 60, weightMed: 17.5, weightSD: 1.9, heightMed: 109.4, heightSD: 4.5, bmiMed: 15.0, bmiSD: 1.0 },
  { ageMonths: 72, weightMed: 19.6, weightSD: 2.3, heightMed: 115.1, heightSD: 5.0, bmiMed: 15.0, bmiSD: 1.1 },
  { ageMonths: 96, weightMed: 25.0, weightSD: 3.5, heightMed: 126.0, heightSD: 6.0, bmiMed: 15.5, bmiSD: 1.3 },
  { ageMonths: 120, weightMed: 32.5, weightSD: 5.0, heightMed: 138.0, heightSD: 7.0, bmiMed: 16.5, bmiSD: 1.8 }
];

// Helper to interpolate median and SD values for a given age
function getInterpolatedParams(
  ageMonths: number,
  gender: "male" | "female"
): { weightM: number; weightS: number; heightM: number; heightS: number; bmiM: number; bmiS: number } {
  const data = gender === "male" ? boysGrowthData : girlsGrowthData;

  // Edge cases
  if (ageMonths <= 0) {
    return {
      weightM: data[0].weightMed, weightS: data[0].weightSD,
      heightM: data[0].heightMed, heightS: data[0].heightSD,
      bmiM: data[0].bmiMed, bmiS: data[0].bmiSD
    };
  }
  if (ageMonths >= 120) {
    const last = data[data.length - 1];
    return {
      weightM: last.weightMed, weightS: last.weightSD,
      heightM: last.heightMed, heightS: last.heightSD,
      bmiM: last.bmiMed, bmiS: last.bmiSD
    };
  }

  // Find flanking data points
  let lowIdx = 0;
  let highIdx = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (ageMonths >= data[i].ageMonths && ageMonths <= data[i + 1].ageMonths) {
      lowIdx = i;
      highIdx = i + 1;
      break;
    }
  }

  const pLow = data[lowIdx];
  const pHigh = data[highIdx];
  const factor = (ageMonths - pLow.ageMonths) / (pHigh.ageMonths - pLow.ageMonths);

  const interpolate = (start: number, end: number) => start + factor * (end - start);

  return {
    weightM: interpolate(pLow.weightMed, pHigh.weightMed),
    weightS: interpolate(pLow.weightSD, pHigh.weightSD),
    heightM: interpolate(pLow.heightMed, pHigh.heightMed),
    heightS: interpolate(pLow.heightSD, pHigh.heightSD),
    bmiM: interpolate(pLow.bmiMed, pHigh.bmiMed),
    bmiS: interpolate(pLow.bmiSD, pHigh.bmiSD)
  };
}

// Convert Z-score to percentile bands
function getPercentileBand(zScore: number): { band: string; description: string; color: string } {
  if (zScore <= -2) {
    return { 
      band: "Below the 3rd Percentile", 
      description: "Significantly below the median. This indicates a potential concern that should be reviewed factually with our pediatrician.",
      color: "text-red-600 bg-red-50 border-red-100" 
    };
  } else if (zScore > -2 && zScore <= -1.04) {
    return { 
      band: "3rd to 15th Percentile", 
      description: "Slightly below the median. Often normal, but recommended to track linear growth trajectories closely.",
      color: "text-amber-600 bg-amber-50 border-amber-100" 
    };
  } else if (zScore > -1.04 && zScore < 1.04) {
    return { 
      band: "15th to 85th Percentile (Average Range)", 
      description: "Typical healthy range. Your child sits well within the standard growth distribution curve.",
      color: "text-green-600 bg-green-50 border-green-100" 
    };
  } else if (zScore >= 1.04 && zScore < 2) {
    return { 
      band: "85th to 97th Percentile", 
      description: "Slightly above the median. Normal robust growth patterns.",
      color: "text-amber-600 bg-amber-50 border-amber-100" 
    };
  } else {
    return { 
      band: "Above the 97th Percentile", 
      description: "Significantly above the median. Tracking height/weight parameters with a pediatrician can rule out metabolic changes.",
      color: "text-red-600 bg-red-50 border-red-100" 
    };
  }
}

export default function GrowthCalculatorPage() {
  // Input states
  const [gender, setGender] = useState<"male" | "female">("male");
  const [ageYears, setAgeYears] = useState("2");
  const [ageMonthsInput, setAgeMonthsInput] = useState("0");
  const [heightCm, setHeightCm] = useState("88");
  const [weightKg, setWeightKg] = useState("12");

  // Output states
  const [result, setResult] = useState<{
    bmi: number;
    weightPercentile: { band: string; description: string; color: string };
    heightPercentile: { band: string; description: string; color: string };
    bmiPercentile: { band: string; description: string; color: string };
  } | null>(null);

  const [error, setError] = useState("");

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const yrs = parseInt(ageYears) || 0;
    const mths = parseInt(ageMonthsInput) || 0;
    const totalMonths = yrs * 12 + mths;

    const wt = parseFloat(weightKg);
    const ht = parseFloat(heightCm);

    if (totalMonths < 0 || totalMonths > 120) {
      setError("Please specify an age between 0 months and 10 years.");
      return;
    }
    if (isNaN(ht) || ht < 30 || ht > 180) {
      setError("Please specify a valid height between 30 cm and 180 cm.");
      return;
    }
    if (isNaN(wt) || wt < 1 || wt > 100) {
      setError("Please specify a valid weight between 1 kg and 100 kg.");
      return;
    }

    // Calculations
    const heightM = ht / 100;
    const computedBmi = wt / (heightM * heightM);

    const params = getInterpolatedParams(totalMonths, gender);

    // Z-scores
    const zWeight = (wt - params.weightM) / params.weightS;
    const zHeight = (ht - params.heightM) / params.heightS;
    const zBmi = (computedBmi - params.bmiM) / params.bmiS;

    setResult({
      bmi: Number(computedBmi.toFixed(1)),
      weightPercentile: getPercentileBand(zWeight),
      heightPercentile: getPercentileBand(zHeight),
      bmiPercentile: getPercentileBand(zBmi)
    });
  };

  const handleReset = () => {
    setGender("male");
    setAgeYears("2");
    setAgeMonthsInput("0");
    setHeightCm("88");
    setWeightKg("12");
    setResult(null);
    setError("");
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Parent Tools", item: "/tools" },
    { name: "Growth Calculator", item: "/tools/growth-calculator" }
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
              Child Growth Percentile &amp; BMI Calculator
            </h1>
            
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Factual weight, height, and BMI screening utility referencing WHO growth curves for infants and children up to 10 years of age.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
            
            {/* Left Column: Form Card */}
            <div className="lg:col-span-5 bg-white border border-gray-150 p-6 sm:p-8 rounded-3xl shadow-soft text-left relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-3xl" />
              
              <h2 className="text-lg font-bold font-heading text-primary-dark mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                <span>Enter Measurements</span>
              </h2>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-2.5 text-xs text-red-700 leading-relaxed font-sans mb-5">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleCalculate} className="flex flex-col gap-5">
                {/* Sex Selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">
                    Child&apos;s Sex
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setGender("male")}
                      className={`py-3 px-4 rounded-xl border text-xs font-semibold font-sans transition-all cursor-pointer text-center ${
                        gender === "male"
                          ? "bg-primary/5 border-primary text-primary"
                          : "border-gray-250 text-muted-text hover:bg-gray-50"
                      }`}
                    >
                      Male (Boy)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender("female")}
                      className={`py-3 px-4 rounded-xl border text-xs font-semibold font-sans transition-all cursor-pointer text-center ${
                        gender === "female"
                          ? "bg-primary/5 border-primary text-primary"
                          : "border-gray-250 text-muted-text hover:bg-gray-50"
                      }`}
                    >
                      Female (Girl)
                    </button>
                  </div>
                </div>

                {/* Age Selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">
                    Child&apos;s Age
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="input-years" className="text-[9px] text-muted-text uppercase font-semibold">Years</label>
                      <input
                        id="input-years"
                        type="number"
                        min="0"
                        max="10"
                        required
                        value={ageYears}
                        onChange={(e) => setAgeYears(e.target.value)}
                        placeholder="e.g. 2"
                        className="border border-gray-250 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="input-months" className="text-[9px] text-muted-text uppercase font-semibold">Months</label>
                      <input
                        id="input-months"
                        type="number"
                        min="0"
                        max="11"
                        required
                        value={ageMonthsInput}
                        onChange={(e) => setAgeMonthsInput(e.target.value)}
                        placeholder="e.g. 6"
                        className="border border-gray-250 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Height Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="input-height" className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">
                    Height (in cm)
                  </label>
                  <div className="relative">
                    <input
                      id="input-height"
                      type="number"
                      step="0.1"
                      required
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="e.g. 88"
                      className="w-full border border-gray-250 rounded-xl py-3 pl-4 pr-12 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-text font-semibold pointer-events-none">
                      cm
                    </span>
                  </div>
                </div>

                {/* Weight Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="input-weight" className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">
                    Weight (in kg)
                  </label>
                  <div className="relative">
                    <input
                      id="input-weight"
                      type="number"
                      step="0.05"
                      required
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="e.g. 12"
                      className="w-full border border-gray-250 rounded-xl py-3 pl-4 pr-12 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-text font-semibold pointer-events-none">
                      kg
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center bg-primary text-white text-xs font-semibold py-3.5 px-6 rounded-xl hover:bg-primary-dark shadow-md active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Calculate Growth
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center border border-gray-200 text-muted-text hover:text-primary-dark text-xs font-semibold p-3.5 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
                    title="Reset"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Results Display */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              {result ? (
                <div className="bg-white border border-gray-150 p-6 sm:p-8 rounded-3xl shadow-soft flex flex-col gap-6 animate-in fade-in duration-300">
                  <h3 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-100 pb-3">
                    Screening Results
                  </h3>

                  {/* BMI Widget */}
                  <div className="bg-surface-tint border border-primary/5 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-text font-sans">Computed Body Mass Index (BMI)</span>
                      <span className="text-3xl font-extrabold text-primary-dark font-heading leading-none">
                        {result.bmi} <span className="text-sm font-semibold font-sans text-muted-text">kg/m²</span>
                      </span>
                    </div>
                    <div className="text-xs font-semibold px-4 py-2 bg-white border border-primary/10 rounded-xl text-primary-dark">
                      BMI Percentile: {result.bmiPercentile.band.split(" (")[0]}
                    </div>
                  </div>

                  {/* Parameters Percentile Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Height Percentile */}
                    <div className="border border-gray-150 p-5 rounded-2xl flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 text-primary">
                        <Ruler className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary-dark">Height parameters</span>
                      </div>
                      <div className={`text-xs font-bold py-1.5 px-3 rounded-lg border w-max ${result.heightPercentile.color}`}>
                        {result.heightPercentile.band}
                      </div>
                      <p className="text-[11px] text-muted-text font-sans leading-relaxed">
                        {result.heightPercentile.description}
                      </p>
                    </div>

                    {/* Weight Percentile */}
                    <div className="border border-gray-150 p-5 rounded-2xl flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 text-primary">
                        <Scale className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary-dark">Weight parameters</span>
                      </div>
                      <div className={`text-xs font-bold py-1.5 px-3 rounded-lg border w-max ${result.weightPercentile.color}`}>
                        {result.weightPercentile.band}
                      </div>
                      <p className="text-[11px] text-muted-text font-sans leading-relaxed">
                        {result.weightPercentile.description}
                      </p>
                    </div>
                  </div>

                  {/* Informational Guidance */}
                  <div className="p-4 bg-gray-50 border border-gray-150 rounded-2xl flex items-start gap-2.5 text-xs text-muted-text leading-relaxed font-sans">
                    <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">What do percentiles mean?</p>
                      <p>A percentile indicates where your child sits relative to a group of 100 typical peers. Being in the 50th percentile means your child is exactly at the median. A percentile anywhere between 3rd and 97th is generally considered standard. Most importantly, growth should be a steady, upward trajectory over time, rather than a single fixed metric.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-150 rounded-3xl p-10 flex flex-col items-center justify-center text-center min-h-[300px] gap-3">
                  <Calculator className="w-12 h-12 text-primary/30" />
                  <h3 className="text-lg font-bold font-heading text-primary-dark">Await Calculation</h3>
                  <p className="text-xs text-muted-text font-sans max-w-sm leading-relaxed">
                    Fill in your child&apos;s sex, age, height, and weight on the left and click &ldquo;Calculate Growth&rdquo; to estimate percentile bands.
                  </p>
                </div>
              )}

              {/* Informational Disclaimer */}
              <div className="p-5 bg-red-50/40 border border-red-100 rounded-2xl flex gap-3 text-xs text-muted-text leading-relaxed font-sans">
                <ShieldAlert className="w-5 h-5 text-emergency shrink-0 mt-0.5" />
                <div>
                  <strong className="text-primary-dark font-heading block mb-1">
                    Screening Utility Disclaimer
                  </strong>
                  <p>This calculator is strictly an educational screening utility. It does NOT diagnose pediatric medical conditions, growth hormone deficits, thyroid issues, or acute failure to thrive. Accurate diagnosis requires plotting multiple measurements over time on paper WHO charts during comprehensive clinical examinations by a qualified pediatrician.</p>
                  <p className="mt-1.5 font-semibold text-gray-950">
                    {siteConfig.compliance.medicalRegistration}
                  </p>
                </div>
              </div>

              {/* Booking Call to Action */}
              <div className="bg-surface-tint border border-primary/5 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-1 max-w-md">
                  <h4 className="text-base font-bold font-heading text-primary-dark">
                    Concerned about your child&apos;s growth?
                  </h4>
                  <p className="text-xs text-muted-text font-sans leading-relaxed">
                    Arrange a comprehensive wellness exam and growth chart logging with our pediatric specialists.
                  </p>
                </div>
                <Link
                  href="/book-appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-xs font-semibold py-3 px-5 rounded-xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98] cursor-pointer shrink-0"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>Book Growth Review</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
