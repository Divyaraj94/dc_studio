import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_intensity;

  void main() {
    vec2 uv = v_uv;
    vec2 dist = uv - u_mouse;
    float d = length(dist);

    // Liquid organic wave ripples
    float wave = sin(d * 18.0 - u_time * 3.5) * exp(-d * 3.0) * u_intensity;
    // Ambient gentle liquid breathing
    float idle = sin(uv.y * 8.0 + u_time * 1.5) * 0.003;

    vec2 displacedUV = uv + (dist / (d + 0.001)) * wave * 0.05 + vec2(idle, idle);

    // Chromatic dispersion
    vec4 cr = texture2D(u_texture, displacedUV + vec2(wave * 0.018, 0.0));
    vec4 cg = texture2D(u_texture, displacedUV);
    vec4 cb = texture2D(u_texture, displacedUV - vec2(wave * 0.018, 0.0));

    // Specular liquid highlight
    float sheen = pow(max(0.0, sin(wave * 25.0)), 2.0) * u_intensity * 0.35;

    gl_FragColor = vec4(
      clamp(cr.r + sheen, 0.0, 1.0),
      clamp(cg.g + sheen * 0.8, 0.0, 1.0),
      clamp(cb.b + sheen * 1.2, 0.0, 1.0),
      cg.a
    );
  }
`;

export default function LiquidAvatar({ src, alt, className }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const targetIntensity = useRef(0);
  const currentIntensity = useRef(0);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });

    if (!gl) return;

    // Helper compile shader
    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uIntensity = gl.getUniformLocation(program, 'u_intensity');
    const uTexture = gl.getUniformLocation(program, 'u_texture');

    // Load texture
    const texture = gl.createTexture();
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    const startTime = performance.now();

    function render() {
      const now = (performance.now() - startTime) * 0.001;
      currentIntensity.current += (targetIntensity.current - currentIntensity.current) * 0.08;

      gl.uniform1f(uTime, now);
      gl.uniform2f(uMouse, mousePos.current.x, mousePos.current.y);
      gl.uniform1f(uIntensity, currentIntensity.current);
      gl.uniform1i(uTexture, 0);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
      targetIntensity.current = 1.0;
    };

    const handleMouseEnter = () => {
      targetIntensity.current = 1.0;
    };

    const handleMouseLeave = () => {
      targetIntensity.current = 0.15; // gentle ambient pulse
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      gl.deleteProgram(program);
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={320}
      className={className}
      style={{
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'block',
      }}
      title="Interactive Liquid Avatar — hover over me!"
      aria-label={alt}
    />
  );
}
