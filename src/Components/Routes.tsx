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
import AdminMovie from "../adminMovie";

const Routes=()=>(

  <BrowserRouter>
    <Switch>
      <Route exact path="/movies" component={App}/>
      <Route exact path="/details/:id" component={DetailMovie}/>
      <Route exact path="/admin" component={AdminMovie}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
)
export default Routes;


