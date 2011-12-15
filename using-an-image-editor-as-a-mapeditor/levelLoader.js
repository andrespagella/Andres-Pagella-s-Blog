var Tile = {
	WALL: {
		index: 0,
		identifier: 'ffffff'
	},
	RED: {
		index: 1,
		identifier: '00ff'
	},
	BLUE: {
		index: 2,
		identifier: 'ff00'
	}
}

var Level = function (mapImage) {
	this.mapData = {
		size: null,
		data: null,
		base: {
			red: 0,
			blue: 0
		}
	}

    var map = new Image();
    map.src = mapImage;

    this.loadMap(map);
};

Level.prototype.loadMap = function (map) {

    // Create an HTML5 Canvas object, define the 2D Context and create an empty array to store the tileData
    var c = this.c,
        cnv = document.createElement("canvas"),
        ctx = cnv.getContext("2d"),
        idata = null,
        tileData = [];

    // Set the size of the map
    this.mapData.size = {
        x: map.width,
        y: map.height
    }

    // Adjust the size of the canvas to match the size of the image
    cnv.width = map.width;
    cnv.height = map.height;

    // Paint the map on the new canvas
    ctx.drawImage(map, 0, 0);

    // Read the pixel data array
    idata = ctx.getImageData(0, 0, cnv.width, cnv.height);

    // Start cycling through all the pixels of the image
    for (var i = 0, my = map.height; i < my; i++) {
        for (var j = 0, mx = map.width; j < mx; j++) {
            // Convert the RGB values to hex
            var r = (idata.data[((mx * i) + j) * 4]).toString(16),
                g = (idata.data[((mx * i) + j) * 4 + 1]).toString(16),
                b = (idata.data[((mx * i) + j) * 4 + 2]).toString(16),
                hex = r + g + b; 

            tileData[j] = tileData[j] || [];

            switch(hex) {
                case Tile.WALL.identifier:
                    tileData[j][i] = Tile.WALL.index;
                    break;
                case Tile.BLUE.identifier:
                    tileData[j][i] = Tile.BLUE.index;
                    this.mapData.base.blue = {x: j, y: i};
                    break;
                case Tile.RED.identifier:
                    tileData[j][i] = Tile.RED.index;
                    this.mapData.base.red = {x: j, y: i};
                    break;
            }
        }
    }

    // Replace the level data with the values of the tileData matrix.
    this.mapData.data = tileData;
};