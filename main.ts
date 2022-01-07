interface Pilot {
  id: number
  name: string
  faction: string
}

const pilots: Pilot[] = [
  {
    id: 2,
    name: 'Wedge Antilles',
    faction: 'Rebels',
  },
  {
    id: 8,
    name: 'Ciena Ree',
    faction: 'Empire',
  },
  {
    id: 40,
    name: 'Iden Versio',
    faction: 'Empire',
  },
  {
    id: 66,
    name: 'Thane Kyrell',
    faction: 'Rebels',
  },
]

const imperialPilots = pilots.filter((pilot) => pilot.faction === 'Empire')

const rebelPilots = pilots.filter((pilot) => pilot.faction === 'Rebels')

console.log('Imperial Pilots: ', imperialPilots)
console.log('Rebel Pilots: ', rebelPilots)
