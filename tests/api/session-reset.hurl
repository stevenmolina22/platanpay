POST {{host}}/sessions/hurl-test/reset
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.message" == "Sesión reseteada."
