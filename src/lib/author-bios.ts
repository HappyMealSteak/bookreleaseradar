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
    name: 'Robert Jordan',
    bio: "Robert Jordan (James Oliver Rigney Jr.) was an American fantasy author best known for The Wheel of Time — a 14-book epic fantasy series considered one of the greatest in the genre. Jordan passed away in 2007 before completing the series; fellow fantasist Brandon Sanderson finished it using Jordan's notes.",
    genre: 'fantasy',
    knownFor: ['Wheel of Time'],
  },
  {
    name: 'Suzanne Collins',
    bio: 'Suzanne Collins is the New York Times bestselling author of The Hunger Games trilogy and its prequel, The Ballad of Songbirds and Snakes. Her dystopian YA series became a cultural phenomenon, spawning four major motion pictures. Collins is known for politically charged narratives, morally complex protagonists, and war commentary.',
    genre: 'fiction',
    knownFor: ['The Hunger Games', 'Catching Fire', 'Mockingjay'],
  },
  {
    name: 'Stephen King',
    bio: "Stephen King is the New York Times bestselling author of over 60 novels and is widely regarded as the master of horror fiction. His works span horror, thriller, science fiction, and fantasy — including IT, The Shining, Pet Sematary, The Dark Tower series, and countless short story collections. He writes under his own name and the pen name Richard Bachman.",
    genre: 'thriller',
    knownFor: ['IT', 'The Shining', 'The Dark Tower'],
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
];

export function getAuthorBio(name: string): AuthorBio | undefined {
  const lower = name.toLowerCase();
  return AUTHOR_BIOS.find((a) => a.name.toLowerCase() === lower);
}
