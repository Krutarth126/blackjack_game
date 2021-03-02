let balckjackgame={
    'you':{'scorespan':'#yourscore', 'div':'.yourbox', 'score':0},
    'dealer':{'scorespan':'#dealerscore', 'div':'.dealerbox', 'score':0},
    'cards':['2', '3', '4', '5','6', '7' ,'8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cards-value':{'2':2, '3':3, '4':4,'5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':11},
    'wins':0,
    'loss':0,
    'draws':0,
    'isStand': false,
    'turnsOver': false,
}
let YOU= balckjackgame['you'];
let DEALER= balckjackgame['dealer'];
const sound = new Audio('assets/hit.mp3');
const winsound = new Audio('assets/win.mp3');
const losssound = new Audio('assets/loss.mp3');

function randomcard(){
    let randomIndex= Math.floor(Math.random()*13);
    return balckjackgame['cards'][randomIndex];
}

document.querySelector('#hit').addEventListener('click', blackjackhit)

document.querySelector('#stand').addEventListener('click', dealerlogic)

document.querySelector('#deal').addEventListener('click', blackjackdeal)

function blackjackhit(){
    if (balckjackgame['isStand']=== false){
        let card= randomcard();
        showcard(card, YOU);
        updatescore(card, YOU);
        showscore(YOU);
    }
    
}
function showcard(card, activeplayer){
    if (activeplayer['score']<=21){
     let cardimage= document.createElement("img")
     cardimage.src=`assets/${card}.png`
     document.querySelector(activeplayer['div']).appendChild(cardimage)
     sound.play();
    }
}
function blackjackdeal(){
    if (balckjackgame['turnsOver']=== true){
        balckjackgame['isStand']= false;
        let yourimages= document.querySelector('.yourbox').querySelectorAll('img')
        let dealerimages= document.querySelector('.dealerbox').querySelectorAll('img')

        for(let i=0; i<yourimages.length; i++){
            yourimages[i].remove();
        }
        for(let i=0; i<dealerimages.length; i++){
            dealerimages[i].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#yourscore').textContent=0;
        document.querySelector('#dealerscore').textContent=0;
        document.querySelector('#bjresult').textContent='LETS PLAY'

        document.querySelector('#yourscore').style.color= ' rgb(184, 174, 173)';
        document.querySelector('#dealerscore').style.color=' rgb(184, 174, 173)';
        document.querySelector('#bjresult').style.color='black'
        balckjackgame['turnsOver']= false;
    }

}
function updatescore(card, activeplayer){
    activeplayer['score']+= balckjackgame['cards-value'][card]
}
function showscore(activeplayer){
    if (activeplayer['score']>21){
        document.querySelector(activeplayer['scorespan']).textContent='BUST';
        document.querySelector(activeplayer['scorespan']).style.color='red';
    }else{
    document.querySelector(activeplayer['scorespan']).textContent= activeplayer['score']
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout (resolve, ms))
}

async function dealerlogic(){
    balckjackgame['isStand']= true;

    while (DEALER['score']<16 && balckjackgame['isStand']===true){
    let card= randomcard();
    showcard(card, DEALER);
    updatescore(card, DEALER);
    showscore(DEALER);
    await sleep(1000);
    }
        balckjackgame['turnsOver']= true;
        showresult(computewinner());
        
}

function computewinner(){
    let winner;
    if(YOU['score']<=21){
        if(YOU['score']> DEALER['score'] || (DEALER['score']>21)){
            console.log('You won!!');
            balckjackgame['wins']++;
            winner= YOU
        }else if (YOU['score']< DEALER['score']){
            console.log('You lost!!');
            balckjackgame['loss']++;
            winner= DEALER
        }else if (YOU['score']===DEALER['score']){
            console.log('you drew!!')
            balckjackgame['draws']++;
        }
    }else if(YOU['score']>21 && DEALER['score']<=21){
        console.log('you lost!!');
        balckjackgame['loss']++;
        winner= DEALER;
    }else if (YOU['score']>21 && DEALER['score']>21){
        console.log('you drew!!')
        balckjackgame['draws']++;
    }
    return winner;

}

function showresult(winner){
    let message, messagecolor;

    if(winner=== YOU){
        message= 'You won!!';
        messagecolor= 'green';
        document.querySelector('#wins').textContent= balckjackgame['wins']
        winsound.play()
    }
    else if(winner=== DEALER){
        message= 'You lost!!';
        messagecolor= 'red';
        document.querySelector('#losses').textContent= balckjackgame['loss']
        losssound.play();
    }
    else{
        message= 'You drew';
        messagecolor= 'orange';
        document.querySelector('#draws').textContent= balckjackgame['draws']

    }
    document.querySelector('#bjresult').textContent= message;
    document.querySelector('#bjresult').style.color= messagecolor;
}