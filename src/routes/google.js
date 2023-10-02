const express = require("express");
const router = express.Router();

const authGoogleController = require("../app/controllers/AuthGoogleController");

router.get("/", authGoogleController. RequestPermission);
router.get("/callback",authGoogleController.authenCallback);
router.get("/success", authGoogleController.AuthSuccess);
router.get("/error", authGoogleController.AuthFail);
router.get("/signout", authGoogleController.Signout);

module.exports = router;
