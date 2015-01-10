define(['underscore','backbone', 'collections/nutrients'],function(_,Backbone, Nutrients){
    var Plant = Backbone.Model.extend({
        defaults : _.extend(plant_defaults, {
            health: 100.0,
            species:"Unnamed"
        }),
        update: function(time){
        }
    });
    console.log("Loading Plant");
    return Plant;
});