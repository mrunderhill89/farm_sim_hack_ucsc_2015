define(['backbone'],function(Backbone){
    var Plant = Backbone.Model.extend({
        defaults : {
            species: "Unnamed",
            health: 100.0,
            ideal_ph: 7.0
        },
        draw_soil: function(time, soil){
            var health = this.get("health");
            var ph_diff = Math.abs(this.get("ideal_ph") - soil.get("ph"));
            this.set('health', Math.max(health - (ph_diff*time),0) );            
        },
        update: function(time){
        }
    });
    console.log("Loading Plant");
    return Plant;
});