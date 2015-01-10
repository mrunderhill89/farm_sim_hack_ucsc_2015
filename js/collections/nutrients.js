define(['backbone', 'models/nutrient'],function(Backbone, Nutrient){
    var Nutrients = Backbone.Collection.extend({
        url: '/', //Not using a server yet.
        model: Nutrient,
    });
    Nutrients.default = new Nutrients()
    .set("ph", new Nutrient({
        plant_defaults:{
        },
        soil_defaults:{
        }
    }))
    return Nutrients;
});