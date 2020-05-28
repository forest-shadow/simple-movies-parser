const parse = require('./MoviesParser');

const URLS = [
  'https://www.imdb.com/title/tt0102926/',
  'https://www.imdb.com/title/tt2267998/'
];

{
  parse(URLS, true)
}
