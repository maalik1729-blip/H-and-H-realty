import { useState } from "react";
import { TrendingUp, Calculator, ShieldCheck, Sparkles, Building, Landmark } from "lucide-react";
import { useLanguage } from "@/context/language-context";

type Corridor = "ECR" | "OMR" | "Tambaram" | "GST Road";

const CORRIDOR_RATES: Record<Corridor, { rate: number }> = {
  ECR: { rate: 0.12 },
  OMR: { rate: 0.10 },
  Tambaram: { rate: 0.09 },
  "GST Road": { rate: 0.085 },
};

export function FinancialRoiCalculator() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"roi" | "emi">("roi");

  // ROI State
  const [roiAmount, setRoiAmount] = useState(25); // In Lakhs (10 to 500)
  const [selectedCorridor, setSelectedCorridor] = useState<Corridor>("ECR");

  // EMI State
  const [propertyPrice, setPropertyPrice] = useState(50); // In Lakhs (10 to 300)
  const [downpayment, setDownpayment] = useState(15); // In Lakhs (up to price)
  const [interestRate, setInterestRate] = useState(8.5); // (7 to 12)
  const [tenureYears, setTenureYears] = useState(15); // (5 to 30)

  // Local Corridor Translations
  const corridorNames: Record<Corridor, string> = {
    ECR: language === "en" ? "East Coast Road (ECR)" : "கிழக்கு கடற்கரை சாலை (ECR)",
    OMR: language === "en" ? "Old Mahabalipuram Road (OMR)" : "பழைய மகாபலிபுரம் சாலை (OMR)",
    Tambaram: language === "en" ? "Tambaram & Suburban West" : "தாம்பரம் & புறநகர் மேற்கு",
    "GST Road": language === "en" ? "GST Road Industrial Corridor" : "GST சாலை தொழில்முனைவுப் பகுதி",
  };

  const corridorDescs: Record<Corridor, string> = {
    ECR: language === "en" ? "High-end residential seaside properties experiencing luxury appreciation." : "ஆடம்பர கடற்கரையோர குடியிருப்புகள் மற்றும் நிலங்கள் நிறைந்த அதிவேக வளர்ச்சிப் பகுதி.",
    OMR: language === "en" ? "IT highway corridors driven by tech hubs, premium housing, and high occupancy." : "ஐடி நிறுவனங்கள் மற்றும் அதிநவீன பிரீமியம் குடியிருப்புகள் நிறைந்த முக்கிய நெடுஞ்சாலைப் பகுதி.",
    Tambaram: language === "en" ? "Established residential node showing steady, secure long-term demand." : "நிலையான மற்றும் பாதுகாப்பான நீண்டகால வீட்டுத் தேவை உள்ள குடியிருப்புப் பகுதி.",
    "GST Road": language === "en" ? "Driven by logistics, automotive hubs, and industrial park expansions." : "தொழில்நுட்ப பூங்காக்கள், வாகன உற்பத்தி மற்றும் லாஜிஸ்டிக்ஸ் நிறைந்த பகுதி.",
  };

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
            <Sparkles className="h-3 w-3" /> {language === "en" ? "Financial Utilities" : "நிதி கணக்கீடுகள்"}
          </span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {language === "en" ? "Investment Analytics & Calculator" : "முதலீட்டு பகுப்பாய்வு & கால்குலேட்டர்"}
          </h2>
          <p className="mt-3 text-muted-foreground text-sm">
            {language === "en"
              ? "Model your future appreciation returns or evaluate loan monthly payments using real-time local statistics."
              : "உங்களின் எதிர்கால சொத்து மதிப்பு லாபம் மற்றும் மாதாந்திர கடன் தவணைத் தொகையை எளிய முறையில் கணக்கிடுங்கள்."}
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
              <TrendingUp className="h-4 w-4" /> {language === "en" ? "ROI appreciation" : "சொத்து மதிப்பு உயர்வு (ROI)"}
            </button>
            <button
              onClick={() => setActiveTab("emi")}
              className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition cursor-pointer ${
                activeTab === "emi"
                  ? "bg-card text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:bg-slate-100"
              }`}
            >
              <Calculator className="h-4 w-4" /> {language === "en" ? "Monthly EMI Planner" : "மாதாந்திர தவணை திட்டமிடல் (EMI)"}
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
                        {language === "en" ? "Investment Amount" : "முதலீட்டுத் தொகை"}
                      </label>
                      <span className="font-display text-2xl font-bold text-primary">
                        {language === "en" ? `₹${roiAmount} Lakhs` : `₹${roiAmount} லட்சம்`}
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
                      <span>{language === "en" ? "₹10 Lakhs" : "₹10 லட்சம்"}</span>
                      <span>{language === "en" ? "₹1.5 Cr" : "₹1.5 கோடி"}</span>
                      <span>{language === "en" ? "₹3 Crores" : "₹3 கோடி"}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-3">
                      {language === "en" ? "Select Location Corridor" : "இருப்பிடப் பகுதியைத் தேர்ந்தெடுக்கவும்"}
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
                              {language === "en" ? "YoY" : "ஆண்டுக்கு"}
                            </span>
                          </p>
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed italic">
                      ℹ️ {corridorDescs[selectedCorridor]} {language === "en" ? "Growth projections are estimated from 10-year local registration databases." : "இந்த வளர்ச்சி கணிப்புகள் கடந்த 10 ஆண்டுகால உள்ளூர் பதிவுகளின் அடிப்படையில் கணக்கிடப்பட்டுள்ளது."}
                    </p>
                  </div>
                </div>

                {/* Outputs / Projection Visualization */}
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-1.5">
                      <Building className="h-4 w-4" /> {language === "en" ? "Value Projections" : "மதிப்பு கணிப்புகள்"}
                    </h4>

                    {/* Bars Representation */}
                    <div className="space-y-5">
                      {[
                        { y: language === "en" ? "Present" : "தற்போது", val: roiAmount, rate: 0, color: "bg-slate-300" },
                        {
                          y: language === "en" ? "1 Year" : "1 ஆம் ஆண்டு",
                          val: roi1Yr,
                          rate: ((roi1Yr - roiAmount) / roiAmount) * 100,
                          color: "bg-primary/40",
                        },
                        {
                          y: language === "en" ? "3 Years" : "3 ஆம் ஆண்டு",
                          val: roi3Yr,
                          rate: ((roi3Yr - roiAmount) / roiAmount) * 100,
                          color: "bg-primary/60",
                        },
                        {
                          y: language === "en" ? "5 Years" : "5 ஆம் ஆண்டு",
                          val: roi5Yr,
                          rate: ((roi5Yr - roiAmount) / roiAmount) * 100,
                          color: "bg-accent/70",
                        },
                        {
                          y: language === "en" ? "10 Years" : "10 ஆம் ஆண்டு",
                          val: roi10Yr,
                          rate: ((roi10Yr - roiAmount) / roiAmount) * 100,
                          color: "bg-accent",
                        },
                      ].map((item) => (
                        <div key={item.y} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>{item.y}</span>
                            <span className="flex items-center gap-2">
                              <span>{language === "en" ? `₹${item.val.toLocaleString()} L` : `₹${item.val.toLocaleString()} லட்சம்`}</span>
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
                    <span>{language === "en" ? "Estimated growth does not guarantee future market gains." : "மதிப்பிடப்பட்ட வளர்ச்சி எதிர்கால சந்தை ஆதாயங்களுக்கு உத்தரவாதம் அளிக்காது."}</span>
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
                        {language === "en" ? "Property Purchase Price" : "சொத்தின் மொத்த விலை"}
                      </label>
                      <span className="font-display text-2xl font-bold text-primary">
                        {language === "en" ? `₹${propertyPrice} Lakhs` : `₹${propertyPrice} லட்சம்`}
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
                      <span>{language === "en" ? "₹10 Lakhs" : "₹10 லட்சம்"}</span>
                      <span>{language === "en" ? "₹3 Crores" : "₹3 கோடி"}</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-sm font-medium text-foreground">
                        {language === "en" ? "Down Payment Contribution" : "உங்களின் முன்பணம் செலுத்துதல்"}
                      </label>
                      <span className="font-display text-2xl font-bold text-primary">
                        {language === "en" ? `₹${downpayment} Lakhs` : `₹${downpayment} லட்சம்`}
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
                      <span>{language === "en" ? "₹2 Lakhs" : "₹2 லட்சம்"}</span>
                      <span>{language === "en" ? `Up to 100% (₹${propertyPrice} L)` : `100% வரை (₹${propertyPrice} லட்சம்)`}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Interest Rate */}
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">
                          {language === "en" ? "Interest Rate" : "வட்டி விகிதம்"}
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
                          {language === "en" ? "Loan Tenure" : "கடன் காலம்"}
                        </label>
                        <span className="text-sm font-bold text-primary">{tenureYears} {language === "en" ? "yrs" : "வரு"}</span>
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
                      <Landmark className="h-4 w-4" /> {language === "en" ? "Loan Repayment Summary" : "கடன் திருப்பிச் செலுத்தும் விவரங்கள்"}
                    </h4>

                    <div className="space-y-5">
                      <div className="bg-card border border-border/80 rounded-xl p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {language === "en" ? "Estimated Monthly EMI" : "மதிப்பிடப்பட்ட மாதாந்திர EMI"}
                        </span>
                        <p className="font-display text-3xl font-black text-foreground mt-1">
                          ₹{Math.round(monthlyEMI).toLocaleString()}{" "}
                          <span className="text-xs font-sans text-muted-foreground">/{language === "en" ? "mo" : "மாதம்"}</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                        <div className="border border-border/60 bg-card rounded-lg p-3">
                          <span className="text-[9px] text-muted-foreground block uppercase font-medium">
                            {language === "en" ? "Principal" : "அசல் தொகை"}
                          </span>
                          <span className="text-sm font-bold text-foreground mt-0.5 block">
                            {language === "en" ? `${loanPrincipalLakh} Lakhs` : `${loanPrincipalLakh} லட்சம்`}
                          </span>
                        </div>
                        <div className="border border-border/60 bg-card rounded-lg p-3">
                          <span className="text-[9px] text-muted-foreground block uppercase font-medium">
                            {language === "en" ? "Total Interest" : "மொத்த வட்டி"}
                          </span>
                          <span className="text-sm font-bold text-foreground mt-0.5 block">
                            {language === "en" ? `${Math.round(totalInterest / 100000)} Lakhs` : `${Math.round(totalInterest / 100000)} லட்சம்`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{language === "en" ? "* Pre-approved loans are eligible for GST reduction." : "* முன் அங்கீகரிக்கப்பட்ட கடன்களுக்கு GST சலுகை பொருந்தும்."}</span>
                    <a href="/contact" className="text-primary hover:underline font-bold">
                      {language === "en" ? "Apply now" : "விண்ணப்பிக்க"}
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
