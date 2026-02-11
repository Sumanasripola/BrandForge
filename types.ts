
export interface BrandInputs {
  businessDescription: string;
  industry: string;
  targetAudience: string;
  tone: string;
  personalitySummary?: string;
}

export interface SocialPost {
  platform: string;
  type: string;
  content: string;
  caption: string;
}

export interface CustomerPersona {
  name: string;
  ageRange: string;
  lifestyle: string;
  goals: string[];
  painPoints: string[];
  discoveryChannels: string[];
}

export interface BrandVoice {
  style: string;
  wordsToUse: string[];
  wordsToAvoid: string[];
  rules: string[];
}

export interface ColorInfo {
  name: string;
  hex: string;
  emotion: string;
}

export interface BrandResult {
  brandNames: { name: string; meaning: string }[];
  taglines: string[];
  description: string;
  mission: string;
  vision: string;
  positioningStatement: string;
  justification: string;
  personalityProfile: {
    archetype: string;
    emotionalResponse: string;
  };
  customerPersona: CustomerPersona;
  brandVoice: BrandVoice;
  colorPalette: ColorInfo[];
  visualMood: string;
  socialBio: {
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  socialStarterKit: {
    launchPost: SocialPost;
    engagementPost: SocialPost;
    hashtags: string[];
  };
}

export enum Tone {
  PROFESSIONAL = 'Professional',
  PLAYFUL = 'Playful',
  MINIMALIST = 'Minimalist',
  LUXURY = 'Luxury',
  INNOVATIVE = 'Innovative',
  FRIENDLY = 'Friendly'
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    description: string;
  }[];
}