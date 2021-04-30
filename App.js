import React from 'react';
import {BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'
import Header from './Header';
import routes from './router.config';
import Image from './Image'
import Det from './det'

//权限路由 （登陆权限，将子路由往下传递）
function PrivateRoute({component:Com,...rest}){
	return (
		<Route
			{...rest}
			render={({location})=>
				localStorage.getItem('userinfo')
				?(<Com routes={{...rest}.routes}/>)
				:(
					<Redirect to={{
						pathname:"/login",
						state:location
					}}
					/>
				)
		}
		/>
	)
}
//一级路由并加入权限，并将其子路由往下传递
function RouteWithSubRoutes(route){
	if(route.pri){
		return <PrivateRoute {...route}/>						
	}
	return(
		<Route path={route.path}
		render={props => (
		<route.component {...props} routes={route.routes} />
		)}
	  />		
	)
}
const App =()=>{
	return (<div>
		<Router>
			<Image />
			<Header />
			<Switch>
				{routes.map((route)=><RouteWithSubRoutes {...route}/>)}
				<Route path='/home/detail' component={Det} />
			</Switch>
		</Router>
	</div> 
	)
	
}
export default App;
export {RouteWithSubRoutes};