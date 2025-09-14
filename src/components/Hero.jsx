import React from "react";
import { motion } from "framer-motion";

import profilePic from "../assets/profile.jpg";
import linux from "../assets/linux.png";
import github from "../assets/github.png";
import docker from "../assets/docker.png";
import aws from "../assets/aws.png";
import kubernetes from "../assets/kubernetes.png";
import terraform from "../assets/terraform.png";
import jenkins from "../assets/jenkins.png";

import TaglineCloud from "./TaglineCloud"; // adjust path if yours differs

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* Background video lives in /public/background.mp4 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay above video */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Profile block (top-left) */}
      <div className="relative z-20 flex flex-col items-start px-8 py-6">
        <motion.img
          src={profilePic}
          alt="Vipin Thomas"
          className="w-40 h-50 rounded-full border-4 border-white shadow-lg mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Vipin Thomas
        </motion.h2>
        <motion.p
          className="text-teal-300 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Cloud and DevOps Enthusiast
        </motion.p>
      </div>

      {/* Tagline cloud centered */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <TaglineCloud />
      </div>

      {/* Tech icons row (bottom) */}
      <div className="absolute bottom-8 w-full z-20">
        <div className="mx-auto flex justify-center gap-6">
          {[linux, github, docker, aws, kubernetes, terraform, jenkins].map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt="tech-icon"
              className="w-16 h-16 md:w-20 md:h-20 opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
