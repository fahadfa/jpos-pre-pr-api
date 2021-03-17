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
var App_1 = require("../../utils/App");
var FixedAssetTableDAO_1 = require("../repos/FixedAssetTableDAO");
var UsergroupconfigDAO_1 = require("../repos/UsergroupconfigDAO");
var RawQuery_1 = require("../common/RawQuery");
var FixedAssetGroupDAO_1 = require("../repos/FixedAssetGroupDAO");
var FixedAssetTableService = /** @class */ (function () {
    function FixedAssetTableService() {
        this.fixedassettableRepository = new FixedAssetTableDAO_1.FixedAssetTableDAO();
        this.usergroupconfigDAO = new UsergroupconfigDAO_1.UsergroupconfigDAO();
        this.rawQuery = new RawQuery_1.RawQuery();
        this.fixedAssetGroupDAO = new FixedAssetGroupDAO_1.FixedAssetGroupDAO();
    }
    FixedAssetTableService.prototype.entity = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fixedassettableRepository.entity(id)];
                    case 1:
                        data = _a.sent();
                        data.createdDateTime = data.createdDateTime
                            ? data.createdDateTime.toISOString().substr(0, 10)
                            : data.createdDateTime;
                        data.lastModifiedDate = data.lastModifiedDate
                            ? data.lastModifiedDate.toISOString().substr(0, 10)
                            : data.lastModifiedDate;
                        data.guaranteeDate = data.guaranteeDate ? data.guaranteeDate.toISOString().substr(0, 10) : data.guaranteeDate;
                        data.insuranceDate1 = data.insuranceDate1 ? data.insuranceDate1.toISOString().substr(0, 10) : data.insuranceDate1;
                        data.insuranceDate2 = data.insuranceDate2 ? data.insuranceDate2.toISOString().substr(0, 10) : data.insuranceDate2;
                        data.lastMaintenance = data.lastMaintenance
                            ? data.lastMaintenance.toISOString().substr(0, 10)
                            : data.lastMaintenance;
                        data.nextMaintenance = data.nextMaintenance
                            ? data.nextMaintenance.toISOString().substr(0, 10)
                            : data.nextMaintenance;
                        data.physicalInventory = data.physicalInventory
                            ? data.physicalInventory.toISOString().substr(0, 10)
                            : data.physicalInventory;
                        data.policyExpiration = data.policyExpiration
                            ? data.policyExpiration.toISOString().substr(0, 10)
                            : data.policyExpiration;
                        data.lastFactorUpdateDate = data.lastFactorUpdateDate
                            ? data.lastFactorUpdateDate.toISOString().substr(0, 10)
                            : data.lastFactorUpdateDate;
                        return [2 /*return*/, data];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FixedAssetTableService.prototype.search = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        item.dataareaid = this.sessionInfo.dataareaid;
                        return [4 /*yield*/, this.fixedassettableRepository.search(item)];
                    case 1:
                        data = _a.sent();
                        data.map(function (i) {
                            i.createdDateTime = i.createdDateTime ? i.createdDateTime.toISOString().substr(0, 10) : i.createdDateTime;
                            i.lastModifiedDate = i.lastModifiedDate ? i.lastModifiedDate.toISOString().substr(0, 10) : i.lastModifiedDate;
                            i.guaranteeDate = i.guaranteeDate ? i.guaranteeDate.toISOString().substr(0, 10) : i.guaranteeDate;
                            i.insuranceDate1 = i.insuranceDate1 ? i.insuranceDate1.toISOString().substr(0, 10) : i.insuranceDate1;
                            i.insuranceDate2 = i.insuranceDate2 ? i.insuranceDate2.toISOString().substr(0, 10) : i.insuranceDate2;
                            i.lastMaintenance = i.lastMaintenance ? i.lastMaintenance.toISOString().substr(0, 10) : i.lastMaintenance;
                            i.nextMaintenance = i.nextMaintenance ? i.nextMaintenance.toISOString().substr(0, 10) : i.nextMaintenance;
                            i.physicalInventory = i.physicalInventory
                                ? i.physicalInventory.toISOString().substr(0, 10)
                                : i.physicalInventory;
                            i.policyExpiration = i.policyExpiration ? i.policyExpiration.toISOString().substr(0, 10) : i.policyExpiration;
                            i.lastFactorUpdateDate = i.lastFactorUpdateDate
                                ? i.lastFactorUpdateDate.toISOString().substr(0, 10)
                                : i.lastFactorUpdateDate;
                        });
                        return [2 /*return*/, data];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FixedAssetTableService.prototype.save = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var cond, fixedassettableData, returnData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.validate(item)];
                    case 1:
                        cond = _a.sent();
                        if (!(cond == true || cond == "updated")) return [3 /*break*/, 3];
                        item.dataareaid = this.sessionInfo.dataareaid;
                        return [4 /*yield*/, this.fixedassettableRepository.save(item)];
                    case 2:
                        fixedassettableData = _a.sent();
                        returnData = { id: fixedassettableData.assetId, message: "SAVED_SUCCESSFULLY" };
                        return [2 /*return*/, returnData];
                    case 3:
                        if (cond == "assetId") {
                            throw { status: 0, message: "RECORD_ALREADY_EXISTS" };
                        }
                        else {
                            throw { status: 0, message: "INVALID_DATA" };
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        throw error_3;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FixedAssetTableService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var entity, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!id) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.fixedassettableRepository.entity(id)];
                    case 1:
                        entity = _a.sent();
                        if (!entity) return [3 /*break*/, 3];
                        entity.deleted = true;
                        entity.deletedby = this.sessionInfo.userName;
                        return [4 /*yield*/, this.fixedassettableRepository.save(entity)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { id: entity.assetId, message: "REMOVED" }];
                    case 3: throw { status: 0, message: "RECORD_NOT_FOUND" };
                    case 4: return [3 /*break*/, 6];
                    case 5: throw { status: 0, message: "INVALID_DATA" };
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _a.sent();
                        throw error_4;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FixedAssetTableService.prototype.validate = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var previousItem, condData, uid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        previousItem = null;
                        if (!(!item.assetId || item.assetId.toString() == "" || item.assetId.toString() == "0")) return [3 /*break*/, 1];
                        item.assetId = null;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.fixedassettableRepository.entity(item.assetId)];
                    case 2:
                        previousItem = _a.sent();
                        _a.label = 3;
                    case 3:
                        condData = [];
                        if (!item.assetId) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.fixedassettableRepository.search({ assetId: item.assetId })];
                    case 4:
                        condData = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!!item.assetId) return [3 /*break*/, 9];
                        if (!(condData.length > 0)) return [3 /*break*/, 6];
                        return [2 /*return*/, "assetId"];
                    case 6: return [4 /*yield*/, this.getaccountNum(item)];
                    case 7:
                        uid = _a.sent();
                        item.assetId = uid;
                        item.createdBy = this.sessionInfo.userName;
                        item.createdDateTime = new Date(App_1.App.DateNow());
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        if (item.lastModifiedDate &&
                            previousItem.lastModifiedDate.toISOString() != new Date(item.lastModifiedDate).toISOString()) {
                            return [2 /*return*/, "updated"];
                        }
                        _a.label = 10;
                    case 10:
                        item.lastModifiedDate = this.sessionInfo.userName;
                        item.lastModifiedDate = new Date(App_1.App.DateNow());
                        return [2 /*return*/, true];
                }
            });
        });
    };
    FixedAssetTableService.prototype.getaccountNum = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var usergroupconfig, data, seqNum, fixedAssetGroup, prevYear, year, hashString, salesId, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.usergroupconfigDAO.findOne({
                                inventlocationid: this.sessionInfo.inventlocationid,
                            })];
                    case 1:
                        usergroupconfig = _a.sent();
                        data = void 0;
                        seqNum = void 0;
                        return [4 /*yield*/, this.fixedAssetGroupDAO.entity(item.assetGroup)];
                    case 2:
                        fixedAssetGroup = _a.sent();
                        if (fixedAssetGroup) {
                            if (fixedAssetGroup.autoNumberSequence) {
                                seqNum = fixedAssetGroup.autoNumberSequence;
                            }
                            else {
                                seqNum = usergroupconfig.fixedassestgroupsequencegroup;
                            }
                        }
                        else {
                            seqNum = usergroupconfig.fixedassestgroupsequencegroup;
                        }
                        return [4 /*yield*/, this.rawQuery.getNumberSequence("FIXEDASSETS", this.sessionInfo.inventlocationid)];
                    case 3:
                        data = _a.sent();
                        if (!data) return [3 /*break*/, 6];
                        prevYear = new Date(data.lastmodifieddate).getFullYear().toString().substr(2, 2);
                        year = new Date().getFullYear().toString().substr(2, 2);
                        data.nextrec = prevYear == year ? data.nextrec : 1;
                        hashString = data.format.slice(data.format.indexOf("#"), data.format.lastIndexOf("#") + 1);
                        salesId = data.format.replace(hashString, year) + "-" + data.nextrec;
                        return [4 /*yield*/, this.rawQuery.updateNumberSequence(data.numbersequence, data.nextrec)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, salesId];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: throw { status: 0, message: "CANNOT_FIND_SEQUENCE_FORMAT_FROM_NUMBER_SEQUENCE_TABLE" };
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_5 = _a.sent();
                        if (error_5 == {}) {
                            error_5 = { status: 0, message: "TECHNICAL_ISSUE_PLEASE_CONTACT_YOUR_TECHNICAL_TEAM" };
                        }
                        throw error_5;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return FixedAssetTableService;
}());
exports.FixedAssetTableService = FixedAssetTableService;
