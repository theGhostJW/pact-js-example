"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pact_1 = require("@pact-foundation/pact");
const path_1 = __importDefault(require("path"));
const provider_1 = require("./provider");
const pactBrokerUrl = process.env.PACT_BROKER_URL;
const providerBaseUrl = process.env.PROVIDER_BASE_URL || 'http://localhost:3000/';
const pactBrokerToken = process.env.PACT_BROKER_TOKEN;
const port = process.env.PORT || 3000;
const options = {
    provider: 'movie-provider',
    providerBaseUrl,
    // pactBrokerUrl,
    // pactBrokerToken,
    pactUrls: [path_1.default.resolve(process.cwd(), "pacts", "movie-consumer-movie-provider.json")],
    providerVersion: '1.0.0',
    publishVerificationResult: true,
    // logLevel: 'info'
};
const verifier = new pact_1.Verifier(options);
describe('Pact Verification', () => {
    let sv;
    beforeAll(done => {
        sv = provider_1.app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
            provider_1.app.emit("app_started");
            done();
        });
    });
    test('should validate the expectations of movie-consumer', () => {
        return verifier.verifyProvider();
    });
    afterAll(done => {
        sv.close(done);
    });
});
//# sourceMappingURL=provider-contract.spec.js.map