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
    colorpicker: string;
}

export type ValueProps ={
    value: string;
}