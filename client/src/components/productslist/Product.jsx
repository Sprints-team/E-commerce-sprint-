import { useState } from "react";
import Rating from "@mui/material/Rating";
import classes from "../../styles/ProductsList/Product.module.scss";
const Product = ({ product }) => {
  const [value, setValue] = useState(2);
  return (
    <li className={classes.container}>
      <div className={classes.image}>
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className={classes.details}>
        <p>{product.desc}</p>
        <div>
          <div className={classes.price}>${product.price}</div>
          <div>
            <Rating
              readOnly
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
