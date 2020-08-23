import React from 'react';
import { inject, observer } from 'mobx-react';

const ImgLoader = inject('HerosStore')(
	observer(() => {
		return <img src="img/ajax_loader_blue_300.gif" alt="loader" className="img-fluid" />;
	})
);

export default ImgLoader;
