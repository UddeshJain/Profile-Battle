import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Instructions from './Instructions';
import PlayerPreview from './PlayerPreview';
import PlayerInput from './PlayerInput';

const Battle = () => {
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);

  const handleSubmit = (cb, player) => {
    cb(player);
  };

  const handleReset = (cb) => {
    cb(null);
  };

  return (
    <React.Fragment>
      <Instructions />

      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="row space-around">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => handleSubmit(setPlayerOne, player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label="Player One"
              onReset={() => handleReset(setPlayerOne)}
            />
          )}

          {playerTwo === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => handleSubmit(setPlayerTwo, player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label="Player Two"
              onReset={() => handleReset(setPlayerTwo)}
            />
          )}
        </div>

        {playerOne && playerTwo && (
          <Link
            className="btn dark-btn btn-space"
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </React.Fragment>
  );
};

export default Battle;
