/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
// import { toJS } from 'mobx';

import BioDesc from '../content/BioDesc';
import PowerDesc from '../content/PowerDesc';
import ImgLoader from '../html/ImgLoader';

@inject('HerosStore')
@observer
class HerosDetail extends Component {
	async componentDidMount() {
		// let condition = false;
		const { HerosStore } = this.props;
		const pathName = window.location.pathname.split('/');
		const pathNameLen = pathName.length - 1;

		if (!Object.keys(HerosStore.heroitem).length) {
			HerosStore.RetrieveId(pathName[pathNameLen]);
		}
	}

	render() {
		const { HerosStore } = this.props;
		// console.log(toJS(HerosStore.heroitem));

		return (
			<>
				<article className="container">
					<div className="row">
						<div className="col-12 py-4">
							<Link to={`/${HerosStore.baseURL}`}>
								<i className="fas fa-undo-alt" /> Back
							</Link>
						</div>

						<div className="col-12 col-sm-6">
							{!HerosStore.isloading && !HerosStore.errors ? (
								<BioDesc
									key={HerosStore.heroitem.id}
									bio={HerosStore.heroitem.biography}
									img={HerosStore.heroitem.image.url}
								/>
							) : (
								<ImgLoader />
							)}
						</div>
						<div className="col-12 col-sm-6">
							{!HerosStore.isloading && !HerosStore.errors ? (
								<PowerDesc
									key={HerosStore.heroitem.id}
									power={HerosStore.heroitem.powerstats}
								/>
							) : (
								<ImgLoader />
							)}
						</div>
					</div>
				</article>
			</>
		);
	}
}

HerosDetail.wrappedComponent.propTypes = {
	heroitem: PropTypes.shape({
		id: PropTypes.number,
		image: PropTypes.shape({
			url: PropTypes.string,
		}),
		biography: PropTypes.objectOf(PropTypes.object),
		powerstats: PropTypes.objectOf(PropTypes.object),
	}),
	HerosStore: PropTypes.objectOf(PropTypes.object),
};

export default HerosDetail;
