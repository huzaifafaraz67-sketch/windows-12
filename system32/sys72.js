if(typeof PINNED!=='undefined'&&!PINNED.includes('hpes'))PINNED.splice(1,0,'hpes');

const _bp6=buildApp;
buildApp=function(id,body){
  if(id==='hpes'){buildHpes(body);return;}
  return _bp6(id,body);
};
