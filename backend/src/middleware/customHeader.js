const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key
    if (apiKey === 'apikey_123') {
      next()
    } else {
      res.status(403)
      res.send({ error: 'The API key is incorrect' })
    }
    console.log(req.headers)
    next()
  } catch (e) {
    res.status(403)
    res.send({ error: 'There was an error on Custom Header' })
  }
}

module.exports = customHeader