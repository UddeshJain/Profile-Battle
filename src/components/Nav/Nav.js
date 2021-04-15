import * as React from 'react';
import { ThemeConsumer } from '../../contexts/theme';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  color: 'rgb(187, 46, 31)',
};

const Nav = () => {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink
                to="/"
                exact
                activeStyle={activeStyle}
                className="nav-link"
              >
                Battle
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/popular"
                activeStyle={activeStyle}
                className="nav-link"
              >
                Popular Repos
              </NavLink>
            </li>
          </ul>
          <button
            style={{ fontSize: 30 }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌚' : '☀️'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
};

export default Nav;
