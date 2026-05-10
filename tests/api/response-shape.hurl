# Verifies every field in a successful /chat response is present and typed correctly

POST {{host}}/sessions/hurl-shape/reset
HTTP 200

POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "hurl-shape",
  "message": "test shape"
}
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.reply" isString
jsonpath "$.reply" != ""
jsonpath "$.toolCalls" isCollection
jsonpath "$.stopReason" isString
jsonpath "$.usage" isCollection
jsonpath "$.usage.input" isInteger
jsonpath "$.usage.output" isInteger
jsonpath "$.usage.cacheRead" isInteger
jsonpath "$.usage.cacheCreate" isInteger
jsonpath "$.usage.input" >= 0
jsonpath "$.usage.output" >= 0
jsonpath "$.usage.cacheRead" >= 0
jsonpath "$.usage.cacheCreate" >= 0

POST {{host}}/sessions/hurl-shape/reset
HTTP 200
