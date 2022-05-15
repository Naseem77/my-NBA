const express = require('express')
const router = express.Router()
const urllib = require('urllib')

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

const dreamTeam = []
const players = []

router.get('/teams/:teamName', (req, res) => {
    let value = req.params.teamName
    let valueLowerCase = value.toLowerCase();
    let data = []
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function(err, response){
        let temp = []
        temp.push(JSON.parse(response.toString()))

        data = temp[0].league.standard

        for(let d of data){
            if(d.isActive === true && d.teams[0] !== undefined && d.teams[0].teamId === teamToIDs[valueLowerCase]){
                d.img = 'https://nba-players.herokuapp.com/players/'+ d.lastName + "/" + d.firstName
                players.push(d)
            }

        }
        res.send(players)
    })
    
})

router.put('/teams', function(req, res){
  let name = req.body.teamName
  let id = req.body.teamId
  teamToIDs[name] = id
  res.end()
})
router.get('/dreamTeam', (req, res) => {
    res.send(dreamTeam)
})
router.post('/addPlayer', function(req, res){
    if(dreamTeam.length < 5){
        dreamTeam.push(req.body)
    } else{
        console.log("Your dream team has reached 5 players!")
    }
  res.end()
})
module.exports = router