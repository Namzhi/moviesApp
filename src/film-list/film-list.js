import React, {Component} from 'react'
import {Offline} from 'react-detect-offline'
import {Alert, Spin, List} from 'antd'
import {debounce} from 'lodash'

// import {GenreDataConsumer} from '../app/genres-data-context'
import Film from '../film'
import DataResource from '../data-resource'
// import {GenresData} from '../genres-data/genres-data'
// import {DataResourceConsumer} from '../data-resource-context'
import {GenreDataConsumer} from '../app/genres-data-context'
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
    const {page, value, session_id} = this.props
    if (!films) {
      return null
    }
    // this.getGenre()
    const filmList = films.map(item => {
      const {title, id, overview, release_date, img, genre_ids, vote_average} = item
      return (
        <GenreDataConsumer key={id}>
          {getGenre => {
            // console.log(getGenre(28))
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
                {/* <GenresData /> */}
              </>
            )
          }}
        </GenreDataConsumer>
      )
    })
    const hasData = !(loading || error)
    const errorMessage = error ? <Alert message="Error" type="error" /> : null

    const spinner = loading ? <Spin size="large" /> : null

    const content = !hasData ? null : filmList.length === 0 && value !== '' ? (
      'нет результатов'
    ) : (
      <List
        itemLayout="vertical"
        grid={{column: 2, gutter: 32}}
        dataSource={filmList}
        renderItem={item => <List.Item>{item} </List.Item>}
      ></List>
    )
    console.log(page)

    return (
      <div className="ul-wrapper">
        {errorMessage}
        {/* <Online>Only shown when you're online</Online> */}
        <Offline>Only shown offline (surprise!)</Offline>
        {spinner}
        {/* {genres} */}
        {content}

        {/* <Film /> */}
      </div>
    )
  }
}
