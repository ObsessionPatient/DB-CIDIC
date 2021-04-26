import React from 'react';
import {Router,Route,Switch,Redirect} from 'react-router-dom';
import { createHashHistory } from "history";
import HomePage from '../homePage/homePage';
import Land from '../land/land'
import Trans from '../trans/trans'
import Resource from '../resource/resource'
import Envir from '../envir/envir'
import Economy from '../economy/economy'
import Theme from '../theme/theme'
import LogIn from '../login/login'

const history = createHashHistory();

class RouterConfig extends React.Component{
    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route path='/' exact render={()=>(
                        <Redirect to='/login'/>
                    )}/>
                    <Route path='/login' component={LogIn}/>
                    <Route path='/home' component={HomePage}/>
                    <Route path='/data/land' component={Land}/>
                    <Route path='/data/trans' component={Trans}/>
                    <Route path='/data/resource' component={Resource}/>
                    <Route path='/data/envir' component={Envir}/>
                    <Route path='/data/economy' component={Economy}/>
                    <Route path='/theme' component={Theme}/>
                </Switch>
            </Router>
        )
    }
}
export default RouterConfig;