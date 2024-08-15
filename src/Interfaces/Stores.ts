export interface IStoreCard {
  storeName: string;
  description: string;
  logoUrl: string;
  category?: string;
  createdAt?: string;
  dateCreated?: string;
  userId?: number;
  sellerId?: number;
  id?: number;
  totalSales?: number;
  remainingDays?: number;
  sales?: number;
  stores?: boolean;
  vendaCategory?: { name: string };
}
