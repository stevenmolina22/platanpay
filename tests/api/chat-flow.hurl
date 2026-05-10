POST {{host}}/sessions/hurl-flow/reset
HTTP 200
[Asserts]
jsonpath "$.ok" == true

POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "hurl-flow",
  "message": "buscame arroz"
}
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.reply" == "Respuesta mock para: buscame arroz"
jsonpath "$.toolCalls" count == 0
jsonpath "$.usage.input" == 0
jsonpath "$.usage.output" == 0
jsonpath "$.usage.cacheRead" == 0
jsonpath "$.usage.cacheCreate" == 0
jsonpath "$.stopReason" == "end_turn"

GET {{host}}/health
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.sessions" == 1

POST {{host}}/sessions/hurl-flow/reset
HTTP 200
[Asserts]
jsonpath "$.ok" == true

GET {{host}}/health
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.sessions" == 0
