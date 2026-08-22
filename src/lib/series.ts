export interface SeriesDefinition {
  slug: string;
  name: string;
  shortName?: string;
  author: string;
  authorQuery: string;
  genre: string;
  description: string;
  searchTerms: string[];
}

export const SERIES: SeriesDefinition[] = [
  {
    slug: 'acotar',
    name: 'A Court of Thorns and Roses',
    shortName: 'ACOTAR',
    author: 'Sarah J. Maas',
    authorQuery: 'Sarah J. Maas',
    genre: 'fantasy',
    description:
      'A Court of Thorns and Roses (ACOTAR) is the bestselling romantic fantasy series by Sarah J. Maas, following Feyre Archeron into a dangerous world of fae courts, ancient magic, and forbidden love. Spanning six books including A Court of Silver Flames and A Court of Frost and Starlight, ACOTAR has defined a generation of fantasy readers.',
    searchTerms: [
      'A Court of Thorns and Roses Sarah J. Maas',
      'ACOTAR new book',
      'Sarah J. Maas fantasy novel 2026',
      'Sarah J. Maas fantasy novel 2027',
    ],
  },
  {
    slug: 'throne-of-glass',
    name: 'Throne of Glass',
    shortName: 'ToG',
    author: 'Sarah J. Maas',
    authorQuery: 'Sarah J. Maas',
    genre: 'fantasy',
    description:
      'Throne of Glass (ToG) is the epic fantasy series by Sarah J. Maas following Celaena Sardothien, a legendary assassin navigating kingdoms, magic, and war. Spanning eight books from Throne of Glass to Kingdom of the Wicked, ToG launched Sarah J. Maas as a dominant force in fantasy fiction.',
    searchTerms: [
      'Throne of Glass Sarah J. Maas',
      'Celaena Sardothien new book',
    ],
  },
  {
    slug: 'crescent-city',
    name: 'Crescent City',
    author: 'Sarah J. Maas',
    authorQuery: 'Sarah J. Maas',
    genre: 'fantasy',
    description:
      'Crescent City is the urban fantasy series by Sarah J. Maas set in the city of Lunathion, blending fae mythology with a neon-lit contemporary world. House of Earth and Blood, House of Sky and Breath, and House of Flame and Shadow deliver high-stakes action, complex romance, and a richly layered world that intersects with ACOTAR and ToG.',
    searchTerms: [
      'Crescent City Sarah J. Maas',
      'House of Earth and Blood sequel',
      'Sarah J. Maas House of new book',
    ],
  },
  {
    slug: 'a-song-of-ice-and-fire',
    name: 'A Song of Ice and Fire',
    shortName: 'GoT',
    author: 'George R.R. Martin',
    authorQuery: 'George R.R. Martin',
    genre: 'fantasy',
    description:
      "A Song of Ice and Fire (GoT) is George R.R. Martin's landmark epic fantasy series and the source material for HBO's Game of Thrones. Millions of fans worldwide await The Winds of Winter — the long-anticipated sixth book following A Dance with Dragons (2011) — and the eventual final volume, A Dream of Spring.",
    searchTerms: [
      'George R.R. Martin Winds of Winter',
      'A Song of Ice and Fire new book',
      'George R.R. Martin new novel',
      'Winds of Winter release date',
    ],
  },
  {
    slug: 'fourth-wing',
    name: 'Fourth Wing',
    shortName: 'Empyrean',
    author: 'Rebecca Yarros',
    authorQuery: 'Rebecca Yarros',
    genre: 'fantasy',
    description:
      'Fourth Wing and Iron Flame launched Rebecca Yarros\'s Empyrean series into a worldwide phenomenon. Set in a military dragon-riding academy, the series blends pulse-pounding action with enemies-to-lovers romance. Fans eagerly await the next installments in this record-breaking fantasy saga.',
    searchTerms: [
      'Fourth Wing Rebecca Yarros',
      'Empyrean series Rebecca Yarros new book',
      'Iron Flame sequel Rebecca Yarros',
      'Rebecca Yarros new novel 2026',
    ],
  },
  {
    slug: 'colleen-hoover',
    name: 'Colleen Hoover',
    shortName: 'CoHo',
    author: 'Colleen Hoover',
    authorQuery: 'Colleen Hoover',
    genre: 'romance',
    description:
      "Colleen Hoover (CoHo) is the #1 New York Times bestselling author whose emotionally gripping romance and new adult fiction has taken the world by storm. From Ugly Love and It Ends with Us to Reminders of Him and Confess, CoHo's books dominate bestseller lists and BookTok alike.",
    searchTerms: [
      'Colleen Hoover new novel 2026',
      'Colleen Hoover romance book',
      'Colleen Hoover 2027',
    ],
  },
  {
    slug: 'mistborn',
    name: 'Mistborn',
    author: 'Brandon Sanderson',
    authorQuery: 'Brandon Sanderson',
    genre: 'fantasy',
    description:
      "Mistborn is Brandon Sanderson's beloved fantasy series featuring a unique magic system built on ingesting metals. Spanning multiple eras — from the original trilogy to the Wax & Wayne books and the upcoming Era 3 — Mistborn is the crown jewel of Sanderson's vast Cosmere universe.",
    searchTerms: [
      'Mistborn Brandon Sanderson new book',
      'Brandon Sanderson Mistborn Era 3',
      'Brandon Sanderson Cosmere 2026',
    ],
  },
  {
    slug: 'stormlight-archive',
    name: 'The Stormlight Archive',
    author: 'Brandon Sanderson',
    authorQuery: 'Brandon Sanderson',
    genre: 'fantasy',
    description:
      "The Stormlight Archive is Brandon Sanderson's magnum opus — a sprawling 10-book epic fantasy set on the storm-wracked world of Roshar. Wind and Truth (Book 5) concluded the first arc, and the next five books will follow a new generation of characters in a transformed world. Stormlight is essential reading for any serious fantasy fan.",
    searchTerms: [
      'Stormlight Archive Brandon Sanderson',
      'Brandon Sanderson Wind and Truth sequel',
      'Stormlight Archive book 6',
    ],
  },
  {
    slug: 'six-of-crows',
    name: 'Six of Crows',
    shortName: 'Grishaverse',
    author: 'Leigh Bardugo',
    authorQuery: 'Leigh Bardugo',
    genre: 'fantasy',
    description:
      "Six of Crows and Crooked Kingdom by Leigh Bardugo are the crown jewels of the Grishaverse — a high-stakes heist duology set in a city of crime and power. Combined with the Shadow and Bone trilogy and King of Scars, Leigh Bardugo has built one of the most beloved fantasy universes in modern fiction, now also a Netflix series.",
    searchTerms: [
      'Leigh Bardugo new book',
      'Six of Crows sequel Leigh Bardugo',
      'Grishaverse new novel 2026',
      'King of Scars sequel',
    ],
  },
  {
    slug: 'shadowhunters',
    name: 'The Shadowhunter Chronicles',
    shortName: 'Shadowhunters',
    author: 'Cassandra Clare',
    authorQuery: 'Cassandra Clare',
    genre: 'fantasy',
    description:
      "Cassandra Clare's Shadowhunter Chronicles is one of the best-selling YA fantasy series of all time, following Clary Fray and the Nephilim who hunt demons in a hidden magical world. Spanning The Mortal Instruments, The Infernal Devices, The Dark Artifices, and multiple spin-offs, the Shadowhunter universe shows no signs of slowing down.",
    searchTerms: [
      'Cassandra Clare new book',
      'Shadowhunters new novel 2026',
      'Mortal Instruments Cassandra Clare sequel',
      'Cassandra Clare Shadowhunter Chronicles 2027',
    ],
  },
  {
    slug: 'percy-jackson',
    name: 'Percy Jackson & The Olympians',
    shortName: 'Percy Jackson',
    author: 'Rick Riordan',
    authorQuery: 'Rick Riordan',
    genre: 'fantasy',
    description:
      "Rick Riordan's Percy Jackson & The Olympians redefined middle-grade and YA fantasy, spawning the Heroes of Olympus, The Kane Chronicles, Magnus Chase, and The Trials of Apollo. With a hit Disney+ adaptation and a devoted multigenerational fanbase, Riordan's mythological worlds remain must-reads — and new stories keep arriving.",
    searchTerms: [
      'Rick Riordan new book',
      'Percy Jackson new novel 2026',
      'Heroes of Olympus Rick Riordan sequel',
      'Rick Riordan mythology book 2027',
    ],
  },
  {
    slug: 'outlander',
    name: 'Outlander',
    author: 'Diana Gabaldon',
    authorQuery: 'Diana Gabaldon',
    genre: 'fiction',
    description:
      "Diana Gabaldon's Outlander series is a sweeping historical epic blending time travel, romance, and adventure across 18th-century Scotland. Nine novels deep — from Outlander to Go Tell the Bees That I Am Gone — the series has captivated millions of readers and inspired a long-running Starz TV series. Fans eagerly await Book 9 and beyond.",
    searchTerms: [
      'Diana Gabaldon new book',
      'Outlander new novel 2026',
      'Diana Gabaldon Outlander Book 9',
      'Outlander sequel Diana Gabaldon',
    ],
  },
  {
    slug: 'folk-of-the-air',
    name: 'The Folk of the Air',
    author: 'Holly Black',
    authorQuery: 'Holly Black',
    genre: 'fantasy',
    description:
      "Holly Black's The Folk of the Air trilogy — The Cruel Prince, The Wicked King, and The Queen of Nothing — is dark, addictive fae fantasy at its finest. Jude Duarte's ruthless rise through the treacherous courts of Faerie captivated a generation of readers. Holly Black continues expanding her fae universe with companion stories and new projects.",
    searchTerms: [
      'Holly Black new book',
      'Folk of the Air Holly Black sequel',
      'Holly Black fae novel 2026',
      'Cruel Prince sequel Holly Black',
    ],
  },
  {
    slug: 'shades-of-magic',
    name: 'Shades of Magic',
    shortName: 'V.E. Schwab',
    author: 'V.E. Schwab',
    authorQuery: 'V.E. Schwab',
    genre: 'fantasy',
    description:
      "V.E. Schwab's Shades of Magic trilogy — A Darker Shade of Magic, A Gathering of Shadows, A Conjuring of Light — follows a rare magician who can travel between parallel Londons. Schwab is also the author of the Villains duology (Vicious, Vengeful) and The Invisible Life of Addie LaRue, a modern literary fantasy phenomenon.",
    searchTerms: [
      'V.E. Schwab new book',
      'Shades of Magic V.E. Schwab sequel',
      'Victoria Schwab new novel 2026',
      'V.E. Schwab fantasy book 2027',
    ],
  },
  {
    slug: 'red-rising',
    name: 'Red Rising',
    author: 'Pierce Brown',
    authorQuery: 'Pierce Brown',
    genre: 'sci-fi',
    description:
      "Pierce Brown's Red Rising saga is a brutal, brilliantly plotted sci-fi epic set in a future where humanity has colonized the solar system under a rigid color-coded caste system. Beginning with Red Rising and continuing through six books to Light Bringer and Red God, the series blends the scope of Game of Thrones with the urgency of The Hunger Games.",
    searchTerms: [
      'Pierce Brown new book',
      'Red Rising sequel Pierce Brown',
      'Pierce Brown Red God 2026',
      'Red Rising saga new novel',
    ],
  },
  {
    slug: 'emily-henry',
    name: 'Emily Henry',
    author: 'Emily Henry',
    authorQuery: 'Emily Henry',
    genre: 'romance',
    description:
      "Emily Henry is the #1 New York Times bestselling author of witty, emotionally resonant romance novels including Beach Read, People We Meet on Vacation, Book Lovers, Happy Place, and Funny Story. Known for smart heroines and slow-burn tension, Henry has become the defining voice of the modern literary romance genre.",
    searchTerms: [
      'Emily Henry new book',
      'Emily Henry romance novel 2026',
      'Emily Henry new novel 2027',
      'Emily Henry upcoming book',
    ],
  },
  {
    slug: 'taylor-jenkins-reid',
    name: 'Taylor Jenkins Reid',
    author: 'Taylor Jenkins Reid',
    authorQuery: 'Taylor Jenkins Reid',
    genre: 'fiction',
    description:
      "Taylor Jenkins Reid writes sweeping, character-driven fiction that captures the texture of fame, love, and ambition across decades. The author of The Seven Husbands of Evelyn Hugo, Daisy Jones & The Six, Malibu Rising, and Carrie Soto Is Back, Reid has established herself as one of the most essential voices in contemporary fiction.",
    searchTerms: [
      'Taylor Jenkins Reid new book',
      'Taylor Jenkins Reid novel 2026',
      'Taylor Jenkins Reid upcoming 2027',
      'Evelyn Hugo sequel Taylor Jenkins Reid',
    ],
  },
  {
    slug: 'blood-and-ash',
    name: 'Blood and Ash',
    shortName: 'Blood & Ash',
    author: 'Jennifer L. Armentrout',
    authorQuery: 'Jennifer L. Armentrout',
    genre: 'fantasy',
    description:
      "Jennifer L. Armentrout's Blood and Ash series is a sweeping romantic fantasy following Poppy, a Maiden chosen by the gods, whose world unravels when she meets the guard Hawke. Beginning with From Blood and Ash and continuing through six books, the series blends epic world-building, passionate romance, and shocking plot twists. Armentrout has become one of the most prolific bestselling authors in romantic fantasy.",
    searchTerms: [
      'Jennifer L. Armentrout new book',
      'From Blood and Ash sequel',
      'Blood and Ash new book 2026',
      'Jennifer Armentrout upcoming novel',
      'From Blood and Ash reading order',
    ],
  },
  {
    slug: 'inheritance-games',
    name: 'The Inheritance Games',
    shortName: 'Inheritance Games',
    author: 'Jennifer Lynn Barnes',
    authorQuery: 'Jennifer Lynn Barnes',
    genre: 'thriller',
    description:
      "Jennifer Lynn Barnes's The Inheritance Games series is a compulsively readable YA mystery following Avery Grambs, who inherits the fortune of a billionaire she's never met — and gets entangled with his four grandsons, the Hawthorne brothers. Spanning The Inheritance Games, The Hawthorne Legacy, The Final Gambit, and The Brothers Hawthorne, with The Grandest Game launching a spinoff, the series has become a YA phenomenon.",
    searchTerms: [
      'Jennifer Lynn Barnes new book',
      'Inheritance Games sequel',
      'The Grandest Game Jennifer Lynn Barnes',
      'Inheritance Games reading order',
      'Hawthorne brothers next book',
    ],
  },
  {
    slug: 'bridgerton',
    name: 'Bridgerton',
    shortName: 'Bridgerton',
    author: 'Julia Quinn',
    authorQuery: 'Julia Quinn',
    genre: 'romance',
    description:
      "Julia Quinn's Bridgerton series is the beloved Regency romance saga following the eight Bridgerton siblings — Daphne, Anthony, Benedict, Colin, Eloise, Francesca, Hyacinth, and Gregory — as they each find love in London's glittering ton. The Netflix adaptation by Shonda Rhimes turned the series into a global phenomenon, drawing millions of new readers to Quinn's witty, swoony prose.",
    searchTerms: [
      'Julia Quinn new book',
      'Bridgerton book series order',
      'Julia Quinn romance novel 2026',
      'Bridgerton series reading order',
      'Julia Quinn upcoming book',
    ],
  },
  {
    slug: 'kingkiller-chronicle',
    name: 'The Kingkiller Chronicle',
    shortName: 'Kingkiller',
    author: 'Patrick Rothfuss',
    authorQuery: 'Patrick Rothfuss',
    genre: 'fantasy',
    description:
      "Patrick Rothfuss's Kingkiller Chronicle is one of the most celebrated fantasy series ever written, following the legendary Kvothe as he recounts his extraordinary life in The Name of the Wind and The Wise Man's Fear. Fans worldwide have waited over a decade for the concluding volume, The Doors of Stone — widely regarded as the most anticipated book in fantasy.",
    searchTerms: [
      'Patrick Rothfuss new book',
      'Doors of Stone release date',
      'Kingkiller Chronicle book 3',
      'Patrick Rothfuss Doors of Stone 2026',
      'Name of the Wind sequel Patrick Rothfuss',
    ],
  },
  {
    slug: 'the-witcher',
    name: 'The Witcher',
    shortName: 'Witcher',
    author: 'Andrzej Sapkowski',
    authorQuery: 'Andrzej Sapkowski',
    genre: 'fantasy',
    description:
      "Andrzej Sapkowski's The Witcher saga follows Geralt of Rivia, a professional monster hunter in a brutal, morally ambiguous fantasy world. Beginning with short story collections The Last Wish and Sword of Destiny, the saga continues through five novels — Blood of Elves, Time of Contempt, Baptism of Fire, Tower of the Swallow, and Lady of the Lake — as Geralt searches for Ciri, his adopted daughter. The Witcher became a global phenomenon through CD Projekt Red's acclaimed video games and a popular Netflix series.",
    searchTerms: [
      'Witcher reading order',
      'Andrzej Sapkowski new book',
      'Witcher book series order',
      'Witcher books before games',
      'Geralt of Rivia book series',
    ],
  },
  {
    slug: 'twisted',
    name: 'Twisted Series',
    shortName: 'Twisted',
    author: 'Ana Huang',
    authorQuery: 'Ana Huang',
    genre: 'romance',
    description:
      "Ana Huang's Twisted Series is a smoldering contemporary romance saga featuring wealthy, morally grey alpha heroes and the bold women who challenge them. Each book in the series can be read as a standalone with its own HEA, while interconnected characters and a shared world reward readers who start from the beginning. The series became a BookTok phenomenon, with millions of copies sold worldwide.",
    searchTerms: [
      'Ana Huang new book',
      'Twisted series reading order',
      'Ana Huang romance novel 2026',
      'Twisted Love Ana Huang',
      'Ana Huang upcoming book',
    ],
  },
  {
    slug: 'shatter-me',
    name: 'Shatter Me',
    shortName: 'Shatter Me',
    author: 'Tahereh Mafi',
    authorQuery: 'Tahereh Mafi',
    genre: 'fantasy',
    description:
      "Tahereh Mafi's Shatter Me series is a lush, prose-driven YA dystopian fantasy following Juliette, a girl whose touch is lethal. The series spans three original novels (Shatter Me, Unravel Me, Ignite Me), three novellas from Warner's POV (Destroy Me, Fracture Me, Shadow Me), and three continuation novels (Restore Me, Defy Me, Imagine Me) — plus a prequel novel. Known for its poetic writing style and passionate fans, Shatter Me is one of the most beloved YA series of the past decade.",
    searchTerms: [
      'Tahereh Mafi new book',
      'Shatter Me reading order',
      'Shatter Me series next book',
      'Juliette and Warner new book',
      'Tahereh Mafi upcoming novel 2026',
    ],
  },
  {
    slug: 'atlas-six',
    name: 'The Atlas Six',
    shortName: 'Atlas Six',
    author: 'Olivie Blake',
    authorQuery: 'Olivie Blake',
    genre: 'fantasy',
    description:
      "Olivie Blake's The Atlas Six is a dark, morally complex fantasy about six magicians recruited into the Alexandrian Society — an ancient secret organization that curates the world's most powerful knowledge. Each candidate's admission requires eliminating one of their peers. Spanning three books (The Atlas Six, The Atlas Paradox, The Atlas Complex), the series is renowned for its unreliable narrators, philosophically dense prose, and compulsively readable intrigue.",
    searchTerms: [
      'Olivie Blake new book',
      'Atlas Six reading order',
      'The Atlas Complex sequel',
      'Olivie Blake upcoming novel 2026',
      'Atlas Six series order',
    ],
  },
  {
    slug: 'hunger-games',
    name: 'The Hunger Games',
    shortName: 'Hunger Games',
    author: 'Suzanne Collins',
    authorQuery: 'Suzanne Collins',
    genre: 'sci-fi',
    description:
      "Suzanne Collins' The Hunger Games is the landmark YA dystopian series set in Panem, a future North America divided into twelve districts ruled by the Capitol. The trilogy follows Katniss Everdeen — a tribute forced into televised death-matches who becomes the face of a revolution. The Ballad of Songbirds and Snakes (2020) and the forthcoming Sunrise on the Reaping (March 2026) expand the universe with Capitol president Snow's origin story and Haymitch Abernathy's Games.",
    searchTerms: [
      'Suzanne Collins new book',
      'Hunger Games new book',
      'Sunrise on the Reaping release date',
      'Hunger Games series order',
      'Hunger Games prequel',
      'Sunrise on the Reaping 2026',
    ],
  },
  {
    slug: 'wheel-of-time',
    name: 'The Wheel of Time',
    shortName: 'Wheel of Time',
    author: 'Robert Jordan',
    authorQuery: 'Robert Jordan Brandon Sanderson',
    genre: 'fantasy',
    description:
      "Robert Jordan's The Wheel of Time is one of the greatest epic fantasy series ever written — fourteen novels plus a prequel spanning over 11,000 pages of world-building, prophecy, and war. Rand al'Thor discovers he is the Dragon Reborn, destined to save the world and break it. Jordan passed away in 2007 having written eleven books; Brandon Sanderson completed the trilogy from Jordan's notes. The Amazon Prime series brought an entire new generation to the Wheel.",
    searchTerms: [
      'Robert Jordan new book',
      'Wheel of Time reading order',
      'Wheel of Time series order',
      'Wheel of Time next book',
      'Wheel of Time Amazon show',
      'WoT reading order',
    ],
  },
  {
    slug: 'poppy-war',
    name: 'The Poppy War',
    shortName: 'Poppy War',
    author: 'R.F. Kuang',
    authorQuery: 'R.F. Kuang',
    genre: 'fantasy',
    description:
      "R.F. Kuang's The Poppy War trilogy is a brutal, devastating military fantasy inspired by 20th-century Chinese history. Rin, a war orphan, tests into the most elite military school in the Nikara Empire — and discovers a shamanic power that will make her the most feared weapon in a genocidal war. Followed by Babel (2022), a standalone Oxford fantasy, and Yellowface (2023), Kuang has become one of the most important literary voices in modern speculative fiction.",
    searchTerms: [
      'R.F. Kuang new book',
      'Poppy War reading order',
      'RF Kuang new book 2026',
      'Babel R.F. Kuang',
      'R.F. Kuang upcoming novel',
      'Poppy War series next book',
    ],
  },
  {
    slug: 'dark-tower',
    name: 'The Dark Tower',
    shortName: 'Dark Tower',
    author: 'Stephen King',
    authorQuery: 'Stephen King',
    genre: 'fantasy',
    description:
      "Stephen King's The Dark Tower is his magnum opus — an eight-novel epic blending fantasy, science fiction, horror, and Western mythology. Roland Deschain, the last Gunslinger, pursues the Man in Black across a post-apocalyptic landscape toward the Dark Tower, the axis of all realities. The series spans The Gunslinger through The Wind Through the Keyhole and intersects with dozens of King's other novels, creating a vast shared universe known as the King Multiverse.",
    searchTerms: [
      'Stephen King new book',
      'Dark Tower reading order',
      'Dark Tower series order',
      'Dark Tower new book',
      'Roland Deschain new book',
      'Stephen King Dark Tower 9',
    ],
  },
  {
    slug: 'dune',
    name: 'Dune',
    shortName: 'Dune',
    author: 'Frank Herbert',
    authorQuery: 'Frank Herbert',
    genre: 'sci-fi',
    description:
      "Frank Herbert's Dune is the bestselling science fiction novel of all time — a sweeping saga of politics, ecology, religion, and destiny set on the desert planet Arrakis. The original Dune Saga spans six novels by Herbert; Brian Herbert and Kevin J. Anderson have continued the universe across many prequel and sequel novels. After the Denis Villeneuve film adaptations, Dune has introduced a new generation of readers to the spice, the Fremen, and the fate of Paul Atreides.",
    searchTerms: [
      'Dune Frank Herbert',
      'Dune reading order',
      'Dune book series order',
      'Dune 3 release date',
      'Brian Herbert Dune new book',
    ],
  },
  {
    slug: 'divergent',
    name: 'Divergent',
    shortName: 'Divergent',
    author: 'Veronica Roth',
    authorQuery: 'Veronica Roth',
    genre: 'fiction',
    description:
      "Veronica Roth's Divergent trilogy is the defining YA dystopian series of the 2010s, following Beatrice 'Tris' Prior through a Chicago divided into five factions — Dauntless, Abnegation, Erudite, Amity, and Candor. The trilogy (Divergent, Insurgent, Allegiant) plus novellas delivered one of the decade's most-read YA series, with over 35 million copies sold worldwide.",
    searchTerms: [
      'Veronica Roth new book',
      'Divergent reading order',
      'Divergent series order',
      'Divergent books in order',
    ],
  },
  {
    slug: 'vampire-academy',
    name: 'Vampire Academy',
    shortName: 'Vampire Academy',
    author: 'Richelle Mead',
    authorQuery: 'Richelle Mead',
    genre: 'romance',
    description:
      "Richelle Mead's Vampire Academy series follows Rose Hathaway, a half-vampire guardian bonded to Lissa Dragomir, a Moroi princess, through St. Vladimir's Academy and beyond. The six-book series (plus the six-book Bloodlines spinoff) defined paranormal YA romance for a generation, blending boarding school drama, forbidden love, and supernatural world-building.",
    searchTerms: [
      'Richelle Mead new book',
      'Vampire Academy reading order',
      'Vampire Academy books in order',
      'Bloodlines series order',
    ],
  },
  {
    slug: 'eragon',
    name: 'Inheritance Cycle',
    shortName: 'Eragon',
    author: 'Christopher Paolini',
    authorQuery: 'Christopher Paolini',
    genre: 'fantasy',
    description:
      "Christopher Paolini began writing Eragon at fifteen years old — the story of a farm boy who finds a dragon egg and becomes a Dragon Rider in the land of Alagaësia. The Inheritance Cycle spans four novels (Eragon, Eldest, Brisingr, Inheritance) and has sold over 35 million copies worldwide. Paolini returned to Alagaësia with the standalone novel Murtagh (2023), continuing the world with a new focus on the antihero.",
    searchTerms: [
      'Christopher Paolini new book',
      'Eragon reading order',
      'Inheritance Cycle order',
      'Christopher Paolini Murtagh',
      'Alagaësia new book',
    ],
  },
  {
    slug: 'maze-runner',
    name: 'The Maze Runner',
    shortName: 'Maze Runner',
    author: 'James Dashner',
    authorQuery: 'James Dashner',
    genre: 'fiction',
    description:
      "James Dashner's Maze Runner trilogy begins in the Glade — a community of teenage boys with no memories, enclosed by a massive stone maze that closes every night and fills with mechanical monsters called Grievers. Thomas arrives with no memory and a sense that he's seen this place before. The Maze Runner is a high-concept survival thriller that launched one of the defining YA dystopian film franchises of the 2010s.",
    searchTerms: [
      'James Dashner new book',
      'Maze Runner reading order',
      'Maze Runner series order',
      'Maze Runner books in order',
    ],
  },
  {
    slug: 'red-queen',
    name: 'Red Queen',
    shortName: 'Red Queen',
    author: 'Victoria Aveyard',
    authorQuery: 'Victoria Aveyard',
    genre: 'fiction',
    description:
      "Victoria Aveyard's Red Queen series is set in a world divided by blood — Silvers with superhuman abilities rule over Reds who serve them. Mare Barrow is Red, born without abilities, but when she discovers she has Silver-level powers nobody can explain, she's thrust into the Silver court with a fake noble identity and a dangerous secret. The Red Queen series spans 4 novels and is known for its shocking betrayal twists.",
    searchTerms: [
      'Victoria Aveyard new book',
      'Red Queen reading order',
      'Red Queen series order',
      'Red Queen books in order',
    ],
  },
  {
    slug: 'legend',
    name: 'Legend',
    shortName: 'Legend',
    author: 'Marie Lu',
    authorQuery: 'Marie Lu',
    genre: 'fiction',
    description:
      "Marie Lu's Legend trilogy is set in a future United States split between the Republic and the Colonies, where Day is the Republic's most-wanted criminal and June is its most brilliant military prodigy. When June is sent to hunt Day, what she discovers about the Republic changes everything. The trilogy is known for its dual-POV structure, kinetic pacing, and the electric relationship between its two protagonists.",
    searchTerms: [
      'Marie Lu new book',
      'Legend reading order',
      'Legend series Marie Lu',
      'Legend books in order',
    ],
  },
  {
    slug: 'selection',
    name: 'The Selection',
    shortName: 'Selection',
    author: 'Kiera Cass',
    authorQuery: 'Kiera Cass',
    genre: 'romance',
    description:
      "Kiera Cass's Selection series is set in a future America called Illea, where a prince must choose his bride from 35 girls selected from across the castes in a televised competition. America Singer didn't want to enter — but the palace, the prince, and the truth about her world will change everything. The Selection is a dystopian romance series beloved for its addictive competition premise and love triangle.",
    searchTerms: [
      'Kiera Cass new book',
      'Selection reading order',
      'Selection series order',
      'Selection books in order',
    ],
  },
  {
    slug: 'harry-potter',
    name: 'Harry Potter',
    shortName: 'Harry Potter',
    author: 'J.K. Rowling',
    authorQuery: 'J.K. Rowling',
    genre: 'fantasy',
    description:
      "J.K. Rowling's Harry Potter series is the best-selling book series in history, with over 600 million copies sold worldwide. The seven novels follow Harry Potter from his discovery that he is a wizard through seven years at Hogwarts School of Witchcraft and Wizardry, culminating in his final confrontation with Lord Voldemort. The series is beloved for its richly imagined magical world, its themes of friendship, death, and love, and its ability to grow with its readers across a decade of books.",
    searchTerms: [
      'Harry Potter new book',
      'Harry Potter reading order',
      'Harry Potter books in order',
      'J.K. Rowling new book',
      'Hogwarts new book',
    ],
  },
  {
    slug: 'shadow-and-bone',
    name: 'Grishaverse (Shadow and Bone)',
    shortName: 'Shadow and Bone',
    author: 'Leigh Bardugo',
    authorQuery: 'Leigh Bardugo',
    genre: 'fantasy',
    description:
      "Leigh Bardugo's Grishaverse is one of the most expansive fantasy universes in modern YA, spanning the Shadow and Bone trilogy, the Six of Crows duology, the King of Scars duology, and multiple novellas. The Shadow and Bone trilogy follows Alina Starkov, a soldier who discovers she is a Sun Summoner — the one person who can destroy the Fold, a swath of permanent darkness across Ravka. The world combines Eastern European folklore with a military fantasy setting and has been adapted into a major Netflix series.",
    searchTerms: [
      'Leigh Bardugo new book',
      'Shadow and Bone reading order',
      'Grishaverse reading order',
      'Shadow and Bone books in order',
    ],
  },
  {
    slug: 'twilight',
    name: 'Twilight Saga',
    shortName: 'Twilight',
    author: 'Stephenie Meyer',
    authorQuery: 'Stephenie Meyer',
    genre: 'romance',
    description:
      "Stephenie Meyer's Twilight saga is a four-book paranormal romance series that launched a cultural phenomenon. The series follows Bella Swan, who moves to the rainy town of Forks, Washington, and falls in love with Edward Cullen, a vampire who has been 17 for a century. The tension between Bella's mortality and Edward's immortality, and the rival claim of werewolf Jacob Black, drives the saga through supernatural war and a conclusion that redefined paranormal romance for a generation.",
    searchTerms: [
      'Stephenie Meyer new book',
      'Twilight reading order',
      'Twilight books in order',
      'Twilight saga order',
      'Midnight Sun Stephenie Meyer',
    ],
  },
  {
    slug: 'an-ember-in-the-ashes',
    name: 'An Ember in the Ashes',
    shortName: 'Ember in the Ashes',
    author: 'Sabaa Tahir',
    authorQuery: 'Sabaa Tahir',
    genre: 'fantasy',
    description:
      "Sabaa Tahir's An Ember in the Ashes series is a four-book fantasy saga set in a Roman-inspired empire where Scholar slaves serve the Martial regime. The series follows two protagonists — Laia, a Scholar girl who goes undercover as a slave to save her brother, and Elias, the empire's greatest soldier who wants nothing more than to be free — as their paths collide and the revolution they never meant to start catches up with them. Known for its brutal world-building, dual-POV structure, and exceptional emotional depth.",
    searchTerms: [
      'Sabaa Tahir new book',
      'Ember in the Ashes reading order',
      'An Ember in the Ashes books in order',
      'Sabaa Tahir series order',
    ],
  },
  {
    slug: 'scythe',
    name: 'Arc of a Scythe',
    shortName: 'Scythe',
    author: 'Neal Shusterman',
    authorQuery: 'Neal Shusterman',
    genre: 'sci-fi',
    description:
      "Neal Shusterman's Arc of a Scythe trilogy is set in a post-mortal world where disease and war have been eliminated by a benevolent AI called the Thunderhead, and an order of Scythes administers the only remaining death to control population. Two teenagers are apprenticed to a Scythe in Book 1 and discover the institution is being corrupted from within. The series is a philosophical YA thriller that asks what the value of human life is when it has been stripped of natural death — and what happens when the people who decide who dies gain absolute power.",
    searchTerms: [
      'Neal Shusterman new book',
      'Scythe reading order',
      'Arc of a Scythe order',
      'Scythe books in order',
    ],
  },
  {
    slug: 'the-giver',
    name: 'The Giver Quartet',
    shortName: 'The Giver',
    author: 'Lois Lowry',
    authorQuery: 'Lois Lowry',
    genre: 'fiction',
    description:
      "Lois Lowry's The Giver (1993) is one of the most widely assigned novels in American schools — a slim, devastating story about a twelve-year-old boy named Jonas who lives in a Community of enforced Sameness, where suffering, color, and memory have all been eliminated. When Jonas is chosen as the Receiver of Memory, he inherits all the pain, joy, and complexity his community has surrendered. The book won the 1994 Newbery Medal and has never gone out of print. Three companion novels (Gathering Blue, Messenger, Son) expand the world across different communities.",
    searchTerms: [
      'Lois Lowry new book',
      'The Giver reading order',
      'Giver Quartet order',
      'The Giver books in order',
    ],
  },
  {
    slug: 'unwind',
    name: 'Unwind Dystology',
    shortName: 'Unwind',
    author: 'Neal Shusterman',
    authorQuery: 'Neal Shusterman',
    genre: 'sci-fi',
    description:
      "Neal Shusterman's Unwind Dystology is set in a future America where the Second Civil War ended with the Bill of Life — abortion is illegal, but parents can retroactively 'unwind' a teenager aged 13 to 18, having them taken to harvest camps where their body parts are divided and donated to others. The series begins with three teenagers who escape their unwinding and discover how deep the system goes. Unwind is known for the most disturbing single chapter in YA fiction and a moral architecture that refuses easy answers.",
    searchTerms: [
      'Neal Shusterman Unwind',
      'Unwind reading order',
      'Unwind books in order',
      'Unwind series order',
    ],
  },
  {
    slug: 'handmaids-tale',
    name: "The Handmaid's Tale",
    shortName: "Handmaid's Tale",
    author: 'Margaret Atwood',
    authorQuery: 'Margaret Atwood',
    genre: 'fiction',
    description:
      "Margaret Atwood's The Handmaid's Tale (1985) is the defining dystopian novel of the 20th century — a speculative fiction about Offred, a handmaid in the theocratic Republic of Gilead, where fertile women are forced to bear children for the ruling class. The novel's influence has only grown since the 2017 Hulu adaptation starring Elisabeth Moss. The Testaments (2019) is a direct sequel told from three new perspectives, set 15 years after the original, and won the Booker Prize.",
    searchTerms: [
      'Margaret Atwood new book',
      "Handmaid's Tale reading order",
      "Handmaid's Tale books in order",
      'The Testaments reading order',
    ],
  },
  {
    slug: 'children-of-blood-and-bone',
    name: 'Legacy of Orïsha',
    shortName: 'Blood and Bone',
    author: 'Tomi Adeyemi',
    authorQuery: 'Tomi Adeyemi',
    genre: 'fantasy',
    description:
      "Tomi Adeyemi's Legacy of Orïsha series is a West African-inspired epic fantasy set in a Nigeria where magic existed until a king ordered all Maji exterminated. Seventeen years later, Zélie Adebola discovers a scroll that could restore magic — if she can survive long enough to use it. Children of Blood and Bone became a #1 New York Times bestseller before it was published and sparked a bidding war for film rights. The series draws on Yoruba mythology to create a richly textured world that feels unlike anything else in YA fantasy.",
    searchTerms: [
      'Tomi Adeyemi new book',
      'Children of Blood and Bone reading order',
      'Legacy of Orïsha order',
      'Tomi Adeyemi next book',
    ],
  },
];

export function getSeriesBySlug(slug: string): SeriesDefinition | undefined {
  return SERIES.find((s) => s.slug === slug);
}
