"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello, this is from router");
});
router.get("/:id", (req, res) => {
    res.send(`Its a ${req.params.id} route!!`);
});
exports.default = router;
