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
