import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import ShowAllBoards from "./components/ShowAllBoards";
import UserProvider from "./context/UserProvider";
import EditBoard from "./components/EditBoard";
import AddBoard from "./components/AddBoard";
import PrivateRoute from "./components/PrivateRoute";
import DeleteBoard from "./components/DeleteBoard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Link } from 'react-router-dom';

function App() {
  return (
    <UserProvider>
      <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/allboards" className="navbar-brand">LumenReact</a>
        <div className="navbar-nav mr-auto">
        <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/allboards"} className="nav-link">
              Boards
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/board/add"} className="nav-link">
              Add Board
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <PrivateRoute path="/allboards" exact component={ShowAllBoards} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/edit/board/:id" exact component={EditBoard} />
          <PrivateRoute path="/board/add" exact component={AddBoard} />
          <PrivateRoute
            path="/delete/board/:id"
            exact
            component={DeleteBoard}
          />
        </Switch>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
