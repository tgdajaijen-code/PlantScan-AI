import { Plant } from '../types';

export const SAMPLE_PLANTS: Plant[] = [
  {
    id: 'plant-1',
    commonName: 'Aloe Vera',
    scientificName: 'Aloe barbadensis Miller',
    botanicalFamily: 'Asphodelaceae',
    imageUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=300&q=80',
    confidence: 99.2,
    category: 'Medicinal',
    description: 'Aloe Vera is a succulent plant species of the genus Aloe. Known for its thick, fleshy, lance-shaped leaves with serrated margins, it has been cultivated for thousands of years for medicinal, agricultural, and ornamental purposes.',
    medicinalBenefits: [
      'Soothes minor burns, sunburns, and skin irritations',
      'Accelerates wound healing and cell regeneration',
      'Rich in antioxidant vitamins A, C, E, and B12',
      'Supports digestive health when consumed in purified liquid extracts'
    ],
    traditionalUses: [
      'Ancient Egyptian "Plant of Immortality" used in embalming and skin ointments',
      'Ayurvedic medicine as a cooling tonic for digestive fire (Pitta balancing)',
      'Traditional Mediterranean herbal poultice for insect bites and minor rashes'
    ],
    toxicity: {
      level: 'mild',
      details: 'Topical gel is non-toxic to humans. Whole leaf latex contains aloin, which can act as a harsh laxative and cause gastrointestinal distress in pets (cats and dogs) if ingested in quantity.',
      affectedPets: ['Cats', 'Dogs']
    },
    habitat: 'Arid, tropical, and semi-tropical climates worldwide in well-drained rocky or sandy soils.',
    nativeRegion: 'Arabian Peninsula',
    growthPeriod: 'Active growth in spring and summer; slow growth in winter.',
    floweringSeason: 'Late spring to early summer in mature specimens.',
    similarSpecies: ['Aloe arborescens', 'Aloe vera var. chinensis', 'Agave americana'],
    edibleStatus: 'Caution Required',
    care: {
      sunlight: 'Bright, indirect sunlight (4-6 hours daily)',
      watering: 'Deeply every 2-3 weeks; allow soil to dry completely between waterings',
      soil: 'Cactus or succulent potting mix with excellent drainage',
      temperature: '18°C - 27°C (65°F - 80°F)',
      humidity: 'Low to moderate (30% - 40%)'
    },
    funFact: 'Aloe Vera clear gel contains over 75 potentially active compounds including vitamins, enzymes, minerals, sugars, and amino acids.'
  },
  {
    id: 'plant-2',
    commonName: 'Swiss Cheese Plant',
    scientificName: 'Monstera deliciosa',
    botanicalFamily: 'Araceae',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=300&q=80',
    confidence: 98.6,
    category: 'Indoor',
    description: 'Famous for its distinctive natural leaf cutouts (fenestrations), Monstera deliciosa is a tropical evergreen vine native to tropical forests. In its natural habitat, it uses aerial roots to climb massive forest trees toward the canopy.',
    medicinalBenefits: [
      'Acts as a natural indoor air filter, reducing volatile airborne compounds',
      'Aids in maintaining comfortable indoor ambient humidity levels',
      'Roots are traditionally used in folk medicine for joint pain compresses'
    ],
    traditionalUses: [
      'Roots harvested by Central American indigenous communities to weave durable baskets and ropes',
      'Ripe, fully mature fruit was eaten as a sweet tropical delicacy tasting like pineapple and banana'
    ],
    toxicity: {
      level: 'severe',
      details: 'Contains insoluble calcium oxalate crystals throughout stems and leaves. Chewing causes immediate oral burning, drooling, vomiting, and difficulty swallowing in dogs, cats, and humans.',
      affectedPets: ['Cats', 'Dogs', 'Horses']
    },
    habitat: 'Tropical rainforest understory, climbing lower trunks of large trees.',
    nativeRegion: 'Southern Mexico & Central America',
    growthPeriod: 'Vigorous climber during warm spring and summer months.',
    floweringSeason: 'Rare indoors; mid-summer in wild tropical settings.',
    similarSpecies: ['Monstera adansonii', 'Philodendron bipinnatifidum', 'Epipremnum aureum'],
    edibleStatus: 'Toxic',
    care: {
      sunlight: 'Medium to bright indirect light',
      watering: 'Water when top 2-3 inches of soil feels dry',
      soil: 'Peat-based potting mix enriched with perlite and pine bark',
      temperature: '20°C - 30°C (68°F - 86°F)',
      humidity: 'High humidity (60%+ preferred)'
    },
    funFact: 'The leaf holes are believed to help the plant withstand heavy tropical hurricane winds without tearing the large leaves!'
  },
  {
    id: 'plant-3',
    commonName: 'German Chamomile',
    scientificName: 'Matricaria chamomilla',
    botanicalFamily: 'Asteraceae',
    imageUrl: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=300&q=80',
    confidence: 97.8,
    category: 'Herbal',
    description: 'An annual flowering plant recognized by its sweet apple-like fragrance and small daisy-like flowers with white ray florets and yellow conical centers. Revered globally as a gentle soothing herbal remedy.',
    medicinalBenefits: [
      'Promotes relaxation and aids restful sleep via apigenin flavonoid antioxidants',
      'Eases digestive spasms, bloating, and stomach discomfort',
      'Anti-inflammatory chamazulene calms skin redness and irritations',
      'Gentle natural antimicrobial gargle for throat comfort'
    ],
    traditionalUses: [
      'Traditional European remedy for insomnia and infant teething restlessness',
      'Infused steam bath for bronchial and sinus clearing',
      'Hair rinse to naturally brighten light hair and restore scalp luster'
    ],
    toxicity: {
      level: 'safe',
      details: 'Non-toxic to humans in standard culinary and tea usage. May cause mild skin reaction in individuals allergic to ragweed or the Asteraceae family.',
      affectedPets: []
    },
    habitat: 'Open fields, sunny meadows, and cultivated herbal gardens.',
    nativeRegion: 'Eastern Europe & Western Asia',
    growthPeriod: 'Fast-growing annual from seed to flower in 8-10 weeks.',
    floweringSeason: 'Early summer to late autumn.',
    similarSpecies: ['Chamaemelum nobile (Roman Chamomile)', 'Anthemis cotula', 'Tanacetum parthenium'],
    edibleStatus: 'Edible',
    care: {
      sunlight: 'Full sun to light partial shade',
      watering: 'Moderate watering; drought tolerant once established',
      soil: 'Average, well-draining soil',
      temperature: '15°C - 22°C (60°F - 72°F)',
      humidity: 'Adaptable to average humidity'
    },
    funFact: 'The name Chamomile derives from the Greek "khamaimelon", meaning "earth apple", because of its fresh green apple scent!'
  },
  {
    id: 'plant-4',
    commonName: 'English Lavender',
    scientificName: 'Lavandula angustifolia',
    botanicalFamily: 'Lamiaceae',
    imageUrl: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=300&q=80',
    confidence: 99.0,
    category: 'Wildflower',
    description: 'An aromatic evergreen shrub with narrow gray-green leaves and dense spikes of fragrant violet-purple blossoms. Celebrated worldwide for its calming aroma and essential oils.',
    medicinalBenefits: [
      'Inhalation of essential oil reduces stress, anxiety, and heart rate variability',
      'Mild natural antiseptic for minor cuts, scrapes, and insect stings',
      'Improves slow-wave deep sleep quality when used in aromatherapy',
      'Alleviates tension headaches when massaged gently on temples'
    ],
    traditionalUses: [
      'Ancient Roman bath additive used to scent water and purify skin',
      'Traditional sachet tucked under pillows to deter pests and induce pleasant dreams',
      'Culinary spice component in traditional Herbes de Provence blends'
    ],
    toxicity: {
      level: 'mild',
      details: 'Concentrated essential oils can cause stomach upset if ingested in large quantities by pets. Pet-safe when planted outdoors in gardens.',
      affectedPets: ['Cats', 'Dogs']
    },
    habitat: 'Sunny, rocky Mediterranean hillsides and sunny gardens.',
    nativeRegion: 'Mediterranean Basin',
    growthPeriod: 'Perennial woody evergreen shrub; active spring growth.',
    floweringSeason: 'Mid-summer to early autumn (June through August).',
    similarSpecies: ['Lavandula stoechas (French Lavender)', 'Lavandula x intermedia (Lavandin)', 'Salvia officinalis'],
    edibleStatus: 'Edible',
    care: {
      sunlight: 'Full direct sun (6+ hours per day)',
      watering: 'Low water requirement; let soil dry completely',
      soil: 'Gritty, lean, alkaline soil with exceptional drainage',
      temperature: '15°C - 28°C (59°F - 82°F)',
      humidity: 'Low humidity preferred; prone to humidity rot if crowded'
    },
    funFact: 'The word "Lavender" comes from the Latin verb "lavare", which means "to wash".'
  },
  {
    id: 'plant-5',
    commonName: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    botanicalFamily: 'Asparagaceae',
    imageUrl: 'https://images.unsplash.com/photo-1599598425947-020645314020?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599598425947-020645314020?auto=format&fit=crop&w=300&q=80',
    confidence: 98.9,
    category: 'Succulent',
    description: 'An exceptionally hardy evergreen perennial with stiff, sword-like erect leaves with distinct horizontal variegated bands. Renowned for its resilience and ability to thrive under light neglect.',
    medicinalBenefits: [
      'One of few indoor plants that performs Crassulacean Acid Metabolism (CAM), converting CO2 into fresh oxygen at night',
      'Filters airborne pollutants such as benzene, formaldehyde, xylene, and toluene',
      'Sap historically used for wound dressing in indigenous West African medicine'
    ],
    traditionalUses: [
      'Leaf fibers harvested for crafting bowstrings and durable cords in West Africa',
      'Believed in Feng Shui to absorb negative energy when placed near entryways'
    ],
    toxicity: {
      level: 'mild',
      details: 'Contains saponins which can cause gastrointestinal upset, salivation, nausea, and diarrhea if chewed by pets.',
      affectedPets: ['Cats', 'Dogs']
    },
    habitat: 'Dry tropical forests and rocky grasslands.',
    nativeRegion: 'Tropical West Africa from Nigeria to Congo',
    growthPeriod: 'Slow to moderate indoor rhizome expansion.',
    floweringSeason: 'Infrequent indoor blooming; subtle greenish-white flowers in warm climates.',
    similarSpecies: ['Sansevieria cylindrica', 'Sansevieria masoniana', 'Dracaena trifasciata'],
    edibleStatus: 'Toxic',
    care: {
      sunlight: 'Tolerates low light to bright indirect light',
      watering: 'Very low; water only every 3-4 weeks',
      soil: 'Standard cactus / succulent porous potting mix',
      temperature: '21°C - 32°C (70°F - 90°F)',
      humidity: 'Tolerates dry household air'
    },
    funFact: 'NASA Clean Air Study highlighted Snake Plant as a top performer for indoor oxygen production during sleeping hours!'
  },
  {
    id: 'plant-6',
    commonName: 'Peppermint',
    scientificName: 'Mentha × piperita',
    botanicalFamily: 'Lamiaceae',
    imageUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=300&q=80',
    confidence: 96.5,
    category: 'Herbal',
    description: 'A aromatic natural hybrid between watermint and spearmint. Features dark green leaves with reddish veins and an invigorating menthol aroma.',
    medicinalBenefits: [
      'Menthol content cools and soothes tension headaches and muscle cramps',
      'Relieves Irritable Bowel Syndrome (IBS) symptoms and indigestion',
      'Decongests nasal passages and improves mental alertness',
      'Natural antibacterial agent for oral health and fresh breath'
    ],
    traditionalUses: [
      'Traditional tea brew served after heavy feasts to speed up digestion',
      'Ancient Greek and Roman table decoration to stimulate appetite and festive cheer',
      'Poultice for soothing pest bites and cooling feverish skin'
    ],
    toxicity: {
      level: 'safe',
      details: 'Safe for human consumption. High concentrated essential oils can upset pet stomachs if eaten in large quantities.',
      affectedPets: []
    },
    habitat: 'Moist soils, stream banks, and cultivated garden beds.',
    nativeRegion: 'Europe and the Middle East',
    growthPeriod: 'Rapid runner expansion in moist warm seasons.',
    floweringSeason: 'Mid to late summer (purple whorled spikes).',
    similarSpecies: ['Mentha spicata (Spearmint)', 'Mentha arvensis (Wild Mint)', 'Melissa officinalis (Lemon Balm)'],
    edibleStatus: 'Edible',
    care: {
      sunlight: 'Partial shade to full sun',
      watering: 'Keep soil consistently moist',
      soil: 'Rich, moist, organic soil',
      temperature: '13°C - 24°C (55°F - 75°F)',
      humidity: 'Medium to high humidity'
    },
    funFact: 'Peppermint spreads vigorously via underground runners (stolons) and is best grown in containers to avoid overtaking garden beds!'
  }
];

export const TRIVIA_FACTS = [
  'Plants communicate underground through mycorrhizal fungal networks, often called the "Wood Wide Web".',
  'Sunflowers can absorb radiation and toxic metals from soil through phytoremediation.',
  'Over 80% of Earth’s original natural plant species have medicinal properties cataloged by indigenous botanists.',
  'Ginkgo Biloba is one of the oldest living tree species, existing for over 270 million years.',
  'The Amazon Rainforest produces over 20% of Earth’s total atmospheric oxygen supply.',
  'Some plants, like the Mimosa Pudica, close their leaves instantly when touched as a defense mechanism.'
];
