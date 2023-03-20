import { Switch, Route } from "react-router-dom";
import {Col, Row } from "react-bootstrap";
import Account from "./Account";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";


function App() {
  return (
    <div>
      <Row>
        <Col className="text-center">
          <section id="navigation">
          </section>
        </Col>
      </Row>

      {/* create routes here */}
      <Switch>
        <Route exact path="/" component={Account} />
        <ProtectedRoutes path="/auth" component={AuthComponent} />
      </Switch>
    </div>
  );
}

export default App;
