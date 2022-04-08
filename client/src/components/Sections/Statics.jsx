import ProductsList from "../Productslist/ProductsList";
import classes from "../../styles/Sections/SectionItem.module.scss";
import data from "../../data.json";
const Statics = () => {
  return (
    <div className={classes.container}>
      <h1>Statics</h1>
      <h2>Our Top Statics</h2>
      <ProductsList products={data} />
    </div>
  );
};

export default Statics;
