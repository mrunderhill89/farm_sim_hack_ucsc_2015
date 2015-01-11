define(['bacon','kinetic', 'views/kinetic/texture_view', 'models/soil'], function(Bacon, Kinetic, TextureView, Soil){
    var SoilView = TextureView.extend({
        width:  64,
        height: 64,
        initialize: function(params){
            this.streams = {
                new_stream: new Bacon.Bus(),
                image: new Bacon.Bus()
            };
            var image = new Image();
            image.onload = function() {
                console.log("image loaded");
                this.stream("image").push(image);
            }.bind(this)
            image.src = params.src || "img/land_256px.png";
            if (this.model){
                this.model.on("change", this.update.bind(this));
            }
            this.x = this.model.get("x") * this.width;
            this.y = this.model.get("y") * this.height;
        }
    });
    return SoilView;
})