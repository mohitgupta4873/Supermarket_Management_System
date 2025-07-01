module.exports.welcomePage = (req, res) => {
  res.json({ message: "Welcome page" });
};

module.exports.aboutPage = (req, res) => {
  res.json({ message: "About page" });
};

module.exports.profilePage = (req, res) => {
  const user = req.user;
  res.json({ profile: user });
};
