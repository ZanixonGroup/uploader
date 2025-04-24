"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nyxs = Nyxs;
var axios_1 = require("axios");
var form_data_1 = require("form-data");
var helper_1 = require("./../utils/helper");
function Nyxs(data) {
    return __awaiter(this, void 0, void 0, function () {
        var mime, form, raw;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!Buffer.isBuffer(data))
                        throw new Error("Invalid buffer input!");
                    if ((0, helper_1.FileSize)(data) >= (0, helper_1.MaxFileSize)(1000))
                        throw new Error("Max file upload for catbox is only 1GB!");
                    return [4 /*yield*/, (0, helper_1.MimeType)(data)];
                case 1:
                    mime = _b.sent();
                    form = new form_data_1.default();
                    form.append("file", Buffer.from(data), {
                        filename: mime ? "zxn-" + Date.now() + "." + (mime === null || mime === void 0 ? void 0 : mime.ext) : "",
                        contentType: (mime === null || mime === void 0 ? void 0 : mime.mime) || ""
                    });
                    return [4 /*yield*/, axios_1.default.post("https://uploader.nyxs.pw/upload", form, {
                            headers: __assign(__assign({}, form.getHeaders()), { 'origin': 'https://uploader.nyxs.pw', 'user-agent': 'Postify/1.0.0' })
                        })];
                case 2:
                    raw = _b.sent();
                    return [2 /*return*/, ((_a = raw === null || raw === void 0 ? void 0 : raw.data) === null || _a === void 0 ? void 0 : _a.match(/https:\/\/uploader\.nyxs\.pw\/tmp\/[A-Za-z0-9\-]+\.[A-Za-z0-9]+/)[0]) || null];
            }
        });
    });
}
exports.default = Nyxs;
