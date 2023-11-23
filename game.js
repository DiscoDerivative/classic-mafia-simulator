class Game {
  constructor(time, action, vote, role) {
    this.time = time;
    this.action = action;
    this.vote = vote;
  }
}

class Player {
  constructor(players, dead, role, oldrole){
    this.players = players;
    this.dead = dead;
    this.role = role;
    this.oldrole = oldrole;
  }
}

const PlayerList = new Player();
// Acts as the players within a lobby before the game starts
PlayerList.players = ["Kevin", "Michael", "Jack", "Sarah", "Amy", "Maria", "Ryan"];

const PlayersAlive = new Game();
// Acts as the players alive in-game at the start of a game
PlayersAlive.players = ["Kevin", "Michael", "Jack", "Sarah", "Amy", "Maria", "Ryan"];

// Acts as players currently dead (Default is 0)
PlayersAlive.dead = [];

// Acts as the setup
PlayersAlive.role = ["Villager", "Villager", "Villager", "Cop", "Doctor", "Mafioso", "Mafioso"];



const Mafia = new Game();
Mafia.players = PlayerList.players;

function starting() {
  console.log("Game Starting...");
}

function gameStateNight(time) {
  console.log("Night " + time);
}

function assignRole() { 
  // Shuffles the list of roles
  for (let i = PlayersAlive.role.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = PlayersAlive.role[i];
    PlayersAlive.role[i] = PlayersAlive.role[j];
    PlayersAlive.role[j] = temp;
  }
  return PlayersAlive.role;
}

// Night Actions

function pickPlayer() {
  let pick = PlayersAlive.players[Math.floor(Math.random() * PlayersAlive.players.length)];
  return pick;
}

function mafiaMeeting() {
  const mafiaKill = pickPlayer();
  
  // Find index of picked player and remove them from playersAlive
  return mafiaKill;
}

function copMeeting() {
  const investigate = pickPlayer();
  return investigate;
}

function docMeeting() {
  const save = pickPlayer();

  // If mafia and doc have the same person, push back the player
  return save;
}

function action(role) {

  const killPlayer = mafiaMeeting();
  const investigatePlayer = copMeeting();
  const savePlayer = docMeeting();

  const nightActionValue = [];

  for(let i = 0; i < role.length; i++) {

    if (role[i] == "Mafioso"){
      nightActionValue[i] = killPlayer;
    }

    else if(role[i] == "Cop"){
      nightActionValue[i] = investigatePlayer;
    }
    else if(role[i] == "Doctor"){
      nightActionValue[i] = "Save -> " + savePlayer;
    }
    else{
      nightActionValue[i] = null;
    }
  }
  return nightActionValue;
} 

function playerMove() {
  // Needs the randomized list of roles to assign to each player in the game
  const roleList = assignRole();

  // Displays the player, their role and what action they took.
  for(let i = 0; i < PlayerList.players.length; i++) {
    console.log("Player " + (i + 1) + ": " + PlayerList.players[i]);
    console.log("Role: " + roleList[i]);
    console.log("\n");
  }
}

// Returns the player list of who's currently alive after the night

function mafiaTargetRole() {
  const mafiaSelection = mafiaMeeting();
  const isTarget = (element) => element == mafiaSelection;
  const targetIndex = PlayersAlive.players.findIndex(isTarget);
  const targetRole = PlayersAlive.role[targetIndex];
  console.log("Target Role: " + targetRole);
  return targetRole;
}

function nightLogic() {
  console.log("Night Actions");

  const docSelection = docMeeting();
  const mafiaSelection = mafiaMeeting();
  const copSelection = copMeeting();

  console.log("Doctor Selection: " + docSelection);
  console.log("Mafia Selection: " + mafiaSelection);
  console.log("Cop Selection: " + copSelection);


  const isMafiaKill = (element) => element == mafiaSelection;
  const mafiaKillIndex = PlayersAlive.players.findIndex(isMafiaKill);

  if(mafiaSelection == docSelection) {
   return PlayersAlive.players
  }
  else {
    PlayersAlive.dead.push(mafiaSelection);
    PlayersAlive.players.splice(mafiaKillIndex, 1);
    return PlayersAlive.players;
  }
}


// Logic for Day

function gameStateDay(time) {
  console.log("Day " + time);

  if(PlayersAlive.dead.length > 0) {
    console.log(PlayersAlive.dead + " died whilst tending to their garden.");
    console.log(PlayersAlive.dead + "'s role was: " + dead);
  }
}

//starting();
//gameStateNight(1)
assignRole();
playerMove();
const dead = mafiaTargetRole();
console.log("\n");

nightLogic();
console.log("\n");
gameStateDay(1);

console.log(PlayersAlive.players);
console.log(PlayersAlive.dead);

