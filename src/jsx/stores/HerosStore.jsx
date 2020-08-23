import React from 'react';
// eslint-disable-next-line no-unused-vars
import { toJS, observable, action, computed, configure, runInAction } from 'mobx';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { BASE_URL } from '../Constants';

// 'https://thingproxy.freeboard.io/fetch/
// https://api.allorigins.win/raw?url=
// https://yacdn.org/proxy/

axios.defaults.baseURL = 'https://yacdn.org/proxy/https://superheroapi.com/api/3458266114223903/';
axios.defaults.responseType = 'json';

configure({
	enforceActions: 'observed',
});

class HerosStore {
	@observable herosInputSearch = React.createRef();

	@observable heros = [];

	@observable heroitem = [];

	@observable powersvg = [
		'intelligence.svg',
		'strength.svg',
		'speed.svg',
		'durable.svg',
		'fist.svg',
		'boxing.svg',
	];

	@observable baseURL = BASE_URL;

	@observable query = '';

	@observable isloading = true;

	@observable message = '';

	@observable errors = false;

	@action addDefaultSrc = (e) => {
		e.preventDefault();
		e.target.src = 'img/404.png';
	};

	@action findIndex = (currentid) => {
		return this.heros.findIndex((item) => item.id === currentid);
	};

	@action checkErrAndTextLen = (err, text) => {
		if ((text && text.trim().length) || err) {
			return true;
		}
		return false;
	};

	@action checkIfNull = (item) => {
		if (Number.isNaN(item)) {
			return true;
		}
		return false;
	};

	@action setHeroInfo = (hero) => {
		this.heroitem = [];
		this.heroitem = hero;
		// console.log(`id: ${this.heroitem.id}`);
	};

	@action async Retrieve(query = '') {
		// console.log(`queryreal: ${query}`);

		try {
			this.heros = [];
			this.isloading = true;
			const response = await axios.get(`search/${query}`);
			const getHeros = response.data;
			// if (getHeros.response === 'success' && getHeros.response !== 'error') {
			// 	getHeros.results.forEach((hero) => {
			// 		// hero.open = false;
			// 		hero.id = parseInt(hero.id, 10);
			// 		hero.powerstats.combat = parseInt(hero.powerstats.combat, 10);
			// 		hero.powerstats.durability = parseInt(hero.powerstats.durability, 10);
			// 		hero.powerstats.intelligence = parseInt(hero.powerstats.intelligence, 10);
			// 		hero.powerstats.power = parseInt(hero.powerstats.power, 10);
			// 		hero.powerstats.speed = parseInt(hero.powerstats.speed, 10);
			// 		hero.powerstats.strength = parseInt(hero.powerstats.strength, 10);
			// 	});
			// }
			const list = camelcaseKeys(getHeros.results, { deep: true });

			// console.log(toJS(list));

			runInAction(() => {
				if (getHeros.response === 'success') {
					this.message = '';
					this.errors = false;
					this.heros = list;
				} else if (getHeros.response === 'error') {
					this.errors = true;
					this.message = getHeros.error;
					this.heros = [];
				}

				this.isloading = false;
			});
		} catch (error) {
			runInAction(() => {
				this.isloading = false;
				this.message = 'Error loading heros';
				this.errors = true;
			});

			// console.log(this.message);
		}
	}

	@action handleOnInputChange = (event) => {
		event.preventDefault();
		// const query = event.target.value;
		const query = this.herosInputSearch.current.value;
		if (query.trim().length < 2) {
			return null;
		}
		this.Retrieve(query);
		return null;
	};

	@action async RetrieveId(query = '') {
		// console.log(`queryreal: ${query}`);

		try {
			this.heroitem = [];
			this.isloading = true;
			const response = await axios.get(`${query}`);
			const getHeros = response.data;
			const list = camelcaseKeys(getHeros, { deep: true });

			runInAction(() => {
				if (getHeros.response === 'success') {
					this.message = '';
					this.errors = false;
					this.heroitem = list;
				} else if (getHeros.response === 'error') {
					this.errors = true;
					this.message = getHeros.error;
					this.heroitem = [];
				}

				this.isloading = false;
			});
		} catch (error) {
			runInAction(() => {
				this.isloading = false;
				this.message = 'Error loading heros';
				this.errors = true;
			});
		}
	}

	@computed get ListsRemaining() {
		return this.heros.filter((hero) => !hero.completed).length;
	}
}

const store = new HerosStore();

export default store;
