import React from 'react';
import { ThemeProvider } from './contexts/theme';
import Nav from './components/Nav/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';

const Popular = React.lazy(() => import('./components/Popular/Popular'));
const Battle = React.lazy(() => import('./components/Battle/Battle'));
const Results = React.lazy(() => import('./components/Results/Results'));

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light',
      }));
    },
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />

              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" component={Battle} />
                  <Route exact path="/popular" component={Popular} />
                  <Route path="/battle/results" component={Results} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
