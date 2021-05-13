import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	ADD_CART_TO_USER,
	ADD_CART_ERROR,
	CART_LOADING,
	CART_LOADED,
	REMOVE_FROM_CART,
	PAYMENT_SUCCESS,
	LOAD_STORE,
	STORE_CREATED,
} from "./types";
import { USER_SERVER } from "../components/config";
import axios from "axios";
import { returnErrors, clearErrors } from "./errorAction";
//Checking token and loading user

import { connect, useDispatch, useSelector } from "react-redux";
//initially this function is created and takes in two parameters
export const loadUser = () => (dispatch, getState) => {
	//dipathing means firing action to the reducers
	dispatch({ type: USER_LOADING });
	console.log("loaduser executed");
	// get token from localstorage
	// const token = getState().auth.token;

	// console.log("token", token);

	// //headers
	// const config = {
	// 	headers: {
	// 		"Content-type": "application/json",
	// 	},
	// };

	// if (token) {
	// 	config.headers["x-auth-token"] = token;
	// }
	// axios.get takes in an object of headers

	const { auth }  = getState();	
	const storeName = auth.storeName;

	axios
		// .get("http://localhost:5000/users/getinfo", tokenConfig(getState))
		.get(`${USER_SERVER}/users/getinfo?storeName=${storeName}`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log("getinfo error", err);
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

//Setsup the header
export const tokenConfig = (getState) => {
	const token = getState().auth.token;

	//headers
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	if (token) {
		config.headers["x-auth-token"] = token;
	}

	//console.log(config);
	return config;
};

//Register user
export const registerStore  = ({ storeID , email, password }) => (dispatch, getState) => {
	//headers
	const config = {
		"Content-type": "application/json",
	};

	const { auth }  = getState();	


	console.log('registerStore Executed');
	//const storeName = auth.storeName;
	//const body = JSON.stringify({ username, email, password });
	axios
		.post(
			`${USER_SERVER}/store/register`,
			{
				name: storeID,
				email: email,
				password: password,
			},
			config
		)
		.then((res) => {
			console.log("this is registerStore ");
			//console.log(res.data);
			dispatch({
				type: STORE_CREATED,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err.response);
			dispatch(
				returnErrors(
					err.response.data.message,
					err.response.data.type,
					err.response.status,
					"STORE REGISTRATION FAILED"
				)
			);
			dispatch({
				type: REGISTER_FAIL,
			});
		});
};

export const register = ({ username, email, password }) => (dispatch, getState) => {
	//headers
	const config = {
		"Content-type": "application/json",
	};

	const { auth }  = getState();	
	const storeName = auth.storeName;
	//convert js object to json
	//this stringfy doesn't work fires up error
	const body = JSON.stringify({ username, email, password });
	//console.log(body);
	//now we make a req to the server
	console.log("this executed woow");
	axios
		.post(
			`${USER_SERVER}/users/register?storeName=${storeName}`,
			{
				name: username,
				email: email,
				password: password,
			},
			config
		)
		.then((res) => {
			console.log("executed");
			//console.log(res.data);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err.response);
			dispatch(
				returnErrors(
					err.response.data.message,
					err.response.data.type,
					err.response.status,
					"REGISTER FAIL"
				)
			);
			dispatch({
				type: REGISTER_FAIL,
			});
		});
};

export const login = ({ email, password }) => (dispatch, getState) => {
	const config = {
		"Content-type": "application/json",
	};
		const { auth }  = getState();	
	const storeName = auth.storeName;
	
//	const storename = useSelector((state) => state.auth.storeName);
	console.log('this is from ggg', auth.storeName );
	//console.log('this is from gggg ', storename);
	const sample = "test";
	axios
		.post(
			`${USER_SERVER}/users/login?storeName=${storeName}`,
			{
				email,
				password,
			},
			{ params: { sample }, config }
		)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
			console.log("this is res", res);
		})
		.catch((err) => {
			console.log("this is error", err);
			dispatch(
				returnErrors(
					err.response.data.message,
					err.response.data.type,
					err.response.status,
					"LOGIN_FAIL"
				)
			);
			dispatch({
				type: LOGIN_FAIL,
			});
		});
};

export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT_SUCCESS,
	});
};

export const addToCart = (productId) => (dispatch, getState) => {

	const { auth }  = getState();	
	const storeName = auth.storeName;
	axios
		.get(
			`${USER_SERVER}/users/addToCart?id=${productId}&storeName=${storeName}`,
			tokenConfig(getState)
		)
		.then((res) => {
			//console.log(res.data);
			dispatch({
				type: ADD_CART_TO_USER,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					"ADD_TO_CART_ERROR"
				)
			);
		});
};

export const loadCart = () => (dispatch, getState) => {
	
	const { auth }  = getState();	
	const storeName = auth.storeName;
	axios
		.get(`${USER_SERVER}/users/getinfo?storeName=${storeName}`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: CART_LOADING,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log("getinfo error", err);
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					"CART_NOT_LOADED"
				)
			);
		});
};

export const getCartItems = (productIds, userCart) => (dispatch, getState) => {

	const { auth }  = getState();	
	const storeName = auth.storeName;
	const req = axios
		.get(
			`${USER_SERVER}/product/product_by_id?id=${productIds}&type=array&storeName=${storeName}`,
			tokenConfig(getState)
		)
		.then((response) => {
			userCart.forEach((cartItem) => {
				response.data.forEach((productDetail, i) => {
					if (productDetail._id == cartItem.id) {
						response.data[i].quantity = cartItem.quantity;
					}
				});
			});

			return response.data;
			//	console.log("cartDetailDAta", req);
		});

	//	console.log("cartDetailDAta", req);

	req.then((value) => {
		dispatch({
			type: CART_LOADED,
			payload: value,
		});
	});
};

export const removeFromCart = (productId) => (dispatch, getState) => {

	const { auth }  = getState();	
	const storeName = auth.storeName;

	console.log("this is remove from cart");
	const req = axios
		.get(
			`${USER_SERVER}/users/removeFromCart?id=${productId}&storeName=${storeName}`,
			tokenConfig(getState)
		)
		.then((res) => {
			res.data.cart.forEach((item) => {
				res.data.cartDetail.forEach((k, i) => {
					res.data.cartDetail[i].quantity = item.quantity;
				});
			});

			return res;
		})
		.catch((err) => {
			returnErrors(
				err.response.data,
				err.response.status,
				"REMOVE_CART_ERROR"
			);
		});

	//	console.log("cartDetailDAta", req);

	req.then((value) => {
		// console.log(
		// 	"this is cartdetail : ",
		// 	value.data.cartDetail,
		// 	"this is cart : ",
		// 	value.data.cart
		// );

		dispatch({
			type: REMOVE_FROM_CART,
			payload: value,
		});
	});
};

export const paymentSuccess = (payment, cartDetail) => (dispatch, getState) => {

	const { auth }  = getState();	
	const storeName = auth.storeName;
	console.log("paymentSucceeFrontenddd");
	axios
		.post(
			`${USER_SERVER}/users/paymentSuccess?storeName=${storeName}`,
			{
				payment,
				cartDetail,
			},
			tokenConfig(getState)
		)
		.then((res) => {
			dispatch({
				type: PAYMENT_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log("getinfo error", err);
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					"PAYMENT_UNSUCCESSFUL"
				)
			);
		});
};

export const loadStore = (storeName) => (dispatch) => {
	console.log("this is from redux", storeName);
	dispatch({
		type: LOAD_STORE,
		payload: storeName,
	});
	//headers
	const config = {
		"Content-type": "application/json",
	};
};
