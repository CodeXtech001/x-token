import { LucideIcon } from "lucide-react";

export interface TokenData {
    id: number;
    current_prices: string;
    next_prices: string;
    stage: number;
    token_sold: string;
    total_token: number;
  }


export type SectionHeaderProp = {
    headline?: string;
    paragraph?: string;
    Features?: {
        title: string;
        description: string;
        icon: LucideIcon;
    }[];
}

export type ProgressUpdateProps = {
    setprogress: number;
    colorpicker?: string;
}

export type ValueProps ={
    value: string;
}

export type PartnersProps ={
    partners?:{
        name: string;
        icon: string;
    }[];
}
export interface TokenDistribution {
    category: string;
    percentage: number;
    color: string;
}

export interface TokenDetails {
    name: string;
    value: string;

}

export interface Tokenomics {
    headline: string;
    paragraph: string;
    tokenDistribution: TokenDistribution[];
    tokenDetails: TokenDetails;
}

export interface RoadmapItems {
    roadmap2025:RoadmapItem[];
}

export interface RoadmapItem {
        quarter: string;
        title: string;
        details: string[];
    }

export interface Reward {
    icon?: LucideIcon; // Optional since one item lacks an icon
    title: string;
    description: string;
    benefits?: string[]; // Optional for items with additional benefits
}

export interface ExclusiveRewards {
headline: string;
paragraph: string;
rewards: Reward[];
}

export interface Privileges {
    icon?: LucideIcon; // Optional since one item lacks an icon
    title: string;
    description: string;
    benefits?: string[]; 
}

export interface ElitePrivileges {
    headline: string;
    paragraph: string;
    privileges: Privileges[];
}

export interface FAQItem {
    question: string;
    answer: string;
  }
  
export interface FAQData {
    headline: string;
    paragraph: string;
    questions: FAQItem[];
}

export interface PrivacyPolicySection {
    title: string;
    purpose: string;
    dotcontent?: string[]; // Optional, since not all sections have a list
  }
  
export interface PrivacyPolicy {
title: string;
introduction: string;
sections: PrivacyPolicySection[];
}

export interface Tier {
    name: string;
    tokens: {
      from: number;
      to: number | null;
    };
    next: string | null;
    contents: string[];
    progress: string | null;
    bonus: number;
  }


export interface Step {
    stepNumber: number;
    icon: React.ComponentType; // Type for Lucide icons
    title: string;
    description: string;
}
export interface Step3s{
    icon: React.ComponentType; // Type for Lucide icons
    title: string;
    description: string; 
}


export interface Network {
    name: string;
    description: string;
  }


  export interface Cryptocurrency {
    name: string;
    rate: string;
    icon: string;
  }

  export interface CryptoOrder {
    id: number;
    order: string;
    crypto_type: string;
    wallet_address: string;
    amount: string;
    status: "pending" | "canceled" | "approved"; // Status type constraint
    tokens: string;
    bonus_tokens: string;
    total_tokens: string;
    created_at: string;
    expires_at: string;
  }


  export interface UserDocument {
    id: number;
    username: string;
    usergmail: string;
    user_balance_token: string;
    bonus_tokens: string;
    total_tokens: string;
    user_status: string;
  } 
  