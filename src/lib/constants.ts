export const BUSINESS = {
  name: "Total Boat Repair & Sales",
  legalName: "Total Boat Repair & Sales, LLC",
  tagline: "Your one-stop shop for all marine needs!",
  phone: "(352) 542-0015",
  phoneHref: "tel:3525420015",
  email: "totalboatrepairandsales@gmail.com",
  address: {
    street: "25771 SE Highway 19",
    city: "Old Town",
    state: "FL",
    zip: "32680",
    full: "25771 SE Highway 19, Old Town, FL 32680",
  },
  hours: {
    weekdays: "8:00 AM – 5:00 PM",
    weekends: "Closed",
  },
  social: {
    facebook:
      "https://www.facebook.com/p/Total-Boat-Repair-Sales-61563500555322/",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.5!2d-82.98!3d29.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDM2JzAwLjAiTiA4MsKwNTgnNDguMCJX!5e0!3m2!1sen!2sus!4v1700000000000",
  googleRating: 4.5,
  reviewCount: 51,
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Boats", href: "/boats" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    id: "engine-repair",
    title: "Engine Repair & Diagnostics",
    description:
      "Expert diagnostics and repair for all outboard motor brands. From fuel system issues to complete rebuilds, we get you back on the water.",
    features: [
      "All outboard brands serviced",
      "Computer diagnostics",
      "Carburetor cleaning & rebuild",
      "Fuel system repair",
      "Electrical system diagnosis",
    ],
    icon: "Wrench",
  },
  {
    id: "routine-maintenance",
    title: "Routine Maintenance",
    description:
      "Keep your engine running smooth with scheduled maintenance. We follow manufacturer guidelines to protect your warranty.",
    features: [
      "Oil & filter changes",
      "100-hour service",
      "Spark plug replacement",
      "Impeller & water pump service",
      "Gear lube change",
    ],
    icon: "Settings",
  },
  {
    id: "winterization",
    title: "Winterization & Storage Prep",
    description:
      "Protect your investment during the off-season. Complete winterization service to ensure a trouble-free spring launch.",
    features: [
      "Complete engine winterization",
      "Fuel stabilization",
      "Cooling system flush",
      "Battery maintenance",
      "Fogging & corrosion protection",
    ],
    icon: "Snowflake",
  },
  {
    id: "honda-marine",
    title: "Honda Marine Sales & Service",
    description:
      "As an authorized Honda Marine dealer, we offer new motors, factory-trained service, and genuine OEM parts.",
    features: [
      "New Honda outboard sales",
      "Factory-trained technicians",
      "Genuine Honda OEM parts",
      "Warranty service",
      "Motor installations",
    ],
    icon: "Award",
  },
  {
    id: "boat-sales",
    title: "Pre-Owned Boat Sales",
    description:
      "Quality inspected pre-owned boats at fair prices. We also offer consignment, trade-ins, and financing assistance.",
    features: [
      "Inspected inventory",
      "Various makes & models",
      "Honest condition disclosures",
      "Trade-in welcome",
      "Financing assistance",
    ],
    icon: "Ship",
  },
  {
    id: "parts",
    title: "Parts & Accessories",
    description:
      "Honda OEM parts in stock plus we can source parts for any brand. Propellers, lower units, electronics, and more.",
    features: [
      "Honda OEM parts",
      "Parts for all brands",
      "Propellers & lower units",
      "Marine electronics",
      "Hardware & supplies",
    ],
    icon: "Package",
  },
  {
    id: "cosmetic",
    title: "Cosmetic & Restoration",
    description:
      "From minor touch-ups to full restorations, we bring your boat back to life. Fiberglass, paint, carpet, and upholstery.",
    features: [
      "Fiberglass repair",
      "Hull wet sanding & oxidation removal",
      "Carpet installation",
      "Upholstery cleaning & restoration",
      "Full boat detailing",
    ],
    icon: "Paintbrush",
  },
  {
    id: "electronics",
    title: "Marine Electronics",
    description:
      "Professional installation of fish finders, GPS, VHF radios, and lighting. We set it up right the first time.",
    features: [
      "Humminbird fish finders",
      "GPS & chartplotters",
      "VHF radio installation",
      "LED lighting upgrades",
      "Trolling motor setup",
    ],
    icon: "Monitor",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Mike R.",
    rating: 5,
    text: "Dennis and the crew are top notch! Had my motor running like new in no time. Honest pricing and great communication throughout. Won't go anywhere else.",
    date: "2024",
  },
  {
    name: "Sarah T.",
    rating: 5,
    text: "Bought a pre-owned bass boat from them and couldn't be happier. They were upfront about everything and even threw in a new battery. Great people!",
    date: "2024",
  },
  {
    name: "James W.",
    rating: 5,
    text: "These guys saved me a fortune. Another shop quoted me for a full rebuild but Total Boat diagnosed it as a simple fuel issue. Fixed in a day. Honest shop!",
    date: "2025",
  },
  {
    name: "Robert K.",
    rating: 5,
    text: "Had my boat detailed and it looks brand new. The before and after is unbelievable. They take real pride in their work. Highly recommend!",
    date: "2025",
  },
  {
    name: "Lisa M.",
    rating: 5,
    text: "Fast turnaround on my 100-hour service. They even found a small issue I didn't know about and fixed it at no extra charge. That's integrity.",
    date: "2024",
  },
  {
    name: "David H.",
    rating: 5,
    text: "Best marine shop in the tri-county area. Period. Fair prices, quality work, and they stand behind everything they do. Five stars all day.",
    date: "2025",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What brands do you service?",
    answer:
      "We service all outboard motor brands including Honda, Yamaha, Mercury, Evinrude, Johnson, Suzuki, Tohatsu, and more. As an authorized Honda Marine dealer, we specialize in Honda but our technicians are experienced with every major brand.",
  },
  {
    question: "Do you offer financing on boats?",
    answer:
      "Yes! We offer financing assistance on pre-owned boats. We work with several lenders to find competitive rates. Stop by or give us a call to discuss your options.",
  },
  {
    question: "How do I schedule a service appointment?",
    answer:
      "You can call us directly at (352) 542-0015 during business hours, or use our contact form online. We'll get back to you within one business day to schedule your appointment.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes, we provide free estimates on all repair work. Bring your boat by or describe the issue over the phone and we'll give you an honest assessment of what's needed.",
  },
  {
    question: "What is a 100-hour service?",
    answer:
      "A 100-hour service is comprehensive maintenance performed every 100 hours of engine operation. It includes oil and filter change, gear lube, spark plugs, impeller inspection, fuel filter, and a full systems check. It's essential for keeping your engine reliable.",
  },
  {
    question: "Do you sell new boats?",
    answer:
      "We specialize in quality pre-owned boats and new Honda outboard motors. Our pre-owned inventory is thoroughly inspected and we provide honest condition disclosures on every boat we sell.",
  },
  {
    question: "Can you install marine electronics?",
    answer:
      "Absolutely. We install fish finders, GPS units, VHF radios, LED lighting, trolling motors, and more. We carry Humminbird products and can source most major brands.",
  },
  {
    question: "What are your hours?",
    answer:
      "We're open Monday through Friday, 8:00 AM to 5:00 PM. We're closed on weekends. For emergencies, leave a message and we'll get back to you first thing Monday.",
  },
] as const;
