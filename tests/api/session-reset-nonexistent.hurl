# Resetting a session that never existed should still succeed gracefully

POST {{host}}/sessions/hurl-ghost-99999/reset
HTTP 200
[Asserts]
jsonpath "$.ok" == true
