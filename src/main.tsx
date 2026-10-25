import { createRoot } from "react-dom/client";
import { Router, Route, Switch } from "wouter";
import App from "./App";
import LinktreePage from "./pages/LinktreePage";
import ImagesPage from "./pages/images";
import "./index.css";

function Root() {
  return (
    <Router>
      <Switch>
        <Route path="/links" component={LinktreePage} />
        <Route path="/images" component={ImagesPage} />
        <Route component={App} />
      </Switch>
    </Router>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
