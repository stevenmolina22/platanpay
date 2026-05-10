# Two independent sessions are tracked separately

POST {{host}}/sessions/hurl-iso-a/reset
HTTP 200
[Asserts]
jsonpath "$.ok" == true

POST {{host}}/sessions/hurl-iso-b/reset
HTTP 200
[Asserts]
jsonpath "$.ok" == true

POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "hurl-iso-a",
  "message": "mensaje sesion a"
}
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.reply" == "Respuesta mock para: mensaje sesion a"

POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "hurl-iso-b",
  "message": "mensaje sesion b"
}
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.reply" == "Respuesta mock para: mensaje sesion b"

GET {{host}}/health
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.sessions" >= 2

# Reset one session — the other stays alive
POST {{host}}/sessions/hurl-iso-a/reset
HTTP 200
[Asserts]
jsonpath "$.ok" == true

# Session b still works after a is gone
POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "hurl-iso-b",
  "message": "sigo vivo"
}
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.reply" == "Respuesta mock para: sigo vivo"

POST {{host}}/sessions/hurl-iso-b/reset
HTTP 200
[Asserts]
jsonpath "$.ok" == true
