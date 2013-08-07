package main

import (
	"log"
	"github.com/homburg/adhocrest"
	"net/http"
)

func main() {
	http.Handle("/static/", http.FileServer(http.Dir(".")))
	http.Handle("/", adhocrest.NewHandler(""))

	addr := "0.0.0.0:8000"
	log.Printf("Starting server (%s)...\n", addr)
	http.ListenAndServe(addr, nil)
}

