import {Component} from 'react'

import FilmList from '../film-list'
import Search from '../search'
import Footer from '../footer'
export default class FilmTab extends Component {
  state = {search: '', value: '', tab: 1}
  handleSearch = e => {
    this.setState({
      value: e.target.value,
      page: 1,
    })
  }
  handlePage = pageNow => {
    this.setState({
      page: pageNow,
    })
  }
  render() {
    console.log(this.props)
    const {session_id} = this.props
    return (
      <div style={{width: 938, marginLeft: 'auto', marginRight: 'auto'}}>
        <Search handleSearch={this.handleSearch} value={this.state.value} />
        <FilmList page={this.state.page} value={this.state.value} session_id={session_id} />
        <Footer handlePage={this.handlePage} page={this.state.page} />
      </div>
    )
  }
}
