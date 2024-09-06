import {Component} from 'react'
import {List} from 'antd'

import DataResource from '../data-resource'
import Film from '../film'
import {GenreDataConsumer} from '../app/genres-data-context'
export default class RatedTab extends Component {
  dataResource = new DataResource()
  state = {
    films: [],
  }
  componentDidMount() {
    this.dataResource.getRated(this.props.session_id).then(res => {
      console.log(res)
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
        console.log(res.results)
        if (res.results) {
          this.setState({films: res.results})
        } else {
          this.setState({films: res})
        }
      })
    }
  }
  render() {
    console.log(this.props)
    let array = this.state.films
    console.log(array)
    let filmList = []
    try {
      filmList = array.map(item => {
        const {title, id, overview, release_date, poster_path, rating, genre_ids} = item
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
                />
              )
            }}
          </GenreDataConsumer>
        )
      })
    } catch {
      filmList = []
    }
    return (
      <List
        itemLayout="vertical"
        grid={{column: 2, gutter: 32}}
        dataSource={filmList}
        renderItem={item => <List.Item>{item} </List.Item>}
      ></List>
    )
  }
}
