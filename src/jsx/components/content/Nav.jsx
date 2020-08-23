import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const Nav = inject('HerosStore')(
	observer((props) => {
		const { HerosStore } = props;
		return (
			<nav id="menu" className="navbar navbar-expand-md navbar-dark" role="navigation">
				<div className="container">
					<Link to={`/${HerosStore.baseURL}`} className="navbar-brand">
						<img
							className="brand-light img-fluid main-brand"
							src="img/todo.png"
							alt="logo"
						/>
						<h1 className="title-brand py-0">
							<span className="title-brand-big">React APP</span>
							<span className="title-brand-small">jsDevPro</span>
						</h1>
					</Link>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarToggler"
						aria-controls="navbarToggler"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse navbar-collapse justify-content-end"
						id="navbarToggler"
					>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link to={`/${HerosStore.baseURL}`}>
									<i className="fas fa-home" />
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	})
);

Nav.wrappedComponent.propTypes = {
	HerosStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Nav;
