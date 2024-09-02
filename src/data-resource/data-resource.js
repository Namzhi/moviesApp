import {Component} from 'react'
// import { Pagination } from 'antd'
export default class DataResourse extends Component {
  // debouncedGetFilms = debounce(this.getFilms.bind(this), 500)

  async getResource(url, page) {
    console.log(url)
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${url}&page=${page}`, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yjk1Y2M4MmE3MGU2ZDc5MjI0OWMwYTlhZTZjZGQyZSIsIm5iZiI6MTcyMzk4Mzg0OS4xNTA3MzIsInN1YiI6IjY2YzFiZjE0NGVlYjNlMmI0NGQ5ZjQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4KNETsvMq-f0yQpwi0A7qIgp_JWxPBaA494oAAdnXp4',
        accept: 'application/json',
      },
    })

    return await response.json()
  }

  async getFilms(url, page) {
    const films = await this.getResource(url, page)
    return films.results.map(this._transformFilm)
  }
  //   async getFilm() {
  //     const film = await this.getResource('return', 3)
  //     return this._transformFilm(film)
  //   }
  _transformFilm(film) {
    return {
      id: film.id,
      title: film.title,
      img: film.backdrop_path === null ? null : `https://image.tmdb.org/t/p/w500${film.backdrop_path}`,
      overview: film.overview,
      release_date: film.release_date,
    }
  }
  render() {
    // const {handlePage} = handlePage
    return 1
  }
}
