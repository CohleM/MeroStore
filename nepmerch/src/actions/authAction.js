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
} from "./types";
import { USER_SERVER } from "../components/config";
import axios from "axios";
import { returnErrors, clearErrors } from "./errorAction";
//Checking token and loading user

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
	axios
		// .get("http://localhost:5000/users/getinfo", tokenConfig(getState))
		.get(`${USER_SERVER}/users/getinfo`, tokenConfig(getState))
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
export const register = ({ username, email, password }) => (dispatch) => {
	//headers
	const config = {
		"Content-type": "application/json",
	};

	//convert js object to json
	//this stringfy doesn't work fires up error
	const body = JSON.stringify({ username, email, password });
	//console.log(body);
	//now we make a req to the server
	console.log("this executed woow");
	axios
		.post(
			`${USER_SERVER}/users/register`,
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

export const login = ({ email, password }) => (dispatch) => {
	const config = {
		"Content-type": "application/json",
	};

	axios
		.post(
			`${USER_SERVER}/users/login`,
			{
				email,
				password,
			},
			config
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
	axios
		.get(
			`${USER_SERVER}/users/addToCart?id=${productId}`,
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
	axios
		.get(`${USER_SERVER}/users/getinfo`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: CART_LOADING,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log("getinfo error", err);
			dispatch(
				returnErrors(err.response.data, err.response.status, "CART_NOT_LOADED")
			);
		});
};

export const getCartItems = (productIds, userCart) => (dispatch, getState) => {
	const req = axios
		.get(
			`${USER_SERVER}/product/product_by_id?id=${productIds}&type=array`,
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
	console.log("this is remove from cart");
	const req = axios
		.get(
			`${USER_SERVER}/users/removeFromCart?id=${productId}`,
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
			returnErrors(err.response.data, err.response.status, "REMOVE_CART_ERROR");
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
	console.log("paymentSucceeFrontenddd");
	axios
		.post(
			`${USER_SERVER}/users/paymentSuccess`,
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
