import * as api from "./api";
import { identity } from "./functions";

describe("util/api", () => {
  describe("ApiError", () => {
    const err = new api.ApiError("test.test", "500");

    const withoutStack = Object.assign({}, err);

    Object.setPrototypeOf(withoutStack, api.ApiError.prototype);

    test("ApiError", () => {
      expect(err).toBeInstanceOf(Error);
      expect(withoutStack).toMatchSnapshot();
      expect(typeof err.stack).toBe("string");
    });
  });

  describe("fetchData", () => {
    jest.useFakeTimers();

    let res = { json: () => obj, status: 200, statusText: "200" };

    const url = "test.test";
    const reqInfo = { method: "GET", mode: "same-origin" };

    const obj = { succcess: true };

    const resolvedFetch = () => Promise.resolve(res);
    const timeoutFetch = (...args) =>
      new Promise((resolve, reject) => {
        setTimeout(reject, 20000);
      });

    const apiErrorFetch = (...args) =>
      Promise.resolve(
        Object.assign({}, res, { status: 500, statusText: "500" })
      );

    let fetchMock = jest.fn();

    let realFetch;

    beforeAll(() => {
      if (window.fetch) {
        realFetch = window.fetch;
      }
      window.fetch = fetchMock;
    });

    afterAll(() => {
      if (realFetch) {
        window.fetch = realFetch;
      }
    });

    afterEach(() => {
      fetchMock.mockClear();
    });

    const timeoutAssertions = (promise, done) =>
      promise.then(identity, identity).then(maybeError => {
        expect(maybeError).toBeInstanceOf(Error);
        expect(fetchMock.mock.calls[0][0]).toBe(url);
        expect(maybeError.message).toBe("timeout");
        done();
      });

    it("returns the response on status === 200", done => {
      fetchMock.mockImplementation(resolvedFetch);

      api
        .fetchData()(url)
        .then(retrieved => {
          expect(retrieved).toBe(res);
          expect(fetchMock.mock.calls).toHaveLength(1);
          done();
        });
    });

    it("it rejects if status isnt 200", done => {
      fetchMock.mockImplementation(apiErrorFetch);

      api
        .fetchData()(url)
        .then(identity, identity)
        .then(maybeError => {
          expect(maybeError).toBeInstanceOf(api.ApiError);
          expect(fetchMock.mock.calls[0][0]).toBe(url);
          done();
        });
    });

    it("returns an error with message timeout if the request takes too long", done => {
      const timeout = 10000;

      fetchMock.mockImplementation(timeoutFetch);

      timeoutAssertions(api.fetchData(timeout)(url), done);

      jest.runAllTimers();
    });

    it("if no argument is provided sets timeout to 10s", done => {
      fetchMock.mockImplementation(timeoutFetch);

      timeoutAssertions(api.fetchData()(url), done);

      jest.runTimersToTime(10001);
    });

    it("sets timeout to 10s if an invalid integer is provided", done => {
      fetchMock.mockImplementation(timeoutFetch);

      timeoutAssertions(api.fetchData(-2)(url), done);

      jest.runTimersToTime(10001);
    });

    it("if a requestInfo is passed it is used to perform a fetchRequest", done => {
      fetchMock.mockImplementation(resolvedFetch);

      api
        .fetchData()(url, reqInfo)
        .then(retrieved => {
          expect(retrieved).toBe(res);
          expect(fetchMock.mock.calls).toHaveLength(1);
          expect(fetchMock.mock.calls[0]).toEqual([url, reqInfo]);
          done();
        });
    });
  });
});
