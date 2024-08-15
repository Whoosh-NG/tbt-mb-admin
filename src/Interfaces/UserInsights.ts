export interface IUserInsights {
  logoUrl: string;
  firstName?: string;
  lastName?: string;
  storeName?: string;
  email?: string;
  storeEmail?: string;
  createdAt: string;
  lastActivity: string;
  userType: string;
  id: number | string;
  userId?: number | string;
  user?: {
    firstName?: string;
    lastName?: string;
    email: string;
    userType: string;
  };
}
