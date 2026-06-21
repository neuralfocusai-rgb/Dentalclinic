export interface TranslationSchema {
  banner: string;
  swissStraumann: string;
  nav: {
    specialists: string;
    technology: string;
    allon4: string;
    journey: string;
    testimonials: string;
    faq: string;
  };
  headerSupport: string;
  scanReviewButton: string;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    experience: string;
    experienceSub: string;
    implantsPlural: string;
    implantsPluralSub: string;
    satisfaction: string;
    satisfactionSub: string;
  };
  features: {
    sedationTitle: string;
    sedationDesc: string;
    computerTitle: string;
    computerDesc: string;
    qualityTitle: string;
    qualityDesc: string;
    sedationLearn: string;
    computerLearn: string;
    qualityLearn: string;
  };
  specialistsSection: {
    title: string;
    subtitle: string;
    yearsExp: string;
    awardsBadge: string;
    drLucianoBio: string;
    drUrosBio: string;
    gradGerman: string;
    placedImplants: string;
  };
  journeySection: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step1Point1: string;
    step1Point2: string;
    step1Point3: string;
    step2Title: string;
    step2Desc: string;
    step2Point1: string;
    step2Point2: string;
    step2Point3: string;
    step3Title: string;
    step3Desc: string;
    step3Point1: string;
    step3Point2: string;
  };
  diagnoseSection: {
    title: string;
    subtitle: string;
    formTitle: string;
    formSub: string;
    lblFullName: string;
    lblPhone: string;
    lblCountry: string;
    lblStatus: string;
    lblHaveScan: string;
    lblNotes: string;
    optItaly: string;
    optSlovenia: string;
    optAustria: string;
    optCroatia: string;
    optGermany: string;
    optOther: string;
    optState1: string;
    optState2: string;
    optState3: string;
    optState4: string;
    lblPreferredContact: string;
    btnSubmit: string;
    btnSubmitting: string;
    successTitle: string;
    successDesc: string;
    hipaaSecure: string;
  };
  faqSection: {
    title: string;
    subtitle: string;
  };
  chatPrompt: {
    title: string;
    onlineText: string;
    selectLanguage: string;
    placeholder: string;
    prompt1: string;
    prompt1Text: string;
    prompt2: string;
    prompt2Text: string;
    prompt3: string;
    prompt3Text: string;
    welcomeMsg: string;
    langBadge: string;
  };
}

export const TRANSLATIONS: Record<'EN' | 'IT' | 'SL' | 'DE', TranslationSchema> = {
  EN: {
    banner: "CROSSBORDER DENTAL EXCELLENCE: Serving Patients from Italy 🇮🇹, Austria 🇦🇹, Germany 🇩🇪, Slovenia 🇸🇮",
    swissStraumann: "100% Guaranteed Swiss Straumann® Systems",
    nav: {
      specialists: "Elite Specialists",
      technology: "Technology",
      allon4: "All-on-4 / All-on-6",
      journey: "Patient Journey",
      testimonials: "Success Stories",
      faq: "Clinical FAQ"
    },
    headerSupport: "EN / IT / DE Support",
    scanReviewButton: "Free Dental Scan Review",
    hero: {
      badge: "ELITE CLINICAL PRACTICE SINCE 1991",
      title: "German-Precision Oral Surgery, Swiss Materials",
      subtitle: "Skip expensive dental fees in Western Europe. Under comfortable conscious sedation, receive permanent immediate-load restorations by certified German-educated master surgeons.",
      ctaPrimary: "Free Virtual Diagnostics",
      ctaSecondary: "Consult Virtual Assistant",
      experience: "35+ Years",
      experienceSub: "Gold-Standard Dental Care",
      implantsPlural: "15,000+",
      implantsPluralSub: "Implants Placed",
      satisfaction: "99.8%",
      satisfactionSub: "Clinical Success Rate"
    },
    features: {
      sedationTitle: "Conscious IV Sedation",
      sedationDesc: "Administered by board-certified anesthesiologists, safe twilight sedation eliminates pain and anxiety. Sleep peacefully and wake up with a new smile.",
      computerTitle: "Computer-Guided Positioning",
      computerDesc: "Custom surgical templates manufactured using 3D laser scanners and micron-level software ensure absolute surgical precision.",
      qualityTitle: "Straumann® Life Guarantee",
      qualityDesc: "We use genuine Swiss Straumann premium titanium implants with an official lifetime warranty and certified Implant Passport.",
      sedationLearn: "Is conscious sedation completely painless?",
      computerLearn: "How does computer-guided implantology work?",
      qualityLearn: "Why choose Straumann implants over budget alternatives?"
    },
    specialistsSection: {
      title: "Surgical Team Overseeing Your Restorations",
      subtitle: "Meet our master surgeons who personally design your custom treatment path, connecting decades of artistry and academic clinical research.",
      yearsExp: "Years clinical experience building excellence",
      awardsBadge: "Certified Implantology Clinic",
      drLucianoBio: "With 35 years of clinical practice, Dr. Lučiano Surina has pioneered seamless implant-supported restoration techniques. He is widely recognized for his precision and deep understanding of patient facial geometry, designing crowns and bridges that look indistinguishable from natural teeth.",
      drUrosBio: "Dr. Uroš Surina stands at the cutting edge of digital implantology. Since obtaining his clinical Master of Science in Germany, he has successfully performed over 10,000 implants. His expertise is concentrated in difficult cases involving extreme bone loss, sinus lifts, and painless immediate full-arch restorations.",
      gradGerman: "Master of Science in Implantology, IMC Münster (German honors)",
      placedImplants: "placed over 10,000 implants successfully"
    },
    journeySection: {
      title: "Your 3-Step Smile Recovery Journey",
      subtitle: "We coordinate free chauffeured travel from the border checkpoints, lodging arrangements, and immediate digital scans so you can smile comfortably.",
      step1Title: "Virtual Consultation & X-Ray Review",
      step1Desc: "You submit your digital teeth X-ray or 3D digital CBCT scan files. Overseen by Dr. Uroš, our surgical team evaluates your digital bone layers.",
      step1Point1: "Evaluation completely free of cost within 24 hours",
      step1Point2: "Written treatment proposal detailing clinic materials",
      step1Point3: "Virtual audio/video consultation with specialist team",
      step2Title: "Same-Day Computer-Guided Implants",
      step2Desc: "You arrive at our state-of-the-art clinic. Under calm twilight conscious sedation, our computer-guided templates placement is initiated.",
      step2Point1: "Intravenous sleep states managed safely by anesthesiologists",
      step2Point2: "Surgical placement of 4 or 6 Straumann Swiss implants",
      step2Point3: "3D camera scan replaces standard mouth compound molds",
      step3Title: "Walk Out Smiling Within 48 Hours",
      step3Desc: "A highly aesthetic custom-milled fixed bridge is locked onto your implants. Enjoy full chewing, natural look, and absolute stability immediately.",
      step3Point1: "Same-day immediate-loading provisional teeth",
      step3Point2: "Lifetime component warranty and certified Implant Passport"
    },
    diagnoseSection: {
      title: "Submit Jawbone Scans for Free Medical Review",
      subtitle: "Our surgical team will analyze your teeth scans remotely, publishing an expert clinical plan and pricing proposal with zero initial obligation.",
      formTitle: "Teeth Diagnostic Portal",
      formSub: "Submit files or tell us your dental situation to receive a personalized quote",
      lblFullName: "Your Full Name",
      lblPhone: "WhatsApp / Phone Number",
      lblCountry: "Country of Residence",
      lblStatus: "My Current Dental Condition",
      lblHaveScan: "Do you have a panoramic X-Ray or 3D CBCT scan?",
      lblNotes: "Clinical Notes & Special Requests",
      optItaly: "Italy (Veneto / Trieste / Other)",
      optSlovenia: "Slovenia (Ljubljana / coastal / Other)",
      optAustria: "Austria (Kärnten / Steiermark / Vienna)",
      optCroatia: "Croatia (Zagreb / Rijeka / Other)",
      optGermany: "Germany",
      optOther: "Other Country",
      optState1: "Severe teeth damage / Missing multiple teeth",
      optState2: "Entire jaw missing teeth / Wearing removable dentures",
      optState3: "Single missing tooth needing single implant",
      optState4: "General query / Consultation about sedation",
      lblPreferredContact: "Preferred Contact Channel",
      btnSubmit: "Submit Scan for Dr. Surina's Review",
      btnSubmitting: "Securing Dental Connection...",
      successTitle: "Proposal Request Locked In!",
      successDesc: "Thank you. Your records have been securely routed. Dr. Uroš Surina's surgical team will review your files and contact you shortly.",
      hipaaSecure: "SECURE HIPAA & EU GDPR ENCRYPTED HEALTH PORTAL"
    },
    faqSection: {
      title: "Frequently Asked Clinical Inquiries",
      subtitle: "Transparent medical answers directly from our leading surgeons on sedation, dental implants, and our specialized 48-hour recovery protocols."
    },
    chatPrompt: {
      title: "Dr. Surina's Assistant",
      onlineText: "Clinical Support • Online",
      selectLanguage: "Language / Lingua:",
      placeholder: "Ask clinical questions here...",
      prompt1: "💰 Implant Costs?",
      prompt1Text: "How much do All-on-4 implants cost?",
      prompt2: "💤 Sedation Painless?",
      prompt2Text: "Is conscious sedation completely painless?",
      prompt3: "📋 Free Virtual Scan?",
      prompt3Text: "How can I book a free remote CBCT diagnostic?",
      welcomeMsg: "Hello! I am Dr. Surina's Virtual Medical Assistant. We specialize in immediate All-on-4 dental implants, 100% conscious sedation, and Straumann implants. How can I assist you?",
      langBadge: "EN / IT / SL / DE"
    }
  },
  IT: {
    banner: "ECCELLENZA DENTALE TRANSFRONTALIERA: Pazienti da Italia 🇮🇹, Austria 🇦🇹, Germania 🇩🇪, Slovenia 🇸🇮",
    swissStraumann: "Sistemi Svizzeri Straumann® Garantiti al 105%",
    nav: {
      specialists: "Specialisti Elite",
      technology: "Tecnologia",
      allon4: "All-on-4 / All-on-6",
      journey: "Percorso Paziente",
      testimonials: "Storie di Successo",
      faq: "FAQ Cliniche"
    },
    headerSupport: "Supporto EN / IT / DE",
    scanReviewButton: "Recensione Radiografia Gratis",
    hero: {
      badge: "PRATICA CLINICA ELITE DAL 1991",
      title: "Chirurgia di Precisione Tedesca, Materiali Svizzeri",
      subtitle: "Evita i costi esorbitanti delle cliniche in Italia. Sotto sedazione cosciente, ricevi restauri fissi a carico immediato eseguiti da chirurghi formati in Germania.",
      ctaPrimary: "Diagnosi Virtuale Gratuita",
      ctaSecondary: "Consulta Assistente Virtuale",
      experience: "35+ Anni",
      experienceSub: "Cura Dentale di Standard d'Oro",
      implantsPlural: "15.000+",
      implantsPluralSub: "Impianti Posizionati",
      satisfaction: "99.8%",
      satisfactionSub: "Tasso di Successo Clinico"
    },
    features: {
      sedationTitle: "Sedazione Coscente Endovenosa",
      sedationDesc: "Gestita da anestesisti certificati, elimina dolore e ansia. Dormi serenamente e ti svegli con un sorriso nuovo, ideale per chi ha fobia dentale.",
      computerTitle: "Posizionamento Guidato al Laser",
      computerDesc: "Dime chirurgiche personalizzate con scanner intraorali 3D e software micrometrico garantiscono precisione assoluta.",
      qualityTitle: "Garanzia a Vita Straumann®",
      qualityDesc: "Utilizziamo esclusivamente impianti premium svizzeri in titanio Straumann con passaporto implantare e garanzia a vita.",
      sedationLearn: "La sedazione cosciente fa sentire dolore?",
      computerLearn: "Come funziona l'implantologia guidata da computer?",
      qualityLearn: "Perché scegliere Straumann rispetto ad alternative economiche?"
    },
    specialistsSection: {
      title: "L'Equipe Medica Responsabile del Tuo Sorriso",
      subtitle: "Incontra i chirurghi che progetteranno personalmente il tuo piano clinico, unendo decenni di esperienza artistica e ricerca accademica.",
      yearsExp: "Anni di esperienza clinica nel costruire eccellenza",
      awardsBadge: "Clinica di Implantologia Certificata",
      drLucianoBio: "Con 35 anni di pratica clinica, il Dr. Lučiano Surina ha aperto la strada a tecniche di restauro implantosupportate senza cuciture. È ampiamente riconosciuto per la sua precisione e profonda comprensione della geometria facciale del paziente, progettando corone e ponti indistinguibili dai denti naturali.",
      drUrosBio: "Il Dr. Uroš Surina è all'avanguardia dell'implantologia digitale. Dopo aver conseguito il Master of Science in Implantologia in Germania, ha eseguito con successo oltre 10.000 impianti. È specializzato in casi complessi di perdita ossea, rialzo del seno mascellare e carichi immediati indolori.",
      gradGerman: "Master of Science in Implantologia, IMC Münster (Onorificenza Tedesca)",
      placedImplants: "oltre 10.000 impianti inseriti con successo"
    },
    journeySection: {
      title: "Il Tuo Percorso in 3 Fasi Verso il Nuovo Sorriso",
      subtitle: "Organizziamo il trasporto gratuito con conducente dal confine di Trieste, alloggio in hotel e radiografie digitali immediate per la massima comodità.",
      step1Title: "Consultazione Virtuale e Studio Radiografico",
      step1Desc: "Invia la tua radiografia panoramica o TAC CBCT 3D. Il nostro team, supervisionato dal Dr. Uroš, valuta gratuitamente lo spessore osseo.",
      step1Point1: "Valutazione completamente gratuita entro 24 ore",
      step1Point2: "Preventivo scritto trasparente senza costi nascosti",
      step1Point3: "Consulto telefonico o video con il coordinatore clinico",
      step2Title: "Inserimento Impianti e Sedazione Coscente",
      step2Desc: "Arrivi in clinica. In una sola seduta indolore, sotto sedazione cosciente gestita dall'anestesista, posizioniamo gli impianti con guida computerizzata.",
      step2Point1: "Sonno crepuscolare rilassante e monitoraggio continuo",
      step2Point2: "Inserimento di 4 o 6 impianti Straumann svizzeri di alta gamma",
      step2Point3: "Scanner laser 3D che evita la pasta da impronta fastidiosa",
      step3Title: "Nuovo Sorriso Fisso Entro 48 Ore",
      step3Desc: "Avvitiamo una protesi fissa personalizzata sugli impianti. Ripristini la masticazione immediata e l'estetica ideale senza fastidiosi vuoti.",
      step3Point1: "Denti provvisori fissi caricate lo stesso giorno",
      step3Point2: "Certificato di garanzia ufficiale e Passaporto dell'Impianto"
    },
    diagnoseSection: {
      title: "Invia la Tua Radiografia per una Valutazione Gratis",
      subtitle: "Il nostro team esaminerà i tuoi file a distanza, inviando un piano clinico personalizzato e un preventivo chiaro senza impegno.",
      formTitle: "Portale Diagnostico",
      formSub: "Carica la panoramica o descrivi la tua situazione per ricevere il preventivo",
      lblFullName: "Nome e Cognome",
      lblPhone: "Numero di Telefono / WhatsApp",
      lblCountry: "Paese di Residenza",
      lblNotes: "Note Cliniche o Richieste Speciali",
      lblStatus: "La Mia Situazione Dentale Corrente",
      lblHaveScan: "Hai una radiografia panoramica o TAC 3D?",
      optItaly: "Italia (Trieste / Veneto / Altro)",
      optSlovenia: "Slovenia",
      optAustria: "Austria",
      optCroatia: "Croazia",
      optGermany: "Germania",
      optOther: "Altro Paese",
      optState1: "Grave danno ai denti / Mancano molti denti",
      optState2: "Senza denti / Porto la dentiera mobile",
      optState3: "Manca un dente singolo / Ho bisogno di un impianto",
      optState4: "Richiesta generale / Informazioni sulla sedazione",
      lblPreferredContact: "Canale di Contatto Preferito",
      btnSubmit: "Invia per la Valutazione del Dr. Surina",
      btnSubmitting: "Trasmissione Sicura della Radiografia...",
      successTitle: "Richiesta Trasmessa con Successo!",
      successDesc: "Grazie. I tuoi dati sono protetti da cifratura. Il team del Dr. Uroš Surina esaminerà la documentazione e ti risponderà entro 12 ore.",
      hipaaSecure: "PORTALE SANITARIO PROTETTO CON CIFRATURA HIPAA E GDPR"
    },
    faqSection: {
      title: "Domande Cliniche Frequenti",
      subtitle: "Risposte mediche trasparenti direttamente dai nostri chirurghi su sedazione cosciente, materiali svizzeri e protocolli di carico immediato."
    },
    chatPrompt: {
      title: "Assistente del Dr. Surina",
      onlineText: "Supporto Clinico • Online",
      selectLanguage: "Seleziona Lingua:",
      placeholder: "Chiedi informazioni sulla clinica...",
      prompt1: "💰 Prezzi vs Italia",
      prompt1Text: "Quali sono i prezzi per All-on-4 rispetto all'Italia?",
      prompt2: "💤 Dolore e Sedazione",
      prompt2Text: "La sedazione cosciente fa sentire dolore?",
      prompt3: "📋 Consulenza Gratis",
      prompt3Text: "Come posso avere una consultazione virtuale gratuita?",
      welcomeMsg: "Buongiorno! Sono l'Assistente Virtuale della Clinica del Dr. Surina. Siamo specializzati in impianti svizzeri Straumann All-on-4 e sedazione cosciente senza dolore. Come posso aiutarti?",
      langBadge: "EN / IT / SL / DE"
    }
  },
  SL: {
    banner: "ČEZMEJNA DENTALNA ODLIČNOST: Pacienti iz Italije 🇮🇹, Avstrije 🇦🇹, Nemčije 🇩🇪, Slovenije 🇸🇮",
    swissStraumann: "100% Zajamčeni Švicarski Sistemi Straumann®",
    nav: {
      specialists: "Vrhunski Strokovnjaki",
      technology: "Tehnologija",
      allon4: "All-on-4 / All-on-6",
      journey: "Pot Pacienta",
      testimonials: "Zgodbe o Uspehu",
      faq: "Klinična FAQ"
    },
    headerSupport: "Podpora EN / IT / DE",
    scanReviewButton: "Brezplačen Pregled Slike",
    hero: {
      badge: "ELITNA KLINIČNA PRAKSA OD LETA 1991",
      title: "Nemška Kirurška Natančnost, Švicarski Materiali",
      subtitle: "Izognite se dragim storitvam. V varni zavestni sedaciji prejmete fiksne zobe na vsadkih v 48 urah, ki jih namestijo strokovnjaki s klinike v Nemčiji.",
      ctaPrimary: "Brezplačen Pregled Slike",
      ctaSecondary: "Svetovalni Klepetalnik",
      experience: "35+ Let",
      experienceSub: "Zlati Standard Zobozdravstva",
      implantsPlural: "15.000+",
      implantsPluralSub: "Vstavljenih Vsadkov",
      satisfaction: "99.8%",
      satisfactionSub: "Uspešnost Posegov"
    },
    features: {
      sedationTitle: "Zavestna Crepuscolarna Sedacija",
      sedationDesc: "Pod nadzorom izkušenih anesteziologov varno odpravimo ves strah in bolečino. Spite povsem sproščeno in se zbudite z novim nasmehom.",
      computerTitle: "Računalniško Vodena Implantacija",
      computerDesc: "Z individualno načrtovanimi kirurškimi šablonami na podlagi 3D intraoralnega skenerja dosežemo mikronsko natančnost vstavljanja.",
      qualityTitle: "Doživljenjska Garancija Straumann®",
      qualityDesc: "Uporabljamo izključno vrhunske švicarske implantate Straumann z uradno doživljenjsko garancijo in certifikacijskim potnim listom.",
      sedationLearn: "Ali je zdravljenje z zavestno sedacijo popolnoma neboleče?",
      computerLearn: "Kako deluje računalniško vodena implantologija?",
      qualityLearn: "Zakaj izbrati Straumann namesto cenejših znamk?"
    },
    specialistsSection: {
      title: "Kirurška Ekipa, ki Skrbi za Vaš Nov Nasmeh",
      subtitle: "Spoznajte naša strokovnjaka, ki osebno načrtujeta vašo klinično obravnavo ob uporabi več desetletij izkušenj in akademskega znanja.",
      yearsExp: "Let kliničnih izkušenj za vrhunsko oskrbo",
      awardsBadge: "Certificirana Implantološka Klinika",
      drLucianoBio: "Z več kot 35 leti klinične prakse je Dr. Lučiano Surina pionir na področju protetične oskrbe na vsadkih. Priznan je po svoji izjemni natančnosti in občutku za estetiko, s katerim ustvarja zobe, ki so povsem naravnega videza.",
      drUrosBio: "Dr. Uroš Surina je vodilni slovenski strokovnjak za digitalno implantologijo. Po opravljenem znanstvenem magisteriju (M.sc.) iz implantologije v Nemčiji je uspešno vstavil že več kot 10.000 vsadkov. Specializiran je za zapletene rekonstrukcije kosti.",
      gradGerman: "Magister znanosti iz implantologije, IMC Münster (Nemčija, z odliko)",
      placedImplants: "uspešno vstavljenih več kot 10.000 zobnih vsadkov"
    },
    journeySection: {
      title: "Vaša Pot do Novega Nasmeha v 3 Korakih",
      subtitle: "Nudimo brezplačen prevoz z našim vozilom od meje s Trstom, pomoč pri nastanitvi v hotelu in takojšnjo 3D diagnostiko.",
      step1Title: "Brezplačen Pregled Slike in Načrt",
      step1Desc: "Pošljete nam lokalno rentgensko sliko (ortopan) ali 3D CBCT posnetek. Naša ekipa pod vodstvom Dr. Uroša opravi natančno diagnozo kostne strukture.",
      step1Point1: "Popolnoma brezplačna ocena v roku 24 ur",
      step1Point2: "Pregleden pisni načrt brez skritih stroškov",
      step1Point3: "Virtualni ali telefonski pogovor z našim koordinatorjem",
      step2Title: "Vstavitev Vsadkov v Zavestni Sedaciji",
      step2Desc: "Obiščete našo kliniko. V enem samem obisku pod popolnoma varno sedacijo in brez bolečin namestimo švicarske vsadke Straumann.",
      step2Point1: "Udoben in sproščen spanec pod nadzorom anesteziologa",
      step2Point2: " Kirurška vstavitev 4 ali 6 vrhunskih zobnih vsadkov Straumann",
      step2Point3: "3D laserski skener namesto neprijetnega odtiskovanja ust",
      step3Title: "Odhod z Fiksnim Nasmehom v 48 Urah",
      step3Desc: "Na vsadke privijačimo čudovit fiksni začasni mostiček. Takoj lahko normalno žvečite, govorite in samozavestno stopite med ljudi.",
      step3Point1: "Začasni fiksni zobje pripravljeni v roku 48 ur",
      step3Point2: "Doživljenjska garancija na vsadke in uradna knjižica"
    },
    diagnoseSection: {
      title: "Naložite Ortopan za Brezplačno Strokovno Oceno",
      subtitle: "Naša kirurška ekipa bo brezplačno ocenila vaše stanje kosti na podlagi rentgenske slike ter vam poslala neobvezujoč načrt.",
      formTitle: "Diagnostični Portal",
      formSub: "Naložite posnetek ali vpišite svoje težave za pripravo ponudbe",
      lblFullName: "Ime in Priimek",
      lblPhone: "Telefonska Številka / WhatsApp",
      lblCountry: "Država bivanja",
      lblNotes: "Klinične opombe ali posebne želje",
      lblStatus: "Težave z zobmi / Trenutno stanje",
      lblHaveScan: "Ali že imate rentgengski posnetek (ortopan) ali 3D sliko?",
      optItaly: "Italija",
      optSlovenia: "Slovenija",
      optAustria: "Avstrija",
      optCroatia: "Hrvaška",
      optGermany: "Nemčija",
      optOther: "Druga država",
      optState1: "Hudo poškodovani zobje / manjka večina zob",
      optState2: "Povsem brez zob / nosim snemljivo protezo",
      optState3: "Manjka posamezen zob / potrebujem en implantat",
      optState4: "Splošno povpraševanje / informacije o sedaciji",
      lblPreferredContact: "Želen način za kontakt",
      btnSubmit: "Pošlji sliko v brezplačno oceno Dr. Surini",
      btnSubmitting: "Varovano pošiljanje podatkov...",
      successTitle: "Zahtevek je uspešno oddan!",
      successDesc: "Hvala. Vaši posnetki so varno prejeti. Kirurška ekipa dr. Uroša Surine bo sliko pregledala in vas kontaktirala v roku 12 ur.",
      hipaaSecure: "VAROVAN IN ENKRIPTIRAN SPREJEM PODATKOV PO STANDARDIH HIPAA IN GDPR"
    },
    faqSection: {
      title: "Pogosta vprašanja pacientov",
      subtitle: "Iskreni in strokovni odgovori naših kirurgov o analgosedaciji, doživljenjski garanciji in takojšnji obremenitvi v 48 urah."
    },
    chatPrompt: {
      title: "Svetovalec dr. Surine",
      onlineText: "Klinična podpora • Aktivno",
      selectLanguage: "Izbira jezika:",
      placeholder: "Vprašajte nas karkoli o kliniki...",
      prompt1: "💰 Cene posegov",
      prompt1Text: "Kakšne so cene za zobne vsadke All-on-4 v Sloveniji?",
      prompt2: "💤 Brez bolečin / Sedacija",
      prompt2Text: "Ali je zdravljenje z zavestno sedacijo popolnoma neboleče?",
      prompt3: "📋 Brezplačen pregled",
      prompt3Text: "Kako lahko naročim brezplačen pregled moje rentgenske slike?",
      welcomeMsg: "Pozdravljeni! Sem svetovalec v ordinaciji dr. Surine. Pomagam vam z odgovori o vrhunskih švicarskih vsadkih Straumann All-on-4 in brezbolečinskem zdravljenju. Kako vam lahko pomagam?",
      langBadge: "EN / IT / SL / DE"
    }
  },
  DE: {
    banner: "GRENZÜBERSCHREITENDE ZAHNMEDIZINISCHE EXZELLENZ: Patienten aus Italien 🇮🇹, Österreich 🇦🇹, Deutschland 🇩🇪, Slowenien 🇸🇮",
    swissStraumann: "100% garantierte Schweizer Straumann®-Systeme und lückenloser Pass",
    nav: {
      specialists: "Elite-Spezialisten",
      technology: "Technologie",
      allon4: "All-on-4 / All-on-6",
      journey: "Patientenreise",
      testimonials: "Erfolgsgeschichten",
      faq: "Klinische FAQ"
    },
    headerSupport: "DE / IT / EN Support",
    scanReviewButton: "Kostenlose Röntgenanalyse",
    hero: {
      badge: "KLINISCHE MIT SPITZENSTANDARD SEIT 1991",
      title: "Deutsche Präzisionschirurgie, Schweizer Materialien",
      subtitle: "Sparen Sie teure Zahnarztgebühren in Westeuropa. Erhalten Sie bei angenehmer Dämmerschlaf-Sedierung festsitzenden Zahnersatz direkt am selben Tag von deutschen Master-Chirurgen.",
      ctaPrimary: "Kostenlose Röntgenbild-Analyse",
      ctaSecondary: "Virtuellen Assistenten fragen",
      experience: "35+ Jahre",
      experienceSub: "Goldstandard der Zahnmedizin",
      implantsPlural: "15.000+",
      implantsPluralSub: "Erfolgreich gesetzte Implantate",
      satisfaction: "99.8%",
      satisfactionSub: "Klinische Erfolgsquote"
    },
    features: {
      sedationTitle: "Dämmerschlaf (Analgo-Sedierung)",
      sedationDesc: "Durchgeführt von zertifizierten Anästhesisten wird Angst und Schmerz komplett eliminiert. Sie schlafen entspannt und wachen mit neuen festen Zähnen auf.",
      computerTitle: "Computergestützte Navigation",
      computerDesc: "Individuelle Bohrschablonen aus 3D-Scannern sorgen im Zusammenspiel mit Spezialsoftware für exakte Platzierung im Mikrometerbereich.",
      qualityTitle: "Straumann® Lebensgarantie",
      qualityDesc: "Wir verwenden ausschließlich Schweizer Premium-Zahnimplantate von Straumann mit lebenslanger Garantie und original Implantat-Pass.",
      sedationLearn: "Ist die Lachgas- oder Dämmerschlaf-Sedierung völlig schmerzfrei?",
      computerLearn: "Wie funktioniert die computergestützte 3D-Implantologie?",
      qualityLearn: "Warum sollte man sich für Straumann statt Billig-Alternativen entscheiden?"
    },
    specialistsSection: {
      title: "Ihr betreuendes chirurgisches Kompetenzteam",
      subtitle: "Lernen Sie unsere Spezialisten kennen, die Ihren Behandlungsplan persönlich entwerfen – vereint durch jahrzehntelange Erfahrung und wissenschaftliche Präzision.",
      yearsExp: "Jahre klinische Erfahrung für höchste Exzellenz",
      awardsBadge: "Zertifizierte Implantologie-Fachklinik",
      drLucianoBio: "Mit 35 Jahren klinischer Erfahrung hat Dr. Lučiano Surina wegweisende prothetische Techniken auf Implantaten etabliert. Er ist weithin anerkannt für seine feine Ästhetik und tiefe Kenntnis der Gesichtsharmonie bei der Gestaltung von Brücken.",
      drUrosBio: "Dr. Uros Surina steht an der Spitze der digitalen Zahnmedizin. Nach Abschluss seines Master of Science (M.sc.) in Implantologie in Deutschland hat er über 10.000 Implantate erfolgreich gesetzt. Er ist hochspezialisiert auf komplizierte Fälle von Knochenmangel.",
      gradGerman: "Master of Science in Implantologie, IMC Münster (Deutschland, mit Auszeichnung)",
      placedImplants: "über 10.000 Implantate erfolgreich platziert"
    },
    journeySection: {
      title: "In 3 Schritten zu Ihren neuen festen Zähnen",
      subtitle: "Wir koordinieren für Sie den kostenlosen Chauffeur-Transfer ab den Grenzübergängen, eine erstklassige Hotelunterkunft und sofortige 3D-Diagnostik.",
      step1Title: "Kostenlose Röntgenbild-Analyse & Vorbesprechung",
      step1Desc: "Sie senden uns Ihr Röntgenbild (Orthopantomogramm) oder 3D CBCT digital ein. Unser Team unter Dr. Uroš bewertet Ihre Knochendichte.",
      step1Point1: "Kostenlose Fachbewertung innerhalb von 24 Stunden",
      step1Point2: "Transparenter schriftlicher Heil- und Kostenplan ohne Zusatzkosten",
      step1Point3: "Persönliche telefonische Beratung mit unserem Patienten-Koordinator",
      step2Title: "Minimalinvasive computergestützte Implantation",
      step2Desc: "Sie reisen entspannt an. Unter kontrollierter Analgosedierung werden Ihre Implantate mithilfe von Computerschablonen absolut schmerzfrei inseriert.",
      step2Point1: "Überwachter Dämmerschlaf für lückenlosen Komfort und Angstfreiheit",
      step2Point2: "Schonende Insertion von 4 bis 6 Straumann Premium-Implantaten",
      step2Point3: "Mundraum-Puderlaser statt herkömmlicher unangenehmer Löffel-Abdrücke",
      step3Title: "Festsitzender Zahnersatz innerhalb von 48 Stunden",
      step3Desc: "Eine hochästhetische provisorische Brücke wird stabil auf den Implantaten verschraubt. Sie können sofort wieder kauen, genießen und fest zubeißen.",
      step3Point1: "Festsitzender Zahnersatz am selben Tag belastbar",
      step3Point2: "Lebenslange Bauteilgarantie und original Schweizer Implantatpass"
    },
    diagnoseSection: {
      title: "Röntgenbild einsenden für kostenlose Fachanalyse",
      subtitle: "Unser OP-Team bewertet Ihre Aufnahmen aus der Ferne und zeichnet einen Behandlungsplan sowie Kostenvoranschlag komplett unverbindlich auf.",
      formTitle: "Teeth Diagnostic Portal",
      formSub: "Eingaben oder Röntgenbilder einreichen für Ihren transparenten Kostenvoranschlag",
      lblFullName: "Ihr vollständiger Name",
      lblPhone: "Telefonnummer / WhatsApp",
      lblCountry: "Wohnort (Land)",
      lblNotes: "Klinische Anmerkungen oder besondere Wünsche",
      lblStatus: "Aktueller Zustand meiner Zähne",
      lblHaveScan: "Haben Sie ein Röntgenbild (Panoramaschicht) oder 3D CBCT zur Hand?",
      optItaly: "Italien",
      optSlovenia: "Slowenien",
      optAustria: "Österreich (Kärnten / Steiermark / Sonstiges)",
      optCroatia: "Kroatien",
      optGermany: "Deutschland",
      optOther: "Sonstiges Land",
      optState1: "Schwerer Zahnschaden / Viele Zähne fehlen",
      optState2: "Vollständig zahnloser Kiefer / Trage herausnehmbare Prothese",
      optState3: "Einzelner Zahn fehlt / Benötige Einzelimplantat",
      optState4: "Allgemeine Anfrage / Information zu Dämmerschlaf",
      lblPreferredContact: "Bevorzugter Kontaktkanal",
      btnSubmit: "Zur kostenlosen Analyse an Dr. Surina senden",
      btnSubmitting: "Dokumente werden sicher übertragen...",
      successTitle: "Analyse-Anfrage erfolgreich empfangen!",
      successDesc: "Vielen Dank. Ihre Akte wurde sicher verschlüsselt übertragen. Das Team von Dr. Uroš Surina wird diese sichten und sich innerhalb von 12h melden.",
      hipaaSecure: "VERSCHLÜSSELTES EU-DSGVO & HIPAA GESUNDHEITSPORTAL"
    },
    faqSection: {
      title: "Häufig gestellte zahnmedizinische Fragen",
      subtitle: "Ehrliche Antworten direkt von unseren leitenden Chirurgen zu Sedierung, Implantatmaterialien und unseren schnellen Sofortbelastungs-Konzepten."
    },
    chatPrompt: {
      title: "Dr. Surinas Assistent",
      onlineText: "Klinischer Support • Online",
      selectLanguage: "Sprache wählen / Select:",
      placeholder: "Fragen Sie uns etwas zur Klinik...",
      prompt1: "💰 Implantat-Kosten?",
      prompt1Text: "Wie viel kosten All-on-4 Zahnimplantate in Slowenien?",
      prompt2: "💤 Schmerzfreie Sedierung?",
      prompt2Text: "Ist die Lachgas- oder Dämmerschlaf-Sedierung völlig schmerzfrei?",
      prompt3: "📋 Kostenfreie Analyse?",
      prompt3Text: "Wie bekomme ich eine kostenlose virtuelle Röntgenbild-Analyse?",
      welcomeMsg: "Guten Tag! Ich bin Dr. Surinas klinischer Assistent. Wir sind auf schmerzfreie All-on-4 Operationen in Analgosedierung und Schweizer Straumann-Systeme spezialisiert. Wie kann ich helfen?",
      langBadge: "EN / IT / SL / DE"
    }
  }
};
