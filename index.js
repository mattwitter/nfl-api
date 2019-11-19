const bodyParser = require('body-parser')
const express = require('express')
const Sequelize = require('sequelize')
const models = require('./models')

const app = express()

const Op = Sequelize.Op;


app.get('/teams', async (request, response) => {
    const teams = await models.Teams.findAll()
    response.send(teams)
})


app.get('/teams/:id', async (request, response) => {
    const matchingTeam = await models.Teams.findAll({
        where: { [Op.or]: [{ id: request.params.id }, { location: request.params.id }, { mascot: request.params.id }, { abbreviation: request.params.id }, { conference: request.params.id }, { division: request.params.id }] }
    })

    if (matchingTeam.length) {
        response.send(matchingTeam)
    } else {
        response.status(404).send('Sorry, but the princess is in another castle')
    }
})



app.post('/teams', bodyParser.json(), async (request, response) => {
    const { location, mascot, abbreviation, conference, division } = request.body

    if (!location || !mascot || !abbreviation || !conference || !division) {
        response.status(400).send('The following attributes are required: location, mascot, abbreviation, conference, division')
    }

    const newTeam = await models.Teams.create({ location, mascot, abbreviation, conference, division })

    response.status(201).send(newTeam)
})

const server = app.listen(1337, () => { console.log('Listening on port 1337') })

module.exports = server