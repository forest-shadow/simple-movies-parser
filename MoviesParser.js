const fs = require('fs')
const {getMovie, getPoster} = require('./movieProviders')

const DATA_DIR = __dirname + '/data'
const POSTER_DIR = DATA_DIR + '/posters'

const savePoster = (movie) => {
  getPoster(movie, (movieTitle, posterBuffer) => {
    let writeStream = fs.createWriteStream(`${POSTER_DIR}/${movieTitle}.jpg`)
    writeStream.write(posterBuffer)
    writeStream.on('error', (error) => {
      console.error(error)
    })
    writeStream.on('finish', () => {
      console.log(`${movieTitle} poster was downloaded.`)
    })
    writeStream.end()
})
}

const parse = async (URLS, savePosters = false) => {
    const moviePromises = URLS.map(url => getMovie(url));
    const movies = await Promise.all(moviePromises);

    if (!fs.existsSync(DATA_DIR)){
      fs.mkdirSync(DATA_DIR);
    }

    if(savePosters) {
      if (!fs.existsSync(POSTER_DIR)){
        fs.mkdirSync(POSTER_DIR);
      }
      movies.forEach(movie => {
        savePoster(movie)
      })
    }
    fs.writeFileSync(DATA_DIR + '/movies.json', JSON.stringify({ movies }), 'utf-8')
}

module.exports = parse;