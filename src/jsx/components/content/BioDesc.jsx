import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Paragraphe from '../html/Paragraphe';

const BioDesc = inject('HerosStore')(
	observer((props) => {
		const { HerosStore } = props;
		const aliasesLen = props.bio.aliases.length - 1;

		return (
			<div className="d-flex justify-content-between">
				<div className="col pl-0">
					<h3>Biography:</h3>

					<Paragraphe
						class="bio-title-name mb-1"
						title=""
						text={props.bio.fullName.toString()}
					/>

					<p className="bio-title-item mb-1">
						<span>Aliases: </span>
						{props.bio.aliases &&
							props.bio.aliases.map((item, i) => (
								<span className="list" key={`bio-alter-aliases-${i + 1}`}>
									{item}
									{i >= aliasesLen ? ';' : ','}
								</span>
							))}
					</p>

					<Paragraphe
						class="bio-title-item mb-1"
						title="Alter egos: "
						text={props.bio.alterEgos}
					/>

					<Paragraphe
						class="bio-title-item mb-1"
						title="First appearance: "
						text={props.bio.firstAppearance}
					/>

					<Paragraphe
						class="bio-title-item mb-1"
						title="Place of birth: "
						text={props.bio.placeOfBirth}
					/>

					<Paragraphe
						class="bio-title-item mb-1"
						title="Publisher: "
						text={props.bio.publisher}
					/>
				</div>

				<div className="col pr-0">
					<img
						src={props.img}
						onError={(e) => HerosStore.addDefaultSrc(e)}
						className="img-fluid"
						alt={props.bio.fullName.toString()}
					/>
				</div>
			</div>
		);
	})
);

BioDesc.wrappedComponent.propTypes = {
	id: PropTypes.string,
	img: PropTypes.string,
	bio: PropTypes.shape({
		alterEgos: PropTypes.string,
		firstAppearance: PropTypes.string,
		fullName: PropTypes.string,
		placeOfBirth: PropTypes.string,
		publisher: PropTypes.string,
	}),
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default BioDesc;
