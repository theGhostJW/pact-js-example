import { Pact } from '@pact-foundation/pact';
import { fetchMovies } from './mockConsumer';
import path from 'path';
import { like, eachLike } from '@pact-foundation/pact/src/dsl/matchers';


const port = 8992;
const provider = new Pact({
  consumer: 'movie-consumer',
  provider: 'movie-provider',
  port,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  pactfileWriteMode: 'update',
  logLevel: 'info',
});

describe('Movies Service', () => {
  describe('When a request to list all movies is made', () => {
    beforeAll(() =>
      provider.setup().then(() => {
        provider.addInteraction({
          state: "I have a list of movies",
          uponReceiving: 'a request to list all movies',
          withRequest: {
            method: 'GET',
            path: '/movies',
          },
          willRespondWith: {
            status: 200,
            body: eachLike(
              {
                id: 1,
                name: like('Movie 1'),
                year: like(2008),
              },
              { min: 5 }
            ),
          },
        })
      })
    )

    test('should return the correct data', async () => {
      const response = await fetchMovies(provider.mockService.baseUrl);
      expect(response).toMatchSnapshot();
    })


    afterEach(() => provider.verify())
    afterAll(() => provider.finalize())
  });
});
