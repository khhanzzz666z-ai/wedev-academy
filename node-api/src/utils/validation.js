// Input validation helpers
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  // min 6 chars, at least 1 uppercase, 1 lowercase, 1 number
  return (
    password &&
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

const validateAuthRegister = (body) => {
  const errors = {};
  if (!body.fullname || body.fullname.trim().length < 2)
    errors.fullname = "Fullname must be at least 2 characters";
  if (!validateEmail(body.email)) errors.email = "Invalid email format";
  if (!validatePassword(body.password))
    errors.password =
      "Password must have 6+ chars with uppercase, lowercase, and number";
  return errors;
};

const validateAuthLogin = (body) => {
  const errors = {};
  if (!validateEmail(body.email)) errors.email = "Invalid email format";
  if (!body.password) errors.password = "Password required";
  return errors;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateAuthRegister,
  validateAuthLogin,
};
