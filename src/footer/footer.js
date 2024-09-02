import {Component} from 'react'
import {Pagination} from 'antd'

import FilmList from '../film-list'
import DataResourse from '../data-resource'
export default class Footer extends Component {
  filmList = new FilmList()
  dataResourse = new DataResourse()
  render() {
    const {handlePage, page} = this.props
    // console.log(this.props)
    // handlePage()
    // console.log(this.filmList.updateFilm(2))
    return <Pagination onChange={page => handlePage(page)} current={page} total={50} />
    // return <Pagination onChange={page => console.log(page)} total={50} />
  }
}
