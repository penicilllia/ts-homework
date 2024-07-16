"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (Gender = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["A_PLUS"] = "A+";
    BloodGroup["A_MINUS"] = "A-";
    BloodGroup["B_PLUS"] = "B+";
    BloodGroup["B_MINUS"] = "B-";
    BloodGroup["A_B_PLUS"] = "AB+";
    BloodGroup["A_B_MINUS"] = "AB-";
    BloodGroup["ZERO_PLUS"] = "O+";
    BloodGroup["ZERO_MINUS"] = "O-";
})(BloodGroup || (BloodGroup = {}));
var Role;
(function (Role) {
    Role["USER"] = "user";
    Role["MODERATOR"] = "moderator";
    Role["ADMIN"] = "admin";
})(Role || (Role = {}));
function getUsers(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url);
            const responseData = yield response.data;
            console.log(responseData);
            return responseData;
        }
        catch (error) {
            console.error(error);
        }
    });
}
getUsers('https://dummyjson.com/users');
getUsers('https://dummyjson.com/userss');
