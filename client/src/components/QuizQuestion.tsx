import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onAnswerSelect: (questionId: string, answerId: string) => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
}: QuizQuestionProps) {
  const [localAnswer, setLocalAnswer] = useState(selectedAnswer || "");

  const handleAnswerChange = (value: string) => {
    setLocalAnswer(value);
    onAnswerSelect(question.id, value);
    console.log(`Question ${questionNumber}: Selected answer ${value}`);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-2xl bg-white/95 border border-indigo-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-indigo-500" data-testid="text-question-counter">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm text-indigo-400">
            {Math.round((questionNumber / totalQuestions) * 100)}% Complete
          </span>
        </div>
        <h2 className="text-2xl font-bold text-indigo-700 leading-relaxed mb-2" data-testid={`text-question-${question.id}`}> 
          {question.text}
        </h2>
      </CardHeader>

      <CardContent className="pt-0">
        <RadioGroup
          value={localAnswer}
          onValueChange={handleAnswerChange}
          className="space-y-4"
          data-testid={`radiogroup-question-${question.id}`}
        >
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 transition-all duration-150 hover:bg-indigo-50 hover:shadow-md rounded-xl p-3 cursor-pointer">
              <RadioGroupItem
                value={option.id}
                id={option.id}
                data-testid={`radio-option-${option.id}`}
                className="border-indigo-400 focus:ring-indigo-500"
              />
              <Label
                htmlFor={option.id}
                className="flex-1 text-base font-medium leading-relaxed cursor-pointer text-indigo-700"
                data-testid={`label-option-${option.id}`}
              >
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {localAnswer && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl border-l-4 border-indigo-400">
            <p className="text-base text-indigo-700 font-semibold" data-testid="text-answer-selected">
              Answer selected: {question.options.find(opt => opt.id === localAnswer)?.text}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}