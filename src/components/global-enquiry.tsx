import { useState, useEffect, useRef } from "react";
import { X, Check, Loader2, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { CONTACT } from "@/lib/contact-info";

export default function GlobalEnquiry() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "Type",
    authorized: true,
  });

  // Custom Event Listener to open the enquiry form from any page/button
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.propertyType) {
        setFormData((prev) => ({
          ...prev,
          propertyType: customEvent.detail.propertyType,
        }));
      }
      setIsOpen(true);
    };

    window.addEventListener("open-global-enquiry", handleOpenEvent);
    return () => {
      window.removeEventListener("open-global-enquiry", handleOpenEvent);
    };
  }, []);

  // Body scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCaptchaClick = () => {
    if (captchaChecked || captchaLoading) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaChecked) {
      alert(language === "en" ? "Please verify that you are not a robot." : "நீங்கள் ரோபோ அல்ல என்பதை சரிபார்க்கவும்.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const formId = import.meta.env.VITE_FORMSPREE_ENQUIRY as string | undefined;
      if (formId) {
        const res = await fetch(`https://formspree.io/f/${formId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Submission failed");
      }
      setSubmitted(true);
    } catch {
      setSubmitError(
        language === "en"
          ? "Submission failed. Please try again or call us directly."
          : "சமர்ப்பிப்பு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும் அல்லது நேரடியாக அழைக்கவும்."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form after closing
    setTimeout(() => {
      setSubmitted(false);
      setCaptchaChecked(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        propertyType: "Type",
        authorized: true,
      });
    }, 300);
  };

  return (
    <>
      {/* 1. Floating "Enquire Now" Pill Button — visible on all screen sizes */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label={language === "en" ? "Open property enquiry form" : "சொத்து விசாரணை படிவத்தை திறக்க"}
        className="flex fixed z-40 items-center justify-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer shadow-elevated rounded-full transition-all duration-300 hover:scale-105 group select-none border border-white/10
          floating-enquire-btn right-4 h-12 w-12
          md:right-6 md:h-auto md:w-auto md:px-5 md:py-3.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="hidden md:inline text-[11px] font-bold tracking-wider uppercase">
          {language === "en" ? "Enquire now" : "விசாரிக்க"}
        </span>
      </button>

      {/* 2. Modern Clean modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          {/* Overlay */}
          <div className="absolute inset-0" onClick={handleClose} />
          
          <div className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-card rounded-3xl border border-border/80 shadow-elevated p-6 md:p-8 animate-scale-up z-10 text-xs font-sans text-foreground">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground hover:bg-secondary h-11 w-11 flex items-center justify-center rounded-full transition cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {submitted ? (
              /* Success view */
              <div className="text-center py-6 animate-scale-up space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 border border-success/20 text-success">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                  {language === "en" ? "Inquiry Submitted" : "விசாரணை சமர்ப்பிக்கப்பட்டது"}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto text-xs font-medium">
                  {language === "en"
                    ? "A senior legal property advisor from H and H Realty Chennai will call you within 15 minutes to assist with details."
                    : "H and H Realty சென்னையின் மூத்த சட்ட சொத்து ஆலோசகர் 15 நிமிடங்களுக்குள் உங்களை அழைத்து உதவுவார்."}
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 btn-notched-filled text-xs py-2.5 px-8"
                >
                  <span>{language === "en" ? "Return to Page" : "திரும்பச் செல்க"}</span>
                </button>
              </div>
            ) : (
              /* Clean & minimal form design */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-center pb-2">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {language === "en" ? "Get in Touch" : "தொடர்பு கொள்ள"}
                  </h3>
                  <p className="text-muted-foreground/80 font-medium text-[11px] mt-1">
                    {language === "en"
                      ? "Send an inquiry to receive full legal paperwork & tour guide logs."
                      : "முழுமையான சட்ட ஆவணங்கள் மற்றும் வழிகாட்டுதல்களைப் பெற விசாரணையைச் சமர்ப்பிக்கவும்."}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      ref={firstInputRef}
                      required
                      type="text"
                      placeholder={language === "en" ? "Your Name" : "உங்கள் பெயர்"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-11 w-full rounded-xl border border-border bg-background/50 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition text-base md:text-xs text-foreground placeholder:text-muted-foreground/60"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 h-11 px-3 border border-border rounded-xl bg-secondary/25 select-none font-semibold text-foreground/80 shrink-0 text-xs">
                      <span>🇮🇳</span>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/50" />
                    </div>
                    <div className="relative flex-1">
                      <input
                        required
                        type="tel"
                        placeholder={language === "en" ? "Phone Number" : "தொலைபேசி எண்"}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-11 w-full rounded-xl border border-border bg-background/50 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition text-base md:text-xs text-foreground placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      required
                      type="email"
                      placeholder={language === "en" ? "Email Address" : "மின்னஞ்சல் முகவரி"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 w-full rounded-xl border border-border bg-background/50 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition text-base md:text-xs text-foreground placeholder:text-muted-foreground/60"
                    />
                  </div>

                  {/* Property Type Selector */}
                  <div className="relative">
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="h-11 w-full rounded-xl border border-border bg-background/50 px-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition text-base md:text-xs text-foreground/90 appearance-none cursor-pointer"
                    >
                      <option disabled value="Type">{language === "en" ? "Select Property Category" : "சொத்து வகையைத் தேர்ந்தெடுக்கவும்"}</option>
                      <option>{language === "en" ? "Plots / Land" : "நிலங்கள் / மனைகள்"}</option>
                      <option>{language === "en" ? "Villas & Homes" : "வில்லாக்கள் & வீடுகள்"}</option>
                      <option>{language === "en" ? "Apartments" : "அடுக்குமாடி குடியிருப்புகள்"}</option>
                      <option>{language === "en" ? "Farmhouses" : "பண்ணை வீடுகள்"}</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-4.5 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                  </div>
                </div>

                {/* Consent */}
                <label className="flex gap-2.5 items-start cursor-pointer group text-muted-foreground select-none">
                  <input
                    type="checkbox"
                    checked={formData.authorized}
                    onChange={(e) => setFormData({ ...formData, authorized: e.target.checked })}
                    required
                    className="mt-0.5 h-4 w-4 rounded border-border bg-background focus:ring-accent shrink-0 accent-accent"
                  />
                  <span className="text-[11px] leading-relaxed text-muted-foreground/80 font-medium">
                    {language === "en"
                      ? "I authorize H and H Realty representatives to contact me via email, SMS, WhatsApp, and calls. This consent overrides any DND/NDNC registration.*"
                      : "மின்னஞ்சல், குறுஞ்செய்தி, வாட்ஸ்அப் மற்றும் தொலைபேசி அழைப்புகள் மூலம் என்னைத் தொடர்பு கொள்ள H and H Realty பிரதிநிதிகளுக்கு நான் அங்கீகாரம் வழங்குகிறேன்.*"}
                  </span>
                </label>

                {/* Captcha */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="w-full max-w-[260px] rounded-xl border border-border bg-secondary/40 p-2.5 flex items-center justify-between shadow-sm select-none">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleCaptchaClick}
                        className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded border transition-all duration-200 cursor-pointer ${
                          captchaChecked
                            ? "bg-success border-success text-white"
                            : "border-muted-foreground/30 bg-white hover:border-accent"
                        }`}
                      >
                        {captchaLoading ? (
                          <Loader2 className="h-3 w-3 animate-spin text-accent" />
                        ) : captchaChecked ? (
                          <Check className="h-3.5 w-3.5 stroke-[3px] text-white" />
                        ) : null}
                      </button>
                      <span className="font-sans font-medium text-foreground/80 text-[11px]">
                        {language === "en" ? "I'm not a robot" : "நான் ரோபோ அல்ல"}
                      </span>
                    </div>
                    
                    <div className="flex flex-col items-center shrink-0">
                      <div className="flex h-5 w-5 items-center justify-center text-accent">
                        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
                          <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-2.24 2.24C8.26 20.44 10.02 21 12 21c4.97 0 9-4.03 9-9h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l2.24-2.24C15.74 3.56 13.98 3 12 3c-4.97 0-9 4.03-9 9H0l4 4 4-4H5z" />
                        </svg>
                      </div>
                      <span className="text-[7px] text-muted-foreground/80 font-bold uppercase mt-0.5 tracking-wider">reCAPTCHA</span>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <p className="text-xs text-destructive font-medium text-center">{submitError}</p>
                )}

                {/* Submit button */}
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex h-11 items-center justify-center gap-2 btn-notched-filled text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>{isSubmitting ? (language === "en" ? "Sending..." : "அனுப்புகிறோம்...") : (language === "en" ? "Submit Inquiry" : "விசாரணையை சமர்ப்பிக்கவும்")}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. FLOATING WHATSAPP BUTTON — visible on all screen sizes */}
      <a
        href={`https://wa.me/${CONTACT.phoneRaw}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex fixed z-40 items-center justify-center rounded-full bg-whatsapp text-white shadow-elevated hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer
          floating-whatsapp-btn right-4 h-11 w-11
          md:right-6 md:h-14 md:w-14"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.444 5.703 1.445h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
