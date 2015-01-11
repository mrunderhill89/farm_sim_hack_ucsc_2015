define(['underscore','backbone', 'models/nutrient'],function(_,Backbone, Nutrient){
    var Nutrients = Backbone.Collection.extend({
        model: Nutrient,
    });
    var defaultNutrients = {
        ph : new Nutrient({
            plant_defaults:{
                min:6.8,
                max:7.2,
                multiplier:0.1
            }
        }),
        water: new Nutrient({
            plant_defaults:{
                min:0.2,
                max:0.8,
                multiplier:0.3
            }
        })
    };
    return {class: Nutrients, defaults: defaultNutrients};
});