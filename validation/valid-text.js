// Check whether the input is a string with a length greater than 0
const validText = str => {
  return typeof str === "string" && str.trim().length > 0;
};

module.exports = validText;
