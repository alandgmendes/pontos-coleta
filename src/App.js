import { Switch, Route } from "react-router-dom";
import Account from "./Account";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";


function App() {
  return (
    <div>

      {/* create routes here */}
      <Switch>
        <Route exact path="/" component={Account} />
        <ProtectedRoutes path="/auth" component={AuthComponent} />
      </Switch>
    </div>
  );
}

export default App;
