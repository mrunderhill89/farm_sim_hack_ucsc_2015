/**
 * Created by Artemis on 1/9/2015.
 */
define(['backbone'],function(Backbone){
    var Environment = Backbone.Model.extend({
        defaults : {
            humidity: 0,
            temperature: 65
        },
        update: function(time){
        }
    });
    return Environment;
});