"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCHEDULE } from "@/lib/constants";

/* ── WebGL plasma shader background ──────────────────────────────
   Adapted from ShaderToy plasma lines. Colors tuned to #e63946.
   Canvas is absolute-positioned inside the slide (not fixed).    */
function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() { gl_Position = aVertexPosition; }
  `;

  const fsSource = `
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;

    const float overallSpeed     = 0.15;
    const float gridSmoothWidth  = 0.015;
    const float axisWidth        = 0.05;
    const float majorLineWidth   = 0.025;
    const float minorLineWidth   = 0.0125;
    const float majorLineFrequency = 5.0;
    const float minorLineFrequency = 1.0;
    const float scale            = 5.0;
    const vec4  lineColor        = vec4(0.9, 0.22, 0.27, 1.0);
    const float minLineWidth     = 0.01;
    const float maxLineWidth     = 0.2;
    const float lineSpeed        = 1.0  * overallSpeed;
    const float lineAmplitude    = 1.0;
    const float lineFrequency    = 0.2;
    const float warpSpeed        = 0.2  * overallSpeed;
    const float warpFrequency    = 0.5;
    const float warpAmplitude    = 1.0;
    const float offsetFrequency  = 0.5;
    const float offsetSpeed      = 1.33 * overallSpeed;
    const float minOffsetSpread  = 0.6;
    const float maxOffsetSpread  = 2.0;
    const int   linesPerGroup    = 16;

    #define drawCircle(pos, radius, coord)    smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
    #define drawSmoothLine(pos, hw, t)        smoothstep(hw, 0.0, abs(pos - (t)))
    #define drawCrispLine(pos, hw, t)         smoothstep(hw + gridSmoothWidth, hw, abs(pos - (t)))
    #define drawPeriodicLine(freq, width, t)  drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

    float drawGridLines(float axis) {
      return drawCrispLine(0.0, axisWidth, axis)
           + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
           + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
    }
    float drawGrid(vec2 space) { return min(1.0, drawGridLines(space.x) + drawGridLines(space.y)); }

    float random(float t) {
      return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
    }
    float getPlasmaY(float x, float hFade, float offset) {
      return random(x * lineFrequency + iTime * lineSpeed) * hFade * lineAmplitude + offset;
    }

    void main() {
      vec2 uv    = gl_FragCoord.xy / iResolution.xy;
      vec2 space = (gl_FragCoord.xy - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

      float hFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
      float vFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

      space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + hFade);
      space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * hFade;

      vec4 lines = vec4(0.0);
      for (int l = 0; l < linesPerGroup; l++) {
        float nli    = float(l) / float(linesPerGroup);
        float oTime  = iTime * offsetSpeed;
        float oPos   = float(l) + space.x * offsetFrequency;
        float rand   = random(oPos + oTime) * 0.5 + 0.5;
        float hw     = mix(minLineWidth, maxLineWidth, rand * hFade) / 2.0;
        float offset = random(oPos + oTime * (1.0 + nli)) * mix(minOffsetSpread, maxOffsetSpread, hFade);
        float lineY  = getPlasmaY(space.x, hFade, offset);
        float line   = drawSmoothLine(lineY, hw, space.y) / 2.0
                     + drawCrispLine(lineY, hw * 0.15, space.y);

        float cx = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
        vec2  cp = vec2(cx, getPlasmaY(cx, hFade, offset));
        line += drawCircle(cp, 0.01, space) * 4.0;

        lines += line * lineColor * rand;
      }

      vec4 bg = mix(vec4(0.02, 0.02, 0.02, 1.0), vec4(0.06, 0.01, 0.02, 1.0), uv.x);
      bg *= vFade;
      bg.a = 1.0;
      gl_FragColor = bg + lines;
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compileShader = (type: number, src: string): WebGLShader | null => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const posLoc  = gl.getAttribLocation(prog,  "aVertexPosition");
    const resLoc  = gl.getUniformLocation(prog, "iResolution");
    const timeLoc = gl.getUniformLocation(prog, "iTime");

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const t0 = Date.now();
    let raf: number;
    const render = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, (Date.now() - t0) / 1000);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(posLoc);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

interface ScheduleSlideProps {
  isActive: boolean;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const EASE_SPRING = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

export default function ScheduleSlide({ isActive }: ScheduleSlideProps) {
  const [selectedDay, setSelectedDay] = useState(0);
  const day = SCHEDULE[selectedDay];

  return (
    <div
      dir="rtl"
      className="slide-rtl w-full h-screen flex flex-col items-center justify-center px-3 md:px-12 gap-4 md:gap-6 relative overflow-hidden slide-grain"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Layer 1 (z:1): WebGL shader canvas ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, opacity: 0.5 }}>
        <ShaderCanvas />
      </div>

      {/* ── Layer 2 (z:2): dark overlay + corner glow ──────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: "radial-gradient(ellipse at 95% 92%, rgba(230,57,70,0.18) 0%, transparent 50%), rgba(10,10,10,0.52)",
        }}
      />

      {/* ── Layer 3 (z:10): all slide content ──────────────────── */}
      <div
        className="relative flex flex-col items-center w-full gap-4 md:gap-6"
        style={{ zIndex: 10 }}
      >

      {/* ── Header: title fade-up, subtitle delayed ───────────── */}
      {isActive && (
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="font-black text-white heading-glow"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            <span dir="rtl">לו&quot;ז המחנה</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-sm md:text-base font-bold mt-1"
            style={{ color: "#e63946" }}
          >
            8 ימים של כדורסל, חוויות ובניית אופי
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            style={{ transformOrigin: "center" }}
          >
            <div className="accent-line-center mt-2" />
          </motion.div>
        </div>
      )}

      {/* ── Day buttons: staggered slide-down from right→left ─── */}
      {isActive && (
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 w-full max-w-4xl">
          {SCHEDULE.map((s, i) => (
            <motion.button
              key={s.day}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.07, ease: EASE_SPRING }}
              onClick={() => setSelectedDay(i)}
              className="px-2.5 md:px-3 py-1.5 md:py-2 rounded-xl text-xs font-bold"
              style={{
                background: i === selectedDay ? "linear-gradient(135deg, #e63946, #c1303b)" : "rgba(255,255,255,0.04)",
                border: i === selectedDay ? "1px solid #e63946" : "1px solid rgba(255,255,255,0.08)",
                color: i === selectedDay ? "#fff" : "#b0b0b0",
                boxShadow: i === selectedDay ? "0 0 20px rgba(230,57,70,0.35)" : "",
                backdropFilter: "blur(8px)",
                minWidth: 48,
                transition: "background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s",
              }}
            >
              יום {s.day}
              <br />
              <span className="opacity-70">{s.date}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* ── Activity card: AnimatePresence fade swap ──────────── */}
      {isActive && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="w-full max-w-2xl rounded-2xl overflow-hidden slide-grain"
            style={{ border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
          >
            {/* Day header: slides in from right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: EASE }}
              className="px-5 py-3"
              style={{ background: "linear-gradient(135deg, #e63946, #c1303b)" }}
            >
              <h3 className="text-base md:text-lg font-black text-white">
                יום {day.day} — {day.date} | {day.dayName}
              </h3>
            </motion.div>

            {/* Activity rows: staggered fade from right */}
            <div style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)" }}>
              {day.activities.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.08, ease: EASE }}
                  className="flex items-center gap-3 md:gap-4 px-5 py-3 md:py-4"
                  style={{ borderBottom: i < day.activities.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "" }}
                >
                  {/* Icon with bounce */}
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: EASE_SPRING }}
                    className="text-2xl md:text-3xl flex-shrink-0"
                  >
                    {activity.icon}
                  </motion.span>
                  <div>
                    <p className="text-xs font-medium" style={{ color: "#555" }}>{activity.time}</p>
                    <p className="text-base md:text-lg font-bold text-white">{activity.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {isActive && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-xs"
          style={{ color: "#888" }}
        >
          הלו&quot;ז משוער וכפוף לשינויים
        </motion.p>
      )}

      </div>{/* end Layer 3 content */}
    </div>
  );
}
