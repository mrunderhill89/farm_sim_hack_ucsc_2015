define(['underscore','backbone', 'models/soil'],function(_, Backbone, Soil){
    var Garden = Backbone.Collection.extend({
        url: '/', //Not using a server yet.
        model: Soil,
        initialize: function(params){
            this.grid = [];
        },
        fill: function(width,height,soil_params){
            for(x = 0; x < width || 0; x++){
                for(y = 0; y < height || 0; y++){
                    var data = _.extend(soil_params || {},{x:x, y:y});
                    var new_soil  = new Soil(data);
                    this.push(new_soil);
                    console.log(new_soil);
                }
            }
            return this;
        },
        set_grid: function(x,y,model){
            if (!this.grid[x]){
                this.grid[x] = [];
            }
            this.grid[x][y] = model;
        },
        save: function(){},
        load: function(){},
        fetch: function(){}                                            
    });
    return Garden;
});