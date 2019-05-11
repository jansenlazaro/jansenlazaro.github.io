var PI2 = Math.PI * 2;
Math.dist = function(a, b) {
    var dx = a.x - b.x;
    var dy = b.y - b.y;
    return Math.sqrt(Math.pow(dx, 2), Math.pow(dy, 2));
}
var Stars = function(args) {
    if (args === undefined) args = {};
    var time = new Date().getTime();
    var _scope = this;

    this.stars = [];
    this.velocity = args.velocity || 1;
    this.radius = args.radius || 2;
    this.trail = true;
    this.alpha = 0.200;
    this.starsCounter = args.stars || 300;
    var center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
    var maxDistance = Math.sqrt(Math.pow(center.x, 2), Math.pow(center.y, 2));
    this.init = function() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.start();
        this.resize();
        // 
        window.addEventListener("resize", this.resize.bind(this));
    }

    this.start = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars = [];
        for (var i = 0; i < this.starsCounter; i++) {
            this.stars.push(new Star());
        }
    }

    this.resize = function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        center.x = this.canvas.width / 2;
        center.y = this.canvas.height / 2;
    }

    this.animate = function() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
    }
    this.render = function() {
        time = new Date().getTime() * 0.00015;
        if (this.trail) {
            this.context.fillStyle = 'rgba(1, 4, 35, ' + this.alpha + ')';
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.context.fillStyle = 'rgb(1, 4, 35)';
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        for (var i = 0; i < this.stars.length; i++) this.stars[i].draw(this.context);
    }

    var Star = function() {
        this.offset = Math.random() * maxDistance;
        this.velocity = Math.random() * _scope.velocity;
        this.coords = {
            x: center.x + this.offset,
            y: center.y + this.offset
        };
        var dist2Center = Math.dist(this.coords, center);
        this.alpha = (dist2Center / maxDistance);
        this.radius = Math.random() * _scope.radius;
        this.fillColor = "rgba(255," + ~~(Math.random() * 160) + "," + ~~(Math.random() * 255) + "," + this.alpha + ")";
        this.draw = function(context) {
            var val = time * this.velocity;
            this.coords = {
                x: center.x + Math.sin(val) * this.offset,
                y: center.y + Math.cos(val) * this.offset
            };
            context.fillStyle = this.fillColor;
            context.beginPath();
            context.arc(this.coords.x, this.coords.y, this.radius, 0, PI2);
            context.fill();
            context.closePath();
        }
        return this;
    }
    this.init();
    this.animate();
    return this;
}

var _stars = new Stars();
