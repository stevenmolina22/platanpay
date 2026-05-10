# Two messages in the same session — mock replies each turn correctly

POST {{host}}/sessions/hurl-multi/reset
HTTP 200
[Asserts]
jsonpath "$.ok" == true

POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "hurl-multi",
  "message": "hola"
}
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.reply" == "Respuesta mock para: hola"
jsonpath "$.stopReason" == "end_turn"

POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "hurl-multi",
  "message": "segunda consulta"
}
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.reply" == "Respuesta mock para: segunda consulta"
jsonpath "$.stopReason" == "end_turn"

POST {{host}}/sessions/hurl-multi/reset
HTTP 200
[Asserts]
jsonpath "$.ok" == true
