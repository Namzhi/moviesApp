import React, {Component} from 'react'
import {Offline} from 'react-detect-offline'
import {Alert, Spin, List} from 'antd'
import {debounce} from 'lodash'

import Film from '../film'
import DataResource from '../data-resource'
import {GenreDataConsumer} from '../genres-data-context'
export default class FilmList extends Component {
  state = {
    films: null,
    loading: true,
    page: 1,
    error: false,
    genres: null,
  }

  dataResource = new DataResource()

  debouncedUpdateFilm = debounce((url, page) => {
    this.updateFilm(url, page)
  }, 500)
  componentDidMount() {
    this.dataResource
      .getPopular()
      .then(res => res.results.map(this.dataResource._transformFilm))
      .then(this.onFilmLoaded)
      .catch(this.onError)
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
    this.dataResource.getFilms(url, page).then(this.onFilmLoaded).catch(this.onError)
  }

  render() {
    const {films, loading, error} = this.state
    const {value, session_id} = this.props
    if (!films) {
      return null
    }
    const filmList = films.map(item => {
      const {title, id, overview, release_date, img, genre_ids, vote_average} = item
      return (
        <GenreDataConsumer key={id}>
          {getGenre => {
            return (
              <>
                <Film
                  key={id}
                  title={title}
                  id={id}
                  img={img}
                  overview={overview}
                  release_date={release_date}
                  session_id={session_id}
                  genres={getGenre(genre_ids)}
                  vote_average={vote_average}
                />
              </>
            )
          }}
        </GenreDataConsumer>
      )
    })
    const hasData = !(loading || error)
    const errorMessage = error ? <Alert message="Error" type="error" /> : null

    const spinner = loading ? <Spin size="large" /> : null
    console.log(window.innerWidth)
    const content = !hasData ? null : filmList.length === 0 && value !== '' ? (
      'нет результатов'
    ) : (
      <List
        className="film-list__list-element"
        itemLayout={'vertical'}
        grid={{gutter: 36, column: 2, md: 2, sm: 1, xs: 1}}
        dataSource={filmList}
        renderItem={item => <List.Item>{item}</List.Item>}
      ></List>
    )

    return (
      <>
        {errorMessage}
        <Offline>Only shown offline (surprise!)</Offline>
        {spinner}
        {content}
      </>
    )
  }
}
