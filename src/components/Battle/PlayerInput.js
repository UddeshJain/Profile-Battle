import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeConsumer } from '../../contexts/theme';

const PlayerInput = (props) => {
  const [username, setUserName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(username);
  };

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <form className="column player" onSubmit={handleSubmit}>
          <label htmlFor="username" className="player-label">
            {props.label}
          </label>
          <div className="row player-inputs">
            <input
              type="text"
              id="username"
              className={`input-${theme}`}
              placeholder="github username"
              autoComplete="off"
              value={username}
              onChange={handleChange}
            />
            <button
              className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
              type="submit"
              disabled={!username}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </ThemeConsumer>
  );
};

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default PlayerInput;
