import {Component} from 'react'
import {List, Pagination} from 'antd'

import DataResource from '../data-resource'
import Film from '../film'
import {GenreDataConsumer} from '../genres-data-context'
export default class RatedTab extends Component {
  dataResource = new DataResource()
  state = {
    films: [],
    page: 1,
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

    return (
      <div style={{width: 938, marginLeft: 'auto', marginRight: 'auto'}}>
        <List
          itemLayout="vertical"
          grid={{column: 2, gutter: 36}}
          dataSource={filmList}
          renderItem={item => (
            <List.Item
              style={{
                boxShadow: '0.1rem .2rem .6rem 0.2rem hsla(1, 1%, 70%, 0.300)',

                padding: window.innerWidth >= 768 ? 0 : '.5rem',
              }}
            >
              {item}
            </List.Item>
          )}
        ></List>
        {/* <List
          itemLayout="vertical"
          grid={{column: 2, gutter: 32}}
          dataSource={filmList}
          renderItem={item => <List.Item>{item}</List.Item>}
        > */}
        <Pagination
          current={this.state.page}
          style={{width: 'fit-content', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto'}}
        />
        {/* </List> */}
      </div>
    )
  }
}
