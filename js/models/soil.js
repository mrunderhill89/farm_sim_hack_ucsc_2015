define(['backbone'],function(Backbone){
    var Soil = Backbone.Model.extend({
        defaults : {
            plant: null,
            water: 0,
            ph: 7.0,
            feed: 0
        },
        initialize: function(params){
            this.on("change:plant", function(next,last){
                if (last){
                    last.set("footprint", last.get("footprint")-1);
                }
                if (next){
                    next.set("footprint", next.get("footprint")+1);
                }
            });
        },
        update: function(time){
            var plant = this.get("plant");
            if (plant){
                plant.draw_soil(time, this);
            }
        }
    });
    return Soil;
});