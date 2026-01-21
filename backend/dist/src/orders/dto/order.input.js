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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOrderInput = exports.UpdateItemQuantityInput = exports.AddItemInput = exports.CreateOrderInput = exports.OrderItemInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let OrderItemInput = class OrderItemInput {
    menuItemId;
    quantity;
};
exports.OrderItemInput = OrderItemInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderItemInput.prototype, "menuItemId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OrderItemInput.prototype, "quantity", void 0);
exports.OrderItemInput = OrderItemInput = __decorate([
    (0, graphql_1.InputType)()
], OrderItemInput);
let CreateOrderInput = class CreateOrderInput {
    items;
};
exports.CreateOrderInput = CreateOrderInput;
__decorate([
    (0, graphql_1.Field)(() => [OrderItemInput]),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemInput),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "items", void 0);
exports.CreateOrderInput = CreateOrderInput = __decorate([
    (0, graphql_1.InputType)()
], CreateOrderInput);
let AddItemInput = class AddItemInput {
    orderId;
    menuItemId;
    quantity;
};
exports.AddItemInput = AddItemInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AddItemInput.prototype, "orderId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AddItemInput.prototype, "menuItemId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddItemInput.prototype, "quantity", void 0);
exports.AddItemInput = AddItemInput = __decorate([
    (0, graphql_1.InputType)()
], AddItemInput);
let UpdateItemQuantityInput = class UpdateItemQuantityInput {
    orderItemId;
    quantity;
};
exports.UpdateItemQuantityInput = UpdateItemQuantityInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateItemQuantityInput.prototype, "orderItemId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateItemQuantityInput.prototype, "quantity", void 0);
exports.UpdateItemQuantityInput = UpdateItemQuantityInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateItemQuantityInput);
let PlaceOrderInput = class PlaceOrderInput {
    orderId;
    paymentMethodId;
};
exports.PlaceOrderInput = PlaceOrderInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PlaceOrderInput.prototype, "orderId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], PlaceOrderInput.prototype, "paymentMethodId", void 0);
exports.PlaceOrderInput = PlaceOrderInput = __decorate([
    (0, graphql_1.InputType)()
], PlaceOrderInput);
//# sourceMappingURL=order.input.js.map