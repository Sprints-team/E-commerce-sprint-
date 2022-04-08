import classes from "../../styles/ProductsList/ProductsList.module.scss";
import Product from "./Product";
const ProductsList = ({ products }) => {
  return (
    <ul className={classes.container}>
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </ul>
  );
};

export default ProductsList;
