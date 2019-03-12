import "whatwg-fetch";
import { getUserId } from "../functions/auth";
import { prepareInternalRequest, doRequest } from "../functions/api";

/*
 * Action types
 */

export const GET_ORDERS_REQUEST = "GET_ORDERS_REQUEST";
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const GET_ORDERS_FAILURE = "GET_ORDERS_FAILURE";

/*
 * Action creators
 */

/**
 * An action creator for requesting all orders for the current user.
 *
 * @returns {Object} An Orders requests is being sent action.
 */
export function getOrdersRequest() {
	return {
		type: GET_ORDERS_REQUEST,
	};
}

/**
 * An action creator for the retrieval of the orders.
 * @param {Object} json The json object
 * @returns {Object} An Orders retrieved action.
 */
export function getOrdersSuccess( json ) {
	return {
		type: GET_ORDERS_SUCCESS,
		orders: json,
	};
}

/**
 * An action creator for the server request action.
 *
 * @param {string} errorMessage The url to add.
 *
 * @returns {Object} A server request action.
 */
export function getOrdersFailure( errorMessage ) {
	return {
		type: GET_ORDERS_FAILURE,
		message: errorMessage,
	};
}

/**
 * An action creator for retrieving all orders for the current user.
 *
 * @returns {Object} A order retrieval dispatcher.
 */
export function getOrders() {
	return ( dispatch ) => {
		dispatch( getOrdersRequest() );

		const userId = getUserId();
		const request = prepareInternalRequest( `Customers/${userId}/orders/` );

		return doRequest( request )
			.then( json => dispatch( getOrdersSuccess( json ) ) )
			.catch( ( error ) => {
				dispatch( getOrdersFailure( error.message ) );
			} );
	};
}