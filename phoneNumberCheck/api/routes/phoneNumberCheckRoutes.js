'use strict';

module.exports = function(app) {
	var phoneNumberCheck = require('../controllers/phoneNumberCheckController');

	app.route('/ndcs')
		.get(phoneNumberCheck.list_all_ndcs)
		.post(phoneNumberCheck.create_an_ndc);

	app.route('/ndcs/check/:phoneNumber')
		.get(phoneNumberCheck.check_a_phoneNumber)

	app.route('/ndcs/:ndcId')
		.get(phoneNumberCheck.read_an_ndc)
		.put(phoneNumberCheck.update_an_ndc)
		.delete(phoneNumberCheck.delete_an_ndc);
};
