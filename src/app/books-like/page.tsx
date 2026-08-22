import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { RECOMMENDATIONS } from '@/lib/recommendations';
import NewsletterSignup from '@/components/NewsletterSignup';

export const revalidate = 2592000;

export const metadata: Metadata = {
  title: 'Books Like… — Reading Recommendations | BookReleaseRadar',
  description:
    "Find your next favorite series. Curated reading recommendations for fans of ACOTAR, Fourth Wing, Harry Potter, Twilight, Dune, Divergent, Maze Runner, Red Queen, Legend, The Selection, An Ember in the Ashes, Eragon, Vampire Academy, The Handmaid's Tale, Shadow and Bone, Game of Thrones, Colleen Hoover, Mistborn, Wheel of Time, and more.",
  keywords: [
    'books like ACOTAR',
    'books like Fourth Wing',
    'books like Colleen Hoover',
    'books like Game of Thrones',
    'books like Mistborn',
    'books like Wheel of Time',
    'books like Hunger Games',
    'books like Six of Crows',
    'books like Shadowhunters',
    'books like Percy Jackson',
    'books like Outlander',
    'books like Emily Henry',
    'books like Taylor Jenkins Reid',
    'books like Red Rising',
    'books like Bridgerton',
    'books like Blood and Ash',
    'books like Inheritance Games',
    'books like Kingkiller Chronicle',
    'books like Shatter Me',
    'books like The Atlas Six',
    'books like The Poppy War',
    'books like Dark Tower',
    'books like Harry Potter',
    'books like Shadow and Bone',
    'books like Twilight',
    "books like The Handmaid's Tale",
    'paranormal romance like Twilight',
    'books like Dune',
    'books like Divergent',
    'books like Eragon',
    'books like Vampire Academy',
    'books like Maze Runner',
    'books like Red Queen',
    'books like Legend Marie Lu',
    'books like The Selection Kiera Cass',
    'books like An Ember in the Ashes',
    'books like The Giver Lois Lowry',
    'books like Children of Blood and Bone',
    'books like Unwind Neal Shusterman',
    'books like Matched Ally Condie',
    'books like Three Dark Crowns Kendare Blake',
    'books like Warcross Marie Lu',
    'books like The Young Elites Marie Lu',
    'books like Delirium Lauren Oliver',
    'books like The Lies of Locke Lamora',
    'books like The Night Circus Erin Morgenstern',
    'books like City of Brass Daevabad',
    'books like Priory of the Orange Tree',
    'books like Bear and the Nightingale Katherine Arden',
    'books like A Memory Called Empire',
    'books like Daughter of the Moon Goddess',
    'books like Piranesi Susanna Clarke',
    'books like House in the Cerulean Sea',
    'books like Jonathan Strange Mr Norrell',
    'books like Circe Madeline Miller',
    'books like The Goblin Emperor',
    'books like The Raven Boys Raven Cycle',
    'books like Caraval Stephanie Garber',
    'books like Strange the Dreamer Laini Taylor',
    'books like Legends and Lattes',
    'books like Daughter of Smoke and Bone',
    'books like Long Way Small Angry Planet Becky Chambers',
    'books like The Scorpio Races Maggie Stiefvater',
    'books like First Law Joe Abercrombie',
    'books like Carry On Rainbow Rowell',
    'books like Shiver Maggie Stiefvater',
    'books like The Cruel Prince Holly Black Folk of the Air',
    'books like Ariadne Jennifer Saint',
    'books like Stardust Neil Gaiman',
    'books like Monk and Robot Becky Chambers',
    'books like Rage of Dragons Evan Winter',
    'books like His Dark Materials Philip Pullman',
    'books like The Expanse James Corey',
    'books like Project Hail Mary Andy Weir',
    'books like Legendborn Tracy Deonn',
    "books like The Winner's Curse Marie Rutkoski",
    "books like Ender's Game Orson Scott Card",
    'books like A Deadly Education Naomi Novik',
    'books like American Gods Neil Gaiman',
    'books like Foundation Isaac Asimov',
    'books like Hyperion Dan Simmons',
    'books like Uprooted Naomi Novik',
    'books like Recursion Blake Crouch',
    'books like Left Hand of Darkness Ursula Le Guin',
    "books like Old Man's War John Scalzi",
    'books like Kingdom of the Wicked Kerri Maniscalco',
    'books like Spinning Silver Naomi Novik',
    'books like Parable of the Sower Octavia Butler',
    'books like Station Eleven Emily Mandel',
    'books like The Midnight Library Matt Haig',
    'books like Kindred Octavia Butler',
    'books like The Road Cormac McCarthy',
    'books like Beloved Toni Morrison',
    'books like The Underground Railroad Colson Whitehead',
    'books like A Man Called Ove Fredrik Backman',
    'books like Eleanor Oliphant Is Completely Fine',
    'books like Beartown Fredrik Backman',
    'books like Anxious People Fredrik Backman',
    'books like Dark Matter Blake Crouch',
    'books like Where the Crawdads Sing Delia Owens',
    'books like First Fifteen Lives of Harry August Claire North',
    'books like 7 Deaths of Evelyn Hardcastle Stuart Turton',
    'books like Life After Life Kate Atkinson',
    'books like Replay Ken Grimwood',
    'books like Big Little Lies Liane Moriarty',
    "books like Where'd You Go Bernadette Maria Semple",
    'books like A Little Life Hanya Yanagihara',
    'books like The Secret History Donna Tartt',
    'books like Little Fires Everywhere Celeste Ng',
    'books like Nine Perfect Strangers Liane Moriarty',
    'books like The Forever War Joe Haldeman',
    'books like The Goldfinch Donna Tartt',
    'books like Normal People Sally Rooney',
    'books like The Vanishing Half Brit Bennett',
    'books like If We Were Villains ML Rio',
    'books like The Lovely Bones Alice Sebold',
    'books like Homegoing Yaa Gyasi',
    'books like Pachinko Min Jin Lee',
    'books like All the Light We Cannot See Anthony Doerr',
    'books like A Gentleman in Moscow Amor Towles',
    'books like Room Emma Donoghue',
    'books like The Nightingale Kristin Hannah',
    'books like Gone Girl Gillian Flynn',
    'books like The Girl on the Train Paula Hawkins',
    'books like Shuggie Bain Douglas Stuart',
    'books like Shadow of the Wind Carlos Ruiz Zafon',
    'books like The Silent Patient Alex Michaelides',
    'books like Verity Colleen Hoover',
    'books like It Ends with Us Colleen Hoover',
    'books like The Seven Husbands of Evelyn Hugo Taylor Jenkins Reid',
    'books like Hamnet Maggie O Farrell',
    'books like My Year of Rest and Relaxation Ottessa Moshfegh',
    'books like The Book Thief Markus Zusak',
    'books like Behind Closed Doors BA Paris',
    'books like The Woman in the Window AJ Finn',
    'books like An American Marriage Tayari Jones',
    'books like Sing Unburied Sing Jesmyn Ward',
    'books like The Joy Luck Club Amy Tan',
    'books like The House of the Spirits Isabel Allende',
    'books like There There Tommy Orange',
    'books like The Great Alone Kristin Hannah',
    'books like The Sympathizer Viet Thanh Nguyen',
    'books like Conversations with Friends Sally Rooney',
    'books like Daisy Jones and the Six Taylor Jenkins Reid',
    'books like The Alchemist Paulo Coelho',
    'books like The Kite Runner Khaled Hosseini',
    'books like A Thousand Splendid Suns Khaled Hosseini',
    'books like The Remains of the Day Kazuo Ishiguro',
    'books like Never Let Me Go Kazuo Ishiguro',
    "books like The Handmaid's Tale Margaret Atwood",
    'books like 1984 George Orwell',
    'books like Station Eleven Emily St John Mandel',
    'books like The Road Cormac McCarthy',
    'books like Life of Pi Yann Martel',
    'books like Everything I Never Told You Celeste Ng',
    'books like The Midnight Library Matt Haig',
    'books like The Namesake Jhumpa Lahiri',
    'books like Brave New World Aldous Huxley',
    'books like A Long Petal of the Sea Isabel Allende',
    'books like The Color Purple Alice Walker',
    'books like Middlesex Jeffrey Eugenides',
    'books like The Hours Michael Cunningham',
    "books like Giovanni's Room James Baldwin",
    'books like Their Eyes Were Watching God Zora Neale Hurston',
    'books like I Know Why the Caged Bird Sings Maya Angelou',
    'books like The Pillars of the Earth Ken Follett',
    'books like One Hundred Years of Solitude Gabriel Garcia Marquez',
    'books like The Bell Jar Sylvia Plath',
    'books like Fahrenheit 451 Ray Bradbury',
    'books like Ugly Love Colleen Hoover',
    'books like The Bluest Eye Toni Morrison',
    'books like We Yevgeny Zamyatin',
    'books like November 9 Colleen Hoover',
    'books like Reminders of Him Colleen Hoover',
    'books like Song of Solomon Toni Morrison',
    'books like Beloved Toni Morrison',
    'books like The Great Gatsby F. Scott Fitzgerald',
    'books like To Kill a Mockingbird Harper Lee',
    'books like The God of Small Things Arundhati Roy',
    'books like Call Me by Your Name André Aciman',
    'books like Invisible Man Ralph Ellison',
    "books like Midnight's Children Salman Rushdie",
    'books like Native Son Richard Wright',
    'books like Passing Nella Larsen',
    'books like Lord of the Flies William Golding',
    'books like A Fine Balance Rohinton Mistry',
    'books like The Sun Also Rises Ernest Hemingway',
    'books like Revolutionary Road Richard Yates',
    'books like Go Tell It on the Mountain James Baldwin',
    'books like A Gentleman in Moscow Amor Towles',
    'books like The Grapes of Wrath John Steinbeck',
    'books like A Farewell to Arms Ernest Hemingway',
    'books like Wolf Hall Hilary Mantel',
    'books like If Beale Street Could Talk James Baldwin',
    'books like All Quiet on the Western Front Erich Maria Remarque',
    'books like Doctor Zhivago Boris Pasternak',
    'books like The Master and Margarita Mikhail Bulgakov',
    'books like The Corrections Jonathan Franzen',
    'books like Black Boy Richard Wright',
    'books like Catch-22 Joseph Heller',
    'books like Slaughterhouse-Five Kurt Vonnegut',
    'books like White Noise Don DeLillo',
    'books like Another Country James Baldwin',
    'books like The Fire Next Time James Baldwin',
    'books like Anna Karenina Leo Tolstoy',
    'books like The Things They Carried Tim O\'Brien',
    'books like Freedom Jonathan Franzen',
    'books like A Confederacy of Dunces John Kennedy Toole',
    'books like The Trial Franz Kafka',
    'books like Crime and Punishment Fyodor Dostoevsky',
    'books like The Brothers Karamazov Fyodor Dostoevsky',
    'books like Middlemarch George Eliot',
    'books like One Day in the Life of Ivan Denisovich Aleksandr Solzhenitsyn',
    'books like Heart of Darkness Joseph Conrad',
    'cozy fantasy book recommendations',
    'feminist dystopia books',
    'dragon fantasy books',
    'YA dystopia books',
    'reading recommendations',
    'what to read next',
    'book recommendations fantasy romance',
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
    { '@type': 'ListItem', position: 2, name: 'Books Like…', item: 'https://bookreleaseradar.com/books-like' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should I read if I liked ACOTAR?',
      acceptedAnswer: { '@type': 'Answer', text: 'If you loved A Court of Thorns and Roses, try From Blood and Ash by Jennifer L. Armentrout, An Ember in the Ashes by Sabaa Tahir, The Cruel Prince by Holly Black, or Shadow and Bone by Leigh Bardugo. Our full guide covers 8 picks with reasons why ACOTAR fans love each one.' },
    },
    {
      '@type': 'Question',
      name: 'What books are similar to Fourth Wing?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books similar to Fourth Wing include From Blood and Ash, A Court of Thorns and Roses, An Ember in the Ashes, and The Name of the Wind. Visit our Fourth Wing reading recommendations page for 8 detailed picks.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read after finishing a Colleen Hoover book?',
      acceptedAnswer: { '@type': 'Answer', text: 'After reading Colleen Hoover, fans often love Taylor Jenkins Reid, Emily Henry, and Tarryn Fisher. Visit our Books Like Colleen Hoover page for 8 curated picks with descriptions.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read next after Game of Thrones?',
      acceptedAnswer: { '@type': 'Answer', text: 'After Game of Thrones, readers typically love The Name of the Wind by Patrick Rothfuss, The Way of Kings by Brandon Sanderson, The Lies of Locke Lamora by Scott Lynch, and Pillars of the Earth by Ken Follett. See our full Game of Thrones reading recommendations.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Harry Potter?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Harry Potter include The Name of the Wind by Patrick Rothfuss, Percy Jackson by Rick Riordan, The Magicians by Lev Grossman, Jonathan Strange & Mr Norrell by Susanna Clarke, and The Night Circus by Erin Morgenstern. Our full guide covers 8 picks for readers of all ages." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Shadow and Bone?',
      acceptedAnswer: { '@type': 'Answer', text: 'After Shadow and Bone, read Six of Crows (also by Leigh Bardugo in the same world), An Ember in the Ashes by Sabaa Tahir, The Cruel Prince by Holly Black, and The Bear and the Nightingale by Katherine Arden. Our full Grishaverse/Shadow and Bone guide covers 8 picks.' },
    },
    {
      '@type': 'Question',
      name: 'What books are like Twilight?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Twilight include The Vampire Diaries by L.J. Smith, A Court of Thorns and Roses by Sarah J. Maas, Hush, Hush by Becca Fitzpatrick, Shiver by Maggie Stiefvater, and Shadowhunters: City of Bones by Cassandra Clare. Our full Twilight guide has 8 paranormal romance picks.' },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked The Handmaid's Tale?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Handmaid's Tale include The Testaments by Margaret Atwood (the sequel), Vox by Christina Dalcher, The Power by Naomi Alderman, Parable of the Sower by Octavia Butler, and Mexican Gothic by Silvia Moreno-Garcia. Our full guide covers 8 feminist dystopia and literary fiction picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Dune?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Dune include A Memory Called Empire by Arkady Martine, Hyperion by Dan Simmons, Foundation by Isaac Asimov, and The Left Hand of Darkness by Ursula K. Le Guin. Our full Dune guide covers 8 picks for fans of political intrigue, ecology, and epic world-building.' },
    },
    {
      '@type': 'Question',
      name: 'What books are similar to Divergent?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Divergent include The Hunger Games by Suzanne Collins, The Maze Runner by James Dashner, Legend by Marie Lu, Red Queen by Victoria Aveyard, and Scythe by Neal Shusterman. Our full Divergent guide has 8 YA dystopia picks.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Eragon?',
      acceptedAnswer: { '@type': 'Answer', text: 'After Eragon, fans love Fourth Wing by Rebecca Yarros, Temeraire by Naomi Novik, The Name of the Wind by Patrick Rothfuss, and The Stormlight Archive by Brandon Sanderson. Our full Eragon guide covers 8 dragon fantasy picks.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Maze Runner?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Maze Runner include The Hunger Games by Suzanne Collins, Divergent by Veronica Roth, Ender's Game by Orson Scott Card, Legend by Marie Lu, and Unwind by Neal Shusterman. Our full Maze Runner guide covers 8 survival dystopia picks." },
    },
    {
      '@type': 'Question',
      name: 'What books are similar to Red Queen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Red Queen include An Ember in the Ashes by Sabaa Tahir, Shadow and Bone by Leigh Bardugo, The Hunger Games by Suzanne Collins, Three Dark Crowns by Kendare Blake, and Shatter Me by Tahereh Mafi. Our full Red Queen guide has 8 picks for fans of class war and court intrigue.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Legend by Marie Lu?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Legend by Marie Lu include The Hunger Games by Suzanne Collins, Red Queen by Victoria Aveyard, Divergent by Veronica Roth, An Ember in the Ashes by Sabaa Tahir, and Warcross by Marie Lu herself. Our full Legend guide covers 8 picks for fans of dual-POV YA dystopia.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Selection by Kiera Cass?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like The Selection include Red Queen by Victoria Aveyard, The Hunger Games by Suzanne Collins, Matched by Ally Condie, An Ember in the Ashes by Sabaa Tahir, and Shatter Me by Tahereh Mafi. Our full Selection guide has 8 picks for fans of competition romance and dystopian courts.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read after An Ember in the Ashes?',
      acceptedAnswer: { '@type': 'Answer', text: 'After An Ember in the Ashes, readers love Red Queen by Victoria Aveyard, Shadow and Bone by Leigh Bardugo, Six of Crows by Leigh Bardugo, Children of Blood and Bone by Tomi Adeyemi, and The Cruel Prince by Holly Black. Our full Ember in the Ashes guide covers 8 picks.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Daughter of Smoke and Bone?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Daughter of Smoke and Bone include Strange the Dreamer by Laini Taylor (her own second series), Caraval by Stephanie Garber, An Ember in the Ashes, Shadow and Bone, City of Brass, and The Night Circus. Our full Smoke & Bone guide covers 8 lush fantasy picks for fans of impossible romance and richly built worlds." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The Long Way to a Small, Angry Planet?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Long Way to a Small, Angry Planet include A Memory Called Empire by Arkady Martine, Legends & Lattes, The House in the Cerulean Sea, Six of Crows, The Dispossessed, Project Hail Mary, and Piranesi. Our full Wayfarers guide covers 8 picks for fans of cozy ensemble sci-fi with found families." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Scorpio Races?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Scorpio Races include The Raven Boys by Maggie Stiefvater (her own series), The Night Circus, Strange the Dreamer, The Bear and the Nightingale, and An Ember in the Ashes. Our full Scorpio Races guide covers 8 atmospheric picks for fans of Celtic mythology, island settings, and quiet slow-burn romance." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Caraval?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Caraval include The Night Circus by Erin Morgenstern, Strange the Dreamer by Laini Taylor, A Court of Thorns and Roses, The Cruel Prince, Shadow and Bone, and The Raven Boys. Our full Caraval guide covers 8 picks for fans of atmospheric magical games and theatrical YA fantasy." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Strange the Dreamer?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Strange the Dreamer by Laini Taylor include Daughter of Smoke and Bone (also by Taylor), Caraval by Stephanie Garber, The Night Circus, The Raven Boys, Shadow and Bone, and An Ember in the Ashes. Our full Strange the Dreamer guide covers 8 lush atmospheric YA fantasy picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Legends & Lattes?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Legends & Lattes include The House in the Cerulean Sea by TJ Klune, The Goblin Emperor by Katherine Addison, Bookshops & Bonedust (the prequel by the same author), Piranesi, and A Wizard's Guide to Defensive Baking. Our full Legends & Lattes guide covers 8 cozy fantasy picks with found families." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Circe?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Circe by Madeline Miller include The Song of Achilles (also by Miller), Piranesi by Susanna Clarke, Ariadne by Jennifer Saint, The Bear and the Nightingale by Katherine Arden, The Priory of the Orange Tree, and The Starless Sea. Our full Circe guide covers 8 picks for fans of lyrical feminist mythology retelling." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The Goblin Emperor?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Goblin Emperor include The House in the Cerulean Sea by TJ Klune, Legends & Lattes by Travis Baldree, Piranesi by Susanna Clarke, The Name of the Wind, Six of Crows, and Circe. Our full Goblin Emperor guide covers 8 cozy and kind fantasy picks for fans of unexpected rulers and found families." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Raven Boys?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Raven Boys include Strange the Dreamer by Laini Taylor, Shadow and Bone, An Ember in the Ashes, Six of Crows, Caraval by Stephanie Garber, and The Night Circus. Our full Raven Cycle guide covers 8 atmospheric YA fantasy picks for fans of found families and slow-burn romance." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Piranesi?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Piranesi include The Night Circus by Erin Morgenstern, Jonathan Strange & Mr Norrell by Susanna Clarke, The Bear and the Nightingale by Katherine Arden, The House in the Cerulean Sea by TJ Klune, and Circe by Madeline Miller. Our full Piranesi guide covers 8 quiet atmospheric mystery fantasy picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The House in the Cerulean Sea?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The House in the Cerulean Sea include Piranesi by Susanna Clarke, The Goblin Emperor by Katherine Addison, Legends & Lattes by Travis Baldree, The Night Circus by Erin Morgenstern, Carry On by Rainbow Rowell, and Circe by Madeline Miller. Our full Cerulean Sea guide covers 8 cozy fantasy picks with found families." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Jonathan Strange & Mr Norrell?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Jonathan Strange & Mr Norrell include Piranesi by Susanna Clarke, The Night Circus by Erin Morgenstern, The Bear and the Nightingale by Katherine Arden, The Name of the Wind by Patrick Rothfuss, and The City of Brass by S.A. Chakraborty. Our full Jonathan Strange guide covers 8 historical magic fantasy picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The Bear and the Nightingale?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Bear and the Nightingale include The Night Circus by Erin Morgenstern, Jonathan Strange & Mr Norrell by Susanna Clarke, The City of Brass by S.A. Chakraborty, Daughter of the Moon Goddess by Sue Lynn Tan, and Piranesi by Susanna Clarke. Our full Winternight guide covers 8 atmospheric historical mythology picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after A Memory Called Empire?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Memory Called Empire include The Poppy War by R.F. Kuang, The City of Brass by S.A. Chakraborty, Six of Crows by Leigh Bardugo, The Long Way to a Small Angry Planet by Becky Chambers, and The Dispossessed by Ursula K. Le Guin. Our full Teixcalaan guide covers 8 picks for political space opera fans." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Daughter of the Moon Goddess?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Daughter of the Moon Goddess include The City of Brass by S.A. Chakraborty, The Poppy War by R.F. Kuang, The Bear and the Nightingale by Katherine Arden, Children of Blood and Bone by Tomi Adeyemi, and An Ember in the Ashes. Our full Moon Goddess guide covers 8 Asian and world mythology fantasy picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Night Circus?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Night Circus include The Starless Sea by Erin Morgenstern (her own second novel), Jonathan Strange & Mr Norrell by Susanna Clarke, Piranesi by Susanna Clarke, The Name of the Wind by Patrick Rothfuss, and Caraval by Stephanie Garber. Our full Night Circus guide covers 8 atmospheric fantasy picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The City of Brass?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The City of Brass include The Poppy War by R.F. Kuang, Children of Blood and Bone by Tomi Adeyemi, An Ember in the Ashes by Sabaa Tahir, A Memory Called Empire by Arkady Martine, and The Priory of the Orange Tree by Samantha Shannon. Our full Daevabad guide has 8 picks for fans of non-Western mythology fantasy." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Priory of the Orange Tree?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Priory of the Orange Tree include A Memory Called Empire by Arkady Martine, The Bear and the Nightingale by Katherine Arden, The City of Brass by S.A. Chakraborty, The Way of Kings by Brandon Sanderson, and Fourth Wing by Rebecca Yarros. Our full Priory guide covers 8 epic fantasy picks for fans of dragons, queens, and multi-civilization world-building." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Young Elites?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Young Elites include Legend and Warcross (also by Marie Lu), The Cruel Prince by Holly Black, Shadow and Bone by Leigh Bardugo, Red Queen by Victoria Aveyard, and An Ember in the Ashes by Sabaa Tahir. Our full Young Elites guide covers 8 picks for fans of dark fantasy with villain protagonists." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Delirium?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Delirium by Lauren Oliver include Matched by Ally Condie, The Hunger Games, Divergent, The Giver, Shatter Me by Tahereh Mafi, and Wither by Lauren DeStefano. Our full Delirium guide covers 8 picks for fans of dystopian romance with controlled-emotion societies." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The Lies of Locke Lamora?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Lies of Locke Lamora include The Name of the Wind by Patrick Rothfuss, Six of Crows by Leigh Bardugo, The Blade Itself by Joe Abercrombie, Mistborn by Brandon Sanderson, and The Night Circus by Erin Morgenstern. Our full Gentleman Bastard guide covers 8 heist fantasy picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Matched?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Matched by Ally Condie include Delirium by Lauren Oliver, The Selection by Kiera Cass, The Giver by Lois Lowry, Divergent by Veronica Roth, and The Hunger Games by Suzanne Collins. Our full Matched guide covers 8 picks for fans of dystopian romance and controlled societies." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Three Dark Crowns?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Three Dark Crowns include Red Queen by Victoria Aveyard, An Ember in the Ashes by Sabaa Tahir, The Cruel Prince by Holly Black, Shadow and Bone by Leigh Bardugo, and Children of Blood and Bone by Tomi Adeyemi. Our full Three Dark Crowns guide has 8 dark fantasy picks for fans of lethal queens and court intrigue." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Warcross?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Warcross by Marie Lu include Legend (also by Marie Lu), The Hunger Games, Ready Player One, Ender's Game, Red Queen, and The Young Elites. Our full Warcross guide covers 8 picks for fans of high-stakes VR competition and morally complex romance." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Unwind?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Unwind include The Hunger Games by Suzanne Collins, Scythe by Neal Shusterman (also by Shusterman), The Maze Runner by James Dashner, Divergent by Veronica Roth, and The House of the Scorpion by Nancy Farmer. Our full Unwind guide covers 8 picks for fans of dark body-horror dystopia." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Giver?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like The Giver include Scythe by Neal Shusterman, Matched by Ally Condie, Divergent by Veronica Roth, The Hunger Games by Suzanne Collins, Brave New World by Aldous Huxley, and 1984 by George Orwell. Our full Giver guide covers 8 picks for fans of philosophical dystopias.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Children of Blood and Bone?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Children of Blood and Bone include An Ember in the Ashes by Sabaa Tahir, The Poppy War by R.F. Kuang, Shadow and Bone by Leigh Bardugo, The City of Brass by S.A. Chakraborty, and The Rage of Dragons by Evan Winter. Our full guide covers 8 picks for fans of diverse fantasy worlds.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The First Law trilogy by Joe Abercrombie?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The First Law include The Lies of Locke Lamora by Scott Lynch, The Way of Kings by Brandon Sanderson, Mistborn by Brandon Sanderson, Red Rising by Pierce Brown, and The Name of the Wind by Patrick Rothfuss. Our full First Law guide covers 8 picks for fans of grimdark fantasy with morally compromised characters." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Carry On by Rainbow Rowell?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Carry On include Harry Potter, The House in the Cerulean Sea by TJ Klune, Shadow and Bone by Leigh Bardugo, The Raven Boys by Maggie Stiefvater, Six of Crows, and Strange the Dreamer by Laini Taylor. Our full Carry On guide covers 8 picks for fans of magical school fantasy and enemies-to-lovers romance." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Shiver by Maggie Stiefvater?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Shiver include The Raven Boys by Maggie Stiefvater (her own series), Twilight by Stephenie Meyer, Hush Hush by Becca Fitzpatrick, Fallen by Lauren Kate, and Beautiful Creatures by Kami Garcia. Our full Shiver guide covers 8 paranormal YA romance picks for fans of atmospheric forbidden love." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Cruel Prince by Holly Black?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Cruel Prince include A Court of Thorns and Roses by Sarah J. Maas, An Ember in the Ashes by Sabaa Tahir, Shadow and Bone by Leigh Bardugo, Caraval by Stephanie Garber, From Blood and Ash, and Red Queen by Victoria Aveyard. Our full Folk of the Air guide covers 8 picks for fans of enemies-to-lovers fae fantasy." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Ariadne by Jennifer Saint?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Ariadne include Circe by Madeline Miller, The Song of Achilles by Madeline Miller, Elektra by Jennifer Saint (her own follow-up), The Silence of the Girls by Pat Barker, and The Priory of the Orange Tree. Our full Ariadne guide covers 8 picks for fans of feminist mythology retellings." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Stardust by Neil Gaiman?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Stardust include The Night Circus by Erin Morgenstern, American Gods (also by Neil Gaiman), Jonathan Strange & Mr Norrell by Susanna Clarke, Piranesi by Susanna Clarke, and Neverwhere by Neil Gaiman. Our full Stardust guide covers 8 picks for fans of romantic fairy-tale fantasy." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Psalm for the Wild-Built?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Psalm for the Wild-Built include A Long Way to a Small Angry Planet (also by Becky Chambers), The House in the Cerulean Sea by TJ Klune, Legends & Lattes by Travis Baldree, Project Hail Mary by Andy Weir, and The Goblin Emperor by Katherine Addison. Our full Monk and Robot guide covers 8 cozy philosophical sci-fi picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The Rage of Dragons?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Rage of Dragons include Children of Blood and Bone by Tomi Adeyemi, The Blade Itself by Joe Abercrombie, Red Rising by Pierce Brown, An Ember in the Ashes by Sabaa Tahir, and The Way of Kings by Brandon Sanderson. Our full Burning duology guide covers 8 picks for fans of African-inspired epic fantasy with intense training arcs." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after His Dark Materials?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like His Dark Materials include The Chronicles of Narnia by C.S. Lewis (the great conversation partner), Jonathan Strange & Mr Norrell by Susanna Clarke, A Wrinkle in Time by Madeleine L'Engle, Piranesi by Susanna Clarke, and The Name of the Wind by Patrick Rothfuss. Our full HDM guide covers 8 picks for fans of philosophical multi-world fantasy." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The Expanse series?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Expanse include A Long Way to a Small Angry Planet by Becky Chambers, A Memory Called Empire by Arkady Martine, Hyperion by Dan Simmons, Red Rising by Pierce Brown, Dune by Frank Herbert, and Project Hail Mary by Andy Weir. Our full Expanse guide covers 8 hard sci-fi picks for fans of realistic solar-system politics." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Project Hail Mary?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Project Hail Mary include The Martian by Andy Weir, A Long Way to a Small Angry Planet by Becky Chambers, Ender's Game by Orson Scott Card, Recursion by Blake Crouch, Hyperion by Dan Simmons, and A Psalm for the Wild-Built by Becky Chambers. Our full Project Hail Mary guide covers 8 picks for fans of first-contact sci-fi and problem-solving protagonists." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Legendborn by Tracy Deonn?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Legendborn include Carry On by Rainbow Rowell, Harry Potter, Children of Blood and Bone by Tomi Adeyemi, An Ember in the Ashes, A Deadly Education by Naomi Novik, and The Inheritance Games. Our full Legendborn guide covers 8 picks for fans of Arthurian mythology retold through American racial history." },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked The Winner's Curse?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Winner's Curse include The Cruel Prince by Holly Black, An Ember in the Ashes by Sabaa Tahir, Six of Crows by Leigh Bardugo, Strange the Dreamer by Laini Taylor, and Shadow and Bone by Leigh Bardugo. Our full Winner's Trilogy guide covers 8 picks for fans of enemies-to-lovers YA fantasy with real political stakes." },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked Ender's Game?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like Ender's Game include Ender's Shadow by Orson Scott Card (the parallel novel from Bean's POV), Speaker for the Dead, The Hunger Games, The Maze Runner, Red Rising by Pierce Brown, and Project Hail Mary by Andy Weir. Our full Ender's Game guide covers 8 picks for fans of tactical genius protagonists and first-contact science fiction." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Deadly Education by Naomi Novik?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Deadly Education include Carry On by Rainbow Rowell, Uprooted by Naomi Novik, Six of Crows by Leigh Bardugo, Legendborn by Tracy Deonn, The Folk of the Air by Holly Black, and The Atlas Six by Olivie Blake. Our full Scholomance guide covers 8 picks for fans of dark magical school fantasy with a sardonic heroine." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked American Gods by Neil Gaiman?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like American Gods include Stardust (also by Gaiman), Neverwhere (also by Gaiman), Anansi Boys (companion novel), Jonathan Strange & Mr Norrell by Susanna Clarke, The Night Circus by Erin Morgenstern, and The Ocean at the End of the Lane by Neil Gaiman. Our full American Gods guide covers 8 picks for fans of modern mythology and literary dark fantasy." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Foundation by Isaac Asimov?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Foundation include Dune by Frank Herbert, Hyperion by Dan Simmons, A Memory Called Empire by Arkady Martine, The Expanse by James S.A. Corey, Red Rising by Pierce Brown, and Revelation Space by Alastair Reynolds. Our full Foundation guide covers 8 picks for fans of galactic-scale science fiction and civilizational history." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Hyperion by Dan Simmons?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Hyperion include The Fall of Hyperion (the direct second half), Foundation by Isaac Asimov, Dune by Frank Herbert, A Memory Called Empire by Arkady Martine, The Expanse, and The Name of the Wind by Patrick Rothfuss. Our full Hyperion Cantos guide covers 8 picks for fans of literary epic science fiction." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Uprooted by Naomi Novik?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Uprooted include Spinning Silver (also by Novik), A Deadly Education (also by Novik), The Bear and the Nightingale by Katherine Arden, Circe by Madeline Miller, The Night Circus, and Jonathan Strange & Mr Norrell. Our full Uprooted guide covers 8 picks for fans of dark fairy tale fantasy with Eastern European folklore." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Recursion by Blake Crouch?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Recursion include Dark Matter by Blake Crouch, Upgrade by Blake Crouch, Project Hail Mary by Andy Weir, The Midnight Library by Matt Haig, Replay by Ken Grimwood, and The First Fifteen Lives of Harry August by Claire North. Our full Recursion guide covers 8 picks for fans of mind-bending time-loop thrillers." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Left Hand of Darkness?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Left Hand of Darkness include The Dispossessed (also by Le Guin), A Memory Called Empire by Arkady Martine, Parable of the Sower by Octavia Butler, Kindred by Octavia Butler, Station Eleven by Emily St. John Mandel, and The Long Way to a Small Angry Planet. Our full Left Hand guide covers 8 literary SF picks." },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked Old Man's War?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like Old Man's War include Ender's Game by Orson Scott Card, The Forever War by Joe Haldeman, Starship Troopers by Robert Heinlein, Red Rising by Pierce Brown, The Expanse, and Redshirts (also by Scalzi). Our full Old Man's War guide covers 8 military sci-fi picks for fans of interstellar warfare and dark humor." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Kingdom of the Wicked?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Kingdom of the Wicked include The Folk of the Air by Holly Black, A Court of Thorns and Roses, Caraval by Stephanie Garber, Daughter of Smoke and Bone by Laini Taylor, An Ember in the Ashes by Sabaa Tahir, and City of Bones by Cassandra Clare. Our full Kingdom of the Wicked guide covers 8 gothic fantasy picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Spinning Silver by Naomi Novik?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Spinning Silver include Uprooted (also by Novik), A Deadly Education (also by Novik), The Bear and the Nightingale by Katherine Arden, Circe by Madeline Miller, and Jonathan Strange & Mr Norrell. Our full Spinning Silver guide covers 8 picks for fans of dark fairy tale fantasy with Eastern European folklore." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Parable of the Sower?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Parable of the Sower include Kindred (also by Butler), The Handmaid's Tale by Margaret Atwood, Station Eleven by Emily St. John Mandel, The Left Hand of Darkness by Ursula K. Le Guin, and The Road by Cormac McCarthy. Our full Parable guide covers 8 picks for fans of near-future cli-fi with female-led communities." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Station Eleven?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Station Eleven include The Glass Hotel and Sea of Tranquility (also by Mandel), Parable of the Sower by Octavia Butler, A Little Life by Hanya Yanagihara, The Road by Cormac McCarthy, and The Night Circus by Erin Morgenstern. Our full Station Eleven guide covers 8 literary fiction picks for fans of post-pandemic narrative." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Midnight Library?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Midnight Library include The Humans (also by Haig), Recursion by Blake Crouch, A Man Called Ove by Fredrik Backman, Eleanor Oliphant Is Completely Fine by Gail Honeyman, The First Fifteen Lives of Harry August, and The House in the Cerulean Sea. Our full Midnight Library guide covers 8 picks for fans of uplifting literary fiction about alternate lives." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Kindred by Octavia Butler?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Kindred include Parable of the Sower (also by Butler), The Underground Railroad by Colson Whitehead, Beloved by Toni Morrison, The Handmaid's Tale by Margaret Atwood, The Left Hand of Darkness by Ursula Le Guin, and Their Eyes Were Watching God by Zora Neale Hurston. Our full Kindred guide covers 8 picks for fans of speculative literary fiction examining race and history." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Road by Cormac McCarthy?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Road include Station Eleven by Emily St. John Mandel, The Parable of the Sower by Octavia Butler, Never Let Me Go by Kazuo Ishiguro, Blindness by José Saramago, and Blood Meridian and No Country for Old Men (also by McCarthy). Our full Road guide covers 8 picks for fans of post-apocalyptic literary fiction about survival and grief." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Beloved by Toni Morrison?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Beloved include Kindred by Octavia Butler, The Underground Railroad by Colson Whitehead, Song of Solomon and Sula (also by Morrison), Their Eyes Were Watching God by Zora Neale Hurston, The Color Purple by Alice Walker, and Homegoing by Yaa Gyasi. Our full Beloved guide covers 8 essential picks for fans of American literary fiction about race, history, and survival." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Underground Railroad by Colson Whitehead?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Underground Railroad include Kindred by Octavia Butler, Beloved by Toni Morrison, The Nickel Boys (also by Whitehead), Homegoing by Yaa Gyasi, Their Eyes Were Watching God by Zora Neale Hurston, and The Water Dancer by Ta-Nehisi Coates. Our full Underground Railroad guide covers 8 picks for fans of speculative and literary historical fiction about slavery." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Man Called Ove by Fredrik Backman?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Man Called Ove include Anxious People and Beartown (also by Backman), Eleanor Oliphant Is Completely Fine by Gail Honeyman, The Unlikely Pilgrimage of Harold Fry by Rachel Joyce, The Midnight Library by Matt Haig, and The Rosie Project by Graeme Simsion. Our full Ove guide covers 8 picks for fans of heartwarming literary fiction about difficult people and the communities that save them." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Eleanor Oliphant Is Completely Fine?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Eleanor Oliphant Is Completely Fine include A Man Called Ove by Fredrik Backman, The Unlikely Pilgrimage of Harold Fry by Rachel Joyce, The Midnight Library by Matt Haig, Where'd You Go Bernadette by Maria Semple, The Rosie Project by Graeme Simsion, and Anxious People by Fredrik Backman. Our full Eleanor Oliphant guide covers 8 picks for fans of British literary fiction about isolation, trauma, and unexpected connection." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Beartown by Fredrik Backman?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Beartown include Us Against You and The Winners (the Beartown trilogy sequels), A Little Life by Hanya Yanagihara, Olive Kitteridge by Elizabeth Strout, Big Little Lies by Liane Moriarty, and A Man Called Ove (also by Backman). Our full Beartown guide covers 8 picks for fans of serious literary fiction about community, assault, and silence." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Anxious People by Fredrik Backman?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Anxious People include A Man Called Ove (also by Backman), Eleanor Oliphant Is Completely Fine by Gail Honeyman, The Rosie Project by Graeme Simsion, The Midnight Library by Matt Haig, The Unlikely Pilgrimage of Harold Fry by Rachel Joyce, and Where'd You Go, Bernadette by Maria Semple. Our full Anxious People guide covers 8 picks for fans of funny-and-sad literary fiction about loneliness and connection." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Dark Matter by Blake Crouch?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Dark Matter include Recursion and Upgrade (also by Crouch), The First Fifteen Lives of Harry August by Claire North, The Midnight Library by Matt Haig, Project Hail Mary by Andy Weir, Replay by Ken Grimwood, and The 7½ Deaths of Evelyn Hardcastle by Stuart Turton. Our full Dark Matter guide covers 8 picks for fans of mind-bending quantum thrillers." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Where the Crawdads Sing?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Where the Crawdads Sing include The Secret History by Donna Tartt, Big Little Lies by Liane Moriarty, To Kill a Mockingbird by Harper Lee, Educated by Tara Westover, The Lovely Bones by Alice Sebold, and Eleanor Oliphant Is Completely Fine by Gail Honeyman. Our full guide covers 8 picks for fans of atmospheric mystery novels about isolated protagonists and community judgment." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The First Fifteen Lives of Harry August?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The First Fifteen Lives of Harry August include Recursion and Dark Matter by Blake Crouch, Replay by Ken Grimwood, Life After Life by Kate Atkinson, The Midnight Library by Matt Haig, Touch (also by Claire North), and Slaughterhouse-Five by Kurt Vonnegut. Our full Harry August guide covers 8 picks for fans of literary time-loop science fiction." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The 7½ Deaths of Evelyn Hardcastle?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The 7½ Deaths of Evelyn Hardcastle include The First Fifteen Lives of Harry August by Claire North, Replay by Ken Grimwood, Dark Matter by Blake Crouch, And Then There Were None by Agatha Christie, The Devil and the Dark Water (also by Stuart Turton), Life After Life by Kate Atkinson, and Recursion by Blake Crouch. Our full guide covers 8 picks for fans of time-loop country house mysteries." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Life After Life by Kate Atkinson?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Life After Life include A God in Ruins (also by Atkinson), The First Fifteen Lives of Harry August by Claire North, Replay by Ken Grimwood, The Midnight Library by Matt Haig, Station Eleven by Emily St. John Mandel, Dark Matter by Blake Crouch, and The 7½ Deaths of Evelyn Hardcastle by Stuart Turton. Our full guide covers 8 picks for fans of literary rebirth and alternate-lives fiction." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Replay by Ken Grimwood?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Replay include The First Fifteen Lives of Harry August by Claire North, Dark Matter and Recursion by Blake Crouch, Life After Life by Kate Atkinson, The Midnight Library by Matt Haig, and The 7½ Deaths of Evelyn Hardcastle by Stuart Turton. Our full Replay guide covers 8 picks for fans of the foundational time-loop rebirth novel." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Big Little Lies by Liane Moriarty?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Big Little Lies include Nine Perfect Strangers and The Husband's Secret (also by Moriarty), Where the Crawdads Sing by Delia Owens, Little Fires Everywhere by Celeste Ng, The Secret History by Donna Tartt, The Woman in the Window by A.J. Finn, and Beartown by Fredrik Backman. Our full guide covers 8 picks for fans of dark domestic comedy and women's friendship under pressure." },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked Where'd You Go, Bernadette?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like Where'd You Go, Bernadette include Eleanor Oliphant Is Completely Fine by Gail Honeyman, Today Will Be Different (also by Maria Semple), The Rosie Project by Graeme Simsion, A Man Called Ove by Fredrik Backman, Big Little Lies by Liane Moriarty, and The 100-Year-Old Man Who Climbed Out the Window. Our full guide covers 8 picks for fans of dark comedy about brilliant women coming apart and reassembling themselves." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Little Life by Hanya Yanagihara?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Little Life include The Goldfinch by Donna Tartt, Shuggie Bain by Douglas Stuart, My Year of Rest and Relaxation by Ottessa Moshfegh, Pachinko by Min Jin Lee, Normal People by Sally Rooney, and The Virgin Suicides by Jeffrey Eugenides. Our full guide covers 8 picks for fans of emotionally intense literary fiction about friendship, love, and damage." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Secret History by Donna Tartt?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Secret History include If We Were Villains by M.L. Rio, Ninth House by Leigh Bardugo, The Goldfinch (also by Tartt), Never Let Me Go by Kazuo Ishiguro, A Little Life by Hanya Yanagihara, and The Virgin Suicides by Jeffrey Eugenides. Our full guide covers 8 picks for dark academia fans and readers who love reverse-mystery literary fiction." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Little Fires Everywhere by Celeste Ng?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Little Fires Everywhere include Big Little Lies by Liane Moriarty, Everything I Never Told You (also by Celeste Ng), The Vanishing Half by Brit Bennett, Homegoing by Yaa Gyasi, The Dutch House by Ann Patchett, and Where the Crawdads Sing by Delia Owens. Our full guide covers 8 picks for fans of literary fiction about community, race, and class." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Nine Perfect Strangers by Liane Moriarty?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Nine Perfect Strangers include Big Little Lies and The Husband's Secret (also by Moriarty), Anxious People by Fredrik Backman, Eleanor Oliphant Is Completely Fine by Gail Honeyman, Where'd You Go, Bernadette by Maria Semple, and Apples Never Fall (also by Moriarty). Our full guide covers 8 picks for fans of dark comedy ensemble fiction about healing and secrets." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Forever War by Joe Haldeman?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Forever War include Old Man's War by John Scalzi, Starship Troopers by Robert A. Heinlein, Ender's Game by Orson Scott Card, The Things They Carried by Tim O'Brien, All You Need Is Kill by Hiroshi Sakurazaka, and The Expanse series. Our full guide covers 8 picks for fans of anti-war military science fiction that examines what combat does to people." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Goldfinch by Donna Tartt?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Goldfinch include The Secret History (also by Tartt), A Little Life by Hanya Yanagihara, The Amazing Adventures of Kavalier & Clay by Michael Chabon, All the Light We Cannot See by Anthony Doerr, A Gentleman in Moscow by Amor Towles, and Pachinko by Min Jin Lee. Our full guide covers 8 picks for fans of sweeping literary fiction about art, beauty, and loss.", },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Normal People by Sally Rooney?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Normal People include Conversations with Friends and Beautiful World Where Are You (also by Rooney), Attachments by Rainbow Rowell, Eleanor Oliphant Is Completely Fine by Gail Honeyman, My Year of Rest and Relaxation by Ottessa Moshfegh, and Daisy Jones and the Six by Taylor Jenkins Reid. Our full guide covers 8 picks for fans of contemporary literary fiction about complicated love and class." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Vanishing Half by Brit Bennett?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Vanishing Half include Homegoing by Yaa Gyasi, Passing by Nella Larsen, Little Fires Everywhere by Celeste Ng, The Mothers (also by Brit Bennett), Beloved by Toni Morrison, Sing Unburied Sing by Jesmyn Ward, and An American Marriage by Tayari Jones. Our full guide covers 8 picks for fans of literary fiction about race, identity, and the American 20th century." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked If We Were Villains by M.L. Rio?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like If We Were Villains include The Secret History by Donna Tartt, Ninth House by Leigh Bardugo, Babel by R.F. Kuang, The Atlas Six by Olivie Blake, The Secret Place by Tana French, Special Topics in Calamity Physics by Marisha Pessl, and The Magicians by Lev Grossman. Our full guide covers 8 picks for dark academia fans who love Shakespeare, complicit groups, and retrospective mysteries." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Lovely Bones by Alice Sebold?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Lovely Bones include A Little Life by Hanya Yanagihara, The Secret History by Donna Tartt, Where the Crawdads Sing by Delia Owens, Room by Emma Donoghue, The Virgin Suicides by Jeffrey Eugenides, and Lucky (also by Sebold). Our full guide covers 8 picks for fans of grief fiction and novels narrated from unusual positions after a death." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Homegoing by Yaa Gyasi?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Homegoing include Transcendent Kingdom (also by Gyasi), Beloved by Toni Morrison, The Underground Railroad by Colson Whitehead, The Vanishing Half by Brit Bennett, Roots by Alex Haley, Song of Solomon by Toni Morrison, and An American Marriage by Tayari Jones. Our full guide covers 8 picks for fans of multigenerational sagas about the African Atlantic world." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Pachinko by Min Jin Lee?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Pachinko include Homegoing by Yaa Gyasi, The Joy Luck Club by Amy Tan, A Gentleman in Moscow by Amor Towles, The Goldfinch by Donna Tartt, All the Light We Cannot See by Anthony Doerr, Shuggie Bain by Douglas Stuart, and Free Food for Millionaires (also by Min Jin Lee). Our full guide covers 8 picks for fans of multigenerational family sagas about identity and what gets passed down." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked All the Light We Cannot See by Anthony Doerr?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like All the Light We Cannot See include The Nightingale by Kristin Hannah, A Gentleman in Moscow by Amor Towles, Cloud Cuckoo Land (also by Doerr), The Boy in the Striped Pajamas by John Boyne, The Tattooist of Auschwitz by Heather Morris, Beneath a Scarlet Sky by Mark Sullivan, and Pachinko by Min Jin Lee. Our full guide covers 8 picks for fans of WWII literary fiction and Pulitzer Prize historical fiction." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Gentleman in Moscow by Amor Towles?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Gentleman in Moscow include Rules of Civility and The Lincoln Highway (also by Towles), All the Light We Cannot See by Anthony Doerr, The Goldfinch by Donna Tartt, The Shadow of the Wind by Carlos Ruiz Zafón, The House of the Spirits by Isabel Allende, and The Count of Monte Cristo by Alexandre Dumas. Our full guide covers 8 picks for fans of warm, elegant historical fiction about dignity surviving constraint." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Room by Emma Donoghue?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Room include The Lovely Bones by Alice Sebold, A Little Life by Hanya Yanagihara, Shuggie Bain by Douglas Stuart, The Curious Incident of the Dog in the Night-Time by Mark Haddon, My Absolute Darling by Gabriel Tallent, and The Wonder (also by Emma Donoghue). Our full guide covers 8 picks for fans of unusual narrative perspectives on difficult subjects." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Nightingale by Kristin Hannah?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Nightingale include All the Light We Cannot See by Anthony Doerr, The Great Alone and Firefly Lane (also by Kristin Hannah), Beneath a Scarlet Sky by Mark Sullivan, The Alice Network by Kate Quinn, and Orphan Train by Christina Baker Kline. Our full guide covers 8 picks for fans of WWII fiction centering women's courage and sacrifice." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Gone Girl by Gillian Flynn?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Gone Girl include Sharp Objects and Dark Places (also by Gillian Flynn), The Girl on the Train by Paula Hawkins, The Silent Patient by Alex Michaelides, Behind Closed Doors by B.A. Paris, The Woman in the Window by A.J. Finn, and Verity by Colleen Hoover. Our full guide covers 8 picks for fans of unreliable narrator thrillers and dark female protagonists." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Girl on the Train by Paula Hawkins?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Girl on the Train include Gone Girl by Gillian Flynn, Into the Water (also by Paula Hawkins), The Silent Patient by Alex Michaelides, Behind Closed Doors by B.A. Paris, The Woman in the Window by A.J. Finn, and Sharp Objects by Gillian Flynn. Our full guide covers 8 picks for fans of unreliable female narrator thrillers and missing woman mysteries." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Shuggie Bain by Douglas Stuart?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Shuggie Bain include Young Mungo (also by Douglas Stuart), A Little Life by Hanya Yanagihara, The Glass Castle by Jeannette Walls, Beautiful Boy by David Sheff, Trainspotting by Irvine Welsh, and Hamnet by Maggie O'Farrell. Our full guide covers 8 picks for fans of emotionally devastating literary fiction about addiction, poverty, and the bonds between parents and children." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Shadow of the Wind by Carlos Ruiz Zafón?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Shadow of the Wind include The Angel's Game and The Labyrinth of the Spirits (also by Zafón), A Gentleman in Moscow by Amor Towles, The Name of the Rose by Umberto Eco, The Book Thief by Markus Zusak, All the Light We Cannot See by Anthony Doerr, and The House of the Spirits by Isabel Allende. Our full guide covers 8 picks for fans of gothic literary mysteries set in atmospheric European cities." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Silent Patient by Alex Michaelides?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Silent Patient include Gone Girl by Gillian Flynn, The Girl on the Train by Paula Hawkins, Verity by Colleen Hoover, Behind Closed Doors by B.A. Paris, The Woman in the Window by A.J. Finn, The Secret History by Donna Tartt, and Nine Perfect Strangers by Liane Moriarty. Our full guide covers 8 picks for fans of psychological thrillers built around unreliable narrators and major late-novel reveals." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Verity by Colleen Hoover?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Verity include Gone Girl by Gillian Flynn, The Silent Patient by Alex Michaelides, Behind Closed Doors by B.A. Paris, The Woman in the Window by A.J. Finn, It Ends with Us by Colleen Hoover, The Girl on the Train by Paula Hawkins, and The Seven Husbands of Evelyn Hugo by Taylor Jenkins Reid. Our full guide covers 8 picks for fans of dark romance thrillers with ambiguous endings." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked It Ends with Us by Colleen Hoover?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like It Ends with Us include It Starts with Us (the sequel), Verity and Ugly Love (also by Hoover), The Seven Husbands of Evelyn Hugo by Taylor Jenkins Reid, Big Little Lies by Liane Moriarty, Normal People by Sally Rooney, and November 9 by Colleen Hoover. Our full guide covers 8 picks for fans of emotionally devastating romance that doesn't flinch from difficult truths about love and harm." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Seven Husbands of Evelyn Hugo by Taylor Jenkins Reid?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Seven Husbands of Evelyn Hugo include Daisy Jones and the Six and Malibu Rising (also by Taylor Jenkins Reid), Normal People by Sally Rooney, Big Little Lies by Liane Moriarty, Where the Crawdads Sing by Delia Owens, The Nightingale by Kristin Hannah, and Hamnet by Maggie O'Farrell. Our full guide covers 8 picks for fans of sweeping historical fiction with devastating emotional reveals." },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked Hamnet by Maggie O'Farrell?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like Hamnet include A Gentleman in Moscow by Amor Towles, All the Light We Cannot See by Anthony Doerr, The Nightingale by Kristin Hannah, Homegoing by Yaa Gyasi, Pachinko by Min Jin Lee, Room by Emma Donoghue, and Shuggie Bain by Douglas Stuart. Our full guide covers 8 picks for fans of beautifully written historical fiction about women history has made invisible." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked My Year of Rest and Relaxation by Ottessa Moshfegh?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like My Year of Rest and Relaxation include Normal People by Sally Rooney, A Little Life by Hanya Yanagihara, The Bell Jar by Sylvia Plath, Eileen by Ottessa Moshfegh, The Secret History by Donna Tartt, Conversations with Friends by Sally Rooney, and Eleanor Oliphant Is Completely Fine by Gail Honeyman. Our full guide covers 8 picks for fans of dark, literary, first-person fiction about depression and nihilism." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Book Thief by Markus Zusak?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Book Thief include All the Light We Cannot See by Anthony Doerr, The Nightingale by Kristin Hannah, The Shadow of the Wind by Carlos Ruiz Zafón, The Diary of a Young Girl by Anne Frank, The Reader by Bernhard Schlink, Suite Française by Irène Némirovsky, and A Gentleman in Moscow by Amor Towles. Our full guide covers 8 picks for fans of WWII historical fiction with lyrical prose and emotional devastation." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Behind Closed Doors by B.A. Paris?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Behind Closed Doors include Gone Girl by Gillian Flynn, The Silent Patient by Alex Michaelides, The Woman in the Window by A.J. Finn, The Girl on the Train by Paula Hawkins, Verity by Colleen Hoover, Big Little Lies by Liane Moriarty, The Couple Next Door by Shari Lapena, and In a Dark, Dark Wood by Ruth Ware. Our full guide covers 8 picks for fans of claustrophobic domestic psychological thrillers." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Woman in the Window by A.J. Finn?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Woman in the Window include Gone Girl by Gillian Flynn, The Girl on the Train by Paula Hawkins, The Silent Patient by Alex Michaelides, Behind Closed Doors by B.A. Paris, Verity by Colleen Hoover, In a Dark, Dark Wood by Ruth Ware, and Dark Matter by Blake Crouch. Our full guide covers 8 picks for fans of Hitchcock-style psychological thrillers with confined unreliable narrators." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked An American Marriage by Tayari Jones?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like An American Marriage include The Vanishing Half by Brit Bennett, Homegoing by Yaa Gyasi, Just Mercy by Bryan Stevenson, Sing, Unburied, Sing by Jesmyn Ward, Pachinko by Min Jin Lee, Normal People by Sally Rooney, and Little Fires Everywhere by Celeste Ng. Our full guide covers 8 picks for fans of literary fiction about race, justice, and the limits of love." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Sing, Unburied, Sing by Jesmyn Ward?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Sing, Unburied, Sing include An American Marriage by Tayari Jones, The Vanishing Half by Brit Bennett, Beloved by Toni Morrison, Homegoing by Yaa Gyasi, There There by Tommy Orange, Salvage the Bones by Jesmyn Ward, and Pachinko by Min Jin Lee. Our full guide covers 8 picks for fans of lyrical literary fiction about racial trauma, incarceration, and the weight of history in contemporary Black lives." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Joy Luck Club by Amy Tan?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Joy Luck Club include Pachinko by Min Jin Lee, The Namesake by Jhumpa Lahiri, Everything I Never Told You by Celeste Ng, The Woman Warrior by Maxine Hong Kingston, Little Fires Everywhere by Celeste Ng, Homegoing by Yaa Gyasi, and The House of the Spirits by Isabel Allende. Our full guide covers 8 picks for fans of multi-generational fiction about immigration, mother-daughter relationships, and the gap between cultures." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The House of the Spirits by Isabel Allende?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The House of the Spirits include One Hundred Years of Solitude by Gabriel García Márquez, Love in the Time of Cholera by García Márquez, The Shadow of the Wind by Carlos Ruiz Zafón, Homegoing by Yaa Gyasi, Pachinko by Min Jin Lee, Like Water for Chocolate by Laura Esquivel, and The Joy Luck Club by Amy Tan. Our full guide covers 8 picks for fans of Latin American magical realism and multi-generational family sagas." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked There There by Tommy Orange?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like There There include Wandering Stars (the sequel, by Tommy Orange), Sing, Unburied, Sing by Jesmyn Ward, Homegoing by Yaa Gyasi, Pachinko by Min Jin Lee, The Round House by Louise Erdrich, An American Marriage by Tayari Jones, and The Sympathizer by Viet Thanh Nguyen. Our full guide covers 8 picks for fans of literary fiction about indigenous communities, historical trauma, and the violence of colonialism." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Great Alone by Kristin Hannah?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Great Alone include The Nightingale (also by Kristin Hannah), Where the Crawdads Sing by Delia Owens, Into the Wild by Jon Krakauer, Big Little Lies by Liane Moriarty, It Ends with Us by Colleen Hoover, and A Man Called Ove by Fredrik Backman. Our full guide covers 8 picks for fans of survival stories, Alaskan wilderness fiction, and emotionally devastating coming-of-age novels." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Sympathizer by Viet Thanh Nguyen?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Sympathizer include The Committed (the sequel), There There by Tommy Orange, Pachinko by Min Jin Lee, The Kite Runner by Khaled Hosseini, A Gentleman in Moscow by Amor Towles, The Remains of the Day by Kazuo Ishiguro, Catch-22 by Joseph Heller, and Homegoing by Yaa Gyasi. Our full guide covers 8 picks for fans of politically serious, formally ambitious fiction about exile, colonialism, and being caught between worlds." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Conversations with Friends by Sally Rooney?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Conversations with Friends include Normal People and Beautiful World, Where Are You (also by Sally Rooney), My Year of Rest and Relaxation by Ottessa Moshfegh, The Idiot by Elif Batuman, Eileen by Ottessa Moshfegh, The Bell Jar by Sylvia Plath, and Exciting Times by Naoise Dolan. Our full guide covers 8 picks for fans of quiet, detached literary fiction about desire, class, and what people can't bring themselves to say." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Daisy Jones and the Six by Taylor Jenkins Reid?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Daisy Jones and the Six include The Seven Husbands of Evelyn Hugo, Malibu Rising, and Carrie Soto Is Back (all by Taylor Jenkins Reid), Normal People by Sally Rooney, Where the Crawdads Sing by Delia Owens, and The Perks of Being a Wallflower by Stephen Chbosky. Our full guide covers 8 picks for fans of retrospective love stories, oral history format novels, and 1970s historical fiction." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Alchemist by Paulo Coelho?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Alchemist include Siddhartha by Hermann Hesse, The Little Prince by Antoine de Saint-Exupéry, Jonathan Livingston Seagull by Richard Bach, Steppenwolf by Hermann Hesse, Life of Pi by Yann Martel, Zen and the Art of Motorcycle Maintenance by Robert M. Pirsig, and The Celestine Prophecy by James Redfield. Our full guide covers 8 picks for fans of philosophical fables and inspirational spiritual fiction." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Kite Runner by Khaled Hosseini?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Kite Runner include A Thousand Splendid Suns and And the Mountains Echoed (also by Khaled Hosseini), Pachinko by Min Jin Lee, The Sympathizer by Viet Thanh Nguyen, All the Light We Cannot See by Anthony Doerr, The Nightingale by Kristin Hannah, and The House of the Spirits by Isabel Allende. Our full guide covers 8 picks for fans of emotionally devastating fiction about betrayal, guilt, redemption, and historical violence." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Thousand Splendid Suns by Khaled Hosseini?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Thousand Splendid Suns include The Kite Runner and And the Mountains Echoed (also by Khaled Hosseini), The Nightingale by Kristin Hannah, All the Light We Cannot See by Anthony Doerr, Pachinko by Min Jin Lee, Homegoing by Yaa Gyasi, and A Long Petal of the Sea by Isabel Allende. Our full guide covers 8 picks for fans of devastating fiction about women surviving impossible circumstances across decades of historical violence." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Remains of the Day by Kazuo Ishiguro?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Remains of the Day include Never Let Me Go and Klara and the Sun (also by Kazuo Ishiguro), The Sympathizer by Viet Thanh Nguyen, A Gentleman in Moscow by Amor Towles, An Artist of the Floating World by Kazuo Ishiguro, and Pachinko by Min Jin Lee. Our full guide covers 8 picks for fans of elegant, devastating unreliable narrator fiction about loyalty, complicity, and what professional devotion costs." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Never Let Me Go by Kazuo Ishiguro?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Never Let Me Go include The Remains of the Day and Klara and the Sun (also by Ishiguro), The Handmaid's Tale by Margaret Atwood, 1984 by George Orwell, Station Eleven by Emily St. John Mandel, The Road by Cormac McCarthy, and Flowers for Algernon by Daniel Keyes. Our full guide covers 8 picks for fans of quiet, devastating literary science fiction about fate, identity, and what we make of the time we're given." },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked The Handmaid's Tale by Margaret Atwood?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Handmaid's Tale include The Testaments (the sequel), 1984 by George Orwell, Never Let Me Go by Kazuo Ishiguro, The Power by Naomi Alderman, Brave New World by Aldous Huxley, Vox by Christina Dalcher, Station Eleven by Emily St. John Mandel, and Oryx and Crake by Margaret Atwood. Our full guide covers 8 picks for fans of feminist dystopia and totalitarian speculative fiction." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked 1984 by George Orwell?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like 1984 include Brave New World by Aldous Huxley, The Handmaid's Tale by Margaret Atwood, Never Let Me Go by Kazuo Ishiguro, We by Yevgeny Zamyatin, Fahrenheit 451 by Ray Bradbury, Animal Farm by George Orwell, and The Man in the High Castle by Philip K. Dick. Our full guide covers 8 picks for fans of classic dystopian and totalitarian fiction." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Station Eleven by Emily St. John Mandel?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Station Eleven include The Glass Hotel and Sea of Tranquility (also by Emily St. John Mandel), Never Let Me Go by Kazuo Ishiguro, The Road by Cormac McCarthy, The Handmaid's Tale by Margaret Atwood, The Passage by Justin Cronin, The Children of Men by P.D. James, and Everything I Never Told You by Celeste Ng. Our full guide covers 8 picks for fans of literary post-apocalyptic fiction that is as interested in beauty and connection as in catastrophe." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Road by Cormac McCarthy?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Road include Blood Meridian and No Country for Old Men (also by Cormac McCarthy), Station Eleven by Emily St. John Mandel, Never Let Me Go by Kazuo Ishiguro, Beloved by Toni Morrison, On the Beach by Nevil Shute, The Children of Men by P.D. James, and A Little Life by Hanya Yanagihara. Our full guide covers 8 picks for fans of devastating literary fiction about survival, parental love, and what goodness means in a collapsed world." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Life of Pi by Yann Martel?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Life of Pi include The Alchemist by Paulo Coelho, Never Let Me Go by Kazuo Ishiguro, The Old Man and the Sea by Ernest Hemingway, Siddhartha by Hermann Hesse, The Curious Incident of the Dog in the Night-Time by Mark Haddon, Station Eleven by Emily St. John Mandel, and Midnight's Children by Salman Rushdie. Our full guide covers 8 picks for fans of philosophical adventure fiction with spiritual depth and questions about which version of reality to believe." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Everything I Never Told You by Celeste Ng?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Everything I Never Told You include Little Fires Everywhere (also by Celeste Ng), The Joy Luck Club by Amy Tan, The Lovely Bones by Alice Sebold, Normal People by Sally Rooney, A Little Life by Hanya Yanagihara, The Vanishing Half by Brit Bennett, and Pachinko by Min Jin Lee. Our full guide covers 8 picks for fans of literary family drama about silence, projection, and what families cannot bring themselves to say." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Midnight Library by Matt Haig?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Midnight Library include The Humans by Matt Haig, Reasons to Stay Alive by Matt Haig, Eleanor Oliphant Is Completely Fine by Gail Honeyman, A Man Called Ove by Fredrik Backman, The House in the Cerulean Sea by TJ Klune, The Hitchhiker's Guide to the Galaxy by Douglas Adams, and Where the Crawdads Sing by Delia Owens. Our full guide covers 8 picks for fans of hopeful, accessible fiction about depression, second chances, and discovering what makes life worth living." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Namesake by Jhumpa Lahiri?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Namesake include Interpreter of Maladies (also by Jhumpa Lahiri), The Joy Luck Club by Amy Tan, Everything I Never Told You by Celeste Ng, Pachinko by Min Jin Lee, The Kite Runner by Khaled Hosseini, A Gentleman in Moscow by Amor Towles, and The Woman Warrior by Maxine Hong Kingston. Our full guide covers 8 picks for fans of literary immigrant family fiction about identity, belonging, and the gap between generations." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Brave New World by Aldous Huxley?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Brave New World include 1984 by George Orwell, The Handmaid's Tale by Margaret Atwood, We by Yevgeny Zamyatin, Fahrenheit 451 by Ray Bradbury, Never Let Me Go by Kazuo Ishiguro, and Brave New World Revisited by Aldous Huxley. Our full guide covers 8 picks for fans of philosophical dystopian fiction about control through pleasure rather than pain." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Long Petal of the Sea by Isabel Allende?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Long Petal of the Sea include The House of the Spirits (also by Isabel Allende), All the Light We Cannot See by Anthony Doerr, The Nightingale by Kristin Hannah, The Shadow of the Wind by Carlos Ruiz Zafón, The Kite Runner by Khaled Hosseini, Pachinko by Min Jin Lee, and A Gentleman in Moscow by Amor Towles. Our full guide covers 8 picks for fans of sweeping historical fiction about refugees, exile, and building lives across continents and wars." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Color Purple by Alice Walker?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Color Purple include Their Eyes Were Watching God by Zora Neale Hurston, Beloved by Toni Morrison, I Know Why the Caged Bird Sings by Maya Angelou, Homegoing by Yaa Gyasi, An American Marriage by Tayari Jones, The Bluest Eye by Toni Morrison, and Sing, Unburied, Sing by Jesmyn Ward. Our full guide covers 8 picks for fans of lyrical literary fiction about Black women's interior lives, survival, and joy as spiritual resistance." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Middlesex by Jeffrey Eugenides?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Middlesex include The Virgin Suicides and The Marriage Plot (also by Jeffrey Eugenides), Homegoing by Yaa Gyasi, The Joy Luck Club by Amy Tan, The Amazing Adventures of Kavalier and Clay by Michael Chabon, The Namesake by Jhumpa Lahiri, Giovanni's Room by James Baldwin, and The Hours by Michael Cunningham. Our full guide covers 8 picks for fans of multi-generational family sagas with literary ambition and deeply searching character study." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Hours by Michael Cunningham?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Hours include Mrs Dalloway by Virginia Woolf (the novel at its center), To the Lighthouse by Woolf, Middlesex by Jeffrey Eugenides, The God of Small Things by Arundhati Roy, On Earth We're Briefly Gorgeous by Ocean Vuong, Gilead by Marilynne Robinson, Beloved by Toni Morrison, and A Little Life by Hanya Yanagihara. Our full guide covers 8 picks for fans of literary fiction about lives constrained by their historical moment and the question of what makes a life meaningful." },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked Giovanni's Room by James Baldwin?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like Giovanni's Room include Go Tell It on the Mountain and Another Country and If Beale Street Could Talk (also by Baldwin), The Hours by Michael Cunningham, Call Me by Your Name by André Aciman, Maurice by E. M. Forster, The Price of Salt by Patricia Highsmith, and A Little Life by Hanya Yanagihara. Our full guide covers 8 picks for fans of queer literary fiction that examines the cost of choosing convention over love." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Their Eyes Were Watching God by Zora Neale Hurston?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Their Eyes Were Watching God include The Color Purple by Alice Walker, Beloved and Song of Solomon and The Bluest Eye by Toni Morrison, I Know Why the Caged Bird Sings by Maya Angelou, Passing by Nella Larsen, Dust Tracks on a Road by Zora Neale Hurston, and Go Tell It on the Mountain by James Baldwin. Our full guide covers 8 picks for fans of African American literary fiction celebrating Black womanhood and Black vernacular." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked I Know Why the Caged Bird Sings by Maya Angelou?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like I Know Why the Caged Bird Sings include Their Eyes Were Watching God by Zora Neale Hurston, The Color Purple by Alice Walker, Between the World and Me by Ta-Nehisi Coates, The Autobiography of Malcolm X, Educated by Tara Westover, The Woman Warrior by Maxine Hong Kingston, Beloved by Toni Morrison, and Long Way Down by Jason Reynolds. Our full guide covers 8 picks for fans of lyrical Black memoir and coming-of-age stories about finding one's voice." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Pillars of the Earth by Ken Follett?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Pillars of the Earth include World Without End by Ken Follett (the direct sequel set 200 years later), The Name of the Rose by Umberto Eco, Shōgun by James Clavell, Lonesome Dove by Larry McMurtry, The Shadow of the Wind by Carlos Ruiz Zafón, An Instance of the Fingerpost by Iain Pears, and the Outlander series by Diana Gabaldon. Our full guide covers 8 picks for fans of epic historical fiction with vast casts and immersive world-building." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked One Hundred Years of Solitude by Gabriel García Márquez?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like One Hundred Years of Solitude include Love in the Time of Cholera by García Márquez, The House of the Spirits by Isabel Allende, Beloved by Toni Morrison, Midnight's Children by Salman Rushdie, Like Water for Chocolate by Laura Esquivel, The Tin Drum by Günter Grass, Pedro Páramo by Juan Rulfo, and A Long Petal of the Sea by Isabel Allende. Our full guide covers 8 picks for fans of magical realism, multigenerational family sagas, and Latin American literature." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Bell Jar by Sylvia Plath?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Bell Jar include My Year of Rest and Relaxation by Ottessa Moshfegh, Girl, Interrupted by Susanna Kaysen, Conversations with Friends by Sally Rooney, The Hours by Michael Cunningham, Prozac Nation by Elizabeth Wurtzel, The Virgin Suicides by Jeffrey Eugenides, The Yellow Wallpaper by Charlotte Perkins Gilman, and Ariel by Sylvia Plath. Our full guide covers 8 picks for fans of unflinching literary fiction about female interiority and mental illness." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Fahrenheit 451 by Ray Bradbury?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Fahrenheit 451 include 1984 by George Orwell, Brave New World by Aldous Huxley, We by Yevgeny Zamyatin, The Handmaid's Tale by Margaret Atwood, Lord of the Flies by William Golding, The Illustrated Man by Ray Bradbury, Never Let Me Go by Kazuo Ishiguro, and Station Eleven by Emily St. John Mandel. Our full guide covers 8 picks for fans of dystopian fiction about conformity, censorship, and the defense of literature." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Ugly Love by Colleen Hoover?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Ugly Love include It Ends with Us and Verity and November 9 and Reminders of Him (also by Colleen Hoover), The Kiss Quotient by Helen Hoang, People We Meet on Vacation by Emily Henry, The Spanish Love Deception by Elena Armas, and Beautiful Disaster by Jamie McGuire. Our full guide covers 8 picks for fans of emotionally intense contemporary romance with dual timelines and hidden past traumas." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Bluest Eye by Toni Morrison?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Bluest Eye include Beloved and Song of Solomon and Sula (also by Toni Morrison), Their Eyes Were Watching God by Zora Neale Hurston, The Color Purple by Alice Walker, Passing by Nella Larsen, Kindred by Octavia Butler, and I Know Why the Caged Bird Sings by Maya Angelou. Our full guide covers 8 picks for fans of Morrison's examination of Black childhood, internalized racism, and Black women's inner lives." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked We by Yevgeny Zamyatin?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like We include 1984 by George Orwell, Brave New World by Aldous Huxley, Fahrenheit 451 by Ray Bradbury, The Handmaid's Tale by Margaret Atwood, Lord of the Flies by William Golding, The Trial by Franz Kafka, The Road by Cormac McCarthy, and Never Let Me Go by Kazuo Ishiguro. Our full guide covers 8 picks for fans of the ancestor of all dystopian fiction and the tradition of novels about totalitarianism and individual rebellion." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked November 9 by Colleen Hoover?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like November 9 include Ugly Love and It Ends with Us and Reminders of Him (also by Colleen Hoover), The Hating Game by Sally Thorne, People We Meet on Vacation and Beach Read by Emily Henry, One Day by David Nicholls, and The Time Traveler's Wife by Audrey Niffenegger. Our full guide covers 8 picks for fans of dual-timeline love stories with annual reunion structures and slow-build emotional revelations." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Reminders of Him by Colleen Hoover?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Reminders of Him include It Ends with Us and November 9 and Ugly Love (also by Colleen Hoover), The Last Letter from Your Lover and Me Before You by Jojo Moyes, The Idea of You by Robinne Lee, A Little Life by Hanya Yanagihara, and The Five People You Meet in Heaven by Mitch Albom. Our full guide covers 8 picks for fans of emotionally mature contemporary romance centered on grief, second chances, and complicated love." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Song of Solomon by Toni Morrison?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Song of Solomon include Beloved and The Bluest Eye (also by Toni Morrison), Their Eyes Were Watching God by Zora Neale Hurston, Invisible Man by Ralph Ellison, Middle Passage by Charles Johnson, The Known World by Edward P. Jones, Homegoing by Yaa Gyasi, and The Water Dancer by Ta-Nehisi Coates. Our full guide covers 8 picks for fans of Morrison's mythological use of Black folklore and her portrait of Black family life." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Beloved by Toni Morrison?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Beloved include Song of Solomon and The Bluest Eye (also by Toni Morrison), Their Eyes Were Watching God by Zora Neale Hurston, Kindred by Octavia Butler, The Known World by Edward P. Jones, Homegoing by Yaa Gyasi, Roots by Alex Haley, and The Color Purple by Alice Walker. Our full guide covers 8 picks for fans of Morrison's Pulitzer Prize winner and its excavation of what slavery did to Black families." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Great Gatsby by F. Scott Fitzgerald?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Great Gatsby include Tender Is the Night by F. Scott Fitzgerald, The Sun Also Rises by Ernest Hemingway, Revolutionary Road by Richard Yates, American Psycho by Bret Easton Ellis, The Age of Innocence by Edith Wharton, Breakfast at Tiffany's by Truman Capote, The Secret History by Donna Tartt, and Brideshead Revisited by Evelyn Waugh. Our full guide covers 8 picks for fans of Fitzgerald's meditation on the American Dream and the Long Island summer that ends in violence." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked To Kill a Mockingbird by Harper Lee?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like To Kill a Mockingbird include The Help by Kathryn Stockett, Just Mercy by Bryan Stevenson, The Color Purple by Alice Walker, Their Eyes Were Watching God by Zora Neale Hurston, A Gentleman in Moscow by Amor Towles, The Kite Runner by Khaled Hosseini, Beloved by Toni Morrison, and In the Time of the Butterflies by Julia Alvarez. Our full guide covers 8 picks for fans of Harper Lee's portrait of conscience in the face of racial injustice." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The God of Small Things by Arundhati Roy?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The God of Small Things include The Hours by Michael Cunningham, Midnight's Children by Salman Rushdie, A Fine Balance by Rohinton Mistry, The Inheritance of Loss by Kiran Desai, Beloved by Toni Morrison, One Hundred Years of Solitude by Gabriel García Márquez, A Suitable Boy by Vikram Seth, and The White Tiger by Aravind Adiga. Our full guide covers 8 picks for fans of Roy's non-linear structure and its examination of how caste determines which loves are permitted." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Call Me by Your Name by André Aciman?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Call Me by Your Name include Giovanni's Room by James Baldwin, Find Me by André Aciman, Maurice by E. M. Forster, The Swimming-Pool Library by Alan Hollinghurst, Enigma Variations by André Aciman, A Little Life by Hanya Yanagihara, Less by Andrew Sean Greer, and On Earth We're Briefly Gorgeous by Ocean Vuong. Our full guide covers 8 picks for fans of Aciman's obsessive interiority and his evocation of a queer first love in northern Italy." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Invisible Man by Ralph Ellison?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Invisible Man include Native Son by Richard Wright, Go Tell It on the Mountain by James Baldwin, Song of Solomon by Toni Morrison, Their Eyes Were Watching God by Zora Neale Hurston, The Autobiography of Malcolm X, Beloved by Toni Morrison, Giovanni's Room by James Baldwin, and Manchild in the Promised Land by Claude Brown. Our full guide covers 8 picks for fans of Ellison's blistering satire of race relations and his nameless narrator's search for identity." },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked Midnight's Children by Salman Rushdie?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like Midnight's Children include One Hundred Years of Solitude by Gabriel García Márquez, The God of Small Things by Arundhati Roy, The Satanic Verses by Salman Rushdie, A Fine Balance by Rohinton Mistry, The White Tiger by Aravind Adiga, Beloved by Toni Morrison, Shuggie Bain by Douglas Stuart, and The Tin Drum by Günter Grass. Our full guide covers 8 picks for fans of Rushdie's postcolonial magical realism and his narrator born at the moment of Indian independence." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Native Son by Richard Wright?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Native Son include Invisible Man by Ralph Ellison, Go Tell It on the Mountain by James Baldwin, Black Boy by Richard Wright, The Outsider by Richard Wright, Beloved by Toni Morrison, Their Eyes Were Watching God by Zora Neale Hurston, An American Tragedy by Theodore Dreiser, and The Street by Ann Petry. Our full guide covers 8 picks for fans of Wright's foundational protest fiction and his argument about what poverty and racism create." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Passing by Nella Larsen?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Passing include Quicksand by Nella Larsen, Their Eyes Were Watching God by Zora Neale Hurston, The Bluest Eye by Toni Morrison, Giovanni's Room by James Baldwin, The Vanishing Half by Brit Bennett, Imitation of Life by Fannie Hurst, and Beloved by Toni Morrison. Our full guide covers 8 picks for fans of Larsen's oblique treatment of desire and her exploration of racial identity as performance in 1920s Harlem." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Lord of the Flies by William Golding?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Lord of the Flies include 1984 by George Orwell, Brave New World by Aldous Huxley, The Road by Cormac McCarthy, The Inheritors by William Golding, Battle Royale by Koushun Takami, We by Yevgeny Zamyatin, The Hunger Games by Suzanne Collins, and Alive by Piers Paul Read. Our full guide covers 8 picks for fans of Golding's dark view of what happens when civilization's constraints are removed." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Fine Balance by Rohinton Mistry?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Fine Balance include Such a Long Journey by Rohinton Mistry, Midnight's Children by Salman Rushdie, The God of Small Things by Arundhati Roy, Cry the Beloved Country by Alan Paton, The Kite Runner by Khaled Hosseini, A Long Way Gone by Ishmael Beah, Beloved by Toni Morrison, and The Grapes of Wrath by John Steinbeck. Our full guide covers 8 picks for fans of Mistry's compassionate witness to what caste and poverty do to people who have no power." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Sun Also Rises by Ernest Hemingway?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Sun Also Rises include A Farewell to Arms and For Whom the Bell Tolls and The Old Man and the Sea by Ernest Hemingway, The Great Gatsby by F. Scott Fitzgerald, Tender Is the Night by F. Scott Fitzgerald, All Quiet on the Western Front by Erich Maria Remarque, On the Road by Jack Kerouac, and A Moveable Feast by Hemingway. Our full guide covers 8 picks for fans of Hemingway's Lost Generation portrait and his iceberg prose." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Revolutionary Road by Richard Yates?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Revolutionary Road include The Easter Parade by Richard Yates, The Great Gatsby by F. Scott Fitzgerald, The Hours by Michael Cunningham, The Corrections by Jonathan Franzen, Revolutionary Road film by Sam Mendes, and works by John Cheever. Our full guide covers 8 picks for fans of Yates's unsparing portrait of American suburban self-deception in the 1950s." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Go Tell It on the Mountain by James Baldwin?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Go Tell It on the Mountain include Giovanni's Room and If Beale Street Could Talk and Another Country and The Fire Next Time (also by James Baldwin), Their Eyes Were Watching God by Zora Neale Hurston, Invisible Man by Ralph Ellison, Beloved by Toni Morrison, and The Known World by Edward P. Jones. Our full guide covers 8 picks for fans of Baldwin's debut and its Biblical portrait of Black life in Harlem." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Gentleman in Moscow by Amor Towles?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Gentleman in Moscow include Rules of Civility and The Lincoln Highway (also by Amor Towles), The Book Thief by Markus Zusak, All the Light We Cannot See by Anthony Doerr, Doctor Zhivago by Boris Pasternak, The Master and Margarita by Mikhail Bulgakov, Wolf Hall by Hilary Mantel, and The Elegance of the Hedgehog by Muriel Barbery. Our full guide covers 8 picks for fans of Towles's warm, elegant historical fiction about character as the only thing we truly possess." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Grapes of Wrath by John Steinbeck?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Grapes of Wrath include Of Mice and Men and East of Eden and Cannery Row (also by Steinbeck), A Fine Balance by Rohinton Mistry, Native Son by Richard Wright, Beloved by Toni Morrison, The Road by Cormac McCarthy, and The Jungle by Upton Sinclair. Our full guide covers 8 picks for fans of Steinbeck's compassionate portrait of poverty, dispossession, and solidarity during the Great Depression." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Vanishing Half by Brit Bennett?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Vanishing Half include Passing by Nella Larsen, The Mothers (also by Brit Bennett), Homegoing by Yaa Gyasi, Their Eyes Were Watching God by Zora Neale Hurston, Americanah by Chimamanda Ngozi Adichie, The Underground Railroad by Colson Whitehead, An American Marriage by Tayari Jones, and Beloved by Toni Morrison. Our full guide covers 8 picks for fans of Bennett's multigenerational story about race, identity, and the costs of self-invention." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Farewell to Arms by Ernest Hemingway?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Farewell to Arms include The Sun Also Rises and For Whom the Bell Tolls and A Moveable Feast (also by Hemingway), All Quiet on the Western Front by Erich Maria Remarque, The English Patient by Michael Ondaatje, Birdsong by Sebastian Faulks, Tender Is the Night by F. Scott Fitzgerald, and The Things They Carried by Tim O'Brien. Our full guide covers 8 picks for fans of Hemingway's iceberg prose and his understanding of love and war." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Wolf Hall by Hilary Mantel?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Wolf Hall include Bring Up the Bodies and The Mirror & the Light and A Place of Greater Safety (also by Hilary Mantel), Hamnet by Maggie O'Farrell, The Pillars of the Earth by Ken Follett, A Gentleman in Moscow by Amor Towles, The Name of the Rose by Umberto Eco, and Lincoln in the Bardo by George Saunders. Our full guide covers 8 picks for fans of Mantel's Booker Prize-winning Tudor portrait of Thomas Cromwell." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked If Beale Street Could Talk by James Baldwin?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like If Beale Street Could Talk include Go Tell It on the Mountain and Giovanni's Room and Another Country (also by James Baldwin), Their Eyes Were Watching God by Zora Neale Hurston, The Vanishing Half by Brit Bennett, An American Marriage by Tayari Jones, Beloved by Toni Morrison, and Just Mercy by Bryan Stevenson. Our full guide covers 8 picks for fans of Baldwin's love story and his indictment of the American criminal justice system." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked All Quiet on the Western Front by Erich Maria Remarque?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like All Quiet on the Western Front include A Farewell to Arms and The Sun Also Rises by Ernest Hemingway, The Things They Carried by Tim O'Brien, Catch-22 by Joseph Heller, Slaughterhouse-Five by Kurt Vonnegut, Birdsong by Sebastian Faulks, Goodbye to All That by Robert Graves, and Regeneration by Pat Barker. Our full guide covers 8 picks for fans of Remarque's anti-war novel about the German Western Front in World War One." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Doctor Zhivago by Boris Pasternak?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Doctor Zhivago include A Gentleman in Moscow by Amor Towles, The Master and Margarita by Mikhail Bulgakov, Anna Karenina and War and Peace by Leo Tolstoy, Life and Fate by Vasily Grossman, One Day in the Life of Ivan Denisovich by Aleksandr Solzhenitsyn, The Bronze Horseman by Paullina Simons, and City of Thieves by David Benioff. Our full guide covers 8 picks for fans of Pasternak's great Russian love novel across the Revolution and Civil War." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Master and Margarita by Mikhail Bulgakov?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Master and Margarita include Doctor Zhivago by Boris Pasternak, The Heart of a Dog (also by Bulgakov), One Hundred Years of Solitude by Gabriel García Márquez, The Trial by Franz Kafka, Catch-22 by Joseph Heller, Slaughterhouse-Five by Kurt Vonnegut, The Name of the Rose by Umberto Eco, and A Gentleman in Moscow by Amor Towles. Our full guide covers 8 picks for fans of Bulgakov's satirical masterpiece about the devil's visit to Soviet Moscow." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Corrections by Jonathan Franzen?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Corrections include Freedom (also by Jonathan Franzen), Revolutionary Road by Richard Yates, White Noise by Don DeLillo, The Great Gatsby by F. Scott Fitzgerald, A Little Life by Hanya Yanagihara, The Interestings by Meg Wolitzer, The Hours by Michael Cunningham, and Rabbit, Run by John Updike. Our full guide covers 8 picks for fans of Franzen's National Book Award-winning family novel about the Lambert family's American unraveling." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Black Boy by Richard Wright?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Black Boy include Native Son (also by Richard Wright), Invisible Man by Ralph Ellison, I Know Why the Caged Bird Sings by Maya Angelou, The Autobiography of Malcolm X, Between the World and Me by Ta-Nehisi Coates, Just Mercy by Bryan Stevenson, Their Eyes Were Watching God by Zora Neale Hurston, and Beloved by Toni Morrison. Our full guide covers 8 picks for fans of Wright's Jim Crow autobiography and its account of hunger for language and a life." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Catch-22 by Joseph Heller?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Catch-22 include Slaughterhouse-Five by Kurt Vonnegut, All Quiet on the Western Front by Erich Maria Remarque, The Things They Carried by Tim O'Brien, A Confederacy of Dunces by John Kennedy Toole, White Noise by Don DeLillo, The Master and Margarita by Mikhail Bulgakov, A Farewell to Arms by Ernest Hemingway, and Joseph Andrews by Henry Fielding. Our full guide covers 8 picks for fans of Heller's satirical World War Two novel and the Catch-22 paradox." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Slaughterhouse-Five by Kurt Vonnegut?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Slaughterhouse-Five include Catch-22 by Joseph Heller, Cat's Cradle and Mother Night (also by Vonnegut), All Quiet on the Western Front by Erich Maria Remarque, The Things They Carried by Tim O'Brien, Breakfast of Champions by Vonnegut, The Master and Margarita by Mikhail Bulgakov, and One Hundred Years of Solitude by Gabriel García Márquez. Our full guide covers 8 picks for fans of Vonnegut's Dresden novel and its anti-war time-travel structure." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked White Noise by Don DeLillo?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like White Noise include The Corrections by Jonathan Franzen, Libra and Underworld (also by Don DeLillo), Catch-22 by Joseph Heller, Revolutionary Road by Richard Yates, Less by Andrew Sean Greer, The Remains of the Day by Kazuo Ishiguro, and Never Let Me Go by Kazuo Ishiguro. Our full guide covers 8 picks for fans of DeLillo's National Book Award-winning novel about fear, consumer capitalism, and the denial of death." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Another Country by James Baldwin?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Another Country include If Beale Street Could Talk and Go Tell It on the Mountain and Giovanni's Room (also by James Baldwin), A Little Life by Hanya Yanagihara, The Hours by Michael Cunningham, Invisible Man by Ralph Ellison, Call Me by Your Name by André Aciman, and Beloved by Toni Morrison. Our full guide covers 8 picks for fans of Baldwin's most ambitious and panoramic novel about race, sexuality, and New York." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Fire Next Time by James Baldwin?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Fire Next Time include Notes of a Native Son (also by James Baldwin), Between the World and Me by Ta-Nehisi Coates, If Beale Street Could Talk by Baldwin, Go Tell It on the Mountain by Baldwin, Just Mercy by Bryan Stevenson, The Autobiography of Malcolm X, Invisible Man by Ralph Ellison, and Giovanni's Room by Baldwin. Our full guide covers 8 picks for fans of Baldwin's essential essay collection on race in America." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Anna Karenina by Leo Tolstoy?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Anna Karenina include War and Peace (also by Leo Tolstoy), Doctor Zhivago by Boris Pasternak, Middlemarch by George Eliot, Madame Bovary by Gustave Flaubert, The Brothers Karamazov and Crime and Punishment by Fyodor Dostoevsky, A Gentleman in Moscow by Amor Towles, and The Portrait of a Lady by Henry James. Our full guide covers 8 picks for fans of Tolstoy's masterwork about love, marriage, and the cost of living against society's expectations." },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked The Things They Carried by Tim O'Brien?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Things They Carried include Going After Cacciato (also by O'Brien), All Quiet on the Western Front by Erich Maria Remarque, A Farewell to Arms by Ernest Hemingway, Catch-22 by Joseph Heller, Matterhorn by Karl Marlantes, The Sympathizer by Viet Thanh Nguyen, Heart of Darkness by Joseph Conrad, and Redeployment by Phil Klay. Our full guide covers 8 picks for fans of O'Brien's Vietnam linked stories and their meditation on story-truth." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Freedom by Jonathan Franzen?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Freedom include The Corrections (also by Jonathan Franzen), White Noise by Don DeLillo, Revolutionary Road by Richard Yates, The Interestings by Meg Wolitzer, A Little Life by Hanya Yanagihara, Normal People by Sally Rooney, Beautiful Ruins by Jess Walter, and The Marriage Plot by Jeffrey Eugenides. Our full guide covers 8 picks for fans of Franzen's novel about the Berglunds and the question of what freedom actually means." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked A Confederacy of Dunces by John Kennedy Toole?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like A Confederacy of Dunces include Catch-22 by Joseph Heller, Lucky Jim by Kingsley Amis, The Adventures of Augie March by Saul Bellow, The Corrections by Jonathan Franzen, White Noise by Don DeLillo, Portnoy's Complaint by Philip Roth, The Death of Ivan Ilyich by Leo Tolstoy, and The Hitchhiker's Guide to the Galaxy by Douglas Adams. Our full guide covers 8 picks for fans of Toole's Pulitzer Prize-winning comic novel about Ignatius J. Reilly." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Trial by Franz Kafka?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Trial include The Castle and The Metamorphosis (also by Franz Kafka), The Master and Margarita by Mikhail Bulgakov, Catch-22 by Joseph Heller, 1984 by George Orwell, Nausea by Jean-Paul Sartre, One Day in the Life of Ivan Denisovich by Aleksandr Solzhenitsyn, and We by Yevgeny Zamyatin. Our full guide covers 8 picks for fans of Kafka's nightmare legal novel about Josef K. and the incomprehensible system." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Crime and Punishment by Fyodor Dostoevsky?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Crime and Punishment include The Brothers Karamazov and The Idiot (also by Dostoevsky), Notes from Underground (also Dostoevsky), Anna Karenina by Leo Tolstoy, The Trial by Franz Kafka, Lolita by Vladimir Nabokov, and The Stranger by Albert Camus. Our full guide covers 8 picks for fans of Dostoevsky's psychological masterpiece about Raskolnikov's murder and its consequences." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Brothers Karamazov by Fyodor Dostoevsky?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Brothers Karamazov include Crime and Punishment (also by Dostoevsky), Anna Karenina and War and Peace by Leo Tolstoy, The Trial by Franz Kafka, Doctor Zhivago by Boris Pasternak, The Name of the Rose by Umberto Eco, and One Hundred Years of Solitude by Gabriel García Márquez. Our full guide covers 8 picks for fans of Dostoevsky's final novel about the Karamazov family and the murder of their father." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Middlemarch by George Eliot?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Middlemarch include Daniel Deronda and The Mill on the Floss (also by George Eliot), Anna Karenina by Leo Tolstoy, The Portrait of a Lady by Henry James, Persuasion by Jane Austen, North and South and Wives and Daughters by Elizabeth Gaskell, and Bleak House by Charles Dickens. Our full guide covers 8 picks for fans of Victorian novels about intelligent women navigating a world determined to constrain them." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked One Day in the Life of Ivan Denisovich by Aleksandr Solzhenitsyn?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like One Day in the Life of Ivan Denisovich include The Gulag Archipelago (also by Solzhenitsyn), Doctor Zhivago by Boris Pasternak, The Master and Margarita by Mikhail Bulgakov, Night by Elie Wiesel, The Trial by Franz Kafka, and Life and Fate by Vasily Grossman. Our full guide covers 8 picks for fans of Solzhenitsyn's account of a single day in a Stalinist labor camp." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Heart of Darkness by Joseph Conrad?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Heart of Darkness include Lord Jim and Nostromo (also by Joseph Conrad), Things Fall Apart by Chinua Achebe, The Sympathizer by Viet Thanh Nguyen, The Things They Carried by Tim O'Brien, The Secret Agent by Conrad, and Disgrace by J.M. Coetzee. Our full guide covers 8 picks for fans of Conrad's novella about Marlow's journey up the Congo to find Kurtz." },
    },
  ],
};

export default function BooksLikeIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[var(--text-faint)] mb-6">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text-muted)]">Books Like…</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Reading Recommendations</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-3 leading-tight">
            Books Like Your Favorites
          </h1>
          <p className="text-[var(--text-muted)] text-sm max-w-2xl leading-relaxed">
            Finished a series and don't know what to read next? Each guide below gives you 8 hand-picked recommendations with reasons why fans of the original series love them.
          </p>
        </div>

        {/* Recommendation cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECOMMENDATIONS.map((entry) => (
            <Link
              key={entry.slug}
              href={`/books-like/${entry.slug}`}
              className="group block p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-raised)] transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-1">If you liked</p>
                  <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {entry.sourceShortName ?? entry.sourceTitle}
                  </h2>
                  {entry.sourceShortName && (
                    <p className="text-xs text-[var(--text-faint)] mt-0.5 line-clamp-1">{entry.sourceTitle}</p>
                  )}
                </div>
                <BookOpen size={18} className="shrink-0 mt-1 text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 line-clamp-2">{entry.tagline}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-faint)]">{entry.recommendations.length} picks</span>
                <span className="text-xs font-semibold text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse series CTA */}
        <div className="mt-12 p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[var(--text)] mb-1">Looking for a specific series?</p>
            <p className="text-sm text-[var(--text-muted)]">Browse all popular series pages for release dates, reading orders, and upcoming books.</p>
          </div>
          <Link
            href="/series"
            className="shrink-0 px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap"
          >
            Browse All Series →
          </Link>
        </div>
      </div>

      <NewsletterSignup />
    </>
  );
}
