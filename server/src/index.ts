import express from 'express'
import Converter from './converters/Converter.js'
const app = express()
app.use(express.text({ type: '*/*' }))
app.enable('trust proxy')
const converter = new Converter()
app.all('*', async (req, res) => {
  try {
    const convert = converter.convert(req.body)
    if (convert) {
      res.json({
        status: 'success',
        data: convert,
        type: convert.type
      })
    } else {
      res.json({
        error: 'No supported format found',
        data: null
      })
    }
  } catch (err) {
    console.error('Convert failure: ' + err)
    res.status(500).send(err)
  }
})
app.listen(process.env.WEB_PORT || 8088, () => {
  console.log(`Server is listening on port ${process.env.WEB_PORT || 8088}`)
})
