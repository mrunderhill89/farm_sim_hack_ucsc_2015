define(['underscore', 'backbone'],function(_, Backbone){
    var Nutrient = Backbone.Model.extend({
        initialize:function(params){
            this.name = params.name || "unnamed";
            this.set("plant_defaults", _.defaults((params && params.plant_defaults)||{}, 
            {
                min: 0.0,
                max: 1.0,
                multiplier: 0.01,
                constant: 0.1,
                drain: 0.1
            }));
            this.set("soil_defaults", _.defaults((params && params.soil_defaults)||{}, 
            {
                min: 0.0,
                max: 1.0
            }));
        },
        default_calculate: function(plant, soil, time){
            /*  For now, the default health function
                is a simple parabolic equation, automatically
                scaled from the vertex height to whatever the user 
                put in for the multiplier. Different plants can 
                replace this function for more accuracy.
            */
            var soil_value = soil.get(this.name);
            var defaults = this.get('plant_defaults');
            var scale = defaults.multiplier / Math.pow((defaults.min - defaults.max)/2,2);
            var d_health = ((defaults.min - soil_value)
                       *(soil_value - defaults.max)
                        *scale) 
                    + defaults.constant;
            var health = Math.max(plant.get("health")+d_health,0);
            plant.set("health", health);
            var drain = (defaults.drain * Math.sqrt(health));
            soil.set(this.name, Math.max(soil_value-drain,0));
        }
    });
    return Nutrient;
});