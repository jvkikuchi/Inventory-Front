export type PaymentMetricsType = {
  total: number;
  integer: {
    pix: number;
    cash: number;
    debit: number;
    credit: number;
  };
  percentage: {
    pix?: number;
    cash?: number;
    debit?: number;
    credit?: number;
  };
};
