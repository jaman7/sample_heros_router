import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const Input = inject('HerosStore')(
	observer((props) => {
		const { HerosStore } = props;
		const all = HerosStore.ListsRemaining;

		return (
			<div className="col-12">
				<div className="d-flex align-items-center py-5">
					<div className="form-group mb-0" role="presentation">
						<label className="search-label mb-0" htmlFor="search-input">
							<input
								className="form-control"
								type="text"
								id="search-input"
								name="search-input"
								maxLength={100}
								aria-required="true"
								placeholder="Search..."
								ref={HerosStore.herosInputSearch}
								onChange={(event) => HerosStore.handleOnInputChange(event)}
							/>
						</label>
					</div>
					<p className="mb-0 ml-5">item: {all}</p>
				</div>
			</div>
		);
	})
);

Input.wrappedComponent.propTypes = {
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Input;
