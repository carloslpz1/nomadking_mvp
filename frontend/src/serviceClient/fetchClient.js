const FetchClient = {
  async get(url, needToken = false) {
    const token = needToken ? localStorage.getItem('token') : null
    const headers = { 'Content-Type': 'application/json', }

    return await fetch(url, {
      method: 'GET',
      headers: token ? { ...headers, 'Authorization': `Bearer ${token}` } : headers,
    })
  },

  async post(url, body, needToken = false) {
    const token = needToken ? localStorage.getItem('token') : null
    const headers = { 'Content-Type': 'application/json', }

    return await fetch(url, {
      method: 'POST',
      headers: token ? { ...headers, 'Authorization': `Bearer ${token}` } : headers,
      body: JSON.stringify(body),
    })
  },

  async put(url, body, needToken = false) {
    const token = needToken ? localStorage.getItem('token') : null
    const headers = { 'Content-Type': 'application/json', }

    return await fetch(url, {
      method: 'PUT',
      headers: token ? { ...headers, 'Authorization': `Bearer ${token}` } : headers,
      body: JSON.stringify(body),
    })
  },

  async delete(url, needToken = false) {
    const token = needToken ? localStorage.getItem('token') : null
    const headers = { 'Content-Type': 'application/json', }

    return await fetch(url, {
      method: 'DELETE',
      headers: token ? { ...headers, 'Authorization': `Bearer ${token}` } : headers,
    })
  }
}

export default FetchClient