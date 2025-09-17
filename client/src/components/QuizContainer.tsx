import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import RegistrationModal, { type RegistrationData } from "./RegistrationModal";
import QuizQuestion, { type Question } from "./QuizQuestion";
import ProgressIndicator from "./ProgressIndicator";
import QuizNavigation from "./QuizNavigation";

interface User {
  id: string;
  name: string;
  school: string;
  phoneNumber: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
}

export default function QuizContainer() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState<string>("quiz-1"); // Default to first quiz
  
  const { toast } = useToast();

  // Fetch quiz data
  const { data: quiz, isLoading: quizLoading, error: quizError } = useQuery<Quiz>({
    queryKey: ['/api/quizzes', currentQuizId],
    enabled: isRegistered && !!currentQuizId,
  });

  // User registration mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: RegistrationData): Promise<User> => {
      const res = await apiRequest('POST', `/api/users`, userData);
      return await res.json();
    },
    onSuccess: (user: User) => {
      setUserInfo(user);
      setIsRegistered(true);
      toast({
        title: "Welcome!",
        description: `Hello ${user.name}, let's start the quiz!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error?.details || "Failed to register. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Quiz response submission mutation
  const submitMutation = useMutation({
    mutationFn: async (responseData: { userId: string; quizId: string; answers: Record<string, string> }) => {
      const res = await apiRequest('POST', `/api/quiz-responses`, responseData);
      return await res.json();
    },
    onSuccess: (response: any) => {
      setIsCompleted(true);
      const score = response.score || Object.keys(answers).length;
      const totalQuestions = quiz?.questions?.length || 1;
      const percentage = Math.round((score / totalQuestions) * 100);
      
      toast({
        title: "Quiz Completed!",
        description: `You answered ${score} out of ${totalQuestions} questions (${percentage}%).`,
      });

      // Invalidate queries to refresh any cached data
      queryClient.invalidateQueries({ queryKey: ['/api/users', userInfo?.id, 'quiz-responses'] });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error?.details || "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    },
  });

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];
  const totalQuestions = quiz?.questions?.length || 0;
  const answeredQuestions = Object.keys(answers).length;

  const handleRegistration = (data: RegistrationData) => {
    console.log('User registering:', data);
    registerMutation.mutate(data);
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    console.log('Quiz submitted with answers:', answers);
    
    if (!userInfo || !currentQuizId) {
      toast({
        title: "Error",
        description: "Missing user information or quiz data.",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate({
      userId: userInfo.id,
      quizId: currentQuizId,
      answers,
    });
  };

  const isCurrentAnswered = currentQuestion && answers[currentQuestion.id];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Show loading state while registering or quiz is loading
  if (registerMutation.isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto p-8 text-center">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Creating your account...
            </h2>
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </Card>
      </div>
    );
  }

  if (quizLoading && isRegistered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto p-8 text-center">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Loading quiz...
            </h2>
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </Card>
      </div>
    );
  }

  if (quizError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto p-8 text-center">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-destructive">
              Failed to load quiz
            </h2>
            <p className="text-muted-foreground">
              Please refresh the page and try again.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto p-8 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground" data-testid="text-completion-title">
              Quiz Completed!
            </h2>
            <p className="text-muted-foreground" data-testid="text-completion-message">
              Thank you {userInfo?.name} for taking the quiz!
            </p>
            <div className="bg-secondary/20 rounded-lg p-4 border-l-4 border-secondary">
              <p className="text-lg font-semibold text-secondary-foreground" data-testid="text-final-score">
                You answered {Object.keys(answers).length} out of {totalQuestions} questions
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Score: {Math.round((Object.keys(answers).length / totalQuestions) * 100)}%
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex items-center justify-center py-8">
      <div className="w-full max-w-2xl mx-auto">
        <RegistrationModal
          isOpen={!isRegistered}
          onSubmit={handleRegistration}
        />

        {isRegistered && currentQuestion && (
          <div className="rounded-3xl shadow-2xl bg-white/90 border border-indigo-100 px-8 py-10 space-y-10">
            <ProgressIndicator
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              answeredQuestions={answeredQuestions}
            />

            <QuizQuestion
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              selectedAnswer={answers[currentQuestion.id]}
              onAnswerSelect={handleAnswerSelect}
            />

            <QuizNavigation
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              canPrevious={currentQuestionIndex > 0}
              canNext={currentQuestionIndex < totalQuestions - 1}
              isAnswered={!!isCurrentAnswered}
              isLastQuestion={isLastQuestion}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmitQuiz}
            />

            {submitMutation.isPending && (
              <div className="w-full text-center mt-6">
                <p className="text-sm text-indigo-500 flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  Submitting your answers...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}