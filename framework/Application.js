import http from "http";
import EventEmitter from "events";

export default class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
  }

  addRouter(router) {
    Object.keys(router.endpoint).forEach((path) => {
      const endpoint = router.endpoint[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  _createServer() {
    return http.createServer((req, res) => {
      const emitted = this.emitter.emit(
        this._getRouteMask(req.url, req.method),
        req,
        res
      );
      if (!emitted) {
        res.end('Not found');
      }
    });
  }
  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}
