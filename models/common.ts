import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface Planet {
  name: string;
  images: {
    png: string;
    webp: string;
  };
  content: string;
  distance: string;
  travel: string;
}

export interface Crew {
  name: string;
  role: string;
  bio: string;
}
