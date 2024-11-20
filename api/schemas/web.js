module.exports= {
    type: "object",
    required: ["businessCIF", "city", "activity", "heading", "summary"],
    properties: {
        businessCIF: {
            type: "string",
            example: "W38953293"
        },
        city: {
            type: "string",
            example: "Madrid"
        },
        activity: {
            type: "string",
            example: "Restaurant"
        },
        heading: {
            type: "string",
            example: "Casa Tarradellas"
        },
        summary:{
            type: "string",
            example: "Casa Tarradellas is a restaurant in Madrid."
        }
    }
}