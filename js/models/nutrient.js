define(['underscore', 'backbone'],function(_, Backbone){
    var Nutrient = Backbone.Model.extend({
        defaults:{
            plant_defaults: {
                ideal: 0.0,
                min_limit: -1.0,
                max_limit: 1.0,
                multiplier: 1.0,
                regen: 1.0
            },
            soil_defaults: {
            }
        },
        default_calculate: function(health, soil_value){
        }
    });
    return Nutrient;
});