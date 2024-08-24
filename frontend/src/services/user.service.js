import FetchClient from "../serviceClient/fetchClient"
const apiUrl = import.meta.env.VITE_API_URL

class UserService {
  constructor() {
    this.httpClient = FetchClient
  }

  async getUser(username) {
    try {
      const response = await this.httpClient.get(`${apiUrl}/users/${username}`)
      return response.json()
    } catch (e) {
      console.error(e)
    }
  }
}

export default UserService