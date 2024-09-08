import {Component} from 'react'
import {Tabs} from 'antd'

import '../index.css'

import DataResource from '../data-resource'
import FilmTab from '../filmTab'
import RatedTab from '../ratedTab'
import FilmList from '../film-list'
import {DataResourceProvider} from '../data-resource-context'
import {GenreDataProvider} from '../genres-data-context'

export default class App extends Component {
  state = {
    page: 1,
    search: '',
    value: '',
    tab: 1,
  }
  dataResource = new DataResource()
  filmList = new FilmList()
  items = [
    {
      key: '1',
      label: 'Search',
      children: null,
    },
    {
      key: '2',
      label: 'Rated',
      children: null,
    },
  ]
  componentDidMount() {
    this.dataResource.auth().then(res => {
      console.log(res)
      this.setState({session: res.guest_session_id})
      this.items[0].children = <FilmTab session_id={res.guest_session_id} page={this.state.page} />
    })
    this.dataResource.getGenres().then(res => this.setState({genres: res.genres}))
  }

  handleSearch = e => {
    this.setState({
      value: e.target.value,
      page: 1,
    })
  }
  getGenre = id => {
    const genres = this.state.genres
    let array = []
    id.map(id => genres.map(el => (el.id === id ? array.push(el.name) : null)))
    return array
  }

  onChange = activeKey => {
    this.setState({activeKey: activeKey})

    this.items[1].children = <RatedTab session_id={this.state.session} activeKey={activeKey} />
  }
  render() {
    return (
      <DataResourceProvider value={this.dataResource}>
        <GenreDataProvider value={this.getGenre}>
          <Tabs
            onChange={this.onChange}
            defaultActiveKey="1"
            items={this.items}
            centered
            size="large"
            className="app__wrapper"
          />
        </GenreDataProvider>
      </DataResourceProvider>
    )
  }
}
