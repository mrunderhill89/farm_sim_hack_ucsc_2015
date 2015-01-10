define(['backbone'],function(Backbone){
    var Soil = Backbone.Model.extend({
        defaults : {
            plant: null,
            water: 0,
            ph: 7.0,
            feed: 0
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