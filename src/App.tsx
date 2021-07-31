import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import SignInPage from './pages/sign-in-page';
import DashboardPage from './pages/dashboard-page';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
        <Router>
        <Switch>
        <Route exact path='/'>
        <SignInPage />
        </Route>
        <Route exact path='/dashboard'>
        <DashboardPage accountAddress='' />
        </Route>
        </Switch>
        </Router>
    </div>
    </QueryClientProvider>
  );
}

export default App;
