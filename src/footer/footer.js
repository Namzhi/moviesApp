import {Component} from 'react'
import {Pagination} from 'antd'

import FilmList from '../film-list'
import DataResourse from '../data-resource'
export default class Footer extends Component {
  filmList = new FilmList()
  dataResourse = new DataResourse()
  render() {
    const {handlePage, page} = this.props
    return (
      <Pagination
        onChange={page => handlePage(page)}
        current={page}
        total={50}
        style={{width: 'fit-content', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto'}}
      />
    )
  }
}
