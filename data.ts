import { TechnologyItem, DoctorProfile, PatientJourneyStep, PatientTestimonial } from './types';

export const CLINIC_INFO = {
  name: "Zobozdravstvo Surina",
  subName: "Dental Clinic Dr. Surina",
  location: "Slovenia (near Trieste, Italy & Croatia borders)",
  experience: "35+ Years of Clinical Excellence",
  implantsPlaced: "10,000+ Successful Implants placed",
  primaryBrand: "Straumann® Premium Swiss Implants (World Leader)"
};

export const CLINIC_TECHNOLOGIES: TechnologyItem[] = [
  {
    id: "3d-cbct",
    title: "3D CBCT Digital Tomography",
    tag: "High-Definition Diagnostics",
    subtitle: "Precision-grade 3D bone structure scans at 10x lower radiation than standard medical CT scan.",
    explanation: "Our advanced CBCT digital imaging creates a flawless, microscopic 3D model of your jaw structure in less than 20 seconds, allowing for 100% predictable surgical navigation.",
    benefit: "Ultra-precise bone measurements ensure zero nerve damage risk, with extremely reduced diagnostic exposure.",
    comparison: {
      traditional: "Traditional 2D panoramic X-rays provide a flat view, risking inaccurate physical depth assumptions during bone assessments.",
      surina: "A vivid 3D anatomical model that ensures absolute precision of implant angles, depth, and structural stability before making any incision."
    },
    iconName: "Scan3D"
  },
  {
    id: "intraoral-scanning",
    title: "Intraoral 3D Laser Scanner",
    tag: "No Messy Dental Molds",
    subtitle: "Digital mouth impressions captured seamlessly with safe laser scans. Comfortable, fast & immediate.",
    explanation: "No more gagging on cold, messy impression paste. Our state-of-the-art laser scanners scan your entire smile in minutes to render a precise digital map of your teeth and gums.",
    benefit: "Perfect prosthetic fit, dramatically accelerated turnaround times, and a completely stress-free digital diagnostic process.",
    comparison: {
      traditional: "Uncomfortable, gooey dental plaster trays held in your mouth for several minutes, causing gag or choking responses with frequent errors.",
      surina: "A clean, compact laser camera pen that captures 4,000 frames per second, creating a flawless virtual smile match instantly."
    },
    iconName: "Tv3D"
  },
  {
    id: "conscious-sedation",
    title: "Conscious Sedation Protocol",
    tag: "100% Painless / Anxiety-Free",
    subtitle: "A comfortable, dreaming state of twilight sedation designed for ultra-anxious or sensitive patients.",
    explanation: "Painless procedures (Brezbolečinsko) are our core promise. Certified anesthesiologists administer custom safe sedation, allowing you to relax, answer questions, and stay awake without feeling any stress or pain.",
    benefit: "Virtually zero surgical recall, highly comfortable extended surgery, and complete elimination of absolute dental anxiety.",
    comparison: {
      traditional: "Plain local anesthesia leaves patients fully alert to vibrations, clinical sounds, and procedural tension, inducing heavy panic.",
      surina: "Intravenous conscious sedation places you in a deeply peaceful state of utter relaxation, where 2 hours feel like 10 minutes, with no pain."
    },
    iconName: "HeartPulse"
  },
  {
    id: "computer-guided",
    title: "Computer-Guided Implantology",
    tag: "Robotic Precision Navigation",
    subtitle: "Surgical templates designed on CAD/CAM software to route implant placement with micron-level accuracy.",
    explanation: "Using the digital scan data, we create a bespoke surgical guide template. Implants are slotted precisely through digital keyholes, minimizing tissue disturbance.",
    benefit: "Maximum structural support, faster healing times, and significantly less post-operative swelling or sutures.",
    comparison: {
      traditional: "Dentists placing dental implants entirely 'by eye', relying on personal perception which can lead to larger incisions and varying placement stability.",
      surina: "Incredible computer-guided dental insertion path matching the exact pre-calcified angle for flawless osseointegration and premium aesthetics."
    },
    iconName: "ComputerIcon"
  }
];

export const DOCTORS: DoctorProfile[] = [
  {
    name: "Dr. Lučiano Surina",
    title: "Founder & Head of Implantoprotetika",
    specialties: [
      "Advanced Oral Rehabilitation",
      "Implantoprotetika (Implant Prosthodontics)",
      "Bespoke Functional Smile Reconstruction"
    ],
    education: "Laurea in Odontoiatria, Master in Prosthodontics (35+ Years Active)",
    experience: "Founder who has dedicated over three decades to building Slovenia's gold-standard implant clinic for international clients.",
    accomplishment: "Renowned expert in the dental region connecting Ljubljana, Trieste, and Zagreb, having restored over 4,000 complete arches.",
    imageUrl: "dr_luciano_surina", // We will link this to our generated asset in App.tsx!
    bio: "With 35 years of clinical practice, Dr. Lučiano Surina has pioneered seamless implant-supported restoration techniques. He is widely recognized for his precision and deep understanding of patient facial geometry, designing crowns and bridges that look indistinguishable from natural teeth."
  },
  {
    name: "M.sc. Dr. Uroš Surina",
    title: "Lead Implantology Specialist",
    specialties: [
      "All-on-4 & All-on-6 Nobel Biocare Standard",
      "Advanced Surgical Bone Grafting (Sinus Lift)",
      "Digital Guided Implant Surgery",
      "Computer-Guided Implantology"
    ],
    education: "Master of Science (M.sc.) in Implantology from the prestigious IMC Muenster (Germany), 2016.",
    experience: "Graduated with highest honors from Germany. Placed over 10,000 success-verified dental implants under advanced protocols.",
    accomplishment: "Slovenia's premier expert in immediate full-mouth restorations. Trained under world-class German surgical experts.",
    imageUrl: "https://picsum.photos/seed/dentistson/600/800", // A beautiful representation of the son
    bio: "Dr. Uroš Surina stands at the cutting edge of digital implantology. Since obtaining his clinical Master of Science in Germany, he has successfully performed over 10,000 implants. His expertise is concentrated in difficult cases involving extreme bone loss, sinus lifts, and painless immediate full-arch restorations."
  }
];

export const PATIENT_JOURNEY: PatientJourneyStep[] = [
  {
    stepNumber: 1,
    title: "Virtual Consultation & X-Ray Analysis",
    subtitle: "100% Free & No-Obligation",
    description: "You submit your panoramic X-Ray or 3D CBCT scan via our website, email, or Whatsapp. Our specialist team, overseen by Dr. Uroš Surina, analyzes your jawbone structure remotely.",
    duration: "Within 24 Hours",
    actions: [
      "Diagnostic review by Dr. Uroš Surina",
      "Custom treatment plan written in native Italian, Slovenian, or English",
      "Transparent cost estimate with absolutely zero hidden fees",
      "Virtual call with our diagnostic coordinator"
    ],
    iconName: "Computer"
  },
  {
    stepNumber: 2,
    title: "In-Clinic 3D Check & Same-Day Implants",
    subtitle: "Precision Meets Comfort",
    description: "You travel to our clinic (we assist with transport and premium lodging arrangements). In our clinic, we run high-definition 3D CBCT scans. Under comfortable conscious sedation, your Straumann implants are placed.",
    duration: "Day 1 (3-4 Hours)",
    actions: [
      "In-house digital 3D CBCT and customized computer surgical template routing",
      "Sedation-supported painless surgical placement of 4 or 6 Straumann premium implants",
      "Intraoral digital laser scan for building your custom provisional fixed bridge"
    ],
    iconName: "HeartPulse"
  },
  {
    stepNumber: 3,
    title: "Walk Out Smiling & Begin Living Again",
    subtitle: "Complete Aesthetic Restoration",
    description: "Within 48 hours of placing the implants, your beautiful, custom-made fixed acrylic teeth are securely locked onto your implants. You will enjoy complete biting capability and go home without any gaps or pain.",
    duration: "Day 2-3 (Smile Locked)",
    actions: [
      "Try-in and aesthetic matching of your custom temporary fixed teeth",
      "Secure prosthetic locking (Fiksno prosthetic lock) – no loose dentures",
      "Full departure package with instruction, certified implant passport, and medical guarantees"
    ],
    iconName: "Smile"
  }
];

export const PATIENT_TESTIMONIALS: PatientTestimonial[] = [
  {
    name: "Giovanni B.",
    age: 58,
    city: "Trieste",
    country: "Italy",
    treatment: "All-on-4 Upper & Lower",
    quote: "I was deathly afraid of dentists after years of bad experiences, and had lost almost all my teeth. At Surina clinic, Dr. Uroš explained conscious sedation. I felt zero pain. It was like going to sleep and waking up with a brand new life. Incredible!",
    fullStory: "Giovanni travelled just 45 minutes from Italy. He struggled with chew performance and heavy teeth wear. Under the care of the Surina team, he secured beautiful immediate provisional arches within 48 hours. After six months of flawless bone integration, he returned for his premium Zirconia final crowns.",
    rating: 5,
    imageSeed: "giovanni"
  },
  {
    name: "Franci K.",
    age: 64,
    city: "Ljubljana",
    country: "Slovenia",
    treatment: "Full-Mouth Dental Reconstruction",
    quote: "The Swiss Straumann implants are the best investment I ever made. The Father and Son team are masters. Uroš performs surgery with unbelievable German precision, while Lučiano creates dental prosthetic art.",
    fullStory: "Franci required advanced sinus lifting on the upper jaw alongside 6 dental implants. The computer-guided process meant less swelling, and he was able to return to work in 3 days with minimal disruption.",
    rating: 5,
    imageSeed: "franci"
  },
  {
    name: "Elena M.",
    age: 51,
    city: "Rijeka",
    country: "Croatia",
    treatment: "All-on-6 Upper Arch",
    quote: "The virtual assistant was super helpful! I uploaded my scan, got a transparent quote that was much more affordable than in Italy, and booked. The clinic looks like a 5-star hotel and their technology is unbelievable.",
    fullStory: "Elena wanted an aesthetic and functional dental fix. By choosing Slovenia's elite clinic, she got Straumann gold-standard dental implants at highly competitive prices, fully certified and backed by a lifetime warranty.",
    rating: 5,
    imageSeed: "elena"
  }
];
export const DENTAL_FAQS = [
  {
    question: "How is it possible to receive fixed teeth in just 48 hours?",
    answer: "Using the revolutionary 'Immediate Loading' technique (All-on-4 or All-on-6), premium titanium Straumann implants are placed with high primary stability. Within 48 hours, a custom-designed, highly aesthetic provisional bridge is securely screwed onto the implants. This allows you to bite, talk, and smile while your gums heal and bone fuses. There is no waiting for months with embarrassing missing teeth."
  },
  {
    question: "Is Slovenia really safe and certified for premium dental procedures?",
    answer: "Absolutely. Zobozdravstvo Surina operates under strict European union health standards. Slovenia has a world-renowned dental education system, and Dr. Uroš Surina graduated from the elite IMC Muenster in Germany, specializing specifically in advanced implantology. We only use world-leader genuine Straumann Swiss implants, accompanied by custom implant passport certificates."
  },
  {
    question: "What exactly is Conscious Sedation and will I feel any pain?",
    answer: "Conscious Sedation (Brezbolečinsko) is an advanced technique where a qualified anesthesiologist administers intravenous medications. You will fall into a deeply relaxed, 'twilight' state. You can still breathe on your own and respond to instructions, but you will feel absolutely no fear, anxiety, or pain. The majority of patients do not remember the procedure at all, describing it as a peaceful sleep."
  },
  {
    question: "Why should patients from Italy or Croatia travel to Zobozdravstvo Surina?",
    answer: "Patients travel to us due to our unbeatable pairing of ultra-pinnacle German expertise, Swiss premium Straumann hardware, and fully digital 3D technology—delivered at optimized price structures in Slovenia. Located extremely close to Trieste (Italy) and the Croatian border, we provide native Italian and English support, full logistics assistance, free hotel stays, and absolute clinical transparency."
  },
  {
    question: "What guarantees do I receive with my Straumann implants?",
    answer: "All Straumann® implants placed at our clinic carry an official Lifetime Warranty on the metal components. You are provided with a certified Implant Passport detailing the batch, serial numbers, and material certifications of your Swiss implant. Our clinic has been operating for over 35 years—giving you peace of mind that we will always be here to support you."
  }
];
