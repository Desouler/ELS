class ResponseUtil {
    createResponse(data: any, status = 200, message = "") {
        return {
            status,
            message,
            data
        };
    }

    createSuccessResponse(data: any) {
        return this.createResponse(data, 200, "");
    }

    createErrorResponse(message: string) {
        return this.createResponse(null, 500, message);
    }
}

export default new ResponseUtil();