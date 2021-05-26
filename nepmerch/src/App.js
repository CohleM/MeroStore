import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import registerUser from "./components/users/registerUser";
import AdminPage from "./components/AdminPage/admin.js";

import RegisterStore from "./components/users/RegisterStore";
import Navbar from "./components/Navbar/navbar.component";
// import ExerciseList from "./components/exercises-list.component";
// import EditExercise from "./components/edit-exercise.component";
// import CreateExercise from "./components/create-exercise.component";
// import CreateUser from "./components/create-user.component";
import UploadProduct from "./components/products/uploadProduct";
import LandingPage from "./components/products/LandingPage";
//             { <Route path = "/" exact component  = {ExerciseList} /> }
import DetailedProduct from "./components/products/DetailedProduct";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authAction";
import { useEffect } from "react";
import Logout from "./components/users/Logout";
import Login from "./components/users/Login";
import CartPage from "./components/CartPage/CartPage";
import History from "./components/users/History";
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/utilities/Footer";
import ProductPage from "./components/ProductPage/ProductPage";
import MainStore from "./components/StorePage/MainStore";
import SearchFeature from "./components/utilities/SearchFeature";
import CardsWithReview from "./components/HomePage/sections/CardsWithReview";
import SidebarWithNavbar from "./components/AdminPage/sidebarAndNavbar";
import ProductList from "./components/AdminPage/subAdmin/ProductList";
import Home from "./components/AdminPage/subAdmin/Home";

export const WithSidebarAndNavbar = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) => (
				<div>
					<SidebarWithNavbar {...props} />
					<Component {...props} />
					<Footer />
				</div>
			)}
		/>
	);
};

export const WithNavbarAndFooter = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) => (
				<div>
					<Navbar />
					<Component {...props} />
					<Footer />
				</div>
			)}
		/>
	);
};

export const PlainRoute = ({ component: Component, ...rest }) => {
	return <Route {...rest} component={(props) => <Component {...props} />} />;
};

const Main = withRouter(({ location }) => {
	// const [Searchitems, setSearchitems] = useState("");
	// const forSearch = (newSearchItems) => {
	// 	setSearchitems(newSearchItems);
	// };
	return (
		<div>
			<br />
			<Switch>
				<WithNavbarAndFooter
					exact
					path="/store/:storeName"
					component={MainStore}
				/>
				<PlainRoute exact path="/" component={RegisterStore} />
				<PlainRoute
					exact
					path="/store/:storeName/product/upload"
					component={UploadProduct}
				/>

				<WithNavbarAndFooter
					exact
					path="/store/:storeName/product/:productId"
					component={ProductPage}
				/>
				<WithNavbarAndFooter
					exact
					path="/store/:storeName/search/:searchValue"
					component={CardsWithReview}
				/>
				<PlainRoute
					exact
					path="/store/:storeName/users/register"
					component={registerUser}
				/>
				<WithNavbarAndFooter
					exact
					path="/store/:storeName/users/logout"
					component={Logout}
				/>
				<PlainRoute
					exact
					path="/store/:storeName/users/login"
					component={Login}
				/>

				<WithNavbarAndFooter
					exact
					path="/store/:storeName/users/cartPage"
					component={CartPage}
				/>

				<WithNavbarAndFooter
					exact
					path="/store/:storeName/users/history"
					component={History}
				/>

				<PlainRoute
					exact
					path="/store/:storeName/admin"
					component={AdminPage}
				/>
				<PlainRoute
					exact
					path="/store/:storeName/admin/add"
					component={UploadProduct}
				/>

				<WithSidebarAndNavbar
					exact
					path="/store/:storeName/admin/products"
					component={ProductList}
				/>

				<WithSidebarAndNavbar
					exact
					path="/store/:storeName/admin/home"
					component={Home}
				/>
			</Switch>
		</div>
	);
});

function App() {
	useEffect(() => {
		console.log(store);
		store.dispatch(loadUser());
		window.scrollTo(0, 0);
	}, []);

	return (
		<div style={{ width: "100%", backgroundColor: "white" }}>
			<Provider store={store}>
				<Router>
					{/* <div className= "container"> */}
					{/* <Navbar />
					<Route exact path="/" exact component={HomePage} />
					<br />
					<Switch>
						<Route exact path="/edit/:id" component={EditExercise} />
						<Route exact path="/create" component={CreateExercise} />
						<Route exact path="/product/upload" component={UploadProduct} />
						<Route exact path="/user" component={CreateUser} />
						<Route exact path="/product/:productId" component={ProductPage} />
						<Route exact path="/register" component={registerUser} />
						<Route exact path="/users/logout" component={Logout} />
						<Route exact path="/users/login" component={Login} />

						<Route exact path="/users/cartPage" component={CartPage} />

						<Route exact path="/users/history" component={History} />
					</Switch>

					<Footer /> */}

					<Main />
					{/* </div> */}
				</Router>
			</Provider>
		</div>
	);
}

export default App;
