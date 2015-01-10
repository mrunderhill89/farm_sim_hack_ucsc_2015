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
        })
    };
    return {class: Nutrients, defaults: defaultNutrients};
});