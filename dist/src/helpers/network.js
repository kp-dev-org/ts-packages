"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentIpAddress = void 0;
const os_1 = require("os");
function getCurrentIpAddress() {
    const interfaces = (0, os_1.networkInterfaces)();
    for (const name of Object.keys(interfaces)) {
        const networkInterface = interfaces[name];
        if (networkInterface) {
            for (const net of networkInterface) {
                // Skip internal (i.e. 127.0.0.1) and non-IPv4 addresses
                if (net.family === 'IPv4' && !net.internal) {
                    return net.address;
                }
            }
        }
    }
    return null;
}
exports.getCurrentIpAddress = getCurrentIpAddress;
