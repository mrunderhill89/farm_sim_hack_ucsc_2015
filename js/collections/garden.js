define(['backbone', 'model/soil'],function(Backbone, Soil){
    var Garden = Backbone.Collection.extend({
        url: '/', //Not using a server yet.
        model: Soil
    });
    return Garden;
});