import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from "../App"
import DetailMovie from "./DetailMovie";
import  NotFound from "../pages/NotFound"
import AdminMovie from "../pages/AdminMovie";
import AdminGenders    from "../pages/AdminGenders";
import Prueba from "../pages/prueba";


const Routes=()=>(

  <BrowserRouter>
    <Switch>
      <Route exact path="/movies" component={App}/>
      <Route exact path="/details/:id" component={DetailMovie}/>
      <Route exact path="/admin" component={AdminMovie}/>
      <Route exact path="/prueba" component={Prueba}/>
      <Route exact path="/adminGeders" component={AdminGenders}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
)
export default Routes;


