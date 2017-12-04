'use strict'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAXqXv30flt8Xh7bga-wG7IaOGULMaLZ-4",
  authDomain: "cse-134b-cfd78.firebaseapp.com",
  databaseURL: "https://cse-134b-cfd78.firebaseio.com",
  projectId: "cse-134b-cfd78",
  storageBucket: "",
  messagingSenderId: "996134578305"
};
firebase.initializeApp(config);

function getPlayers(){
  document.getElementById('content').textContent = '';
  let allPlayersStatistic = document.getElementById('allPlayersStatistic').content.cloneNode(true);
  document.getElementById('content').appendChild(allPlayersStatistic);
  firebase.database().ref('players').once('value')
  .then(function(players){
    players.forEach(function(player){
      let playerTemplate = document.getElementById('player').content.cloneNode(true);//template
      playerTemplate.querySelector('#name').textContent = player.val().name;
      playerTemplate.querySelector('#position').textContent = player.val().position;
      playerTemplate.querySelector('#jnumber').textContent = player.val().jnumber;
      playerTemplate.querySelector('#birthday').textContent = player.val().birthday;
      playerTemplate.querySelector('#height').textContent = player.val().height;
      playerTemplate.querySelector('#weight').textContent = player.val().weight;
      playerTemplate.querySelector('#goals').textContent = player.val().goals;
      playerTemplate.querySelector('#assists').textContent = player.val().assists;
      playerTemplate.querySelector('#gamesPlayed').textContent = player.val().gamesPlayed;
      playerTemplate.querySelector('#editButton').addEventListener('click',() => editPlayer(player.val(), player.key));
      playerTemplate.querySelector('#deleteButton').addEventListener('click',() => deletePlayer(player.key));
      playerTemplate.querySelector('#addButton').addEventListener('click',() => renderAddPlayerForm('player'));
      document.getElementById('content').appendChild(playerTemplate);
    });
  });
  // let roster = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : [];
  // roster.forEach(function(player){
  //   let playerTemplate = document.getElementById('player').content.cloneNode(true);//template
  //   playerTemplate.querySelector('#name').textContent = player.name;
  //   playerTemplate.querySelector('#position').textContent = player.position;
  //   playerTemplate.querySelector('#jnumber').textContent = player.jnumber;
  //   playerTemplate.querySelector('#birthday').textContent = player.birthday;
  //   playerTemplate.querySelector('#height').textContent = player.height;
  //   playerTemplate.querySelector('#weight').textContent = player.weight;
  //   playerTemplate.querySelector('#goals').textContent = player.goals;
  //   playerTemplate.querySelector('#assists').textContent = player.assists;
  //   playerTemplate.querySelector('#gamesPlayed').textContent = player.gamesPlayed;
  //   playerTemplate.querySelector('#editButton').addEventListener('click',() => editPlayer(player));
  //   playerTemplate.querySelector('#deleteButton').addEventListener('click',() => deletePlayer(player));
  //   playerTemplate.querySelector('#addButton').addEventListener('click',() => renderAddPlayerForm());
  //   document.getElementById('content').appendChild(playerTemplate);
  // });
}

function editPlayer(player, key){
  document.getElementById('content').textContent = '';
  let editPlayerForm = document.getElementById('editAddPlayerForm').content.cloneNode(true);
  editPlayerForm.querySelector('#title').textContent = 'Edit this player';
  editPlayerForm.querySelector('#PlayerName').value = player.name;
  editPlayerForm.querySelector('#Position').value = player.position;
  editPlayerForm.querySelector('#jnumber').value = player.jnumber;
  editPlayerForm.querySelector('#Birthday').value = player.birthday;
  editPlayerForm.querySelector('#height').value = player.height;
  editPlayerForm.querySelector('#weight').value = player.weight;
  editPlayerForm.querySelector('#goals').value = player.goals;
  editPlayerForm.querySelector('#assists').value = player.assists;
  editPlayerForm.querySelector('#gamesPlayed').value = player.gamesPlayed;
  editPlayerForm.querySelector('#updateButton').addEventListener('click', () => updatePlayer(key));
  editPlayerForm.querySelector('#cancelButton').addEventListener('click', () => getPlayers());
  document.getElementById('content').appendChild(editPlayerForm);
}

function deletePlayer(key){
  console.log(key);
  firebase.database().ref('players/' + key).remove()
  .then(function(){
    firebase.database().ref('stats/' + key).remove()
    .then(function(){
      console.log('removed users and stats successfully');
    })
    .catch(function(error){
      console.log(error);
    });
  })
  .catch(function(error){
    console.log(error);
  });
  // let roster = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : false;
  // if(roster){
  //   let indexOfPlayerToDelete = searchRosterArray(player, roster);
  //   console.log('deleting player at index ' + indexOfPlayerToDelete);
  //   if(indexOfPlayerToDelete != -1){
  //     console.log('old roster: ' + roster);
  //     roster.splice(indexOfPlayerToDelete, 1);
  //     console.log('new roster: ' + roster);
  //     localStorage.setItem('roster', JSON.stringify(roster));
  //     console.log(localStorage.getItem('roster'));
  //     getPlayers();
  //   }
  // }
}

function updatePlayer(key){
  // if(document.getElementById('PlayerName')){
  let name = document.getElementById('PlayerName').value;
  let position = document.getElementById('Position').value;
  let jnumber = document.getElementById('jnumber').value;
  let birthday = document.getElementById('Birthday').value;
  let height = document.getElementById('height').value;
  let weight = document.getElementById('weight').value;
  let goals = document.getElementById('goals').value;
  let assists = document.getElementById('assists').value;
  let gamesPlayed = document.getElementById('gamesPlayed').value;
  let updatedPlayer = {
    name : name,
    position : position,
    jnumber : jnumber,
    birthday : birthday,
    height : height,
    weight : weight,
    goals : goals,
    assists : assists,
    gamesPlayed : gamesPlayed
  }
  firebase.database().ref('players/' + key).update(updatedPlayer)
  .then(function(player){
    let updatedStats = {
      name : name,
      jnumber : jnumber,
      goals : goals
    };
    firebase.database().ref('stats/' + key).update(updatedStats)
    .then(function(){
      console.log('successfully updated stats and players in updatePlayer()');
    })
    .catch(function(error){
      console.log(error);
    });
  })
  .catch(function(error){
    console.log(error);
  });
  //we get the array of players and must search for our player
  // let roster  = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : false;
  // if(roster){
  //   let playerIndex = searchRosterArray(player, roster);
  //   // console.log(player);
  //   // console.log(roster);
  //   // console.log(playerIndex);
  //   if(playerIndex != -1){
  //     roster[playerIndex] = newPlayer;
  //     // console.log(newPlayer);
  //     console.log(roster);
  //     localStorage.setItem('roster', JSON.stringify(roster));
  //     console.log(localStorage.getItem('roster'));
  //     getPlayers();
  //   }
  // }
}

// function searchRosterArray(object, array){
//   console.log('in searchRosterArray');
//   console.log(object);
//   console.log(array);
//   return array.findIndex(function(player, index){
//     if(
//       object.name === player.name &&
//       object.position === player.position &&
//       object.jnumber === player.jnumber &&
//       object.birthday === player.birthday &&
//       object.height === player.height &&
//       object.weight === player.weight &&
//       object.goals === player.goals &&
//       object.assists === player.assists &&
//       object.gamesPlayed === player.gamesPlayed
//     ){
//       console.log('found index at ' + index);
//       return true;
//     } else{
//       console.log('not found index');
//       return false;
//     }
//   });
// }

function addPlayer(){
  let name = document.getElementById('PlayerName').value;
  let position = document.getElementById('Position').value;
  let jnumber = document.getElementById('jnumber').value;
  let birthday = document.getElementById('Birthday').value;
  let height = document.getElementById('height').value;
  let weight = document.getElementById('weight').value;
  let goals = document.getElementById('goals').value;
  let assists = document.getElementById('assists').value;
  let gamesPlayed = document.getElementById('gamesPlayed').value;

  let newPlayer = {
    name : name,
    position : position,
    jnumber : jnumber,
    birthday : birthday,
    height : height,
    weight : weight,
    goals : goals,
    assists : assists,
    gamesPlayed : gamesPlayed
  };
  firebase.database().ref('players').push(newPlayer).then(function(player){
    firebase.database().ref('stats/' + player.key).set({
      jnumber : jnumber,
      name : name,
      foul : 0,
      redCard : 0,
      yellowCard : 0,
      shotsOnGoal : 0,
      goals : goals,
      cornerKicks : 0,
      goalKicks : 0,
      penaltyKicks : 0,
      throwIns : 0,
      appearances : 0
    });
    // console.log(player.key);
  });

  //we get the array of players
  //let roster = localStorage.getItem('roster') ? JSON.parse(localStorage.getItem('roster')) : [];
  //add to beginning of array
  // if(roster.unshift(
  //   {
  //     name : name,
  //     position : position,
  //     jnumber : jnumber,
  //     birthday : birthday,
  //     height : height,
  //     weight : weight,
  //     goals : goals,
  //     assists : assists,
  //     gamesPlayed : gamesPlayed
  //   }
  // )){
  //   localStorage.setItem('roster', JSON.stringify(roster));
  //   console.log('added player successfully!\n');
  // } else{
  //   console.log('failed to add player\n');
  // }
  // console.log(roster);
  // console.log(localStorage);
  //window.location.replace('./Player.html');
}

function renderAddPlayerForm(from){
  document.getElementById('content').textContent = '';
  let addPlayerForm = document.getElementById('editAddPlayerForm').content.cloneNode(true);
  addPlayerForm.querySelector('#title').textContent = 'Add a new player';
  addPlayerForm.querySelector('#updateButton').addEventListener('click', () => addPlayer());
  if(from == 'player'){
    addPlayerForm.querySelector('#cancelButton').addEventListener('click', () => getPlayers());
  } else if(from == 'manage'){
    addPlayerForm.querySelector('#cancelButton').addEventListener('click', () => renderManage());
  }
  document.getElementById('content').appendChild(addPlayerForm);
}
//stats section ----------------------------------------------------------------
function getStats(){
  document.getElementById('content').textContent = '';
  let statsTemplate = document.getElementById('statsTemplate').content.cloneNode(true);
  document.getElementById('content').appendChild(statsTemplate);
  firebase.database().ref('stats').once('value')
  .then(function(players){
    players.forEach(function(player){
      // let playerNamesTemplate = document.getElementById('playerNamesTemplate').content.cloneNode(true);
      let playerStatsTemplate = document.getElementById('playerStatsTemplate').content.cloneNode(true);
      playerStatsTemplate.querySelector('.invisibility').id = player.key; //for realtime
      playerStatsTemplate.querySelector('.jnumber').textContent = player.val().jnumber;
      playerStatsTemplate.querySelector('.name').textContent = player.val().name;
      // document.getElementById('playerNames').appendChild(playerNamesTemplate);
      playerStatsTemplate.querySelector('.foul').textContent = player.val().foul;
      playerStatsTemplate.querySelector('.redCard').textContent = player.val().redCard;
      playerStatsTemplate.querySelector('.yellowCard').textContent = player.val().yellowCard;
      playerStatsTemplate.querySelector('.shotsOnGoal').textContent = player.val().shotsOnGoal;
      playerStatsTemplate.querySelector('.goals').textContent = player.val().goals;
      playerStatsTemplate.querySelector('.cornerKicks').textContent = player.val().cornerKicks;
      playerStatsTemplate.querySelector('.goalKicks').textContent = player.val().goalKicks;
      playerStatsTemplate.querySelector('.penaltyKicks').textContent = player.val().penaltyKicks;
      playerStatsTemplate.querySelector('.throwIns').textContent = player.val().throwIns;
      playerStatsTemplate.querySelector('.appearances').textContent = player.val().appearances;
      playerStatsTemplate.querySelector('#renderEditStatsFormButton').addEventListener('click',() => renderEditStatsForm(player.val(), player.key));
      document.getElementById('playerStats').appendChild(playerStatsTemplate);
      firebase.database().ref('stats/' + player.key).on('child_changed', function(updatedStat){
        console.log(player.key);
        if(document.getElementById(player.key)){
          document.getElementById(player.key).querySelector('.' + updatedStat.key).textContent = updatedStat.val();
        }
      });
    });
  });
  // playerStats.forEach(function(player){
  //   let playerNamesTemplate = document.getElementById('playerNamesTemplate').content.cloneNode(true);
  //   let playerStatsTemplate = document.getElementById('playerStatsTemplate').content.cloneNode(true);
  //   playerNamesTemplate.querySelector('.jnumber').textContent = '#' + player.jnumber;
  //   playerNamesTemplate.querySelector('.name').textContent = player.name;
  //   document.getElementById('playerNames').appendChild(playerNamesTemplate);
  //   playerStatsTemplate.querySelector('.foul').textContent = player.foul;
  //   playerStatsTemplate.querySelector('.redCard').textContent = player.redCard;
  //   playerStatsTemplate.querySelector('.yellowCard').textContent = player.yellowCard;
  //   playerStatsTemplate.querySelector('.shotsOnGoal').textContent = player.shotsOnGoal;
  //   playerStatsTemplate.querySelector('.goals').textContent = player.goals;
  //   playerStatsTemplate.querySelector('.cornerKicks').textContent = player.cornerKicks;
  //   playerStatsTemplate.querySelector('.goalKicks').textContent = player.goalKicks;
  //   playerStatsTemplate.querySelector('.penaltyKicks').textContent = player.penaltyKicks;
  //   playerStatsTemplate.querySelector('.throwIns').textContent = player.throwIns;
  //   playerStatsTemplate.querySelector('.appearances').textContent = player.appearances;
  //   document.getElementById('playerStats').appendChild(playerStatsTemplate);
  // });
}

function renderEditStatsForm(player, key){
  document.getElementById('content').textContent = '';
  let editStatsForm = document.getElementById('editStatsForm').content.cloneNode(true);
  editStatsForm.querySelector('#jnumber').value = player.jnumber;
  editStatsForm.querySelector('#name').value = player.name;
  editStatsForm.querySelector('#foul').value = player.foul;
  editStatsForm.querySelector('#redCard').value = player.redCard;
  editStatsForm.querySelector('#yellowCard').value = player.yellowCard;
  editStatsForm.querySelector('#shotsOnGoal').value = player.shotsOnGoal;
  editStatsForm.querySelector('#goals').value = player.goals;
  editStatsForm.querySelector('#cornerKicks').value = player.cornerKicks;
  editStatsForm.querySelector('#goalKicks').value = player.goalKicks;
  editStatsForm.querySelector('#penaltyKicks').value = player.penaltyKicks;
  editStatsForm.querySelector('#throwIns').value = player.throwIns;
  editStatsForm.querySelector('#appearances').value = player.appearances;
  editStatsForm.querySelector('#editStatsButton').addEventListener('click',() => editStats(key));
  document.getElementById('content').appendChild(editStatsForm);
}

function editStats(key){
  let updatedStats = {};
  let updatedProfileStats = {};
  updatedStats.jnumber = document.getElementById('jnumber').value;
  updatedProfileStats.jnumber = document.getElementById('jnumber').value;
  updatedStats.name = document.getElementById('name').value;
  updatedProfileStats.name = document.getElementById('name').value;
  updatedStats.foul = document.getElementById('foul').value;
  updatedStats.redCard = document.getElementById('redCard').value;
  updatedStats.yellowCard = document.getElementById('yellowCard').value;
  updatedStats.shotsOnGoal = document.getElementById('shotsOnGoal').value;
  updatedStats.goals = document.getElementById('goals').value;
  updatedProfileStats.goals = document.getElementById('goals').value;
  updatedStats.cornerKicks = document.getElementById('cornerKicks').value;
  updatedStats.goalKicks = document.getElementById('goalKicks').value;
  updatedStats.penaltyKicks = document.getElementById('penaltyKicks').value;
  updatedStats.throwIns = document.getElementById('throwIns').value;
  updatedStats.appearances = document.getElementById('appearances').value;
  firebase.database().ref('stats/' + key).update(updatedStats)
  .then(function(player){
    firebase.database().ref('players/' + key).update(updatedProfileStats)
    .then(function(){
      console.log('successfully updated stats and players in updateStats()');
    })
    .catch(function(error){
      console.log(error);
    });
  })
  .catch(function(error){
    console.log(error);
  });
}
//stats section ----------------------------------------------------------------

window.onload = () => {
  if(!sessionStorage.getItem('currUser')){
    window.location.replace('LoginBootstrap.html');
  } else{
    renderManage();
  }
};

function renderManage(){
  document.getElementById('content').textContent = '';
  let manage = document.getElementById('manage').content.cloneNode(true);
  document.getElementById('content').appendChild(manage);
}

function logoutUser(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('signed out');
    sessionStorage.clear();
  }).catch(function(error) {
    // An error happened.
    console.log('failed to sign out!');
  });
}
