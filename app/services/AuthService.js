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
var UserinfoDAO_1 = require("../repos/UserinfoDAO");
var App_1 = require("../..//utils/App");
var Props_1 = require("../../constants/Props");
var RawQuery_1 = require("../common/RawQuery");
var MenuGroupDAO_1 = require("../repos/MenuGroupDAO");
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.userinfoDAO = new UserinfoDAO_1.UserinfoDAO();
        this.rawQuery = new RawQuery_1.RawQuery();
        this.menuGroupRepository = new MenuGroupDAO_1.MenuGroupDAO();
    }
    AuthService.prototype.signin = function (reqData) {
        return this.Response(reqData);
    };
    AuthService.prototype.refreshToken = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var responseData, jwtData, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!reqData) {
                            throw { status: 0, message: "Invalid Data" };
                        }
                        responseData = {};
                        return [4 /*yield*/, App_1.App.DecodeJWT(reqData.token)];
                    case 1:
                        jwtData = _b.sent();
                        if (!(jwtData && jwtData.identity)) return [3 /*break*/, 3];
                        responseData.identity = jwtData.identity;
                        _a = responseData;
                        return [4 /*yield*/, App_1.App.EncodeJWT(responseData)];
                    case 2:
                        _a.access_token = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (jwtData && jwtData.message) {
                            throw { status: 0, message: jwtData.message, expiredAt: jwtData.expiredAt };
                        }
                        else {
                            throw { status: 0, message: "Invalid JWT" };
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/, responseData];
                    case 5:
                        error_1 = _b.sent();
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.reteriveUserDetails = function (accountObj) {
        return __awaiter(this, void 0, void 0, function () {
            var responseData, menuList, salesmanids, wareHouse, wareHouseNamear, wareHouseNameEn, _a, testStoreIds, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, , 14]);
                        responseData = {};
                        return [4 /*yield*/, this.menuGroupRepository.search({ group: { groupid: accountObj.groupid }, active: true })];
                    case 1:
                        menuList = _b.sent();
                        salesmanids = [];
                        return [4 /*yield*/, this.unflatten(menuList)];
                    case 2:
                        menuList = _b.sent();
                        if (!(accountObj.userGroupConfig && accountObj.userGroupConfig.inventlocationid)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.rawQuery.getWareHouseDetails(accountObj.userGroupConfig.inventlocationid)];
                    case 3:
                        wareHouse = _b.sent();
                        if (!(accountObj.userGroupConfig.salesmanid && accountObj.userGroupConfig.salesmanid !== "")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.rawQuery.salesmanList(accountObj.userGroupConfig.salesmanid)];
                    case 4:
                        salesmanids = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        salesmanids = [];
                        _b.label = 6;
                    case 6:
                        wareHouseNamear = wareHouse && wareHouse.length > 0 ? wareHouse[0].name : "";
                        wareHouseNameEn = wareHouse && wareHouse.length > 0 ? wareHouse[0].namealias : "";
                        if (!(accountObj != null)) return [3 /*break*/, 8];
                        responseData.user = {};
                        responseData.user.id = accountObj.id;
                        responseData.user.userName = accountObj.userName;
                        responseData.user.fullName = accountObj.fullName;
                        responseData.user.email = accountObj.email;
                        responseData.user.role = accountObj.role;
                        responseData.user.status = accountObj.status;
                        responseData.user.securitytoken = accountObj.securitytoken;
                        responseData.user.phone = accountObj.phone;
                        responseData.user.groupid = accountObj.groupid;
                        responseData.menuList = menuList;
                        responseData.user.role = accountObj.userGroup ? accountObj.userGroup.role : null;
                        responseData.usergroupconfigid = accountObj.userGroupConfig.id;
                        responseData.user.usergroupconfigid = accountObj.userGroupConfig.id;
                        responseData.user.wareHouseName = accountObj.userGroup ? accountObj.userGroup.groupname : null;
                        responseData.user.wareHouseNameEn = wareHouseNameEn;
                        responseData.user.wareHouseNameAr = wareHouseNamear;
                        responseData.warehouse = accountObj.userGroupConfig.inventlocationid;
                        responseData.dataareaid = accountObj.userGroupConfig.dataareaid;
                        responseData.user.dataareaid = accountObj.userGroupConfig.dataareaid;
                        responseData.user.inventlocationid = accountObj.userGroupConfig.inventlocationid;
                        responseData.user.defaultcustomerid = accountObj.userGroupConfig.defaultcustomerid;
                        responseData.user.additionalcustomer = accountObj.userGroupConfig.additionalcustomer;
                        responseData.user.sabiccustomers = accountObj.userGroupConfig.sabiccustomers;
                        responseData.user.customergroup = accountObj.userGroupConfig.customergroup;
                        responseData.user.workflowcustomers = accountObj.userGroupConfig.workflowcustomers;
                        responseData.user.salesmanid = salesmanids;
                        responseData.user.ledgerAccount = accountObj.userGroupConfig.ledgeraccount;
                        responseData.user.showroomCountryCode = accountObj.userGroupConfig.showroomCountryCode;
                        responseData.user.showroomCityCode = accountObj.userGroupConfig.showroomCityCode;
                        responseData.user.showroomDistrictCode = accountObj.userGroupConfig.showroomDistrictCode;
                        responseData.identity = {};
                        responseData.identity = responseData.user;
                        delete responseData.user;
                        _a = responseData;
                        return [4 /*yield*/, App_1.App.EncodeJWT({ identity: responseData.identity })];
                    case 7:
                        _a.access_token = _b.sent();
                        return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, Promise.reject({ status: 0, message: "INVALID_USERNAME_PASSWORD" })];
                    case 9:
                        if (!(process && process.env && process.env.ENV_STORE_ID && process.env.ENV_STORE_ID != "")) return [3 /*break*/, 10];
                        if (responseData &&
                            responseData.identity &&
                            responseData.identity.inventlocationid != process.env.ENV_STORE_ID) {
                            return [2 /*return*/, Promise.reject({ status: 0, message: "USER_NOT_RELATED_TO_THIS_STORE" })];
                        }
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, RawQuery_1.RawQuery.ConstData("OFFLINE_STORES")];
                    case 11:
                        testStoreIds = _b.sent();
                        Props_1.Props.testStoreIds = testStoreIds.data;
                        if (Props_1.Props.testStoreIds.includes(responseData.identity.inventlocationid)) {
                            // offlineSystems = offlineSystems.find((v: any) => v.id == responseData.identity.inventlocationid);
                            // if (offlineSystems) {
                            return [2 /*return*/, Promise.reject({
                                    message: "USER_CANNOT_LOGIN_FROM_WEBSITE",
                                })];
                            //
                        }
                        _b.label = 12;
                    case 12: return [2 /*return*/, Promise.resolve(responseData)];
                    case 13:
                        error_2 = _b.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.unflatten = function (arr) {
        var newData = [];
        var _loop_1 = function (item) {
            if (!item.menu.parentId) {
                var children = arr.filter(function (v) { return v.menu.parentId == item.menu.id; });
                item.children = children;
                newData.push(item);
            }
        };
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            _loop_1(item);
        }
        return newData;
    };
    AuthService.prototype.Response = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var isVid, responseData, query, profileObj, auth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isVid = true;
                        responseData = {};
                        query = { userName: reqData.userName.trim(), email: reqData.userName };
                        return [4 /*yield*/, this.userinfoDAO.findOne(query)];
                    case 1:
                        profileObj = _a.sent();
                        if (profileObj == null) {
                            return [2 /*return*/, Promise.reject({ status: 0, message: "INVALID_USERNAME_PASSWORD" })];
                        }
                        else {
                            auth = false;
                            auth = App_1.App.HashCompareSync(reqData.password, profileObj.password);
                            if (auth == true) {
                                if (profileObj.status == "ACTIVE") {
                                    try {
                                        if (profileObj.userGroup.status == "Inactive") {
                                            return [2 /*return*/, Promise.reject({ status: 0, message: "GROUP_DEACTIVATED_PLEASE_CONTACT_ADMIN" })];
                                        }
                                        else {
                                            return [2 /*return*/, this.reteriveUserDetails(profileObj)];
                                        }
                                    }
                                    catch (err) {
                                        return [2 /*return*/, Promise.reject({ status: 0, message: "NO_GROUP_FOR_THIS_USER" })];
                                    }
                                }
                                else {
                                    return [2 /*return*/, Promise.reject({ status: 0, message: "ACCOUNT_DEACTIVATED_PLEASE_CONTACT_ADMIN" })];
                                }
                            }
                            else {
                                return [2 /*return*/, Promise.reject({ status: 0, message: "INVALID_USERNAME_PASSWORD" })];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.forgotPassword = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var profileObj, error_3, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        profileObj = null;
                        return [4 /*yield*/, this.userinfoDAO.findOne({ userName: reqData.userName.trim(), email: reqData.userName })];
                    case 1:
                        profileObj = _a.sent();
                        if (!!profileObj) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userinfoDAO.findOne({ email: reqData.userName, userName: reqData.userName })];
                    case 2:
                        profileObj = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!profileObj) return [3 /*break*/, 9];
                        profileObj.userGroupConfig = profileObj.userGroupConfig == null ? {} : profileObj.userGroupConfig;
                        profileObj.userGroup = profileObj.userGroup == null ? {} : profileObj.userGroup;
                        profileObj.resetkey = App_1.App.generateOTP(10);
                        return [4 /*yield*/, this.userinfoDAO.save(profileObj)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, App_1.App.SendMail(profileObj.email, "Jaz Sales account activation for '" + profileObj.userName, "ForgotPassword", {
                                name: profileObj.userName,
                                securitytoken: profileObj.resetkey,
                            })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _a.sent();
                        throw { message: "RESET_TOKEN_NOT_SENT", status: 0 };
                    case 8: return [3 /*break*/, 10];
                    case 9: throw { message: "INVALID_USERNAME", status: 0 };
                    case 10: return [2 /*return*/, { message: "PASSWORD_RESET_TOKEN_SENT_TO_MAIL", status: 1 }];
                    case 11:
                        error_4 = _a.sent();
                        throw error_4;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            var profileObj, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        profileObj = null;
                        return [4 /*yield*/, this.userinfoDAO.findOne({ userName: reqData.userName, email: reqData.userName })];
                    case 1:
                        profileObj = _a.sent();
                        if (!!profileObj) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userinfoDAO.findOne({ email: reqData.userName, userName: reqData.userName })];
                    case 2:
                        profileObj = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(profileObj.resetkey == reqData.token)) return [3 /*break*/, 5];
                        profileObj.userGroupConfig = profileObj.userGroupConfig == null ? {} : profileObj.userGroupConfig;
                        profileObj.userGroup = profileObj.userGroup == null ? {} : profileObj.userGroup;
                        profileObj.password = App_1.App.HashSync(reqData.password);
                        profileObj.resetkey = null;
                        return [4 /*yield*/, this.userinfoDAO.save(profileObj)];
                    case 4:
                        data = _a.sent();
                        return [2 /*return*/, { message: "PASSWORD_UPDATED", status: 1 }];
                    case 5: throw { message: "INVALID_TOKEN", status: 0 };
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_5 = _a.sent();
                        throw error_5;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;
