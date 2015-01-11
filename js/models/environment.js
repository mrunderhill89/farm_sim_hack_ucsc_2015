/**
 * Created by Artemis on 1/9/2015.
 */
define(['backbone', 'collections/garden', 'collections/plants', 'models/plant'],function(Backbone, Garden, Plants, Plant){
    var Environment = Backbone.Model.extend({
        defaults : {
            humidity: 0,
            temperature: 65
        },
        initialize: function(params){
            var garden = new Garden();
            var width = (params && params.width) || 5;
            var height = (params && params.height) || 5;
            garden.fill(width, height);
            var plants = new Plants();
            this.set('garden', garden);
            this.set('plants', plants);
        },
        update: function(time){
            this.get('garden').each(function(soil){soil.update(time)});
        }
    });
    return Environment;
});