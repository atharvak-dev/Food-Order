"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const payment_method_model_1 = require("./models/payment-method.model");
const payment_method_input_1 = require("./dto/payment-method.input");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let PaymentsResolver = class PaymentsResolver {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async paymentMethods() {
        return this.paymentsService.findAll();
    }
    async myPaymentMethods(user) {
        return this.paymentsService.findByUser(user.id);
    }
    async paymentMethod(id) {
        return this.paymentsService.findOne(id);
    }
    async createPaymentMethod(input, user) {
        return this.paymentsService.create(user.id, input);
    }
    async updatePaymentMethod(id, input) {
        return this.paymentsService.update(id, input);
    }
    async deletePaymentMethod(id) {
        return this.paymentsService.delete(id);
    }
    async setDefaultPaymentMethod(id, user) {
        return this.paymentsService.setDefault(id, user.id);
    }
};
exports.PaymentsResolver = PaymentsResolver;
__decorate([
    (0, graphql_1.Query)(() => [payment_method_model_1.PaymentMethod]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsResolver.prototype, "paymentMethods", null);
__decorate([
    (0, graphql_1.Query)(() => [payment_method_model_1.PaymentMethod]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsResolver.prototype, "myPaymentMethods", null);
__decorate([
    (0, graphql_1.Query)(() => payment_method_model_1.PaymentMethod, { nullable: true }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsResolver.prototype, "paymentMethod", null);
__decorate([
    (0, graphql_1.Mutation)(() => payment_method_model_1.PaymentMethod),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_method_input_1.CreatePaymentMethodInput, Object]),
    __metadata("design:returntype", Promise)
], PaymentsResolver.prototype, "createPaymentMethod", null);
__decorate([
    (0, graphql_1.Mutation)(() => payment_method_model_1.PaymentMethod),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payment_method_input_1.UpdatePaymentMethodInput]),
    __metadata("design:returntype", Promise)
], PaymentsResolver.prototype, "updatePaymentMethod", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsResolver.prototype, "deletePaymentMethod", null);
__decorate([
    (0, graphql_1.Mutation)(() => payment_method_model_1.PaymentMethod),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsResolver.prototype, "setDefaultPaymentMethod", null);
exports.PaymentsResolver = PaymentsResolver = __decorate([
    (0, graphql_1.Resolver)(() => payment_method_model_1.PaymentMethod),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsResolver);
//# sourceMappingURL=payments.resolver.js.map