define(['underscore','backbone', 'collections/nutrients'],function(_,Backbone, Nutrients){
    var Plant = Backbone.Model.extend({
        defaults : {
            health: 100.0,
            species:"Unnamed",
            calculate_nutrient: {}
        },
        draw_soil: function(time, soil){
            var health = _.reduce(Nutrients.defaults,
                function(health, nutrient, name){
                    var soil_value = soil.get(name) || 0.0;
                    if(this.get("calculate_nutrient")[name]){
                        return this.calculate_nutrient[name](health, soil_value);
                    } else {
                        return nutrient.default_calculate(health, soil_value);
                    }
                }.bind(this),
                this.get("health"));
            this.set("health", health);
        },
        update: function(time){
        }
    });
    return Plant;
});