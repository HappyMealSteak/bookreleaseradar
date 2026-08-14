export interface RecommendedBook {
  title: string;
  author: string;
  why: string;
  genre: string;
}

export interface BooksLikeEntry {
  slug: string;
  sourceTitle: string;
  sourceShortName?: string;
  tagline: string;
  description: string;
  recommendations: RecommendedBook[];
  keywords: string[];
}

function amazonUrl(title: string, author: string): string {
  const tag = 'bookreleaseradar-20';
  const q = encodeURIComponent(`${title} ${author}`);
  return `https://www.amazon.com/s?k=${q}&i=stripbooks&tag=${tag}`;
}

export function getRecommendationAmazonUrl(book: RecommendedBook): string {
  return amazonUrl(book.title, book.author);
}

export const RECOMMENDATIONS: BooksLikeEntry[] = [
  {
    slug: 'acotar',
    sourceTitle: 'A Court of Thorns and Roses',
    sourceShortName: 'ACOTAR',
    tagline: 'Fae courts, forbidden love, and high-stakes magic',
    description:
      "If you loved ACOTAR's blend of fae mythology, enemies-to-lovers romance, and immersive world-building, these books deliver the same addictive mix of magic, tension, and swoon-worthy romance.",
    keywords: [
      'books like ACOTAR',
      'books similar to A Court of Thorns and Roses',
      'if you liked ACOTAR',
      'romantasy books like ACOTAR',
      'fae romance books',
      'books like Sarah J Maas',
    ],
    recommendations: [
      { title: 'Fourth Wing', author: 'Rebecca Yarros', why: 'Dragon riders, enemies-to-lovers romance, and the same intense fandom. The most direct heir to ACOTAR\'s romantasy throne.', genre: 'fantasy' },
      { title: 'From Blood and Ash', author: 'Jennifer L. Armentrout', why: 'Forbidden love, secret identities, and a hidden magical world. Fans of ACOTAR consistently rate this as their top recommendation.', genre: 'fantasy' },
      { title: 'The Cruel Prince', author: 'Holly Black', why: 'Mortal girl in a ruthless fae court — the original inspiration often cited alongside ACOTAR. Sharp prose, complex power dynamics.', genre: 'fantasy' },
      { title: 'An Ember in the Ashes', author: 'Sabaa Tahir', why: 'Roman Empire–inspired world, forbidden love across class lines, and the kind of slow burn that readers can\'t put down.', genre: 'fantasy' },
      { title: 'Caraval', author: 'Stephanie Garber', why: 'Atmospheric, lush, and mysterious — a magical competition with romance and twists. Perfect for readers who love ACOTAR\'s sense of wonder.', genre: 'fantasy' },
      { title: 'Kingdom of the Wicked', author: 'Kerri Maniscalco', why: 'Historical Sicily meets demonic mythology and slow-burn romance. Dark, atmospheric, and addictive — a natural next read after ACOTAR.', genre: 'fantasy' },
      { title: 'The Bridge Kingdom', author: 'Danielle L. Jensen', why: 'Political intrigue, enemies who become lovers, and a morally gray love interest. Fans of Rhysand will love this.', genre: 'fantasy' },
      { title: 'A Touch of Darkness', author: 'Scarlett St. Clair', why: 'Hades and Persephone mythology retelling with dark romance and forbidden attraction — very similar energy to ACOTAR\'s Feyre and Tamlin arc.', genre: 'fantasy' },
    ],
  },
  {
    slug: 'fourth-wing',
    sourceTitle: 'Fourth Wing',
    sourceShortName: 'Empyrean',
    tagline: 'Dragon riders, enemies-to-lovers, and high-stakes war',
    description:
      "Fourth Wing captured the world with its dragon-riding academy, brooding love interest, and intense enemies-to-lovers arc. Here are the best books to read when you've finished the Empyrean series.",
    keywords: [
      'books like Fourth Wing',
      'books similar to Fourth Wing',
      'if you liked Fourth Wing',
      'romantasy books like Fourth Wing',
      'dragon books like Fourth Wing',
      'books like Rebecca Yarros',
    ],
    recommendations: [
      { title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas', why: 'The reigning queen of romantasy. ACOTAR shares Fourth Wing\'s enemies-to-lovers intensity, morally gray love interest, and addictive pacing.', genre: 'fantasy' },
      { title: 'From Blood and Ash', author: 'Jennifer L. Armentrout', why: 'The most popular recommendation for Fourth Wing fans — forbidden love, hidden worlds, and that same "I couldn\'t put it down" energy.', genre: 'fantasy' },
      { title: 'The Cruel Prince', author: 'Holly Black', why: 'A mortal girl navigating a dangerous world of powerful, ruthless men. The dynamic between Jude and Cardan mirrors Violet and Xaden perfectly.', genre: 'fantasy' },
      { title: 'An Ember in the Ashes', author: 'Sabaa Tahir', why: 'Military academy setting, oppressive power structures, and a slow-burn romance across class divides. Tonally closest to Fourth Wing\'s academy arc.', genre: 'fantasy' },
      { title: 'Lightlark', author: 'Alex Aster', why: 'An island where six rulers compete, secrets, and forbidden attractions. Great for readers who loved Fourth Wing\'s layered mystery.', genre: 'fantasy' },
      { title: 'The Bridge Kingdom', author: 'Danielle L. Jensen', why: 'Enemies-to-lovers with spectacular world-building and a brooding love interest who rivals Xaden for intensity.', genre: 'fantasy' },
      { title: 'Serpent & Dove', author: 'Shelby Mahurin', why: 'Witch and witch hunter forced together, forbidden attraction, and sharp banter. An extremely popular pick for Fourth Wing fans.', genre: 'fantasy' },
      { title: 'The Poppy War', author: 'R.F. Kuang', why: 'Military academy, gifted protagonist finding hidden power, and brutal war. Darker than Fourth Wing but equally gripping for fans of the academy setting.', genre: 'fantasy' },
    ],
  },
  {
    slug: 'colleen-hoover',
    sourceTitle: 'Colleen Hoover',
    sourceShortName: 'CoHo',
    tagline: 'Emotional romance that hits different',
    description:
      "Colleen Hoover built her following on emotionally raw, character-driven romance with unexpected twists. These authors deliver the same gut-punch emotional depth and compelling love stories that CoHo fans crave.",
    keywords: [
      'books like Colleen Hoover',
      'authors like Colleen Hoover',
      'if you liked Colleen Hoover',
      'romance books like CoHo',
      'new adult romance like Colleen Hoover',
      'emotional romance books',
    ],
    recommendations: [
      { title: 'Beach Read', author: 'Emily Henry', why: "Emily Henry is the most recommended CoHo alternative — smart, emotionally resonant romance with genuinely funny banter. Beach Read is the perfect entry point.", genre: 'romance' },
      { title: 'People We Meet on Vacation', author: 'Emily Henry', why: "Friends-to-lovers across years of missed chances. If you loved the longing in It Ends with Us, this will wreck you in the best way.", genre: 'romance' },
      { title: 'The Love Hypothesis', author: 'Ali Hazelwood', why: "Fake dating in academia with a nerdy heroine and a grumpy love interest. Lighter than CoHo but with the same addictive \"one more chapter\" pull.", genre: 'romance' },
      { title: 'The Spanish Love Deception', author: 'Elena Armas', why: "Enemies-to-lovers, fake dating, and will-they-won't-they tension done brilliantly. A massive BookTok hit for CoHo fans.", genre: 'romance' },
      { title: 'Reminders of Him', author: 'Colleen Hoover', why: "Already a CoHo reader? Reminders of Him is the most emotionally complex of her recent books — grieving mother, impossible love story, devastating and beautiful.", genre: 'romance' },
      { title: 'Twisted Love', author: 'Ana Huang', why: "Overprotective, brooding love interest with a dark past — the grumpy-sunshine dynamic CoHo fans adore, turned up to eleven.", genre: 'romance' },
      { title: 'The Simple Wild', author: 'K.A. Tucker', why: "Alaska setting, emotionally unavailable hero, and a heroine learning what really matters. Perfect for fans of CoHo\'s sweeping emotional arcs.", genre: 'romance' },
      { title: 'It Starts with Us', author: 'Colleen Hoover', why: "The long-awaited sequel to It Ends with Us — essential reading for any CoHo fan who needs to see Lily\'s story continue.", genre: 'romance' },
    ],
  },
  {
    slug: 'a-song-of-ice-and-fire',
    sourceTitle: 'A Song of Ice and Fire',
    sourceShortName: 'GoT',
    tagline: 'Dark politics, moral ambiguity, and epic world-building',
    description:
      "A Song of Ice and Fire redefined epic fantasy with its morally gray characters, political intrigue, and refusal to play by genre rules. These books deliver the same complexity while you wait for The Winds of Winter.",
    keywords: [
      'books like Game of Thrones',
      'books like A Song of Ice and Fire',
      'books like GoT',
      'epic fantasy like George R.R. Martin',
      'dark fantasy political intrigue',
      'books to read while waiting for Winds of Winter',
    ],
    recommendations: [
      { title: 'The Blade Itself', author: 'Joe Abercrombie', why: "The closest thing to GRRM in the genre — brutal, funny, and morally complex. Abercrombie's First Law trilogy subverts fantasy tropes as ruthlessly as Martin does.", genre: 'fantasy' },
      { title: 'Prince of Thorns', author: 'Mark Lawrence', why: "Grimdark fantasy with a young anti-hero, political maneuvering, and a post-apocalyptic medieval world. Dark, brilliant, and relentless.", genre: 'fantasy' },
      { title: 'The Way of Kings', author: 'Brandon Sanderson', why: "Epic in scope with equally intricate world-building. Less grimdark but similarly massive in scale — perfect for ASOIAF fans who want the size without the despair.", genre: 'fantasy' },
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', why: "Beautifully written, complex protagonist, and a richly detailed world. Fans of Martin\'s prose style often cite Rothfuss as the closest literary equivalent.", genre: 'fantasy' },
      { title: 'The Lions of Al-Rassan', author: 'Guy Gavriel Kay', why: "Historical fantasy with political intrigue, cultural conflict, and bittersweet romance. Kay is GRRM\'s most cited literary influence.", genre: 'fantasy' },
      { title: 'The Lies of Locke Lamora', author: 'Scott Lynch', why: "Heist fantasy with a sprawling criminal underworld, complex con artists, and the kind of witty, violent plotting that GRRM fans love.", genre: 'fantasy' },
      { title: 'Blood Song', author: 'Anthony Ryan', why: "Military fantasy with a complex protagonist, a fascinating order system, and secrets that unravel over time. Huge ASOIAF crossover fandom.", genre: 'fantasy' },
      { title: 'Fire & Blood', author: 'George R.R. Martin', why: "While you wait for Winds of Winter — dive into the Targaryen history that inspired House of the Dragon. Same universe, equally rich.", genre: 'fantasy' },
    ],
  },
  {
    slug: 'stormlight-archive',
    sourceTitle: 'The Stormlight Archive',
    tagline: 'Epic world-building, magic systems, and sweeping scope',
    description:
      "The Stormlight Archive sets the bar for modern epic fantasy with its depth, complexity, and emotional impact. These books match that ambition — massive worlds, intricate magic, and character arcs that span thousands of pages.",
    keywords: [
      'books like Stormlight Archive',
      'books like Brandon Sanderson',
      'epic fantasy like Stormlight',
      'books like Way of Kings',
      'books for Stormlight Archive fans',
    ],
    recommendations: [
      { title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', why: "The obvious starting point — Sanderson's other beloved Cosmere series shares the same meticulous magic systems and emotional payoffs.", genre: 'fantasy' },
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', why: "Arguably the only other modern fantasy with comparable prose quality and world-building ambition. Essential reading for Stormlight fans.", genre: 'fantasy' },
      { title: 'The Priory of the Orange Tree', author: 'Samantha Shannon', why: "One-volume epic with dragon riders, complex female protagonists, and three distinct continents of world-building. Beloved by Sanderson fans.", genre: 'fantasy' },
      { title: 'The Eye of the World', author: 'Robert Jordan', why: "Brandon Sanderson completed the Wheel of Time — the series that most influenced him. If you love Stormlight, start here.", genre: 'fantasy' },
      { title: 'A Game of Thrones', author: 'George R.R. Martin', why: "Different tone (darker, more political) but equally epic in scope. The only series that competes with Stormlight for pure scale.", genre: 'fantasy' },
      { title: 'The Blade Itself', author: 'Joe Abercrombie', why: "Masterful character work and subverted genre expectations. Stormlight fans who want something shorter and grimmer love Abercrombie.", genre: 'fantasy' },
      { title: 'The Black Prism', author: 'Brent Weeks', why: "The Lightbringer series features a magic system as inventive as Allomancy — color-based magic with political intrigue and complex morality.", genre: 'fantasy' },
      { title: 'The Poppy War', author: 'R.F. Kuang', why: "Grimdark, brilliant, and devastating — Chinese history-inspired fantasy with the same willingness to put characters through hell that Sanderson embraces.", genre: 'fantasy' },
    ],
  },
  {
    slug: 'mistborn',
    sourceTitle: 'Mistborn',
    sourceShortName: 'Mistborn',
    tagline: 'Heist fantasy, hard magic, and underdog heroes',
    description:
      "Mistborn hooked readers with its revolutionary hard magic system, a band of scrappy thieves taking on an immortal tyrant, and emotional sucker punches. These books share the same addictive blend of clever systems and beloved characters.",
    keywords: [
      'books like Mistborn',
      'books similar to Mistborn',
      'if you liked Mistborn',
      'epic fantasy like Mistborn',
      'hard magic system fantasy',
      'books like Brandon Sanderson Mistborn',
    ],
    recommendations: [
      { title: 'The Way of Kings', author: 'Brandon Sanderson', why: "Sanderson's magnum opus — a grander, more emotional scale with Cosmere connections to Mistborn. If you loved the magic system, Stormlight Archive takes it further.", genre: 'fantasy' },
      { title: 'The Final Empire (Mistborn #1)', author: 'Brandon Sanderson', why: "Already a fan? The second Mistborn era (Wax & Wayne) is a great steampunk continuation with the same magic in a new setting.", genre: 'fantasy' },
      { title: 'The Lies of Locke Lamora', author: 'Scott Lynch', why: "The heist fantasy par excellence — a crew of con artists in a renaissance city that feels as lived-in as Luthadel. Razor-sharp dialogue and devastating twists.", genre: 'fantasy' },
      { title: 'The Blade Itself', author: 'Joe Abercrombie', why: "Morally complex characters and a fantasy world that subverts every trope. If you loved Kelsier's cynicism, Abercrombie's cast will feel like family.", genre: 'fantasy' },
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', why: "A different kind of hard magic system — sympathy — with a brilliant underdog protagonist. Rothfuss and Sanderson are the twin pillars of modern epic fantasy.", genre: 'fantasy' },
      { title: 'The Black Prism', author: 'Brent Weeks', why: "Lightbringer's color-based magic system rivals Allomancy for inventiveness. Political intrigue, a large cast, and a satisfying multi-book payoff.", genre: 'fantasy' },
      { title: 'Six of Crows', author: 'Leigh Bardugo', why: "Heist crew, impossible mission, morally gray characters with rich backstories. The Grisha world's equivalent of Mistborn's first arc.", genre: 'fantasy' },
      { title: 'The Goblin Emperor', author: 'Katherine Addison', why: "An unlikely protagonist thrust into power, navigating politics with kindness. A gentler counterpoint to Vin's story — still deeply rewarding.", genre: 'fantasy' },
    ],
  },
  {
    slug: 'wheel-of-time',
    sourceTitle: 'The Wheel of Time',
    sourceShortName: 'WoT',
    tagline: 'Epic scope, deep lore, and an unforgettable world',
    description:
      "The Wheel of Time is one of fantasy's grandest achievements — 14 books, 4 million words, and a world with more depth than most. These books are the best companions and successors for readers who can't get enough.",
    keywords: [
      'books like Wheel of Time',
      'books like WoT',
      'epic fantasy like Wheel of Time',
      'books like Robert Jordan',
      'books similar to Wheel of Time',
      'what to read after Wheel of Time',
    ],
    recommendations: [
      { title: 'The Way of Kings', author: 'Brandon Sanderson', why: "Sanderson completed WoT — and Stormlight Archive is his own take on the epic-scale world-building Jordan pioneered. The most natural next series for WoT fans.", genre: 'fantasy' },
      { title: 'The Eye of the World', author: 'Robert Jordan', why: "Still in WoT? Book 1 is often the best re-read start. If you've finished: the New Spring prequel reveals Moiraine's backstory in full.", genre: 'fantasy' },
      { title: 'A Game of Thrones', author: 'George R.R. Martin', why: "Started the same year as WoT (1996) and shares the same epic ambition with a darker, more political edge. The two series defined a generation of fantasy.", genre: 'fantasy' },
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', why: "Like WoT, it features a brilliant protagonist whose legend is larger than the man, told against a richly detailed world. Beautiful prose that Jordan fans love.", genre: 'fantasy' },
      { title: 'The Malazan Book of the Fallen', author: 'Steven Erikson', why: "If WoT isn't big enough — Malazan is even more complex, with a 10-book series and thousands of years of history. Demanding but rewarding.", genre: 'fantasy' },
      { title: 'The Sword of Kaigen', author: 'M.L. Wang', why: "A standalone epic with the emotional depth and magic of WoT compressed into a single devastating volume. Perfect palate cleanser.", genre: 'fantasy' },
      { title: 'The Stormlight Archive', author: 'Brandon Sanderson', why: "The series Sanderson built after proving himself on WoT — more emotionally intense, more intricate magic, and equally massive in scope.", genre: 'fantasy' },
      { title: 'Tigana', author: 'Guy Gavriel Kay', why: "Single-volume epic fantasy with WoT-level emotional impact. Kay understands the same tropes Jordan used and makes them sing.", genre: 'fantasy' },
    ],
  },
  {
    slug: 'hunger-games',
    sourceTitle: 'The Hunger Games',
    sourceShortName: 'THG',
    tagline: 'Dystopian survival, revolution, and a heroine who fights back',
    description:
      "The Hunger Games defined a generation of YA dystopian fiction with its visceral survival stakes, political allegory, and a heroine who didn't have all the answers. These books match that energy and then some.",
    keywords: [
      'books like Hunger Games',
      'books similar to Hunger Games',
      'if you liked Hunger Games',
      'YA dystopian books like Hunger Games',
      'books like Suzanne Collins',
      'what to read after Hunger Games',
    ],
    recommendations: [
      { title: 'Divergent', author: 'Veronica Roth', why: "The most direct YA heir — faction-based dystopia, a female protagonist, and a love triangle. Shares Hunger Games' pacing and YA energy.", genre: 'fiction' },
      { title: 'The Maze Runner', author: 'James Dashner', why: "Teens in a deadly arena with no memory and no rules. Identical survival-thriller pacing — if you loved the Games, the Maze delivers.", genre: 'fiction' },
      { title: 'Red Queen', author: 'Victoria Aveyard', why: "Class war, unexpected powers, and a protagonist navigating political manipulation. The Hunger Games' political chess moves with a fantasy overlay.", genre: 'fantasy' },
      { title: 'An Ember in the Ashes', author: 'Sabaa Tahir', why: "A brutal military empire, gladiatorial trials, and two protagonists who pay for every victory. The most mature and literary of the Hunger Games comparisons.", genre: 'fantasy' },
      { title: 'The Ballad of Songbirds and Snakes', author: 'Suzanne Collins', why: "The official Hunger Games prequel — Snow's origin story. Darker and more morally complex than the original trilogy.", genre: 'fiction' },
      { title: 'Legend', author: 'Marie Lu', why: "Two teenagers on opposite sides of a dystopian war discover the truth about their government. The Hunger Games' dual-perspective structure done brilliantly.", genre: 'fiction' },
      { title: 'The Giver', author: 'Lois Lowry', why: "The original YA dystopia — shorter, quieter, and more devastating than Hunger Games. Essential if you haven't read it.", genre: 'fiction' },
      { title: '1984', author: 'George Orwell', why: "The political allegory behind Hunger Games runs straight back to Orwell. If the Capitol's propaganda resonated with you, 1984 is the adult version.", genre: 'fiction' },
    ],
  },
];

export function getBooksLike(slug: string): BooksLikeEntry | undefined {
  return RECOMMENDATIONS.find((r) => r.slug === slug);
}

export const ALL_BOOKS_LIKE_SLUGS = RECOMMENDATIONS.map((r) => r.slug);
