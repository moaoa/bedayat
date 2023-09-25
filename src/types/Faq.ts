import { City } from "@/types/Cities";


export type Faq={
  id: string
  question: string
  answer: string
  englishQuestion: string
  englishAnswer: string
  faqCategory: FaqCategory
  createdAt: string
  lastUpdated: string
}

export type NewFaqData = Omit<Faq, "id" | "createdAt" | "lastUpdated">;

export enum FaqCategory{
  General,
  Login,
  Courses,
  Subscription,
}

