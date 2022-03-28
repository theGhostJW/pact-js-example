
import express from 'express'

export const url = "http://127.0.0.1"
export const port = 3000
export const fullUrl = `${url}:${port}`

const appPriv = express()

appPriv.get('/', (req, res) => {
  res.sendStatus(200);
});


appPriv.get('/dogs/1', function (_req, res) {
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

appPriv.get('/dogs', function (_req, res) {
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
  appPriv.listen(port, () => {
    console.log('appPriv has started');
  });
}

// export const server =
//   appPriv.listen(port, () => {
//     console.log(`Listening on port ${port}...`)
//     appPriv.emit("appPriv_started")
//   }
//   );


// export const shutdown = (done: any) => {
//   server.close(done);
// }

export const app = appPriv;