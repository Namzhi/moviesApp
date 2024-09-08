import React, {Component, Fragment} from 'react'
import {format, parse} from 'date-fns'
import {Flex, Rate, Tag, Progress} from 'antd'

import DataResource from '../data-resource'

export default class Film extends Component {
  render() {
    return <FilmView film={this.props} />
  }
}

const FilmView = ({film}) => {
  const dataResource = new DataResource()
  const {title, id, overview, release_date, img, session_id, rating, genres, vote_average} = film
  let date = parse(release_date, 'yyyy-MM-dd', new Date())
  const desc = ['terrible', 'terrible', 'bad', 'bad', 'normal', 'normal', 'good', 'good', 'wonderful', 'wonderful']

  try {
    date = format(new Date(release_date), 'MMMM d, yyyy')
  } catch (err) {
    date = 'invalid'
  }
  const onValue = val => {
    dataResource.rateFilm(id, val, session_id)
  }
  const genreList = genres.map((el, i) => (
    <Tag
      style={{
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: 400,
      }}
      key={i}
    >
      {el}
    </Tag>
  ))
  function rateColor() {
    const value = vote_average ? vote_average : rating
    const color = value < 4 ? ' #E90000' : value < 5 ? '#E97E00' : value < 7 ? '#E9D100' : '#66E900'
    return color
  }
  // const overviewHeight = '20px'
  return (
    <Fragment>
      <Flex className="film__container">
        <img className="film__img" src={img} />
        <div className="list-item">
          <Flex className="film__title-progress">
            <h5 className="film__title" key={id}>
              {title}
            </h5>
            <Progress
              className="film__progress"
              size={30}
              type="circle"
              percent={100}
              format={() => vote_average.toFixed(1)}
              strokeColor={rateColor()}
            />
          </Flex>
          <Flex
            vertical
            // style={{position: 'absolute'}}
          >
            <p
              className="film__date"
              // style={{
              //   height: 30,
              //   fontFamily: 'Inter',
              //   fontSize: 12,
              //   fontWeight: 400,

              //   textAlign: 'left',
              //   margin: 0,
              //   marginBottom: 4,
              //   color: '#827E7E',
              // }}
            >
              {date}
            </p>
            <Flex
              gap="4px 0"
              wrap
              className="film__genres"
              // style={{width: '100%'}}
            >
              {genreList}
            </Flex>

            <p
              className="film__overview"
              // style={{
              //   WebkitLineClamp: `${genreList.length > 3 ? '6' : '7'}` /* start showing ellipsis when 3rd line is reached */,
              // }}
            >
              {overview}
            </p>
          </Flex>
          <Rate
            className="film__rate"
            count={10}
            allowHalf
            tooltips={desc}
            onChange={val => onValue(val)}
            value={rating}
          />
        </div>
      </Flex>
    </Fragment>
  )
}
