const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getOneUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.get("/:id", getOneUser);

module.exports = router;
