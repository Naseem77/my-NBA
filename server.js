const express = require('express')
const app = express()
const path = require('path')
const urllib = require('urllib')


const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


app.get('/teams/:teamName', (req, res) => {
    let players = []
    let value = req.params.teamName
    let data = []
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function(err, response){
        let temp = []
        temp.push(JSON.parse(response.toString()))

        data = temp[0].league.standard

        for(let d of data){
            if(d.isActive === true && d.teams[0] !== undefined && d.teams[0].teamId === teamToIDs[value]){
                d.img = 'https://nba-players.herokuapp.com/players/'+ d.lastName + "/" + d.firstName
                players.push(d)
            }

        }
        res.send(players)
    })
    
})



const port = 3000
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})
