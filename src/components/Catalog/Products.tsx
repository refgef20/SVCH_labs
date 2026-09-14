import "./catalog.css";
import { Product } from "./IProduct";

interface ProdProps {
  products: Product[];
}
const Products = ({ products }: ProdProps) => {
  return products.map((product) => (
    <div key={product.id} className="container-for-every-card-mets">
      <img className="img-prod" src={product.photo} alt="" />
      <p className="item-first-card-mets">{product.name_en}</p>
      <p className="item-first-card-mets1">{product.description_en}</p>
      <div className="container-for-button-catalog">
        <p className="itame-for-button-for-last3cardmets1">{product.price}</p>
      </div>
    </div>
  ));
};

export default Products;
