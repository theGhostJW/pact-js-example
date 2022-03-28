const expect = require("chai").expect
import { InteractionObject, Pact } from "@pact-foundation/pact"
import { allDogsRequest, EXPECTED_DOGS_BODY, EXPECTED_DOG1_BODY, dog1Request } from './dogMockService'


const url = "http://127.0.0.1"
const port = 8993

const dogPact = new Pact({
  port: port,
  consumer: "dog-consumer",
  provider: "dog-provider",
  pactfileWriteMode: 'update',
  logLevel: 'info'
})


describe("dogs service", () => {

  describe("all dogs request", () => {
    beforeAll(() =>
      dogPact.setup()
        .then(() => {
          dogPact.addInteraction({
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
                "Content-Type": "application/json; charset=utf-8",
              },
              body: EXPECTED_DOGS_BODY,
            },
          })
        }
        )
    )

    it("returns all dog records", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      allDogsRequest(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_DOGS_BODY)
        done()
      }, done)

    })

    afterEach(() => dogPact.verify())
    afterAll(() => dogPact.finalize())

  })


  describe("get /dog/1", () => {
    beforeAll(() =>
      dogPact.setup().then(() => {
        dogPact.addInteraction(
          {
            state: "i have a list of dogs",
            uponReceiving: "a request for a single dog",
            withRequest: {
              method: "GET",
              path: "/dogs/1",
              headers: {
                Accept: "application/json"
              },
            },
            willRespondWith: {
              status: 200,
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              body: EXPECTED_DOG1_BODY,
            },
          }
        )
      }
      )
    )


    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }

      dog1Request(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_DOG1_BODY)
        done()
      }, done)
    })


    afterEach(() => dogPact.verify())
    afterAll(() => dogPact.finalize())

  }
  )




})
