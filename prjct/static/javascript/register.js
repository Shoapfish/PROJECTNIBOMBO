 /* ── Password toggle ── */
    function toggleRegPassword() {
        const input = document.getElementById('reg-password');
        input.type = input.type === 'password' ? 'text' : 'password';
    }

    document.getElementById('reg-password').addEventListener('input', function () {
        const password = this.value;
        toggleRule('rule-length',  password.length >= 8);
        toggleRule('rule-upper',   /[A-Z]/.test(password));
        toggleRule('rule-lower',   /[a-z]/.test(password));
        toggleRule('rule-number',  /[0-9]/.test(password));
        toggleRule('rule-symbol',  /[^A-Za-z0-9]/.test(password));
    });

    function toggleRule(id, passed) {
        document.getElementById(id).style.display = passed ? 'none' : 'block';
    }

    document.querySelector('form').addEventListener('submit', function (e) {
        const password = document.getElementById('reg-password').value;
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) ||
            !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password) ||
            password.length < 8) {
            e.preventDefault();
        }
    });

    /* ── Flower Canvas Animation ── */
    const canvas = document.getElementById('flowerCanvas');
    const ctx    = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
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
            this.x         = Math.random() * canvas.width;
            this.y         = initial ? Math.random() * canvas.height : -60;
            this.size      = 6 + Math.random() * 14;
            this.speedY    = 0.4 + Math.random() * 1.2;
            this.speedX    = (Math.random() - 0.5) * 0.8;
            this.rot       = Math.random() * Math.PI * 2;
            this.rotSpeed  = (Math.random() - 0.5) * 0.04;
            this.swing     = Math.random() * Math.PI * 2;
            this.swingSpd  = 0.01 + Math.random() * 0.02;
            this.swingAmt  = 0.8 + Math.random() * 1.5;
            this.opacity   = 0.5 + Math.random() * 0.5;
            const p        = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.color     = p[Math.floor(Math.random() * p.length)];
            this.type      = Math.floor(Math.random() * 3);
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
            if      (this.type === 0) drawCherryPetal(ctx, this.size, this.color);
            else if (this.type === 1) drawRoundPetal(ctx,  this.size, this.color);
            else                      drawOvalPetal(ctx,   this.size, this.color);
            ctx.restore();
        }
    }

    function drawCherryPetal(ctx, size, color) {
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.bezierCurveTo( size*.8, -size*.5,  size*.9, size*.5, 0, size);
        ctx.bezierCurveTo(-size*.9,  size*.5, -size*.8,-size*.5, 0,-size);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.7);
        ctx.lineTo(0,  size * 0.7);
        ctx.stroke();
    }
    function drawRoundPetal(ctx, size, color) {
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.55, size, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
    function drawOvalPetal(ctx, size, color) {
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.35, size * 0.7, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    class Flower {
        constructor() { this.reset(true); }
        reset(initial = false) {
            this.x          = Math.random() * canvas.width;
            this.y          = initial ? Math.random() * canvas.height : canvas.height + 80;
            this.size       = 18 + Math.random() * 28;
            this.speedY     = -(0.15 + Math.random() * 0.4);
            this.swing      = Math.random() * Math.PI * 2;
            this.swingSpd   = 0.005 + Math.random() * 0.01;
            this.swingAmt   = 0.6 + Math.random() * 1.2;
            this.rot        = Math.random() * Math.PI * 2;
            this.rotSpeed   = (Math.random() - 0.5) * 0.008;
            this.opacity    = 0.12 + Math.random() * 0.2;
            this.petals     = 5 + Math.floor(Math.random() * 3);
            const p         = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.petalColor = p[0];
            this.bloomPhase = Math.random() * Math.PI * 2;
            this.bloomSpd   = 0.008 + Math.random() * 0.015;
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
            const s = 0.88 + Math.sin(this.bloomPhase) * 0.12;
            ctx.scale(s, s);
            for (let i = 0; i < this.petals; i++) {
                const angle = (i / this.petals) * Math.PI * 2;
                ctx.save();
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo( this.size*.4, -this.size*.1,  this.size*.5, this.size*.3, 0, this.size*.9);
                ctx.bezierCurveTo(-this.size*.5,  this.size*.3, -this.size*.4,-this.size*.1, 0, 0);
                ctx.fillStyle = this.petalColor;
                ctx.fill();
                ctx.restore();
            }
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.22, 0, Math.PI * 2);
            const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.22);
            g.addColorStop(0, '#fff9e6');
            g.addColorStop(1, '#ffd6e0');
            ctx.fillStyle = g;
            ctx.fill();
            ctx.restore();
        }
    }

    class Sparkle {
        constructor() { this.reset(true); }
        reset(initial = false) {
            this.x          = Math.random() * canvas.width;
            this.y          = Math.random() * canvas.height;
            this.size       = 1 + Math.random() * 2.5;
            this.opacity    = 0;
            this.maxOpacity = 0.4 + Math.random() * 0.5;
            this.phase      = Math.random() * Math.PI * 2;
            this.speed      = 0.02 + Math.random() * 0.04;
        }
        update() {
            this.phase  += this.speed;
            this.opacity = ((Math.sin(this.phase) + 1) / 2) * this.maxOpacity;
            if (this.phase > Math.PI * 10) this.reset();
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle   = '#ffd6e0';
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
                const a = (i / 4) * Math.PI * 2;
                const r = i % 2 === 0 ? this.size : this.size * 0.3;
                i === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r)
                        : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    const petals   = Array.from({ length: 55 }, () => new Petal());
    const flowers  = Array.from({ length: 18 }, () => new Flower());
    const sparkles = Array.from({ length: 40 }, () => new Sparkle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flowers.forEach(f  => { f.update(); f.draw(); });
        petals.forEach(p   => { p.update(); p.draw(); });
        sparkles.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animate);
    }
    animate();