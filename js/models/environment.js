/**
 * Created by Artemis on 1/9/2015.
 */
define(['backbone', 'collections/garden', 'collections/plants'],function(Backbone, Garden, Plants){
    var Environment = Backbone.Model.extend({
        defaults : {
            humidity: 0,
            temperature: 65
        },
        initialize: function(params){
            this.set('garden', (params && params.garden) || new Garden().fill(5,5));
            this.set('plants', new Plants());
        },
        update: function(time){
            this.get('garden').each(function(soil){soil.update(time)});
        }
    });
    return Environment;
});