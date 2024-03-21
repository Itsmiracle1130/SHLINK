"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.successResponse = exports.errorResponse = void 0;
function errorResponse(res, statusCode, error) {
    const responseObject = { statusCode, error };
    return res.status(statusCode).send(responseObject);
}
exports.errorResponse = errorResponse;
function successResponse(res, statusCode, message, data = []) {
    const responseObject = { statusCode, message, data };
    return res.status(statusCode).send(responseObject);
}
exports.successResponse = successResponse;
const handleError = (err, req) => {
    console.log(`
      Error caught at ${req.path}, 
      Request body: ${JSON.stringify(req.body)},
      Request User: ${JSON.stringify(req.user)},
      Request Params: ${JSON.stringify(req.params)}
      Request Query: ${JSON.stringify(req.query)}
      Error Message: ${JSON.stringify(err.message)}
      Error Logs: ${JSON.stringify(err.stack)}
  }`);
};
exports.handleError = handleError;
