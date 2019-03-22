"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var primitives_1 = require("styled-components/primitives");
var react_primitives_1 = require("react-primitives");
var foo_1 = require("@chatapp/foo");
var Outer = primitives_1.default.Text(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: blue;\n  font-weight: bold;\n"], ["\n  color: blue;\n  font-weight: bold;\n"])));
var Inner = primitives_1.default.Text(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: green;\n"], ["\n  color: green;\n"])));
var Innerer = primitives_1.default.Text(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: magenta;\n"], ["\n  color: magenta;\n"])));
exports.Biz = function () { return React.createElement(react_primitives_1.View, null,
    React.createElement(Outer, null,
        "biz ",
        React.createElement(Inner, null,
            "baz ",
            React.createElement(Innerer, null, foo_1.foo)))); };
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map