import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Skills
  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createMessage(input);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid input",
          field: err.errors[0].path.join('.')
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  const existingTitles = new Set(existingProjects.map((p) => p.title));

  const MPC_TITLE = "Model Predictive Control (MPC) Path Tracker";
  const MPC_LINK = "https://github.com/Deepakk-06/ROS2-Model-Predictive-Control-";

  if (!existingTitles.has(MPC_TITLE)) {
    await storage.createProject({
      title: MPC_TITLE,
      description: "Implemented an MPC algorithm for real-time trajectory optimization and path tracking with constraint handling and look-ahead capability. Achieves precise motion control by solving a receding-horizon optimization problem at each timestep, outperforming classical PID in dynamic environments.",
      technologies: ["Python", "MPC", "Control Theory", "NumPy", "Optimization"],
      category: "Control Systems",
      link: MPC_LINK,
    });
    console.log("Added MPC project.");
  } else {
    // Ensure the link is up to date
    await storage.updateProjectLink(MPC_TITLE, MPC_LINK);
  }

  if (existingProjects.length === 0) {
    console.log("Seeding database...");

    const skillsData = [
      { category: "Programming Languages", items: ["Python", "C", "Arduino C"] },
      { category: "Robotics Frameworks", items: ["ROS 2 (Jazzy)", "micro-ROS", "Navigation2 (Nav2)", "SLAM Toolbox", "AMCL Localization"] },
      { category: "Core Concepts", items: ["Nodes", "Topics", "Services", "Actions", "TF Transforms", "URDF", "Launch Files", "Parameters", "Behavior Trees"] },
      { category: "Computer Vision & AI", items: ["YOLO (Object Detection)", "OpenCV", "Image Processing", "Model Training", "Transfer Learning"] },
      { category: "Embedded Systems", items: ["ESP32", "Arduino Uno/Mega", "Raspberry Pi", "Real-Time Systems", "Sensor Fusion"] },
      { category: "Hardware & Sensors", items: ["LiDAR", "IMU", "Odometry Encoders", "Load Cells", "IR Sensor Arrays", "Ultrasonic Sensors", "Motor Drivers"] },
      { category: "Development Tools", items: ["RViz", "Gazebo", "Arduino IDE", "Linux (Ubuntu)", "Google Colab"] }
    ];

    for (const skill of skillsData) {
      await storage.createSkill(skill);
    }

    const projectsData = [
      {
        title: "LiDAR-Powered Autonomous Mapping & Navigation",
        description: "Deployed 2D LiDAR-based SLAM pipeline using SLAM Toolbox inside a Gazebo-simulated multi-obstacle environment. Achieved real-time occupancy grid map generation with full robot trajectory visualization and loop-closure in RViz.",
        technologies: ["ROS 2", "Gazebo", "SLAM Toolbox", "Nav2", "AMCL"],
        category: "Robotics",
        link: "https://drive.google.com/file/d/1IY8sFpBx5i1n0Om0xyeD5MKozIJScH4c/view?usp=sharing",
      },
      {
        title: "Human-Robot Interaction System using micro-ROS",
        description: "Developed real-time gesture-based robot control system integrating micro-ROS with ROS 2 Jazzy for low-latency teleoperation. Implemented gesture recognition pipeline to map human hand motions into robot velocity commands via ROS 2 topics.",
        technologies: ["ROS 2", "ESP32", "micro-ROS", "Python"],
        category: "Robotics",
        link: "https://drive.google.com/file/d/1vyNcxMrZcYwuTVy3O-ixH8Pn5xwWKJGN/view",
      },
      {
        title: "Soil Grain Detection & Mapping System",
        description: "Built custom YOLO-based object detection model for real-time soil type classification (Red, Black, Perlite, Mixed Soil). Collected, annotated, and trained dataset using transfer learning techniques achieving 92% accuracy.",
        technologies: ["Python", "YOLO", "OpenCV", "Folium", "Google Colab"],
        category: "AI/CV",
        link: "https://www.youtube.com/watch?v=Gqag98Drhi4",
      },
      {
        title: "PID Line-Following Robot",
        description: "Designed and fabricated custom robot chassis using CAD software with optimized sensor placement for line detection. Implemented PID control algorithm in C for precise line tracking.",
        technologies: ["Arduino", "C", "PID Control", "CAD Design"],
        category: "Embedded",
        link: null,
      },
      {
        title: "TeleOperated Mobile Manipulation Platform",
        description: "Developed integrated mobile platform with 4-DOF robotic arm for autonomous pick-and-place task execution. Implemented inverse and forward kinematics algorithms for precise end-effector positioning.",
        technologies: ["ESP32", "Kinematics", "Arduino IDE", "Wireless Control"],
        category: "Robotics",
        link: null,
      }
    ];

    for (const project of projectsData) {
      await storage.createProject(project);
    }
    
    console.log("Database seeded successfully.");
  }
}
