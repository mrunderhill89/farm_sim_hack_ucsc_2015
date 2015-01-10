define(['kinetic', 'views/kinetic/sprite_view', 'models/soil'], function(Kinetic, SpriteView, Soil){
    var SoilView = SpriteView.extend({
        width:  64,
        height: 64,
        render: function(){
            var soil = this.model;
            var x = this.width * soil.get("x");
            var y = this.width * soil.get("y");
            this.sprite = new Kinetic.Rect({
                x: x,
                y: y,
                width: this.width,
                height: this.height,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4
            });
            //Do other graphics tweaks here.
            return this.sprite;
        }
    });
    return SoilView;
})