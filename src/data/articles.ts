export interface Article {
  id: string;
  title: string;
  summary: string;
  byline: string;
  readTime: string;
  date: string;
  section: string;
  tag?: string;
  image?: string;
  caption?: string;
  photoCredit?: string;
  isLead?: boolean;
  isOpinion?: boolean;
  opinionAuthor?: string;
  commentsCount: number;
  body: string[];
  pullQuote?: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'trump-picks-transition',
    title: "Trump's New Picks Showcase 'Not Quite Attorney' at Core",
    summary: "Inside discussions with The New York Times show the candidate under renewed scrutiny as transition counsel scrutinizes previous private statements and public records.",
    byline: "By Jonathan Swan and Maggie Haberman",
    readTime: "7 MIN READ",
    date: "Wednesday, October 16, 2024",
    section: "U.S.",
    image: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
    caption: "Official portrait of key administration figures under scrutiny during ongoing transitions.",
    photoCredit: "DOUG MILLS/THE NEW YORK TIMES",
    isLead: true,
    commentsCount: 428,
    pullQuote: "The internal vetting process has become a battleground over ideological purity versus constitutional orthodoxy.",
    body: [
      "WASHINGTON — When senior transition advisers gathered behind closed doors this week, the debate over legal counsel quickly revealed the sharp fault lines dividing the inner circle. What emerged was a high-stakes standoff between longstanding institutionalists and a combative new guard of legal loyalists.",
      "According to six people with direct knowledge of the deliberations, who spoke on the condition of anonymity to describe private meetings, the scrutiny has centered on previous public declarations and controversial trial briefs filed in several battleground jurisdictions.",
      "The debate reflects a broader strategy that prioritizes loyalty and a readiness to challenge traditional Department of Justice guardrails over conventional prosecutorial credentials.",
      "\"We are witnessing an unprecedented stress test of executive branch jurisprudence,\" said a former associate attorney general who served during the previous administration. \"The expectations for what constitutes legal counsel have fundamentally shifted.\"",
      "As transition documents circulate among Capitol Hill committee leaders, several Republican senators have quietly signaled that certain high-profile nominations could face prolonged confirmation battles, even within a closely divided chamber."
    ]
  },
  {
    id: 'women-leaving-trump-admin',
    title: "High-Ranking Women Are Leaving the Trump Administration",
    summary: "As key positions are vacated by aides, those departing cite the intense atmosphere inside the White House and ongoing policy disputes.",
    byline: "By Annie Karni and Katie Rogers",
    readTime: "5 MIN READ",
    date: "Wednesday, October 16, 2024",
    section: "U.S.",
    tag: "Analysis",
    commentsCount: 312,
    pullQuote: "The departures leave key policy portfolios without senior female leadership at a pivotal legislative juncture.",
    body: [
      "WASHINGTON — In a succession of quiet exits over the past three months, several of the most prominent female officials across the West Wing and Cabinet departments have stepped down, citing exhausting hours, intense internal rivalries, and growing skepticism toward key domestic initiatives.",
      "Interviews with current and departed aides describe an environment where dissent is increasingly marginalized, and where policy development is handled by an insular cluster of senior political operatives.",
      "The trend has alarmed outside advocacy groups and moderate party strategists, who point out that suburban voter outreach relies heavily on visible female representation within executive policy leadership.",
      "Officials publicly downplay the departures as standard end-of-term turnover, yet the concentrated loss of institutional memory across regulatory and domestic policy councils is already reverberating through upcoming budget deadlines."
    ]
  },
  {
    id: 'kimberly-guilfoyle-influence',
    title: "The Steep Rise and Sudden Fall of Kimberly Guilfoyle’s Influence",
    summary: "Once a prominent voice in the campaign apparatus, shifts in internal power centers have altered relationships and trajectory.",
    byline: "By Shane Goldmacher and Michael C. Bender",
    readTime: "4 MIN READ",
    date: "Wednesday, October 16, 2024",
    section: "U.S.",
    commentsCount: 184,
    body: [
      "PALM BEACH, Fla. — For years, Kimberly Guilfoyle was an ubiquitous presence at high-dollar donor retreats and prime-time rally stages, celebrated for her fiery delivery and ability to unlock grassroots donor checkbooks.",
      "Yet in recent months, according to multiple senior fundraisers and political operatives, her role has been substantially diminished as new campaign leadership consolidated authority and curbed external speaking engagements.",
      "The shift illustrates how quickly political fortunes can fluctuate in modern presidential orbits, where access to the principal remains the ultimate and most volatile currency."
    ]
  },
  {
    id: 'lebanon-conflict-diplomacy',
    title: "Diplomats Scramble to Contain Deepening Conflict Across Lebanon Border",
    summary: "Envoys from Europe and the United States push for an immediate pause as cross-border fire intensifies.",
    byline: "By Edward Wong, Vivian Yee and Julian E. Barnes",
    readTime: "3 MIN READ",
    date: "Wednesday, October 16, 2024",
    section: "World",
    commentsCount: 512,
    body: [
      "BEIRUT, Lebanon — As artillery and drone strikes rattled southern towns along the Blue Line for another consecutive day, Western diplomats accelerated shuttle negotiations between Paris, Washington, and regional capitals to forestall an all-out regional confrontation.",
      "The proposed framework under discussion involves phased military disengagements alongside bolstered international monitoring forces, though both sides remain deeply entrenched regarding terms of verification.",
      "Civilians in border communities have borne the brunt of the escalating exchanges, with tens of thousands displaced on both sides and municipal infrastructure severely damaged."
    ]
  },
  {
    id: 'election-security-ai-threats',
    title: "How Election Security Officials Are Countering Fresh AI Threats",
    summary: "State departments are training staff against targeted deepfakes and algorithmic disinformation.",
    byline: "By David E. Sanger and Stuart A. Thompson",
    readTime: "2 MIN READ",
    date: "Wednesday, October 16, 2024",
    section: "U.S.",
    commentsCount: 95,
    body: [
      "State secretaries and municipal election directors across the nation have deployed rapid-response verification units designed to identify synthetic audio robocalls and cloned video broadcasts within minutes of transmission.",
      "Through cross-agency coordination with cybersecurity research laboratories, election staff are receiving real-time cryptographic watermarking tools to authenticate official county announcements and ballot-counting livestreams."
    ]
  },
  {
    id: 'boeing-factory-strike-agreement',
    title: "Boeing Reaches Tentative Agreement to End Costly Factory Strike",
    summary: "Union leadership recommends the revised contract offer, including substantial wage increases.",
    byline: "By Niraj Chokshi and Peter Eavis",
    readTime: "3 MIN READ",
    date: "Wednesday, October 16, 2024",
    section: "Business",
    commentsCount: 167,
    body: [
      "SEATTLE — In a breakthrough that could restore production of commercial jetliners, Boeing and representatives for more than 33,000 striking machinists announced a tentative agreement featuring a 35 percent general wage increase over four years.",
      "The agreement also restores incentive bonuses and enhances retirement contributions, addressing central grievances that shuttered assembly lines across Washington State and triggered billions in quarterly cash burn."
    ]
  },
  {
    id: 'david-brooks-civic-danger',
    title: "The Real Danger We Face Isn't What You Expect",
    summary: "Society’s deepest fractures aren't ideological, but rooted in the breakdown of civic institutions.",
    byline: "By David Brooks",
    readTime: "6 MIN READ",
    date: "Wednesday, October 16, 2024",
    section: "Opinion",
    isOpinion: true,
    opinionAuthor: "David Brooks",
    commentsCount: 843,
    pullQuote: "When people stop belonging to neighborly associations and local clubs, political hostility rushes in to fill the existential vacuum.",
    body: [
      "Most public commentary treats our current malaise as a conflict of ideas: conservative versus progressive, nationalist versus cosmopolitan. But if you spend time listening in diner booths and community centers across the country, you discover that the crisis is far deeper and far more intimate.",
      "The real crisis is social isolation and institutional erosion. Over the past four decades, we have dismantled the scaffolding that once taught people how to trust, converse, and build community across difference.",
      "Without sturdy local institutions—from bowling leagues to town meeting boards—politics becomes not an instrument for pragmatic problem-solving, but a tribal war for identity and belonging."
    ]
  },
  {
    id: 'thomas-friedman-middle-east',
    title: "A Critical Turning Point for the Middle East",
    summary: "Why the next forty-eight hours could redefine diplomatic alliances in the region for decades.",
    byline: "By Thomas L. Friedman",
    readTime: "5 MIN READ",
    date: "Wednesday, October 16, 2024",
    section: "Opinion",
    isOpinion: true,
    opinionAuthor: "Thomas L. Friedman",
    commentsCount: 672,
    body: [
      "We are approaching a decisive historical juncture in the Levant. The strategic choices made in the coming days will determine whether the region pivots toward an integrated security and economic architecture or slides into systemic fragmentation.",
      "The stakes could not be higher for ordinary families who yearn for durable stability, educational modernization, and economic integration into global trade networks."
    ]
  },
  {
    id: 'editorial-board-climate-finance',
    title: "Why Climate Finance Can No Longer Be Deferred",
    summary: "Global summits must turn tentative pledges into binding capital requirements.",
    byline: "By The Editorial Board",
    readTime: "4 MIN READ",
    date: "Wednesday, October 16, 2024",
    section: "Opinion",
    isOpinion: true,
    opinionAuthor: "The Editorial Board",
    commentsCount: 289,
    body: [
      "Every year, world leaders gather at environmental summits, recite alarming meteorological data, and sign nonbinding communiqués. Yet the critical chasm between rhetorical commitments and disbursed financing remains largely unbridged.",
      "Developing nations that bear minimal historical responsibility for cumulative greenhouse gas emissions are confronting astronomical disaster mitigation costs. Without predictable institutional capital flows, global climate mitigation targets will remain an illusion."
    ]
  },
  {
    id: 'wirecutter-best-headphones',
    title: "The Best Noise-Canceling Headphones for Commuting and Travel",
    summary: "After 120 hours of testing 28 pairs in subways and airplanes, our audio experts picked the top performers for comfort, battery life, and acoustic isolation.",
    byline: "By Wirecutter Staff",
    readTime: "8 MIN READ",
    date: "Wednesday, October 16, 2024",
    section: "Wirecutter",
    commentsCount: 94,
    body: [
      "Whether you are enduring a turbulent cross-country flight or attempting to focus in an open-plan office, premium noise-canceling headphones are essential gear.",
      "Our team evaluated active noise cancellation fidelity, long-term headband ergonomics, microphone wind suppression, and real-world battery endurance across multiple test environments."
    ]
  },
  {
    id: 'cooking-crispy-sheet-pan-chicken',
    title: "Crispy Sheet-Pan Lemon Herb Chicken With Roasted Fennel",
    summary: "A vibrant weeknight dinner that balances tender roast chicken thighs with caramelized vegetables, bright citrus, and fresh oregano.",
    byline: "By Melissa Clark",
    readTime: "25 MIN COOK TIME",
    date: "Wednesday, October 16, 2024",
    section: "Cooking",
    commentsCount: 341,
    body: [
      "The secret to shatteringly crisp chicken skin while preserving juicy meat is high heat and ample space on the baking sheet so moisture evaporates rather than steams.",
      "Tossing sliced fennel bulbs and shallots in the rendered chicken drippings creates sweet, melt-in-your-mouth vegetables that elevate this humble weeknight meal into a dinner party centerpiece."
    ]
  }
];

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  pct: string;
}

export const MARKET_DATA: MarketIndex[] = [
  { name: "S&P 500", value: "5,842.47", change: "+27.18", isPositive: true, pct: "+0.47%" },
  { name: "Nasdaq", value: "18,367.08", change: "+51.43", isPositive: true, pct: "+0.28%" },
  { name: "Dow Jones", value: "43,077.70", change: "+337.28", isPositive: true, pct: "+0.79%" },
  { name: "10-Yr Yield", value: "4.02%", change: "-0.03", isPositive: false, pct: "-0.74%" },
  { name: "Brent Crude", value: "$74.22", change: "-0.23", isPositive: false, pct: "-0.31%" }
];

export const TRENDING_TOPICS = [
  "Trump top choices are close to deal",
  "Harris Campaign Rally",
  "Middle East Diplomatic Talks",
  "Federal Reserve Rate Decision",
  "Nobel Prize Announcements",
  "World Series Preview"
];
