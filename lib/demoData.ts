import { Brand, Location, Table, Campaign, Character, Quote, TimeOfDay, DayCategory } from './types';

// ─────────────────────────────────────────────
// DEMO BRANDS
// ─────────────────────────────────────────────

export const DEMO_BRANDS: Brand[] = [
  {
    id: 'brand-bluetokai',
    name: 'Blue Tokai',
    slug: 'bluetokai',
    primaryColor: '#1a3a5c',
    secondaryColor: '#c8852a',
    accentColor: '#e8d5b0',
    tagline: 'Specialty Coffee. Slow Mornings.',
  },
  {
    id: 'brand-subko',
    name: 'Subko',
    slug: 'subko',
    primaryColor: '#2d1b0e',
    secondaryColor: '#d4a043',
    accentColor: '#f0e6d0',
    tagline: 'Coffee & Conversations.',
  },
];

// ─────────────────────────────────────────────
// DEMO LOCATIONS
// ─────────────────────────────────────────────

export const DEMO_LOCATIONS: Location[] = [
  {
    id: 'loc-mumbai-bkc',
    brandId: 'brand-bluetokai',
    name: 'BKC',
    slug: 'mumbai-bkc',
    city: 'Mumbai',
    address: 'Bandra Kurla Complex, Mumbai',
  },
  {
    id: 'loc-mumbai-bandra',
    brandId: 'brand-bluetokai',
    name: 'Bandra',
    slug: 'mumbai-bandra',
    city: 'Mumbai',
    address: 'Linking Road, Bandra West, Mumbai',
  },
];

// ─────────────────────────────────────────────
// DEMO TABLES
// ─────────────────────────────────────────────

export const DEMO_TABLES: Table[] = [
  { id: 'table-T12', locationId: 'loc-mumbai-bkc', tableNumber: 'T12', active: true },
  { id: 'table-T04', locationId: 'loc-mumbai-bkc', tableNumber: 'T04', active: true },
  { id: 'table-T07', locationId: 'loc-mumbai-bkc', tableNumber: 'T07', active: true },
  { id: 'table-T01', locationId: 'loc-mumbai-bandra', tableNumber: 'T01', active: true },
];

// ─────────────────────────────────────────────
// DEMO CAMPAIGNS
// ─────────────────────────────────────────────

export const DEMO_CAMPAIGNS: Campaign[] = [
  {
    id: 'campaign-slow-mornings',
    brandId: 'brand-bluetokai',
    name: 'Slow Mornings',
    slug: 'slowmornings',
    startDate: '2026-09-01',
    endDate: '2026-12-31',
    theme: 'morning',
    hashtag: '#SlowMornings',
    characterId: 'char-coffee-companion',
    active: true,
  },
  {
    id: 'campaign-monsoon',
    brandId: 'brand-bluetokai',
    name: 'Monsoon Stories',
    slug: 'monsoon2026',
    startDate: '2026-06-01',
    endDate: '2026-09-30',
    theme: 'any',
    hashtag: '#MonsoonStories',
    characterId: 'char-cosmic-traveller',
    active: true,
  },
];

// ─────────────────────────────────────────────
// DEMO CHARACTERS
// ─────────────────────────────────────────────

export const DEMO_CHARACTERS: Character[] = [
  {
    id: 'char-coffee-companion',
    name: 'Brew',
    personality: 'warm, cozy, and quietly philosophical',
    animationSet: ['idle', 'walkIn', 'wave', 'talk', 'smile', 'walkOut'],
    colorPrimary: '#c8852a',
    colorSecondary: '#f0d080',
    description: 'A warm, floating coffee companion who finds poetry in everyday moments.',
    variant: 'coffee-companion',
  },
  {
    id: 'char-cosmic-traveller',
    name: 'Ori',
    personality: 'curious, whimsical, and gently wise',
    animationSet: ['idle', 'walkIn', 'wave', 'talk', 'lookAtCamera', 'celebrate', 'walkOut'],
    colorPrimary: '#5b4fcf',
    colorSecondary: '#a78bfa',
    description: 'A tiny cosmic traveller passing through, always with something worth saying.',
    variant: 'cosmic-traveller',
  },
  {
    id: 'char-cafe-spirit',
    name: 'Sage',
    personality: 'sophisticated, calm, and minimally eloquent',
    animationSet: ['idle', 'lookAtCamera', 'talk', 'smile', 'walkOut'],
    colorPrimary: '#2d6a4f',
    colorSecondary: '#74c69d',
    description: 'The quiet spirit of the café itself — ancient, unhurried, knowing.',
    variant: 'cafe-spirit',
  },
];

// ─────────────────────────────────────────────
// 40+ DEMO QUOTES (original content)
// ─────────────────────────────────────────────

export const DEMO_QUOTES: Quote[] = [
  // MORNING — General
  {
    id: 'q-m-01', text: "Good morning.\nTake your time. The day has only just begun.",
    lines: ["Good morning.", "Take your time. The day has only just begun."],
    category: 'morning', timeOfDay: 'morning', dayCategory: 'any', active: true,
  },
  {
    id: 'q-m-02', text: "The world is still quiet.\nThat's the best version of it.",
    lines: ["The world is still quiet.", "That's the best version of it."],
    category: 'morning', timeOfDay: 'morning', dayCategory: 'any', active: true,
  },
  {
    id: 'q-m-03', text: "Nothing is urgent yet.\nHold onto that for just a bit longer.",
    lines: ["Nothing is urgent yet.", "Hold onto that for just a bit longer."],
    category: 'morning', timeOfDay: 'morning', dayCategory: 'any', active: true,
  },
  {
    id: 'q-m-04', text: "Before the meetings and the messages —\nthere's still this cup. This moment.",
    lines: ["Before the meetings and the messages —", "there's still this cup. This moment."],
    category: 'morning', timeOfDay: 'morning', dayCategory: 'any', active: true,
  },
  {
    id: 'q-m-05', text: "The best mornings don't rush.\nNeither should you.",
    lines: ["The best mornings don't rush.", "Neither should you."],
    category: 'morning', timeOfDay: 'morning', dayCategory: 'any', active: true,
  },
  {
    id: 'q-m-06', text: "This coffee didn't hurry to be good.\nYou didn't either.",
    lines: ["This coffee didn't hurry to be good.", "You didn't either."],
    category: 'morning', timeOfDay: 'morning', dayCategory: 'any', active: true,
  },
  {
    id: 'q-m-07', text: "Every morning is a soft reset.\nMake it yours.",
    lines: ["Every morning is a soft reset.", "Make it yours."],
    category: 'morning', timeOfDay: 'morning', dayCategory: 'any', active: true,
  },

  // MONDAY MORNING
  {
    id: 'q-mon-01', text: "Monday called.\nIt said you probably need this.",
    lines: ["Monday called.", "It said you probably need this."],
    category: 'monday', timeOfDay: 'morning', dayCategory: 'monday', active: true,
  },
  {
    id: 'q-mon-02', text: "Mondays only feel big\nuntil the first sip.",
    lines: ["Mondays only feel big", "until the first sip."],
    category: 'monday', timeOfDay: 'morning', dayCategory: 'monday', active: true,
  },

  // AFTERNOON
  {
    id: 'q-a-01', text: "Somewhere between busy and tired,\nthere's always room for a good moment.",
    lines: ["Somewhere between busy and tired,", "there's always room for a good moment."],
    category: 'afternoon', timeOfDay: 'afternoon', dayCategory: 'any', active: true,
  },
  {
    id: 'q-a-02', text: "The afternoon is underrated.\nEverything slows down just enough.",
    lines: ["The afternoon is underrated.", "Everything slows down just enough."],
    category: 'afternoon', timeOfDay: 'afternoon', dayCategory: 'any', active: true,
  },
  {
    id: 'q-a-03', text: "You made it to the second half.\nThat's actually impressive.",
    lines: ["You made it to the second half.", "That's actually impressive."],
    category: 'afternoon', timeOfDay: 'afternoon', dayCategory: 'any', active: true,
  },
  {
    id: 'q-a-04', text: "This is the hour when coffee becomes\nsomething close to meditation.",
    lines: ["This is the hour when coffee becomes", "something close to meditation."],
    category: 'afternoon', timeOfDay: 'afternoon', dayCategory: 'any', active: true,
  },
  {
    id: 'q-a-05', text: "Three in the afternoon is its own timezone.\nTime moves differently here.",
    lines: ["Three in the afternoon is its own timezone.", "Time moves differently here."],
    category: 'afternoon', timeOfDay: 'afternoon', dayCategory: 'any', active: true,
  },
  {
    id: 'q-a-06', text: "Half the day is done.\nThe other half owes you nothing. Take it easy.",
    lines: ["Half the day is done.", "The other half owes you nothing. Take it easy."],
    category: 'afternoon', timeOfDay: 'afternoon', dayCategory: 'any', active: true,
  },

  // EVENING
  {
    id: 'q-e-01', text: "The day is winding down.\nYou don't have to.",
    lines: ["The day is winding down.", "You don't have to."],
    category: 'evening', timeOfDay: 'evening', dayCategory: 'any', active: true,
  },
  {
    id: 'q-e-02', text: "Good evenings are made slowly.\nYou've got time.",
    lines: ["Good evenings are made slowly.", "You've got time."],
    category: 'evening', timeOfDay: 'evening', dayCategory: 'any', active: true,
  },
  {
    id: 'q-e-03', text: "The light at this hour is different.\nSo are you, after today.",
    lines: ["The light at this hour is different.", "So are you, after today."],
    category: 'evening', timeOfDay: 'evening', dayCategory: 'any', active: true,
  },
  {
    id: 'q-e-04', text: "Evening coffee isn't about caffeine.\nIt's about the permission to pause.",
    lines: ["Evening coffee isn't about caffeine.", "It's about the permission to pause."],
    category: 'evening', timeOfDay: 'evening', dayCategory: 'any', active: true,
  },
  {
    id: 'q-e-05', text: "The sky went golden.\nSomehow you're still here. That's everything.",
    lines: ["The sky went golden.", "Somehow you're still here. That's everything."],
    category: 'evening', timeOfDay: 'evening', dayCategory: 'any', active: true,
  },
  {
    id: 'q-e-06', text: "This table has held a hundred evenings.\nNow it's holding yours.",
    lines: ["This table has held a hundred evenings.", "Now it's holding yours."],
    category: 'evening', timeOfDay: 'evening', dayCategory: 'any', active: true,
  },

  // FRIDAY
  {
    id: 'q-fri-01', text: "You made it.\nThat's worth celebrating.",
    lines: ["You made it.", "That's worth celebrating."],
    category: 'friday', timeOfDay: 'any', dayCategory: 'friday', active: true,
  },
  {
    id: 'q-fri-02', text: "It's Friday somewhere.\nActually, it's Friday here. You're welcome.",
    lines: ["It's Friday somewhere.", "Actually, it's Friday here. You're welcome."],
    category: 'friday', timeOfDay: 'any', dayCategory: 'friday', active: true,
  },

  // WEEKEND
  {
    id: 'q-wknd-01', text: "Weekends don't need an agenda.\nNeither does this cup.",
    lines: ["Weekends don't need an agenda.", "Neither does this cup."],
    category: 'weekend', timeOfDay: 'any', dayCategory: 'weekend', active: true,
  },
  {
    id: 'q-wknd-02', text: "No alarm set this morning.\nThis is what freedom tastes like.",
    lines: ["No alarm set this morning.", "This is what freedom tastes like."],
    category: 'weekend', timeOfDay: 'morning', dayCategory: 'weekend', active: true,
  },
  {
    id: 'q-wknd-03', text: "A weekend afternoon in a café\nis one of the great small luxuries.",
    lines: ["A weekend afternoon in a café", "is one of the great small luxuries."],
    category: 'weekend', timeOfDay: 'afternoon', dayCategory: 'weekend', active: true,
  },

  // NIGHT
  {
    id: 'q-n-01', text: "Late nights have their own kind of quiet.\nThis is a good one.",
    lines: ["Late nights have their own kind of quiet.", "This is a good one."],
    category: 'night', timeOfDay: 'night', dayCategory: 'any', active: true,
  },
  {
    id: 'q-n-02', text: "You're still awake.\nSomething must be worth staying up for.",
    lines: ["You're still awake.", "Something must be worth staying up for."],
    category: 'night', timeOfDay: 'night', dayCategory: 'any', active: true,
  },
  {
    id: 'q-n-03', text: "The night belongs to those\nwho know how to be quiet with it.",
    lines: ["The night belongs to those", "who know how to be quiet with it."],
    category: 'night', timeOfDay: 'night', dayCategory: 'any', active: true,
  },

  // UNIVERSAL / ANY TIME
  {
    id: 'q-u-01', text: "Some days the only plan that matters\nis a good cup and nowhere to be.",
    lines: ["Some days the only plan that matters", "is a good cup and nowhere to be."],
    category: 'universal', timeOfDay: 'any', dayCategory: 'any', active: true,
  },
  {
    id: 'q-u-02', text: "You don't need a reason\nto just sit somewhere beautiful.",
    lines: ["You don't need a reason", "to just sit somewhere beautiful."],
    category: 'universal', timeOfDay: 'any', dayCategory: 'any', active: true,
  },
  {
    id: 'q-u-03', text: "Every great conversation\nstarted at a table like this one.",
    lines: ["Every great conversation", "started at a table like this one."],
    category: 'universal', timeOfDay: 'any', dayCategory: 'any', active: true,
  },
  {
    id: 'q-u-04', text: "The best things are slow:\ngood coffee, good ideas, good people.",
    lines: ["The best things are slow:", "good coffee, good ideas, good people."],
    category: 'universal', timeOfDay: 'any', dayCategory: 'any', active: true,
  },
  {
    id: 'q-u-05', text: "There's no notification important enough\nto ruin a moment like this.",
    lines: ["There's no notification important enough", "to ruin a moment like this."],
    category: 'universal', timeOfDay: 'any', dayCategory: 'any', active: true,
  },
  {
    id: 'q-u-06', text: "A café is one of the last places\ntime still moves at your speed.",
    lines: ["A café is one of the last places", "time still moves at your speed."],
    category: 'universal', timeOfDay: 'any', dayCategory: 'any', active: true,
  },
  {
    id: 'q-u-07', text: "The best stories start\nwith someone sitting quietly.",
    lines: ["The best stories start", "with someone sitting quietly."],
    category: 'universal', timeOfDay: 'any', dayCategory: 'any', active: true,
  },
  {
    id: 'q-u-08', text: "Being here, right now, present —\nthat's already something rare.",
    lines: ["Being here, right now, present —", "that's already something rare."],
    category: 'universal', timeOfDay: 'any', dayCategory: 'any', active: true,
  },
  {
    id: 'q-u-09', text: "You picked this café for a reason.\nOr maybe it picked you.",
    lines: ["You picked this café for a reason.", "Or maybe it picked you."],
    category: 'universal', timeOfDay: 'any', dayCategory: 'any', active: true,
  },
  {
    id: 'q-u-10', text: "Some places feel like an exhale.\nThis is one of them.",
    lines: ["Some places feel like an exhale.", "This is one of them."],
    category: 'universal', timeOfDay: 'any', dayCategory: 'any', active: true,
  },
];

// ─────────────────────────────────────────────
// HELPER LOOKUPS
// ─────────────────────────────────────────────

export function getBrandBySlug(slug: string): Brand | undefined {
  return DEMO_BRANDS.find(b => b.slug === slug);
}

export function getLocationBySlug(brandId: string, slug: string): Location | undefined {
  return DEMO_LOCATIONS.find(l => l.brandId === brandId && l.slug === slug);
}

export function getTableByNumber(locationId: string, tableNumber: string): Table | undefined {
  return DEMO_TABLES.find(t => t.locationId === locationId && t.tableNumber === tableNumber);
}

export function getCampaignBySlug(brandId: string, slug: string): Campaign | undefined {
  return DEMO_CAMPAIGNS.find(c => c.brandId === brandId && c.slug === slug);
}

export function getActiveCampaign(brandId: string): Campaign | undefined {
  return DEMO_CAMPAIGNS.find(c => c.brandId === brandId && c.active);
}

export function getCharacterById(id: string): Character | undefined {
  return DEMO_CHARACTERS.find(c => c.id === id);
}
