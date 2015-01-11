define(['kinetic', 'views/kinetic/sprite_view', 'models/soil'], function(Kinetic, SpriteView, Soil){
    var SoilView = SpriteView.extend({
        width:  64,
        height: 64,
        update: function(model, options){
            //If the soil model changes, update the sprite here.
        },
        render: function(){
            var soil = this.model;
            var x = this.width * soil.get("x");
            var y = this.width * soil.get("y");
            this.sprite = new Kinetic.Rect({
                x: x,
                y: y,
                width: this.width,
                height: this.height,
                fill: 'brown',
                stroke: 'black',
                strokeWidth: 2
            });
            this.stream("click","mousedown");
            this.stream("over", "mouseover").onValue(function(e){
                e.target.fill('yellow');
                e.target.draw();
            });
            this.stream("out", "mouseout").onValue(function(e){
                e.target.fill('brown');
                e.target.draw();
            });
            //Do other graphics tweaks here.
            return this;
        }
    });
    return SoilView;
})