/*
Mafia Simulation Program

This program is a simulation of a mafia game, more specifically if it was only AI.
It features the classic setup that consists of three villagers, one cop, one doctor,
and two mafia or mafioso. It is a demonstration of how the first night works and how it leads
into the first day. It accounts for the doctor saving night one, in which no one dies. It also
accounts for mafia not being able to kill each other, doctor not being able to save themself
and cop not being able to investigate themself. I hope to expand on this by making it a full game 
instead of just an example of the night.
*/


// Controls the time and the players (in-game)
class Game {
  constructor(time, players, dead, role, deadRole) {
    this.time = time;
    this.players = players;
    this.dead = dead;
    this.role = role;
    this.deadRole = deadRole;
  }
}

// Controls the state of the players (pre-lobby) and their roles
class Player {
  constructor(players){
    this.players = players;
  }
}

// Acts as the players within a lobby before the game starts
const PlayerList = new Player();

PlayerList.players = ["Kevin", "Michael", "Jack", "Sarah", "Amy", "Maria", "Ryan"];

// Acts as the players alive in-game at the start of a game
const PlayersAlive = new Game();
PlayersAlive.players = ["Kevin", "Michael", "Jack", "Sarah", "Amy", "Maria", "Ryan"];

// Acts as players currently dead (Default is 0)
PlayersAlive.dead = [];

// Acts as the setup
PlayersAlive.role = ["Villager", "Villager", "Villager", "Cop", "Doctor", "Mafioso", "Mafioso"];

// GAME START

// Message that verifies if the game started.
function starting() {
  console.log("Game Starting...");
}

// Message that verifies that the game state is set to night
function gameStateNight(time) {
  console.log("Night " + time);
}

// Assigns roles to the players in the game
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

// Selects a random player (AI)
function pickPlayer() {
  let pick = PlayersAlive.players[Math.floor(Math.random() * PlayersAlive.players.length)];
  return pick;
}

// Mafiosos will pick a player to kill.
function mafiaMeeting() {

  let targetIndex, mafiaKill;

  // Chooses a target that isn't mafia
  do{
    mafiaKill = pickPlayer();
    targetIndex = PlayersAlive.players.indexOf(mafiaKill);
  }while(PlayersAlive.role[targetIndex] == "Mafioso");

  PlayersAlive.deadRole = PlayersAlive.role[targetIndex];
  return mafiaKill;
}

// Cop picks a player to investigate their allignment.
function copMeeting() {
  // Chooses a target that isn't themself
  let targetIndex, investigate;
  do{
    investigate = pickPlayer();
    targetIndex = PlayersAlive.players.indexOf(investigate);
  }while(PlayersAlive.role[targetIndex] == "Cop");
  return investigate;
}

// Doctor picks a player to save from dying.
function docMeeting() {
  let targetIndex, save;
  // Chooses a target that isn't themself
  do{
    save = pickPlayer();
    targetIndex = PlayersAlive.players.indexOf(save);
  }while(PlayersAlive.role[targetIndex] == "Doctor");
  return save;
}

function playerMove() {
  // Needs the randomized list of roles to assign to each player in the game

  // Displays the player, their role and what action they took.
  for(let i = 0; i < PlayersAlive.players.length; i++) {
    console.log("Player " + (i + 1) + ": " + PlayersAlive.players[i]);
    console.log("Role: " + PlayersAlive.role[i]);
  }
}

/*
This controls what happens when mafia and doctor select the same target.
It also displays what target each power role selected.
A power role is a member of the town with night actions.
*/
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


// Displays system messages of the day

/* A system message is information based on the role permission
   Everyone can see who dies but only cop can see who they investigate.
*/
function gameStateDay(time) {
  console.log("Day " + time);

  if(PlayersAlive.dead.length > 0) {
    console.log(PlayersAlive.dead + " died whilst tending to their garden.");
    console.log(PlayersAlive.dead + "'s role was: " + PlayersAlive.deadRole);
  }
  else{
    console.log("No one died.");
  }
}

// Night One
starting();
gameStateNight(1)
assignRole();
playerMove();
console.log("\n");
nightLogic();
console.log("\n");

// Day One
gameStateDay(1);
