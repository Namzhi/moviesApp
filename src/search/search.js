import {Component} from 'react'
import {Input} from 'antd'

import DataResourse from '../data-resource'
import FilmList from '../film-list'
export default class Search extends Component {
  dataResourse = new DataResourse()
  filmList = new FilmList()
  render() {
    const {handleSearch, value} = this.props
    return (
      <div className="search__input">
        <Input placeholder="Type to search..." onChange={handleSearch} value={value}></Input>
      </div>
    )
  }
}
