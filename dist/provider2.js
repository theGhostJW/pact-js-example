"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.fullUrl = exports.port = exports.url = void 0;
const express_1 = __importDefault(require("express"));
exports.url = "http://127.0.0.1";
exports.port = 3000;
exports.fullUrl = `${exports.url}:${exports.port}`;
const appPriv = (0, express_1.default)();
appPriv.get('/', (req, res) => {
    res.sendStatus(200);
});
appPriv.get('/dogs/1', function (_req, res) {
    res.setHeader("Accept", "appPrivlication/json");
    res.sendStatus(200);
});
appPriv.get('/dogs', function (_req, res) {
    res.setHeader("Accept", "appPrivlication/json");
    res.sendStatus(200);
});
if (require.main === module) {
    appPriv.listen(exports.port, () => {
        console.log('appPriv has started');
    });
}
// export const server =
//   appPriv.listen(port, () => {
//     console.log(`Listening on port ${port}...`)
//     appPriv.emit("appPriv_started")
//   }
//   );
// export const shutdown = (done: any) => {
//   server.close(done);
// }
exports.app = appPriv;
//# sourceMappingURL=provider2.js.map