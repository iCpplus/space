function drawLove(canvas) {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);
    const context = canvas.getContext("2d");
    function Love() {
        const me = this;

        function rand() {
            me.maxScale = (Math.random() * 3.2 + 1.2) * WIDTH / 521;
            me.curScale = 1.2 * WIDTH / 521;
            me.x = Math.floor(Math.random() * WIDTH - 40);
            me.y = Math.floor(HEIGHT - Math.random() * 200);
            me.ColR = Math.floor(Math.random() * 255);
            me.ColG = Math.floor(Math.random() * 255);
            me.ColB = Math.floor(Math.random() * 255);
            me.alpha = Math.random() * 0.2 + 0.8;
            me.vector = Math.random() * 5 + 0.4;
        }
        (function () {
            rand();
        }());
        me.draw = () => {
            if (me.alpha < 0.01) rand();
            if (me.curScale < me.maxScale) me.curScale += 0.3;
            const x = me.x;
            const y = me.y;
            const scale = me.curScale;
            context.fillStyle = "rgba(" + me.ColR + "," + me.ColG + "," + me.ColB + "," + me.alpha + ")";
            context.shadowBlur = 10;
            context.shadowColor = "rgb(" + me.ColR + "," + me.ColG + "," + me.ColB + ")";
            context.beginPath();
            context.bezierCurveTo(x + 2.5 * scale, y + 2.5 * scale, x + 2.0 * scale, y, x, y);
            context.bezierCurveTo(x - 3.0 * scale, y, x - 3.0 * scale, y + 3.5 * scale, x - 3.0 * scale, y +
                3.5 * scale);
            context.bezierCurveTo(x - 3.0 * scale, y + 5.5 * scale, x - 1.0 * scale, y + 7.7 * scale, x + 2.5 *
                scale, y + 9.5 * scale);
            context.bezierCurveTo(x + 6.0 * scale, y + 7.7 * scale, x + 8.0 * scale, y + 5.5 * scale, x + 8.0 *
                scale, y + 3.5 * scale);
            context.bezierCurveTo(x + 8.0 * scale, y + 3.5 * scale, x + 8.0 * scale, y, x + 5.0 * scale, y);
            context.bezierCurveTo(x + 3.5 * scale, y, x + 2.5 * scale, y + 2.5 * scale, x + 2.5 * scale, y +
                2.5 * scale);
            context.fill();
            context.closePath();
            me.y -= me.vector;
            me.alpha -= (me.vector / 2.9 * 3.5 / HEIGHT);
        }
    }
    const start = {
        loves: [],
        DURATION: 30,
        begin() {
            this.createLove();
        },
        createLove() {
            for (let i = 0; i < WIDTH / 520; i += 1) {
                const love = new Love();
                this.loves.push(love);
            }
            setInterval(this.drawLove.bind(this), this.DURATION);
        },
        drawLove() {
            context.clearRect(0, 0, WIDTH, HEIGHT);
            const keys = Object.keys(this.loves)
            keys.forEach(item => {
                this.loves[item].draw();

            })
        }
    }


    start.begin();
}

module.exports = drawLove;
