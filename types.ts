export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface TechnologyItem {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  explanation: string;
  benefit: string;
  comparison: {
    traditional: string;
    surina: string;
  };
  iconName: 'Scan3D' | 'Tv3D' | 'HeartPulse' | 'ComputerIcon';
}

export interface DoctorProfile {
  name: string;
  title: string;
  specialties: string[];
  education: string;
  experience: string;
  accomplishment: string;
  imageUrl: string;
  bio: string;
}

export interface PatientJourneyStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  actions: string[];
  iconName: 'Computer' | 'HeartPulse' | 'Smile';
}

export interface PatientTestimonial {
  name: string;
  age: number;
  city: string;
  country: string;
  treatment: string;
  quote: string;
  fullStory: string;
  rating: number;
  imageSeed: string;
}

export interface LeadFormInput {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  dentalState: string;
  hasScan: 'yes' | 'no' | 'not-sure';
  preferredContact: 'phone' | 'email' | 'whatsapp';
  notes: string;
}
