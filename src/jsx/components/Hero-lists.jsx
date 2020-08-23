import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const Herolists = inject('HerosStore')(
	observer((props) => {
		const { HerosStore } = props;

		return (
			<div key={props.index} className="col-12 py-2 bg-list" role="presentation">
				<div className="d-flex flex-row justify-content-between align-items-center todo-item-list">
					<div className="w-50 d-flex">
						<h2 className="list-title mb-0">
							<span>{props.index}. </span>
							<span>{props.list.name}</span>
						</h2>
					</div>
					<div className="w-50 d-flex flex-nowrap justify-content-end align-items-center">
						<img
							src={props.list.image.url}
							onError={(e) => HerosStore.addDefaultSrc(e)}
							className="img-fluid img-hero-list"
							alt={props.list.name}
						/>

						<Link
							className="btn btn-primary stretched-link text-white"
							to={`${props.list.id}`}
							onClick={() => HerosStore.setHeroInfo(props.list)}
						>
							Read more
						</Link>
					</div>
				</div>
			</div>
		);
	})
);

Herolists.wrappedComponent.propTypes = {
	index: PropTypes.number,
	list: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		image: PropTypes.shape({
			url: PropTypes.string,
		}),
	}),
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Herolists;
