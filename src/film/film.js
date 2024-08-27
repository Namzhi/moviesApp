import {Component, Fragment} from 'react'
import {format, parse} from 'date-fns'
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
  const {title, id, overview, release_date, img} = film
  let date = parse(release_date, 'yyyy-MM-dd', new Date())
  try {
    date = format(new Date(release_date), 'MMMM d, yyyy')
    // console.log(date)
  } catch (err) {
    date = 'invalid'
  }

  return (
    <Fragment>
      <li key={id}>{title}</li>
      <img src={img}></img>
      <p>{date}</p>

      <p>{overview}</p>
    </Fragment>
  )
}
