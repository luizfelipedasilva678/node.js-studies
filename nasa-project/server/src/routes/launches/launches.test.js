const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    it("should respond with 200 success", async () => {
      await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    }, 10000);
  });

  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "Ncc 1701-D",
      destination: "Kepler-186 f",
    };

    it("should respond with 201 success", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({ ...completeLaunchData, launchDate: "January 4, 2028" })
        .expect(201);

      expect(response.body).toMatchObject({
        ...completeLaunchData,
        launchDate: "2028-01-04T03:00:00.000Z",
      });
    });

    it("should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    it("should catch invalid date", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({ ...completeLaunchData, launchDate: "test" })
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
