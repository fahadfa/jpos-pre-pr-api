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
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var App_1 = require("../../utils/App");
var ReceiptsService_1 = require("../services/ReceiptsService");
var Words_1 = require("../../utils/Words");
var RawQuery_1 = require("../common/RawQuery");
var ReceiptReport = /** @class */ (function () {
    function ReceiptReport() {
        this.db = typeorm_1.getManager();
        this.receiptService = new ReceiptsService_1.ReceiptsService();
        this.rawQuery = new RawQuery_1.RawQuery();
    }
    ReceiptReport.prototype.execute = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = Object.assign({}, params);
                        return [4 /*yield*/, this.receiptService.entity(data.id)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        data.transDate = new Date(result.cashdate).toISOString().split("T")[0];
                        data.type = result.log;
                        data.isbank = result.log == "bank" ? true : false;
                        data.amount =
                            parseFloat(result.legerJournalTras[1].amountCurCredit) > 0
                                ? parseFloat(result.legerJournalTras[1].amountCurCredit)
                                : parseFloat(result.legerJournalTras[1].amountCurDebit);
                        data.worden = Words_1.en(data.amount);
                        data.wordar = Words_1.ar(data.amount);
                        data.custid = result.legerJournalTras[1].accountNum;
                        data.custnameen = result.legerJournalTras[1].name;
                        data.custnamear = result.legerJournalTras[1].nameArabic;
                        data.bankid = result.legerJournalTras[0].accountNum;
                        data.banknameen = result.legerJournalTras[0].name;
                        data.banknamear = result.legerJournalTras[0].nameArabic;
                        data.remarks = result.description;
                        console.log("ReceiptReport : ", data);
                        return [2 /*return*/, data];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReceiptReport.prototype.report = function (result, params) {
        return __awaiter(this, void 0, void 0, function () {
            var renderData, fileName, title;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        renderData = {};
                        fileName = params.lang == "en" ? "receipt-en" : "receipt-ar";
                        console.log("ReceiptReport File Name: ", fileName);
                        renderData = result;
                        return [4 /*yield*/, this.rawQuery.getAppLangName("RECEIPT_HEADER")];
                    case 1:
                        title = _a.sent();
                        if (title) {
                            result.title = title;
                            console.table(title);
                        }
                        try {
                            return [2 /*return*/, App_1.App.HtmlRender(fileName, renderData)];
                        }
                        catch (error) {
                            throw error;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ReceiptReport;
}());
exports.ReceiptReport = ReceiptReport;
