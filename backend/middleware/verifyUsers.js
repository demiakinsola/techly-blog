//check if the request contains user roles
const verifyUsers = (...acceptedUsers) => {
  return (req, res, next) => {
    if (!req?.roles) {
      console.log("no roles included");
      return res.sendStatus(401); //unauthorised
    }

    const roles = [...acceptedUsers];
    console.log(roles);
    console.log(req.roles);

    //check if the requested roles is in the array and are present for the user in the database
    const result = req.roles
      .map((role) => roles.includes(role))
      .find((value) => value === true);

      // if the result array does not contain any element
    if (!result) {
      return res.sendStatus(401); //unauthorised
    }
    next();
  };
};

module.exports = verifyUsers;
