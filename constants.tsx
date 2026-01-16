
import { Activity } from './types';

export const ACTIVITIES: Activity[] = [
  {
    id: 'cayo-perico',
    name: 'Cayo Perico Heist',
    category: 'Heist',
    baseHourlyProfit: 1200000,
    setupTime: 45,
    executionTime: 15,
    difficulty: 'Medium',
    description: 'The definitive solo-friendly heist. Efficient players can clear $1M+ per hour.',
    requirements: [
      'Kosatka Submarine ($2.2M)',
      'Sparrow Helicopter (Highly Recommended for setups)',
      'Level 10+ recommended for health'
    ],
    instructions: [
      'Scope out the Drainage Tunnel entry point.',
      'Complete mandatory preps: Longfin, Plasma Cutter, Fingerprint Cloner, Cutting Torch.',
      'Pick the Conspiracy or Crackshot weapon loadout.',
      'Execute: Use Longfin to hit airstrip for secondary loot, then enter compound via tunnel.',
      'Exit via the cliff behind the compound and swim into the ocean.'
    ],
    specialTips: 'Always go for the Pink Diamond or Bonds. Avoid the main gate if playing solo.'
  },
  {
    id: 'diamond-casino',
    name: 'Diamond Casino Heist',
    category: 'Heist',
    baseHourlyProfit: 1000000,
    setupTime: 60,
    executionTime: 20,
    difficulty: 'Hard',
    description: 'Requires a partner. Big Con or Silent & Sneaky are the meta choices.',
    requirements: [
      'Arcade Property ($1.2M+)',
      'At least one teammate',
      'Knowledge of the Fingerprint hack'
    ],
    instructions: [
      'Choose Big Con (Gruppe Sechs) or Silent & Sneaky approach.',
      'MANDATORY PREPS FOR SMOOTH RUN:',
      '• Level 2 Security Passes (Picture of Valet/Maid at the desk)',
      '• Duggan Shipments (Destroy at least 6/10 to weaken armor)',
      '• Gruppe Sechs Gear Part 1 & 2 (For Big Con)',
      '• Noose Outfits (Exit gear to walk out undetected)',
      'Skip: Power Drills (unless you have 4 players), Security Intel (unless you have Penthouse).'
    ],
    specialTips: 'The "Big Con - Gruppe Sechs" approach is the easiest. You can drive straight into the vault and walk out without firing a shot.'
  },
  {
    id: 'acid-lab',
    name: 'Acid Lab Sales',
    category: 'Business',
    baseHourlyProfit: 350000,
    setupTime: 5,
    executionTime: 10,
    difficulty: 'Easy',
    description: 'High portability, fast production. Great for solo players.',
    requirements: [
      'Brickade 6x6 (Unlock via First Dose missions)',
      'Acid Lab Equipment Upgrade ($250k - MUST HAVE for profit)',
      'Acid Lab Production boost (Daily manual interaction)'
    ],
    instructions: [
      'Complete all 6 First Dose missions to get the Brickade.',
      'Complete 10 Fooligan Jobs from Dax to unlock the equipment upgrade.',
      'Buy supplies for $60k; sell for $335k+ in a full lobby for high demand bonus.',
      'Sales are always solo-friendly with a single bike.'
    ]
  },
  {
    id: 'nightclub',
    name: 'Nightclub Passive Income',
    category: 'Passive',
    baseHourlyProfit: 250000,
    setupTime: 0,
    executionTime: 10,
    difficulty: 'Easy',
    description: 'The best passive business. Accumulates while you do other things.',
    requirements: [
      'Nightclub Property ($1.1M+)',
      '5 Technicians assigned to specific businesses',
      'MC Coke, Meth, Cash, Bunker, and CEO Warehouse linked'
    ],
    instructions: [
      'Keep Nightclub popularity at 100% for $50k/hr safe income.',
      'Rebook DJs or throw out rowdy customers to maintain popularity.',
      'Let warehouse stock grow (takes ~20 hours for max efficiency).',
      'Sell in a public lobby using the Speedo Custom with a remote turret.'
    ]
  },
  {
    id: 'bunker-stock',
    name: 'Bunker Stock',
    category: 'Business',
    baseHourlyProfit: 400000,
    setupTime: 10,
    executionTime: 15,
    difficulty: 'Medium',
    description: 'Reliable income. Always sell to Los Santos for max profit.',
    requirements: [
      'Bunker Property (Chumash or Farmhouse recommended)',
      'Staff and Equipment Upgrades',
      'Mobile Operations Center (Optional for upgrades)'
    ],
    instructions: [
      'Always buy supplies for $75k instead of stealing.',
      'Wait 2 hours and 20 mins for one full bar of stock.',
      'Sell to Los Santos for $210k ($315k+ with lobby bonus).',
      'If selling solo, sell after one batch of supplies to guarantee one vehicle.'
    ]
  },
  {
    id: 'cluckin-bell',
    name: 'Cluckin\' Bell Farm Raid',
    category: 'Contact Mission',
    baseHourlyProfit: 500000,
    setupTime: 45,
    executionTime: 15,
    difficulty: 'Medium',
    description: 'High-payout raid accessible to all players without setup costs.',
    requirements: [
      'Wait for a call from Vincent (Yellow V icon on map)',
      'No property required',
      'Decent armor and snacks'
    ],
    instructions: [
      'Complete the 5 setup missions (Slush Fund, Breaking and Entering, etc.).',
      'On "Breaking and Entering", prioritize getting the Terrorbyte hacking device.',
      'On the Finale: Sneak in through the side for a stealth approach to maximize speed.',
      'Exit using the train tracks to lose the cops easily.'
    ]
  },
  {
    id: 'dr-dre-contract',
    name: 'Dr. Dre Contract (The Agency)',
    category: 'Contact Mission',
    baseHourlyProfit: 600000,
    setupTime: 90,
    executionTime: 15,
    difficulty: 'Medium',
    description: 'Flat $1M payout upon completion. Fun missions with great music.',
    requirements: [
      'Agency Property ($2M+)',
      'Armored Kuruma or Buffalo STX recommended'
    ],
    instructions: [
      'Complete the 3 data leaks (Nightlife, High Society, South Central).',
      'Each leak has 2 setups and 1 finale.',
      'Complete the studio mission and final mansion raid.',
      'Collect $1,000,000 upon finishing.'
    ]
  },
  {
    id: 'hsw-races',
    name: 'HSW Time Trials',
    category: 'Contact Mission',
    baseHourlyProfit: 250000,
    setupTime: 2,
    executionTime: 3,
    difficulty: 'Hard',
    description: 'Insane ROI for 3 minutes of driving. Limited to once per week.',
    requirements: [
      'PS5 or Xbox Series X|S version (E&E)',
      'HSW Upgraded vehicle (Hakuchou Drag HSW recommended)'
    ],
    instructions: [
      'Locate the purple HSW icon on the map.',
      'Start the trial and set a waypoint on the goal.',
      'Follow the road but look for shortcuts across grass/alleys.',
      'Collect $250,000 on completion.'
    ]
  }
];
