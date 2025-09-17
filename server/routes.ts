import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertQuizResponseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      
      // Return user without sensitive data
      res.json({
        id: user.id,
        name: user.name,
        school: user.school,
        phoneNumber: user.phoneNumber,
      });
    } catch (error) {
      console.error("User registration error:", error);
      res.status(400).json({ 
        error: "Invalid user data", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({
        id: user.id,
        name: user.name,
        school: user.school,
        phoneNumber: user.phoneNumber,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all quizzes
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await storage.getAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      console.error("Get quizzes error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get specific quiz by ID
  app.get("/api/quizzes/:id", async (req, res) => {
    try {
      const quiz = await storage.getQuiz(req.params.id);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      
      res.json(quiz);
    } catch (error) {
      console.error("Get quiz error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Submit quiz response
  app.post("/api/quiz-responses", async (req, res) => {
    try {
      const responseData = insertQuizResponseSchema.parse(req.body);
      
      // Check if user and quiz exist
      const user = await storage.getUser(responseData.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const quiz = await storage.getQuiz(responseData.quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      // Check if user has already completed this quiz
      const existingResponse = await storage.getUserQuizResponse(
        responseData.userId, 
        responseData.quizId
      );
      if (existingResponse) {
        return res.status(400).json({ error: "Quiz already completed by this user" });
      }

      // Calculate score if not provided
      let score = responseData.score;
      if (score === null || score === undefined) {
        const totalQuestions = quiz.questions.length;
        const answeredCount = Object.keys(responseData.answers).length;
        score = answeredCount; // Simple scoring: 1 point per answered question
      }

      const response = await storage.createQuizResponse({
        ...responseData,
        score,
      });
      
      res.json(response);
    } catch (error) {
      console.error("Submit quiz response error:", error);
      res.status(400).json({ 
        error: "Invalid response data", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get user's quiz responses
  app.get("/api/users/:userId/quiz-responses", async (req, res) => {
    try {
      const responses = await storage.getQuizResponsesByUser(req.params.userId);
      res.json(responses);
    } catch (error) {
      console.error("Get user responses error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get specific user quiz response
  app.get("/api/users/:userId/quiz-responses/:quizId", async (req, res) => {
    try {
      const response = await storage.getUserQuizResponse(
        req.params.userId, 
        req.params.quizId
      );
      
      if (!response) {
        return res.status(404).json({ error: "Quiz response not found" });
      }
      
      res.json(response);
    } catch (error) {
      console.error("Get user quiz response error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
