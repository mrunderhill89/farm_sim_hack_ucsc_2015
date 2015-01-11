define(['underscore','backbone', 'models/nutrient'],function(_,Backbone, Nutrient){
    var Nutrients = Backbone.Collection.extend({
        model: Nutrient,
    });
    var defaultNutrients = {
        ph : new Nutrient({
            name:"ph",
            plant_defaults:{
                min:6.80,
                max:7.20,
                multiplier:0.001,
                drain:0.0
            },
            soil_defaults:{
                min:6.40,
                max:7.60
            }
        }),
        water: new Nutrient({
            name:"water",
            plant_defaults:{
                min:60.0,
                max:90.0,
                multiplier:0.1,
                drain:0.02
            },
            soil_defaults:{
                min: 20.0,
                max: 80.0
            }
        })
    };
    return {class: Nutrients, defaults: defaultNutrients};
});