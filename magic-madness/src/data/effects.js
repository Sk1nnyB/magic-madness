import effectsimg from '../assets/images/effects/no-effect-card.jpg';
import anim_pakal from '../assets/images/effects/anim-pakal-thousandth-moon.jpg';
import balance from '../assets/images/effects/balance.jpg';
import bedlam from '../assets/images/effects/bedlam.jpg';
import black_lotus from '../assets/images/effects/black-lotus.jpg';
import brainstorm from '../assets/images/effects/brainstorm.jpg';
import captive_audience from '../assets/images/effects/captive-audience.jpg';
import chaos_warp from '../assets/images/effects/chaos-warp.jpg';
import colossal_dreadmaw from '../assets/images/effects/colossal-dreadmaw.jpg';
import cultivate from '../assets/images/effects/cultivate.jpg';
import food from '../assets/images/effects/food.jpg';
import gamble from '../assets/images/effects/gamble.jpg';
import island from '../assets/images/effects/island.jpg';
import karlach from '../assets/images/effects/karlach-fury-of-avernus.jpg';
import lightning_bolt from '../assets/images/effects/lightning-bolt.jpg';
import mindslaver from '../assets/images/effects/mindslaver.jpg';
import oko_thief_of_crowns from '../assets/images/effects/oko-thief-of-crowns.jpg';
import phyrexian_arena from '../assets/images/effects/phyrexian-arena.jpg';
import regrowth from '../assets/images/effects/regrowth.jpg';
import secret_rendezvous from '../assets/images/effects/secret-rendezvous.jpg';
import silence from '../assets/images/effects/silence.jpg';
import slime_against_humanity from '../assets/images/effects/slime-against-humanity.jpg';
import sol_ring from '../assets/images/effects/sol-ring.jpg';
import swords_to_plowshares from '../assets/images/effects/swords-to-plowshares.jpg';
import tibalt_the_fiend_blooded from '../assets/images/effects/tibalt-the-fiend-blooded.jpg';
import tolarian_winds from '../assets/images/effects/tolarian-winds.jpg';
import Tom_Mutinous_Mate from '../assets/images/effects/Tom-Mutinous-Mate.jpg';
import toy_boat from '../assets/images/effects/toy-boat.jpg';
import treasure from '../assets/images/effects/treasure.jpg';
import Uno_Reverse_Card from '../assets/images/effects/Uno-Reverse-Card.png';
import warp_world from '../assets/images/effects/warp-world.jpg';
import wrath_of_god from '../assets/images/effects/wrath-of-god.jpg';
import yurlok_of_scorch_thrash from '../assets/images/effects/yurlok-of-scorch-thrash.jpg';
import urza_academy_headmaster from '../assets/images/effects/urza-academy-headmaster.jpg';
import the_monarch from '../assets/images/effects/the-monarch.jpg';
import revive from '../assets/images/effects/revive.jpg';
import squee_the_immortal from '../assets/images/effects/squee-the-immortal.jpg';
import furnace_of_rath from '../assets/images/effects/furnace-of-rath.jpg';
import donate from '../assets/images/effects/donate.jpg';
import rewind from '../assets/images/effects/rewind.jpg';
import thirst_for_knowledge from '../assets/images/effects/thirst-for-knowledge.jpg';
import rest_in_peace from '../assets/images/effects/rest-in-peace.jpg';
import roaming_throne from '../assets/images/effects/roaming-throne.jpg';
import meteorite from '../assets/images/effects/meteorite.jpg';
import citys_blessing from '../assets/images/effects/citys-blessing.jpg';
import path_of_discovery from '../assets/images/effects/path-of-discovery.jpg';
import cloak_token from '../assets/images/effects/a-mysterious-creature.jpg';

var effects = [
  // Good Ones (40)
  {image: tolarian_winds, good: true, impactful: true, effect: "Discard your hand, then draw that many cards." },
  {image: colossal_dreadmaw, good: true, impactful: true, effect: "Create a 6/6 green dinosaur creature token with trample named Colossal Dreadmaw." },
  {image: effectsimg, good: true, impactful: true, effect: "You win! (No seriously)" },
  {image: oko_thief_of_crowns, good: true, impactful: true, effect: "Create a token copy of Oko (the good one)." },
  {image: effectsimg, good: true, impactful: true, effect: "Draw a card." },
  {image: karlach, good: true, impactful: true, effect: "Create a token copy of one of the cast of BG3." },
  {image: swords_to_plowshares, good: true, impactful: true, effect: "Create a copy of Swords to Plowshares. You may cast it." },
  {image: brainstorm, good: true, impactful: true, effect: "Create a copy of Brainstorm. You may cast it." },
  {image: phyrexian_arena, good: true, impactful: true, effect: "Create a copy of Phyrexian Arena. You may cast it." },
  {image: lightning_bolt,  good: true, impactful: true, effect: "Create a copy of Lightning Bolt. You may cast it." },
  {image: cultivate, good: true, impactful: true, effect: "Create a copy of Cultivate. You may cast it." },
  {image: sol_ring, good: true, impactful: true, effect: "Create a copy of Sol Ring. You may cast it."},
  {image: effectsimg, good: true, impactful: true, effect: "Create a copy of todays spellify card. You may cast it." },
  {image: bedlam, good: true, impactful: true, effect: "Create a copy of Bedlam. You may cast it." },
  {image: effectsimg, good: true, impactful: true, effect: "Tutor for a card, then each player votes on if that is a fair card to tutor for. If the vote passes or ties, keep it, otherwise shuffle it into your library." },
  {image: black_lotus, good: true, impactful: true, effect: "Add 3 mana of any one colour to your mana pool." },
  {image: secret_rendezvous, good: true, impactful: true, effect: "You and target opponent become lovers (You each draw 3 cards)." },
  {image: regrowth, good: true, impactful: true, effect: "Return target card from your graveyard to your hand" },
  {image: slime_against_humanity, good: true, impactful: true, effect: "Slime Against Humanity where X is the number of times this effect has happened this week."},
  {image: Tom_Mutinous_Mate, good: true, impactful: true, effect: "Swing (You must attack this turn), steal (steal a nonland, noncreature permanent), plunder (sac a creature to draw two cards)." },
  {image: toy_boat, good: true, impactful: true, effect: "Create a Toy Boat token (3/3 with the funny)." },
  {image: Uno_Reverse_Card, good: true, impactful: false, effect: "Put an uno reverse card into your hand: (0 Mana, Instant, Counter target counterspell)" },
  {image: gamble, good: true, impactful: true, effect: "Gamble (the card)." },
  {image: island, good: true, impactful: false, effect: "If the host has given you a drink, create a tapped island." },
  {image: food, good: true, impactful: false, effect: "If the host has given you food, create a food token." },
  {image: effectsimg, good: true, impactful: true, effect: "Live (Gain 3 life), Laugh (Tap target creature) , Love (You cannot attack or be attacked until your next turn)." },
  {image: effectsimg, good: true, impactful: true, effect: "Create a random anime hentai dragon token from Alex's shame stash." },
  {image: effectsimg, good: true, impactful: true, effect: "Target a creature then either: Fuck (Unsleeve it and gain control of it until end of turn), Marry (Copy it), Kill (Destroy it)" },
  {image: effectsimg, good: true, impactful: true, effect: "Crux of fake: Destroy all token creatures or destroy all nontoken creatures." },
  {image: effectsimg, good: true, impactful: true, effect: "Create a copy of the last targeted removal spell used against you. It targets a legal permanent the original caster controls." },
  {image: the_monarch, good: true, impactful: true, effect: "King shit." },
  {image: revive, good: true, impactful: true, effect: "Revive a teammate and gain 5 life. If you are not playing 2P, then one dead player becomes a random planeswalker for you (not under your control)." },
  {image: squee_the_immortal, good: true, impactful: true, effect: "Put a copy of Squee into your hand. It isn't destroyed as it moves between zones." },
  {image: urza_academy_headmaster, good: true, impactful: true, effect: "Go to AskUrza.com and enter Urza's Fun House." },
  {image: furnace_of_rath, good: true, impactful: true, effect: "Damage x2 this turn." },
  {image: thirst_for_knowledge, good: true, impactful: true, effect: "Play a game of categories. If you don't lose, create a copy of Thirst for Knowledge."},
  {image: roaming_throne, good: true, impactful: true, effect: "Target creature you control gets Roaming Throned (It gains ward 2 and if it does a thing it now does it twice for some fucking reason)."},
  {image: meteorite, good: true, impactful: true, effect: "Wish upon a star, then create a meteorite token."},
  {image: effectsimg, good: true, impactful: true, effect: "Unlock the Sex DLC. (You get an enchantment with 'Creatures you control have Saddle 2, create a 1/1 when they attack while saddled')."},
  {image: path_of_discovery, good: true, impactful: true, effect: "Go outside. Creatures you control explore."},

  // Bad Ones (23)
  {image: tibalt_the_fiend_blooded, good: false, impactful: true, effect: "Create a token copy of Tibalt (the shit one)." },
  {image: effectsimg, good: false, impactful: true, effect: "You lose! (lol)." },
  {image: wrath_of_god, good: false, impactful: true, effect: "Destroy all creatures." },
  {image: effectsimg, good: false, impactful: true, effect: "Sacrifice a permanent." },
  {image: effectsimg, good: false, impactful: true, effect: "Goad all creatures." },
  {image: effectsimg, good: false, impactful: true, effect: "Destroy all enchantments or artifacts." },
  {image: effectsimg, good: false, impactful: true, effect: "Discard a card." },
  {image: balance, good: false, impactful: true, effect: "Balance. (the card)" },
  {image: silence, good: false, impactful: true, effect: "You cannot cast spells this turn."},
  {image: effectsimg, good: false, impactful: true, effect: "If you cast more than 3 spells this turn, stop it. (You cannot cast more than 3 spells this turn)" },
  {image: effectsimg, good: false, impactful: true, effect: "Unsleeve your commander." },
  {image: effectsimg, good: false, impactful: true, effect: "Target creature you control becomes goaded. If you control no creatures, get fucked." },
  {image: effectsimg, good: false, impactful: false, effect: "Gain 1 life." },
  {image: effectsimg, good: false, impactful: false, effect: "Nothing happened? Ah well." },
  {image: effectsimg, good: false, impactful: false, effect: "You cannot cast counterspells until your next turn." },
  {image: effectsimg, good: false, impactful: false, effect: "Attach to yourself a curse token named 'Or' with 'Whenever you point at a card, you lose 1 life.'" },
  {image: effectsimg, good: false, impactful: true, effect: "Until your next turn, whenever you tell a shit joke you must either lose 3 life, discard a card or sacrifice a permanent." },
  {image: effectsimg, good: false, impactful: false, effect: "Sacrifice one of your commander only cards." },
  {image: captive_audience, good: false, impactful: true, effect: "Create a copy of Captive Audience. Good luck :)" },
  {image: effectsimg, good: false, impactful: true, effect: "Each player secretly votes for a non-land permanent you control. If there is a tie no permanents are destroyed. Otherwise, destroy the highest voted permanent." },
  {image: effectsimg, good: false, impactful: true, effect: "Turn target non-commander creature you control into an elk." },
  {image: mindslaver, good: false, impactful: true, effect: "Target opponent controls your next turn." },
  {image: rewind, good: false, impactful: true, effect: "Undo the turn, then skip your turn." },

  // Funny Ones (29)
  {image: chaos_warp, good: false, impactful: true, effect: "Chaos warp one of your permanents." },
  {image: warp_world, good: false, impactful: true, effect: "Warp world. (The card)" },
  {image: effectsimg, good: false, impactful: false, effect: "Compliment an opponent." },
  {image: effectsimg, good: false, impactful: false, effect: "Insult an opponent or lose 3 life." },
  {image: effectsimg, good: true, impactful: true, effect: "Target player gets you a drink."},
  {image: anim_pakal, good: true, impactful: true, effect: "Destroy target creature named 'Anim Pakal, Thousandth Moon', otherwise reroll." },
  {image: effectsimg, good: true, impactful: true, effect: "Starting from you, each player may put a card from their hand onto the battlefield. It is not cast." },
  {image: effectsimg, good: true, impactful: false, effect: "Increase or decrease the score of up to one deck of your choice on the dick rankings." },
  {image: effectsimg, good: false, impactful: false, effect: "Shuffle your graveyard into your library, then mill that many cards." },
  {image: effectsimg, good: false, impactful: false, effect: "Exchange graveyards with target opponent." },
  {image: effectsimg, good: true, impactful: true, effect: "Rock-paper-scissors an opponent. If you win, you gain 3 life, create 3 mana of any one colour and put 3 +1/+1 counters on each creature you control." },
  {image: effectsimg, good: false, impactful: false, effect: "Players vote for the most annoying player this game; that player creates a loser role and attaches it to themselves (a player with a loser role is a loser)." },
  {image: effectsimg, good: false, impactful: false, effect: "Until the end of your turn, narrate the game as if you were on Game Knights." },
  {image: treasure, good: true, impactful: true, effect: "Each player votes on if target creature has drip. If that creature does have drip, the owner creates 2 treasure tokens." },
  {image: effectsimg, good: true, impactful: true, effect: "If the current song playing is a bop, draw a card. Otherwise, discard a card." },
  {image: effectsimg, good: true, impactful: false, effect: "Tell everyone how your day is going." },
  {image: effectsimg, good: true, impactful: true, effect: "Choose up to one permanent that costs too much money and exile it. You cannot prevent it no matter how much you rules lawyer." },
  {image: effectsimg, good: true, impactful: false, effect: "Choose Dragons or Khans. If you choose dragons, make a food token named 'nuts'. If you choose Khans, clash with an opponent. If you win create a 2/2 white barbarian token." },
  {image: effectsimg, good: false, impactful: false, effect: "Indicate (the card)." },
  {image: effectsimg, good: true, impactful: true, effect: "Add X white mana, where X is the number of salty opponents." },
  {image: effectsimg, good: false, impactful: false, effect: "Shuffle your library." },
  {image: effectsimg, good: false, impactful: false, effect: "You can do longer do the scry rule for the rest of the game." },
  {image: effectsimg, good: false, impactful: false, effect: "Exchange hands with a random opponent."},
  {image: yurlok_of_scorch_thrash, good: false, impactful: true, effect: "Mana burn is back bby (this entire game)."},
  {image: effectsimg, good: true, impactful: false, effect: "Add a song of your choice to the queue."},
  {image: donate, good: false, impactful: false, effect: "Donate £1 to the charity of your choice."},
  {image: rest_in_peace, good: false, impactful: false, effect: "Hold a 30 second silence for each fallen player. If anyone talks during these 30s, they lose the game." },
  {image: citys_blessing, good: false, impactful: false, effect: "Ascend - You must stand up until your next turn." },
  {image: cloak_token, good: false, impactful: true, effect: "Exile each nontoken creature you control face down, shuffle the cards, and cloak them." }
]

export default effects;

// Total count: 92
