import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: { x: number; y: number; size: number; opacity: number; speed: number; twinkle: number; color: string }[] = [];
    const shootingStars: { x: number; y: number; length: number; speed: number; opacity: number; angle: number }[] = [];
    const nebulaClouds: { x: number; y: number; size: number; opacity: number; color: string; drift: number }[] = [];
    const numStars = 400;
    const numShootingStars = 5;
    const numNebulaClouds = 8;

    const starColors = ['#ffffff', '#ffe4b5', '#87ceeb', '#ffd700', '#ff69b4', '#98fb98'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
          twinkle: Math.random() * 0.02 + 0.01,
          color: starColors[Math.floor(Math.random() * starColors.length)]
        });
      }
    };

    const createShootingStars = () => {
      shootingStars.length = 0;
      for (let i = 0; i < numShootingStars; i++) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 100 + 30,
          speed: Math.random() * 4 + 3,
          opacity: 0,
          angle: Math.random() * Math.PI / 4 + Math.PI / 8 // 22.5 to 67.5 degrees
        });
      }
    };

    const createNebulaClouds = () => {
      nebulaClouds.length = 0;
      const nebulaColors = ['rgba(138, 43, 226, 0.1)', 'rgba(75, 0, 130, 0.1)', 'rgba(255, 20, 147, 0.1)', 'rgba(0, 191, 255, 0.1)'];
      for (let i = 0; i < numNebulaClouds; i++) {
        nebulaClouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 200 + 100,
          opacity: Math.random() * 0.3 + 0.1,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          drift: Math.random() * 0.2 + 0.1
        });
      }
    };

    const animate = () => {
      // Create enhanced gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0B1426');
      gradient.addColorStop(0.2, '#1E3A8A');
      gradient.addColorStop(0.5, '#7C3AED');
      gradient.addColorStop(0.8, '#1E1B4B');
      gradient.addColorStop(1, '#0F0F23');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula clouds
      nebulaClouds.forEach(cloud => {
        const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.size);
        gradient.addColorStop(0, cloud.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
        ctx.fill();

        cloud.x += cloud.drift;
        cloud.y += cloud.drift * 0.5;
        
        if (cloud.x > canvas.width + cloud.size) cloud.x = -cloud.size;
        if (cloud.y > canvas.height + cloud.size) cloud.y = -cloud.size;
      });

      // Animate regular stars with enhanced effects
      stars.forEach(star => {
        star.opacity += (Math.random() - 0.5) * star.twinkle;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));

        // Create enhanced glow effect for larger stars
        if (star.size > 2) {
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(0.3, `${star.color}80`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw star with color
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${Math.floor(star.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Add sparkle effect for bright stars
        if (star.opacity > 0.7 && star.size > 1.5) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.size;
          star.x = Math.random() * canvas.width;
        }
      });

      // Animate enhanced shooting stars
      shootingStars.forEach(shootingStar => {
        if (Math.random() < 0.002) {
          shootingStar.opacity = 1;
          shootingStar.x = Math.random() * canvas.width;
          shootingStar.y = Math.random() * canvas.height * 0.3;
        }

        if (shootingStar.opacity > 0) {
          const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
          const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;

          // Create gradient trail
          const gradient = ctx.createLinearGradient(
            shootingStar.x, shootingStar.y,
            endX, endY
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
          gradient.addColorStop(0.5, `rgba(135, 206, 235, ${shootingStar.opacity * 0.7})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Add bright head
          ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
          ctx.fill();

          shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
          shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
          shootingStar.opacity -= 0.008;
        }
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    createShootingStars();
    createNebulaClouds();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createStars();
      createShootingStars();
      createNebulaClouds();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default StarBackground;