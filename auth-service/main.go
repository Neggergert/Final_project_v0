package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func login(w http.ResponseWriter, r *http.Request) {
	var creds struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "invalid", http.StatusBadRequest)
		return
	}
	token := creds.Username + "-token"
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}

func main() {
	http.HandleFunc("/login", login)
	log.Println("auth service started on :8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
