import ProgressIndicator from '../ProgressIndicator';

export default function ProgressIndicatorExample() {
  return (
    <div className="p-4">
      <ProgressIndicator
        currentQuestion={3}
        totalQuestions={10}
        answeredQuestions={2}
      />
    </div>
  );
}