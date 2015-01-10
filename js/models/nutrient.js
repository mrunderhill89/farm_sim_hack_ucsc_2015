define(['underscore', 'backbone'],function(_, Backbone){
    var Nutrient = Backbone.Model.extend({
        initialize:function(params){
            this.plant_defaults = _.defaults((params && params.plant_defaults), 
            {
                min: 0.0,
                max: 1.0,
                multiplier: 1.0,
                constant: 0.0
            });
            this.soil_defaults = _.defaults((params && params.soil_defaults), 
            {
                min: 0.0,
                max: 1.0,
                multiplier: 1.0,
                constant: 0.0
            });
        },
        default_calculate: function(health, soil_value){
            /*  For now, the default health function
                is a simple parabolic equation, automatically
                scaled from the vertex height to whatever the user 
                put in for the multiplier. Different plants can 
                replace this function for more accuracy.
            */
            var defaults = this.get('plant_defaults');
            var scale = defaults.multiplier / Math.pow((defaults.min - defaults.max)/2,2);
            var diff = ((defaults.min - soil_value)
                       *(soil_value - defaults.max)
                        *scale) 
                    + defaults.constant;
            return Math.max(health + diff, 0);
        }
    });
    return Nutrient;
});