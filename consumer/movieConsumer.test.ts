import { Pact } from '@pact-foundation/pact';
import { fetchMovies } from './moveMockService';
import path from 'path';
import { like, eachLike } from '@pact-foundation/pact/src/dsl/matchers';


test('stub', async () => {
})




const port = 8992;
const moviePact = new Pact({
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
      moviePact.setup().then(() => {
        moviePact.addInteraction({
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
      const response = await fetchMovies(moviePact.mockService.baseUrl);
      expect(response).toMatchSnapshot();
    })


    afterEach(() => moviePact.verify())
    afterAll(() => moviePact.finalize())
  })
})
