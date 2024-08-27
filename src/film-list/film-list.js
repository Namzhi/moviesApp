import {Component} from 'react'
import {Alert, Spin} from 'antd'
import {Offline} from 'react-detect-offline'

import App from '../app'
import Film from '../film'
// import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator/error-indicator'

export default class FilmList extends Component {
  constructor() {
    super()
    this.state = {
      films: null,
      loading: true,
    }
    this.app = new App()

    // Инициализация загрузки данных в конструкторе
    this.updateFilm()
  }

  onFilmLoaded = films => {
    this.setState({
      films: films,
      loading: false,
      error: false,
    })
  }
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }
  updateFilm() {
    this.app.getFilms().then(this.onFilmLoaded).catch(this.onError)
  }

  render() {
    const {films, loading, error} = this.state
    // const {checkLoad} = this.props
    if (!films) {
      // return <div>Loading...</div>
      return <Spin />
    }
    // Генерация списка фильмов
    const filmList = films.map(item => {
      const {title, id, overview, release_date, img} = item
      return <Film key={id} title={title} id={id} img={img} overview={overview} release_date={release_date} />
    })
    const hasData = !(loading || error)
    const errorMessage = error ? <Alert message="Error" type="error" /> : null
    console.log(<ErrorIndicator />)
    const spinner = loading ? <Spin size="large" /> : null
    const content = hasData ? <ul className="list">{filmList}</ul> : null
    console.log(loading)
    return (
      <div className="ul-wrapper">
        {errorMessage}
        {/* <Online>Only shown when you're online</Online> */}
        <Offline>Only shown offline (surprise!)</Offline>
        {spinner}
        {content}
        {/* <Film /> */}
      </div>
    )
  }
}
