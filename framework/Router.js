import EventEmitter from "events";

const emitter = new EventEmitter();


export default class Router {
  constructor() {
    this.endpoint = {};
  }
  request(method, path, handler) {
    if (!this.endpoint[path]) {
      this.endpoint[path] = {};
    }
    const endpoint = this.endpoint[path];
    if (endpoint[method]) {
      throw new Error(`Метод ${method} существует по пути ${path}`);
    }
    endpoint[method] = handler;
  }
  get(path, handler) {
    this.request("GET", path, handler);
  }
  post(path, handler) {
    this.request("POST", path, handler);
  }
  put(path, handler) {
    this.request("PUT", path, handler);
  }
  delete(path, handler) {
    this.request("DELETE", path, handler);
  }
}
