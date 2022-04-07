import classes from "../../styles/Sections/SectionItem.module.scss";
import ProductsList from "../Productslist/ProductsList";
import data from "../../data.json";
const Collections = () => {
  return (
    <div className={classes.container}>
      <h1>Collections</h1>
      <h2>Our Top Collections</h2>
      <ProductsList products={data} />
    </div>
  );
};

export default Collections;
