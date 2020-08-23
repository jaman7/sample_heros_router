import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const Paragraphe = inject('HerosStore')(
	observer((props) => {
		return (
			<p className={props.class}>
				<span>{props.title} </span>
				{props.text}
			</p>
		);
	})
);

Paragraphe.wrappedComponent.propTypes = {
	title: PropTypes.string,
	text: PropTypes.string,
	class: PropTypes.string,
};

export default Paragraphe;
