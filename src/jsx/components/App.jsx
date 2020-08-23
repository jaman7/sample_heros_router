/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';

import Nav from './content/Nav';
import HomeHerosSearchList from './pages/HomeHerosSearchList';
import HerosDetail from './pages/HerosDetail';

@inject('HerosStore')
@observer
class App extends Component {
	async componentDidMount() {
		const { HerosStore } = this.props;
		HerosStore.Retrieve('Batgirl');
	}

	render() {
		const { HerosStore } = this.props;

		return (
			<>
				<Router>
					<Nav />
					<header className="container">
						<div className="row">
							<div className="col-12">
								<h1 className="py-1">
									aplikacja do wyszukiwania postaci|bohaterów filmowych
								</h1>
							</div>
						</div>
					</header>

					<Switch>
						<Route
							exact
							path={`/${HerosStore.baseURL}`}
							component={HomeHerosSearchList}
						/>
						<Route path={`/${HerosStore.baseURL}:id`} component={HerosDetail} />
					</Switch>
				</Router>
			</>
		);
	}
}

App.wrappedComponent.propTypes = {
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default App;
