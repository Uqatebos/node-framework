const users = [
  { id: 1, name: "Jenya" },
  { id: 2, name: "Grisha" },
];

export const getUser = (req, res) => {
  if (req.params.id) {
    return res.send(users.find((user) => user.id == req.params.id));
  }
  res.send(users);
};

export const createUser = (req, res) => {
  const user = req.body;
  users.push(user);
  res.send(users);
};
