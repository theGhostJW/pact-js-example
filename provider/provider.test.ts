import { Verifier, VerifierOptions } from '@pact-foundation/pact'
import axios from 'axios';
import http from 'http'
import path from 'path';
import { dogUrl, app as dogApp, /* port, */ url, dogPort } from './dogProvider';
import { app as movieApp } from './movieProvider';
const expect = require("chai").expect


const pactBrokerToken = process.env.PACT_BROKER_TOKEN;


const options = {
  provider: 'dog-provider',
  providerBaseUrl: dogUrl,
  pactUrls: [path.resolve(process.cwd(), "pacts", "dog-consumer-dog-provider.json")],
  providerVersion: '1.0.0',
  publishVerificationResult: true,
  logLevel: 'info'
};

// having trouble getting logLevel to type check
// TODO fix  
// @ts-ignore
const verifier = new Verifier(options);

describe.only('dog pact verification', () => {

  let sv: http.Server;
  beforeAll(done => {
    sv = dogApp.listen(dogPort, () => {
      console.log(`Listening on port ${dogPort}...`)
      dogApp.emit("app_started")
      done()
    })
  })

  // this test is just here to prove the server is up if pacts are failing
  it.skip('should connect to movie service OK', done => {
    axios.request({
      method: "GET",
      baseURL: dogUrl,
      url: "/",
      headers: { Accept: "application/json" },
    }).then(response => {
      expect(response.status).to.eql(200)
      done()
    }, done)
  });

  test('should validate the expectations of dog-consumer', () => {
    return verifier.verifyProvider()
  });

  afterAll(done => {
    sv.close(done)
  })

})

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

describe('movie pact verification', () => {

  let movieServer: http.Server
  beforeAll(done => {
    movieServer = movieApp.listen(moviePort, () => {
      console.log(`Listening on port ${moviePort}...`)
      movieApp.emit("app_started")
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
