/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  Clock, 
  Send, 
  FileUp, 
  ArrowRight, 
  Smile, 
  Heart, 
  Check, 
  MessageSquare, 
  X, 
  Menu, 
  Lock, 
  FileText, 
  Star, 
  ThumbsUp, 
  ShieldAlert,
  Sparkle
} from 'lucide-react';

// Import local data assets and metadata
import { CLINIC_INFO, CLINIC_TECHNOLOGIES, DOCTORS, PATIENT_JOURNEY, PATIENT_TESTIMONIALS, DENTAL_FAQS } from './data';
import { ChatMessage, LeadFormInput } from './types';
import { TRANSLATIONS } from './translations';

// Asset imports
import drLucianoPhoto from './assets/images/dr_luciano_surina_1781090704274.png';
import luxuryLobby from './assets/images/luxury_dental_lobby_1781090921055.png';
import implantsTech from './assets/images/implants_technology_1781090935538.png';
import radiantSmile from './assets/images/radiant_smile_patient_1781090951170.png';

export default function App() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTabTechnology, setActiveTabTechnology] = useState(CLINIC_TECHNOLOGIES[0].id);

  // Hero slideshow carousel background
  const carouselImages = [
    {
      url: luxuryLobby,
      caption: "Our Five-Star Clinical Private Lounge",
      sub: "A setting designed to restore peace and absolute wellness before treatment."
    },
    {
      url: implantsTech,
      caption: "Surgical Navigation and Digital 3D CBCT",
      sub: "Micron-level computer mapping with 10 times lower radiation."
    },
    {
      url: radiantSmile,
      caption: "True Life-Changing Aesthetic Results",
      sub: "Join over 10,000 satisfied patients who have recaptured their bite and laughter."
    }
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Auto-rotate Hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  };

  // Virtual Assistant chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am Dr. Surina's Virtual Medical Assistant. We specialize in immediate All-on-4 dental implants, 100% conscious sedation (completely painless procedures), and Straumann implants here in Slovenia, extremely close to Trieste and Zagreb borders. \n\nI can speak English, Italiano, Slovenščina, or Deutsch. How may I assist with your diagnostic proposal today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [dentalLanguage, setDentalLanguage] = useState<'EN' | 'IT' | 'SL' | 'DE'>('EN');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[dentalLanguage];

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isBotTyping]);

  // Quick Action triggers for bot
  const triggerAssistantWithPrompt = (promptText: string, langLabel: 'EN' | 'IT' | 'SL' | 'DE') => {
    setDentalLanguage(langLabel);
    setIsChatOpen(true);
    handleSendMessage(promptText);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || userInput;
    if (!text.trim()) return;

    if (!textToSend) setUserInput('');

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsBotTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatMessages, userMsg] })
      });

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: data.text || "I am here to guide you. Feel free to ask about our All-on-4 system.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: `bot_err_${Date.now()}`,
        sender: 'bot',
        text: "My apologies, I had a small communication delay. Our clinic, Zobozdravstvo Surina, is situated near Trieste, Italy. Since 1991, we have integrated world-class Straumann implants and certified Conscious Sedation. Would you like us to call you at a preferred time for a consultation?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Lead Submission Form States
  const [formData, setFormData] = useState<LeadFormInput>({
    fullName: '',
    email: '',
    phone: '',
    country: 'Italy',
    dentalState: 'Severe tooth damage / All missing',
    hasScan: 'no',
    preferredContact: 'whatsapp',
    notes: ''
  });
  
  const [xrayFile, setXrayFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [diagnosticInterest, setDiagnosticInterest] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Drag & drop handlers for dental file upload
  const [dragActive, setDragActive] = useState(false);
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setXrayFile(file);
    setIsUploading(true);
    setUploadProgress(10);
    
    // Simulate high-tech progress bars parsing complex medical files
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setFormData(prevForm => ({ ...prevForm, hasScan: 'yes' }));
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          xrayFileName: xrayFile ? xrayFile.name : null,
          customInterest: diagnosticInterest
        })
      });

      if (response.ok) {
        setIsSubmitSuccess(true);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          country: 'Italy',
          dentalState: 'Severe tooth damage / All missing',
          hasScan: 'no',
          preferredContact: 'whatsapp',
          notes: ''
        });
        setXrayFile(null);
        setUploadProgress(0);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // FAQ accordion single picker
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Immediate Loading Step Tabs
  const [activeStepTab, setActiveStepTab] = useState(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden">
      
      {/* PROFESSIONAL PREMIUM BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-900/40 text-xs py-2 px-4 text-center text-slate-300 flex flex-wrap justify-center items-center gap-3">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 pulse-amber"></span>
          <span>{t.banner}</span>
        </span>
        <span className="hidden md:inline text-slate-500">|</span>
        <span className="flex items-center gap-1 text-amber-500 font-semibold uppercase tracking-wider text-[10px]">
          <Award className="w-3.5 h-3.5" /> {t.swissStraumann}
        </span>
      </div>

      {/* FIXED GLASSMORPHIC HEADER */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <span className="font-serif text-xl font-bold text-slate-950 tracking-tighter">ZS</span>
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-bold text-amber-500 hover:text-amber-400 transition-colors tracking-tight leading-none">
                Zobozdravstvo Surina
              </h1>
              <span className="text-[9px] text-slate-400 tracking-widest uppercase font-sans font-semibold">
                DENTALNA KLINIKA
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-amber-500 transition-colors">{t.nav.specialists}</a>
            <a href="#technology" className="hover:text-amber-500 transition-colors flex items-center gap-1">
              {t.nav.technology} <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            </a>
            <a href="#allon4" className="hover:text-amber-500 transition-colors">{t.nav.allon4}</a>
            <a href="#process" className="hover:text-amber-500 transition-colors">{t.nav.journey}</a>
            <a href="#testimonials" className="hover:text-amber-500 transition-colors">{t.nav.testimonials}</a>
            <a href="#faqs" className="hover:text-amber-500 transition-colors">{t.nav.faq}</a>
          </nav>

          {/* Quick Contact & Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Elegant Language Selector dropdown/buttons in header */}
            <div className="flex bg-slate-900/80 rounded-lg p-0.5 border border-slate-800">
              {(['EN', 'IT', 'SL', 'DE'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setDentalLanguage(lang);
                    const welcomeMsgs = {
                      EN: "Switched to English support! How can I assist with your All-on-4 dental implant or conscious IV sedation inquiries today?",
                      IT: "Supporto in Italiano attivato! Chiedimi pure spiegazioni sui nostri impianti svizzeri Straumann, la sedazione cosciente indolore, e il trasporto gratuito assistito da Trieste.",
                      SL: "Slovenska podpora aktivirana! Vprašajte nas karkoli o naših All-on-4 zobnih vsadkih, brezbolečinskem zdravljenju v sedaciji in cenovnih paketih.",
                      DE: "Support auf Deutsch aktiviert! Fragen Sie uns gerne nach unseren Schweizer Straumann-Implantaten, der völlig schmerzfreien Dämmerschlaf-Sedierung (Analgo-Sedierung) und unseren kostenlosen Hotel- und Transferservices ab der Grenze!"
                    };
                    setChatMessages(prev => [...prev, {
                      id: `lang_change_${Date.now()}`,
                      sender: 'bot',
                      text: welcomeMsgs[lang],
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }]);
                  }}
                  className={`px-2 py-0.5 rounded text-[10.5px] font-semibold cursor-pointer transition-all ${
                    dentalLanguage === lang
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={lang === 'EN' ? 'English' : lang === 'IT' ? 'Italiano' : lang === 'SL' ? 'Slovenščina' : 'Deutsch'}
                >
                  {lang === 'EN' ? '🇬🇧' : lang === 'IT' ? '🇮🇹' : lang === 'SL' ? '🇸🇮' : '🇩🇪'} {lang}
                </button>
              ))}
            </div>

            <a 
              href="tel:+38641614746" 
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
            >
              <span className="p-1.5 bg-slate-900 rounded-full border border-slate-800">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
              </span>
              <span>+386 41 614 746 <span className="text-slate-500 text-[10px] block font-sans">{t.headerSupport}</span></span>
            </a>
            <a 
              href="#diagnose" 
              className="px-3.5 py-1.5 rounded-md bg-transparent border border-amber-500/40 hover:border-amber-500 text-amber-500 hover:bg-amber-500/5 transition-all duration-300 text-xs font-semibold tracking-wide uppercase"
            >
              {t.scanReviewButton}
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            {/* Elegant Language Selector dropdown/buttons in header for mobile/tablet */}
            <div className="flex bg-slate-900/80 rounded-lg p-0.5 border border-slate-800 sm:me-2">
              {(['EN', 'IT', 'SL', 'DE'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setDentalLanguage(lang);
                    const welcomeMsgs = {
                      EN: "Switched to English support! How can I assist with your All-on-4 dental implant or conscious IV sedation inquiries today?",
                      IT: "Supporto in Italiano attivato! Chiedimi pure spiegazioni sui nostri impianti svizzeri Straumann, la sedazione cosciente indolore, e il trasporto gratuito assistito da Trieste.",
                      SL: "Slovenska podpora aktivirana! Vprašajte nas karkoli o naših All-on-4 zobnih vsadkih, brezbolečinskem zdravljenju v sedaciji in cenovnih paketih.",
                      DE: "Support auf Deutsch aktiviert! Fragen Sie uns gerne nach unseren Schweizer Straumann-Implantaten, der völlig schmerzfreien Dämmerschlaf-Sedierung (Analgo-Sedierung) und unseren kostenlosen Hotel- und Transferservices ab der Grenze!"
                    };
                    setChatMessages(prev => [...prev, {
                      id: `lang_change_${Date.now()}`,
                      sender: 'bot',
                      text: welcomeMsgs[lang],
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }]);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold cursor-pointer transition-all ${
                    dentalLanguage === lang
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'EN' ? '🇬🇧' : lang === 'IT' ? '🇮🇹' : lang === 'SL' ? '🇸🇮' : '🇩🇪'}
                </button>
              ))}
            </div>

            {/* Mobile hamburger menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu expanded */}
        {mobileMenuOpen && (
          <div className="lg:hidden animate-fade-in bg-slate-950 border-b border-slate-900 py-6 px-4 space-y-4 shadow-xl">
            <div className="space-y-2 pb-4 border-b border-slate-900">
              <span className="text-xs text-slate-400 block font-mono uppercase tracking-wide">Language / Lingua / Jezik / Sprache:</span>
              <div className="grid grid-cols-4 gap-2">
                {(['EN', 'IT', 'SL', 'DE'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setDentalLanguage(lang);
                      setMobileMenuOpen(false);
                      setIsChatOpen(true);
                      const welcomeMsgs = {
                        EN: "Switched to English support! How can I assist with your All-on-4 dental implant or conscious IV sedation inquiries today?",
                        IT: "Supporto in Italiano attivato! Chiedimi pure spiegazioni sui nostri impianti svizzeri Straumann, la sedazione cosciente indolore, e il trasporto gratuito assistito da Trieste.",
                        SL: "Slovenska podpora aktivirana! Vprašajte nas karkoli o naših All-on-4 zobnih vsadkih, brezbolečinskem zdravljenju v sedaciji in cenovnih paketih.",
                        DE: "Support auf Deutsch aktiviert! Fragen Sie uns gerne nach unseren Schweizer Straumann-Implantaten, der völlig schmerzfreien Dämmerschlaf-Sedierung (Analgo-Sedierung) und unseren kostenlosen Hotel- und Transferservices ab der Grenze!"
                      };
                      setChatMessages(prev => [...prev, {
                        id: `lang_change_${Date.now()}`,
                        sender: 'bot',
                        text: welcomeMsgs[lang],
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }]);
                    }}
                    className={`p-2 rounded text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      dentalLanguage === lang
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-300 border border-slate-850 hover:text-amber-500'
                    }`}
                  >
                    <span className="text-sm">
                      {lang === 'EN' ? '🇬🇧' : lang === 'IT' ? '🇮🇹' : lang === 'SL' ? '🇸🇮' : '🇩🇪'}
                    </span>
                    <span>{lang}</span>
                  </button>
                ))}
              </div>
            </div>
            <nav className="flex flex-col gap-3 font-medium text-sm">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-300 hover:text-white transition-colors">{t.nav.specialists}</a>
              <a href="#technology" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-300 hover:text-white transition-colors">{t.nav.technology}</a>
              <a href="#allon4" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-300 hover:text-white transition-colors">{t.nav.allon4}</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-300 hover:text-white transition-colors">{t.nav.journey}</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-300 hover:text-white transition-colors">{t.nav.testimonials}</a>
              <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-300 hover:text-white transition-colors">{t.nav.faq}</a>
            </nav>
            <div className="pt-4 flex flex-col gap-3 border-t border-slate-900">
              <a 
                href="tel:+38641614746" 
                className="py-3 px-4 rounded-lg bg-slate-900 border border-slate-800 text-center flex items-center justify-center gap-2 text-sm text-slate-300 hover:text-white"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Call Center: +386 41 614 746</span>
              </a>
              <a 
                href="#diagnose" 
                onClick={() => setMobileMenuOpen(false)} 
                className="py-3 px-4 rounded-lg bg-amber-500 text-slate-950 font-bold uppercase text-xs text-center tracking-wider hover:bg-amber-400 transition-all shadow-lg"
              >
                {t.scanReviewButton}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION / LANDING INTRO */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-slate-900/80">
        
        {/* IMPACTFUL CAROUSEL SLIDESHOW BACKGROUND */}
        <div className="absolute inset-0 z-0">
          {carouselImages.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === carouselIndex ? 'opacity-25' : 'opacity-0'
              }`}
            >
              <img 
                src={img.url} 
                alt="Clinic background slide" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          {/* Rich gradients to ensure extreme typographical legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20"></div>
        </div>

        {/* Bottom Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-15 flex gap-2">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCarouselIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === carouselIndex ? 'w-8 bg-amber-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to background slide ${i + 1}`}
            ></button>
          ))}
        </div>

        {/* Carousel Prev/Next Buttons for User Interaction */}
        <div className="absolute bottom-6 right-6 z-15 hidden md:flex gap-1.5">
          <button 
            onClick={prevSlide}
            className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all transition-duration"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all transition-duration"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* HERO CONTAINER */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20 lg:pb-32 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: POWERFUL HERO COPY & DRIVING HOOKS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status indicator tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-xs text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Core persuasive Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              {t.hero.title}
            </h2>

            {/* Solid sales pitch explaining high-ticket value for Italy/Croatia */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* Quick trust metrics row */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-900/60 max-w-lg">
              <div className="text-center sm:text-left">
                <span className="block text-2xl font-bold text-white font-serif">{t.hero.experience}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">{t.hero.experienceSub}</span>
              </div>
              <div className="text-center sm:text-left border-x border-slate-900/60 px-4">
                <span className="block text-2xl font-bold text-amber-500 font-serif">{t.hero.implantsPlural}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">{t.hero.implantsPluralSub}</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="block text-2xl font-bold text-white font-serif">{t.hero.satisfaction}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">{t.hero.satisfactionSub}</span>
              </div>
            </div>

            {/* CALL TO ACTION HUB BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#diagnose" 
                className="px-6 py-4 rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/10 text-center flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Chat action triggers */}
              <button 
                onClick={() => {
                  setIsChatOpen(true);
                  handleSendMessage(
                    dentalLanguage === 'DE' ? "Können Sie erklären, wie die Dämmerschlaf-Sedierung funktioniert?" :
                    dentalLanguage === 'IT' ? "Puoi spiegare come funziona la sedazione cosciente?" :
                    dentalLanguage === 'SL' ? "Kako deluje zavestna sedacija in All-on-4 zobni vsadki?" :
                    "Can you explain how conscious sedation works and if All-on-4 implants are completely painless?"
                  );
                }}
                className="px-6 py-4 rounded bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-white font-bold uppercase tracking-wider text-xs text-center flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </div>

            {/* Micro badge carousel descriptors */}
            <div className="flex items-center gap-5 text-xs text-slate-400 font-mono pt-4">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Slovenian EU Certified
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Official Straumann Partner
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Free Private VIP Transport
              </span>
            </div>

            {/* Current background slide title tracker */}
            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-850 max-w-xs text-[11px] text-slate-400">
              <span className="text-amber-500 font-semibold block uppercase tracking-wider text-[9px] mb-0.5">Clinic Preview Status:</span>
              <span className="text-white font-medium">{carouselImages[carouselIndex].caption}</span> — {carouselImages[carouselIndex].sub}
            </div>

          </div>

          {/* RIGHT SIDE: DOCTOR LUČIANO PORTRAIT AND QUICK DIAGNOSTIC MATRICES */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-indigo-500/10 rounded-2xl blur-2xl"></div>
            
            {/* Elegant physical card holding Dr. Lučiano Surina's profile */}
            <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl p-6 overflow-hidden shadow-2xl space-y-6">
              
              <div className="relative group overflow-hidden rounded-xl border border-slate-800 bg-slate-950 aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] max-h-[420px]">
                <img 
                  src={drLucianoPhoto} 
                  alt="Dr. Lučiano Surina, senior implantologist" 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro overlay identifying him */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 pt-20">
                  <div className="flex items-end justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white leading-tight">Dr. Lučiano Surina</h4>
                      <p className="text-[11px] text-amber-500 tracking-wider uppercase font-mono">Founder & Prosthetics Director</p>
                    </div>
                    <span className="px-2 py-1 rounded bg-amber-500 text-[10px] font-bold text-slate-950 uppercase">
                      35+ Years Experience
                    </span>
                  </div>
                </div>
              </div>

              {/* QUICK TREATMENT INTEREST TOOL */}
              <div className="space-y-3">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-amber-500 text-center font-semibold">
                  ⚡ SELECT YOUR DENTAL TREATMENT GOAL BELOW
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => {
                      setDiagnosticInterest("All-on-4 / Full Arch Fixed Teeth");
                      setFormData(prev => ({...prev, notes: "Interested in the All-on-4 immediate fixed teeth package."}));
                      const target = document.getElementById('diagnose');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`p-2.5 rounded border text-xs text-center font-medium transition-all ${
                      diagnosticInterest === "All-on-4 / Full Arch Fixed Teeth" 
                        ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold' 
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    All-on-4 Full Arch
                  </button>
                  <button 
                    onClick={() => {
                      setDiagnosticInterest("Sinus Lift & Bone Scaffold");
                      setFormData(prev => ({...prev, notes: "I have heavy bone loss, need detailed bone grafting review."}));
                      const target = document.getElementById('diagnose');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`p-2.5 rounded border text-xs text-center font-medium transition-all ${
                      diagnosticInterest === "Sinus Lift & Bone Scaffold" 
                        ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold' 
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    Advanced Bone Loss
                  </button>
                  <button 
                    onClick={() => {
                      setDiagnosticInterest("Single Swiss Implant");
                      setFormData(prev => ({...prev, notes: "Interested in replacing single/several loose teeth with Straumann."}));
                      const target = document.getElementById('diagnose');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`p-2.5 rounded border text-xs text-center font-medium transition-all ${
                      diagnosticInterest === "Single Swiss Implant" 
                        ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold' 
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    Single Implant
                  </button>
                  <button 
                    onClick={() => {
                      setDiagnosticInterest("Painless Sedation Consultation");
                      setFormData(prev => ({...prev, notes: "I have extreme dental panic, need conscious sedation info."}));
                      const target = document.getElementById('diagnose');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`p-2.5 rounded border text-xs text-center font-medium transition-all ${
                      diagnosticInterest === "Painless Sedation Consultation" 
                        ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold' 
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    Fear Dental (Sedation)
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 text-center italic mt-2">
                  Selected goal automatically configures your free surgical quote workspace below.
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* TRIPLE TRUST FRAMEWORK */}
      <section id="about" className="bg-[#f7f4eb] py-16 border-b border-[#e5dac1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-amber-600 font-mono text-xs uppercase tracking-widest block font-bold">Uncompromising Quality</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-950">The Father-Son Triple Trust framework</h3>
            <p className="text-slate-700 text-sm">Our world-standard clinical pedigree guarantees precise physical restoration backed by lifetime coverage.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Trust item 1 */}
            <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700/60 transition-all space-y-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-950 flex items-center justify-center text-amber-500">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">35 Years Single-Minded Focus</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Founded by Dr. Lučiano Surina, we have focused exclusively on advanced implants prosthodontics for over three decades. Unlike multi-chain clinics, we provide personalized oversight on every case.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-400 font-mono">
                → Private clinical model since 1991
              </div>
            </div>

            {/* Trust item 2 */}
            <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700/60 transition-all space-y-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-950 flex items-center justify-center text-amber-500">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">10,000+ Placed Implants</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Lead surgeon M.sc. Dr. Uroš Surina, specialized at the prestigious IMC Muenster in Germany, has personally executed over 10,000 flawless biological bone implant procedures.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-400 font-mono">
                → M.sc. Germany surgical expert
              </div>
            </div>

            {/* Trust item 3 */}
            <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700/60 transition-all space-y-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-950 flex items-center justify-center text-amber-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">Exclusive Swiss Straumann®</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                No knock-off materials. We work strictly with certified Swiss Straumann premium titanium systems, accompanied by official implant passports and global lifetime manufacturer warranties.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-400 font-mono">
                → Official European Straumann partnership
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* REVOLUTIONARY TECHNOLOGY MAP */}
      <section id="technology" className="bg-slate-950 py-20 border-b border-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Tech explanation left side */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-900/40 text-[11px] text-amber-400 font-mono uppercase">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> Digital Hospital Standards
              </div>
              <h3 className="font-serif text-3xl font-bold text-white tracking-tight lead-none">
                Painless. Swift. <br />
                <span className="text-amber-500 font-serif font-medium">100% Computerized.</span>
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Conventional dental clinics rely on visual guesses and gooey compound impressions that induce choking fear. Zobozdravstvo Surina integrates fully digitized diagnostic hardware for pain-free precision.
              </p>

              {/* Sidebar Quick Action list */}
              <div className="space-y-2 pt-2">
                {CLINIC_TECHNOLOGIES.map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => setActiveTabTechnology(tech.id)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between ${
                      activeTabTechnology === tech.id 
                        ? 'bg-indigo-950/60 text-amber-500 border-amber-500/60 shadow' 
                        : 'bg-slate-900 text-slate-400 border-slate-850 hover:border-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{tech.title}</span>
                    <span className="text-[10px] text-slate-500">➔</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tech visualization details right side */}
            <div className="lg:col-span-8">
              {CLINIC_TECHNOLOGIES.map((tech) => {
                if (tech.id !== activeTabTechnology) return null;
                return (
                  <div key={tech.id} className="p-8 rounded-2xl bg-indigo-950/30 border border-indigo-900/30 space-y-6 animate-fade-in shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest block font-bold">
                          {tech.tag}
                        </span>
                        <h4 className="font-serif text-2xl font-bold text-white mt-0.5">
                          {tech.title}
                        </h4>
                      </div>
                      <span className="px-3 py-1.5 rounded bg-slate-950 text-indigo-400 font-mono text-[10px] uppercase border border-indigo-900/40">
                        Surina Premium standard
                      </span>
                    </div>

                    <p className="text-slate-200 text-sm sm:text-base font-serif italic">
                      "{tech.subtitle}"
                    </p>

                    <div className="space-y-4 text-slate-300 text-xs sm:text-sm">
                      <p className="leading-relaxed">{tech.explanation}</p>
                      
                      {/* Clinical Benefit callout */}
                      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        <strong className="text-white block text-xs uppercase tracking-wider mb-1">
                          ★ Patient Physical Benefit:
                        </strong>
                        {tech.benefit}
                      </div>

                      {/* Head-to-Head Comparison table */}
                      <div className="grid md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-indigo-900/20">
                        <div className="p-4 rounded bg-slate-950/60 border border-slate-900 space-y-1">
                          <span className="text-red-400 font-semibold uppercase tracking-wider text-[10px] block">
                            ❌ TRADITIONAL DENTISTRY CLINIC
                          </span>
                          <p className="text-slate-400 leading-relaxed text-xs">
                            {tech.comparison.traditional}
                          </p>
                        </div>
                        <div className="p-4 rounded bg-amber-950/20 border border-amber-500/20 space-y-1">
                          <span className="text-amber-500 font-bold uppercase tracking-wider text-[10px] block">
                            ✔ SURINA ELITE CLINIC METHOD
                          </span>
                          <p className="text-slate-300 leading-relaxed text-xs">
                            {tech.comparison.surina}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* DOCTORS PROFILE: THE CLINICAL AUTHORS */}
      <section className="bg-slate-950 py-20 border-t border-b border-indigo-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <span className="text-amber-500 font-mono text-xs uppercase tracking-widest block">Double Authority</span>
            <h3 className="font-serif text-3xl font-bold text-white">Father & Son Clinical Experts</h3>
            <p className="text-slate-400 text-sm">Combining 35 years of clinical restorative craft with top-tier German surgical implantology.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Doctor 1 (Dr. Lučiano) */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700/60 transition-all space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 bg-slate-900">
                    <img 
                      src={drLucianoPhoto} 
                      alt="Dr. Lučiano Surina sketch" 
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-white leading-none">{DOCTORS[0].name}</h4>
                    <span className="text-[11px] text-amber-500 font-mono uppercase tracking-wider block mt-1">
                      {DOCTORS[0].title}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-slate-300 text-xs sm:text-sm">
                  <p className="font-serif italic text-slate-200">"{DOCTORS[0].bio}"</p>
                  
                  <div className="pt-4 space-y-2">
                    <span className="block text-[10px] font-mono text-slate-400 tracking-wider uppercase">Key Specialties:</span>
                    <ul className="space-y-1.5 pl-3">
                      {DOCTORS[0].specialties.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-900 space-y-2">
                <div className="text-xs text-slate-400 flex justify-between">
                  <span>Education Profile:</span>
                  <span className="text-white font-medium">{DOCTORS[0].education}</span>
                </div>
                <div className="text-xs text-slate-400 flex justify-between">
                  <span>Restored Complete Arches:</span>
                  <span className="text-white font-medium">Over 4,000 satisfied arches</span>
                </div>
              </div>
            </div>

            {/* Doctor 2 (Dr. Uroš) */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-indigo-950/20 to-slate-950 border border-indigo-900/20 hover:border-indigo-800/40 transition-all space-y-6 flex flex-col justify-between shadow-lg shadow-indigo-950/10">
              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 bg-slate-950 flex items-center justify-center">
                    {/* An elegant modern placeholder/image wrapper representation */}
                    <div className="w-full h-full bg-indigo-900 flex items-center justify-center text-white text-lg font-serif">US</div>
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-white leading-none">{DOCTORS[1].name}</h4>
                    <span className="text-[11px] text-amber-500 font-mono uppercase tracking-wider block mt-1">
                      {DOCTORS[1].title}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-slate-300 text-xs sm:text-sm">
                  <p className="font-serif italic text-slate-200">"{DOCTORS[1].bio}"</p>
                  
                  <div className="pt-4 space-y-2">
                    <span className="block text-[10px] font-mono text-slate-400 tracking-wider uppercase">Advanced Germany Qualifications:</span>
                    <ul className="space-y-1.5 pl-3">
                      {DOCTORS[1].specialties.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-350">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-900 space-y-2">
                <div className="text-xs text-slate-400 flex justify-between">
                  <span>Germany Academic Grade:</span>
                  <span className="text-white font-medium text-right font-serif text-[11px] bg-indigo-950 px-2 py-0.5 rounded text-amber-500">M.sc. Implantology, IMC Muenster</span>
                </div>
                <div className="text-xs text-slate-400 flex justify-between">
                  <span>Lifetime Implants Processed:</span>
                  <span className="text-white font-medium">{DOCTORS[1].experience}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* THE ALL-ON-4 / ALL-ON-6 REVOLUTION SECTION */}
      <section id="allon4" className="bg-slate-950 py-20 border-b border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Right details left content column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] font-mono text-amber-500 uppercase tracking-widest block font-bold">
                ★ Fiksno / Fully Fixed Dental Solution
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight lead-none">
                The Immediate loading All-on-4 / All-on-6 protocol
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                If you suffer from loose dentures, broken structures, or extreme bone loss, our immediate fixed loading procedure will lock a pristine customized dental bridge directly into premium Swiss Straumann titanium anchors.
              </p>

              {/* Day-by-Day Interactive Tab selection buttons */}
              <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex">
                <button
                  onClick={() => setActiveStepTab(1)}
                  className={`flex-1 text-center py-2 text-xs font-mono font-bold uppercase rounded ${
                    activeStepTab === 1 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Day 1: Anchor & Setup
                </button>
                <button
                  onClick={() => setActiveStepTab(2)}
                  className={`flex-1 text-center py-2 text-xs font-mono font-bold uppercase rounded ${
                    activeStepTab === 2 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Day 2-3: Smile Locked (Fiksno)
                </button>
              </div>

              {/* Selected Day Info */}
              {activeStepTab === 1 ? (
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 animate-fade-in">
                  <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-950 text-amber-400 text-xs flex items-center justify-center font-mono">01</span>
                    Implant Placement & 3D Imaging
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Our anesthesiologist initiates Conscious Sedation, after which Dr. Uroš slots 4 or 6 Straumann implants using computerized keyhole surgical paths. We utilize biological bone grafting blocks if required, ensuring a fast procedure.
                  </p>
                  <ul className="text-xs text-amber-500 space-y-1 font-mono">
                    <li>✓ Complete pain isolation</li>
                    <li>✓ CAD/CAM digital navigation</li>
                  </ul>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 animate-fade-in">
                  <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-950 text-amber-400 text-xs flex items-center justify-center font-mono">02</span>
                    The 48-Hour Fiksno Bite Lock
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Our in-clinic digital lab coordinates are finalized and a secure, non-removable temporary acrylic bridge is securely screwed into the structural implants. You wake up on Day 2 with absolute chewing capabilities and a bright natural aesthetic.
                  </p>
                  <ul className="text-xs text-amber-500 space-y-1 font-mono">
                    <li>✓ Non-removable fixed teeth</li>
                    <li>✓ Immediate chewing capability</li>
                  </ul>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <span className="p-2 bg-indigo-950/80 rounded-full border border-indigo-900">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                </span>
                <span className="text-xs text-slate-300">
                  Backed by <strong className="text-white">Official Lifetime Implant Guarantees</strong> and premium documentation files.
                </span>
              </div>

            </div>

            {/* Visual All-on-4 benefits blocks right column */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              
              <div className="p-6 bg-slate-900 border border-slate-850 rounded-xl space-y-3">
                <span className="text-2xl">🦷</span>
                <h4 className="font-serif text-lg font-bold text-white">No Gags or Loose Plates</h4>
                <p className="text-slate-405 text-xs sm:text-sm leading-relaxed text-slate-450">
                  Conventional dentures cover the palate, limiting taste and moving around when talking. The All-on-4 bridge leaves your palate fully exposed and feels natural.
                </p>
              </div>

              <div className="p-6 bg-indigo-950/20 border border-indigo-900/40 rounded-xl space-y-3 shadow-sm">
                <span className="text-2xl">💎</span>
                <h4 className="font-serif text-lg font-bold text-white">Bone Preservation</h4>
                <p className="text-slate-405 text-xs sm:text-sm leading-relaxed text-slate-450">
                  Titanium implants mimic tooth roots, stimulating the jawbone biologically and preventing the hollow facial collapse associated with missing teeth.
                </p>
              </div>

              <div className="p-6 bg-indigo-950/20 border border-indigo-900/40 rounded-xl space-y-3 shadow-sm">
                <span className="text-2xl">⚡</span>
                <h4 className="font-serif text-lg font-bold text-white">German Precision Fit</h4>
                <p className="text-slate-405 text-xs sm:text-sm leading-relaxed text-slate-450">
                  We use CAD/CAM computers to calculate perfect anatomical tooth ratios, designing a smile aligned with your face with zero bite errors.
                </p>
              </div>

              <div className="p-6 bg-slate-900 border border-slate-850 rounded-xl space-y-3">
                <span className="text-2xl">💤</span>
                <h4 className="font-serif text-lg font-bold text-white">Full Conscious Sedation</h4>
                <p className="text-slate-405 text-xs sm:text-sm leading-relaxed text-slate-450">
                  Unbeatable for long surgical cases. Our certified anesthesiologist controls safe twilight relaxation, keeping your blood pressure stable.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* STEP-BY-STEP PROCESS FOR INTERNATIONAL PATIENTS */}
      <section id="process" className="bg-[#f7f4eb] py-20 border-b border-[#e5dac1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <span className="text-amber-600 font-mono text-xs uppercase tracking-widest block font-bold">Absolute Logistics Convenience</span>
            <h3 className="font-serif text-3xl font-bold text-slate-950">Your Cross-Border Journey to a Painless Smile</h3>
            <p className="text-slate-700 text-sm">We manage transport, accommodation, and high-definition diagnostics so you can focus completely on recovering.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PATIENT_JOURNEY.map((step) => (
              <div key={step.stepNumber} className="p-8 rounded-2xl bg-slate-900 border border-slate-850 relative space-y-5 flex flex-col justify-between">
                
                {/* Visual Step Badge */}
                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-mono font-bold text-lg flex items-center justify-center shadow-lg">
                  {step.stepNumber}
                </span>

                <div className="space-y-4 pt-4">
                  <div>
                    <span className="text-[10px] text-amber-500 font-mono uppercase tracking-wider block font-bold">
                      {step.subtitle}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-white leading-tight mt-0.5">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-850/60 space-y-3">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    ➔ Scheduled Timeframe: <strong className="text-white">{step.duration}</strong>
                  </span>
                  
                  <div className="space-y-1.5 pl-3">
                    {step.actions.map((act, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <span className="text-amber-500 mt-0.5">✓</span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Transportation Bonus Map Callout */}
          <div className="mt-12 p-6 rounded-xl bg-indigo-950/30 border border-indigo-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="p-3 bg-slate-950 rounded-full border border-indigo-900 text-amber-500 text-2xl">🚗</span>
              <div>
                <h4 className="font-serif text-lg font-bold text-white">Italian Borders & Complimentary Lodging Assistance</h4>
                <p className="text-slate-400 text-xs sm:text-sm">Located extremely close to Trieste border (40 mins driving) and Rijeka border. We provide free private chauffeured pickup services and assist with custom complimentary hotel rooms near Trieste bay!</p>
              </div>
            </div>
            <button 
              onClick={() => triggerAssistantWithPrompt("Can you explain what transport and lodging facilities you organize for patients arriving from Trieste, Italy?", "EN")}
              className="px-5 py-2.5 rounded bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs text-amber-500 font-mono font-bold uppercase shrink-0 transition-colors"
            >
              Consult Transit Support
            </button>
          </div>

        </div>
      </section>

      {/* SECCIÓN INTERACTIVA SANTIAGO / REAL TESTIMONIALS */}
      <section id="testimonials" className="bg-slate-950 py-20 border-b border-indigo-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <span className="text-amber-500 font-mono text-xs uppercase tracking-widest block font-bold">Unfiltered Clinical Verification</span>
            <h3 className="font-serif text-3xl font-bold text-white">Genuine Dental Success Stories</h3>
            <p className="text-slate-400 text-sm">Read the journeys of real patients from Italy, Slovenia, and Croatia who recovered their lifestyle and smiles.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PATIENT_TESTIMONIALS.map((test, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-850 hover:border-slate-800 transition-all flex flex-col justify-between">
                
                <div className="space-y-4">
                  {/* Visual Star Ratings */}
                  <div className="flex gap-1">
                    {[...Array(test.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="font-serif text-base italic text-white leading-relaxed">
                    "{test.quote}"
                  </p>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {test.fullStory}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-850/60 mt-6 flex items-center justify-between">
                  <div>
                    <h5 className="font-serif text-sm font-bold text-white leading-none">
                      {test.name}, <span className="font-sans font-light text-slate-400 text-xs">{test.age} years</span>
                    </h5>
                    <span className="text-[10px] text-amber-500 font-mono uppercase tracking-wider block mt-0.5">
                      📍 {test.city}, {test.country}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-indigo-950/85 text-[10px] font-bold text-indigo-400 uppercase border border-indigo-905/40">
                    {test.treatment}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      <section id="diagnose" className="scroll-mt-20 bg-gradient-to-b from-slate-950 to-indigo-950/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Lead Copy Left column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-amber-500 font-mono text-xs uppercase tracking-widest block font-bold">★ {dentalLanguage === 'DE' ? 'Kostenlose Analyse' : dentalLanguage === 'IT' ? 'Analisi Gratuita' : dentalLanguage === 'SL' ? 'Brezplačna ocena' : 'Zero Commitment Review'}</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none">
                {t.diagnoseSection.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t.diagnoseSection.subtitle}
              </p>

              <div className="space-y-4">
                
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-900 flex items-center justify-center text-amber-500 text-xs mt-0.5 font-bold font-mono">1</span>
                  <div className="text-slate-350 text-xs sm:text-sm">
                    <strong className="text-white block">{t.journeySection.step1Title}</strong>
                    <span>{t.journeySection.step1Point1} • {t.journeySection.step1Point2}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-900 flex items-center justify-center text-amber-500 text-xs mt-0.5 font-bold font-mono">2</span>
                  <div className="text-slate-350 text-xs sm:text-sm">
                    <strong className="text-white block">{t.journeySection.step2Title}</strong>
                    <span>{t.journeySection.step2Point2} • {t.journeySection.step2Point1}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-900 flex items-center justify-center text-amber-500 text-xs mt-0.5 font-bold font-mono">3</span>
                  <div className="text-slate-350 text-xs sm:text-sm">
                    <strong className="text-white block">{t.journeySection.step3Title}</strong>
                    <span>{t.journeySection.step3Point1} • {t.journeySection.step3Point2}</span>
                  </div>
                </div>

              </div>

              {/* Secure statement */}
              <div className="p-4 rounded-lg bg-slate-900/95 border border-slate-850/60 flex items-center gap-3 max-w-md">
                <Lock className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-xs text-slate-400 font-mono">
                  {t.diagnoseSection.hipaaSecure}
                </span>
              </div>

            </div>

            {/* Interactive Lead Intake Wizard Form */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-indigo-500/5 rounded-2xl"></div>
              
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                
                {isSubmitSuccess ? (
                  <div className="text-center py-12 space-y-4 animate-fade-in">
                    <span className="text-4xl block">✨👨‍⚕️</span>
                    <h4 className="font-serif text-2xl font-bold text-white">{t.diagnoseSection.successTitle}</h4>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      {t.diagnoseSection.successDesc}
                    </p>
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono max-w-sm mx-auto">
                      ✔ {dentalLanguage === 'DE' ? 'Wir melden uns innerhalb von 12 Stunden bei Ihnen.' : dentalLanguage === 'IT' ? 'Ti risponderemo entro 12 ore.' : dentalLanguage === 'SL' ? 'Kontaktirali vas bomo v 12 urah.' : 'We will respond within 12 hours.'}
                    </div>
                    <button 
                      onClick={() => setIsSubmitSuccess(false)}
                      className="px-6 py-2.5 rounded bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-bold uppercase text-slate-300 font-mono cursor-pointer"
                    >
                      {dentalLanguage === 'DE' ? 'Weitere Anfrage senden' : dentalLanguage === 'IT' ? 'Invia un altro quesito' : dentalLanguage === 'SL' ? 'Pošlji novo povpraševanje' : 'Submit Another Diagnostic Inquiry'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-white leading-none">{t.diagnoseSection.formTitle}</h4>
                        <span className="text-[10px] text-amber-500 font-mono uppercase tracking-wider block mt-1">{t.diagnoseSection.formSub}</span>
                      </div>
                      <span className="px-2 py-1 rounded bg-indigo-950 text-amber-400 text-[10px] font-mono tracking-wider font-semibold uppercase">
                        Active 24/7/366
                      </span>
                    </div>

                    {/* Preselected interest status if any */}
                    {diagnosticInterest && (
                      <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center justify-between">
                        <span>Selected Treatment Interest: <strong>{diagnosticInterest}</strong></span>
                        <button 
                          type="button" 
                          onClick={() => {
                            setDiagnosticInterest(''); 
                            setFormData(prev => ({...prev, notes: ''}));
                          }} 
                          className="text-white hover:text-red-400 font-bold cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    {/* Full Name & Contact details */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">{t.diagnoseSection.lblFullName}</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                            <User className="w-4 h-4" />
                          </span>
                          <input 
                            type="text" 
                            name="fullName"
                            required
                            placeholder="e.g. Giovanni Bianchi / Hans Müller"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-3 py-2.5 rounded bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-amber-500 transition-colors text-sm text-white focus:outline-none placeholder-slate-600"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">{t.diagnoseSection.lblCountry}</label>
                        <select 
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 rounded bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-amber-500 transition-colors text-sm text-white focus:outline-none cursor-pointer"
                        >
                          <option value="Italy">{t.diagnoseSection.optItaly}</option>
                          <option value="Slovenia">{t.diagnoseSection.optSlovenia}</option>
                          <option value="Croatia">{t.diagnoseSection.optCroatia}</option>
                          <option value="Austria">{t.diagnoseSection.optAustria}</option>
                          <option value="Germany">{t.diagnoseSection.optGermany}</option>
                          <option value="Other">{t.diagnoseSection.optOther}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">{t.diagnoseSection.lblPhone}</label>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          placeholder="e.g. +39 333 1234567 / +43 664..."
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 rounded bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-amber-500 transition-colors text-sm text-white focus:outline-none placeholder-slate-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          placeholder="e.g. name@domain.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 rounded bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-amber-500 transition-colors text-sm text-white focus:outline-none placeholder-slate-600"
                        />
                      </div>
                    </div>

                    {/* Dental condition select */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">{t.diagnoseSection.lblStatus}</label>
                      <select 
                        name="dentalState"
                        value={formData.dentalState}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 rounded bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-amber-500 transition-colors text-sm text-white cursor-pointer"
                      >
                        <option value="Severe tooth damage / All missing">{t.diagnoseSection.optState1}</option>
                        <option value="Missing several teeth / Bridges required">{t.diagnoseSection.optState2}</option>
                        <option value="Old loose dentures need fixed upgrade">{t.diagnoseSection.optState3}</option>
                        <option value="Advanced bone loss / Sinus lift doubt">{t.diagnoseSection.optState4}</option>
                      </select>
                    </div>

                    {/* DRAG AND DROP HIGH-TECH MEDICAL FILE UPLOADER */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold flex items-center justify-between">
                        <span>{t.diagnoseSection.lblHaveScan}</span>
                        <span className="text-amber-500 text-[9px] uppercase font-bold">Fast-Tracks Diagnosis</span>
                      </label>

                      <div 
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-5 text-center transition-all ${
                          dragActive 
                            ? 'border-amber-500 bg-slate-900' 
                            : xrayFile 
                              ? 'border-green-500/60 bg-slate-950/60' 
                              : 'border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900/60'
                        }`}
                      >
                        <input 
                          type="file" 
                          id="file-upload-input"
                          onChange={handleFileChange}
                          accept=".png,.jpg,.jpeg,.pdf,.dicom,.zip"
                          className="hidden" 
                        />
                        
                        {xrayFile ? (
                          <div className="space-y-2 animate-fade-in">
                            <span className="text-2xl text-green-500">✔</span>
                            <p className="text-xs font-semibold text-white truncate max-w-xs mx-auto">
                              {xrayFile.name} ({(xrayFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </p>
                            
                            {isUploading ? (
                              <div className="space-y-1 max-w-xs mx-auto">
                                <div className="h-1 w-full bg-slate-800 rounded overflow-hidden">
                                  <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono block">Extracting bone parameters... {uploadProgress}%</span>
                              </div>
                            ) : (
                              <span className="text-[10px] text-green-400 font-mono block">Jaw data mapped and locked! Ready to transmit.</span>
                            )}
                          </div>
                        ) : (
                          <label htmlFor="file-upload-input" className="cursor-pointer block space-y-2">
                            <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                              <FileUp className="w-5 h-5 text-amber-500" />
                            </div>
                            <span className="text-xs text-slate-300 block">
                              {dentalLanguage === 'DE' ? 'Ziehen Sie Ihre Röntgenbilder per Drag & Drop hierhin oder klicken Sie zum ' :
                               dentalLanguage === 'IT' ? 'Trascina e rilascia la tua radiografia qui, oppure ' :
                               dentalLanguage === 'SL' ? 'Prerazporedite svojo datoteko sem ali kliknite ' :
                               'Drag and drop your dental X-Ray or image files, or '}
                              <span className="text-amber-500 font-bold underline">
                                {dentalLanguage === 'DE' ? 'Durchsuchen' :
                                 dentalLanguage === 'IT' ? 'Sfoglia file' :
                                 dentalLanguage === 'SL' ? 'Prebrskaj' :
                                 'Browse files'}
                              </span>
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono block">Supported formats: JPG, PNG, PDF, DICOM, ZIP up to 50MB</span>
                          </label>
                        )}

                      </div>
                    </div>

                    {/* Preferred contact medium selection */}
                    <div className="grid sm:grid-cols-3 gap-2 py-1">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold block sm:col-span-3 font-semibold">
                        {t.diagnoseSection.lblPreferredContact}
                      </div>
                      
                      {['whatsapp', 'phone', 'email'].map((medium) => (
                        <button
                          key={medium}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, preferredContact: medium as any }))}
                          className={`px-3 py-2 text-xs font-mono uppercase rounded border font-semibold transition-all cursor-pointer ${
                            formData.preferredContact === medium 
                              ? 'bg-indigo-950 border-amber-500/60 text-amber-500' 
                              : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white hover:bg-slate-900'
                          }`}
                        >
                          {medium === 'whatsapp' ? '🟢 WhatsApp' : medium === 'phone' ? '📞 Call Me' : '✉ Email'}
                        </button>
                      ))}
                    </div>

                    {/* Any specific dental notes */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">{t.diagnoseSection.lblNotes}</label>
                      <textarea 
                        name="notes"
                        rows={2}
                        placeholder={
                          dentalLanguage === 'DE' ? 'z.B. Ich leide unter starkem Knochenschwund und habe Angst vor Schmerzen...' :
                          dentalLanguage === 'IT' ? 'es. Ho fobia dei dentisti, vorrei informazioni sulla sedazione crepuscolare...' :
                          dentalLanguage === 'SL' ? 'npr. Imam hud strah pred zobozdravnikom, želim več informacij o sedaciji...' :
                          'e.g. Looking for dental price packages under conscious sedation.'
                        }
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-850 hover:border-slate-800 text-xs text-white focus:outline-none placeholder-slate-600"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitLoading}
                      className="w-full py-4 rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-semibold uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitLoading ? (
                        <span>{t.diagnoseSection.btnSubmitting}</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.diagnoseSection.btnSubmit}</span>
                        </>
                      )}
                    </button>

                    {/* Safe lock banner */}
                    <p className="text-[10px] text-slate-500 text-center font-mono leading-normal">
                      By submitting you request a remote expert diagnostic evaluation by Dr. Surina. Privacy fully protected under European GDPR regulations.
                    </p>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DETAILED ACCORDION FAQ CLINICAL MATRIX */}
      <section id="faqs" className="bg-[#f7f4eb] py-20 border-t border-b border-[#e5dac1]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-2 mb-12">
            <span className="text-amber-600 font-mono text-xs uppercase tracking-widest block font-bold">Scientific Transparency</span>
            <h3 className="font-serif text-3xl font-bold text-slate-950">Clinical and Financial FAQ Matrix</h3>
            <p className="text-slate-700 text-sm">Clear, objective answers on pain management, materials technology, warranties and cross-border logistics.</p>
          </div>

          <div className="space-y-4">
            {DENTAL_FAQS.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={i} className="rounded-xl bg-slate-900 border border-slate-850 overflow-hidden transition-all">
                  
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 text-white hover:text-amber-550 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold leading-tight">
                      {faq.question}
                    </span>
                    <span className="text-amber-500 font-mono font-bold text-lg shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-850/40 pt-4 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Quick contact trigger banner */}
          <div className="mt-12 text-center p-6 bg-slate-900 rounded-xl border border-slate-800 space-y-4 max-w-2xl mx-auto">
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Have a highly specific dental concern? Ask about complex medical situations, bone volumes, sinus lifts, or travel quotes directly from our expert AI chat helper.
            </p>
            <button
              onClick={() => triggerAssistantWithPrompt("Hi, I want to ask about my personal dental situation regarding severe bone loss.", "EN")}
              className="px-6 py-2 rounded bg-indigo-950/60 hover:bg-slate-950 border border-amber-500/40 text-amber-500 font-mono font-bold uppercase text-xs transition-colors"
            >
              Ask Private Case Inquiry
            </button>
          </div>

        </div>
      </section>

      {/* FLOATING AND INLINE MULTILINGUAL CHATBOT ENGINE */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-5 md:p-6 rounded-full bg-gradient-to-tr from-amber-500 via-amber-550 to-amber-600 hover:from-amber-400 hover:to-amber-550 text-slate-950 shadow-2xl border border-amber-400/20 shadow-amber-500/10 cursor-pointer transition-all duration-300 ease-out select-none scale-100 hover:scale-112 hover:shadow-amber-500/25 active:scale-95"
        style={{ display: isChatOpen ? 'none' : 'flex' }}
        title="Chat with virtual dentist coordinator"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-7 h-7 md:w-8 md:h-8" />
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse border-2 border-slate-950"></span>
        </div>
      </button>

      {/* Floating Chat Panel widget */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[94vw] sm:w-[460px] h-[640px] max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-3xl overflow-hidden flex flex-col justify-between animate-fade-in select-none">
          
          {/* Chat Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-serif text-slate-950 font-bold text-base shadow-inner">
                ZS
              </div>
              <div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-white leading-none">ZS Virtual Medical Assistant</h4>
                <div className="flex items-center gap-1.5 mt-1 leading-none">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Surina Expert System</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[10px] text-slate-500 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">EN / IT / SL</span>
              <button 
                onClick={() => setIsChatOpen(false)} 
                className="p-1.5 hover:bg-slate-900 rounded-md text-slate-450 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Language Selection row */}
          <div className="bg-slate-950/40 p-2.5 border-b border-indigo-950/30 flex gap-2 items-center justify-between">
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-medium">Select Language:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setDentalLanguage('EN');
                  setChatMessages(prev => [...prev, {
                    id: `lang_change_${Date.now()}`,
                    sender: 'bot',
                    text: "Switched to English support! How can I assist with your All-on-4 dental implant or conscious IV sedation inquiries today?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }]);
                }} 
                className={`px-2.5 py-1 rounded text-[10.5px] font-mono font-bold border cursor-pointer transition-all ${
                  dentalLanguage === 'EN' ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                🇬🇧 EN
              </button>
              <button 
                onClick={() => {
                  setDentalLanguage('IT');
                  setChatMessages(prev => [...prev, {
                    id: `lang_change_${Date.now()}`,
                    sender: 'bot',
                    text: "Supporto in Italiano attivato! Chiedimi pure spiegazioni sui nostri impianti svizzeri Straumann, la sedazione cosciente indolore, e il trasporto gratuito assistito da Trieste.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }]);
                }} 
                className={`px-2.5 py-1 rounded text-[10.5px] font-mono font-bold border cursor-pointer transition-all ${
                  dentalLanguage === 'IT' ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                🇮🇹 IT
              </button>
              <button 
                onClick={() => {
                  setDentalLanguage('SL');
                  setChatMessages(prev => [...prev, {
                    id: `lang_change_${Date.now()}`,
                    sender: 'bot',
                    text: "Slovenska podpora aktivirana! Vprašajte nas karkoli o naših All-on-4 zobnih vsadkih, brezbolečinskem zdravljenju v sedaciji in cenovnih paketih.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }]);
                }} 
                className={`px-2.5 py-1 rounded text-[10.5px] font-mono font-bold border cursor-pointer transition-all ${
                  dentalLanguage === 'SL' ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                🇸🇮 SL
              </button>
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 p-4.5 overflow-y-auto space-y-4 bg-slate-900/40">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 ${
                    isUser 
                      ? 'bg-amber-500 text-slate-950 rounded-tr-none text-sm font-semibold font-sans shadow-md' 
                      : 'bg-slate-950 text-slate-200 rounded-tl-none border border-slate-850 text-sm leading-relaxed space-y-1.5 font-sans'
                  }`}>
                    
                    {/* Multiline copy formatter */}
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </div>

                    <span className={`block text-[8.5px] font-mono mt-1 pr-1 ${isUser ? 'text-slate-800 text-right' : 'text-slate-500'}`}>
                      {msg.timestamp}
                    </span>

                  </div>
                </div>
              );
            })}

            {isBotTyping && (
              <div className="flex justify-start items-center gap-2.5">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 rounded-tl-none text-xs flex gap-1">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Surgical bot analyzing bone structure...</span>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Chat Quick Prompts */}
          <div className="p-2.5 border-t border-slate-850/60 bg-slate-950/20 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-thin">
            <button 
              onClick={() => handleSendMessage(dentalLanguage === 'IT' ? "Quali sono i prezzi per All-on-4 rispetto all'Italia?" : "How much do All-on-4 implants cost?")}
              className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-slate-300 hover:text-amber-500 cursor-pointer transition-colors"
            >
              💰 {dentalLanguage === 'IT' ? 'Prezzi vs Italia' : 'Implant Costs?'}
            </button>
            <button 
              onClick={() => handleSendMessage(dentalLanguage === 'IT' ? "La sedazione cosciente fa sentire dolore?" : "Is conscious sedation completely painless?")}
              className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-slate-300 hover:text-amber-500 cursor-pointer transition-colors"
            >
              💤 {dentalLanguage === 'IT' ? 'Dolore e Sedazione' : 'Conscious Sedation Pain?'}
            </button>
            <button 
              onClick={() => handleSendMessage(dentalLanguage === 'IT' ? "Come posso avere una consultazione virtuale gratuita?" : "How can I book a free remote CBCT diagnostic?")}
              className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-slate-300 hover:text-amber-500 cursor-pointer transition-colors"
            >
              📋 {dentalLanguage === 'IT' ? 'Consulenza virtuale gratis' : 'Free Virtual Scan?'}
            </button>
          </div>

          {/* Input Panel */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-850 flex gap-2.5">
            <input 
              type="text" 
              placeholder={dentalLanguage === 'IT' ? "Chiedi informazioni sulla clinica..." : "Type custom clinical question here..."}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
            <button 
              onClick={() => handleSendMessage()}
              className="p-3 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 cursor-pointer transition-all shadow-md active:scale-95"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>
      )}

      {/* FOOTER SECTION */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400 text-xs select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-serif text-slate-950 font-bold text-sm">ZS</div>
              <span className="font-serif text-base font-bold text-white leading-none">Zobozdravstvo Surina</span>
            </div>
            <p className="leading-relaxed text-slate-500">
              Gold standard painless immediate loading implants. Combining Swiss biological Straumann implants with certified conscious sedation at Slovenian optimized price configurations.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-green-500 font-mono font-bold uppercase tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Official Straumann Partner
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider">High Ticket dental specialties</h5>
            <ul className="space-y-2 font-medium">
              <li><a href="#allon4" className="hover:text-amber-500 transition-colors">Immediate Load All-on-4 System</a></li>
              <li><a href="#allon4" className="hover:text-amber-500 transition-colors">Immediate Load All-on-6 fixed</a></li>
              <li><a href="#technology" className="hover:text-amber-500 transition-colors">Conscious Sedation Protocol</a></li>
              <li><a href="#about" className="hover:text-amber-500 transition-colors">Digital Implantology (3D CBCT)</a></li>
              <li><a href="#about" className="hover:text-amber-500 transition-colors">Trios intraoral digital scanners</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Crossborder Logistics & Transit</h5>
            <ul className="space-y-2 text-slate-450 leading-relaxed font-mono">
              <li>🏁 Slovenia borders (Trieste region / Zagreb)</li>
              <li>🚙 Chauffeured private transit pickups</li>
              <li>🏨 Complimentary VIP hotel logistics coordination</li>
              <li>🗣 Native Italian, Slovenian, and English spoken</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-4 font-mono">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider font-sans">Dental Clinic Office</h5>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Bazoviška cesta 32, 6250 Ilirska Bistrica, Slovenia</span>
              </p>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="flex flex-col">
                  <a href="tel:+38641614746" className="hover:text-amber-500 transition-colors">+386 41 614 746 (GSM)</a>
                  <a href="tel:+38657141403" className="hover:text-amber-500 transition-colors">+386 5 714 14 03 (Ordinacija)</a>
                </span>
              </div>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:info@zobozdravstvosurina.si" className="hover:text-amber-500 transition-colors">info@zobozdravstvosurina.si</a>
              </p>
            </div>
          </div>

        </div>

        {/* Legal credentials row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 text-center text-[10px] text-slate-600 space-y-2">
          <p>© 2026 Zobozdravstvo Surina d.o.o. All Rights Reserved. Director: M.sc. Dr. Uroš Surina. Professional registration files managed under Slovenian Medical Chamber rules.</p>
          <div className="flex justify-center gap-4 text-slate-500 font-mono">
            <a href="#faqs" className="hover:underline">Legal Guarantee Terms</a>
            <span>•</span>
            <a href="#faqs" className="hover:underline">HIPAA / GDPR Health Encryption</a>
            <span>•</span>
            <a href="#faqs" className="hover:underline">Dental Chamber Slovenia</a>
          </div>
        </div>

      </footer>

    </div>
  );
}
