define(['backbone'],function(Backbone){
    var Plant = Backbone.Model.extend({
        defaults : {
            species: "Unnamed",
            health: 100.0,
            ph_ideal: 7.0,
            ph_tolerance: 10.0,
            ph_ideal_regen: 0.1
        },
        draw_soil: function(time, soil){
            var health = this.get("health");
            var ph_diff = (Math.abs(this.get("ph_ideal") - soil.get("ph")))/this.get("ph_tolerance") - this.get("ph_ideal_regen");
            this.set('health', Math.max(health - (ph_diff*time),0) );
        },
        update: function(time){
        }
    });
    console.log("Loading Plant");
    return Plant;
});