import { Verifier, VerifierOptions } from '@pact-foundation/pact'
import axios from 'axios';
import http from 'http'
import { Server } from 'http';
// import mochaPact from "mocha-pact"
import path from 'path';
// import { describe, test, before, after } from 'mocha'
import { fullUrl, app, /* port, */ url } from './provider2';
import { app as movieApp } from './provider';
import { doesNotMatch } from 'assert';
import { setLogLevel } from '@pact-foundation/pact-node/src/logger';
const expect = require("chai").expect

const providerBaseUrl = 'http://127.0.0.1:3000/';
const pactBrokerToken = process.env.PACT_BROKER_TOKEN;

const port = process.env.PORT || 3000;

const options = {
  provider: 'movie-provider',
  providerBaseUrl,
  pactUrls: [path.resolve(process.cwd(), "pacts", "myconsumer-myprovider.json")],
  providerVersion: '1.0.0',
  publishVerificationResult: true,
  logLevel: 'info'
};

// having trouble getting logLevel to type check
// TODO fix  
// @ts-ignore
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

  // this test is just here to prove the server is up if pacts are failing
  it.skip('should connect to movie service OK', done => {
    axios.request({
      method: "GET",
      baseURL: fullUrl,
      url: "/",
      headers: { Accept: "application/json" },
    }).then(response => {
      expect(response.status).to.eql(200)
      done()
    }, done)
  });

  test('should validate the expectations of movie-consumer', () => {
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

describe('Pact Verification', () => {

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
