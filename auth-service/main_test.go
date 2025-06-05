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

func TestValidate(t *testing.T) {
        req := httptest.NewRequest("GET", "/validate", nil)
        req.Header.Set("Authorization", "user-token")
        w := httptest.NewRecorder()
        validate(w, req)
        if w.Code != 200 {
                t.Fatalf("expected status 200 got %d", w.Code)
        }
}
