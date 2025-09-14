// src/components/RotatingGlobe.jsx
import { useMemo, useRef, useEffect } from "react";
import Globe from "react-globe.gl";

export default function RotatingGlobe({
  width = 560,
  height = 380,
  tiltDeg = 23.5,        // base tilt
  sidewaysTiltDeg = 0,   // base sideways tilt
  wobbleAmp = 6,         // wobble amplitude in degrees
  wobbleSpeed = 1.2      // wobble speed (radians/sec)
}) {
  const globeRef = useRef();
  const animRef = useRef();

  const points = useMemo(
    () => [
      { lat: 10.15, lng: 76.39, label: "Kerala, IN (Home)", projects: 5, isOrigin: true },
      { lat: 38.95, lng: -77.45, label: "us-east-1 (N. Virginia)", projects: 3 },
      { lat: 19.09, lng: 72.88, label: "ap-south-1 (Mumbai)", projects: 2 },
      { lat: 50.11, lng: 8.68, label: "eu-central-1 (Frankfurt)", projects: 4 },
      { lat: 1.29, lng: 103.85, label: "ap-southeast-1 (Singapore)", projects: 1 },
    ],
    []
  );

  const arcs = useMemo(() => {
    const o = points[0];
    return points.slice(1).map((p) => ({
      startLat: o.lat,
      startLng: o.lng,
      endLat: p.lat,
      endLng: p.lng,
      color: ["#00E1FF", "#9AE6FF"],
    }));
  }, [points]);

  useEffect(() => {
    if (!globeRef.current) return;

    const c = globeRef.current.controls?.();
    if (c) {
      c.autoRotate = true;
      c.autoRotateSpeed = 2.4;
      c.enableZoom = false;
    }

    // camera view
    globeRef.current.pointOfView({ lat: 12, lng: 65, altitude: 2.1 });

    // animation loop for wobble
    const toRad = (deg) => (deg * Math.PI) / 180;
    let frame = 0;

    const animate = () => {
      frame += 0.016; // ~60fps
      const wobble = Math.sin(frame * wobbleSpeed) * toRad(wobbleAmp);

      if (globeRef.current && globeRef.current.rotation) {
        globeRef.current.rotation.x = toRad(tiltDeg) + wobble;
        globeRef.current.rotation.z = toRad(sidewaysTiltDeg);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [tiltDeg, sidewaysTiltDeg, wobbleAmp, wobbleSpeed]);

  return (
    <Globe
      ref={globeRef}
      width={width}
      height={height}
      backgroundColor="rgba(0,0,0,0)"
      showAtmosphere
      atmosphereColor="#00faff"
      atmosphereAltitude={0.28}
      globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
      labelsData={points}
      labelText={(d) => `${d.label} · ${d.projects} Projects`}
      labelLat={(d) => d.lat}
      labelLng={(d) => d.lng}
      labelAltitude={(d) => (d.isOrigin ? 0.05 : 0.01)}
      labelDotRadius={(d) => (d.isOrigin ? 0.7 : 0.35)}
      labelColor={(d) =>
        d.isOrigin ? "rgba(0,255,200,0.95)" : "rgba(255,255,255,0.85)"
      }
      labelResolution={2}
      arcsData={arcs}
      arcColor={(d) => d.color}
      arcAltitude={0.25}
      arcStroke={0.9}
      arcDashLength={0.5}
      arcDashGap={0.25}
      arcDashAnimateTime={2500}
    />
  );
}
