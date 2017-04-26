import React from "react";

/**
 * LineItems.
 *
 * @param {Object} props Properties to be passed to the table.
 * @returns {ReactElement} A row of LineItems.
 */
function LineItems( props ) {
	let items = props.items.map( ( item ) => {
		return <div> { item.id } </div>;
	} );
	return <div> { items } </div>;
}

LineItems.propTypes = {
	items: React.PropTypes.array,
};

LineItems.defaultProps = {
	items: "",
};

export default LineItems;
