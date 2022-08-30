"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testRoute = (0, express_1.Router)();
testRoute.get("/", (req, res) => {
    res.send("/api/test");
});
exports.default = testRoute;
