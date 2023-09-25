// to be removed


  export type TermsAndPrivacy ={
    id: string;
    content: string;
    englishContent: string;
    type: TermsAndPrivacyType;
    createdAt: Date;
    lastUpdated: Date;
  }

export enum TermsAndPrivacyType
{
    Terms, Privacy
}

  export type AddTermsData ={
    type: TermsAndPrivacyType;
    content: string;
    englishContent: string;
  }
  export type UpdateTermsData ={
    content: string;
    englishContent: string;
  }