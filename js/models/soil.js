define(['backbone_associations','models/plant'],function(Backbone,Plant){
    var Soil = Backbone.AssociatedModel.extend({
        defaults : {
            water: 0,
            ph: 7.0,
            feed: 0,
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
            this.on('change:plant', function(tile, plant){
                var prev = tile.get("plant");
                if (prev){
                    prev.get("footprint").remove(tile);
                }
                plant.get("footprint").add(tile);
            });
        },
        update: function(time){
        }
    });
    return Soil;
});