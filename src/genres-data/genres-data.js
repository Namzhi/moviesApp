import {Component} from 'react'

// import {DataResourceConsumer} from '../data-resource-context'

export class GenresData extends Component {
  state = {
    genres: null,
  }
  genres = this.getGenres()

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
  async setGenres() {
    this.getGenres().then(res => {
      this.setState({genres: res.genres})
    })
  }
  render() {
    this.getGenres().then(res => {
      console.log(res)
      this.setState({genres: res.genres})
    })
    // const genreList = this.state.genres.map(el => el)
    return <>{123}</>
  }
}
