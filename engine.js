// COVID: The Game \u2014 core data + rules engine (pure-ish: functions mutate a passed game object)

export const COLORS = ['alpha', 'beta', 'gamma', 'delta'];
export const STRAINS = {
  alpha:  { name: 'ALPHA',  hex: '#2563EB', soft: '#DBEAFE' },
  beta:   { name: 'BETA',  hex: '#D97706', soft: '#FEF3C7' },
  gamma:  { name: 'GAMMA', hex: '#7C3AED', soft: '#EDE9FE' },
  delta:  { name: 'DELTA', hex: '#DC2626', soft: '#FEE2E2' },
};
export const INFECTION_RATES = [2, 2, 2, 3, 3, 4, 4];
export const MAX_OUTBREAKS = 8;
export const MAX_STATIONS = 6;
export const HAND_LIMIT = 7;
export const CUBE_SUPPLY = 24;
export const START_CITY = 'washington';

// ---- Cities -----------------------------------------------------------
const C = (name, color, lon, lat, dx = 0, dy = 0) => ({ name, color, lon, lat, dx, dy });
export const CITIES = {
  seattle:      C('Seattle', 'alpha', -122.3, 47.6),
  sanfrancisco: C('San Francisco', 'alpha', -122.4, 37.7),
  denver:       C('Denver', 'alpha', -105, 39.7),
  chicago:      C('Chicago', 'alpha', -87.6, 41.9),
  toronto:      C('Toronto', 'alpha', -79.4, 43.7, -1, -1.5),
  newyork:      C('New York', 'alpha', -74, 40.7, 1, 0),
  washington:   C('Washington', 'alpha', -77, 38.9, -1.5, 2.5),
  london:       C('London', 'alpha', -0.1, 51.5, -1, 0),
  paris:        C('Paris', 'alpha', 2.35, 48.9, 0.5, 1.5),
  berlin:       C('Berlin', 'alpha', 13.4, 52.5),
  rome:         C('Rome', 'alpha', 12.5, 41.9),
  moscow:       C('Moscow', 'alpha', 37.6, 55.8),
  mexicocity:   C('Mexico City', 'beta', -99.1, 19.4),
  miami:        C('Miami', 'beta', -80.2, 25.8),
  bogota:       C('Bogot\u00e1', 'beta', -74.1, 4.7),
  lima:         C('Lima', 'beta', -77, -12),
  saopaulo:     C('S\u00e3o Paulo', 'beta', -46.6, -23.5),
  buenosaires:  C('Buenos Aires', 'beta', -58.4, -34.6),
  casablanca:   C('Casablanca', 'beta', -7.6, 33.6),
  lagos:        C('Lagos', 'beta', 3.4, 6.5),
  kinshasa:     C('Kinshasa', 'beta', 15.3, -4.3),
  nairobi:      C('Nairobi', 'beta', 36.8, -1.3),
  johannesburg: C('Johannesburg', 'beta', 28, -26.2),
  khartoum:     C('Khartoum', 'beta', 32.5, 15.6),
  istanbul:     C('Istanbul', 'gamma', 29, 41),
  cairo:        C('Cairo', 'gamma', 31.2, 30),
  riyadh:       C('Riyadh', 'gamma', 46.7, 24.7),
  baghdad:      C('Baghdad', 'gamma', 44.4, 33.3),
  tehran:       C('Tehran', 'gamma', 51.4, 35.7),
  dubai:        C('Dubai', 'gamma', 55.3, 25.3),
  karachi:      C('Karachi', 'gamma', 67, 24.9),
  mumbai:       C('Mumbai', 'gamma', 72.9, 19.1),
  delhi:        C('Delhi', 'gamma', 77.2, 28.6),
  chennai:      C('Chennai', 'gamma', 80.3, 13.1),
  kolkata:      C('Kolkata', 'gamma', 88.4, 22.6),
  dhaka:        C('Dhaka', 'gamma', 90.4, 23.8, 1.5, -1.8),
  beijing:      C('Beijing', 'delta', 116.4, 39.9),
  seoul:        C('Seoul', 'delta', 127, 37.6),
  tokyo:        C('Tokyo', 'delta', 139.7, 35.7),
  osaka:        C('Osaka', 'delta', 135.5, 34.7, -0.5, 2.5),
  shanghai:     C('Shanghai', 'delta', 121.5, 31.2),
  hongkong:     C('Hong Kong', 'delta', 114.2, 22.3),
  taipei:       C('Taipei', 'delta', 121.6, 25, 1.5, 0),
  bangkok:      C('Bangkok', 'delta', 100.5, 13.8),
  hochiminh:    C('Ho Chi Minh City', 'delta', 106.7, 10.8),
  jakarta:      C('Jakarta', 'delta', 106.8, -6.2),
  manila:       C('Manila', 'delta', 121, 14.6),
  sydney:       C('Sydney', 'delta', 151.2, -33.9),
};

export const EDGES = [
  ['seattle','sanfrancisco'],['seattle','denver'],['seattle','tokyo'],
  ['sanfrancisco','denver'],['sanfrancisco','tokyo'],['sanfrancisco','manila'],
  ['denver','chicago'],['denver','mexicocity'],
  ['chicago','toronto'],['chicago','mexicocity'],
  ['toronto','newyork'],
  ['newyork','washington'],['newyork','london'],['newyork','paris'],
  ['washington','miami'],
  ['london','paris'],['london','casablanca'],['london','berlin'],
  ['paris','berlin'],['paris','rome'],
  ['berlin','moscow'],
  ['rome','istanbul'],['rome','cairo'],
  ['moscow','istanbul'],['moscow','tehran'],
  ['mexicocity','miami'],['mexicocity','bogota'],
  ['miami','bogota'],
  ['bogota','lima'],['bogota','saopaulo'],
  ['lima','buenosaires'],
  ['saopaulo','buenosaires'],['saopaulo','lagos'],
  ['casablanca','lagos'],['casablanca','cairo'],
  ['lagos','kinshasa'],
  ['kinshasa','johannesburg'],['kinshasa','khartoum'],
  ['johannesburg','nairobi'],
  ['nairobi','khartoum'],['nairobi','mumbai'],
  ['khartoum','cairo'],
  ['istanbul','cairo'],['istanbul','baghdad'],
  ['cairo','riyadh'],
  ['baghdad','tehran'],['baghdad','riyadh'],
  ['riyadh','dubai'],
  ['tehran','karachi'],['tehran','delhi'],
  ['dubai','karachi'],['dubai','mumbai'],
  ['karachi','delhi'],
  ['mumbai','chennai'],
  ['delhi','kolkata'],
  ['chennai','jakarta'],['chennai','bangkok'],
  ['kolkata','dhaka'],
  ['dhaka','bangkok'],
  ['bangkok','hochiminh'],['bangkok','hongkong'],
  ['hochiminh','jakarta'],['hochiminh','manila'],
  ['jakarta','sydney'],
  ['manila','sydney'],['manila','hongkong'],['manila','taipei'],
  ['hongkong','taipei'],['hongkong','shanghai'],
  ['taipei','osaka'],
  ['shanghai','beijing'],['shanghai','seoul'],
  ['beijing','seoul'],
  ['seoul','tokyo'],
  ['tokyo','osaka'],
];

// overland edges that actually cross open water \u2014 traversed by boat
export const SEA_EDGES = new Set([
  'seattle|tokyo','sanfrancisco|tokyo','sanfrancisco|manila',
  'newyork|london','newyork|paris','london|casablanca',
  'saopaulo|lagos','nairobi|mumbai','chennai|jakarta',
  'hochiminh|manila','jakarta|sydney','manila|sydney','manila|taipei',
]);
export function isSeaRoute(a, b) {
  return SEA_EDGES.has(a + '|' + b) || SEA_EDGES.has(b + '|' + a);
}

export const ADJ = {};
for (const id of Object.keys(CITIES)) ADJ[id] = [];
for (const [a, b] of EDGES) { ADJ[a].push(b); ADJ[b].push(a); }

// map projection \u2192 percentages
export function pos(id) {
  const c = CITIES[id];
  return { x: (c.lon + 180) / 360 * 100 + c.dx, y: (68 - c.lat) / 113 * 100 + c.dy };
}

// ---- Roles ------------------------------------------------------------
export const ROLES = {
  nurse: { name: 'Frontline Nurse', hex: '#0E9F8A',
    blurb: 'Treats remove ALL cubes of a strain. Cured strains evaporate wherever she stands. Still waiting on that hazard pay.' },
  vaccinologist: { name: 'Vaccinologist', hex: '#5B5BD6',
    blurb: 'Needs only 4 matching samples to develop a vaccine. Gets yelled at online anyway.' },
  analyst: { name: 'Data Analyst', hex: '#B54708',
    blurb: 'May hand ANY city card to a colleague in the same city. Has a dashboard for everything.' },
  logistics: { name: 'Logistics Chief', hex: '#9A3AB1',
    blurb: 'Spends actions moving other pawns, or teleports any pawn to another pawn. Believes everything is a supply-chain problem. Is right.' },
  engineer: { name: 'Site Engineer', hex: '#4A6B8A',
    blurb: 'Builds labs without discarding. Once per turn, may fly from a lab to anywhere by discarding any city card.' },
  quarantine: { name: 'Quarantine Officer', hex: '#B42318',
    blurb: 'No new cubes land in her city or its neighbors. Extremely unpopular at parties.' },
};
export const ROLE_IDS = Object.keys(ROLES);

// ---- Events -----------------------------------------------------------
export const EVENTS = {
  lockdown: { name: 'Lockdown Weekend', desc: 'Skip the next infection step entirely. Everyone bakes bread.' },
  funding:  { name: 'Emergency Funding', desc: 'Build a lab in any city, free of charge. The invoice arrives later.' },
  jet:      { name: 'Charter Jet', desc: 'Fly any pawn to any city. Middle seat, obviously.' },
  model:    { name: 'Predictive Model', desc: 'Inspect the top 6 infection cards and rearrange them. The model is always right, retroactively.' },
  bubble:   { name: 'Contact Bubble', desc: 'Remove one city from the infection discard pile from the game. That neighborhood simply stopped answering.' },
  masking:  { name: 'Successful Masking Protocol', desc: 'Clear ALL infection cubes from one city, then shield it from new infection for 3 turns. Turns out the masks worked.' },
};

// ---- Deck helpers -----------------------------------------------------
export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let cardSeq = 0;
const cityCard = (city) => ({ uid: 'c' + (cardSeq++), type: 'city', city, color: CITIES[city].color });
const eventCard = (ev) => ({ uid: 'c' + (cardSeq++), type: 'event', event: ev });
const epidemicCard = () => ({ uid: 'c' + (cardSeq++), type: 'epidemic' });

// ---- Game creation ----------------------------------------------------
export function newGame(playerDefs, epidemics) {
  const g = {
    phase: 'actions', // actions | draw | discard | infect | won | lost
    players: playerDefs.map((p, i) => ({ i, name: p.name, role: p.role, city: START_CITY, hand: [] })),
    current: 0,
    actionsLeft: 4,
    turn: 1,
    cubes: {}, supply: {}, cured: {}, eradicated: {},
    stations: [START_CITY],
    playerDeck: [], playerDiscard: [],
    infectionDeck: [], infectionDiscard: [], removedInfection: [],
    ratePos: 0, outbreaks: 0,
    epidemics, epidemicsDrawn: 0,
    lockdownArmed: false,
    masked: {}, noTreat: {},
    news: null, newsSeq: 0,
    engineerFlightUsed: false,
    nextTurnDelta: {}, // playerIdx -> +/- actions applied at the start of their next turn (special rules)
    log: [], effects: [], effectSeq: 0,
    lossReason: null,
    stats: { cubesTreated: 0, vaccines: [] }, // for the after-action summary
    pending: null, // {type:'draw'|'infect'|..., ...}
  };
  for (const id of Object.keys(CITIES)) { g.cubes[id] = { alpha: 0, beta: 0, gamma: 0, delta: 0 }; }
  for (const col of COLORS) { g.supply[col] = CUBE_SUPPLY; g.cured[col] = false; g.eradicated[col] = false; }

  // infection deck + initial infections
  g.infectionDeck = shuffle(Object.keys(CITIES).map(cityCard));
  log(g, 'sys', 'Situation Room established in Washington. Nobody read the pandemic playbook, but it exists.');
  for (const n of [3, 2, 1]) {
    for (let k = 0; k < 3; k++) {
      const card = g.infectionDeck.pop();
      g.infectionDiscard.push(card);
      g.supply[card.color] -= n;
      g.cubes[card.city][card.color] = n;
      log(g, 'infect', `${CITIES[card.city].name} reports ${n} case cluster${n > 1 ? 's' : ''} (${STRAINS[card.color].name}).`);
    }
  }

  // player deck
  let deck = shuffle([...Object.keys(CITIES).map(cityCard), ...Object.keys(EVENTS).map(eventCard)]);
  const handSize = [0, 0, 4, 3, 2][playerDefs.length];
  for (const p of g.players) for (let k = 0; k < handSize; k++) p.hand.push(deck.pop());
  // split into piles, add 1 epidemic each
  const piles = [];
  const per = Math.floor(deck.length / epidemics);
  let rem = deck.length % epidemics;
  let off = 0;
  for (let e = 0; e < epidemics; e++) {
    const size = per + (rem-- > 0 ? 1 : 0);
    piles.push(shuffle([...deck.slice(off, off + size), epidemicCard()]));
    off += size;
  }
  g.playerDeck = piles.flat(); // draw from end = top; piles[last] on top? draw from end of array
  log(g, 'sys', `Response team deployed: ${playerDefs.map(p => `${p.name} (${ROLES[p.role].name})`).join(', ')}. Difficulty: ${epidemics} epidemic surges.`);
  log(g, 'sys', `${g.players[0].name} acts first. 4 actions. No pressure.`);
  return g;
}

export function log(g, kind, text) {
  g.log.unshift({ id: g.log.length + '' + Date.now() % 100000, turn: g.turn, kind, text });
  if (g.log.length > 250) g.log.pop();
}

function effect(g, type, city, color) {
  g.effects.push({ id: 'fx' + (g.effectSeq++), type, city, color });
  if (g.effects.length > 12) g.effects.shift();
}

// ---- Cube placement & outbreaks --------------------------------------
function quarantined(g, city) {
  return g.players.some(p => p.role === 'quarantine' && (p.city === city || ADJ[p.city].includes(city)));
}
function medicShield(g, city, color) {
  return g.cured[color] && g.players.some(p => p.role === 'nurse' && p.city === city);
}

export function addCubes(g, city, color, n, chain) {
  if (g.phase === 'lost' || g.phase === 'won') return;
  if (g.eradicated[color]) { log(g, 'sys', `${STRAINS[color].name} is eradicated \u2014 ${CITIES[city].name} shrugs it off.`); return; }
  if (g.masked[city]) { log(g, 'good', `Masking Protocol shields ${CITIES[city].name} from new ${STRAINS[color].name} cases.`); return; }
  if (quarantined(g, city)) { log(g, 'good', `Quarantine Officer blocks the ${STRAINS[color].name} spread into ${CITIES[city].name}.`); return; }
  if (medicShield(g, city, color)) { log(g, 'good', `Frontline Nurse in ${CITIES[city].name} neutralizes the incoming ${STRAINS[color].name} cases.`); return; }
  for (let k = 0; k < n; k++) {
    if (g.cubes[city][color] >= 3) { outbreak(g, city, color, chain); return; }
    if (g.supply[color] <= 0) { lose(g, `The ${STRAINS[color].name} strain overwhelmed global capacity. There were no more cubes, which is a metaphor.`); return; }
    g.supply[color]--;
    g.cubes[city][color]++;
  }
  effect(g, 'infect', city, color);
  g.news = { id: g.newsSeq++, city, color, text: newsHeadline(city) };
}

function outbreak(g, city, color, chain) {
  if (chain.has(city)) return;
  chain.add(city);
  g.outbreaks++;
  effect(g, 'outbreak', city, color);
  log(g, 'bad', `OUTBREAK in ${CITIES[city].name}! ${STRAINS[color].name} spills into ${ADJ[city].map(a => CITIES[a].name).join(', ')}. (${g.outbreaks}/${MAX_OUTBREAKS})`);
  if (g.outbreaks >= MAX_OUTBREAKS) { lose(g, 'Eight outbreaks. Public trust has left the chat.'); return; }
  for (const nb of ADJ[city]) {
    addCubes(g, nb, color, 1, chain);
    if (g.phase === 'lost') return;
  }
}

function lose(g, reason) {
  if (g.phase === 'lost') return;
  g.phase = 'lost';
  g.lossReason = reason;
  g.pending = null;
  log(g, 'bad', 'GAME OVER \u2014 ' + reason);
}

function checkEradication(g, color) {
  if (g.cured[color] && !g.eradicated[color] && g.supply[color] === CUBE_SUPPLY) {
    g.eradicated[color] = true;
    log(g, 'good', `${STRAINS[color].name} ERADICATED. Someone update the Wikipedia page.`);
  }
}

function medicSweep(g, player) {
  // nurse auto-clears cured strains in her city
  if (player.role !== 'nurse') return;
  for (const col of COLORS) {
    if (g.cured[col] && g.cubes[player.city][col] > 0) {
      g.supply[col] += g.cubes[player.city][col];
      log(g, 'good', `Frontline Nurse clears all ${STRAINS[col].name} cases in ${CITIES[player.city].name} just by showing up.`);
      g.cubes[player.city][col] = 0;
      checkEradication(g, col);
    }
  }
}

// ---- Actions ----------------------------------------------------------
function spend(g) {
  g.actionsLeft--;
  if (g.actionsLeft <= 0 && g.phase === 'actions') startDraw(g);
}

export function movePawn(g, pawn, dest, how, discardUid) {
  const p = g.players[pawn];
  const actor = g.players[g.current];
  if (discardUid) {
    const idx = actor.hand.findIndex(c => c.uid === discardUid);
    g.playerDiscard.push(actor.hand.splice(idx, 1)[0]);
  }
  p.city = dest;
  log(g, 'move', `${p.name} ${how} to ${CITIES[dest].name}.`);
  medicSweep(g, p);
  spend(g);
}

// which moves can `pawn` legally make to `dest`, paid by current player's hand
export function moveOptions(g, pawnIdx, dest) {
  const p = g.players[pawnIdx];
  const actor = g.players[g.current];
  const opts = [];
  if (p.city === dest) return opts;
  if (ADJ[p.city].includes(dest)) opts.push({ how: 'drive', label: 'Ground transit' });
  const destCard = actor.hand.find(c => c.type === 'city' && c.city === dest);
  if (destCard) opts.push({ how: 'direct', label: 'Direct flight', discard: destCard.uid, card: dest });
  const hereCard = actor.hand.find(c => c.type === 'city' && c.city === p.city);
  if (hereCard) opts.push({ how: 'charter', label: 'Charter flight', discard: hereCard.uid, card: p.city });
  if (g.stations.includes(p.city) && g.stations.includes(dest)) opts.push({ how: 'shuttle', label: 'Lab Airlift' });
  if (actor.role === 'engineer' && pawnIdx === g.current && !g.engineerFlightUsed && g.stations.includes(p.city)) {
    const anyCity = actor.hand.find(c => c.type === 'city');
    if (anyCity && !opts.some(o => o.how === 'direct')) opts.push({ how: 'engineerFly', label: 'Engineer dispatch (discard any city card)' });
  }
  // logistics: move pawn to any city containing another pawn
  if (actor.role === 'logistics' && g.players.some((q, i) => i !== pawnIdx && q.city === dest)) {
    opts.push({ how: 'rendezvous', label: 'Rendezvous (to a colleague)' });
  }
  return opts;
}

export function doMove(g, pawnIdx, dest, opt, chosenUid) {
  const labels = { drive: 'travels overland', direct: 'flies direct', charter: 'charters a flight', shuttle: 'airlifts between labs', engineerFly: 'is dispatched', rendezvous: 'is redeployed' };
  let discard = opt.discard || null;
  if (opt.how === 'engineerFly') { discard = chosenUid; g.engineerFlightUsed = true; }
  movePawn(g, pawnIdx, dest, labels[opt.how], discard);
}

// one hop of a multi-city overland route (animated by the UI); logs once at the end
export function doRouteHop(g, pawnIdx, dest, isLast, routeLen) {
  const p = g.players[pawnIdx];
  p.city = dest;
  medicSweep(g, p);
  if (isLast) log(g, 'move', `${p.name} travels overland to ${CITIES[dest].name} (${routeLen} action${routeLen > 1 ? 's' : ''}).`);
  spend(g);
}

export function canTreat(g) {
  const p = g.players[g.current];
  if (g.noTreat[p.city]) return [];
  return COLORS.filter(c => g.cubes[p.city][c] > 0);
}
export function doTreat(g, color) {
  const p = g.players[g.current];
  const city = p.city;
  if (g.noTreat[city]) return;
  let n = 1;
  if (g.cured[color] || p.role === 'nurse') n = g.cubes[city][color];
  g.cubes[city][color] -= n;
  g.supply[color] += n;
  if (g.stats) g.stats.cubesTreated += n;
  effect(g, 'treat', city, color);
  log(g, 'good', `${p.name} treats ${STRAINS[color].name} in ${CITIES[city].name} (\u2212${n} cube${n > 1 ? 's' : ''}).`);
  checkEradication(g, color);
  spend(g);
}

export function canBuild(g) {
  const p = g.players[g.current];
  if (g.stations.includes(p.city)) return { ok: false, why: 'Lab already here' };
  if (g.stations.length >= MAX_STATIONS) return { ok: false, why: 'All 6 labs built' };
  if (p.role === 'engineer') return { ok: true, free: true };
  const card = p.hand.find(c => c.type === 'city' && c.city === p.city);
  if (!card) return { ok: false, why: `Need the ${CITIES[p.city].name} card` };
  return { ok: true, discard: card.uid };
}
export function doBuild(g) {
  const p = g.players[g.current];
  const chk = canBuild(g);
  if (!chk.ok) return;
  if (chk.discard) {
    const idx = p.hand.findIndex(c => c.uid === chk.discard);
    g.playerDiscard.push(p.hand.splice(idx, 1)[0]);
  }
  g.stations.push(p.city);
  effect(g, 'build', p.city, null);
  log(g, 'good', `${p.name} opens a research lab in ${CITIES[p.city].name}${chk.free ? ' (no paperwork \u2014 Site Engineer)' : ''}.`);
  spend(g);
}

export function cureNeed(g) { return g.players[g.current].role === 'vaccinologist' ? 4 : 5; }
export function canCure(g) {
  const p = g.players[g.current];
  if (!g.stations.includes(p.city)) return { ok: false, why: 'Must be at a lab' };
  const need = cureNeed(g);
  for (const col of COLORS) {
    if (g.cured[col]) continue;
    if (p.hand.filter(c => c.type === 'city' && c.color === col).length >= need) return { ok: true, color: col, need };
  }
  return { ok: false, why: `Need ${need} matching city cards at a lab` };
}
export function doCure(g, color, uids) {
  const p = g.players[g.current];
  for (const uid of uids) {
    const idx = p.hand.findIndex(c => c.uid === uid);
    g.playerDiscard.push(p.hand.splice(idx, 1)[0]);
  }
  g.cured[color] = true;
  if (g.stats) g.stats.vaccines.push({ color, turn: g.turn, by: p.name });
  log(g, 'good', `VACCINE DEVELOPED for ${STRAINS[color].name} by ${p.name}. Rollout memo pending.`);
  // nurse passive sweep everywhere she stands
  for (const q of g.players) medicSweep(g, q);
  checkEradication(g, color);
  if (COLORS.every(c => g.cured[c])) {
    g.phase = 'won';
    g.pending = null;
    log(g, 'good', 'ALL FOUR STRAINS CURED. Humanity wins. Please still wash your hands.');
    return;
  }
  spend(g);
}

// share knowledge: returns possible transfers
export function shareOptions(g) {
  const actor = g.players[g.current];
  const here = g.players.filter(p => p.city === actor.city && p.i !== actor.i);
  const opts = [];
  for (const other of here) {
    for (const [giver, taker] of [[actor, other], [other, actor]]) {
      const cards = giver.role === 'analyst' && giver.i === actor.i
        ? giver.hand.filter(c => c.type === 'city')
        : giver.hand.filter(c => c.type === 'city' && c.city === actor.city);
      for (const card of cards) {
        opts.push({ giver: giver.i, taker: taker.i, uid: card.uid, city: card.city, color: card.color,
          label: `${giver.name} \u2192 ${taker.name}: ${CITIES[card.city].name}` });
      }
    }
  }
  return opts;
}
export function doShare(g, opt) {
  const giver = g.players[opt.giver];
  const taker = g.players[opt.taker];
  const idx = giver.hand.findIndex(c => c.uid === opt.uid);
  if (idx === -1) return; // card is no longer in the giver's hand: abort without spending an action
  taker.hand.push(giver.hand.splice(idx, 1)[0]);
  log(g, 'move', `${giver.name} hands the ${CITIES[opt.city].name} file to ${taker.name}.`);
  spend(g);
  if (taker.hand.length > HAND_LIMIT) forceDiscard(g, taker.i);
}

// ---- Special rules: Kiss & Hug (only active while unlocked) ----------
export function cityCompanions(g) {
  const actor = g.players[g.current];
  return g.players.filter(p => p.i !== actor.i && p.city === actor.city);
}
export function doKiss(g, targetIdx) {
  const a = g.players[g.current];
  const b = g.players[targetIdx];
  if (!g.nextTurnDelta) g.nextTurnDelta = {};
  g.nextTurnDelta[targetIdx] = (g.nextTurnDelta[targetIdx] || 0) + 1;
  log(g, 'good', `${a.name} plants a kiss on ${b.name} in ${CITIES[a.city].name}. ${b.name} gets +1 action next turn.`);
  spend(g);
}
export function doHug(g, targetIdx) {
  const a = g.players[g.current];
  const b = g.players[targetIdx];
  if (!g.nextTurnDelta) g.nextTurnDelta = {};
  g.actionsLeft += 1;
  g.nextTurnDelta[targetIdx] = (g.nextTurnDelta[targetIdx] || 0) - 1;
  log(g, 'good', `${b.name} hugs ${a.name} and gifts an action \u2014 ${a.name} now has ${g.actionsLeft}, ${b.name} will start next turn with one fewer.`);
  // no action spent; the hug is a transfer, not an action
}

export function doPass(g) {
  log(g, 'sys', `${g.players[g.current].name} passes. Strategic patience, allegedly.`);
  startDraw(g);
}

// ---- Draw phase -------------------------------------------------------
export function startDraw(g) {
  g.phase = 'draw';
  const cards = [];
  for (let k = 0; k < 2; k++) {
    if (g.playerDeck.length === 0) { lose(g, 'The player deck ran dry. The response team ran out of time, funding, and excuses.'); return; }
    cards.push(g.playerDeck.pop());
  }
  g.pending = { type: 'draw', cards, idx: 0, resolved: [] };
}

// resolve the current drawn card; returns nothing. UI calls once per "continue"
export function resolveDrawnCard(g) {
  const pd = g.pending;
  const card = pd.cards[pd.idx];
  const p = g.players[g.current];
  if (card.type === 'epidemic') {
    g.epidemicsDrawn++;
    g.ratePos = Math.min(g.ratePos + 1, INFECTION_RATES.length - 1);
    const bottom = g.infectionDeck.shift(); // bottom of deck
    log(g, 'bad', `EPIDEMIC SURGE #${g.epidemicsDrawn}. Infection rate rises to ${INFECTION_RATES[g.ratePos]}. Ground zero: ${CITIES[bottom.city].name}.`);
    addCubes(g, bottom.city, bottom.color, 3, new Set());
    g.infectionDiscard.push(bottom);
    if (g.phase === 'lost') return;
    pd.epidemicPending = true; // UI offers Contact Bubble window, then calls intensify
  } else {
    p.hand.push(card);
    if (card.type === 'event') log(g, 'draw', `${p.name} draws event: ${EVENTS[card.event].name}.`);
    else log(g, 'draw', `${p.name} draws ${CITIES[card.city].name} (${STRAINS[card.color].name}).`);
    advanceDraw(g);
  }
}

export function intensify(g) {
  g.infectionDeck = [...g.infectionDeck, ...shuffle(g.infectionDiscard)]; // shuffled discard on TOP (top = end)
  g.infectionDiscard = [];
  log(g, 'bad', 'Infection reports reshuffled onto the pile. History is about to repeat itself.');
  g.pending.epidemicPending = false;
  advanceDraw(g);
}

function advanceDraw(g) {
  const pd = g.pending;
  pd.resolved.push(pd.cards[pd.idx]);
  pd.idx++;
  if (pd.idx >= pd.cards.length) pd.finished = true;
}

export function finishDraw(g) {
  const p = g.players[g.current];
  if (p.hand.length > HAND_LIMIT) { g.turnEnding = true; forceDiscard(g, p.i); return; }
  startInfect(g);
}

function forceDiscard(g, playerIdx) {
  g.phase = 'discard';
  g.pending = { type: 'discard', player: playerIdx };
}
export function doDiscard(g, playerIdx, uid) {
  const p = g.players[playerIdx];
  const idx = p.hand.findIndex(c => c.uid === uid);
  const card = p.hand.splice(idx, 1)[0];
  g.playerDiscard.push(card);
  log(g, 'sys', `${p.name} discards ${card.type === 'event' ? EVENTS[card.event].name : CITIES[card.city].name}. Triage hurts.`);
  resolveDiscardContinuation(g);
}

// A forced discard can also be cleared by PLAYING an event card. Once the holder
// is back within the hand limit \u2014 however they got there \u2014 resume the turn flow.
export function resolveDiscardContinuation(g) {
  const pd = g.pending;
  if (!pd || pd.type !== 'discard') return;
  const p = g.players[pd.player];
  if (p.hand.length > HAND_LIMIT) return;
  if (g.turnEnding) { startInfect(g); }
  else { g.phase = 'actions'; g.pending = null; } // discard triggered mid-turn by share
}

// ---- Infect phase -----------------------------------------------------
export function startInfect(g) {
  g.turnEnding = false;
  if (g.lockdownArmed) {
    g.lockdownArmed = false;
    log(g, 'good', 'Lockdown Weekend holds: no new infections. The sourdough thrives.');
    nextTurn(g);
    return;
  }
  g.phase = 'infect';
  g.pending = { type: 'infect', total: INFECTION_RATES[g.ratePos], done: 0, revealed: [] };
}

export function infectStep(g) {
  const pd = g.pending;
  if (g.infectionDeck.length === 0) {
    g.infectionDeck = shuffle(g.infectionDiscard);
    g.infectionDiscard = [];
  }
  const card = g.infectionDeck.pop();
  g.infectionDiscard.push(card);
  pd.revealed.push(card);
  log(g, 'infect', `Infection report: ${CITIES[card.city].name} (${STRAINS[card.color].name}).`);
  addCubes(g, card.city, card.color, 1, new Set());
  pd.done++;
  if (g.phase === 'lost') return;
  if (pd.done >= pd.total) nextTurn(g);
}

export function nextTurn(g) {
  if (g.phase === 'lost' || g.phase === 'won') return;
  for (const c of Object.keys(g.masked)) { if (--g.masked[c] <= 0) { delete g.masked[c]; log(g, 'sys', `Masking Protocol in ${CITIES[c].name} lapses.`); } }
  for (const c of Object.keys(g.noTreat)) { if (--g.noTreat[c] <= 0) delete g.noTreat[c]; }
  g.current = (g.current + 1) % g.players.length;
  g.turn++;
  const delta = (g.nextTurnDelta && g.nextTurnDelta[g.current]) || 0;
  g.actionsLeft = Math.max(1, 4 + delta);
  if (g.nextTurnDelta) delete g.nextTurnDelta[g.current];
  if (delta > 0) log(g, 'good', `${g.players[g.current].name} starts with ${g.actionsLeft} actions (+${delta} from earlier affection).`);
  else if (delta < 0) log(g, 'sys', `${g.players[g.current].name} starts with only ${g.actionsLeft} actions (gave one away earlier).`);
  g.engineerFlightUsed = false;
  g.phase = 'actions';
  g.pending = null;
  log(g, 'sys', `\u2014 ${g.players[g.current].name}'s turn (${ROLES[g.players[g.current].role].name}) \u2014`);
}

// mark that discard was due at end of turn (before infect)
export function forceEndDiscard(g, playerIdx) {
  g.turnEnding = true;
  forceDiscard(g, playerIdx);
}

// ---- Events -----------------------------------------------------------
export function findEventHolders(g, ev) {
  return g.players.filter(p => p.hand.some(c => c.type === 'event' && c.event === ev));
}
export function playEvent(g, playerIdx, ev) {
  const p = g.players[playerIdx];
  const idx = p.hand.findIndex(c => c.type === 'event' && c.event === ev);
  g.playerDiscard.push(p.hand.splice(idx, 1)[0]);
  log(g, 'event', `${p.name} plays ${EVENTS[ev].name}.`);
}

export function eventLockdown(g, playerIdx) {
  playEvent(g, playerIdx, 'lockdown');
  g.lockdownArmed = true;
  log(g, 'good', 'The next infection step is cancelled. Stay home, save cubes.');
}
export function eventFunding(g, playerIdx, city) {
  playEvent(g, playerIdx, 'funding');
  g.stations.push(city);
  effect(g, 'build', city, null);
  log(g, 'good', `Emergency Funding builds a lab in ${CITIES[city].name}. Ribbon-cutting skipped.`);
}
export function eventJet(g, playerIdx, pawnIdx, dest) {
  playEvent(g, playerIdx, 'jet');
  const p = g.players[pawnIdx];
  p.city = dest;
  log(g, 'move', `${p.name} is airlifted to ${CITIES[dest].name}.`);
  medicSweep(g, p);
}
export function eventModelApply(g, playerIdx, orderedUids) {
  playEvent(g, playerIdx, 'model');
  const top = g.infectionDeck.slice(-6);
  const rest = g.infectionDeck.slice(0, -6);
  const byUid = {};
  for (const c of top) byUid[c.uid] = c;
  // orderedUids[0] = next to be drawn \u2192 must be last in array
  const reordered = orderedUids.slice().reverse().map(u => byUid[u]);
  g.infectionDeck = [...rest, ...reordered];
  log(g, 'good', 'The Predictive Model rearranges fate. Peer review pending.');
}
export function eventBubble(g, playerIdx, uid) {
  playEvent(g, playerIdx, 'bubble');
  const idx = g.infectionDiscard.findIndex(c => c.uid === uid);
  const card = g.infectionDiscard.splice(idx, 1)[0];
  g.removedInfection.push(card);
  log(g, 'good', `${CITIES[card.city].name} forms a contact bubble \u2014 its card is removed from the game.`);
}

export function eventMasking(g, playerIdx, city) {
  playEvent(g, playerIdx, 'masking');
  let cleared = 0;
  for (const col of COLORS) {
    const n = g.cubes[city][col];
    if (n > 0) { g.supply[col] += n; g.cubes[city][col] = 0; cleared += n; checkEradication(g, col); }
  }
  g.masked[city] = 3;
  if (g.stats) g.stats.cubesTreated += cleared;
  effect(g, 'treat', city, null);
  log(g, 'good', `Successful Masking Protocol in ${CITIES[city].name}: ${cleared} cube${cleared === 1 ? '' : 's'} cleared, shielded for 3 turns.`);
}
// ---- Satirical infection headlines (comedy only, no gameplay effect) ----
const CITY_NEWS = {
  seattle: ['Seattle cluster traced to one shared oat-milk frother.', 'Outbreak spreads through a 4-hour line for a new coffee drop.'],
  sanfrancisco: ['SF founders pivot the virus into a Series A.', 'Bay Area outbreak blamed on a networking mixer nobody wanted to attend.'],
  denver: ['Denver cases linked to sharing a single water bottle up a 14er.', 'Mile-high altitude declared "basically a symptom" by locals.'],
  chicago: ['Chicago spread confirmed at a deep-dish debate that got physical.', 'Wind carried it, insists Chicago; the wind declined to comment.'],
  toronto: ['Toronto outbreak: everyone apologized while infecting each other.', 'Cases spike after a very polite hockey brawl.'],
  newyork: ['NYC cluster traced to one subway pole touched by all 8 million.', 'New Yorkers walk faster to outrun the virus. It keeps pace.'],
  washington: ['Washington forms a task force to study the previous task force.', 'D.C. outbreak stalled in committee.'],
  london: ['London cases blamed on a Tube carriage with the windows painted shut.', 'Brits queue for the virus; it is deemed "quite orderly".'],
  paris: ['Paris outbreak spreads via aggressive cheek-kissing at brunch.', 'Virus goes on strike, then infects everyone anyway.'],
  berlin: ['Berlin cluster traced to a techno club that never closes.', 'Outbreak paused by 90 minutes of paperwork, then resumed.'],
  rome: ['Rome cases linked to fourteen people sharing one Vespa.', 'Ancient aqueduct now also carrying the virus, historians note.'],
  moscow: ['Moscow blames the outbreak on the weather, the West, and Tuesday.', 'Cases officially "not happening," unofficially happening a lot.'],
  mexicocity: ['Mexico City outbreak traced to a taco stand with a devoted following.', 'Virus stuck in traffic for six hours, still made it across town.'],
  miami: ['Miami cluster forms at a pool party that refused to end.', 'Cases spike; everyone insists they were "just visiting".'],
  bogota: ['Bogota outbreak blamed on strong coffee bringing everyone out at once.', 'Cases climb to altitude and keep going.'],
  lima: ['Lima cases traced to a ceviche cook-off with no hand-washing rule.', 'Coastal fog blamed; the fog remains at large.'],
  saopaulo: ['Sao Paulo outbreak spreads through a stadium of 60,000 hugging strangers.', 'Traffic jam becomes a mobile superspreader event.'],
  buenosaires: ['Buenos Aires cluster traced to a tango class held far too close.', 'Cases blamed on staying up until 4am debating football.'],
  casablanca: ['Casablanca outbreak: of all the cities in the world, it walked into this one.', 'Cases linked to a very crowded, very charming cafe.'],
  lagos: ['Lagos cluster forms in a traffic jam that has lasted three days.', 'Outbreak spread through a wedding of 2,000 close friends.'],
  kinshasa: ['Kinshasa cases traced to a riverboat karaoke night.', 'Virus reportedly enjoyed the music, stayed for the encore.'],
  nairobi: ['Nairobi outbreak blamed on a matatu packed past physics.', 'Cases spike after a safari group clustered for the same photo.'],
  johannesburg: ['Johannesburg cluster traced to a braai that invited the whole street.', 'Cases linked to load-shedding forcing everyone into one lit room.'],
  khartoum: ['Khartoum outbreak spreads at a tea stall where nobody keeps distance.', 'Where the two Niles meet, so did the virus.'],
  istanbul: ['Istanbul cases spread across two continents before lunch.', 'Outbreak traced to a ferry where everyone shared the same simit.'],
  cairo: ['Cairo cluster blamed on a bazaar haggle that got heated.', 'Virus older than the pyramids, claims one confident vendor.'],
  riyadh: ['Riyadh outbreak traced to a mall food court at peak hour.', 'Cases climb with the temperature, locals unbothered.'],
  baghdad: ['Baghdad cases linked to a poetry night that ran long and loud.', 'Outbreak blamed on hospitality nobody could politely refuse.'],
  tehran: ['Tehran cluster forms in a taxi meant for four, holding nine.', 'Cases spread over endless refills of tea.'],
  dubai: ['Dubai outbreak traced to the world\'s tallest, most crowded elevator.', 'Virus upgraded to business class, infected the lounge.'],
  karachi: ['Karachi cases spread through a biryani queue of legendary length.', 'Outbreak stuck in traffic, arrives fashionably infectious.'],
  mumbai: ['Mumbai cluster traced to a local train packed beyond imagination.', 'Monsoon puddle blamed; the puddle is now a lake.'],
  delhi: ['Delhi outbreak blamed on smog, then on a wedding, then on the smog again.', 'Cases spread across a market where personal space is theoretical.'],
  chennai: ['Chennai cases linked to a filter-coffee stand with a cult following.', 'Outbreak survives 40C heat purely out of spite.'],
  kolkata: ['Kolkata cluster forms during a five-hour adda that no one left.', 'Cases spread through shared sweets nobody could resist.'],
  dhaka: ['Dhaka outbreak traced to a rickshaw jam of biblical proportions.', 'Cases spike where the whole city fits on one street.'],
  beijing: ['Beijing cases blamed on a hotpot dinner of twenty dipping in one pot.', 'Outbreak stuck behind the Great Wall of commuters.'],
  seoul: ['Seoul cluster traced to a karaoke room booked around the clock.', 'Cases spread through a 3am fried-chicken-and-beer summit.'],
  tokyo: ['Tokyo outbreak forms on the world\'s most punctual, most packed train.', 'Cases spread politely, with a bow and an apology.'],
  osaka: ['Osaka cluster traced to a takoyaki stand with an hour-long wait.', 'Outbreak blamed on everyone talking with their hands too close.'],
  shanghai: ['Shanghai cases linked to a bubble-tea line that circled the block.', 'Outbreak takes the maglev, arrives early.'],
  hongkong: ['Hong Kong cluster forms in a dim sum hall at maximum trolley traffic.', 'Cases spread up a hillside escalator no one could exit.'],
  taipei: ['Taipei outbreak traced to a night market of shoulder-to-shoulder snacking.', 'Cases spread through shared stinky tofu, odorless to the virus.'],
  bangkok: ['Bangkok cluster forms in a tuk-tuk shortcut that was neither short nor a cut.', 'Cases spread at a street-food stall too good to skip.'],
  hochiminh: ['Ho Chi Minh City outbreak traced to a sea of 8 million motorbikes.', 'Cases spread over iced coffee strong enough to wake the dead.'],
  jakarta: ['Jakarta cluster forms in a traffic jam residents have named.', 'Outbreak blamed on a mall so large it has its own weather.'],
  manila: ['Manila cases spread through a jeepney packed past capacity twice over.', 'Outbreak survives a typhoon, refuses to leave.'],
  sydney: ['Sydney cluster traced to a beach where distancing meant one towel apart.', 'Cases spread at a barbecue that ran until Tuesday.'],
};
const GENERIC_NEWS = [
  'BREAKING: [CITY] outbreak blamed on "a guy who seemed totally fine at brunch."',
  '[CITY] cases traced to one person confidently insisting it was "just allergies."',
  'Officials in [CITY] announce the virus, then announce a committee about the virus.',
  '[CITY] spread linked to a group chat that agreed to "definitely still meet up."',
  'Sources say [CITY] cluster began when someone said "I never get sick."',
  '[CITY] outbreak traced to a door handle everyone swears they did not touch.',
  'Virus reaches [CITY]; locals blame the neighboring city on principle.',
  '[CITY] cases rise after a meeting that "really could have been an email."',
];
function _pick(a) { return a[Math.floor(Math.random() * a.length)]; }
export function newsHeadline(city) {
  const n = CITIES[city].name;
  const pool = CITY_NEWS[city];
  if (pool && Math.random() < 0.82) return _pick(pool);
  return _pick(GENERIC_NEWS).split("[CITY]").join(n);
}
