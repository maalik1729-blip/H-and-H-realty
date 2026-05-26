import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ta";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// A comprehensive global translation dictionary in UTF-8
const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navbar & Footer Links
    "nav.home": "Home",
    "nav.ourStory": "Our Story",
    "nav.properties": "Properties",
    "nav.communities": "Communities",
    "nav.contactUs": "Contact Us",
    "nav.adminPanel": "Admin Panel",

    // Hero Section
    "hero.subtitle": "Buy • Sell • Rent",
    "hero.title": "Premium Plots, Villas, Apartments & Farmhouses near Chennai",
    "hero.desc": "Browse title-vetted land layouts, luxurious architectural villas, and green weekend estates listed directly by owners.",
    "hero.browse": "Browse Catalog",
    "hero.bookVisit": "Book Site Visit",
    "hero.vetted": "100% Lawyer Vetted",
    "hero.approved": "DTCP & RERA Approved",
    "hero.patta": "Complete Patta Support",
    "hero.activeHighlight": "Active Highlight",
    "hero.exploreNow": "Explore Now",

    // Slider Images
    "slider.title.0": "Premium Chennai Plots & Lands",
    "slider.desc.0": "Title-vetted, CMDA/DTCP approved layout parcels ready for immediate registration.",
    "slider.title.1": "Architectural Masterpiece Villas",
    "slider.desc.1": "Elite residential structures built with premium luxury specifications.",
    "slider.title.2": "Modern High-Rise Apartments",
    "slider.desc.2": "Sleek metropolitan residences situated in sought-after urban corridors.",
    "slider.title.3": "Scenic Weekend Farmhouses",
    "slider.desc.3": "Organic, eco-friendly farms and green weekend getaways.",
    "slider.title.4": "Agricultural Farmlands",
    "slider.desc.4": "Fertile soils and highly sustainable farm fields.",
    "slider.title.5": "Bespoke Interior Craftsmanship",
    "slider.desc.5": "High-fidelity modern interior furnishing and elegant layouts.",
    "slider.title.6": "Premium Indoor Living",
    "slider.desc.6": "State-of-the-art home comfort, smart security, and modern ease.",
    "slider.title.7": "Elite Vetted Plot Layouts",
    "slider.desc.7": "Exclusive CMDA & DTCP approved community layouts across high-growth corridors.",

    // Quick Categories
    "categories.metro.title": "Metropolitan Icons",
    "categories.metro.desc": "Residences set within the world's most dynamic city skylines.",
    "categories.seaside.title": "Seaside Sanctuaries",
    "categories.seaside.desc": "Private villas and retreats along pristine coastlines.",
    "categories.mountain.title": "Mountain Escapes",
    "categories.mountain.desc": "Exclusive chalets and estates nestled in breathtaking landscapes.",
    "categories.historic.title": "Historic Charm",
    "categories.historic.desc": "Timeless properties within cultural capitals and heritage districts.",

    // Trust Strip
    "trust.registered": "TNRERA/DTCP registered",
    "trust.verified": "Title-verified by lawyers",
    "trust.drone": "Drone tour for every listing",
    "trust.loan": "Bank loan assistance",

    // Bento Categories
    "bento.categories": "Categories",
    "bento.title": "Explore Property Types in Chennai",
    "bento.desc": "Whether you are looking to build your dream home on a verified plot, move into a premium villa, buy a high-rise apartment, or relax in a farmhouse, we have you covered.",
    "bento.badgeDemanded": "Highly Demanded",
    "bento.plots": "Plots & Land",
    "bento.plotsDesc": "Verified residential, commercial, and agricultural plots near Tambaram, ECR, OMR and GST Road. Ideal for immediate construction or high-growth investment.",
    "bento.plotsAction": "Explore Plots",
    "bento.badgeLuxury": "Luxury Living",
    "bento.villas": "Premium Villas",
    "bento.villasDesc": "Independent luxury villas with private gardens, swimming pools, and architectural designs on ECR and in peaceful suburban Chennai.",
    "bento.villasAction": "View Villas",
    "bento.badgeUrban": "Urban Lifestyle",
    "bento.apartments": "Modern Apartments",
    "bento.apartmentsDesc": "Premium apartments and high-rise flats in OMR, Medavakkam, and top IT corridors. Features clubhouse, power backup, and gated security.",
    "bento.apartmentsAction": "Explore Apartments",
    "bento.badgeWeekend": "Weekend Retreat",
    "bento.farmhouses": "Scenic Weekend Farmhouses",
    "bento.farmhousesDesc": "Serene weekend getaways and farmhouses on ECR or suburban Chennai. Clear titles and peaceful setups.",
    "bento.farmhousesAction": "View Farmhouses",
    "bento.properties": "Properties",
    "bento.propertiesLower": "properties",

    // Featured section
    "featured.badge": "Featured",
    "featured.title": "Hand-picked properties this week",
    "featured.viewAll": "View all",

    // Popular Locations
    "locations.badge": "Popular locations",
    "locations.title": "Where buyers are looking",
    "locations.subtitle": "Explore listings across Chennai's highest growth corridors and established residential hubs.",
    "locations.corridor": "Chennai Growth Corridor",
    "locations.explore": "Explore Locality",
    "locations.activeCount": "Active Properties",

    // Why H and H Realty
    "whyUs.badge": "Why H and H Realty",
    "whyUs.title": "Buying Chennai property shouldn't feel risky.",
    "whyUs.desc": "We started H and H Realty after watching too many buyers get burned by fake titles, unapproved layouts, and hidden broker charges. Every plot, villa, and home we list is lawyer-checked, drone-toured, and backed by a clear paper trail.",
    "whyUs.cta": "See verified listings",
    "whyUs.swipe": "← Swipe to view more →",
    "whyUs.card.title.0": "Legal due diligence",
    "whyUs.card.desc.0": "Patta, Chitta, parent deeds, and EC verified by local real estate attorneys. We check histories for at least 30 years to guarantee zero litigation.",
    "whyUs.card.title.1": "Drone + ground tour",
    "whyUs.card.desc.1": "Aerial video and on-site walkthrough for every property listing. Inspect boundaries, road layouts, and nearby markers from your screen.",
    "whyUs.card.title.2": "Transparent pricing",
    "whyUs.card.desc.2": "No hidden charges. The price you see is direct from builders or owners. Any registry and stamp duties are listed clearly upfront.",
    "whyUs.card.title.3": "Loan support",
    "whyUs.card.desc.3": "Pre-approved financing partners ready when you are. Fast track your documentation check with leading public & private banks.",

    // Testimonials
    "testimonials.badge": "Buyer stories",
    "testimonials.title": "People we helped buy land with confidence.",
    "testimonials.prev": "Previous testimonial",
    "testimonials.next": "Next testimonial",
    "testimonials.quote.0": "H and H Realty made my villa search on ECR extremely smooth. Transparent pricing and complete lawyer-vetted documents gave me the confidence to buy.",
    "testimonials.role.0": "IT Director, OMR Chennai",
    "testimonials.quote.1": "Buying an independent plot has always been stressful. H and H Realty handled the entire DTCP verification, drone mapping, and registration assistance.",
    "testimonials.role.1": "Resident Doctor, Tambaram",
    "testimonials.quote.2": "Finally, a portal that categorizes land and built properties correctly with clear, upfront pricing. I purchased a commercial lot on GST Road without broker issues.",
    "testimonials.role.2": "Business Owner, Adyar",

    // FAQ section
    "faq.badge": "FAQ",
    "faq.title": "Legal Due Diligence & Buying Process",
    "faq.subtitle": "Transparent answers to common questions about purchasing land, villas, or flats near Chennai.",

    // CTA Bottom Banner
    "cta.title": "Find your dream home or plot this weekend.",
    "cta.desc": "Book a free site visit and we'll arrange transport, property walk-through, and legal Q&A with our local advisors.",
    "cta.button": "Book site visit",

    // Footer
    "footer.tagline": "Trust | Value | Future",
    "footer.desc": "Chennai's premier real estate search platform. Every plot, villa, apartment, and farmhouse listed on our platform undergoes 30-year lawyer vetting, title-checks, and drone audits.",
    "footer.getInTouch": "Get In Touch",
    "footer.address": "No. 45, OMR Road, Sholinganallur, Chennai, Tamil Nadu 600119",
    "footer.joinClub": "Join The Club",
    "footer.joinDesc": "Get the latest property logs weekly.",
    "footer.emailPlaceholder": "Enter your email address",
    "footer.rights": "H and H Realty Chennai. All rights reserved. Vetted Real Estate.",

    // Catalog/Search page additional translations
    "catalog.keywords": "Keywords",
    "catalog.propertyType": "Property Type",
    "catalog.locality": "Locality",
    "catalog.ownership": "Ownership",
    "catalog.budget": "Max Budget",
    "catalog.clear": "Clear Filters",
    "catalog.showing": "Showing {count} Lawyer-Vetted {listingLabel} in Chennai",
    "catalog.allAreas": "All Areas",
    "catalog.allOwnerships": "All Ownerships",
    "catalog.noProperties": "No Properties Found",
    "catalog.reset": "Reset All Filters",
    "catalog.explore": "Explore",
    "catalog.listingsLabelSingular": "Listing",
    "catalog.listingsLabelPlural": "Listings",
    
    // Sell page additional translations
    "sell.badge": "Sell with H and H Realty",
    "sell.title": "List Your Property With Experts",
    "sell.desc": "Connect with our elite team of real estate attorneys and land advisors. We offer full legal verification, aerial drone photography, and direct connections to high-intent buyers.",
    "sell.formTitle": "Listing Information Form",
    "sell.formSubtitle": "Please provide accurate owner and property details to initiate legal checks.",
    "sell.contactTitle": "1. Contact Information",
    "sell.firstName": "First Name",
    "sell.lastName": "Last Name",
    "sell.email": "Email Address",
    "sell.phone": "Phone Number",
    "sell.detailsTitle": "2. Property Details",
    "sell.areaSize": "Area / Size",
    "sell.address": "Property Address & Locality",
    "sell.highlights": "Key Highlights & Description",
    "sell.mediaTitle": "3. Media Upload",
    "sell.uploadPhotos": "Upload Photos (Optional)",
    "sell.uploadHint": "Click to upload photos",
    "sell.uploadLimit": "Support PNG, JPG, JPEG up to 5 photos (Max 5MB each)",
    "sell.submit": "Submit Property Details",
    "sell.successTitle": "Listing Request Received",
    "sell.successDesc": "Thank you! Our Land Attorney and Lead Advisor will review your submission and contact you within 30 minutes to schedule a site inspection and legal verification.",
    "sell.submitAnother": "Submit Another Property",

    // Detail page additional translations
    "detail.back": "Back to Properties",
    "detail.specsTitle": "Property Specifications",
    "detail.aboutTitle": "About This Property",
    "detail.amenitiesTitle": "Amenities",
    "detail.legalTitle": "Legal & Documents",
    "detail.landmarksTitle": "Nearby Landmarks",
    "detail.testimonialsTitle": "What Our Buyers Say",
    "detail.similarTitle": "Similar Properties in {city}",
    "detail.askingPrice": "Asking Price",
    "detail.callAgent": "Call Agent Now",
    "detail.whatsappNow": "WhatsApp Now",
    "detail.requestDetails": "Request Details",
    "detail.bookVisit": "Book Free Site Visit",
    "detail.quickInquiry": "Quick Inquiry",
    "detail.callBackHint": "Our advisor will call back within 30 minutes.",
    "detail.requestCallback": "Request Callback",
    "detail.agreeConsent": "By submitting you agree to be contacted by H and H Realty.",
    "detail.trustBadge": "Title Verified",
    "detail.legalBadge": "Legal Ready",
    "detail.loanBadge": "Bank Loan OK",
    "detail.viewDetails": "View Details",

    // Contact page additional translations
    "contact.badge": "Get In Touch",
    "contact.title": "Talk to a Land Advisor",
    "contact.desc": "Book a free site visit or ask any legal/property question. Typical response in under 30 minutes during business hours.",
    "contact.formTitle": "Book a site visit",
    "contact.fullName": "Full name",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.interestedIn": "Interested in",
    "contact.preferredDate": "Preferred date",
    "contact.timeSlot": "Time slot",
    "contact.message": "Message",
    "contact.confirm": "Confirm site visit",
    "contact.reachUs": "Reach us directly",
    "contact.officeHours": "Office hours",
    "contact.successTitle": "Site visit requested",
    "contact.successDesc": "Our advisor will WhatsApp you the meeting point and time.",

    // Map page additional translations
    "map.title": "Map view",
    "map.desc": "Select a property to see it on the map — click to view details.",

    // Blog page additional translations
    "blog.badge": "Guides & Insights",
    "blog.title": "Free Land Buying Guides",
    "blog.desc": "Simple, step-by-step legal and safety tutorials written by Chennai real estate lawyers to help you buy plots and homes with 100% confidence.",
  },
  ta: {
    // Navbar & Footer Links
    "nav.home": "முகப்பு",
    "nav.ourStory": "எங்கள் கதை",
    "nav.properties": "சொத்துக்கள்",
    "nav.communities": "சமூகங்கள்",
    "nav.contactUs": "தொடர்பு கொள்ள",
    "nav.adminPanel": "நிர்வாகக் குழு",

    // Hero Section
    "hero.subtitle": "வாங்க • விற்க • வாடகைக்கு",
    "hero.title": "சென்னைக்கு அருகில் உள்ள பிரீமியம் பிளாட்கள், வில்லாக்கள், அடுக்குமாடி குடியிருப்புகள் & பண்ணை வீடுகள்",
    "hero.desc": "உரிமையாளர்களால் நேரடியாக பட்டியலிடப்பட்ட பட்டா-சரிபார்க்கப்பட்ட நில அமைப்புகளை உலாவுக.",
    "hero.browse": "பட்டியலைக் காண்க",
    "hero.bookVisit": "தளத்தைப் பார்க்க",
    "hero.vetted": "100% வழக்கறிஞரால் சரிபார்க்கப்பட்டது",
    "hero.approved": "DTCP & RERA அங்கீகரிக்கப்பட்டது",
    "hero.patta": "முழுமையான பட்டா உதவி",
    "hero.activeHighlight": "செயலில் உள்ள சிறப்பம்சம்",
    "hero.exploreNow": "இப்போது ஆராய்க",

    // Slider Images
    "slider.title.0": "பிரீமியம் சென்னை பிளாட்கள் & நிலங்கள்",
    "slider.desc.0": "உடனடி பதிவுக்கு தயாராக உள்ள பட்டா-சரிபார்க்கப்பட்ட, CMDA/DTCP அங்கீகரிக்கப்பட்ட நிலங்கள்.",
    "slider.title.1": "சிறந்த கட்டிடக்கலை வில்லாக்கள்",
    "slider.desc.1": "பிரீமியம் ஆடம்பர விவரக்குறிப்புகளுடன் கட்டப்பட்ட உயர்தர வில்லாக்கள்.",
    "slider.title.2": "நவீன அடுக்குமாடி குடியிருப்புகள்",
    "slider.desc.2": "முக்கிய நகர்ப்புறப் பகுதிகளில் அமைந்துள்ள அதிநவீன குடியிருப்புகள்.",
    "slider.title.3": "அழகுமிகு வார இறுதி பண்ணை வீடுகள்",
    "slider.desc.3": "இயற்கை மற்றும் சூழல் நட்பு பண்ணைகள் மற்றும் வார இறுதி ஓய்விடங்கள்.",
    "slider.title.4": "விவசாய நிலங்கள்",
    "slider.desc.4": "வளமான மண் மற்றும் விவசாய நிலங்கள்.",
    "slider.title.5": "தனிப்பயனாக்கப்பட்ட உட்புற வடிவமைப்பு",
    "slider.desc.5": "அதிநவீன நவீன உட்புற அலங்காரங்கள் மற்றும் நேர்த்தியான வடிவமைப்பு.",
    "slider.title.6": "பிரீமியம் உட்புற வாழ்க்கை",
    "slider.desc.6": "அதிநவீன வீட்டு வசதி, ஸ்மார்ட் பாதுகாப்பு மற்றும் நவீன எளிமை.",
    "slider.title.7": "பிரத்தியேக சரிபார்க்கப்பட்ட பிளாட்கள்",
    "slider.desc.7": "வளர்ந்து வரும் பகுதிகளில் உள்ள பிரத்தியேக CMDA & DTCP அங்கீகரிக்கப்பட்ட நிலங்கள்.",

    // Quick Categories
    "categories.metro.title": "மெட்ரோபாலிட்டன் சின்னங்கள்",
    "categories.metro.desc": "உலகின் மிகவும் துடிப்பான நகரங்களில் அமைந்துள்ள அடுக்குமாடிகள்.",
    "categories.seaside.title": "கடற்கரை ஓய்விடங்கள்",
    "categories.seaside.desc": "அழகிய கடற்கரைகளில் அமைந்துள்ள தனிப்பட்ட வில்லாக்கள்.",
    "categories.mountain.title": "மலை ஓய்விடங்கள்",
    "categories.mountain.desc": "அழகுமிகு மலைப்பகுதிகளில் அமைந்துள்ள பண்ணை வீடுகள்.",
    "categories.historic.title": "பாரபரிய சின்னங்கள்",
    "categories.historic.desc": "கலாச்சார மற்றும் பாரம்பரியமிக்க இடங்களில் உள்ள சொத்துக்கள்.",

    // Trust Strip
    "trust.registered": "TNRERA/DTCP அங்கீகரிக்கப்பட்டது",
    "trust.verified": "வழக்கறிஞர்களால் சரிபார்க்கப்பட்ட பத்திரம்",
    "trust.drone": "ஒவ்வொரு சொத்திற்கும் ட்ரோன் பார்வை",
    "trust.loan": "வங்கி கடன் உதவி",

    // Bento Categories
    "bento.categories": "வகைகள்",
    "bento.title": "சென்னையில் உள்ள சொத்து வகைகளை ஆராய்க",
    "bento.desc": "சரிபார்க்கப்பட்ட நிலத்தில் உங்கள் கனவு இல்லத்தை உருவாக்க விரும்பினாலும், பிரீமியம் வில்லாவிற்கு மாற விரும்பினாலும் நாங்கள் உதவுகிறோம்.",
    "bento.badgeDemanded": "அதிக தேவை உள்ளது",
    "bento.plots": "நிலங்கள் & பிளாட்கள்",
    "bento.plotsDesc": "தாம்பரம், ஈசிஆர், ஓஎம்ஆர் மற்றும் ஜிஎஸ்டி சாலைக்கு அருகில் சரிபார்க்கப்பட்ட குடியிருப்பு மற்றும் வில்லாக்கள்.",
    "bento.plotsAction": "நிலங்களை காண்க",
    "bento.badgeLuxury": "ஆடம்பர வாழ்க்கை",
    "bento.villas": "பிரீமியம் வில்லாக்கள்",
    "bento.villasDesc": "ஈசிஆர் மற்றும் அமைதியான புறநகர் பகுதிகளில் தனியார் தோட்டங்களுடன் உள்ள வில்லாக்கள்.",
    "bento.villasAction": "வில்லாக்களை காண்க",
    "bento.badgeUrban": "நகர்ப்புற வாழ்க்கை",
    "bento.apartments": "அடுக்குமாடி குடியிருப்புகள்",
    "bento.apartmentsDesc": "ஓஎம்ஆர், மேடவாக்கம் மற்றும் முக்கிய குடியிருப்புப் பகுதிகளில் உள்ள அடுக்குமாடி குடியிருப்புகள்.",
    "bento.apartmentsAction": "அடுக்குமாடிகளை காண்க",
    "bento.badgeWeekend": "வார இறுதி ஓய்விடம்",
    "bento.farmhouses": "பண்ணை வீடுகள்",
    "bento.farmhousesDesc": "ஈசிஆர் அல்லது புறநகர்ப் பகுதிகளில் அமைந்துள்ள அமைதியான பண்ணை வீடுகள்.",
    "bento.farmhousesAction": "பண்ணை வீடுகளை காண்க",
    "bento.properties": "சொத்துக்கள்",
    "bento.propertiesLower": "சொத்துக்கள்",

    // Featured section
    "featured.badge": "சிறப்பு அம்சங்கள்",
    "featured.title": "இந்த வாரத்தின் சிறந்த சொத்துக்கள்",
    "featured.viewAll": "அனைத்தையும் காண்க",

    // Popular Locations
    "locations.badge": "பிரபலமான இடங்கள்",
    "locations.title": "வாங்குபவர்கள் தேடும் இடங்கள்",
    "locations.subtitle": "சென்னையில் வளர்ந்து வரும் பகுதிகளில் உள்ள சொத்துக்களை ஆராய்க.",
    "locations.corridor": "சென்னை வளர்ச்சிப் பகுதி",
    "locations.explore": "பகுதியை ஆராய்க",
    "locations.activeCount": "செயலில் உள்ள சொத்துக்கள்",

    // Why H and H Realty
    "whyUs.badge": "ஏன் H and H Realty",
    "whyUs.title": "சென்னையில் சொத்து வாங்குவது ஆபத்துக்குரியதாக இருக்கக் கூடாது.",
    "whyUs.desc": "போலி பத்திரங்கள் மற்றும் மறைமுக கட்டணங்களால் வாங்குபவர்கள் ஏமாறுவதைத் தடுக்க H and H Realty தொடங்கினோம்.",
    "whyUs.cta": "சரிபார்க்கப்பட்ட பட்டியல்களைக் காண்க",
    "whyUs.swipe": "← மேலும் காண ஸ்வைப் செய்யவும் →",
    "whyUs.card.title.0": "சிறப்பான சட சரிபார்ப்பு",
    "whyUs.card.desc.0": "பட்டா, சிட்டா, தாய் பத்திரம் மற்றும் வில்லங்கச் சான்று உள்ளூர் வழக்கறிஞர்களால் சரிபார்க்கப்படுகிறது.",
    "whyUs.card.title.1": "ட்ரோன் மற்றும் நேரடி தணிக்கை",
    "whyUs.card.desc.1": "ஒவ்வொரு சொத்துக்களையும் ட்ரோன் வீடியோ மற்றும் நேரடி வழிகாட்டுதல்.",
    "whyUs.card.title.2": "வெளிப்படையான விலை",
    "whyUs.card.desc.2": "மறைமுக கட்டணங்கள் இல்லை. நேரடி உரிமையாளர் மற்றும் பில்டர்களிடமிருந்து விலை.",
    "whyUs.card.title.3": "வங்கி கடன் உதவி",
    "whyUs.card.desc.3": "முன்னணி வங்கிகளில் எளிதாக கடன் பெற உதவுகிறோம்.",

    // Testimonials
    "testimonials.badge": "வாங்குபவர் கதைகள்",
    "testimonials.title": "நம்பிக்கையுடன் நிலம் வாங்க நாங்கள் உதவிய நபர்கள்.",
    "testimonials.prev": "முந்தைய கருத்து",
    "testimonials.next": "அடுத்த கருத்து",
    "testimonials.quote.0": "H and H Realty என் ஈசிஆர் வில்லா தேடலை மிகவும் எளிமையாக்கியது. வெளிப்படையான விலை மற்றும் வழக்கறிஞரால் சரிபார்க்கப்பட்ட பத்திரங்கள் எனக்கு நம்பிக்கையை அளித்தன.",
    "testimonials.role.0": "IT இயக்குனர், OMR சென்னை",
    "testimonials.quote.1": "தனிப்பட்ட மனையை வாங்குவது எப்போதும் மன அழுத்தத்தை ஏற்படுத்தும். H and H Realty அனைத்து DTCP சரிபார்ப்பு, ட்ரோன் வழிகாட்டுதல் மற்றும் பதிவு உதவிகளை முடித்துத் தந்தது.",
    "testimonials.role.1": "பணியில் உள்ள மருத்துவர், தாம்பரம்",
    "testimonials.quote.2": "இறுதியாக, நிலம் மற்றும் கட்டப்பட்ட சொத்துக்களை சரியாகவும், வெளிப்படையான விலையுடனும் வகைப்படுத்தும் ஒரு தளம். ஜிஎஸ்டி சாலையில் உள்ள வணிக நிலத்தை தரகர் இல்லாமல் வாங்கினேன்.",
    "testimonials.role.2": "தொழில் உரிமையாளர், அடையார்",

    // FAQ section
    "faq.badge": "கேள்வி பதில்",
    "faq.title": "சட்ட சரிபார்ப்பு & வாங்கும் வழிமுறைகள்",
    "faq.subtitle": "சென்னையில் நிலம் வாங்குவது குறித்த சந்தேகங்களுக்கு தெளிவான பதில்கள்.",

    // CTA Bottom Banner
    "cta.title": "இந்த வார இறுதியில் உங்கள் கனவு இல்லம் அல்லது நிலத்தைக் கண்டறியுங்கள்.",
    "cta.desc": "இலவச செயல் தளப் பார்வையை முன்பதிவு செய்யுங்கள்.",
    "cta.button": "தளத்தைப் பார்க்க",

    // Footer
    "footer.tagline": "நம்பிக்கை | மதிப்பு | எதிர்காலம்",
    "footer.desc": "சென்னையில் சிறந்த ரியல் எஸ்டேட் தேடல் தளம். ஒவ்வொரு சொத்தும் தணிக்கைக்குட்படும்.",
    "footer.getInTouch": "தொடர்பு கொள்ள",
    "footer.address": "எண் 45, OMR சாலை, சோழிங்கநல்லூர், சென்னை 600119",
    "footer.joinClub": "செய்திமடலில் இணையுங்கள்",
    "footer.joinDesc": "ஒவ்வொரு வாரமும் புதிய சொத்து விவரங்களைப் பெறுக.",
    "footer.emailPlaceholder": "உங்கள் மின்னஞ்சல் முகவரி",
    "footer.rights": "H and H Realty சென்னை. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டது.",

    // Catalog/Search page additional translations
    "catalog.keywords": "முக்கிய வார்த்தைகள்",
    "catalog.propertyType": "சொத்து வகை",
    "catalog.locality": "பகுதி",
    "catalog.ownership": "உரிமை",
    "catalog.budget": "அதிகபட்ச பட்ஜெட்",
    "catalog.clear": "வடிகட்டிகளை நீக்கு",
    "catalog.showing": "சென்னையில் {count} சரிபார்க்கப்பட்ட {listingLabel} காட்டப்படுகின்றன",
    "catalog.allAreas": "அனைத்து பகுதிகள்",
    "catalog.allOwnerships": "அனைத்து உரிமைகளும்",
    "catalog.noProperties": "சொத்துக்கள் எதுவும் கிடைக்கவில்லை",
    "catalog.reset": "அனைத்து வடிகட்டிகளையும் மீட்டமை",
    "catalog.explore": "ஆராய்க",
    "catalog.listingsLabelSingular": "சொத்து",
    "catalog.listingsLabelPlural": "சொத்துக்கள்",

    // Sell page additional translations
    "sell.badge": "H and H Realty உடன் விற்கவும்",
    "sell.title": "நிபுணர்களுடன் உங்கள் சொத்தைப் பட்டியலிடுங்கள்",
    "sell.desc": "எங்கள் ரியல் எஸ்டேட் வழக்கறிஞர்கள் மற்றும் நில ஆலோசகர்களுடன் இணையுங்கள். நாங்கள் முழு சட்ட சரிபார்ப்பு, ட்ரோன் புகைப்படம் மற்றும் நேரடி வாங்குபவர் இணைப்புகளை வழங்குகிறோம்.",
    "sell.formTitle": "சொத்து விவரங்கள் படிவம்",
    "sell.formSubtitle": "சட்ட சோதனைகளைத் தொடங்க துல்லியமான விவரங்களை வழங்கவும்.",
    "sell.contactTitle": "1. தொடர்பு விவரங்கள்",
    "sell.firstName": "முதல் பெயர்",
    "sell.lastName": "கடைசி பெயர்",
    "sell.email": "மின்னஞ்சல் முகவரி",
    "sell.phone": "தொலைபேசி எண்",
    "sell.detailsTitle": "2. சொத்து விவரங்கள்",
    "sell.areaSize": "பரப்பளவு / அளவு",
    "sell.address": "சொத்து முகவரி & பகுதி",
    "sell.highlights": "முக்கிய சிறப்பம்சங்கள் & விளக்கம்",
    "sell.mediaTitle": "3. புகைப்படங்கள் பதிவேற்றம்",
    "sell.uploadPhotos": "புகைப்படங்களை பதிவேற்றவும் (விருப்பம்)",
    "sell.uploadHint": "புகைப்படங்களை பதிவேற்ற இங்கே கிளிக் செய்யவும்",
    "sell.uploadLimit": "PNG, JPG, JPEG கோப்புகள், அதிகபட்சம் 5 புகைப்படங்கள் (ஒவ்வொன்றும் 5MB)",
    "sell.submit": "சொத்து விவரங்களை சமர்ப்பிக்கவும்",
    "sell.successTitle": "பட்டியல் கோரிக்கை பெறப்பட்டது",
    "sell.successDesc": "நன்றி! எங்கள் நில வழக்கறிஞர் மற்றும் ஆலோசகர் உங்கள் சமர்ப்பிப்பை மதிப்பாய்வு செய்து 30 நிமிடங்களுக்குள் உங்களைத் தொடர்புகொள்வார்கள்.",
    "sell.submitAnother": "மற்றொரு சொத்தை சமர்ப்பிக்கவும்",

    // Detail page additional translations
    "detail.back": "சொத்துக்கள் பட்டியலுக்குத் திரும்பு",
    "detail.specsTitle": "சொத்து விவரக்குறிப்புகள்",
    "detail.aboutTitle": "இந்த சொத்தைப் பற்றி",
    "detail.amenitiesTitle": "வசதிகள்",
    "detail.legalTitle": "சட்ட ஆவணங்கள்",
    "detail.landmarksTitle": "அருகிலுள்ள அடையாளங்கள்",
    "detail.testimonialsTitle": "வாங்குபவர்கள் கூறுவது",
    "detail.similarTitle": "{city} இல் உள்ள ஒத்த சொத்துக்கள்",
    "detail.askingPrice": "கேட்கும் விலை",
    "detail.callAgent": "இப்போது அழைக்கவும்",
    "detail.whatsappNow": "வாட்ஸ்அப் செய்ய",
    "detail.requestDetails": "விவரங்களைக் கோரவும்",
    "detail.bookVisit": "தளத்தை இலவசமாகப் பார்க்க",
    "detail.quickInquiry": "விரைவான விசாரணை",
    "detail.callBackHint": "எங்கள் ஆலோசகர் 30 நிமிடங்களுக்குள் அழைப்பார்.",
    "detail.requestCallback": "திரும்ப அழைக்கக் கோரவும்",
    "detail.agreeConsent": "சமர்ப்பிப்பதன் மூலம் H and H Realty உங்களைத் தொடர்புகொள்ள ஒப்புக்கொள்கிறீர்கள்.",
    "detail.trustBadge": "பத்திரம் சரிபார்க்கப்பட்டது",
    "detail.legalBadge": "சட்டப்படி தயார்",
    "detail.loanBadge": "வங்கி கடன் தயார்",
    "detail.viewDetails": "விவரங்களைக் காண்க",

    // Contact page additional translations
    "contact.badge": "தொடர்பில் இருங்கள்",
    "contact.title": "நில ஆலோசகரிடம் பேசுங்கள்",
    "contact.desc": "இலவச தளம் பார்வையிட முன்பதிவு செய்யுங்கள் அல்லது சட்டபூர்வமான கேள்விகளைக் கேளுங்கள். 30 நிமிடங்களுக்குள் பதில் அளிக்கப்படும்.",
    "contact.formTitle": "தளத்தை பார்வையிட முன்பதிவு",
    "contact.fullName": "முழு பெயர்",
    "contact.phone": "தொலைபேசி எண்",
    "contact.email": "மின்னஞ்சல்",
    "contact.interestedIn": "ஆர்வம் உள்ள சொத்து",
    "contact.preferredDate": "விருப்பமான தேதி",
    "contact.timeSlot": "நேர இடைவெளி",
    "contact.message": "செய்தி",
    "contact.confirm": "தளப் பார்வையை உறுதிப்படுத்துக",
    "contact.reachUs": "நேரடியாக தொடர்பு கொள்ள",
    "contact.officeHours": "அலுவலக நேரம்",
    "contact.successTitle": "தளப் பார்வை கோரப்பட்டது",
    "contact.successDesc": "எங்கள் ஆலோசகர் சந்திக்கும் இடம் மற்றும் நேரத்தை உங்களுக்கு வாட்ஸ்அப் செய்வார்.",

    // Map page additional translations
    "map.title": "வரைபடக் காட்சி",
    "map.desc": "வரைபடத்தில் ஒரு சொத்தைக் காண அதைத் தேர்ந்தெடுக்கவும் - விவரங்களை அறிய கிளிக் செய்யவும்.",

    // Blog page additional translations
    "blog.badge": "வழிகாட்டுதல்கள் & நுண்ணறிவு",
    "blog.title": "இலவச நிலம் வாங்கும் வழிகாட்டிகள்",
    "blog.desc": "100% நம்பிக்கையுடன் சொத்துக்களை வாங்க உதவும் வகையில் சென்னையின் ரியல் எஸ்டேட் வழக்கறிஞர்களால் எழுதப்பட்ட எளிய சட்ட வழிகாட்டிகள்.",
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      if (saved === "en" || saved === "ta") return saved;
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ta" : "en"));
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
