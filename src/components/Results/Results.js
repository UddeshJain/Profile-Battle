import React, { useState, useEffect } from 'react';
import { battle } from '../../utils/api';
import Card from '../Card/Card';
import Loading from '../Loading';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import ProfileList from './ProfileList';

const Results = (props) => {
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { playerOne, playerTwo } = queryString.parse(props.location.search);

    battle([playerOne, playerTwo])
      .then((players) => {
        setWinner(players[0]);
        setLoser(players[1]);
        setError(null);
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, [props.location.search]);

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading text="Battling" />
      ) : (
        <React.Fragment>
          <div className="grid space-around container-sm">
            <Card
              header={winner.score === loser.score ? 'Tie' : 'Winner'}
              subheader={`Score: ${winner.score.toLocaleString()}`}
              avatar={winner.profile.avatar_url}
              href={winner.profile.html_url}
              name={winner.profile.login}
            >
              <ProfileList profile={winner.profile} />
            </Card>
            <Card
              header={winner.score === loser.score ? 'Tie' : 'Loser'}
              subheader={`Score: ${loser.score.toLocaleString()}`}
              avatar={loser.profile.avatar_url}
              name={loser.profile.login}
              href={loser.profile.html_url}
            >
              <ProfileList profile={loser.profile} />
            </Card>
          </div>
          <Link to="/battle" className="btn dark-btn btn-space">
            Reset
          </Link>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Results;
