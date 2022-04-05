import classes from "../styles/Header.module.scss";
const Header = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Header;
