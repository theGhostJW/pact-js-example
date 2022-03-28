
import express from 'express'

export const url = "http://127.0.0.1"
export const dogPort = 3000
export const dogUrl = `${url}:${dogPort}`

export const dogServer = express()

dogServer.get('/', (req, res) => {
  res.sendStatus(200);
});


dogServer.get('/dogs/1', function (_req, res) {
  res.type('application/json') 
  res.status(200)
  res.json(
    [
      {
        "dog": 1
      }
    ]
  )
})

dogServer.get('/dogs', function (_req, res) {
  res.type('application/json') 
  res.status(200)
  res.json(
    [
      {
        "dog": 1
      },
      {
        "dog": 2
      },
    ]
  )
})

if (require.main === module) {
  dogServer.listen(dogPort, () => {
    console.log('appPriv has started');
  });
}