const bodyParser = require('body-parser')
const express = require('express')

const teams = require('./teams.json')

const app = express()

app.get('/teams', (request, response) => {
    response.send(teams)
})


app.get('/teams/:id', (request, response) => {
    let matchingTeam;
    console.log(typeof request.params.id)
    if (isNaN(request.params.id)) {
        matchingTeam = teams.filter((team) => {
            return team.abbreviation === request.params.id
        })
    }
    else {
        matchingTeam = teams.filter((team) => {
            return team.id === parseInt(request.params.id)
        })

    }
    if (matchingTeam.length) {
        response.send(matchingTeam)
    } else {
        response.status(404).send('Sorry, but the princess is in another castle')
    }
})



app.post('/teams', bodyParser.json(), (request, response) => {
    const { id, location, mascot, abbreviation, conference, division } = request.body

    if (!id || !location || !mascot || !abbreviation || !conference || !division) {
        response.status(400).send('The following attributes are required: id, location, mascot, abbreviation, converence, division')
    }

    const newTeam = { id, location, mascot, abbreviation, conference, division }

    teams.push(newTeam)
    response.status(201).send(newTeam)
})

const server = app.listen(1337, () => { console.log('Listening on port 1337') })

module.exports = server