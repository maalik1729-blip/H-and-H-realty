import { useState } from "react";
import { TrendingUp, Calculator, ShieldCheck, Sparkles, Building, Landmark } from "lucide-react";

type Corridor = "ECR" | "OMR" | "Tambaram" | "GST Road";

const CORRIDOR_RATES: Record<Corridor, { name: string; rate: number; desc: string }> = {
  ECR: {
    name: "East Coast Road (ECR)",
    rate: 0.12,
    desc: "High-end residential seaside properties experiencing luxury appreciation.",
  },
  OMR: {
    name: "Old Mahabalipuram Road (OMR)",
    rate: 0.1,
    desc: "IT highway corridors driven by tech hubs, premium housing, and high occupancy.",
  },
  Tambaram: {
    name: "Tambaram & Suburban West",
    rate: 0.09,
    desc: "Established residential node showing steady, secure long-term demand.",
  },
  "GST Road": {
    name: "GST Road Industrial Corridor",
    rate: 0.085,
    desc: "Driven by logistics, automotive hubs, and industrial park expansions.",
  },
};

export function FinancialRoiCalculator() {
  const [activeTab, setActiveTab] = useState<"roi" | "emi">("roi");

  // ROI State
  const [roiAmount, setRoiAmount] = useState(25); // In Lakhs (10 to 500)
  const [selectedCorridor, setSelectedCorridor] = useState<Corridor>("ECR");

  // EMI State
  const [propertyPrice, setPropertyPrice] = useState(50); // In Lakhs (10 to 300)
  const [downpayment, setDownpayment] = useState(15); // In Lakhs (up to price)
  const [interestRate, setInterestRate] = useState(8.5); // (7 to 12)
  const [tenureYears, setTenureYears] = useState(15); // (5 to 30)

  // Calculations: ROI
  const calculateAppreciation = (years: number) => {
    const rate = CORRIDOR_RATES[selectedCorridor].rate;
    return Math.round(roiAmount * Math.pow(1 + rate, years));
  };

  const roi1Yr = calculateAppreciation(1);
  const roi3Yr = calculateAppreciation(3);
  const roi5Yr = calculateAppreciation(5);
  const roi10Yr = calculateAppreciation(10);

  // Calculations: EMI
  const loanPrincipalLakh = Math.max(propertyPrice - downpayment, 0);
  const loanPrincipal = loanPrincipalLakh * 100000;
  const monthlyRate = interestRate / 12 / 100;
  const numPayments = tenureYears * 12;

  let monthlyEMI = 0;
  if (loanPrincipal > 0 && monthlyRate > 0) {
    monthlyEMI =
      (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const totalRepayment = monthlyEMI * numPayments;
  const totalInterest = Math.max(totalRepayment - loanPrincipal, 0);

  return (
    <section className="bg-secondary/20 py-16 md:py-24 border-b border-border/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
            <Sparkles className="h-3 w-3" /> Financial Utilities
          </span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Investment Analytics & Calculator
          </h2>
          <p className="mt-3 text-muted-foreground text-sm">
            Model your future appreciation returns or evaluate loan monthly payments using real-time
            local statistics.
          </p>
        </div>

        {/* Calculator Frame */}
        <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-elevated">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 border-b border-border bg-slate-50/50">
            <button
              onClick={() => setActiveTab("roi")}
              className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition cursor-pointer ${
                activeTab === "roi"
                  ? "bg-card text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:bg-slate-100"
              }`}
            >
              <TrendingUp className="h-4 w-4" /> ROI appreciation
            </button>
            <button
              onClick={() => setActiveTab("emi")}
              className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition cursor-pointer ${
                activeTab === "emi"
                  ? "bg-card text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:bg-slate-100"
              }`}
            >
              <Calculator className="h-4 w-4" /> Monthly EMI Planner
            </button>
          </div>

          <div className="p-6 md:p-10">
            {activeTab === "roi" ? (
              /* TAB: ROI APPRECIATION */
              <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
                {/* Inputs */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-sm font-medium text-foreground">
                        Investment Amount
                      </label>
                      <span className="font-display text-2xl font-bold text-primary">
                        ₹{roiAmount} Lakhs
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="5"
                      value={roiAmount}
                      onChange={(e) => setRoiAmount(Number(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>₹10 Lakhs</span>
                      <span>₹1.5 Cr</span>
                      <span>₹3 Crores</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-3">
                      Select Location Corridor
                    </label>
                    <div className="grid grid-cols-1 min-[390px]:grid-cols-2 gap-2.5">
                      {(Object.keys(CORRIDOR_RATES) as Corridor[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => setSelectedCorridor(key)}
                          className={`p-3 min-[390px]:p-3.5 rounded-xl border text-left transition cursor-pointer ${
                            selectedCorridor === key
                              ? "border-primary bg-primary/5 text-primary shadow-sm"
                              : "border-border bg-card hover:bg-secondary text-foreground"
                          }`}
                        >
                          <p className="text-xs font-bold uppercase tracking-wider">{key}</p>
                          <p className="text-lg font-bold mt-1">
                            {(CORRIDOR_RATES[key].rate * 100).toFixed(1)}%{" "}
                            <span className="text-[10px] font-medium text-muted-foreground">
                              YoY
                            </span>
                          </p>
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed italic">
                      ℹ️ {CORRIDOR_RATES[selectedCorridor].desc} Growth projections are estimated
                      from 10-year local registration databases.
                    </p>
                  </div>
                </div>

                {/* Outputs / Projection Visualization */}
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-1.5">
                      <Building className="h-4 w-4" /> Value Projections
                    </h4>

                    {/* Bars Representation */}
                    <div className="space-y-5">
                      {[
                        { y: "Present", val: roiAmount, rate: 0, color: "bg-slate-300" },
                        {
                          y: "1 Year",
                          val: roi1Yr,
                          rate: ((roi1Yr - roiAmount) / roiAmount) * 100,
                          color: "bg-primary/40",
                        },
                        {
                          y: "3 Years",
                          val: roi3Yr,
                          rate: ((roi3Yr - roiAmount) / roiAmount) * 100,
                          color: "bg-primary/60",
                        },
                        {
                          y: "5 Years",
                          val: roi5Yr,
                          rate: ((roi5Yr - roiAmount) / roiAmount) * 100,
                          color: "bg-accent/70",
                        },
                        {
                          y: "10 Years",
                          val: roi10Yr,
                          rate: ((roi10Yr - roiAmount) / roiAmount) * 100,
                          color: "bg-accent",
                        },
                      ].map((item) => (
                        <div key={item.y} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>{item.y}</span>
                            <span className="flex items-center gap-2">
                              <span>₹{item.val.toLocaleString()} L</span>
                              {item.rate > 0 && (
                                <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1 rounded">
                                  +{item.rate.toFixed(0)}%
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                              style={{ width: `${Math.min((item.val / roi10Yr) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4.5 w-4.5 text-primary" />
                    <span>Estimated growth does not guarantee future market gains.</span>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB: EMI ESTIMATOR */
              <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
                {/* Inputs */}
                <div className="space-y-6">
                  {/* Property Value */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-sm font-medium text-foreground">
                        Property Purchase Price
                      </label>
                      <span className="font-display text-2xl font-bold text-primary">
                        ₹{propertyPrice} Lakhs
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="5"
                      value={propertyPrice}
                      onChange={(e) => {
                        const nextVal = Number(e.target.value);
                        setPropertyPrice(nextVal);
                        if (downpayment > nextVal) setDownpayment(nextVal);
                      }}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>₹10 Lakhs</span>
                      <span>₹3 Crores</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-sm font-medium text-foreground">
                        Down Payment Contribution
                      </label>
                      <span className="font-display text-2xl font-bold text-primary">
                        ₹{downpayment} Lakhs
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max={propertyPrice}
                      step="2"
                      value={downpayment}
                      onChange={(e) => setDownpayment(Number(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>₹2 Lakhs</span>
                      <span>Up to 100% (₹{propertyPrice} L)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Interest Rate */}
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">
                          Interest Rate
                        </label>
                        <span className="text-sm font-bold text-primary">{interestRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="6.5"
                        max="12"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                    {/* Tenure */}
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">
                          Loan Tenure
                        </label>
                        <span className="text-sm font-bold text-primary">{tenureYears} yrs</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        step="1"
                        value={tenureYears}
                        onChange={(e) => setTenureYears(Number(e.target.value))}
                        className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Outputs Card */}
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-1.5">
                      <Landmark className="h-4 w-4" /> Loan Repayment Summary
                    </h4>

                    <div className="space-y-5">
                      <div className="bg-card border border-border/80 rounded-xl p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Estimated Monthly EMI
                        </span>
                        <p className="font-display text-3xl font-black text-foreground mt-1">
                          ₹{Math.round(monthlyEMI).toLocaleString()}{" "}
                          <span className="text-xs font-sans text-muted-foreground">/mo</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                        <div className="border border-border/60 bg-card rounded-lg p-3">
                          <span className="text-[9px] text-muted-foreground block uppercase font-medium">
                            Principal
                          </span>
                          <span className="text-sm font-bold text-foreground mt-0.5 block">
                            ₹{loanPrincipalLakh} Lakhs
                          </span>
                        </div>
                        <div className="border border-border/60 bg-card rounded-lg p-3">
                          <span className="text-[9px] text-muted-foreground block uppercase font-medium">
                            Total Interest
                          </span>
                          <span className="text-sm font-bold text-foreground mt-0.5 block">
                            ₹{Math.round(totalInterest / 100000)} Lakhs
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>* Pre-approved loans are eligible for GST reduction.</span>
                    <a href="/contact" className="text-primary hover:underline font-bold">
                      Apply now
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
