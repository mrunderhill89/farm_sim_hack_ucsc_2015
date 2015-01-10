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
            var defaults = this.get('plant_defaults');
            var diff = (Math.min(
                            (defaults.min - soil_value)
                            *(soil_value - defaults.max),
                        0)
                        *defaults.multiplier) 
                    + defaults.constant;
            return Math.max(health + diff, 0);
        }
    });
    return Nutrient;
});