import react from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login/index'
import Register from './pages/Register/index'
import Dashboard from './pages/Dashboard/index'
import EventsPage from './pages/EventsPage/index'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register}/>
                <Route path="/events" exact component={EventsPage} />
            </Switch>
        </BrowserRouter>
    );

}