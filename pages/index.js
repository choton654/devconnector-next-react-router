import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import About from './About';
import Home from './Home';
import Users from './Users';
function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}

function NotFound() {
  return (
    <>
      <Status code={404} />
      <h2>Not found</h2>;
    </>
  );
}

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route exact path='/about/' component={About} />
        <Route exact path='/users/' component={Users} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/register/' component={Register} />
        <Redirect from='/people/' to='/users/' />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
