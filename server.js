// Dependencies
const express = require("express")
const path = require("path")

const app = express()
const PORT = 8080

const reservations = []
const hasTable = []
const waitList = []
let tablesAvailable = 5

class Reservation {
    constructor(name, phone, email, id) {
        this.name = name
        this.phone = phone
        this.email = email
        this.id = id
    }
}

app.get("/",function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"))
})

app.get("/api/waitlist", function(req, res) {
    return res.json(waitList)
})

app.get("/api/tables", function(req, res) {
    return res.json(hasTable)
})

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"))
})

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"))
})
