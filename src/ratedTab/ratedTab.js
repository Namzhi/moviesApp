import {Component} from 'react'
import {List, Pagination, Alert} from 'antd'

import DataResource from '../data-resource'
import Film from '../film'
import {GenreDataConsumer} from '../genres-data-context'
export default class RatedTab extends Component {
  dataResource = new DataResource()
  state = {
    films: [],
    page: 1,
    hasError: false,
  }
  componentDidMount() {
    this.dataResource.getRated(this.props.session_id).then(res => {
      if (res.results) {
        this.setState({films: res.results})
      } else {
        this.setState({films: res})
      }
    })
  }
  componentDidUpdate(prevProps) {
    if (this.props.activeKey !== prevProps.activeKey) {
      this.dataResource.getRated(this.props.session_id).then(res => {
        if (res.results) {
          this.setState({films: res.results})
        } else {
          this.setState({films: res})
        }
      })
    }
  }
  componentDidCatch() {
    this.setState({
      hasError: true,
    })
  }
  render() {
    let array = this.state.films
    let filmList = []
    try {
      filmList = array.map(item => {
        const {title, id, overview, release_date, poster_path, rating, genre_ids, vote_average} = item
        return (
          <GenreDataConsumer key={id}>
            {getGenre => {
              return (
                <Film
                  key={id}
                  title={title}
                  id={id}
                  img={poster_path === null ? null : `https://image.tmdb.org/t/p/w500${poster_path}`}
                  overview={overview}
                  release_date={release_date}
                  session_id={this.props.session_id}
                  rating={rating}
                  genres={getGenre(genre_ids)}
                  vote_average={vote_average}
                />
              )
            }}
          </GenreDataConsumer>
        )
      })
    } catch {
      filmList = []
    }
    if (this.state.hasError) {
      return <Alert message="Error" type="error"></Alert>
    }
    return (
      <div className="filmTab">
        <List
          className="film-list__list-element"
          itemLayout={'vertical'}
          grid={{gutter: 36, column: 2, md: 2, sm: 1, xs: 1}}
          dataSource={filmList}
          renderItem={item => <List.Item>{item}</List.Item>}
        ></List>

        <Pagination className="footer__pagination" current={this.state.page} />
      </div>
    )
  }
}
