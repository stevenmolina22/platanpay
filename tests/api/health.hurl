GET {{host}}/health
HTTP 200
[Asserts]
jsonpath "$.ok" == true
jsonpath "$.sessions" >= 0
