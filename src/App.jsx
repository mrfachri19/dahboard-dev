import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import registerServiceWorker from "./serviceWorkerRegistration";

import "./index.scss";
import Admin from "./layouts/Admin";
import Home from "social/Home";
import Auth from "./layouts/Auth.js";

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard/social" component={Home} />
        {/* add redirect for first page */}
        {/* <Redirect from="*" to="/admin" /> */}
      </Switch>
    </BrowserRouter>
  </>
);

Sentry.init({
  dsn: "https://533a31780355418cb4373a6b4961dbc8@o1168883.ingest.sentry.io/6261158",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("app"));
registerServiceWorker();
