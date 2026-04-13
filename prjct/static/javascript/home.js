/* ── Flower Canvas — constrained to left panel ── */
    const canvas = document.getElementById('flowerCanvas');
    const ctx    = canvas.getContext('2d');
    const LEFT_W = 560; // matches grid-template-columns in CSS

    function resize() {
        canvas.width  = LEFT_W;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const petalColors = [
        ['#ffb6c1','#ff8fab','#ff6b9d'],
        ['#ffc8dd','#ffafcc','#fb6f92'],
        ['#ffd6e0','#ffadc5','#ff85a1'],
        ['#ffe5ec','#ffc2d1','#ff99b4'],
        ['#fff0f3','#ffccd5','#ff4d6d'],
        ['#f9c6cf','#f48fb1','#ec407a'],
    ];

    class Petal {
        constructor() { this.reset(true); }
        reset(initial = false) {
            this.x        = Math.random() * canvas.width;
            this.y        = initial ? Math.random() * canvas.height : -60;
            this.size     = 5 + Math.random() * 13;
            this.speedY   = 0.35 + Math.random() * 1.1;
            this.speedX   = (Math.random() - 0.5) * 0.7;
            this.rot      = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.04;
            this.swing    = Math.random() * Math.PI * 2;
            this.swingSpd = 0.01 + Math.random() * 0.02;
            this.swingAmt = 0.8 + Math.random() * 1.5;
            this.opacity  = 0.4 + Math.random() * 0.5;
            const p       = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.color    = p[Math.floor(Math.random() * p.length)];
            this.type     = Math.floor(Math.random() * 3);
        }
        update() {
            this.swing += this.swingSpd;
            this.x     += Math.sin(this.swing) * this.swingAmt + this.speedX;
            this.y     += this.speedY;
            this.rot   += this.rotSpeed;
            if (this.y > canvas.height + 60) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            ctx.globalAlpha = this.opacity;
            if (this.type === 0)      drawCherry(ctx, this.size, this.color);
            else if (this.type === 1) drawRound(ctx,  this.size, this.color);
            else                      drawOval(ctx,   this.size, this.color);
            ctx.restore();
        }
    }

    function drawCherry(ctx, s, c) {
        ctx.beginPath();
        ctx.moveTo(0,-s);
        ctx.bezierCurveTo( s*.8,-s*.5,  s*.9, s*.5, 0, s);
        ctx.bezierCurveTo(-s*.9, s*.5, -s*.8,-s*.5, 0,-s);
        ctx.fillStyle = c; ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,0.35)'; ctx.lineWidth=0.7;
        ctx.beginPath(); ctx.moveTo(0,-s*.7); ctx.lineTo(0,s*.7); ctx.stroke();
    }
    function drawRound(ctx, s, c) {
        ctx.beginPath();
        ctx.ellipse(0,0,s*.55,s,0,0,Math.PI*2);
        ctx.fillStyle=c; ctx.fill();
    }
    function drawOval(ctx, s, c) {
        ctx.beginPath();
        ctx.ellipse(0,0,s*.35,s*.7,0,0,Math.PI*2);
        ctx.fillStyle=c; ctx.fill();
    }

    class Flower {
        constructor() { this.reset(true); }
        reset(initial = false) {
            this.x          = Math.random() * canvas.width;
            this.y          = initial ? Math.random() * canvas.height : canvas.height + 80;
            this.size       = 16 + Math.random() * 26;
            this.speedY     = -(0.12 + Math.random() * 0.35);
            this.swing      = Math.random() * Math.PI * 2;
            this.swingSpd   = 0.005 + Math.random() * 0.01;
            this.swingAmt   = 0.5 + Math.random() * 1.0;
            this.rot        = Math.random() * Math.PI * 2;
            this.rotSpeed   = (Math.random() - 0.5) * 0.007;
            this.opacity    = 0.1 + Math.random() * 0.18;
            this.petals     = 5 + Math.floor(Math.random() * 3);
            const p         = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.petalColor = p[0];
            this.bloomPhase = Math.random() * Math.PI * 2;
            this.bloomSpd   = 0.007 + Math.random() * 0.013;
        }
        update() {
            this.swing      += this.swingSpd;
            this.x          += Math.sin(this.swing) * this.swingAmt;
            this.y          += this.speedY;
            this.rot        += this.rotSpeed;
            this.bloomPhase += this.bloomSpd;
            if (this.y < -100) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            ctx.globalAlpha = this.opacity;
            const sc = 0.88 + Math.sin(this.bloomPhase) * 0.12;
            ctx.scale(sc, sc);
            for (let i = 0; i < this.petals; i++) {
                const a = (i / this.petals) * Math.PI * 2;
                ctx.save(); ctx.rotate(a);
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.bezierCurveTo(this.size*.4,-this.size*.1, this.size*.5,this.size*.3, 0,this.size*.9);
                ctx.bezierCurveTo(-this.size*.5,this.size*.3,-this.size*.4,-this.size*.1, 0,0);
                ctx.fillStyle = this.petalColor; ctx.fill();
                ctx.restore();
            }
            ctx.beginPath();
            ctx.arc(0,0,this.size*.22,0,Math.PI*2);
            const g = ctx.createRadialGradient(0,0,0,0,0,this.size*.22);
            g.addColorStop(0,'#fff9e6'); g.addColorStop(1,'#ffd6e0');
            ctx.fillStyle=g; ctx.fill();
            ctx.restore();
        }
    }

    class Sparkle {
        constructor() { this.reset(true); }
        reset() {
            this.x          = Math.random() * canvas.width;
            this.y          = Math.random() * canvas.height;
            this.size       = 1 + Math.random() * 2.2;
            this.opacity    = 0;
            this.maxOpacity = 0.35 + Math.random() * 0.45;
            this.phase      = Math.random() * Math.PI * 2;
            this.speed      = 0.02 + Math.random() * 0.035;
        }
        update() {
            this.phase  += this.speed;
            this.opacity = ((Math.sin(this.phase)+1)/2)*this.maxOpacity;
            if (this.phase > Math.PI*10) this.reset();
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle   = '#ffd6e0';
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
                const a = (i/4)*Math.PI*2;
                const r = i%2===0 ? this.size : this.size*0.3;
                i===0 ? ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r)
                      : ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);
            }
            ctx.closePath(); ctx.fill();
            ctx.restore();
        }
    }

    const petals   = Array.from({length: 45}, () => new Petal());
    const flowers  = Array.from({length: 14}, () => new Flower());
    const sparkles = Array.from({length: 30}, () => new Sparkle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flowers.forEach(f  => { f.update(); f.draw(); });
        petals.forEach(p   => { p.update(); p.draw(); });
        sparkles.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animate);
    }
    animate();