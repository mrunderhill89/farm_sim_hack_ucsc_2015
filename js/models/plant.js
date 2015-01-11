define(['underscore','backbone_associations', 'collections/nutrients', 'models/soil'],function(_,Backbone, Nutrients, Soil){
    var Plant = Backbone.AssociatedModel.extend({
        defaults : {
            health: 100.0,
            species:"Unnamed",
            calculate_nutrient: {},
            footprint: []
        },
        relations:[
            {
                type:Backbone.Many,
                key:'footprint',
                relatedModel:function(){ return require("models/soil");}
            },
        ],
        draw_soil: function(time, soil){
            _.each(Nutrients.defaults, function(nutrient){
                if(this.get("calculate_nutrient")[name]){
                    this.calculate_nutrient[name](this, soil, time);
                } else {
                    nutrient.default_calculate(this, soil, time);
                }
            }.bind(this));
            /*
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
            */
        },
        update: function(time){
        },
        toString:function(){
            return "Plant#"+this.cid+"\n"+this.get("health")
                +"\n"+this.get("footprint").reduce(function(string, soil){return string.concat(soil.toString());},"");
        }
    });
    return Plant;
});