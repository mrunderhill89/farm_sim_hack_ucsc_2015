define(['backbone'],function(Backbone){
    var Plant = Backbone.Model.extend({
        defaults : {
            species: "Unnamed",
            health: 1.0
        },
        update: function(time){
        }
    });
    return Plant;
});