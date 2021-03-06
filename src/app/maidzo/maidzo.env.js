angular.module("app.maidzo.env", [])

.constant("ENV", {
	"name": "development",
	"API_CONFIG": {
		"url": "http://api.v3.maidzo.dev:8000/"
	},
	"SITE_CONFIG": {
		"url": "http://localhost:3000/"
	},
	"BOT_CONFIG": {
		"url": "http://bot.maidzo.xyz/"
	}
})

;