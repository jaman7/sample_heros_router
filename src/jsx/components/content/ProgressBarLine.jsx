import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBarLine = inject('HerosStore')(
	observer((props) => {
		const { HerosStore } = props;
		const novalue = !!HerosStore.checkIfNull(props.power);
		return !novalue ? (
			<ProgressBar
				key={`bar-${props.index}-${props.item_index}`}
				className="w-100 ml-1"
				now={props.power}
				label={`${props.power}%`}
			/>
		) : (
			<p className="mb-0">: no info</p>
		);
	})
);

ProgressBarLine.wrappedComponent.propTypes = {
	index: PropTypes.number,
	item_index: PropTypes.number,
	power: PropTypes.number,
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ProgressBarLine;
