import {Component} from 'react'

import FilmList from '../film-list'
import Footer from '../footer'
import '../index.css'
import Search from '../search'
export default class App extends Component {
  state = {
    page: 1,
    search: '',
    value: '',
  }

  handlePage = pageNow => {
    // return this.filmList.updateFilm(page)
    // console.log(this.state.page)
    this.setState({
      page: pageNow,
    })
  }
  // delayedValue = debounce(value => value, 1500)
  handleSearch = e => {
    this.setState({
      value: e.target.value,
      page: 1,
    })
  }
  render() {
    // console.log(this.delayedValue(this.state.value))
    return (
      <>
        <Search handleSearch={this.handleSearch} value={this.state.value} />

        <FilmList page={this.state.page} value={this.state.value} />

        <Footer handlePage={this.handlePage} page={this.state.page} />
      </>
    )
  }
}
