define(['bacon','underscore'],function(Bacon,_){
    function BehaviorTree(run){
        _.extend(this, {
            parent: null,
            children : [],
            streams : {
                child: new Bacon.Bus(),
                results: new Bacon.Bus(),
                run: new Bacon.Bus()
            },
            name: name || "node"
        });
        var bound_run = run.bind(this);
        this.streams.run.debounce(2).onValue(bound_run);
        return this;
    };
    _.extend(BehaviorTree, {
        prototype: _.extend(BehaviorTree.prototype,{
            run: function(params){this.streams.run.push(params);},
            run_child: function(i, params, callback){
                var child = this.children[i];
                if (callback){
                    child.onResult(callback);
                }
                child.run(params);
                this.streams.child.push({
                    child:child,
                    i:i
                });
                return child;
            },
            result: function(value){this.streams.results.push(value);},
            onResult: function(f){
                this.streams.results.onValue(f);
                return this;
            },
            child: function(run){
                var child = new BehaviorTree(run);
                child.parent = this;
                this.children.push(child);
                return child;
            },
            leaf: function(run){
                this.child(run);
                return this;
            },
            log: function(name){
                this.streams.run.onValue(function(){
                    console.log(name+".start:"+arguments);
                });
                this.streams.child.onValue(function(p){
                    console.log(name+".child:"+p.i);
                });
                this.onResult(function(f){
                    console.log(name+".result:"+f);
                });
                return this;
            }
        }),
        sequence: function(params, index){
            var i = index || 0;
            if (i >= this.children.length){
                this.result(true);
            } else {
                this.run_child(i,params,function(result){
                    if (result == false){
                        this.result(false);
                    } else {
                        BehaviorTree.sequence.bind(this)(params, i+1);
                    }
                    return Bacon.noMore;
                }.bind(this));
            }
        },
        select: function(params, index){
            var i = index || 0;
            if (i >= this.children.length){
                this.result(false);
            } else {
                    this.run_child(i,params,function(result){
                    if (result == true){
                        this.result(true);
                    } else {
                        BehaviorTree.select.bind(this)(params, i+1);
                    }
                    return Bacon.noMore;
                }.bind(this));
            }
        },
        para_sequence: function(params){
            var count = this.children.length;
            var keys = _.map(this.children, function(child){
                return child.streams.results.onValue(function(result,id){
                    if (result){
                        count--;
                        if (count <= 0){
                            this.result(true);
                        }
                    } else {
                        _.each(keys, function(unsub){
                            unsub();
                        });
                        this.result(false);
                    }
                    return Bacon.noMore;
                }.bind(this))
            }.bind(this))
            _.each(this.children, function(child){child.run(params)});
        },
        para_select: function(params){
            var count = this.children.length;
            var keys = _.map(this.children, function(child){
                return child.streams.results.onValue(function(result,id){
                    if (!result){
                        count--;
                        if (count <= 0){
                            this.result(false);
                        }
                    } else {
                        _.each(keys, function(unsub){
                            unsub();
                        });
                        this.result(true);
                    }
                    return Bacon.noMore;
                }.bind(this))
            }.bind(this))
            _.each(this.children, function(child){child.run(params)});
        },
        check: function(test){
            return function(){
                var result = _.isFunction(test)? test(arguments):test;
                this.result(result);
            }
        },
        constant: function(result){
            return function(params){
                if (this.children.length > 0){
                    this.run_child(0, params, function(){
                        this.result(result);
                    }.bind(this));
                }
            }
        },
        wait_for: function(stream, test){
            return function(){
                stream.onValue(function(params){
                    var result = _.isFunction(test)? test(params):test;
                    this.result(result);
                    return Bacon.noMore;
                }.bind(this));
            }
        },
        run_lock: function(times){
            return function(params){
                this.runs = this.runs || 0;
                if (this.runs <= times && this.children.length > 0){
                    console.log(this.runs+"+");
                    this.runs++;
                    this.run_child(0,params, function(result){
                        this.runs = Math.max(this.runs-1,0);
                        console.log(this.runs+"-");
                        this.result(result);
                    }.bind(this));
                } else {
                    console.warn("run_lock is over limit:"+this.runs);
                }
            }
        },
        repeat_until: function(stop){
            return function(params){
                var finalResult = this.result;
                if (this.children.length > 0){
                    this.run_child(0,params,function(result){
                        console.log(result);
                        if (result == stop){
                            finalResult(true);
                            return Bacon.noMore;
                        } else {
                            this.run_child(0,params);
                        }
                    }.bind(this));
                }
            }
        }
    });
    return BehaviorTree;
});