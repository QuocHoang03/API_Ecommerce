const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getOneUser,
  deleteOneUser,
  updateOneUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.get("/:id", getOneUser);
router.delete("/:id", deleteOneUser);
router.put("/:id", updateOneUser);

module.exports = router;
