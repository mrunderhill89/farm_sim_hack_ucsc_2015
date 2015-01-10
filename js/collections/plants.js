define(['underscore','backbone', 'models/plant'],function(_, Backbone, Plant){
    var Plants = Backbone.Collection.extend({
        url: '/', //Not using a server yet.
        model: Plant,
    });
    return Plants;
});