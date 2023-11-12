import http from "http";
import EventEmitter from "events";

export default class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  addRouter(router) {
    Object.keys(router.endpoint).forEach((path) => {
      const endpoint = router.endpoint[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          this.middlewares.forEach((middleware) => middleware(req, res));
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
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        console.log(body)
        if (body) {
          req.body = JSON.parse(body);
        }
        const emitted = this.emitter.emit(
          this._getRouteMask(req.url, req.method),
          req,
          res
        );
        if (!emitted) {
          res.end("Not found");
        }
    
      });

    });
  }
  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}
