POST {{host}}/chat
Content-Type: application/json
{
  "sessionId": "hurl-test"
}
HTTP 400
[Asserts]
jsonpath "$.ok" == false
jsonpath "$.error" == "bad_request"
