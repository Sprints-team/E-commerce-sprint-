import { Button } from "@mantine/core";
import classes from "../../styles/Header/Cover.module.scss";

const Cover = () => {
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <div>
          <h3>Limted Time Only For Winter</h3>
          <h1>Fashion</h1>
          <h3>Look Your Best On Your Best Day</h3>
          <Button color="red" radius="md" size="xs">
            Discover more
          </Button>
        </div>
      </div>
      <div className={classes.image}>
        <img src="./images/Model.png" alt="" />
      </div>
    </div>
  );
};

export default Cover;
