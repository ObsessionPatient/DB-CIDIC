import React from 'react';
import {Router,Route,Switch,Redirect} from 'react-router-dom';
import { createHashHistory } from "history";
import HomePage from '../homePage/homePage';
import Theme from '../theme/theme'
import LogIn from '../login/login'
import Monitor from '../monitor/monitor'

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
                    <Route path='/theme' component={Theme}/>
                    <Route path='/monitor' component={Monitor}/>
                </Switch>
            </Router>
        )
    }
}
export default RouterConfig;