import React, { useEffect, useState, useCallback } from 'react';
import { fetchPopularRepos } from '../../utils/api';
import Loading from '../Loading';
import LanguagesNav from './LanguagesNav';
import ReposGrid from './RepoGrid';

const Popular = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [repos, setRepos] = useState({});
  const [error, setError] = useState(null);

  const updateLanguage = useCallback(
    (selectedLanguage) => {
      setSelectedLanguage(selectedLanguage);
      setError(null);

      if (!repos[selectedLanguage]) {
        fetchPopularRepos(selectedLanguage)
          .then((data) => {
            setRepos({ ...repos, [selectedLanguage]: data });

            // this.setState(({ repos }) => ({
            //   repos: {
            //     ...repos,
            //     [selectedLanguage]: data,
            //   },
            // }));
          })
          .catch((error) => {
            console.warn('Error fetching repos: ', error);
            setError('There was an error fetching the repositories.');
          });
      }
    },
    [repos]
  );

  useEffect(() => {
    updateLanguage(selectedLanguage);
  }, [selectedLanguage, updateLanguage]);

  const isLoading = () => {
    return !repos[selectedLanguage] && error === null;
  };

  return (
    <React.Fragment>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguage={updateLanguage}
      />

      {isLoading() && <Loading text="Fetching Repos" />}

      {error && <p className="center-text error">{error}</p>}

      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
    </React.Fragment>
  );
};

export default Popular;
