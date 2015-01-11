define(['underscore','backbone_associations','models/plant', 'collections/nutrients'],function(_, Backbone,Plant,Nutrients){
    var Soil = Backbone.AssociatedModel.extend({
        defaults : {
            plant: null
        },
        relations:[
            {
                type:Backbone.One,
                key:'plant',
                relatedModel:function(){ return require("models/plant");}
            },
        ],
        initialize: function(params){
            _.each(Nutrients.defaults, function(nutrient){
                var defaults = nutrient.get("soil_defaults");
                var value = _.random(defaults.min, defaults.max);
                this.set(nutrient.get("name"), value);
            }.bind(this));
        },
        update: function(time){
            var plant = this.get("plant");
            if (plant){
                plant.draw_soil(time,this);
            }
        },
        toString: function(){
            return _.reduce(Nutrients.defaults, function(string, nutrient){
                var name = nutrient.get("name");
                if (!name) return string;
                return string.concat("\n" + nutrient.get("name") + ":" + this.get(name));
            }.bind(this),"")
        }
    });
    return Soil;
});