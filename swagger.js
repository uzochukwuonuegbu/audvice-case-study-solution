module.exports = {
    basePath: "/",
    definitions: {
        InvalidResponse: {
            properties: {
                message: {
                    type: "string"
                },
                statusCode: {
                  type: "string"
                }
            },
            type: "object"
          },
        TypeEffectivenessResponse: {
            properties: {
              data: {
                effectiveness: "number",
                sourceId: "string",
                targetId: "string"
              }
            },
            type: "object"
          },
        TypeResponse: {
          properties: {
            data: {
            color: "string",
              name: "string"
            }
          },
          type: "object"
        }
    },
    host: "localhost:3000",
    info: {
        description: "This houses the configuration for our swagger docs",
        title: "Type Effectiveness API",
        version: "1.0.0"
    },
    paths: {
      "/type": {
        get: {
            description: "Get a Type",
          parameters: [
          ],
          produces: [
            "application/json"
          ],
          responses: {
            200: {
              description: "successful operation",
              schema: {
                items: {
                    $ref: "#/definitions/TypeResponse"
                },
                type: "object",
              }
            },
            400: {
              description: "Invalid status value",
              schema: {
                $ref: "#/definitions/InvalidResponse"
              }
            }
          },
        }
      },
      "/type-effectiveness": {
        post: {
            consumes: [
                "application/json"
            ],
            description: "creates a type effectiveness record",
          parameters: [
            {
                description: "id of source type",
              in: "body",
              name: "sourceId",
              required: true
            },
            {
                description: "id of target type",
              in: "body",
              name: "targetId",
              required: true
            },
            {
                description: "effectiveness",
              in: "body",
              name: "effectiveness",
              required: true
            }
          ],
          produces: [
            "application/json"
          ],
          responses: {
            200: {
              description: "successful operation",
              schema: {
                items: {
                    $ref: "#/definitions/TypeEffectivenessResponse"
                },
                type: "object"
              }
            },
            400: {
              description: "Invalid status value",
              schema: {
                $ref: "#/definitions/InvalidResponse"
              }
            }
          },
        }
      }
    },
    schemes: [
        "http"
    ],
    swagger: "2.0"
  }