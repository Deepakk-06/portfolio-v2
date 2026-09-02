import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Where contact form submissions get emailed to
const CONTACT_RECEIVER_EMAIL = "deeeeps06@gmail.com";

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

      if (resend) {
        try {
          await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: CONTACT_RECEIVER_EMAIL,
            replyTo: input.email,
            subject: `New message from ${input.name} (Portfolio Contact Form)`,
            text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
          });
        } catch (emailErr) {
          console.error("Failed to send contact email:", emailErr);
        }
      } else {
        console.warn("RESEND_API_KEY not set — skipping email notification.");
      }

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
        title: "Autonomous SLAM Robot with Real-Time Monocular Depth Vision",
        description: "Built an autonomous ROS 2 TurtleBot with SLAM Toolbox and real-time monocular depth estimation using Depth Anything V2, achieving ~40 FPS with distributed Raspberry Pi and GPU-based processing.",
        technologies: ["ROS 2", "SLAM Toolbox", "Monocular Depth Estimation", "Depth Anything V2", "Raspberry Pi", "Python", "OpenCV", "Real-Time Perception"],
        category: "Robotics",
        link: "https://drive.google.com/file/d/14VwdJNZg_wFntVe76Iic0ui4o8Z0WYAV/view?usp=sharing",
      },
      {
        title: "Hexapod-6: Autonomous ROS 2 Legged Robot",
        description: "Developed a fully autonomous six-legged robot using ROS 2, integrating NVIDIA Jetson for high-level computation and STM32 for real-time locomotion control. Implemented LiDAR-based SLAM, autonomous navigation, gait control, IMU-based orientation, computer vision, and Jetson–STM32 serial communication.",
        category: "Robotics",
        technologies: ["ROS 2", "Jetson", "STM32", "SLAM", "Nav2", "RPLIDAR", "OpenCV", "Robotics"],
        category: "Robotics",
        link: "https://drive.google.com/file/d/1c_568cxnXh-NULooI7N-SExnUtUsB6nH/view?usp=sharing",
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
