import React, {useState, Component, Fragment} from 'react'
import {format, parse} from 'date-fns'
import {Flex, Rate, Tag, Progress} from 'antd'

import DataResource from '../data-resource'

export default class Film extends Component {
  render() {
    const className = 'li-item'

    return (
      <div className={className}>
        <FilmView film={this.props} />
      </div>
    )
  }
}

const FilmView = ({film}) => {
  const dataResource = new DataResource()
  const {title, id, overview, release_date, img, session_id, rating, genres, vote_average} = film
  console.log(vote_average)
  let date = parse(release_date, 'yyyy-MM-dd', new Date())
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

  const [value, setValue] = useState(vote_average)
  try {
    date = format(new Date(release_date), 'MMMM d, yyyy')
  } catch (err) {
    date = 'invalid'
  }
  const onValue = val => {
    setValue(val)

    dataResource.rateFilm(id, val, session_id).then(res => console.log(res))
  }
  const genreList = genres.map((el, i) => <Tag key={i}>{el}</Tag>)
  // console.log(genres)
  function rateColor() {
    const value = vote_average ? vote_average : rating
    const color = value < 4 ? ' #E90000' : value < 5 ? '#E97E00' : value < 7 ? '#E9D100' : '#66E900'
    return color
  }
  return (
    <Fragment>
      <Progress
        size={30}
        type="circle"
        percent={100}
        format={() => (vote_average ? vote_average.toFixed(1) : rating)}
        strokeColor={rateColor()}
      />
      <li key={id}>{title}</li>

      <img src={img}></img>

      <p>{date}</p>
      <Flex gap="4px 0" wrap>
        {genreList}
      </Flex>
      {/* <p>{genres}</p> */}
      <Rate count={10} allowHalf tooltips={desc} onChange={val => onValue(val)} value={rating ? rating : value} />
      {/* {value ? <span>{desc[value - 1]}</span> : null} */}
      <p>{overview}</p>
    </Fragment>
  )
}
