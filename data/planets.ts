export type Planet = {
  id: 'mercury'|'venus'|'earth'|'mars'|'jupiter'|'saturn'|'uranus'|'neptune';
  name: string;
  title: string;
  summary: string;
  figure1: string;
  figure2: string;
  image: string;
};

export const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    title: 'Surface and Exosphere of Mercury',
    summary: 'Airless, cratered world with extreme temperature swings; tenuous exosphere of Na, K, O.',
    figure1: 'Limb temperature profile',
    figure2: 'Exosphere composition snapshot',
    image: '/assets/planets/mercury.png'
  },
  {
    id: 'venus',
    name: 'Venus',
    title: 'Atmospheric Composition and Surface Conditions of Venus',
    summary: 'Runaway greenhouse, ~92 bar surface pressure, 96% CO₂ with sulfuric acid clouds; super-rotation.',
    figure1: 'Cloud-top wind vectors',
    figure2: 'Surface temperature map',
    image: '/assets/planets/venus.png'
  },
  { id:'earth', name:'Earth', title:'Systems of Earth', summary:'Liquid water oceans, nitrogen-oxygen atmosphere, magnetosphere supports life.', figure1: 'Oceanic currents', figure2: 'Atmospheric layers', image:'/assets/planets/earth.png' },
  { id:'mars', name:'Mars', title:'Mars: Thin Atmosphere, Dust, and Ice', summary:'CO₂-dominated thin air, frequent dust storms, polar caps, past water activity.', figure1: 'Olympus Mons', figure2: 'Polar ice cap', image:'/assets/planets/mars.png' },
  { id:'jupiter', name:'Jupiter', title:'Jupiter: Giant Atmospheres and Storms', summary:'Hydrogen-helium giant with deep jets and persistent anticyclones like the Great Red Spot.', figure1: 'Great Red Spot', figure2: 'Galilean moons', image:'/assets/planets/jupiter.png' },
  { id:'saturn', name:'Saturn', title:'Saturn and Ring System', summary:'Low-density H/He giant; ring particle dynamics and seasonal atmospheric bands.', figure1: 'Ring system', figure2: 'Hexagonal storm', image:'/assets/planets/saturn.png' },
  { id:'uranus', name:'Uranus', title:'Uranus: Tilted Ice Giant', summary:'Methane-rich upper atmosphere, extreme axial tilt, faint ring system.', figure1: 'Axial tilt diagram', figure2: 'Ring system', image:'/assets/planets/uranus.png' },
  { id:'neptune', name:'Neptune', title:'Neptune: Supersonic Winds', summary:'Icy giant with high-velocity winds and transient dark spots; methane gives blue hue.', figure1: 'Great Dark Spot', figure2: 'Triton', image:'/assets/planets/neptune.png' }
];