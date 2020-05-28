const fs = require('fs');
const getMovie = require('./getMovie')

const URLS = [
  'https://www.imdb.com/title/tt0102926/',
  'https://www.imdb.com/title/tt2267998/'
];

(async () => {
  const moviePromises = URLS.map(url => getMovie(url));
  const movies = await Promise.all(moviePromises);
  console.log(JSON.stringify({ movies }));
  fs.writeFileSync('./movies.json', JSON.stringify({ movies }), 'utf-8');
})();
