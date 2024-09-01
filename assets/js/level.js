function Level(no=0) {
  // setup tiles
  this.rows = 10;
  this.cols = 10
  this.tiles=[];
  this.mobs=[];
  this.redraw=[];
  this.time=0;

  let id =0;
  let tt=[];

  if(no==0){
    this.rows = 5;
    this.cols = 4;
  } else if(no==1){
    this.rows = 6;
    this.cols = 6;
  }

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

  this.addSpike = function(l, id){
    t=this.tiles[l][id-1];
    t.obj=new Spike(t.x+90, t.y+4, id);
  }

  this.addKey = function(l, id){
    t=this.tiles[l][id-1];
    t.obj=new Key(t.x+70, t.y-4, l, id);
  }

  this.addFire = function(l, id){
    t=this.tiles[l][id-1];
    t.obj=new Fire(t.x+80, t.y-10, l, id);
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

  // this.tileCol1= "#273746";
  // this.tileCol2= "#566573";

  if(no==0){
    this.tileCol1= "#0D7C66";
    this.tileCol2= "#41B3A2";
    this.addPlat(1,7);
    this.addPlat(1,8);
    this.addPlat(1,6);
    this.addPlat(1,2);
    this.addPlat(1,12);
    this.addPlat(2,20);
    this.addPlat(3,18);
    this.addSpike(0, 10);
    this.addKey(3, 18);
    this.addFire(0,4);
  } else if(no==1) {
    this.addKey(0, 4);
    this.tileCol1= "#273746";
    this.tileCol2= "#566573";
  } else if(no==2) {
    this.addKey(0, 4);
    this.tileCol1= "#C3C3E5";
    this.tileCol2= "#F1F0FF";
  } else if(no==3) {
    this.addKey(0, 4);
    this.tileCol1= "#028482";
    this.tileCol2= "#7ABA7A";
  }

  // Add Fire, Spike and Ghost
  //this.mobs.push(new Spike(-128, 192));
  //this.mobs.push(new Fire(84, 110));
  //this.mobs.push(new Ghost(84, 200));

  this.update = function(delta){
    this.tiles.forEach(e => e.sx=16);
    // if(this.hero.curTile != null){
    //   this.hero.curTile.sx=49;
    // }
    this.time+=delta;

    this.tiles.forEach((t) => {
      t.forEach((e) => {
        if(cart.hero.hasKey && e.lvl > 0) return; // No need to draw other layers
        if(e.type != types.STOP && e.type != types.AIR){
          if(e.type==types.TILE2){
            for(l = e.lvl; l > 0; l--){
              drawblock(e.x, e.y+33+(l*33), 128, 64, "#006769", false);
            }
          }
          e.z=0;
          // calculateZ (x, y, amplitude, wavelength, frequency, time)
          if(cart.hero.hasKey&&!shrinking)e.z=calculateZ(e.x, e.y, 5, 20, .3, this.time);
          if(e.lvl==0) drawIsoTile(this.tileCol1,this.tileCol2, e.row, e.col, this.time, cart.hero.hasKey&&!shrinking);
          e.update(delta)
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
