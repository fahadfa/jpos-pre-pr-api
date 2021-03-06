"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
        } catch (e){ value: op[0] ? op[1] : void 1, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var App_1 = require("../..//utils/App");
var Config = __importStar(require("../../utils/Config"));
var WebService = /** @class */ (function () {
    function WebService() {
        this.db = typeorm_1.getManager();
        this.transporter = App_1.App.CreateEmailAccount();
    }
    WebService.prototype.feedback = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var mailOptions;
            return __generator(this, function (_a) {
                try {
                    mailOptions = {
                        from: Config.mailOptions.user,
                        to: "admin@abcd.com",
                        subject: "Feed backlink",
                        html: App_1.App.HtmlRender("Feedback", {
                            data: {}
                        })
                    };
                    this.transporter.sendMail(mailOptions, function (err, info) {
                        // return Promise.resolve({ message: "Mail Sent Successfully" });
                        if (err) {
                            return Promise.reject(err);
                        }
                        console.log(info);
                    });
                }
                catch (error) {
                    return [2 /*return*/, Promise.reject({
                            message: "Technical issue in Resetting Password, Sorry for Inconvience"
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    return WebService;
}());
exports.WebService = WebService;
