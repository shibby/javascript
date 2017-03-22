import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { NavLink, Route } from "react-router-dom";

const activeStyle = "active-class-name";

const Menu = styled.nav`
	clear: both;

	& ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	& li {
		display: inline;
	}

	@media screen and ( max-width: 1024px ) {
		margin: 0 4%; /* Same margin as main content. */
		text-align: center;
	}
`;

const MenuItem = styled( NavLink )`
	display: block;
	height: 100px;
	line-height: 100px;
	font-size: 22px;
	font-weight: 300;
	padding-left: 25px;
	margin-left: 25px;
	margin-right: 25px;
	color: ${colors.$color_background_light};
	text-decoration: none;

	&.${ activeStyle } {
		color: ${colors.$color_border};
		background-color: ${colors.$background};
		box-shadow: inset 0px 2px 8px 0px rgba(0, 0, 0, 0.3);
		font-weight: 400;
		color: ${colors.$color_pink_dark};
	}

	@media screen and ( max-width: 1024px ) {
		display: inline-block;
		width: 100px;
		max-width: 25%;
		height: 74px;
		margin: 0;
		padding: 8px 0 0;
		border-bottom: 5px solid transparent;
		box-shadow: none;
		color: ${colors.$color_white};
		font-size: 12px;
		font-weight: 400;
		line-height: inherit;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		&.${ activeStyle } {
			border-bottom: 5px solid ${colors.$color_white};
			color: ${colors.$color_white};
			background-color: transparent;
			box-shadow: none;
		}
	}
`;

const MenuIcon = styled.img`
	display: none;

	@media screen and ( max-width: 1024px ) {
		display: block;
		width: 40px;
		height: 40px;
		margin: 0 auto -3px;
	}
`;

/**
 * The main menu.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered component.
 */
export function MainMenu( props ) {
	return (
		<Menu>
			<ul role="list">
				{ props.menuRoutes.map( function( page ) {
					return <li key={ page.title }>
						<MenuItem activeClassName={ activeStyle } to={ page.path }>
							<MenuIcon src={ page.icon } alt="" />
							{ page.title }
						</MenuItem>
					</li>;
				}
				) }
			</ul>
		</Menu>
	);
}

MainMenu.propTypes = {
	menuRoutes: React.PropTypes.array.isRequired,
};


/**
 * The main menu routes.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered component.
 */
export function MainMenuRoutes( props ) {
	return (
		<Route>
			<div>
				{ props.menuRoutes.map( function( route, routeKey ) {
					return <Route key={ routeKey } path={ route.path } component={ route.component }/>;
				}
				) }
			</div>
		</Route>

	);
}

MainMenuRoutes.propTypes = {
	menuRoutes: React.PropTypes.array.isRequired,
};
