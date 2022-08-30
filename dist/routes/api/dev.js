"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const devRoute = (0, express_1.Router)();
devRoute.get("/", (req, res) => {
    res.send("/api/dev");
});
exports.default = devRoute;
