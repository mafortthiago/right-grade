export class JSONParseError extends Error{
    constructor(message = "Invalid JSON response from server"){
        super(message);
        this.name = "JSONParseError"
    }
}