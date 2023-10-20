import { Invoice } from "@/types/Invoices";

export type PrepaidCard = {
  id: string;
  sellingPrice: number;
  coinsAmount: number;
  number: number | null;
  serialNumber: string;
  state: number;
  thirdPartyName: string | null;
  invoiceId: string | null;
  invoice: Invoice | null;
  createdAt: string;
  lastUpdated: string;
};

export type NewPrepaidCard = {
  count: number;
  coinAmount: number;
};

export type PrepaidCardFilters = {
  number: string;
  serialNumber: string;
  state: number;
};

export type PrepaidCardsExportParams = {
  prepaidCardsCategories: { coinAmount: number; count: number }[];
  thirdPartyName: string;
  details: string;
  exportAs: number;
};
