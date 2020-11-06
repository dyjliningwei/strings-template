'use strict';

const qs = require('querystring');

function expandTemplate(template, values, opt = {}) {
	const sep = opt.sep || '[]';
	const len = sep.length;

	function escape(s) {
		return [].map
			.call(s, function (char) {
				return '\\' + char;
			})
			.join('');
	}

	const whitespace = '\\s*';
	const left = escape(sep.substr(0, len - 1)) + whitespace;
	const right = whitespace + escape(sep.substr(-1, len));

	function regExp(key) {
		return new RegExp(left + key + right, 'g');
	}

	Object.keys(values).forEach(function (key) {
		const value = String(values[key]).replace(/\$/g, '$$$$');
		template = template.replace(regExp(key), value);
	});
	return template;
};

function parseTemplate(str, vs) {
	if (!str || !vs) return {};

	const vsQs = qs.parse(vs, ';', ':');

	const keys = Object.keys(vsQs);
	const values = Object.values(vsQs);

	const verifyValues = values.every(item => /[0-9]+$/.test(item));

	if (!verifyValues) return {};

	let start = 0;

	let repStr = '';

	for (let i = 0; i < values.length; i++) {
		if (values[i] == 0) {
			const sum = values.slice(i + 1).reduce((prev, next) => ~~prev + ~~next);
			const endLen = str.length - 1 - start - sum;
			repStr += `${keys[i]}:${str.substr(start, endLen)};`;
			start += ~~values[i] + endLen;
		} else {
			repStr += `${keys[i]}:${str.substr(start, values[i])};`;
			start += ~~values[i];
		}
	}

	const rep = qs.parse(repStr, ';', ':');
	return rep;
}

module.exports = {
	expandTemplate,
	parseTemplate
};