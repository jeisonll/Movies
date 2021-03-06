import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from "../App"
import DetailMovie from "./DetailMovie";
import  NotFound from "./NotFound"

const Routes=()=>(

  <BrowserRouter>
    <Switch>
      <Route exact path="/movies" component={App}/>
      <Route exact path="/details/:id" component={DetailMovie}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
)
export default Routes;


