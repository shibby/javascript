import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "../../Button.js";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { addPlaceholderStyles } from "../../../styles/inputs";
import defaults from "../../../config/defaults.json";

// import ErrorDisplay from "../errors/ErrorDisplay";
import { ModalHeading } from "../../Headings";

const CreateTokenModal = styled.div`
	margin: auto;
	font-weight: 300;
	font-size: 1em;

	label {
		display: inline-block;
		font-weight: 300;
		font-size: 1em;
		margin: 16px 0 8px;
	}
`;

const TokenDescription = addPlaceholderStyles( styled.input`
	width: 100%;
	height: 48px;
	box-shadow: inset 0 2px 8px 0px rgba(0,0,0,0.3);
	background: ${ colors.$color_grey };
	padding: 0 0 0 10px;
	font-size: 1em;
	border: 0;
` );

const Buttons = styled.div`
	flex: 1 0 200px;
	text-align: right;
	margin: 32px 0 16px;

	a,
	button {
		margin-left: 12px;
	}

	@media screen and (max-width: ${ defaults.css.breakpoint.mobile }px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		a,
		button {
			margin-left: 0;
			margin-bottom: 8px;
		}
	}
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );


class CreateToken extends React.Component {
	/**
	 * Initializes the class with the specified props.
	 *
	 * @param {Object} props The props to be passed to the class that was extended from.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			tokenDescriptionInput: "",
		};
	}

	/**
	 * Calls onChange function when website url changes.
	 *
	 * @param {Object} event The event returned by the WebsiteURLChange.
	 *
	 * @returns {void}
	 */
	onTokenDescriptionChange( event ) {
		const value = event.target.value;
		this.setState( {
			tokenDescriptionInput: value,
		} );
	}

	/**
	 * Handles the submit event.
	 *
	 * @param {object} event The submit event.
	 *
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		if ( this.state.tokenDescriptionInput !== "" ) {
			this.props.onCreateClick();
		}
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<CreateTokenModal>
				<ModalHeading>
					<FormattedMessage id="profile.createToken.header" defaultMessage="Create token"/>
				</ModalHeading>

				<form onSubmit={ this.handleSubmit.bind( this ) } noValidate>
					<label htmlFor="create-token-description-input">
						<FormattedMessage
							id="profile.create-token.token-description"
							defaultMessage="Please enter a description for the token you want to create:"
						/>
					</label>

					<TokenDescription
						type="text"
						id="create-token-description-input"
						placeholder={ "What's this token for?" }
						value={ this.state.tokenDescriptionInput }
						onChange={ this.onTokenDescriptionChange.bind( this ) }
					/>

					{
						/* <ErrorDisplay error={ this.props.error } /> */
					}

					<Buttons>
							<WideSecondaryButton onClick={ this.props.onClose } >
								<FormattedMessage id="profile.createToken.cancel" defaultMessage="cancel"/>
							</WideSecondaryButton>
							<WideLargeButton
								type="submit"
								aria-label="create token"
							>
								<FormattedMessage id="profile.create-sites.create" defaultMessage="create token"/>
							</WideLargeButton>
					</Buttons>
				</form>
			</CreateTokenModal>
		);
	}
}

CreateToken.propTypes = {
	intl: intlShape.isRequired,
	onChange: PropTypes.func.isRequired,
	onCreateClick: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default injectIntl( CreateToken );
