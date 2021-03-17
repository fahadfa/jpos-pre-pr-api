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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var App_1 = require("../../utils/App");
var SalesTableService_1 = require("../services/SalesTableService");
var RawQuery_1 = require("../common/RawQuery");
var InventTransDAO_1 = require("../repos/InventTransDAO");
var UpdateInventoryService_1 = require("../services/UpdateInventoryService");
var UnSyncedTransactions_1 = require("../../entities/UnSyncedTransactions");
var uuid_1 = __importDefault(require("uuid"));
var SalesOrderReport = /** @class */ (function () {
    function SalesOrderReport() {
        this.db = typeorm_1.getManager();
        this.salesTableService = new SalesTableService_1.SalesTableService();
        this.rawQuery = new RawQuery_1.RawQuery();
        this.inventTransDAO = new InventTransDAO_1.InventorytransDAO();
        this.updateInventoryService = new UpdateInventoryService_1.UpdateInventoryService();
    }
    SalesOrderReport.prototype.execute = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRunner, unSyncedData_1, id, data_1, lineids, inventtransids, date, linesCount, inventtransQuery, salesLine, list_1, j, chunkArray, newSalesline_1, sNo_1, quantity_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryRunner = typeorm_1.getConnection().createQueryRunner();
                        return [4 /*yield*/, queryRunner.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 15, 17, 19]);
                        unSyncedData_1 = [];
                        id = params.salesId;
                        return [4 /*yield*/, this.query_to_data(id)];
                    case 4:
                        data_1 = _a.sent();
                        data_1 = data_1.length >= 1 ? data_1[0] : {};
                        data_1.paymentMode = data_1.paymentType == "ONLINE" ? "Online" : data_1.paymentMode;
                        data_1.paymentModeAr = data_1.paymentType == "ONLINE" ? "عبر الانترنت" : data_1.paymentMode;
                        console.log(data_1);
                        // data.lastmodifieddate = App.convertUTCDateToLocalDate(
                        //   new Date(data.lastmodifieddate),
                        //   parseInt(params.timeZoneOffSet)
                        // ).toLocaleString();
                        if (process.env.ENV_STORE_ID) {
                            data_1.lastmodifieddate = data_1.lastmodifieddate
                                ? new Date(data_1.lastmodifieddate).toLocaleString()
                                : data_1.lastmodifieddate;
                        }
                        else {
                            data_1.lastmodifieddate = App_1.App.convertUTCDateToLocalDate(new Date(data_1.lastmodifieddate), parseInt(params.timeZoneOffSet));
                        }
                        if (data_1.paymentMode != "CASH" && data_1.paymentMode != "ONLINE") {
                            if (data_1.iscash) {
                                data_1.paymentMode = "Cash";
                                data_1.paymentModeAr = "السيولة النقدية";
                            }
                            else {
                                data_1.paymentMode = "Credit";
                                data_1.paymentModeAr = "ائتمان";
                            }
                        }
                        if (data_1.paymentMode == "CASH") {
                            data_1.paymentMode = "Cash";
                            data_1.paymentModeAr = "السيولة النقدية";
                        }
                        data_1.twoCopies = data_1.originalPrinted ? false : true;
                        if (!(data_1.status != "RESERVED")) return [3 /*break*/, 11];
                        data_1.originalPrinted = data_1.originalPrinted ? data_1.originalPrinted : false;
                        if (!(data_1.originalPrinted == false)) return [3 /*break*/, 11];
                        unSyncedData_1.push({
                            id: uuid_1.default(),
                            transactionId: params.salesId,
                            transactionTable: "salestable",
                            updatedOn: new Date(),
                        });
                        return [4 /*yield*/, this.db.query("select id from salesline where salesid = '" + params.salesId + "'")];
                    case 5:
                        lineids = _a.sent();
                        return [4 /*yield*/, this.db.query("select id from inventtrans where invoiceid = '" + params.salesId + "'")];
                    case 6:
                        inventtransids = _a.sent();
                        lineids.map(function (v) {
                            unSyncedData_1.push({
                                id: uuid_1.default(),
                                transactionId: v.id,
                                transactionTable: "salesline",
                                updatedOn: new Date(),
                            });
                        });
                        inventtransids.map(function (v) {
                            unSyncedData_1.push({
                                id: uuid_1.default(),
                                transactionId: v.id,
                                transactionTable: "inventtrans",
                                updatedOn: new Date(),
                            });
                        });
                        date = new Date().toISOString();
                        return [4 /*yield*/, this.db.query(" select count(1) as apptype from salesline where salesid in ('" + params.salesId + "')")];
                    case 7:
                        linesCount = _a.sent();
                        linesCount = linesCount.length > 0 ? linesCount[0].apptype : 0;
                        return [4 /*yield*/, this.rawQuery.updateSalesTable(params.salesId.toUpperCase(), "PRINTED", date, linesCount)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.manager.getRepository(UnSyncedTransactions_1.UnSyncedTransactions).save(unSyncedData_1)];
                    case 9:
                        _a.sent();
                        inventtransQuery = "UPDATE inventtrans set reserve_status = 'PRINTED' ";
                        if (date) {
                            inventtransQuery += ",dateinvent = '" + date + "' ";
                        }
                        inventtransQuery += " WHERE invoiceid = '" + params.salesId.toUpperCase() + "'";
                        return [4 /*yield*/, this.db.query(inventtransQuery)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.salesline_query_to_data(id)];
                    case 13:
                        salesLine = _a.sent();
                        list_1 = [];
                        j = 0;
                        return [4 /*yield*/, this.chunkArray(salesLine, 8)];
                    case 14:
                        chunkArray = _a.sent();
                        console.log(chunkArray);
                        list_1 = list_1.concat(chunkArray);
                        newSalesline_1 = [];
                        sNo_1 = 1;
                        quantity_1 = 0;
                        if (params.type != "mobile") {
                            list_1.map(function (val) {
                                data_1.vat = val.length > 0 ? val[0].vat : "-";
                                val.colorant = val.colorant ? val.colorant : "-";
                                var lines = {
                                    amount: Math.round((Number(data_1.amount) + Number.EPSILON) * 100) / 100,
                                    quantity: 0,
                                    netAmount: Math.round((Number(data_1.netAmount) + Number.EPSILON) * 100) / 100,
                                    disc: Math.round((Number(data_1.disc) + Number.EPSILON) * 100) / 100,
                                    vatamount: Math.round((Number(data_1.vatamount) + Number.EPSILON) * 100) / 100,
                                    shippingamount: Math.round((Number(data_1.shippingAmount) + Number.EPSILON) * 100) / 100,
                                    page: 1,
                                    totalPages: list_1.length,
                                    voucherdiscchecked: data_1.voucherdiscchecked,
                                    vouchernum: data_1.vouchernum,
                                    salesId: data_1.salesId,
                                    custAccount: data_1.custAccount,
                                    interCompanyOriginalSalesId: data_1.interCompanyOriginalSalesId,
                                    status: data_1.status,
                                    transkind: data_1.transkind,
                                    customername: data_1.customername,
                                    custmobilenumber: data_1.custmobilenumber,
                                    cname: data_1.cname,
                                    cnamealias: data_1.cnamealias,
                                    invoiceAccount: data_1.invoiceAccount,
                                    cphone: data_1.cphone,
                                    createddatetime: data_1.createddatetime,
                                    lastmodifieddate: data_1.lastmodifieddate,
                                    originalPrinted: data_1.originalPrinted,
                                    inventLocationId: data_1.inventLocationId,
                                    wnamealias: data_1.wnamealias,
                                    wname: data_1.wname,
                                    createdby: data_1.createdby,
                                    deliveryaddress: data_1.deliveryaddress,
                                    salesman: data_1.salesman,
                                    notes: data_1.notes,
                                    deliveryDate: data_1.deliveryDate,
                                    isbreak: data_1.isbreak,
                                    vatGrand: Math.round((Number(data_1.vatamount) + Number.EPSILON) * 100) / 100,
                                    vat: data_1.vat,
                                    paymentType: data_1.paymentType,
                                    shippedDate: data_1.lastmodifieddate.split(",")[0],
                                    paymentMode: data_1.paymentType == "ONLINE" ? "Online" : data_1.paymentMode,
                                    paymentModeAr: data_1.paymentType == "ONLINE" ? "عبر الانترنت" : data_1.paymentModeAr,
                                    cashAmount: Math.round((Number(data_1.cashAmount) + Number.EPSILON) * 100) / 100,
                                    cardAmount: Math.round((Number(data_1.cardAmount) + Number.EPSILON) * 100) / 100,
                                    designServiceRedeemAmount: data_1.designServiceRedeemAmount,
                                    redeemAmount: data_1.redeemAmount,
                                    zipcode: data_1.zipcode,
                                    lines: [],
                                };
                                data_1.isbreak = val.length > 5 ? true : false;
                                val.map(function (v) {
                                    v.netAmount = Math.round((Number(v.netAmount) + Number.EPSILON) * 100) / 100;
                                    v.vatAmount = Math.round((Number(v.vatAmount) + Number.EPSILON) * 100) / 100;
                                    v.lineTotalDisc = Math.round((Number(v.lineTotalDisc) + Number.EPSILON) * 100) / 100;
                                    v.lineAmount = Math.round((Number(v.lineAmount) + Number.EPSILON) * 100) / 100;
                                    v.lineAmountBeforeVat = Math.round((Number(v.lineAmountBeforeVat) + Number.EPSILON) * 100) / 100;
                                    lines.quantity += parseInt(v.salesQty);
                                    v.colorantid = val.colorant;
                                    v.sNo = sNo_1;
                                    lines.lines.push(v);
                                    sNo_1 += 1;
                                });
                                lines.page = list_1.indexOf(val) + 1;
                                lines.quantity = lines.quantity + quantity_1;
                                quantity_1 = lines.quantity;
                                newSalesline_1.push(lines);
                            });
                            data_1.salesLine = newSalesline_1;
                            // data.salesLine.shippedDate = data.lastmodifieddate.split(",")[0];
                            data_1.quantity = 0;
                            data_1.salesLine.map(function (v) {
                                data_1.quantity += parseInt(v.quantity);
                            });
                            return [2 /*return*/, data_1];
                        }
                        else {
                            data_1.salesLine = salesLine;
                            // data.salesLine.shippedDate = data.lastmodifieddate.split(",")[0];
                            data_1.quantity = 0;
                            data_1.salesLine.map(function (v) {
                                data_1.quantity += parseInt(v.salesQty);
                            });
                            return [2 /*return*/, data_1];
                        }
                        return [3 /*break*/, 19];
                    case 15:
                        error_1 = _a.sent();
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 16:
                        _a.sent();
                        throw error_1;
                    case 17: return [4 /*yield*/, queryRunner.release()];
                    case 18:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    SalesOrderReport.prototype.report = function (result, params) {
        return __awaiter(this, void 0, void 0, function () {
            var renderData, file;
            return __generator(this, function (_a) {
                renderData = result;
                console.log("data:----------", renderData.salesLine);
                file = params.lang == "en" ? "test-so-en" : "test-so-ar";
                try {
                    return [2 /*return*/, App_1.App.HtmlRender(file, renderData)];
                }
                catch (error) {
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    SalesOrderReport.prototype.chunkArray = function (myArray, chunk_size) {
        return __awaiter(this, void 0, void 0, function () {
            var index, arrayLength, tempArray, myChunk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = 0;
                        arrayLength = myArray.length;
                        tempArray = [];
                        for (index = 0; index < arrayLength; index += chunk_size) {
                            myChunk = myArray.slice(index, index + chunk_size);
                            // Do something if you want with the group
                            tempArray.push(myChunk);
                        }
                        return [4 /*yield*/, tempArray];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SalesOrderReport.prototype.query_to_data = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            select \n            st.salesid as \"salesId\",\n            st.zipcode as zipcode,\n            st.intercompanyoriginalsalesid as \"interCompanyOriginalSalesId\",\n            st.custaccount as \"custAccount\",\n            st.invoiceaccount as \"invoiceAccount\",\n            st.status as status,\n            st.transkind as transkind,\n            st.salesname as customername,\n            st.mobileno as custmobilenumber,\n            to_char(st.vatamount, 'FM999999999990.00')  as vatamount,\n            to_char(st.netamount, 'FM999999999990.000')  as \"netAmount\",\n            to_char(st.disc, 'FM999999999990.000')  as disc,\n            to_char(st.amount , 'FM999999999990.000') as amount,\n            to_char(st.shipping_amount, 'FM999999999990.000') as \"shippingAmount\",\n            st.salesname as cname,\n            st.salesname as \"cnamealias\",\n            st.voucherdiscchecked as \"voucherdiscchecked\",\n            st.vouchernum as \"vouchernum\",\n            st.payment_type as \"paymentType\",\n            c.phone as \"cphone\",\n            to_char(st.createddatetime, 'DD-MM-YYYY') as createddatetime,\n            st.lastmodifieddate as lastmodifieddate,\n            st.originalprinted as \"originalPrinted\",\n            st.inventlocationid as \"inventLocationId\",\n            w.namealias as wnamealias,\n            w.name as wname,\n            st.payment as \"paymentMode\",\n            st.iscash as iscash,\n            st.createdby,\n            st.description as notes,\n            to_char(st.cash_amount, 'FM999999999990.000') as \"cashAmount\",\n            to_char(st.card_amount, 'FM999999999990.000') as \"cardAmount\",\n            st.shipping_amount as \"shippingAmount\",\n            to_char(st.online_amount, 'FM999999999990.000') as \"onlineAmount\",\n            to_char(st.design_service_redeem_amount, 'FM999999999990.000') as \"designServiceRedeemAmount\",\n            to_char(st.redeemptsamt, 'FM999999999990.000') as \"redeemAmount\",\n            coalesce(st.deliveryaddress, ' ') || (' ') || coalesce(st.citycode, ' ') || (' ') || coalesce(st.districtcode, ' ') || (' ') || coalesce(st.country_code, ' ') as deliveryaddress,\n            concat(d.num,' - ', d.description) as salesman,\n            to_char(st.deliverydate, 'DD-MM-YYYY') as \"deliveryDate\"\n            from salestable st \n            left join dimensions d on st.dimension6_ = d.num\n            left join inventlocation w on w.inventlocationid = st.inventlocationid\n            left join custtable c on c.accountnum = st.custaccount\n            left join paymterm p on p.paymtermid = st.payment\n            where salesid='" + id + "'\n            ";
                        return [4 /*yield*/, this.db.query(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SalesOrderReport.prototype.salesline_query_to_data = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var salesQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salesQuery = "\n              select\n              distinct\n              ln.salesid,\n              ln.itemid,\n              ln.batchno,\n              ln.configid,\n              ln.inventsizeid,\n              ln.saleslineqty,\n              to_char(ln.lineamount, 'FM999999999990.00') as \"netAmount\",\n              to_char(ln.lastmodifieddate, 'DD-MM-YYYY') as \"shippingDate\",\n              to_char(ln.salesqty, 'FM999999999D') as \"salesQty\",\n              to_char(ln.salesprice, 'FM999999999990.000') as salesprice,\n              to_char((ln.vatamount/ln.saleslineqty)*ln.salesqty, 'FM999999999990.000') as \"vatAmount\",\n              to_char((ln.linetotaldisc/ln.saleslineqty)*ln.salesqty, 'FM999999999990.000') as \"lineTotalDisc\",\n              to_char(ln.colorantprice, 'FM999999999990.000') as colorantprice,\n              to_char((ln.lineamount / ln.saleslineqty)*ln.salesqty + (ln.colorantprice*ln.salesqty) - (ln.linetotaldisc / ln.saleslineqty)*ln.salesqty + (ln.vatamount / ln.saleslineqty)*ln.salesqty, 'FM999999999990.000') as \"lineAmount\",\n              ln.prodnamear as \"prodNameAr\",\n              ln.prodnameen as \"prodNameEn\",\n              ln.colNameAr as \"colNameAr\",\n              ln.colNameEn as \"colNameEn\",\n              ln.sizeNameEn as \"sizeNameEn\",\n              ln.sizeNameAr as \"sizeNameAr\",\n              to_char((ln.lineamount/ln.saleslineqty)*ln.salesqty + (ln.colorantprice*ln.salesqty) - (ln.linetotaldisc/ln.saleslineqty)*ln.salesqty, 'FM999999999990.000') as \"lineAmountBeforeVat\",\n              ln.vat as vat,\n              ln.colorantid as colorant,\n              ln.linenum as linenum\n              from\n              (\n                select distinct on (i.id, i.invoiceid, i.itemid, i.configid, i.inventsizeid, i.qty, i.batchno, i.sales_line_id)\n                i.invoiceid as salesid,\n                i.batchno,\n                i.itemid,\n                i.configid,\n                i.inventsizeid,\n                st.status as status,\n                ABS(i.qty) as salesqty,\n                b.itemname as prodnamear,\n                b.namealias as prodnameen,\n                coalesce(sl.salesprice, 0)  as salesprice,\n                coalesce(sl.vatamount, 0)  as vatamount,\n                coalesce(sl.linetotaldisc, 0) as linetotaldisc,\n                coalesce(sl.colorantprice,0) as colorantprice,\n                c.name as colNameAr,\n                c.name as colNameEn,\n                s.description as sizeNameEn,\n                s.name as sizeNameAr,\n                coalesce(sl.lineamount,0) as  lineamount,\n                sl.colorantid as  colorantid,\n                sl.salesqty as saleslineqty,\n                sl.vat as vat,\n                sl.linenum,\n                sl.lastmodifieddate\n                from inventtrans i\n                left join salestable st on st.salesid = i.invoiceid\n                left join salesline sl on sl.id = i.sales_line_id\n                left join inventtable b on i.itemid=b.itemid\n                left join inventsize s on s.itemid = i.itemid and i.inventsizeid = s.inventsizeid\n                left join configtable c on c.configid = i.configid and c.itemid = i.itemid\n                \n            where invoiceid='" + id + "'\n            ) as ln order by linenum ASC\n            ";
                        return [4 /*yield*/, this.db.query(salesQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SalesOrderReport;
}());
exports.SalesOrderReport = SalesOrderReport;
