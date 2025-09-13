"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayService = exports.HttpService = void 0;
const base_1 = require("./base");
class HttpService extends base_1.BaseService {
}
exports.HttpService = HttpService;
class ApiGatewayService extends HttpService {
    constructor(serviceInfo, serviceDiscovery, routeDiscoveryService) {
        super(serviceInfo, serviceDiscovery);
        this.serviceInfo = serviceInfo;
        this.routeDiscoveryService = routeDiscoveryService;
        this.serviceDiscovery = serviceDiscovery;
    }
}
exports.ApiGatewayService = ApiGatewayService;
