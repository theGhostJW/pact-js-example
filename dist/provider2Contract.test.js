"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pact_1 = require("@pact-foundation/pact");
const axios_1 = __importDefault(require("axios"));
// import mochaPact from "mocha-pact"
const path_1 = __importDefault(require("path"));
// import { describe, test, before, after } from 'mocha'
const provider2_1 = require("./provider2");
const provider_1 = require("./provider");
const expect = require("chai").expect;
/*
describe.only('Pact Verification', () => {

  let sv: http.Server;
  before(done => {
    sv = app.listen(port, () => {
      console.log(`Listening on port ${port}...`)
      app.emit("app_started")
      done()
    })
  })

  const callSimple = () => {
    return axios.request({
      method: "GET",
      baseURL: fullUrl,
      url: "/",
      headers: { Accept: "application/json" },
    })
  }

  it('should connect OK', done => {
    callSimple().then(response => {
      expect(response.status).to.eql(200)
      done()
    }, done)
  });

  const options: VerifierOptions = {
    provider: 'MyProvider',
    providerBaseUrl: fullUrl,
    pactUrls: [path.resolve(process.cwd(), "pact", "pacts", "myconsumer-myprovider.json")],
    providerVersion: '2.0.0',
    publishVerificationResult: true,
    timeout: 20000
  }

  test('expectations of MyConsumer', async () => {
    return await new Verifier(options).verifyProvider()
  })

  after(done => {
    sv.close(done)
  })
*/
const providerBaseUrl = 'http://127.0.0.1:3000/';
const pactBrokerToken = process.env.PACT_BROKER_TOKEN;
const port = process.env.PORT || 3000;
const options = {
    provider: 'movie-provider',
    providerBaseUrl,
    pactUrls: [path_1.default.resolve(process.cwd(), "pacts", "myconsumer-myprovider.json")],
    providerVersion: '1.0.0',
    publishVerificationResult: true,
    logLevel: 'info'
};
// having trouble getting logLevel to type check
// TODO fix  
// @ts-ignore
const verifier = new pact_1.Verifier(options);
const callSimple = () => {
    return axios_1.default.request({
        method: "GET",
        baseURL: provider2_1.fullUrl,
        url: "/",
        headers: { Accept: "application/json" },
    });
};
describe.only('Pact Verification', () => {
    let sv;
    beforeAll(done => {
        sv = provider2_1.app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
            provider2_1.app.emit("app_started");
            done();
        });
    });
    // beforeAll(function (done) {
    //   this.timeout(30000); // A very long environment setup.
    //   setTimeout(done, 25000)
    // })
    it('should connect OK', done => {
        callSimple().then(response => {
            expect(response.status).to.eql(200);
            done();
        }, done);
    });
    test('should validate the expectations of movie-consumer', done => {
        verifier.verifyProvider();
        // .then(a => console.log(`This is a ${a}!!!`))
        done();
    });
    afterAll(done => {
        sv.close(done);
    });
});
const movieProviderUrl = 'http://localhost:3001/';
const moviePort = 3001;
const movieOptions = {
    provider: 'movie-provider',
    movieProviderUrl,
    // pactBrokerUrl,
    // pactBrokerToken,
    pactUrls: [path_1.default.resolve(process.cwd(), "pacts", "movie-consumer-movie-provider.json")],
    providerVersion: '1.0.0',
    publishVerificationResult: true,
    // logLevel: 'info'
};
// having trouble getting logLevel to type check
// TODO fix  
// @ts-ignore
const movieVerifier = new pact_1.Verifier(movieOptions);
describe('Pact Verification', () => {
    let movieServer;
    beforeAll(done => {
        movieServer = provider_1.app.listen(port, () => {
            console.log(`Listening on port ${moviePort}...`);
            provider_1.app.emit("movie app started");
            done();
        });
    });
    test('should validate the expectations of movie-consumer', () => {
        return movieVerifier.verifyProvider();
    });
    afterAll(done => {
        movieServer.close(done);
    });
});
//# sourceMappingURL=provider2Contract.test.js.map