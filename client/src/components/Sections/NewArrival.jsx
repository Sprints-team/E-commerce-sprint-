import classes from "../../styles/Sections/SectionItem.module.scss";
import ProductsList from "../Productslist/ProductsList";
import data from "../../data.json";
const NewArrival = () => {
  return (
    <div className={classes.container}>
      <h1>NewArrival</h1>
      <h2>Our Top NewArrival</h2>
      <ProductsList products={data} />
    </div>
  );
};

export default NewArrival;
