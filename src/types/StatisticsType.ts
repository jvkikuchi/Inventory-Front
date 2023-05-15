export type SalesHistoryType = {
  quantity: number;
  sellDate: string;
  productId: number;
  totalPrice: number;
  movementId: string;
  paymentMethod: string;
};

export type FinancialStatisticsType = {
  id: number;
  name: string;
  image: string;
  supplierName: string;
  salesHistory: SalesHistoryType[];
  totalSales: number;
  creditSales: number;
  pixSales: number;
  debitSales: number;
  cashSales: number;
};

export interface MovementType {
  date: string;
  quantity: number;
  movementId: string;
  movementType: string;
}
