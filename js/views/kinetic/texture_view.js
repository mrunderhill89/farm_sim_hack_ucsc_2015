define(['bacon','underscore', 'backbone', 'kinetic', 'views/kinetic/sprite_view'], function(Bacon, _, Backbone, Kinetic, SpriteView){
    var TextureView = SpriteView.extend({
        src : "",
        initialize: function(params){
            this.streams = {
                new_stream: new Bacon.Bus(),
                image: new Bacon.Bus()
            };
            var image = new Image();
            image.onload = function() {
                this.stream("image").push(image);
            }.bind(this);
            image.src = params.src || this.src;
            if (this.model){
                this.model.on("change", this.update.bind(this));
            }
        },
        render: function(){
            this.sprite = this.sprite || new Kinetic.Rect({
                x: this.x,
                y: this.y,
                width: Math.min(64,this.width),
                height:Math.min(64,this.height),
                fill: 'magenta',
                stroke: 'black',
                strokeWidth: 4
            });
            this.stream("image").onValue(function(image){
                if (this.sprite){
                    var textured_sprite = new Kinetic.Image({
                      x: this.x,
                      y: this.y,
                      image: image,
                      width: this.width+8,
                      height: this.height+8
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
    return TextureView;
})