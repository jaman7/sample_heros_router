import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import ProgressBarLine from './ProgressBarLine';

const PowerDesc = inject('HerosStore')(
	observer((props) => {
		return (
			<>
				<h3>Powerstats:</h3>
				<>
					{Object.keys(props.power).map((item, i) => (
						<div
							key={`power-desc-${props.id}-${item}`}
							className="d-flex flex-row align-items-center"
							role="presentation"
						>
							<div className="col-3 px-0 py-1 d-flex flex-row justify-content-between align-items-center">
								<span className="title-power mr-1" role="presentation">
									{item}
								</span>
								<img
									className="img-fluid img-power mr-1"
									src={`img/${props.HerosStore.powersvg[i]}`}
									alt={item}
								/>
							</div>
							<div className="col-9 px-0">
								<ProgressBarLine
									index={parseInt(props.id, 10)}
									item_index={parseInt(i, 10)}
									power={parseInt(props.power[item], 10)}
								/>
							</div>
						</div>
					))}
				</>
			</>
		);
	})
);

PowerDesc.wrappedComponent.propTypes = {
	power: PropTypes.shape({
		combat: PropTypes.string,
		durability: PropTypes.string,
		intelligence: PropTypes.string,
		power: PropTypes.string,
		speed: PropTypes.string,
		strength: PropTypes.string,
	}),
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default PowerDesc;
