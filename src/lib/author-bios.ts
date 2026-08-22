export interface AuthorBio {
  name: string;
  bio: string;
  genre: string;
  knownFor: string[];
}

const AUTHOR_BIOS: AuthorBio[] = [
  {
    name: 'Sarah J. Maas',
    bio: 'Sarah J. Maas is a #1 New York Times and internationally bestselling author of romantasy and epic fantasy. Her series include A Court of Thorns and Roses (ACOTAR), Throne of Glass (ToG), and Crescent City. Known for complex heroines, intricate world-building, and slow-burn romance, she has sold over 12 million books worldwide.',
    genre: 'fantasy',
    knownFor: ['ACOTAR', 'Throne of Glass', 'Crescent City'],
  },
  {
    name: 'Rebecca Yarros',
    bio: 'Rebecca Yarros is a #1 New York Times bestselling author and decorated US Air Force veteran spouse whose Empyrean series — beginning with Fourth Wing — became a global publishing phenomenon. Her romantasy novels are known for their dragon-riding world-building, enemies-to-lovers dynamics, and emotional depth.',
    genre: 'fantasy',
    knownFor: ['Fourth Wing', 'Iron Flame', 'Onyx Storm'],
  },
  {
    name: 'Brandon Sanderson',
    bio: 'Brandon Sanderson is a #1 New York Times and internationally bestselling fantasy author renowned for his intricate magic systems and the Cosmere — a shared universe spanning multiple series. His works include The Stormlight Archive, Mistborn, Elantris, Warbreaker, and The Way of Kings. He also completed Robert Jordan\'s Wheel of Time series.',
    genre: 'fantasy',
    knownFor: ['Stormlight Archive', 'Mistborn', 'Cosmere'],
  },
  {
    name: 'Colleen Hoover',
    bio: 'Colleen Hoover (CoHo) is a #1 New York Times bestselling author of contemporary romance and new adult fiction. A former social worker, she self-published her debut Slammed in 2012 and became one of the most popular romance authors in the world, powered significantly by BookTok. Her books include It Ends with Us, Ugly Love, Verity, and Reminders of Him.',
    genre: 'romance',
    knownFor: ['It Ends with Us', 'Ugly Love', 'Verity'],
  },
  {
    name: 'George R.R. Martin',
    bio: "George R.R. Martin is a New York Times bestselling author and the creator of A Song of Ice and Fire, the epic fantasy series that inspired HBO's Game of Thrones. Known for his morally complex characters, political intrigue, and subverted fantasy tropes, Martin is one of the most influential fantasy authors of the 21st century. Fans await The Winds of Winter, Book 6.",
    genre: 'fantasy',
    knownFor: ['A Song of Ice and Fire', 'Game of Thrones', 'Winds of Winter'],
  },
  {
    name: 'Gillian Flynn',
    bio: 'Gillian Flynn is a New York Times bestselling author of psychological thrillers known for their dark, razor-sharp prose and unreliable narrators. Her novels include Gone Girl, Dark Places, and Sharp Objects — all of which have been adapted for film and television. Flynn is also a screenwriter and television producer.',
    genre: 'thriller',
    knownFor: ['Gone Girl', 'Sharp Objects', 'Dark Places'],
  },
  {
    name: 'James Patterson',
    bio: "James Patterson is the world's bestselling fiction author and a #1 New York Times bestseller. Known for his fast-paced thrillers and prolific output — often co-authored — his series include Alex Cross, Michael Bennett, Women's Murder Club, and NYPD Red. He is also a major advocate for children's literacy.",
    genre: 'thriller',
    knownFor: ['Alex Cross', "Women's Murder Club", 'Michael Bennett'],
  },
  {
    name: 'Nora Roberts',
    bio: 'Nora Roberts is a #1 New York Times bestselling author of over 200 romance novels as well as futuristic suspense as J.D. Robb. One of the most prolific and successful romance authors in history, her In Death series (as J.D. Robb) has over 50 installments. She is a member of the Romance Writers of America Hall of Fame.',
    genre: 'romance',
    knownFor: ['In Death series', 'Chesapeake Bay', 'Irish trilogy'],
  },
  {
    name: 'Andy Weir',
    bio: 'Andy Weir is a New York Times bestselling science fiction author known for scientifically rigorous, fast-paced stories. His debut The Martian — self-published in 2011 before becoming a major motion picture — launched his career. He followed it with Artemis and Project Hail Mary.',
    genre: 'sci-fi',
    knownFor: ['The Martian', 'Project Hail Mary', 'Artemis'],
  },
  {
    name: 'Taylor Jenkins Reid',
    bio: 'Taylor Jenkins Reid is a New York Times bestselling author of contemporary fiction known for character-driven stories with Hollywood settings and historical depth. Her books include The Seven Husbands of Evelyn Hugo, Daisy Jones & The Six, Malibu Rising, and Carrie Soto Is Back.',
    genre: 'fiction',
    knownFor: ['The Seven Husbands of Evelyn Hugo', 'Daisy Jones & The Six', 'Malibu Rising'],
  },
  {
    name: 'Emily Henry',
    bio: 'Emily Henry is a #1 New York Times bestselling author of contemporary romance known for her witty banter, emotional depth, and slow-burn love stories. Her books include Beach Read, People We Meet on Vacation, Book Lovers, Happy Place, and Funny Story.',
    genre: 'romance',
    knownFor: ['Beach Read', 'People We Meet on Vacation', 'Book Lovers'],
  },
  {
    name: 'Ali Hazelwood',
    bio: 'Ali Hazelwood is a New York Times bestselling author of STEM romance — nerdy, witty love stories featuring scientists and academics. Her debut The Love Hypothesis launched a wave of academic romance. She also writes the Loathe to Love You and Bride series.',
    genre: 'romance',
    knownFor: ['The Love Hypothesis', 'Love on the Brain', 'Bride'],
  },
  {
    name: 'Leigh Bardugo',
    bio: 'Leigh Bardugo is a #1 New York Times bestselling author and creator of the Grishaverse — one of the most beloved fantasy universes in modern fiction. Her Six of Crows duology is widely regarded as among the best heist fantasy ever written, and the Shadow and Bone trilogy inspired a Netflix series. She is also the author of Wonder Woman: Warbringer.',
    genre: 'fantasy',
    knownFor: ['Six of Crows', 'Shadow and Bone', 'King of Scars'],
  },
  {
    name: 'Cassandra Clare',
    bio: 'Cassandra Clare is a #1 New York Times and #1 internationally bestselling author of the Shadowhunter Chronicles — one of the best-selling YA fantasy series of all time. Her interconnected series include The Mortal Instruments, The Infernal Devices, The Dark Artifices, and The Last Hours. She has sold over 50 million books worldwide.',
    genre: 'fantasy',
    knownFor: ['City of Bones', 'Clockwork Angel', 'Lady Midnight'],
  },
  {
    name: 'Rick Riordan',
    bio: "Rick Riordan is the #1 New York Times bestselling author of the Percy Jackson & The Olympians series and its many sequels and companions. A former middle school English and social studies teacher, Riordan created Percy Jackson to help his son with dyslexia. His Riordan-verse spans Greek, Roman, Egyptian, Norse, and various cultural mythologies. A Disney+ adaptation of Percy Jackson debuted in 2023.",
    genre: 'fantasy',
    knownFor: ['Percy Jackson & The Olympians', 'The Heroes of Olympus', 'The Kane Chronicles'],
  },
  {
    name: 'Diana Gabaldon',
    bio: 'Diana Gabaldon is the New York Times bestselling author of the Outlander series — a sweeping saga that blends historical fiction, time travel, romance, and adventure across 18th-century Scotland. With nine novels and multiple novellas, Outlander has sold over 50 million copies worldwide and inspired a long-running Starz television series.',
    genre: 'fiction',
    knownFor: ['Outlander', 'Dragonfly in Amber', 'The Fiery Cross'],
  },
  {
    name: 'Holly Black',
    bio: "Holly Black is a #1 New York Times bestselling author of dark and vivid fantasy novels for teens and adults. Her Folk of the Air trilogy — The Cruel Prince, The Wicked King, and The Queen of Nothing — brought her to mainstream prominence and became a defining series of modern YA fantasy. She is also the co-creator of The Spiderwick Chronicles with Tony DiTerlizzi.",
    genre: 'fantasy',
    knownFor: ['The Cruel Prince', 'The Wicked King', 'The Stolen Heir'],
  },
  {
    name: 'V.E. Schwab',
    bio: "V.E. Schwab (also known as Victoria Schwab) is a #1 New York Times bestselling author known for lush, character-driven speculative fiction. Her Shades of Magic trilogy follows a rare magician who travels between parallel Londons, while The Invisible Life of Addie LaRue became a literary phenomenon. She is also the author of the Villains duology (Vicious, Vengeful).",
    genre: 'fantasy',
    knownFor: ['A Darker Shade of Magic', 'The Invisible Life of Addie LaRue', 'Vicious'],
  },
  {
    name: 'Pierce Brown',
    bio: 'Pierce Brown is a #1 New York Times bestselling author and creator of the Red Rising Saga — a brutal, brilliantly plotted science fiction epic set in a future where humanity colonizes the solar system under a rigid color-coded caste system. Compared to Game of Thrones for its political complexity and willingness to upend expectations, the series has sold millions of copies worldwide.',
    genre: 'sci-fi',
    knownFor: ['Red Rising', 'Golden Son', 'Morning Star'],
  },
  {
    name: 'Jennifer L. Armentrout',
    bio: "Jennifer L. Armentrout is a #1 New York Times and internationally bestselling author of romantic fantasy, paranormal romance, and new adult fiction. She is best known for her Blood and Ash series, which begins with From Blood and Ash and has become one of the most beloved romantasy series of the decade. Armentrout is an extraordinarily prolific author with over 50 published books across multiple pen names and genres.",
    genre: 'fantasy',
    knownFor: ['From Blood and Ash', 'A Kingdom of Flesh and Fire', 'The War of Two Queens'],
  },
  {
    name: 'Jennifer Lynn Barnes',
    bio: "Jennifer Lynn Barnes is a New York Times bestselling author of YA mystery and thriller novels, as well as a professor of psychology. Her breakout series The Inheritance Games — following Avery Grambs, who unexpectedly inherits a billionaire's fortune — became a massive BookTok phenomenon and one of the best-selling YA series in recent years. Barnes brings her psychology expertise to crafting deeply engaging mysteries.",
    genre: 'thriller',
    knownFor: ['The Inheritance Games', 'The Hawthorne Legacy', 'The Final Gambit'],
  },
  {
    name: 'Julia Quinn',
    bio: "Julia Quinn is a New York Times bestselling author and one of the most beloved names in Regency romance. Her Bridgerton series — eight novels following the eight Bridgerton siblings — gained a massive new audience when Shonda Rhimes adapted it for Netflix, making Quinn a household name. Known for her wit, humor, and swoon-worthy heroes, Quinn holds a degree from Yale and attended Harvard Medical School before pursuing writing full time.",
    genre: 'romance',
    knownFor: ['The Duke and I', 'The Viscount Who Loved Me', 'Romancing Mr. Bridgerton'],
  },
  {
    name: 'Patrick Rothfuss',
    bio: "Patrick Rothfuss is an American fantasy author whose Kingkiller Chronicle — beginning with The Name of the Wind — is widely considered one of the finest fantasy series ever written. His prose is celebrated for its literary beauty and the depth of its world-building, particularly the musical and mythological systems of the world of Temerant. Fans have eagerly awaited The Doors of Stone, the concluding volume, for over a decade.",
    genre: 'fantasy',
    knownFor: ['The Name of the Wind', "The Wise Man's Fear", 'Doors of Stone'],
  },
  {
    name: 'Andrzej Sapkowski',
    bio: "Andrzej Sapkowski is a Polish fantasy author and creator of The Witcher saga, one of the most beloved and commercially successful fantasy franchises in the world. His morally complex Witcher stories — collected in The Last Wish and Sword of Destiny before expanding into the five-novel saga — inspired the award-winning CD Projekt Red video games and a Netflix series. Sapkowski is one of Europe's best-selling fantasy authors.",
    genre: 'fantasy',
    knownFor: ['The Last Wish', 'Blood of Elves', 'Lady of the Lake'],
  },
  {
    name: 'Ana Huang',
    bio: "Ana Huang is a New York Times bestselling author of contemporary romance whose Twisted Series became a global BookTok sensation. Beginning with Twisted Love, the series features wealthy, morally grey alpha heroes and the bold women who match them — a combination that resonated with millions of readers worldwide. Huang is one of the defining voices of the modern BookTok romance era.",
    genre: 'romance',
    knownFor: ['Twisted Love', 'Twisted Games', 'Twisted Hate'],
  },
  {
    name: 'Tahereh Mafi',
    bio: "Tahereh Mafi is a New York Times bestselling author best known for the Shatter Me series, a YA dystopian fantasy celebrated for its intensely lyrical, stream-of-consciousness prose style and its emotionally complex love triangle. Born in Iran and raised in Connecticut, Mafi has become one of the most distinctive stylistic voices in young adult fiction. The Shatter Me series has sold over 4 million copies worldwide.",
    genre: 'fantasy',
    knownFor: ['Shatter Me', 'Unravel Me', 'Ignite Me'],
  },
  {
    name: 'Olivie Blake',
    bio: "Olivie Blake is the pen name of Alexene Farol Follmuth, a New York Times bestselling author of dark fantasy and romantasy. Her novel The Atlas Six — originally self-published before being acquired by Tor — became a viral sensation for its morally complex ensemble cast, dense philosophical themes, and dark academia aesthetic. Blake is also the author of Masters of Death and One for My Enemy.",
    genre: 'fantasy',
    knownFor: ['The Atlas Six', 'The Atlas Paradox', 'The Atlas Complex'],
  },
  {
    name: 'Suzanne Collins',
    bio: "Suzanne Collins is the New York Times bestselling author of The Hunger Games trilogy, which has sold over 100 million copies worldwide and spawned a blockbuster film franchise. Before the Hunger Games, she wrote the Underland Chronicles (beginning with Gregor the Overlander). Her prequel The Ballad of Songbirds and Snakes (2020) and the forthcoming Sunrise on the Reaping (March 2026) continue the Panem universe. Collins was a television writer before turning to novels.",
    genre: 'sci-fi',
    knownFor: ['The Hunger Games', 'Catching Fire', 'Mockingjay'],
  },
  {
    name: 'Robert Jordan',
    bio: "Robert Jordan (pen name of James Oliver Rigney Jr.) was an American fantasy author best known for The Wheel of Time, a 14-novel epic that reshaped the genre and sold over 90 million copies worldwide. Jordan wrote prolifically — as many as 14 hours a day — and was working on the final three books when he died of cardiac amyloidosis in 2007. Brandon Sanderson completed the series from Jordan's extensive notes. The Wheel of Time premiered as an Amazon Prime Video series in 2021.",
    genre: 'fantasy',
    knownFor: ['The Eye of the World', 'The Shadow Rising', 'A Memory of Light'],
  },
  {
    name: 'R. F. Kuang',
    bio: "R.F. Kuang (Rebecca F. Kuang) is an American fantasy and literary fiction author whose work spans brutal military fantasy (The Poppy War trilogy), Oxford historical fantasy (Babel, 2022), and literary satire (Yellowface, 2023). A Marshall Scholar and Oxford graduate, Kuang brings deep historical and literary knowledge to genre fiction and is widely credited with opening doors for Asian voices in Anglo-American fantasy. She is one of the most acclaimed young authors working in any genre.",
    genre: 'fantasy',
    knownFor: ['The Poppy War', 'Babel', 'Yellowface'],
  },
  {
    name: 'Stephen King',
    bio: "Stephen King is one of the best-selling authors of all time, with over 350 million copies of his books sold worldwide. Known as the 'King of Horror,' his work spans horror, thriller, science fiction, and fantasy. The Dark Tower series — his magnum opus — weaves together the mythology of dozens of his other novels into a single connected universe. Major works include It, The Shining, The Stand, Carrie, Misery, and Pet Sematary. King continues publishing multiple books per year into his 70s.",
    genre: 'horror',
    knownFor: ['The Dark Tower', 'The Stand', 'It'],
  },
];

function normalize(s: string) {
  return s.toLowerCase().replace(/\.\s+/g, '.').replace(/\s+/g, ' ').trim();
}

export function getAuthorBio(name: string): AuthorBio | undefined {
  const n = normalize(name);
  return AUTHOR_BIOS.find((a) => normalize(a.name) === n);
}
