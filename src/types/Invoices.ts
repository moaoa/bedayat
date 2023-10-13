export type Invoice = {
  id: string;
  sellingPrice: number;
  coinsAmount: number;
  number: number | null;
  serialNumber: string;
  state: number;
  consumedType: number;
  createdAt: string;
  lastUpdated: string;
};

export type NewInvoice = {
  exportAs: number;
};

export type InvoiceFilters = {
  thirdParty: string;
};
