"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const {login, executeScan} = require("./ibm-appscan");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const keyId = tl.getInput('keyId', true);
            if (keyId == '') {
                tl.setResult(tl.TaskResult.Failed, 'Key Id cannot be empty');
                return;
            }
            const keySecret = tl.getInput('keySecret', true);
            if (keySecret == '') {
                tl.setResult(tl.TaskResult.Failed, 'Key Secret cannot be empty');
                return;
            }
            const scanId = tl.getInput('scanId', true);
            if (scanId == '') {
                tl.setResult(tl.TaskResult.Failed, 'Scan Id cannot be empty');
                return;
            }
            login(keyId, keySecret).then((token) => {
                console.log('Bearer Token', token);
            
                executeScan(scanId, token).then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
