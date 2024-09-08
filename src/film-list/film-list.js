import React, {Component} from 'react'
import {Offline} from 'react-detect-offline'
import {Alert, Spin, List} from 'antd'
import {debounce} from 'lodash'

import Film from '../film'
import DataResource from '../data-resource'
import {GenreDataConsumer} from '../genres-data-context'
export default class FilmList extends Component {
  state = {
    films: null,
    loading: true,
    page: 1,
    error: false,
    genres: null,
  }

  dataResource = new DataResource()
  mockup = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: '/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg',
        genre_ids: [28, 35, 878],
        id: 533535,
        original_language: 'en',
        original_title: 'Deadpool & Wolverine',
        overview:
          'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
        popularity: 3500.919,
        poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
        release_date: '2024-07-24',
        title: 'Deadpool & Wolverine',
        video: false,
        vote_average: 7.752,
        vote_count: 2692,
      },
      {
        adult: false,
        backdrop_path: '/mKOBdgaEFguADkJhfFslY7TYxIh.jpg',
        genre_ids: [28, 878, 35, 12, 53],
        id: 365177,
        original_language: 'en',
        original_title: 'Borderlands',
        overview:
          'Returning to her home planet, an infamous bounty hunter forms an unexpected alliance with a team of unlikely heroes. Together, they battle monsters and dangerous bandits to protect a young girl who holds the key to unimaginable power.',
        popularity: 2868.187,
        poster_path: '/865DntZzOdX6rLMd405R0nFkLmL.jpg',
        release_date: '2024-08-07',
        title: 'Borderlands',
        video: false,
        vote_average: 5.857,
        vote_count: 380,
      },
      {
        adult: false,
        backdrop_path: '/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg',
        genre_ids: [16, 10751, 12, 35],
        id: 1022789,
        original_language: 'en',
        original_title: 'Inside Out 2',
        overview:
          "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
        popularity: 1870.05,
        poster_path: '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
        release_date: '2024-06-11',
        title: 'Inside Out 2',
        video: false,
        vote_average: 7.679,
        vote_count: 3374,
      },
      {
        adult: false,
        backdrop_path: '/cgKZtNSETjXJPkAQ4rasV7dnyQH.jpg',
        genre_ids: [35, 27, 14],
        id: 917496,
        original_language: 'en',
        original_title: 'Beetlejuice Beetlejuice',
        overview:
          "After a family tragedy, three generations of the Deetz family return home to Winter River. Still haunted by Beetlejuice, Lydia's life is turned upside down when her teenage daughter, Astrid, accidentally opens the portal to the Afterlife.",
        popularity: 1739.753,
        poster_path: '/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg',
        release_date: '2024-09-04',
        title: 'Beetlejuice Beetlejuice',
        video: false,
        vote_average: 7.3,
        vote_count: 127,
      },
      {
        adult: false,
        backdrop_path: '/9juRmk8QjcsUcbrevVu5t8VZy5G.jpg',
        genre_ids: [28, 12, 80, 53],
        id: 923667,
        original_language: 'cn',
        original_title: '九龍城寨之圍城',
        overview:
          'Set in the 1980s, troubled youth Chan Lok-kwun accidentally enters the Walled City, discovers the order amidst its chaos, and learns important life lessons along the way. In the Walled City, he becomes close friends with Shin, Twelfth Master and AV. Under the leadership of Cyclone, they resist against the invasion of villain Mr. Big in a series of fierce battles. Together, they vow to protect the safe haven that is Kowloon Walled City.',
        popularity: 1695.272,
        poster_path: '/PywbVPeIhBFc33QXktnhMaysmL.jpg',
        release_date: '2024-04-23',
        title: 'Twilight of the Warriors: Walled In',
        video: false,
        vote_average: 7.037,
        vote_count: 109,
      },
      {
        adult: false,
        backdrop_path: '/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg',
        genre_ids: [16, 10751, 35, 28],
        id: 519182,
        original_language: 'en',
        original_title: 'Despicable Me 4',
        overview:
          'Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.',
        popularity: 1648.096,
        poster_path: '/wWba3TaojhK7NdycRhoQpsG0FaH.jpg',
        release_date: '2024-06-20',
        title: 'Despicable Me 4',
        video: false,
        vote_average: 7.224,
        vote_count: 1475,
      },
      {
        adult: false,
        backdrop_path: '/tCQfubckzzcuCbsGugkpLhfjS5z.jpg',
        genre_ids: [28, 53, 80],
        id: 970347,
        original_language: 'en',
        original_title: 'The Killer',
        overview:
          'Zee is a feared contract killer known as "the Queen of the Dead," but when she refuses to murder a young blind woman, she finds herself hunted both by criminal colleagues and a determined police detective.',
        popularity: 1629.565,
        poster_path: '/6PCnxKZZIVRanWb710pNpYVkCSw.jpg',
        release_date: '2024-08-22',
        title: 'The Killer',
        video: false,
        vote_average: 6.48,
        vote_count: 126,
      },
      {
        adult: false,
        backdrop_path: '/3q01ACG0MWm0DekhvkPFCXyPZSu.jpg',
        genre_ids: [28, 80, 53, 35],
        id: 573435,
        original_language: 'en',
        original_title: 'Bad Boys: Ride or Die',
        overview:
          'After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.',
        popularity: 1302.901,
        poster_path: '/oGythE98MYleE6mZlGs5oBGkux1.jpg',
        release_date: '2024-06-05',
        title: 'Bad Boys: Ride or Die',
        video: false,
        vote_average: 7.573,
        vote_count: 1834,
      },
      {
        adult: false,
        backdrop_path: '/7aPrv2HFssWcOtpig5G3HEVk3uS.jpg',
        genre_ids: [28, 12, 53],
        id: 718821,
        original_language: 'en',
        original_title: 'Twisters',
        overview:
          'As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.',
        popularity: 1187.408,
        poster_path: '/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg',
        release_date: '2024-07-10',
        title: 'Twisters',
        video: false,
        vote_average: 7.019,
        vote_count: 1278,
      },
      {
        adult: false,
        backdrop_path: '/p5kpFS0P3lIwzwzHBOULQovNWyj.jpg',
        genre_ids: [80, 53],
        id: 1032823,
        original_language: 'en',
        original_title: 'Trap',
        overview:
          "A father and teen daughter attend a pop concert, where they realize they're at the center of a dark and sinister event.",
        popularity: 1016.536,
        poster_path: '/jwoaKYVqPgYemFpaANL941EF94R.jpg',
        release_date: '2024-07-31',
        title: 'Trap',
        video: false,
        vote_average: 6.541,
        vote_count: 859,
      },
      {
        adult: false,
        backdrop_path: '/su7GvFVUV5uWtAPGAVRkpDrA6Wl.jpg',
        genre_ids: [14, 35],
        id: 4011,
        original_language: 'en',
        original_title: 'Beetlejuice',
        overview:
          'A newly dead New England couple seeks help from a deranged demon exorcist to scare an affluent New York family out of their home.',
        popularity: 1248.107,
        poster_path: '/nnl6OWkyPpuMm595hmAxNW3rZFn.jpg',
        release_date: '1988-03-30',
        title: 'Beetlejuice',
        video: false,
        vote_average: 7.4,
        vote_count: 6805,
      },
      {
        adult: false,
        backdrop_path: '/9BQqngPfwpeAfK7c2H3cwIFWIVR.jpg',
        genre_ids: [10749, 18],
        id: 1079091,
        original_language: 'en',
        original_title: 'It Ends with Us',
        overview:
          "When a woman's first love suddenly reenters her life, her relationship with a charming, but abusive neurosurgeon is upended, and she realizes she must learn to rely on her own strength to make an impossible choice for her future.",
        popularity: 877.065,
        poster_path: '/4TzwDWpLmb9bWJjlN3iBUdvgarw.jpg',
        release_date: '2024-08-07',
        title: 'It Ends with Us',
        video: false,
        vote_average: 6.812,
        vote_count: 255,
      },
      {
        adult: false,
        backdrop_path: '/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg',
        genre_ids: [27, 878],
        id: 945961,
        original_language: 'en',
        original_title: 'Alien: Romulus',
        overview:
          'While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.',
        popularity: 873.915,
        poster_path: '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg',
        release_date: '2024-08-13',
        title: 'Alien: Romulus',
        video: false,
        vote_average: 7.129,
        vote_count: 902,
      },
      {
        adult: false,
        backdrop_path: '/sqfam7wEpmyG9Fx0AdVQYrLcIfy.jpg',
        genre_ids: [53, 80, 18],
        id: 1298238,
        original_language: 'es',
        original_title: 'Príncipes salvajes',
        overview:
          'A group of wealthy teenagers commit crimes that escalate from petty mischief to dangerous plots, causing chaotic consequences — but not for themselves.',
        popularity: 875.819,
        poster_path: '/iEe9RODlNgobupiksZ2vE4TZwUg.jpg',
        release_date: '2024-08-27',
        title: 'Untamed Royals',
        video: false,
        vote_average: 6.231,
        vote_count: 26,
      },
      {
        adult: false,
        backdrop_path: '/4ft6TR9wA6bra0RLL6G7JFDQ5t1.jpg',
        genre_ids: [28, 35],
        id: 704239,
        original_language: 'en',
        original_title: 'The Union',
        overview:
          'A New Jersey construction worker goes from regular guy to aspiring spy when his long-lost high school sweetheart recruits him for an espionage mission.',
        popularity: 909.513,
        poster_path: '/d9CTnTHip1RbVi2OQbA2LJJQAGI.jpg',
        release_date: '2024-08-15',
        title: 'The Union',
        video: false,
        vote_average: 6.26,
        vote_count: 565,
      },
      {
        adult: false,
        backdrop_path: '/okVLmXL5y18dfN2R4ufMZEGaeCd.jpg',
        genre_ids: [28, 80],
        id: 1160018,
        original_language: 'hi',
        original_title: 'किल',
        overview:
          'When an army commando finds out his true love is engaged against her will, he boards a New Dehli-bound train in a daring quest to derail the arranged marriage. But when a gang of knife-wielding thieves begin to terrorize innocent passengers on his train, the commando takes them on himself in a death-defying kill-spree to save those around him — turning what should have been a typical commute into an adrenaline-fueled thrill ride.',
        popularity: 886.088,
        poster_path: '/m2zXTuNPkywdYLyWlVyJZW2QOJH.jpg',
        release_date: '2024-07-03',
        title: 'Kill',
        video: false,
        vote_average: 6.782,
        vote_count: 117,
      },
      {
        adult: false,
        backdrop_path: '/kwzNUM4yZ26XuNAPSyaWwJeWRP4.jpg',
        genre_ids: [28, 35, 14],
        id: 950526,
        original_language: 'pt',
        original_title: 'O Mestre da Fumaça',
        overview:
          'The journey of Gabriel and Daniel, two brothers cursed by the Chinese mafia with its feared Three Generations Revenge, who have already reaped the life of their grandfather and their father. To survive, one of the brothers must learn the Smoke Style secrets, a little known Cannabis martial art, taught by a single master, high up in the mountains.',
        popularity: 883.351,
        poster_path: '/mg6YkwftQOJjpT2ygYlCi11LWeC.jpg',
        release_date: '2023-05-18',
        title: 'The Smoke Master',
        video: false,
        vote_average: 7.667,
        vote_count: 3,
      },
      {
        adult: false,
        backdrop_path: '/bxwKC4qAbceMgHU1xCCTBK1eYdn.jpg',
        genre_ids: [28, 53, 80],
        id: 5492,
        original_language: 'en',
        original_title: 'Gunner',
        overview:
          "While on a camping trip in order to reconnect, war veteran Colonel Lee Gunner must save his two sons from a gang of violent bikers when they're kidnapped after accidentally stumbling upon to a massive drug operation.",
        popularity: 948.092,
        poster_path: '/eEkAY5veAnwxUOOlpF62KawkFO9.jpg',
        release_date: '2024-08-16',
        title: 'Gunner',
        video: false,
        vote_average: 5.262,
        vote_count: 61,
      },
      {
        adult: false,
        backdrop_path: '/pzFbYJfqGKlGxOsDIIsUi6YxVQ.jpg',
        genre_ids: [35, 878],
        id: 1094138,
        original_language: 'en',
        original_title: 'Jackpot!',
        overview:
          "In the near future, a 'Grand Lottery' has been established - the catch: kill the winner before sundown to legally claim their multi-billion dollar jackpot. When Katie Kim mistakenly finds herself with the winning ticket, she reluctantly joins forces with amateur lottery protection agent Noel Cassidy who must get her to sundown in exchange for a piece of her prize.",
        popularity: 762.581,
        poster_path: '/fOsamTFIyGxjw1jLSKdZYxQBJOT.jpg',
        release_date: '2024-08-13',
        title: 'Jackpot!',
        video: false,
        vote_average: 6.4,
        vote_count: 412,
      },
      {
        adult: false,
        backdrop_path: '/1wP1phHo2CROOqzv7Azs0MT5esU.jpg',
        genre_ids: [16, 35, 10751, 12, 28],
        id: 748783,
        original_language: 'en',
        original_title: 'The Garfield Movie',
        overview:
          'Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.',
        popularity: 726.699,
        poster_path: '/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg',
        release_date: '2024-04-30',
        title: 'The Garfield Movie',
        video: false,
        vote_average: 7.133,
        vote_count: 886,
      },
    ],
    total_pages: 45925,
    total_results: 918498,
  }

  debouncedUpdateFilm = debounce((url, page) => {
    this.updateFilm(url, page)
  }, 500)
  componentDidMount() {
    // this.dataResource
    // .getPopular()
    // .then(res => res.results.map(this.dataResource._transformFilm))
    // .then(this.onFilmLoaded)
    // .catch(this.onError)
    this.onFilmLoaded(this.mockup.results.map(this.dataResource._transformFilm))
  }
  componentDidUpdate(prevProps) {
    const {page, value} = this.props
    if (page !== prevProps.page) {
      this.updateFilm(value, page)
    }
    if (value !== prevProps.value) {
      this.debouncedUpdateFilm(value, page)
    }
    // if(window.innerWidth?)
  }

  onFilmLoaded = films => {
    this.setState({
      films,
      loading: false,
      error: false,
    })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateFilm = (url, page) => {
    this.setState({loading: true})
    this.dataResource.getFilms(url, page).then(this.onFilmLoaded).catch(this.onError)
  }

  render() {
    const {films, loading, error} = this.state
    const {value, session_id} = this.props
    if (!films) {
      return null
    }
    const filmList = films.map(item => {
      const {title, id, overview, release_date, img, genre_ids, vote_average} = item
      return (
        <GenreDataConsumer key={id}>
          {getGenre => {
            return (
              <>
                <Film
                  key={id}
                  title={title}
                  id={id}
                  img={img}
                  overview={overview}
                  release_date={release_date}
                  session_id={session_id}
                  genres={getGenre(genre_ids)}
                  vote_average={vote_average}
                />
              </>
            )
          }}
        </GenreDataConsumer>
      )
    })
    const hasData = !(loading || error)
    const errorMessage = error ? <Alert message="Error" type="error" /> : null

    const spinner = loading ? <Spin size="large" /> : null
    console.log(window.innerWidth)
    const content = !hasData ? null : filmList.length === 0 && value !== '' ? (
      'нет результатов'
    ) : (
      <List
        className="film-list__list-element"
        itemLayout={'vertical'}
        // itemLayout="vertical"
        grid={{gutter: 36, column: 2, md: 2, sm: 1, xs: 1}}
        dataSource={filmList}
        // contentWidth={451}

        renderItem={item => (
          <List.Item
          // style={{maxWidth: 451}}
          //   // flexFlow: 'column nowrap',
          //   height: 279,
          //   boxSizing: 'border-box',
          //   boxShadow: '0.1rem .2rem .6rem 0.2rem hsla(1, 1%, 70%, 0.300)',
          //   // background: window.innerWidth >= 768 ? 'blue' : 'red',
          //   padding: window.innerWidth >= 768 ? 0 : '.5rem',
          // }}
          >
            {item}
          </List.Item>
        )}
      ></List>
    )

    return (
      <>
        {errorMessage}
        <Offline>Only shown offline (surprise!)</Offline>
        {spinner}
        {content}
      </>
    )
  }
}
