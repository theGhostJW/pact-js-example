const expect = require("chai").expect
import { InteractionObject, Pact } from "@pact-foundation/pact"
import { allDogsRequest, EXPECTED_DOGS_BODY, EXPECTED_DOG1_BODY, dog1Request } from './consumerMockService'


const url = "http://127.0.0.1"
const port = 8992

const provider = new Pact({
  port: port,
  consumer: "dog-consumer",
  provider: "dog-provider",
  logLevel: 'info'
})


describe("dogs service", () =>
  describe("all dogs request", () => {

    beforeAll(() =>

      provider.setup()
        .then(() => {
          provider.addInteraction({
            state: "i have a list of dogs",
            uponReceiving: "a request for all dogs",
            withRequest: {
              method: "GET",
              path: "/dogs",
              headers: {
                Accept: "application/json",
              },
            },
            willRespondWith: {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
              body: EXPECTED_DOGS_BODY,
            },
          })
        }
        )
    )

    it("returns all doge record", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      allDogsRequest(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_DOGS_BODY)
        done()
      }, done)

    })

    afterEach(() => provider.verify())
    afterAll(() => provider.finalize())
  })
)


  // describe("get /dog/1", () => {
  //   beforeAll(() =>
  //     provider.setup().then(() => {
  //       provider.addInteraction(
  //         {
  //           state: "i have a list of dogs",
  //           uponReceiving: "a request for a single dog",
  //           withRequest: {
  //             method: "GET",
  //             path: "/dogs/1",
  //             headers: {
  //               Accept: "application/json",
  //             },
  //           },
  //           willRespondWith: {
  //             status: 200,
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: EXPECTED_DOG1_BODY,
  //           },
  //         }
  //       )
  //     }
  //     )
  //   )
  // }


//     it("returns the correct response", done => {
//         const urlAndPort = {
//           url: url,
//           port: port,
//         }

//         dog1Request(urlAndPort).then(response => {
//           expect(response.data).to.eql(EXPECTED_DOG1_BODY)
//           done()
//         }, done)
//       })

//     afterEach(() => provider.verify())
//     afterAll(() => provider.finalize())
//   })




// )


