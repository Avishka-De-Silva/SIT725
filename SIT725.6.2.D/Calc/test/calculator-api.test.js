// calculator-api.test.js

describe("Calculator API", function () {
  let expect;

  before(async () => {
    expect = (await import("chai")).expect;
  });

  const request = require("request");
  const baseUrl = "http://localhost:3000";

  // API root reachable
  it("returns status 200 to check if API root is reachable", function (done) {
    request(baseUrl, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  // Division by zero
  it("should return error when dividing by zero", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "divide", a: 10, b: 0 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Cannot divide by zero");
        done();
      }
    );
  });

  // Missing parameters
  it("should return error for missing parameters", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "add", a: 10 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Invalid or missing parameters");
        done();
      }
    );
  });

  // Non-numeric input
  it("should return error for non-numeric input", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "add", a: "abc", b: "def" } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Invalid or missing parameters");
        done();
      }
    );
  });

  // Invalid operation
  it("should return error for unsupported operation", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "power", a: 2, b: 3 } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Invalid operation");
        done();
      }
    );
  });

  // Large number input
  it("should correctly handle very large number inputs", function (done) {
    const largeNumber = Number.MAX_SAFE_INTEGER;
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "add", a: largeNumber, b: largeNumber } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        const result = JSON.parse(body);
        expect(result.result).to.equal(largeNumber + largeNumber);
        done();
      }
    );
  });

  // Missing both parameters
  it("should return error when both parameters are missing", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "add" } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Invalid or missing parameters");
        done();
      }
    );
  });

  // Only one non-numeric input
  it("should return error when one input is non-numeric", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: { operation: "subtract", a: "10", b: "abc" } },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Invalid or missing parameters");
        done();
      }
    );
  });

  // Empty query parameters
  it("should return error when query parameters are empty", function (done) {
    request.get(
      `${baseUrl}/calculate`,
      { qs: {} },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        const result = JSON.parse(body);
        expect(result.error).to.include("Invalid or missing parameters");
        done();
      }
    );
  });
});
