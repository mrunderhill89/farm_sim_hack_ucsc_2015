define(['underscore','backbone', 'models/nutrient'],function(_,Backbone, nutrients){
    var plant_defaults = _.reduce(nutrients, function(memo, values, name){
        _.each(values, function(value,key){
            memo[name+"_"+key] = value
        })
        return memo;
    }, {});
    var Plant = Backbone.Model.extend({
        defaults : _.extend(plant_defaults, {
            health: 100.0,
            species:"Unnamed"
        }),
        draw_soil: function(time, soil){
            this.set('health', _.reduce(_.keys(nutrients), function(health, nutrient){
                return this.calculate_nutrient(nutrient, soil[nutrient], health);
            }.bind(this), this.get('health')));
        },
        calculate_nutrient: function(nutrient, value, health){
            return health;
        },
        update: function(time){
        }
    });
    console.log("Loading Plant");
    return Plant;
});