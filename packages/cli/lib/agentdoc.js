#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const docs_1 = require("./docs");
const main = async () => {
    const path = process.cwd();
    const packageJson = JSON.parse(fs_1.default.readFileSync(path + "/package.json", "utf8"));
    const agents = await Promise.resolve(`${path + "/lib/index"}`).then(s => __importStar(require(s)));
    const agentAttribute = (key) => {
        if (key === "packageName") {
            return packageJson.name;
        }
        if (key === "description") {
            return packageJson.description;
        }
        if (key === "agents") {
            return Object.keys(agents).join(", ");
        }
    };
    const temp = (0, docs_1.readTemplate)("readme.md");
    const md = ["packageName", "description", "agents"].reduce((tmp, key) => {
        tmp = tmp.replaceAll("{" + key + "}", agentAttribute(key));
        return tmp;
    }, temp);
    fs_1.default.writeFileSync(path + "/README.md", md);
};
main();
