const got = require('got');
const cheerio = require('cheerio');

const getMovie = async url => {
	try {
		const result = await got.get(url, {
			headers: {
				'accept-encoding': 'gzip, deflate, br',
				'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
				'Content-Encoding': 'gzip'
			}
		});
		let $ = cheerio.load(result.body);
		let title = $('.title_wrapper > h1').text().trim();
		let imdbRating = $('.imdbRating span[itemprop="ratingValue"]').text();
		let totalRating = $('.imdbRating > a').text();
		let poster = $('.poster img').attr('src');
		let releaseDate = $('.title_wrapper .subtext a:last-child').text().trim();
		let genres = $('.title_wrapper .subtext a[href^="/search/title?genres"]').toArray().map(el => $(el).text());
		return Promise.resolve({
			title,
			imdbRating,
			poster,
			totalRating,
			releaseDate,
			genres
		});
	} catch (e) {
		console.error(e);
	}
};

module.exports = getMovie;