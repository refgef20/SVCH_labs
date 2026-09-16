import { Product } from "./IProduct";
export interface ProdProps {
  products: Product[];
  onDelete: (id: number) => void;
  onRedact: (id: number | null) => void;
  idSel: number | null;
  onSave: (
    id: number,
    name: string,
    description: string,
    price: number,
  ) => void;
}
