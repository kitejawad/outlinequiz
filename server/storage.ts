import { 
  type User, 
  type InsertUser, 
  type Quiz, 
  type InsertQuiz, 
  type QuizResponse, 
  type InsertQuizResponse,
  type QuestionData 
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quiz methods
  getQuiz(id: string): Promise<Quiz | undefined>;
  getAllQuizzes(): Promise<Quiz[]>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  // Quiz Response methods
  createQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  getQuizResponsesByUser(userId: string): Promise<QuizResponse[]>;
  getUserQuizResponse(userId: string, quizId: string): Promise<QuizResponse | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizzes: Map<string, Quiz>;
  private quizResponses: Map<string, QuizResponse>;

  constructor() {
    this.users = new Map();
    this.quizzes = new Map();
    this.quizResponses = new Map();
    
    // Initialize with sample quiz data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const questions: QuestionData[] = [
      {
        id: "q1",
        text: "Which programming language is known for its use in web development and has a syntax similar to C++?",
        options: [
          { id: "a1", text: "Python" },
          { id: "a2", text: "JavaScript" },
          { id: "a3", text: "Java" },
          { id: "a4", text: "Ruby" }
        ]
      },
      {
        id: "q2",
        text: "What does HTML stand for?",
        options: [
          { id: "b1", text: "Hypertext Markup Language" },
          { id: "b2", text: "Home Tool Markup Language" },
          { id: "b3", text: "Hyperlinks and Text Markup Language" },
          { id: "b4", text: "Hypermedia Transfer Markup Language" }
        ]
      },
      {
        id: "q3",
        text: "Which CSS property is used to change the text color?",
        options: [
          { id: "c1", text: "font-color" },
          { id: "c2", text: "text-color" },
          { id: "c3", text: "color" },
          { id: "c4", text: "foreground-color" }
        ]
      },
      {
        id: "q4",
        text: "What is the correct way to create a function in JavaScript?",
        options: [
          { id: "d1", text: "function = myFunction() {}" },
          { id: "d2", text: "function myFunction() {}" },
          { id: "d3", text: "create myFunction() {}" },
          { id: "d4", text: "def myFunction() {}" }
        ]
      },
      {
        id: "q5",
        text: "Which company developed React?",
        options: [
          { id: "e1", text: "Google" },
          { id: "e2", text: "Microsoft" },
          { id: "e3", text: "Facebook (Meta)" },
          { id: "e4", text: "Twitter" }
        ]
      }
    ];

    const sampleQuiz: Quiz = {
      id: "quiz-1",
      title: "Web Development Basics",
      description: "Test your knowledge of web development fundamentals",
      questions,
      createdAt: new Date(),
    };
    
    this.quizzes.set(sampleQuiz.id, sampleQuiz);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getQuiz(id: string): Promise<Quiz | undefined> {
    return this.quizzes.get(id);
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizzes.values());
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = randomUUID();
    const quiz: Quiz = {
      ...insertQuiz,
      description: insertQuiz.description ?? null,
      id,
      createdAt: new Date(),
    };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  async createQuizResponse(insertResponse: InsertQuizResponse): Promise<QuizResponse> {
    const id = randomUUID();
    const response: QuizResponse = {
      ...insertResponse,
      score: insertResponse.score ?? null,
      id,
      completedAt: new Date(),
    };
    this.quizResponses.set(id, response);
    return response;
  }

  async getQuizResponsesByUser(userId: string): Promise<QuizResponse[]> {
    return Array.from(this.quizResponses.values()).filter(
      (response) => response.userId === userId
    );
  }

  async getUserQuizResponse(userId: string, quizId: string): Promise<QuizResponse | undefined> {
    return Array.from(this.quizResponses.values()).find(
      (response) => response.userId === userId && response.quizId === quizId
    );
  }
}

export const storage = new MemStorage();
