import ProductsList from "../Productslist/ProductsList";
import classes from "../../styles/Sections/SectionItem.module.scss";
import data from "../../data.json";
const Cateogres = () => {
  return (
    <div className={classes.container}>
      <h1>Cateogres</h1>
      <h2>Our Top Cateogres</h2>
      <ProductsList products={data} />
    </div>
  );
};

export default Cateogres;
