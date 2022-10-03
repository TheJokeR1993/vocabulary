import { NavLink } from "react-router-dom";
import "../index.scss";
const Header = () => {
  return (
    <header className="header">
      <NavLink to=""> словник</NavLink>
      <NavLink to="adding">додати</NavLink>
      <NavLink to="repeat">Повторити</NavLink>
      <NavLink to="rezult">Результати</NavLink>
    </header>
  );
};

export default Header;
