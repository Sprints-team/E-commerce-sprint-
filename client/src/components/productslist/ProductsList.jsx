import Card from "../Card/Card";
import classes from "../../styles/ProductsList/ProductsList.module.scss";

const ProductsList = ({ products }) => {
  console.log(products);
  const listProducts = products.map((product) => (
    <Card product={product} key={product.id} />
  ));

  return (
    <div>
      <div className={classes["main-content"]}>{listProducts}</div>
    </div>
  );
};

export default ProductsList;
