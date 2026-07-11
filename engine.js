// COVID: The Game — core data + rules engine (pure-ish: functions mutate a passed game object)

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
  bogota:       C('Bogotá', 'beta', -74.1, 4.7),
  lima:         C('Lima', 'beta', -77, -12),
  saopaulo:     C('São Paulo', 'beta', -46.6, -23.5),
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

export const ADJ = {};
for (const id of Object.keys(CITIES)) ADJ[id] = [];
for (const [a, b] of EDGES) { ADJ[a].push(b); ADJ[b].push(a); }

// map projection → percentages
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
  antivax:  { name: 'Anti-Vaxxers Unite', desc: 'A random city gains 1 infection cube and refuses all treatment for 1 turn. They did their own research.' },
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
    engineerFlightUsed: false,
    log: [], effects: [], effectSeq: 0,
    lossReason: null,
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
  if (g.eradicated[color]) { log(g, 'sys', `${STRAINS[color].name} is eradicated — ${CITIES[city].name} shrugs it off.`); return; }
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
  log(g, 'bad', 'GAME OVER — ' + reason);
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
  if (g.stations.includes(p.city) && g.stations.includes(dest)) opts.push({ how: 'shuttle', label: 'Lab shuttle' });
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
  const labels = { drive: 'travels overland', direct: 'flies direct', charter: 'charters a flight', shuttle: 'shuttles between labs', engineerFly: 'is dispatched', rendezvous: 'is redeployed' };
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
  effect(g, 'treat', city, color);
  log(g, 'good', `${p.name} treats ${STRAINS[color].name} in ${CITIES[city].name} (−${n} cube${n > 1 ? 's' : ''}).`);
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
  log(g, 'good', `${p.name} opens a research lab in ${CITIES[p.city].name}${chk.free ? ' (no paperwork — Site Engineer)' : ''}.`);
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
          label: `${giver.name} → ${taker.name}: ${CITIES[card.city].name}` });
      }
    }
  }
  return opts;
}
export function doShare(g, opt) {
  const giver = g.players[opt.giver];
  const taker = g.players[opt.taker];
  const idx = giver.hand.findIndex(c => c.uid === opt.uid);
  taker.hand.push(giver.hand.splice(idx, 1)[0]);
  log(g, 'move', `${giver.name} hands the ${CITIES[opt.city].name} file to ${taker.name}.`);
  spend(g);
  if (taker.hand.length > HAND_LIMIT) forceDiscard(g, taker.i);
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
  if (p.hand.length <= HAND_LIMIT) {
    if (g.turnEnding) { startInfect(g); }
    else { g.phase = 'actions'; g.pending = null; } // discard triggered mid-turn by share
  }
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
  g.actionsLeft = 4;
  g.engineerFlightUsed = false;
  g.phase = 'actions';
  g.pending = null;
  log(g, 'sys', `— ${g.players[g.current].name}'s turn (${ROLES[g.players[g.current].role].name}) —`);
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
  // orderedUids[0] = next to be drawn → must be last in array
  const reordered = orderedUids.slice().reverse().map(u => byUid[u]);
  g.infectionDeck = [...rest, ...reordered];
  log(g, 'good', 'The Predictive Model rearranges fate. Peer review pending.');
}
export function eventBubble(g, playerIdx, uid) {
  playEvent(g, playerIdx, 'bubble');
  const idx = g.infectionDiscard.findIndex(c => c.uid === uid);
  const card = g.infectionDiscard.splice(idx, 1)[0];
  g.removedInfection.push(card);
  log(g, 'good', `${CITIES[card.city].name} forms a contact bubble — its card is removed from the game.`);
}

export function eventMasking(g, playerIdx, city) {
  playEvent(g, playerIdx, 'masking');
  let cleared = 0;
  for (const col of COLORS) {
    const n = g.cubes[city][col];
    if (n > 0) { g.supply[col] += n; g.cubes[city][col] = 0; cleared += n; checkEradication(g, col); }
  }
  g.masked[city] = 3;
  effect(g, 'treat', city, null);
  log(g, 'good', `Successful Masking Protocol in ${CITIES[city].name}: ${cleared} cube${cleared === 1 ? '' : 's'} cleared, shielded for 3 turns.`);
}
export function eventAntiVax(g, playerIdx) {
  playEvent(g, playerIdx, 'antivax');
  const ids = Object.keys(CITIES);
  const city = ids[Math.floor(Math.random() * ids.length)];
  const color = CITIES[city].color;
  g.noTreat[city] = 1;
  effect(g, 'outbreak', city, color);
  log(g, 'event', `Anti-Vaxxers Unite in ${CITIES[city].name}: +1 ${STRAINS[color].name} cube, no treatment for 1 turn. They did their own research.`);
  addCubes(g, city, color, 1, new Set());
}
