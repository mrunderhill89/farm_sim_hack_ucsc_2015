define(['backbone'],function(Backbone){
    var Soil = Backbone.Model.extend({
        defaults : {
            water: 0,
            ph: 7.0,
            feed: 0
        },
        initialize: function(params){
        },
        update: function(time){
        }
    });
    return Soil;
});