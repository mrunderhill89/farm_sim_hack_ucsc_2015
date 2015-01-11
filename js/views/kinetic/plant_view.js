define(['kinetic', 'views/kinetic/texture_view', 'models/plant'], function(Kinetic, TextureView, Plant){
    var PlantView = TextureView.extend({
        src: "img/lettuce_256px.png",
        update: function(model, options){
            var scale = 0.25 + (model.get("health")*0.0075);
            if (this.sprite){
                this.sprite.scale({x:scale,y:scale});
                this.sprite.draw();
            }
        },
        render: function(){
            var plant = this.model;
            var first_tile = plant.get("footprint").first();
            this.x = (64 * first_tile.get("x"))+32;
            this.y = (64 * first_tile.get("y"))+32;
            this.sprite = new Kinetic.Circle({
                x: this.x,
                y: this.y,
                radius: 32,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4
            });
            this.stream("image").onValue(function(image){
                if (this.sprite){
                    var textured_sprite = new Kinetic.Image({
                      x: this.x,
                      y: this.y,
                      offsetX:32,
                      offsetY:32,
                      image: image,
                      width: 64,
                      height: 64
                    });
                    this.sprite.getParent().add(textured_sprite);
                    this.sprite.destroy();
                    this.sprite = textured_sprite;
                    this.stream("click","mouseup");
                    this.stream("over","mouseover");
                    this.stream("out","mouseout");
                }
            }.bind(this));
            return this;
        }
    });
    return PlantView;
})