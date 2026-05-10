# Missing sessionId only
POST {{host}}/chat
Content-Type: application/json
{
  "message": "busco algo"
}
HTTP 400
[Asserts]
jsonpath "$.ok" == false
jsonpath "$.error" == "bad_request"

# Missing message only
POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "hurl-missing"
}
HTTP 400
[Asserts]
jsonpath "$.ok" == false
jsonpath "$.error" == "bad_request"

# Whitespace-only sessionId
POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "   ",
  "message": "test"
}
HTTP 400
[Asserts]
jsonpath "$.ok" == false
jsonpath "$.error" == "bad_request"

# Whitespace-only message
POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "hurl-ws",
  "message": "   "
}
HTTP 400
[Asserts]
jsonpath "$.ok" == false
jsonpath "$.error" == "bad_request"

# Numeric sessionId (wrong type)
POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": 123,
  "message": "test"
}
HTTP 400
[Asserts]
jsonpath "$.ok" == false
jsonpath "$.error" == "bad_request"
