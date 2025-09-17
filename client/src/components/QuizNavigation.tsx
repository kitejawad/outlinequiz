import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  canPrevious: boolean;
  canNext: boolean;
  isAnswered: boolean;
  isLastQuestion: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function QuizNavigation({
  currentQuestion,
  totalQuestions,
  canPrevious,
  canNext,
  isAnswered,
  isLastQuestion,
  onPrevious,
  onNext,
  onSubmit,
}: QuizNavigationProps) {
  
  const handlePrevious = () => {
    console.log('Previous button clicked');
    onPrevious();
  };

  const handleNext = () => {
    console.log('Next button clicked');
    onNext();
  };

  const handleSubmit = () => {
    console.log('Submit quiz clicked');
    onSubmit();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!canPrevious}
          className="flex items-center gap-2"
          data-testid="button-previous"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {/* Question indicators */}
          <div className="flex gap-1" data-testid="question-indicators">
            {Array.from({ length: totalQuestions }, (_, index) => (
              <div
                key={index + 1}
                className={`w-2 h-2 rounded-full ${
                  index + 1 === currentQuestion
                    ? 'bg-primary'
                    : index + 1 < currentQuestion
                    ? 'bg-secondary'
                    : 'bg-muted'
                }`}
                data-testid={`indicator-question-${index + 1}`}
              />
            ))}
          </div>
        </div>

        {!isLastQuestion ? (
          <Button
            onClick={handleNext}
            disabled={!canNext || !isAnswered}
            className="flex items-center gap-2"
            data-testid="button-next"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!isAnswered}
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/90"
            data-testid="button-submit"
          >
            Submit Quiz
          </Button>
        )}
      </div>

      {!isAnswered && (
        <div className="text-center mt-3">
          <p className="text-sm text-muted-foreground" data-testid="text-answer-prompt">
            Please select an answer to continue
          </p>
        </div>
      )}
    </div>
  );
}