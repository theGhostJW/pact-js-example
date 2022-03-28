import { Verifier } from '@pact-foundation/pact';
import path from 'path';
import { app } from './movieProvider'
import http from 'http'
const pactBrokerUrl = process.env.PACT_BROKER_URL;
const providerBaseUrl =
  process.env.PROVIDER_BASE_URL || 'http://localhost:3000/';
const pactBrokerToken = process.env.PACT_BROKER_TOKEN;

/*
const port = process.env.PORT || 3000;

const options = {
  provider: 'movie-provider',
  providerBaseUrl,
  // pactBrokerUrl,
  // pactBrokerToken,
  pactUrls: [path.resolve(process.cwd(), "pacts", "movie-consumer-movie-provider.json")],
  providerVersion: '1.0.0',
  publishVerificationResult: true,
  // logLevel: 'info'
};

const verifier = new Verifier(options);

describe('Pact Verification', () => {

  let sv: http.Server;
  beforeAll(done => {
    sv = app.listen(port, () => {
      console.log(`Listening on port ${port}...`)
      app.emit("app_started")
      done()
    })
  })


  test('should validate the expectations of movie-consumer', () => {
    return verifier.verifyProvider();
  });

  afterAll(done => {
    sv.close(done)
  })
})



//----
const movieProviderUrl = 'http://localhost:3001/';
const moviePort: number = 3001;

const movieOptions = {
  provider: 'movie-provider',
  providerBaseUrl: movieProviderUrl,
  // pactBrokerUrl,
  // pactBrokerToken,
  pactUrls: [path.resolve(process.cwd(), "pacts", "movie-consumer-movie-provider.json")],
  providerVersion: '1.0.0',
  publishVerificationResult: true,
  // logLevel: 'info'
};

// having trouble getting logLevel to type check
// TODO fix  
// @ts-ignore
const movieVerifier = new Verifier(movieOptions);

describe.only('Pact Verification', () => {

  let movieServer: http.Server
  beforeAll(done => {
    movieServer = app.listen(moviePort, () => {
      console.log(`Listening on port ${moviePort}...`)
      app.emit("app_started")
      done()
    })
  })


  test('should validate the expectations of movie-consumer', done => {
    movieVerifier
      .verifyProvider()
      .finally(done)
  });

  afterAll(done => {
    movieServer.close(done)
  })
})

*/
