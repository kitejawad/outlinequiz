import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
}

export default function ProgressIndicator({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
}: ProgressIndicatorProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const answeredPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground" data-testid="text-quiz-title">
          Quiz App
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle className="w-4 h-4 text-secondary" />
          <span data-testid="text-answered-count">
            {answeredQuestions}/{totalQuestions} answered
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground" data-testid="text-progress-label">
            Progress
          </span>
          <span className="text-sm text-muted-foreground" data-testid="text-progress-percentage">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="h-2"
          data-testid="progress-bar"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span data-testid="text-current-question">
            Question {currentQuestion}
          </span>
          <span data-testid="text-total-questions">
            of {totalQuestions}
          </span>
        </div>
      </div>

      {answeredPercentage < 100 && (
        <div className="text-sm text-muted-foreground text-center" data-testid="text-completion-hint">
          Answer all questions to complete the quiz
        </div>
      )}
    </div>
  );
}