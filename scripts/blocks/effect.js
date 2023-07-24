const core-micro = extend(CoreBlock, "core-micro", {
canPlaceOn(tile, team, rotation){
        return true;
    },
    canReplace(other){
    if(other instanceof CoreBlock) return false;
    return this.super$canReplace(other);
},
    canBreak(tile){
    	return true;
    },
    setStats(){
this.super$setStats();
if(this.canBeBuilt() && this.requirements.length > 0){
this.stats.add(Stat.buildTime, this.buildCost / 60, StatUnit.seconds);
        }
    }
});