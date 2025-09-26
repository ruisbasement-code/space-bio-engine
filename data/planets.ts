export interface Planet {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  facts: { label: string; value: string }[];
  image: string;
  bgGradient?: string;
}

export const planets: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    tagline: "The smallest planet, closest to the Sun.",
    summary: "Mercury is the smallest planet in our solar system and nearest to the Sun. Its orbit is the most eccentric of all the planets.",
    facts: [
      { label: "Day Length", value: "59 Earth days" },
      { label: "Surface Temp", value: "430°C (day), -180°C (night)" },
      { label: "Atmosphere", value: "Thin, mostly oxygen, sodium, hydrogen" }
    ],
    image: "/assets/planets/mercury.png",
  },
  {
    id: "venus",
    name: "Venus",
    tagline: "Thick atmosphere, crushing pressure, scorching temps.",
    summary: "Venus is the second planet from the Sun. It has a thick, toxic atmosphere filled with carbon dioxide and is perpetually shrouded in thick, yellowish clouds of sulfuric acid that trap heat, causing a runaway greenhouse effect.",
    facts: [
      { label: "Day Length", value: "243 Earth days" },
      { label: "Surface Temp", value: "465°C" },
      { label: "Atmosphere", value: "CO₂, N₂" }
    ],
    image: "/assets/planets/venus.png",
  },
  {
    id: "earth",
    name: "Earth",
    tagline: "Our home, with oceans of liquid water.",
    summary: "Our home planet is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
    facts: [
      { label: "Day Length", value: "24 hours" },
      { label: "Surface Temp", value: "15°C (average)" },
      { label: "Atmosphere", value: "N₂, O₂, Ar" }
    ],
    image: "/assets/planets/earth.png",
  },
  {
    id: "mars",
    name: "Mars",
    tagline: "The dusty, cold, desert world.",
    summary: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.",
    facts: [
      { label: "Day Length", value: "24.6 hours" },
      { label: "Surface Temp", value: "-65°C (average)" },
      { label: "Atmosphere", value: "CO₂, Ar, N₂" }
    ],
    image: "/assets/planets/mars.png",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    tagline: "The largest planet, a gas giant.",
    summary: "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red Spot is a centuries-old storm bigger than Earth.",
    facts: [
      { label: "Day Length", value: "9.9 hours" },
      { label: "Cloud Top Temp", value: "-145°C" },
      { label: "Atmosphere", value: "H₂, He" }
    ],
    image: "/assets/planets/jupiter.png",
  },
  {
    id: "saturn",
    name: "Saturn",
    tagline: "Adorned with a dazzling, complex system of icy rings.",
    summary: "Saturn is the sixth planet from the Sun and the second-largest planet in our solar system. Adorned with a dazzling, complex system of icy rings, Saturn is unique among the planets.",
    facts: [
      { label: "Day Length", value: "10.7 hours" },
      { label: "Cloud Top Temp", value: "-175°C" },
      { label: "Atmosphere", value: "H₂, He" }
    ],
    image: "/assets/planets/saturn.png",
  },
  {
    id: "uranus",
    name: "Uranus",
    tagline: "Rotates at a nearly 90-degree angle from the plane of its orbit.",
    summary: "Uranus is the seventh planet from the Sun. It’s a hot, dense fluid of 'icy' materials – water, methane, and ammonia – above a small rocky core.",
    facts: [
      { label: "Day Length", value: "17.2 hours" },
      { label: "Cloud Top Temp", value: "-224°C" },
      { label: "Atmosphere", value: "H₂, He, CH₄" }
    ],
    image: "/assets/planets/uranus.png",
  },
  {
    id: "neptune",
    name: "Neptune",
    tagline: "The dark, cold, and windy ice giant.",
    summary: "Neptune is the eighth and most distant major planet orbiting our Sun. It's dark, cold, and whipped by supersonic winds. It was the first planet located through mathematical calculation.",
    facts: [
      { label: "Day Length", value: "16.1 hours" },
      { label: "Cloud Top Temp", value: "-214°C" },
      { label: "Atmosphere", value: "H₂, He, CH₄" }
    ],
    image: "/assets/planets/neptune.png",
  },
];