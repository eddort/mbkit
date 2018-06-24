class TagModelError extends Error {}
class InitArgError extends TagModelError {}
class SchemaError extends TagModelError {}
class ValidateSchemaError extends SchemaError {}

module.exports = {
    ValidateSchemaError,
    SchemaError,
    TagModelError,
    InitArgError
}