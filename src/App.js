import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import { useState } from "react";
import ThemeContext from "./ThemeContext";
const App = () => {
  const theme = useState("darkblue");
  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
