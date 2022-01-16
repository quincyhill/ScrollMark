interface Personnel {
  id: number
  name: string
  pilotingScore: number
  shootingScore: number
  isForceUser: boolean
}

const personnel: Personnel[] = [
  {
    id: 5,
    name: 'Luke Skywalker',
    pilotingScore: 98,
    shootingScore: 56,
    isForceUser: true,
  },
  {
    id: 82,
    name: 'Sabine Wren',
    pilotingScore: 73,
    shootingScore: 99,
    isForceUser: false,
  },
  {
    id: 22,
    name: 'Zeb Orellios',
    pilotingScore: 20,
    shootingScore: 59,
    isForceUser: false,
  },
  {
    id: 15,
    name: 'Ezra Bridger',
    pilotingScore: 43,
    shootingScore: 67,
    isForceUser: true,
  },
  {
    id: 11,
    name: 'Caleb Dume',
    pilotingScore: 71,
    shootingScore: 85,
    isForceUser: true,
  },
]

// Want to get the total score of force users only
// Will do this all back to back

const totalJediScore: number = personnel
  .filter((person) => person.isForceUser)
  .map((person) => person.pilotingScore + person.shootingScore)
  .reduce((acc, score) => acc + score, 0)

console.log('Total Jedi Score: ', totalJediScore)
