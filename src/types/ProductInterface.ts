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
