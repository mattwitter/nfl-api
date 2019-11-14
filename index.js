const express = require('express')
const teams = require('./teams.json')

const app = express()

app.get('/teams', (request, response) => {
    response.send(teams)
})


app.get('/teams/:id', (request, response) => {
    let matchingTeam;

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


const server = app.listen(1337, () => { console.log('Listening on port 1337') })

module.exports = server