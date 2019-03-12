import PropTypes from "prop-types";
import React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import SiteSubscriptionDetail from "./SiteSubscriptionDetail";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { ListTable } from "./Tables";
import { Paper } from "./PaperStyles";
const messages = defineMessages( {
	manageTitle: {
		id: "siteSubscriptions.overview.title",
		defaultMessage: "Subscriptions",
	},
} );

/**
 * Creates Site Subscriptions container element
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} SiteSubscriptions element.
 * @constructor
 */
function SiteSubscriptionDetailList( props ) {
	return (
		<Paper>
			<CollapsibleHeader title={ props.intl.formatMessage( messages.manageTitle ) } isOpen={ true }>
				<ListTable
					invertZebra={ true }
				>
					{ props.plugins.map( ( plugin ) => {
						const onToggleDisabled = () => {
							return props.onToggleDisabled( plugin.storeUrl );
						};

						return <SiteSubscriptionDetail
							{ ...plugin }
							key={ plugin.glNumber || plugin.id }
							onMoreInfoClick={ props.onMoreInfoClick }
							onToggleDisabled={ onToggleDisabled }
							onToggleSubscription={ props.onToggleSubscription }
							modalOpen={ props.modalOpen }
							onClose={ props.onClose }
							onShop={ plugin.storeUrl }
							onDownloadModalOpen={ props.onDownloadModalOpen }
						/>;
					} ) }
				</ListTable>
			</CollapsibleHeader>
		</Paper>
	);
}

SiteSubscriptionDetailList.propTypes = {
	plugins: PropTypes.arrayOf( PropTypes.object ).isRequired,
	onMoreInfoClick: PropTypes.func.isRequired,
	onToggleSubscription: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	modalOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onToggleDisabled: PropTypes.func.isRequired,
	onDownloadModalOpen: PropTypes.func,
};

SiteSubscriptionDetailList.defaultProps = {
	onDownloadModalOpen: () => {},
	modalOpen: false,
};

export default injectIntl( SiteSubscriptionDetailList );