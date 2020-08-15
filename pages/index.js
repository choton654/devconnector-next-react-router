// import Link from 'next/link';
import { Redirect } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';
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
      <h1>Welcome to Next.js!</h1>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about/'>About</Link>
          </li>
          <li>
            <Link to='/users/'>Users</Link>
          </li>
          <li>
            <Link to='/people/'>People</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about/' component={About} />
        <Route path='/users/' component={Users} />
        <Redirect from='/people/' to='/users/' />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
