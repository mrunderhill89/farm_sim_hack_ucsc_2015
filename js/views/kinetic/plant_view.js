define(['kinetic', 'views/kinetic/sprite_view', 'models/plant'], function(Kinetic, SpriteView, Plant){
    var PlantView = SpriteView.extend({
        update: function(model, options){
            //If the soil model changes, update the sprite here.
        },
        render: function(){
            var plant = this.model;
            var first_tile = plant.get("footprint").first();
            var x = (64 * first_tile.get("x"))+32;
            var y = (64 * first_tile.get("y"))+32;
            this.sprite = new Kinetic.Circle({
                x: x,
                y: y,
                radius: 32,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4
            });
            console.log(this.sprite);
            return this;
        }
    });
    return PlantView;
})