package main

import (
	"io/fs"
	"path/filepath"
	"text/template"
	"user-server/ui"
)

type Product struct {
	Id          string   `json:"_id"`
	Name        string   `json:"name"`
	Quantity    int32    `json:"quantity"`
	Price       int32    `json:"price"`
	Description string   `json:"description"`
	Category    []string `json:"category"`
}

type templateData struct {
	Products *[]Product
}

func newTemplateCache() (map[string]*template.Template, error) {
	cache := make(map[string]*template.Template)

	pages, err := fs.Glob(ui.Files, "html/pages/*.tmpl")
	if err != nil {
		return nil, err
	}

	for _, page := range pages {
		name := filepath.Base(page)
		patterns := []string{
			"html/base.tmpl",
			page,
		}

		ts, err := template.New(name).ParseFS(ui.Files, patterns...)
		if err != nil {
			return nil, err
		}
		cache[name] = ts
	}
	return cache, nil
}
