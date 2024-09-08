import {Component} from 'react'
export default class DataResource extends Component {
  state = {
    genres: null,
  }
  async auth() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yjk1Y2M4MmE3MGU2ZDc5MjI0OWMwYTlhZTZjZGQyZSIsIm5iZiI6MTcyNTQzODU1MS4wNjAyNDQsInN1YiI6IjY2YzFiZjE0NGVlYjNlMmI0NGQ5ZjQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Brr00rH5k0t-DFK8WE38rNEEWeM1_fDnDZHWDmE77o',
      },
    }
    const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
    return await response.json()
  }
  async getGenres() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yjk1Y2M4MmE3MGU2ZDc5MjI0OWMwYTlhZTZjZGQyZSIsIm5iZiI6MTcyNTQzODU1MS4wNjAyNDQsInN1YiI6IjY2YzFiZjE0NGVlYjNlMmI0NGQ5ZjQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Brr00rH5k0t-DFK8WE38rNEEWeM1_fDnDZHWDmE77o',
      },
    }

    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    return await response.json()
  }

  async rateFilm(movie, rating, guest_session_id) {
    console.log(movie, rating, guest_session_id)
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yjk1Y2M4MmE3MGU2ZDc5MjI0OWMwYTlhZTZjZGQyZSIsIm5iZiI6MTcyNTQzODU1MS4wNjAyNDQsInN1YiI6IjY2YzFiZjE0NGVlYjNlMmI0NGQ5ZjQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Brr00rH5k0t-DFK8WE38rNEEWeM1_fDnDZHWDmE77o',
      },
      body: `{"value":${rating}}`,
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie}/rating?guest_session_id=${guest_session_id}`,
      options
    )
    return await response.json()
  }
  async getRated(guest_session) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yjk1Y2M4MmE3MGU2ZDc5MjI0OWMwYTlhZTZjZGQyZSIsIm5iZiI6MTcyNTQzODU1MS4wNjAyNDQsInN1YiI6IjY2YzFiZjE0NGVlYjNlMmI0NGQ5ZjQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Brr00rH5k0t-DFK8WE38rNEEWeM1_fDnDZHWDmE77o',
      },
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guest_session}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      options
    )
    return await response.json()
  }
  async getPopular() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yjk1Y2M4MmE3MGU2ZDc5MjI0OWMwYTlhZTZjZGQyZSIsIm5iZiI6MTcyNTczMDkzNC4wNTQ0NDUsInN1YiI6IjY2YzFiZjE0NGVlYjNlMmI0NGQ5ZjQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uacGn3n6_Fil8ykbpIGo43gF1bx8P8ERyOaf112gQls',
      },
    }

    const response = fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    return (await response).json()
  }
  async getResource(url, page) {
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

  _transformFilm(film) {
    // console.log(film)
    return {
      id: film.id,
      title: film.title,
      img:
        film.poster_path === null
          ? 'https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg'
          : `https://image.tmdb.org/t/p/w500${film.poster_path}`,
      overview: film.overview,
      release_date: film.release_date,
      genre_ids: film.genre_ids,
      vote_average: film.vote_average,
    }
  }
}
