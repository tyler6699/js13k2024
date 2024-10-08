function Level(no=0) {
  // setup tiles
  let a = navigator.userAgent;
  this.check = a.match(/Android/i)!=null||a.match(/iPhone/i)!=null||a.match(/iPad/i)!=null;
  this.rows = 10;
  this.cols = 10
  this.tiles=[];
  this.mobs=[];
  this.redraw=[];
  this.time=0;
  this.text="";
  this.help="";
  this.done=false;

  let id =0;
  let tt=[];

  this.rows = 5;
  this.cols = 5;

  let dims = {0:[4,4],1:[4,5],2:[5,6],7:[5,8],8:[3,10],9:[12,12],10:[5,20],11:[10,10],12:[6,6],13:[6,6]};
  if(dims[no]) [this.rows,this.cols] = dims[no];

  this.addPlat = function(lvl, id){
    for(l = lvl; l >= 0; l--){
      t=this.tiles[l][id-1];
      if(l==lvl){
         t.type=types.TILE2;
       } else {
         t.type=types.STOP;
       }
       t.setType();
    }
  }

  this.addSpike = function(l, id, off, pause=0){
    t=this.tiles[l][id-1];
    t.obj=new Spike(t.x+90, t.y+4, id, off, l, pause);
  }

  this.addKey = function(l, id){
    t=this.tiles[l][id-1];
    t.obj=new Key(t.x+70, t.y-4, l, id);
  }

  this.addFire = function(l, id){
    t=this.tiles[l][id-1];
    t.obj=new Fire(t.x+80, t.y-20, l, id);
  }

  this.addGhost = function(l, sid, id, id2){
    let st=this.tiles[l][sid-1];
    let t=this.tiles[l][id-1];
    let t2=this.tiles[l][id2-1];
    t.obj=new Ghost(st.x+64,st.y-64,t.x+64, t.y-64, t2.x+64, t2.y-64, l);
  }

  // Populate 4 levels of tiles in a block
  for(l = 0; l < 5; l++){
    id=0;
    for (r = 0; r < this.rows; r++) {
      for (c = 0; c < this.cols; c++) {
        id++;
        xx = (c - r) * 64;
        yy = (c + r) * 32;
        let type = types.TILE;
        if(l>0)type = types.AIR;
        var tile = new Entity(32, 16, xx, yy-(l*32), 0, type);
        tile.id=id;
        tile.lvl=l;
        tile.row=r;
        tile.col=c;
        tt.push(tile);
      }
    }
    this.tiles.push(tt);
    tt=[];
  }

  // Tutorial LEVEL 01
  if(no==0){ // LEARN: KEY
    this.tileCol1= "#480048";
    this.tileCol2= "#601848";
    if(this.check){
      this.text="Welcome to the Fear Factory! (A) to reload level! (B) to Jump!"
    } else {
      this.text="Welcome to the Fear Factory! Space or (A) button to hide text and Jump! Button (B) Or Key (R) to reload level!"
    }
    this.help="The level is unstable, enter the portal quickly!"
    this.t2="#FFDC7F";
    this.addKey(0, 16);

  // LEVEL 02
  } else if(no==1) { // LEARN JUMP
    this.addKey(0, 10);
    this.text="Press space / button (A) to jump over blocks."
    this.help="Move along dont be scared ..."
    this.tileCol1= "#C3C3E5";
    this.tileCol2= "#F1F0FF";
    this.t2="#295F98";
    this.blkColr="#7C93C3";
    this.addPlat(1,3);
    this.addPlat(1,8);
    this.addPlat(1,13);
    this.addPlat(1,18);

  // LEVEL 03
  } else if(no==2) { // LEARN PARKOUR
    this.addKey(2, 17);
    this.text="Do you have any parkour skills?"
    this.help="I thought you were afraid of heights!"
    this.tileCol1= "#273746";
    this.tileCol2= "#566573";
    this.t2="#295F98";
    this.blkColr="#7C93C3";
    this.addPlat(1,15);
    this.addPlat(2,17);

  // LEVEL 04
  } else if(no==3) { // LEARN SPIKES
    [0, 0.5, 0, 0.5, 0].forEach((z, i) => this.addSpike(0, 3 + 5 * i,0));
    this.text="This may trigger your Aichmophobia! Jump over or wait for the spikes to drop."
    this.help="It will get more difficult, move along."
    this.addKey(0, 15);
    this.tileCol1= "#028482";
    this.tileCol2= "#7ABA7A";

  // LEVEL 05
  } else if(no==4) { // LEARN SPIKES
    [.5,0, .5, 0, .5].forEach((z, i) => this.addSpike(0, 2 + 5 * i,z,1));
    [0, .5, 0, .5, 0].forEach((z, i) => this.addSpike(0, 3 + 5 * i,z,1));
    [.5,0, .5, 0, .5].forEach((z, i) => this.addSpike(0, 4 + 5 * i,z,1));

    this.text="Spikes can move at different rates, dont be afraid, run for it!"
    this.help="Not bad young demon!"
    this.addKey(0, 15);
    this.tileCol1= "#944E63";
    this.tileCol2= "#CAA6A6";

  // LEVEL 06
  } else if(no==5) { // LEVEL 1
    this.addKey(3, 5);
    this.text=" Things are heating up and I hear you have Pyrophobia?"
    this.help="Have I met my match..."
    this.tileCol1= "#5EB7B7";
    this.tileCol2= "#96D1C7";
    this.t2="#FC7978";
    this.blkColr="#FFAFB0";
    [7,8].map(n=>this.addFire(0,n));
    [[1,17],[1,18],[2,20],[3,10],[3,5]].map(a=>this.addPlat(...a));


  // LEVEL 07
  } else if(no==6) {
    this.addKey(3, 4);
    this.text="";
    this.help="";
    this.tileCol1= "#1989AC";
    this.tileCol2= "#283E56";
    this.t2="#970747";
    this.blkColr="#FEF4E8";
    [[1,17],[2,19],[3,4],[3,9]].map(a=>this.addPlat(...a));
    [[1,17,.5,.5],[2,19,0,.5]].map(a=>this.addSpike(...a));

  // LEVEL 08
  } else if(no==7) {
    this.addKey(0, 7);
    this.text="Do not fall into the void...";
    this.help="You a-voided death!";
    this.tileCol1= "#E8DED2";
    this.tileCol2= "#A3D2CA";
    this.t2="#056676";
    this.blkColr="#5EAAA8";
    [[1,26],[2,28],[3,30]].map(a=>this.addPlat(...a));
    tilesToAir(0, 4, 4, 5, this.tiles[0], this.cols);

  // LEVEL 09
  } else if(no==8) { // Narrow with jumps
    this.addKey(0, 20);
    this.text="Timing is everything!";
    this.help="You are starting to impress me.";
    this.tileCol1= "#FADFA1";
    this.tileCol2= "#FFF4EA";
    tilesToAir(0,2,2,2,this.tiles[0],this.cols);
    [4,14,24,17].map(n=>this.addSpike(0,n,1));
    tilesToAir(0,2,5,5,this.tiles[0],this.cols);
    tileToAir(18,this.tiles[0]);
    [7,27,28,8].map(n=>this.addFire(0,n,1));

  // LEVEL 10
  } else if(no==9) {
    this.text="Ok little demon, here is a bigger test!";
    this.help="Get into the portal before I make you do this one again!";
    this.addKey(0, 24);
    tilesToAir(0, 11, 2, 3, this.tiles[0], this.cols);
    [[25,.5],[26,.5],[49,0],[50,0],[73,.4],[74,.4],[85,.3],[86,.3],[97,.2],[98,.2],[109,0],[110,0]].map(a=>this.addSpike(0,a[0],a[1]));
    [[2,89],[3,65],[4,41]].map(a=>this.addPlat(a[0],a[1]));
    tilesToAir(0, 11, 5, 6, this.tiles[0], this.cols);
    [123,124,113,7,140,141].map(n=>this.addPlat(1,n));
    [32,56,80,84,104,108,95,119].map(n=>this.addFire(0,n));
    tilesToAir(0, 11, 8, 9, this.tiles[0], this.cols);
    [[120,2.2,1.5],[107,1.7,1.5],[96,1.3,1.5],[83,1,1.5]].map(a=>this.addSpike(0,a[0],a[1],a[2]));
    [47,36,23].map(n=>tileToAir(n,this.tiles[0],this.cols));
    [53,77].map(n=>tileToAir(n,this.tiles[0],this.cols));
    this.t2="#C96868";
    this.blkColr="#7EACB5";
    this.tileCol1= "#FFF4EA";
    this.tileCol2= "#7ABA7A";

  // Level 11
  } else if(no==10) { // GHOSTS
    this.text="Afraid of ghosts? Either way, stay off their current tile!";
    this.help="You might just make your 13th birthday...";
    this.t2="#8967B3";
    this.blkColr="#CB80AB";
    this.tileCol1= "#680097";
    this.tileCol2= "#7ABA7A";
    this.addKey(0, 59);
    // GHOST Level, Begin Tile, Start Tile, End Tile
    [[83,83,3],[64,84,4],[45,85,5],[26,86,6],[7,87,7],[10,90,10],[31,91,11],[52,92,12],[73,93,13],[94,94,14]].map(a=>this.addGhost(0,...a));
    [8,28,48,68,88].map(n=>this.addPlat(1,n));
    tilesToAir(0,4,15,15,this.tiles[0],this.cols);
    [95,75,55,35,15].map(n=>this.addSpike(0,n,0));
    [97,77,57,37,17].map(n=>this.addSpike(0,n,.6,.3));

  } else if(no==11) { // LEVLEL 12
    this.text="Ok another challenge little demon!";
    this.help="Well done!!!";
    this.t2="#8967B3";
    this.blkColr="#CB80AB";
    this.tileCol1= "#944E63";
    this.tileCol2= "#CAA6A6";
    this.addKey(0, 45);
    tilesToAir(2,3,0,4,this.tiles[0],this.cols);
    [62,72,51,52,57,36,78,68,6,8,10,16,17,18,19,20,26,27,28,30,89,67,77,88,100,90,98,80,70,37,47].map(n=>tileToAir(n,this.tiles[0],this.cols));
    [[0,12,0],[0,2,0],[0,14,.2],[0,4,.2],[0,87,.2],[0,97,.2],[0,42,.3],[0,44,.7,.4],[2,92,.5],[2,82,.5]].map(a=>this.addSpike(...a));
    [1,7,9,79,96,86,[2,99],[2,94],[2,84],[2,82],[2,92]].map(a=>Array.isArray(a)?this.addPlat(...a):this.addPlat(1,a));
    tilesToAir(5,9,2,5,this.tiles[0],this.cols);
    [46,43].map(n=>this.addFire(0,n));
    [[0,37,37,40],[0,58,58,60]].map(a=>this.addGhost(...a));
  } else if(no==12) { // END
    this.text="You have over come your fears and made it to the final room!";
    this.help="I knew you could do it!";
    this.t2="#8E7AB5";
    this.blkColr="#FFEBD4";
    this.tileCol1= "#FF8C9E";
    this.tileCol2= "#FF4E88";
    this.addSpike(0,13,0);
    this.addSpike(0,14,0);
    this.addSpike(0,8,0);
    this.addSpike(0,2,0);
    this.addSpike(0,1,0);
    this.addSpike(0,15,.3);
    this.addSpike(0,9,.3);
    this.addSpike(0,3,.3);
    this.addSpike(0,16,.6);
    this.addSpike(0,10,.6);
    this.addSpike(0,4,.6);
    this.addFire(0,5);
    this.addFire(0,11);
    this.addFire(0,17);
    this.addSpike(0,12,.4);
    this.addSpike(0,18,.6);
    this.addSpike(0,24,.8);
    tilesToAir(3, 3, 0, 4, this.tiles[0], this.cols);
    this.addPlat(1,35);
    this.addPlat(2,33);
    this.addFire(0,34);
    tileToAir(32,this.tiles[0]);
    tileToAir(26,this.tiles[0]);
    tileToAir(29 ,this.tiles[0]);
    tileToAir(27 ,this.tiles[0]);
    tileToAir(25 ,this.tiles[0]);
    tileToAir(28 ,this.tiles[0]);
    this.addPlat(4,19);
    this.addPlat(3,31);
    this.addKey(4, 19);

  } else if(no==13) { // END
    this.text="Thank you for playing! Huge Thank you to Andrzej Mazur, Michal Chojnacki and everyone at JS13k Slack <3";
    this.help="....";
    this.t2="#8967B3";
    this.blkColr="#CB80AB";
    this.tileCol1= "#9FEED1";
    this.tileCol2= "#F60C86";
    [[8,.6],[14,.4],[9,.4],[20,.2],[15,.2],[10,.2],[26,0],[21,0],[11,0],[16,0],[27,.2],[22,.2],[27,.2],[17,.2],[28,.4],[23,.4],[29,.6]].map(a=>this.addSpike(0,...a));
    [1,6,36,31].map(n=>this.addPlat(1,n));
  }

  this.update = function(delta){
    //this.tiles.forEach(e => e.sx=16);
    // if(this.hero.curTile != null){
    //   this.hero.curTile.sx=49;
    // }
    this.time+=delta;

    this.tiles.forEach((t) => {
      t.forEach((e) => {
        if(cart.hero.hasKey && this.done && e.lvl > 0){
          if(e.type==types.TILE2){
            e.fly=true;
          } else {
            e.type=types.AIR;
            e.setType();
          }
        }
        if(e.type != types.STOP && e.type != types.AIR){
          if(e.type==types.TILE2){
            for(l = e.lvl; l > 0; l--){
              drawblock(e.x, e.y+33+(l*33), 128, 64, this.blkColr, false);
            }
            if(!e.fly&&e.type!=types.AIR) drawIsoTile(this.t2,this.t2, e.row, e.col, this.time, cart.trans,(e.lvl*33)); // DRAW TILE2
          }
          // calculateZ (x, y, amplitude, wavelength, frequency, time)
          if(cart.trans&&e.type!=types.TILE2)e.z=calculateZ(e.x, e.y, 5, 20, .3, this.time);
          if(e.lvl==0&&e.type!=types.AIR) drawIsoTile(this.tileCol1,this.tileCol2, e.row, e.col, this.time, cart.trans);
          e.update(delta);
        };
        // Draw traps
        if(e.obj!=null){
          e.obj.update(delta);
        }
      });
    });

    this.mobs.forEach(e => e.update(delta));
  }
}
