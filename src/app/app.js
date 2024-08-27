import {Component} from 'react'

// import PropTypes from 'prop-types'
import FilmList from '../film-list'
// import {Flex} from 'antd'
import '../index.css'
export default class App extends Component {
  // state = {loading: true}

  async getResource(url) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${url}`, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yjk1Y2M4MmE3MGU2ZDc5MjI0OWMwYTlhZTZjZGQyZSIsIm5iZiI6MTcyMzk4Mzg0OS4xNTA3MzIsInN1YiI6IjY2YzFiZjE0NGVlYjNlMmI0NGQ5ZjQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4KNETsvMq-f0yQpwi0A7qIgp_JWxPBaA494oAAdnXp4',
        accept: 'application/json',
      },
    })
    return await response.json()
  }

  async getFilms() {
    const films = await this.getResource('return')
    // console.log(films.results)
    return films.results.map(this._transformFilm)
  }
  async getFilm() {
    const film = await this.getResource('return')
    return this._transformFilm(film)
  }
  _transformFilm(film) {
    return {
      id: film.id,
      title: film.title,
      img: film.backdrop_path === null ? null : `https://image.tmdb.org/t/p/w500${film.backdrop_path}`,
      overview: film.overview,
      release_date: film.release_date,
    }
  }
  // checkLoad() {
  //   this.setState(() => {
  //     return {loading: false}
  //   })
  // }
  render() {
    // this.getFilms()
    console.log(this.checkLoad)
    return (
      <div className="wrapper">
        <FilmList getFilms={this.getFilms} />
      </div>
    )
  }
}
