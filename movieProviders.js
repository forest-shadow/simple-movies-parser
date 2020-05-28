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
		const $ = cheerio.load(result.body);
		const title = $('.title_wrapper > h1').text().trim();
		const imdbRating = $('.imdbRating span[itemprop="ratingValue"]').text();
		const totalRating = $('.imdbRating > a').text();
		const poster = $('.poster img').attr('src');
		const releaseDate = $('.title_wrapper .subtext a:last-child').text().trim();
		const genres = $('.title_wrapper .subtext a[href^="/search/title?genres"]').toArray().map(el => $(el).text());
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

const getPoster = async (movie, cb) => {
	let imageResponse;

	try {
		imageResponse = await got.get(movie.poster, {
			headers: {
				'accept-encoding': 'gzip, deflate, br',
				'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
				'Content-Encoding': 'gzip'
			}
		})

		if(imageResponse.rawBody) {
			cb(movie.title, imageResponse.rawBody)
		}

	} catch(e) {
		console.error(e)
	}
}

module.exports = { getMovie, getPoster }