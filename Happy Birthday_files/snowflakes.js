(function () {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";

  document.body.appendChild(canvas);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const logo = new Image();
  logo.src = "img\dhca-logo.png"; // ← path to your logo

  const flakes = [];
  const COUNT = 20;

  for (let i = 0; i < COUNT; i++) {
    flakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 28 + 18,
      speed: Math.random() * 0.8 + 0.4,
      opacity: 0.25
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flakes.forEach(flake => {
      ctx.globalAlpha = flake.opacity;
      ctx.drawImage(logo, flake.x, flake.y, flake.size, flake.size);
      flake.y += flake.speed;

      if (flake.y > canvas.height) {
        flake.y = -flake.size;
        flake.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  logo.onload = animate;
})();
