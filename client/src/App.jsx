import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Cookies from "js-cookie";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import SignUp from "./components/SignUp";

const Navbar = () => {

  const logout = () => {
    Cookies.remove("token");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            {Cookies.get("token") ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
