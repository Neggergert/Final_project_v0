package main

import (
	"bytes"
	"encoding/json"
	"net/http/httptest"
	"testing"
)

func TestLogin(t *testing.T) {
	payload, _ := json.Marshal(map[string]string{"username": "test", "password": "pass"})
	req := httptest.NewRequest("POST", "/login", bytes.NewBuffer(payload))
	w := httptest.NewRecorder()
	login(w, req)
	if w.Code != 200 {
		t.Fatalf("expected status 200 got %d", w.Code)
	}
}
