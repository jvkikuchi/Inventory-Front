import type {SalesHistoryType, MovementType} from './StatisticsType';

export interface ProductInterface {
  createdAt: Date;
  updated_at: Date;
  deleted_at: Date;
  expirationDate?: Date;
  name: string;
  image: string;
  description: string;
  stockQuantity: number;
  unitPrice: number;
  id: number;
}

export interface ProductStatisticsInterface {
  name: string;
  id: number;
  supplierName: string;
  image: string | null;
  unitPrice: number;
  salesHistory: SalesHistoryType[];
  totalSales: string;
  creditSales: string;
  pixSales: string;
  debitSales: string;
  cashSales: string;
  movementsHistory: MovementType[];
}
