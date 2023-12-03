import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <NavLink
        style={({ isActive }) => (isActive ? { color: 'lightyellow', textDecoration: 'none' } : {})}
        to="."
        end
      >
        Home
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'link')} to="form-simple">
        Form-Simple
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'link')} to="form-react">
        Form-React
      </NavLink>
    </nav>
  );
};

export default Menu;
