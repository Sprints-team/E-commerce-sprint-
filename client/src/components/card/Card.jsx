import React from "react";
import classes from "../../styles/Card/Card.module.scss";

const Card = ({ product }) => {
  return (
    <div>
      <div key={product.id} className={classes.card}>
        <div className={classes["card-img"]}>
          <img src={product.imageUrl} alt={product.title} />
        </div>

        <div className={classes["card-header"]}>
          <h2>{product.title}</h2>
          <p>{product.desc}</p>

          <p className={classes["price"]}>${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
