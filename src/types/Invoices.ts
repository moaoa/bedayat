export type Invoice = {
  id: string;
  thirdPartyName: string;
  details: string;
  total: number;
  itemsCount: number;
  categoriesCount: number;
  isPaid: boolean;
  paidAt: string;
  prepaidCards: string | null;
  userId: string;
  user: string | null;
  createdAt: string;
  lastUpdated: string;
};

export type NewInvoice = {
  exportAs: number;
};

export type InvoiceFilters = {
  thirdParty: string;
};
