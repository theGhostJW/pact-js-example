const { Verifier } = require('@pact-foundation/pact');
const path = require('path');
const app = require('./provider');
const pactBrokerUrl = process.env.PACT_BROKER_URL;
const providerBaseUrl =
  process.env.PROVIDER_BASE_URL || 'http://localhost:3000/';
const pactBrokerToken = process.env.PACT_BROKER_TOKEN;

const port = process.env.PORT || 3000;

const options = {
  provider: 'movie-provider',
  providerBaseUrl,
  // pactBrokerUrl,
  // pactBrokerToken,
  pactUrls: [path.resolve(process.cwd(), "pacts", "movie-consumer-movie-provider.json")],
  providerVersion: '1.0.0',
  publishVerificationResult: true,
};

const verifier = new Verifier(options);

describe('Pact Verification', () => {

  let sv;
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
});
