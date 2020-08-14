let chosenMaxLife = 100;    //total value which depicted by healthBar
const attackValue = 10;     // value for each attack
const strongAttckValue = 15;
const monsterAttackValue = 14;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

const battleLog =[];
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_GAME_OVER = 'GAME_OVER ';



adjustHealthBars(chosenMaxLife);

function attackHandler(){
    attackMonster('ATTACK');
}
attackBtn.addEventListener('click',attackHandler);
function strongAttckHandler(){
    attackMonster('STRONG_ATTACK');
}
strongAttackBtn.addEventListener('click',strongAttckHandler);

// function to avoid code redunduncy in attack and strong attack
function attackMonster(mode){
    const initialHealth = chosenMaxLife;
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = attackValue;
        WriteToLog(LOG_EVENT_PLAYER_ATTACK,maxDamage);

    } else if(mode === 'STRONG_ATTACK'){
        maxDamage = strongAttckValue;
        WriteToLog(LOG_EVENT_PLAYER_STRONG_ATTACK,maxDamage);

    }
    const damage = dealMonsterDamage(maxDamage); 
    currentMonsterHealth -= damage;  //updates the monster health bar after attack
    //Considering monster hiting back once player hits
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth -=playerDamage;
    WriteToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage);
    if (currentMonsterHealth <= 0 ) {
        alert('YOU WON!!!');
        WriteToLog(LOG_EVENT_GAME_OVER,'PLAYER WON');
    }
    if (currentPlayerHealth <= 0 ) {
     alert('THE MONSTER WON!!!');
     WriteToLog(LOG_EVENT_GAME_OVER,'PLAYER WON');

     }
     if (currentMonsterHealth <= 0 && currentPlayerHealth <=0 ) {
         alert('YOU HAVE A DRAW');
         WriteToLog(LOG_EVENT_GAME_OVER,'DRAW');

     }
     //Handling bonus life
    if(currentPlayerHealth <= 0 && hasBonusLife === true)
    {
        alert('YOU LOST ONE LIFE');
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialHealth;
        currentMonsterHealth = initialHealth;
        resetGame(initialHealth);
    }
}
function healHandler(){
    let healthIncreased ;
     increasePlayerHealth(attackValue);
    currentPlayerHealth += attackValue;
    alert('HEALED FROM THE ATTACK');
    if (currentPlayerHealth >= chosenMaxLife ) {
        alert('HEALED TO MAXIMUM.');
    } 

}
healBtn.addEventListener('click',healHandler);

function reset(){
    currentPlayerHealth = initialHealth;
    currentMonsterHealth = initialHealth;
}
//Log functionality
function WriteToLog(ev,val){
    let logEntry;
    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event : ev,
            value : val
        };
    }else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event : ev,
            value : val
        };
        
    }else if (ev === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event : ev,
            value : val
        };
    }else if (ev === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event : ev,
            value : val
        };
    }
    battleLog.push(logEntry);

}
function logHandler(){
    console.log(battleLog);
}
logBtn.addEventListener('click',logHandler);