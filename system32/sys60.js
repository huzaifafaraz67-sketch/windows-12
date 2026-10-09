buildApp=function(id,body){
  if(id==='games'){buildGameCenter(body);return;}
  return _bp5(id,body);
};

const GAMES=[
  ['mine','Minesweeper','💣'],
  ['snake','Snake','🐍'],
  ['g2048','2048','🔢'],
  ['ttt','Tic-Tac-Toe','⭕'],
  ['memo','Memory Match','🧠'],
  ['pong','Pong','🏓']
];
function buildGameCenter(body){
  body.innerHTML='<div class="gc"><div class="gcHead"><h2>Game Center</h2></div>'+
    '<div class="gcGrid">'+GAMES.map(g=>'<div class="gcCard" data-g="'+g[0]+'"><div class="gcIco">'+g[2]+'</div><div class="gcName">'+g[1]+'</div><button class="gcPlay">Play</button></div>').join('')+'</div>'+
    '<div class="gcStage" id="gcStage" style="display:none"></div></div>';
  body.querySelectorAll('.gcCard').forEach(c=>c.addEventListener('click',()=>openGame(body,c.dataset.g)));
}
function openGame(body,g){
  const grid=body.querySelector('.gcGrid'),head=body.querySelector('.gcHead'),stage=body.querySelector('#gcStage');
  grid.style.display='none';head.style.display='none';stage.style.display='block';
  stage.innerHTML='<div class="gcTop"><button class="gcBack">‹ Back</button><span class="gcTitle">'+(GAMES.find(x=>x[0]===g)||['','Game'])[1]+'</span></div><div class="gcPlayArea" id="gcPlay"></div>';
  stage.querySelector('.gcBack').addEventListener('click',()=>{grid.style.display='';head.style.display='';stage.style.display='none';stage.innerHTML='';});
  const area=stage.querySelector('#gcPlay');
  ({mine:gameMine,snake:gameSnake,g2048:game2048,ttt:gameTTT,memo:gameMemo,pong:gamePong}[g]||(()=>{}))(area);
}
