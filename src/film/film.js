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
  console.log(vote_average)
  let date = parse(release_date, 'yyyy-MM-dd', new Date())
  const desc = ['terrible', 'terrible', 'bad', 'bad', 'normal', 'normal', 'good', 'good', 'wonderful', 'wonderful']

  try {
    date = format(new Date(release_date), 'MMMM d, yyyy')
  } catch (err) {
    date = 'invalid'
  }
  const onValue = val => {
    dataResource.rateFilm(id, val, session_id).then(res => console.log(res))
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
      {/* <Card style={{width: 451, height: 279}} cover={<img src={img} style={{width: 183, height: 281}}></img>}>  // style={{
            //   width: 451,
            //   height: 279,
            //   boxShadow: '0.1rem .2rem .6rem 0.2rem hsla(1, 1%, 70%, 0.300)',
            //   padding: window.innerWidth >= 768 ? 0 : '.5rem',
            // }}*/}

      <Flex
      // style={{
      //   width: 'fit-content',
      //   boxShadow: '0.1rem .2rem .6rem 0.2rem hsla(1, 1%, 70%, 0.300)',
      // }}
      >
        <img src={img} style={{width: 183, height: 280}} />

        <div
          className="list-item"
          style={{
            margin: 10,
            // marginLeft: 202,
            marginRight: 20,

            height: 279,
          }}
        >
          <Flex vertical style={{position: 'absolute'}}>
            <Progress
              size={30}
              type="circle"
              percent={100}
              format={() => vote_average.toFixed(1)}
              strokeColor={rateColor()}
              style={{
                width: 30,
                height: 30,
                position: 'absolute',
                transform: 'translateX(209px)',
                zIndex: 1,
              }}
            />

            <h5
              key={id}
              style={{
                width: 210,
                height: 28,

                fontFamily: 'Inter',
                fontSize: 20,
                fontWeight: 400,
                // lineHeight: 28,
                textAlign: 'left',
                margin: 0,
                marginBottom: 7,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </h5>

            <p
              style={{
                height: 30,
                //styleName: @font-size-sm: 12px;
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: 400,
                // lineHeight: 22,
                textAlign: 'left',
                margin: 0,
                marginBottom: 4,
                color: '#827E7E',
              }}
            >
              {date}
            </p>
            <Flex gap="4px 0" wrap style={{width: 228}}>
              {genreList}
            </Flex>

            <p
              style={{
                // display: 'inline-block',
                width: 228,
                height: `${genreList.length > 3 ? '109px' : '129px'}`,
                overflow: 'hidden',
                display: '-webkit-box',
                webkitBoxOrient: 'vertical',
                WebkitLineClamp: `${genreList.length > 3 ? '6' : '7'}` /* start showing ellipsis when 3rd line is reached */,
                whiteSpace: 'pre-wrap',
                //styleName: @font-size-sm: 12px;
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: 400,
                // lineHeight: 22,
                textalign: 'left',
                margin: 0,
                marginBottom: 1,
                marginTop: 7,
              }}
            >
              {overview}
            </p>
          </Flex>
          <Rate
            count={10}
            allowHalf
            tooltips={desc}
            onChange={val => onValue(val)}
            value={rating}
            style={{position: 'relative', height: 46, top: 239, fontSize: 16, zIndex: 1, width: 239}}
          />
        </div>
      </Flex>

      {/* </Card> */}
    </Fragment>
  )
}
