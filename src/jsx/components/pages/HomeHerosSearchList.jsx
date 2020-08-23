/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
// import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Input from '../content/Input';
import Herolists from '../Hero-lists';
import ImgLoader from '../html/ImgLoader';

const HomeHerosSearchList = inject('HerosStore')(
	observer((props) => {
		const { HerosStore } = props;

		return (
			<>
				<div className="container" role="presentation">
					<div className="row">
						<Input />
						<TransitionGroup component={null}>
							{!HerosStore.isloading && !HerosStore.errors ? (
								HerosStore.heros &&
								HerosStore.heros.map((hero, index) => (
									<CSSTransition
										timeout={500}
										classNames="fade"
										key={`fadeLists-${hero.id}`}
									>
										<Herolists
											key={`listitem-${hero.id}`}
											list={hero}
											index={parseInt(index, 10) + 1}
										/>
									</CSSTransition>
								))
							) : (
								<></>
							)}

							{HerosStore.errors && !HerosStore.heros.length ? (
								<p>{HerosStore.message}</p>
							) : (
								<></>
							)}
						</TransitionGroup>

						{HerosStore.isloading && !HerosStore.errors ? (
							<div className="col-12 d-flex justify-content-center">
								<ImgLoader />
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</>
		);
	})
);

HomeHerosSearchList.wrappedComponent.propTypes = {
	HerosStore: PropTypes.objectOf(PropTypes.object),
};

export default HomeHerosSearchList;
