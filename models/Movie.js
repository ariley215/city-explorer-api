

class Movie {
  constructor(eachMovie) {
    this.title = eachMovie.title;
    this.overview = eachMovie.overview;
    this.aveVotes = eachMovie.vote_average;
    this.totalVotes = eachMovie.vote_count;
    this.image = eachMovie.poster_path;
    this.popular = eachMovie.popularity;
    this.releaseDate = eachMovie.release_date;
  }
}

module.exports = Movie;
