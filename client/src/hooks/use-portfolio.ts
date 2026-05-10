import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function useProjects() {
  const projects = [
    {
      id: 1,
      title: "LiDAR-Powered Autonomous Mapping & Navigation",
      description: "Deployed 2D LiDAR-based SLAM pipeline using SLAM Toolbox inside a Gazebo-simulated multi-obstacle environment. Achieved real-time occupancy grid map generation with full robot trajectory visualization and loop-closure in RViz.",
      category: "Robotics",
      tags: ["ROS 2", "Gazebo", "SLAM Toolbox", "Nav2", "AMCL"],
      githubUrl: null,
      videoUrl: "https://drive.google.com/file/d/1pskf5J4I6OG_EVLog-Po9VqRFDxYvnbR/view",
    },
    {
      id: 2,
      title: "Human-Robot Interaction System using micro-ROS",
      description: "Developed real-time gesture-based robot control system integrating micro-ROS with ROS 2 Jazzy for low-latency teleoperation. Implemented gesture recognition pipeline to map human hand motions into robot velocity commands via ROS 2 topics.",
      category: "Robotics",
      tags: ["ROS 2", "ESP32", "micro-ROS", "Python"],
      githubUrl: null,
      videoUrl: "https://drive.google.com/file/d/1vyNcxMrZcYwuTVy3O-ixH8Pn5xwWKJGN/view",
    },
    {
      id: 3,
      title: "Soil Grain Detection & Mapping System",
      description: "Built custom YOLOv8-based object detection model for real-time soil type classification achieving 92% accuracy. Collected, annotated, and trained dataset using transfer learning with GPS-based mapping output.",
      category: "AI/CV",
      tags: ["YOLOv8", "Python", "OpenCV", "Raspberry Pi", "Folium"],
      githubUrl: null,
      videoUrl: "https://www.youtube.com/watch?v=Gqag98Drhi4",
    },
    {
      id: 4,
      title: "PID Line-Following Robot",
      description: "Designed and fabricated a custom robot chassis using CAD with optimised sensor placement. Implemented a C-based PID controller for smoother and more accurate tracking than basic threshold control.",
      category: "Embedded",
      tags: ["Arduino", "C", "PID Control", "CAD Design"],
      githubUrl: "https://github.com/Deepakk-06/PID-Line-Following-Robot",
      videoUrl: null,
    },
    {
      id: 5,
      title: "TeleOperated Mobile Manipulation Platform",
      description: "Developed a teleoperated mobile robot with a 4-DOF robotic arm using forward/inverse kinematics and Bluetooth-based real-time control for precise end-effector positioning.",
      category: "Robotics",
      tags: ["ESP32", "Kinematics", "Arduino IDE", "Bluetooth"],
      githubUrl: null,
      videoUrl: null,
    },
    {
      id: 6,
      title: "ROS2-Model-Predictive-Control",
      description: "ROS2-based Model Predictive Control (MPC) framework for autonomous robot navigation, enabling optimal trajectory tracking, path smoothing, and real-time obstacle handling.",
      category: "Control Systems",
      tags: ["Python", "MPC", "Control Theory", "NumPy", "Optimisation"],
      githubUrl: "https://github.com/Deepakk-06/ROS2-Model-Predictive-Control-",
      videoUrl: null,
    },
  ];

  return { data: projects, isLoading: false, error: null };
}

export function useSkills() {
  const skills = [
    {
      id: 1,
      category: "Programming",
      items: ["Arduino C", "C", "Python"],
    },
    {
      id: 2,
      category: "Robotics & ROS 2",
      items: ["ROS 2 (Jazzy)", "micro-ROS", "Navigation2", "SLAM Toolbox", "AMCL", "URDF", "Behavior Trees", "TF Transforms"],
    },
    {
      id: 3,
      category: "Autonomous Systems",
      items: ["LiDAR SLAM", "Monte Carlo Localisation", "Occupancy Grid Mapping", "Path Planning", "Sensor Fusion"],
    },
    {
      id: 4,
      category: "Computer Vision & AI",
      items: ["YOLOv8", "OpenCV", "Real-Time Object Detection", "Deep Learning", "Transfer Learning", "Reinforcement Learning"],
    },
    {
      id: 5,
      category: "Control & Embedded",
      items: ["PID", "MPC", "Inverse/Forward Kinematics", "ESP32", "Arduino", "Raspberry Pi", "Real-Time Systems"],
    },
    {
      id: 6,
      category: "Hardware & Sensors",
      items: ["2D LiDAR", "IMU", "Encoders", "IR Sensor Arrays", "Ultrasonic Sensors", "Motor Drivers"],
    },
    {
      id: 7,
      category: "Tools",
      items: ["Gazebo", "RViz", "Git/GitHub", "Linux (Ubuntu)", "Google Colab", "CAD"],
    },
  ];

  return { data: skills, isLoading: false, error: null };
}

export function useContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Couldn't send your message. Try emailing me directly.",
        variant: "destructive",
      });
    },
  });
}
