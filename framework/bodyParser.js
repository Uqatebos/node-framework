export default (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    console.log(body)
    if (body) {
      req.body = JSON.parse(body);
    }
    console.log(req.body)

  });
};
