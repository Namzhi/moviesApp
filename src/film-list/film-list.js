import React, {Component} from 'react'
import {Offline} from 'react-detect-offline'
import {Alert, Spin} from 'antd'
import {debounce} from 'lodash'

import Film from '../film'
import DataResourse from '../data-resource'

export default class FilmList extends Component {
  state = {
    films: null,
    loading: true,
    page: 1,
    error: false,
  }

  dataResourse = new DataResourse()

  debouncedUpdateFilm = debounce((url, page) => {
    this.updateFilm(url, page)
  }, 500)

  componentDidMount() {
    // this.updateFilm(this.props.value, this.state.page)
  }

  componentDidUpdate(prevProps) {
    const {page, value} = this.props
    if (page !== prevProps.page) {
      this.updateFilm(value, page)
    }
    if (value !== prevProps.value) {
      this.debouncedUpdateFilm(value, page)
    }
  }

  onFilmLoaded = films => {
    this.setState({
      films,
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

  updateFilm = (url, page) => {
    this.setState({loading: true})
    this.dataResourse.getFilms(url, page).then(this.onFilmLoaded).catch(this.onError)
  }

  render() {
    const {films, loading, error} = this.state
    const {page, value} = this.props
    // console.log('page' + page)
    if (!films) {
      return null
    }

    const filmList = films.map(item => {
      const {title, id, overview, release_date, img} = item
      return <Film key={id} title={title} id={id} img={img} overview={overview} release_date={release_date} />
    })
    // filmList = filmList.length === 0 ? 'null' : filmList
    const hasData = !(loading || error)
    const errorMessage = error ? <Alert message="Error" type="error" /> : null

    const spinner = loading ? <Spin size="large" /> : null

    const content = !hasData ? null : filmList.length === 0 && value !== '' ? (
      'нет результатов'
    ) : (
      <ul className="list">{filmList}</ul>
    )
    console.log(page)

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
