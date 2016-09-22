app.controller('ForceDirectedGraphController', function($scope, FriendshipService){
        var color = d3.scale.category20()
        $scope.options = {
            chart: {
                type: 'forceDirectedGraph',
                height: 450,
                width: (function(){ return nv.utils.windowSize().width - 850 })(),
                margin:{top: 20, right: 20, bottom: 20, left: 20},
                color: function(d){
                    return color(d.group)
                },
                nodeExtras: function(node) {
                    node && node
                      .append("text")
                      .attr("dx", 8)
                      .attr("dy", ".35em")
                      .text(function(d) { return d.name })
                      .style('font-size', '10px');
                }
            }
        };


        FriendshipService.getGraphByScrapeId(1).then(function(graph){
            // $scope.data = graph
            console.log(graph)
        })

        $scope.data = {
            links: [],
            nodes: []
        }
    })