import {Component} from 'react'

import DataResourse from '../data-resource'
import FilmList from '../film-list'
export default class Search extends Component {
  dataResourse = new DataResourse()
  filmList = new FilmList()
  render() {
    const {handleSearch, value} = this.props
    // console.log(handleSearch)
    // handleSearch = debounce(handleSearch, 1000)
    console.log(this.props.value)
    return <input onChange={handleSearch} value={value}></input>
  }
}
