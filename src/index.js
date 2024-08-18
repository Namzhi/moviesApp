/* eslint-disable no-useless-concat */
class SwapiService {
  _apiBase = 'https://swapi.dev/api'
  async getResource(url) {
    const res = await fetch(this._apiBase + url)
    if (!res.ok) {
      throw new Error(`could not found ${this._apiBase}${url}` + `, received ${res.status}`)
    }
    // console.log(res.json())

    return await res.json()
  }
  async getAllPeople() {
    return this.getResource('/people/')
  }
  getPerson(id) {
    return this.getResource(`/people/${id}`)
  }
  async getAllPlanets() {
    const res = this.getResource('/starships/')
    return res
  }
  getStarship(id) {
    return this.getResource(`/startships/${id}`)
  }
}
const swapi = new SwapiService()
swapi.getAllPeople().then(body => {
  console.log(body)
})
