package kiky5.world.blocks.defense;
import kiky5.content.*;
import mindustry.world.blocks.defense.*;
import arc.math.*;
import arc.util.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import static arc.Core.atlas;
import static mindustry.Vars.state;
import static mindustry.Vars.tilesize;
public class ConnectWall extends Wall {
    public TextureRegion sideRegion, edgeRegion;
    @Override
    public void load(){
        super.load();
        sideRegion = atlas.find(name + "-side");
        edgeRegion = atlas.find(name + "-edge");
    }
    public class ConnectWallBuild extends WallBuild {
        public void drawSide(float x, float y, int r){
            Draw.rect(sideRegion, x, y, size * Draw.scl * Draw.xscl * 32f, size * Draw.scl * Draw.yscl * Mathf.sign(r == 0 || r == 3) * 32f,r * 90f);
        }

        public boolean sideValid(int r){
            return nearby(r) != null && nearby(r).block == block;
        }
        @Override
        public void draw(){
            Draw.rect(region, x, y);
            for(int i = 0; i < 4; i++){
                if(sideValid(i)) drawSide(x, y, i);
            }
            if(sideValid(0) && sideValid(3)) Draw.rect(edgeRegion, x, y);
            if(sideValid(1) && sideValid(2)) Draw.rect(edgeRegion, x, y, 180f);

            if(flashHit){
                if(hit < 0.0001f) return;

                Draw.color(flashColor);
                Draw.alpha(hit * 0.5f);
                Draw.blend(Blending.additive);
                Fill.rect(x, y, tilesize * size, tilesize * size);
                Draw.blend();
                Draw.reset();

                if(!state.isPaused()){
                    hit = Mathf.clamp(hit - Time.delta / 10f);
                }
            }
        }
    }
}