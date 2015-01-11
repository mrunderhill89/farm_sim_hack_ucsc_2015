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
            var garden = (params && params.garden) || new Garden().fill(5,5);
            var plants = new Plants();
            this.set('garden', garden);
            this.set('plants', plants);
            var sample_plant = new Plant();
            garden.first().set("plant", sample_plant);
            plants.add(sample_plant);
        },
        update: function(time){
            this.get('garden').each(function(soil){soil.update(time)});
        }
    });
    return Environment;
});