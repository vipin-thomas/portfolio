import React from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/profile.jpg";
import linux from "../assets/linux.png";
import github from "../assets/github.png";
import docker from "../assets/docker.png";
import aws from "../assets/aws.png";
import kubernetes from "../assets/kubernetes.png";
import terraform from "../assets/terraform.png";
import jenkins from "../assets/jenkins.jpg";

export default function Home() {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Top Left Profile Info */}
      <div className="relative z-10 flex flex-col items-start justify-start h-full px-8 py-6">
        <motion.img
          src={profilePic}
          alt="Vipin Thomas"
          className="w-41 h-40 rounded-full border-4 border-white shadow-lg mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Vipin Thomas
        </motion.h2>
        <motion.p
          className="text-teal-300 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Cloud and DevOps Enthusiast
        </motion.p>
      </div>

      {/* Bottom Icons */}
      <div className="absolute bottom-4 w-full flex justify-center gap-6 z-10">
        {[linux, github, docker, aws, kubernetes, terraform, jenkins].map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt="tech-icon"
            className="w-20 h-20 opacity-80 hover:opacity-100 transition duration-300"
          />
        ))}
      </div>
    </div>
  );
}
