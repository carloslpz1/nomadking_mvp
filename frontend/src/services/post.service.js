import FetchClient from "../serviceClient/fetchClient"
const apiUrl = import.meta.env.VITE_API_URL

class PostService {
  constructor() {
    this.httpClient = FetchClient
  }

  async getPostsByFollow(userId) {
    try {
      const response = await this.httpClient.get(`${apiUrl}/posts/${userId}/follow`)
      return response.json()
    } catch (e) {
      console.error(e)
    }
  }
}

export default PostService