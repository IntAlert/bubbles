app.factory('D3GraphOptionsService', function() {

	var color = d3.scale.category20()
    var template = {
        chart: {
            type: 'forceDirectedGraph',
            height: (function(){ return nv.utils.windowSize().height - 300 })(),
            // width: (function(){ return nv.utils.windowSize().width / 2 - 20 })(),
            margin:{top: 20, right: 20, bottom: 20, left: 20},
            color: function(d){
                return color(d.group)
            },
            charge: -500,
            linkDist: 100,
            linkExtras: function(links) {

            	links[0].forEach(function(link){

            		if (link.__data__.source.filteredOutByTag || link.__data__.target.filteredOutByTag) {
            			link.style.opacity = 0	
            		} else {
            			link.style.opacity = 1
            		}
            		
            	})
            },
            nodeExtras: function(node) {
            	
            	node.style('opacity', function(d){
            		if(d.filteredOutByTag) return '0.2';
            		else return '1';
            	})
            	

                node
                  .append("text")
	                  .attr("dx", 8)
	                  .attr("dy", ".35em")
	                  .text(function(d) { return d.name })
                  .style('font-size', '17px');


				// Append images
				node.append("svg:g")
			      .attr("class", "node")
			      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			 
			  // Append a circle
				node.append("svg:circle")
			      .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
			      .style("fill", "#eee");
			 
			   
			  // Append profile image
				node.append("svg:image")
			        .attr("xlink:href",  function(d) { 
			        	var profile_url = "http://graph.facebook.com/" + d.fb_id + "/picture?type=square"
			        	return profile_url;
			        })
			        .attr("x", function(d) { return -25;})
			        .attr("y", function(d) { return -25;})
			        .attr("height",40)
			        .attr("width", 40);

                node.append("title")
                  .text(function(d) { return d.displayName; });
            }
        }
    };

    var instance = {
        get: function(config) {

            // how many panes in the window, determine width
            var panesPerWindow = config.panesPerWindow || 1;
            var D3GraphOptions = angular.copy(template)
            D3GraphOptions.chart.width = (function(){ return nv.utils.windowSize().width / panesPerWindow})()

            if(config.height) {
                D3GraphOptions.chart.height = config.height;
            }
            return D3GraphOptions
        }
    }

	return instance

})