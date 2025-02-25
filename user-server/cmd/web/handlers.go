package main

import (
	"encoding/json"
	"net/http"
)

func (app *application) homePage(w http.ResponseWriter, r *http.Request) {
	client := http.Client{}
	req, err := http.NewRequest("GET", "http://localhost:3000/api/products", nil)
	if err != nil {
		app.serverError(w, err)
	}

	res, err := client.Do(req)
	if err != nil {
		app.serverError(w, err)
	}

	var input []Product

	dec := json.NewDecoder(res.Body)
	err = dec.Decode(&input)
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.render(w, http.StatusOK, "home.tmpl", &templateData{Products: &input})
}
