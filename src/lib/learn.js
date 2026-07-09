/* ============================================================
   THE LEARN HUB — education content aligned with Feathered
   Friends' published positions and recommended resources
   (World Parrot Trust, AAV, Best Friends, Mytoos, the True
   Nature of Parrots essay, and the sanctuary's own practices).
   ============================================================ */

export const SAFE_FOODS = [
  'Dark leafy greens', 'Bell peppers', 'Hot peppers (no capsaicin taste!)',
  'Carrots & tops', 'Broccoli', 'Squash & sweet potato', 'Green beans',
  'Snap peas', 'Berries', 'Apple (no seeds)', 'Melon', 'Banana',
  'Cooked quinoa & brown rice', 'Cooked beans & lentils', 'Sprouts',
  'Plain cooked egg', 'Unsalted nuts (large birds, sparingly)',
];

export const TOXIC_FOODS = [
  'Avocado — every part', 'Chocolate', 'Caffeine', 'Alcohol',
  'Onion & garlic', 'Xylitol (sugar-free gum, some peanut butters)',
  'Fruit pits & apple seeds', 'Uncooked / undercooked beans',
  'Salty, fried & sugary anything', 'Moldy or old food',
];

export const VETS = [
  { name: 'UW Veterinary Care — Madison', blurb: 'University special-species service; general and advanced care for all pet birds.' },
  { name: 'Janesville Veterinary Clinic', blurb: 'One of the few Rock County clinics seeing large numbers of exotics, birds included.' },
  { name: 'Brook-Falls Veterinary Hospital', blurb: 'Menomonee Falls / Brookfield; comprehensive exotic care for 50+ years.' },
  { name: 'Truesdell Animal Hospital — Madison', blurb: 'Experienced comprehensive exotic pet care: wellness, lab work, grooming.' },
];

export const SOURCES = [
  { name: 'World Parrot Trust', url: 'https://www.parrots.org', note: 'behavior & welfare science' },
  { name: 'Association of Avian Veterinarians', url: 'https://www.aav.org', note: 'find an avian vet anywhere' },
  { name: 'Best Friends Animal Society', url: 'https://bestfriends.org', note: 'parrot diet & care basics' },
  { name: 'Mytoos.com', url: 'http://mytoos.com', note: 'the unfiltered truth about cockatoos' },
  { name: "The Parrot's Pantry", url: 'https://www.facebook.com/groups/theparrotspantry', note: 'community of healthy-feeding parrot people' },
];

export const LEARN = [
  {
    id: 'feeding',
    nav: 'Feeding well',
    title: 'Feeding a parrot well',
    lead:
      'Seed-only diets are the fast food of the bird world — and the single most common thing we fix when birds arrive. The sanctuary feeds fresh chop every morning and quality pellets every evening, and it changes birds\' lives.',
    entries: [
      {
        title: 'The chop method',
        body: 'Chop is a confetti of vegetables, leafy greens, and cooked grains, processed to roughly pea-size so nobody can pick out only the corn. Make a big batch, freeze it flat in bags, thaw a day at a time. Two tablespoons for a small bird, a quarter cup for a big one, every morning.',
      },
      {
        title: 'Pellets, not just seed',
        body: 'A formulated pellet (we feed TOPS in the evenings) provides the baseline nutrition seed can\'t. Seed isn\'t evil — it\'s dessert. If your bird is a seed junkie, convert slowly: birdie bread with vegetables baked in is the classic gateway food.',
      },
      {
        title: 'Variety is the vitamin',
        body: 'Different colors, different textures, warm foods, sprouted foods — variety keeps brains busy and bodies healthy. If dinner never surprises your bird, you can do better. Fresh water daily; twice in summer.',
      },
      {
        title: 'One hot-pepper party trick',
        body: 'Parrots can\'t taste capsaicin. A whole hot pepper is candy to a macaw and enrichment gold — and watching a bird demolish one never stops being funny.',
      },
    ],
    foods: true,
  },
  {
    id: 'behavior',
    nav: 'Behavior',
    title: 'Reading parrot behavior',
    lead:
      'Parrots are wild at heart. The U.S. didn\'t ban wild-caught imports until 1992, which means most companion parrots are just a few generations out of the rainforest. The instincts that kept them alive there — the volume, the vigilance, the flock bond — came along. Understand those instincts and "behavior problems" start looking like communication.',
    entries: [
      {
        title: 'A tiny body-language glossary',
        body: 'Eye pinning (pupils flashing small-large): high arousal — excited or about to bite, read the rest of the body. Tail fanning: displaying, wound up. Beak grinding at rest: a content, sleepy bird. Slicked-tight feathers: scared. One foot up, fluffed, grinding: pure comfort.',
      },
      {
        title: 'Screaming: the contact call',
        body: 'Flocks yell "still there?" across the canopy; your bird yells it across the house. Dawn and dusk chorus is normal and healthy. What you never do: run over when they scream (you just taught them the doorbell works). Teach a whistle instead, and answer that.',
      },
      {
        title: 'Biting: the last resort you ignored',
        body: 'Birds warn — leaning away, slicked feathers, a raised foot, a growl — long before a beak lands. Most "he bit me out of nowhere" stories are a warning ladder somebody climbed right past. Learn the rungs and bites get rare.',
      },
      {
        title: 'Hormones happen',
        body: 'Every spring, sweet birds get spicy. Petting belongs on the head and neck only — back and under-wing strokes read as courtship. Skip the cozy huts and shadowy boxes; they\'re nesting sites, and nesting birds defend.',
      },
      {
        title: 'Enrichment is not optional',
        body: 'In the wild a parrot spends most of its day working for food. Give that job back: foraging toys, wrapped treats, shreddable everything. A busy beak doesn\'t barber feathers or scream from boredom.',
      },
      {
        title: 'Cockatoos, specifically',
        body: 'We say this with love and eight cockatoos in residence: they are the most surrendered, most misunderstood parrots in America. Velcro-bird affection, toddler-for-sixty-years intensity. If you\'re considering one, read everything Mytoos.com has to say first — then come meet ours with open eyes.',
      },
      {
        title: 'Training that works',
        body: 'Positive reinforcement only. Reward what you like, ignore what you don\'t, and never punish — parrots don\'t forgive like dogs do. Target training (touch the stick, get the seed) is ten minutes a day and rebuilds trust with even the wariest rescue.',
      },
    ],
  },
  {
    id: 'health',
    nav: 'Health & safety',
    title: 'Health & a safe home',
    lead:
      'Parrots are prey animals, and prey animals hide illness until they can\'t. By the time a bird looks sick, it\'s been sick a while — which makes prevention, observation, and a good avian vet your whole strategy.',
    entries: [
      {
        title: 'Know the quiet warning signs',
        body: 'Sitting fluffed at the bottom of the cage. Tail bobbing with each breath. Changes in droppings, appetite, or voice. Discharge around nares or eyes. Any of these earns a vet call today, not next week.',
      },
      {
        title: 'The kitchen can be lethal',
        body: 'Overheated non-stick cookware (PTFE/Teflon) releases fumes that kill birds in minutes — this is the most important sentence on this page. Self-cleaning oven cycles too. Add aerosols, scented candles, and smoke to the no-fly list.',
      },
      {
        title: 'Bird-proofing the rest',
        body: 'Open water (toilets, pots, aquariums), ceiling fans, open windows and mirrors, electrical cords, heavy-metal hardware (zinc and lead), houseplants, and other pets — a surprising number of dogs and cats are faster than they look. Supervised out-time in a checked room.',
      },
      {
        title: 'Quarantine newcomers',
        body: 'New bird? Thirty to forty-five days in a separate airspace, and disease testing before introductions: Psittacosis, PBFD, Avian Polyomavirus, Psittacine Herpes, Avian Bornavirus. It\'s the same standard we hold for boarding — it protects every bird in the building.',
      },
      {
        title: 'Sleep is medicine',
        body: 'Ten to twelve hours of dark, quiet sleep, every night. Chronic short sleep makes birds hormonal, loud, and cranky — half the "behavior problems" we hear about improve with an earlier bedtime.',
      },
      {
        title: 'Find your avian vet before you need one',
        body: 'Not every clinic sees birds. Around us in Wisconsin we recommend UW Veterinary Care in Madison, Janesville Vet Clinic, Brook-Falls in Menomonee Falls, and Truesdell in Madison. Elsewhere, the Association of Avian Veterinarians keeps a directory.',
        vets: true,
      },
    ],
  },
  {
    id: 'ready',
    nav: 'Before you adopt',
    title: 'Before you bring one home',
    lead:
      'Every bird at the sanctuary is here because a promise broke — usually with the best intentions and the least information. This is the information. None of it is meant to scare you; all of it is meant to make your promise the kind that keeps.',
    entries: [
      {
        title: 'Why birds actually lose their homes',
        body: 'The volume was "more than expected." The mess was daily. Life changed — a move, a baby, a landlord. The bird bonded to the one person who left for college. Almost never because the bird was bad; almost always because the picture was incomplete.',
      },
      {
        title: 'The questions that matter',
        body: 'Who\'s home during the day? Who cleans, chops, and shows up on the boring days? Does everyone in the house — landlord included — actually want a parrot? What\'s the plan for vacations? Who takes the bird if life happens to you? Adopters with answers make lifers.',
      },
      {
        title: 'Adopt, don\'t shop',
        body: 'We don\'t breed, sell, or trade birds, and we oppose the mass-market pipeline of unweaned babies through pet stores and bird marts. As long as parrots need placement, breeding more is the wrong direction. Rescued adult birds are known quantities — their personalities come pre-installed and honestly described.',
      },
      {
        title: 'Rehomed doesn\'t mean broken',
        body: 'A surrendered bird isn\'t damaged goods — it\'s a bird whose first flock changed shape. Adult rescues settle, bond, and love as hard as any baby bird, minus the hormonal surprise-package years.',
      },
      {
        title: 'The visits are the point',
        body: 'Our multiple-visit adoption process isn\'t red tape — it\'s how you find out, before the paperwork, whether this particular bird picks you back. The bird gets a vote here. That\'s the whole philosophy.',
      },
    ],
  },
];
