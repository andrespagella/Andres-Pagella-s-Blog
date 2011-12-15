window.onload = function() {
    var canvas = document.getElementById('viewport');
    var c = canvas.getContext('2d');

    var wall = new Image(),
        red = new Image(),
        blue = new Image(),
        level = new Level('levels/map1.gif');

    wall.src = 'images/wall.gif';
    red.src = 'images/red.png';
    blue.src = 'images/blue.png';

    // In our case tiles are 20px by 20px, so we'll need to resize the canvas.
    canvas.width = level.mapData.size.x * 20;
    canvas.height = level.mapData.size.y * 20;      
    
    // Print the map
    for (var y = 0; y < level.mapData.size.y; y++) {
        for (var x = 0; x < level.mapData.size.x; x++) {
            if (level.mapData.data[x][y] !== undefined) {
                switch (level.mapData.data[x][y]) {
                    case Tile.WALL.index:
                        c.drawImage(wall, x * 20, y * 20);
                        break;
                    case Tile.RED.index:
                        c.drawImage(red, (x * 20) - 20, (y * 20) - 20);
                        break;
                    case Tile.BLUE.index:
                        c.drawImage(blue, (x * 20) - 20, (y * 20) - 20);
                        break;
                }
            }
        }
    }           
}