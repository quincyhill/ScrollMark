interface Pilot {
  id: number
  name: string
  years: number
}

const pilots: Pilot[] = [
  {
    id: 10,
    name: 'Poe Dameron',
    years: 14,
  },
  {
    id: 2,
    name: "Temmin 'Snap' Wexley",
    years: 30,
  },
  {
    id: 41,
    name: 'Tallissan Lintra',
    years: 16,
  },
  {
    id: 99,
    name: 'Ello Asty',
    years: 22,
  },
]

const pilotIds = pilots.map(function (pilot) {
  return pilot.id
})

// Sum the years of the pilots

const totalPilotYears = pilots.reduce((total, pilot) => total + pilot.years, 0)

const oldestPilot = pilots.reduce((prevPilot, pilot) => {
  return prevPilot.years > pilot.years ? prevPilot : pilot
}, <Pilot>{})

const youngestPilot = pilots.reduce((prevPilot, pilot) => {
  return prevPilot.years < pilot.years ? prevPilot : pilot
}, <Pilot>{})

console.log('Total years of pilots: ', totalPilotYears)

console.log(
  'Oldest pilot: ',
  oldestPilot.name,
  'and they have',
  oldestPilot.years,
  'years of experience'
)

console.log(
  'Youngest pilot: ',
  youngestPilot.name,
  'and they have',
  youngestPilot.years,
  'years of experience'
)
