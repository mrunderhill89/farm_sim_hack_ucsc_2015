define(['underscore', 'controllers/behavior_tree'],function(_, BT){
    function MenuControl(params){
        var root = BT.lock(1);
        root.child(
            BT.repeatUntil(false).child(
                BT.map(true).child(
                    BT.select().log("Select").child(
                        //Add Plant
                        BT.sequence().child(
                            BT.map_stream(params.menu_click, function(name){
                                return (name === "add_plant");
                            })
                        ).child(
                            BT.repeatUntil(true).child(
                                BT.para_sequence().log("Para-Sequence").child(
                                    BT.sequence().log("Add Plant").child(
                                        BT.map_stream(params.soil_click, function(e){
                                            return true;
                                        })
                                    ).child(
                                        new BT(function(){
                                            this.result(true);
                                        })
                                    )
                                ).child(
                                    BT.map_stream(params.menu_click, function(name){
                                        return (name === "add_plant");
                                    }).log("Exit Menu")
                                )
                            )
                        )
                    )
                )
            )
        );
        return root;
    }
    return MenuControl;
})