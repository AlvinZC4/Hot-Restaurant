// Dependencies
const express = require("express")
const path = require("path")

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
    res.sendFile(path.join(__dirname +"/assets", "home.html"))
})

app.get("/api/waitlist", function(req, res) {
    return res.json(waitList)
})

app.get("/api/tables", function(req, res) {
    return res.json(hasTable)
})

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname +"/assets", "tables.html"))
})

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reservationform.html"))
})

app.post("/api/reservations", function(req, res) {
        const postReceived = req.body

        console.log(postReceived)

        let newReservation = new Reservation(postReceived.name, postReceived.phone, postReceived.email, postReceived.id)

        console.log(newReservation)
        console.log("Tables available: " + tablesAvailable)

        if (tablesAvailable === 0) {
            waitList.push(newReservation)
            console.log("wait List - \n" + newReservation)
        }
        else {
            hasTable.push(newReservation)
            tablesAvailable = tablesAvailable - 1
            console.log("At Table \n" + newReservation)
            console.log("Now there are : " + tablesAvailable + " tables available")
        }
    })


//Starts the server to being listening
app.listen(PORT, function() {
    console.log("Hot Restaurant listening on PORT " + PORT)
})