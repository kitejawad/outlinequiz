import QuizNavigation from '../QuizNavigation';

export default function QuizNavigationExample() {
  return (
    <div className="p-4">
      <QuizNavigation
        currentQuestion={3}
        totalQuestions={10}
        canPrevious={true}
        canNext={true}
        isAnswered={true}
        isLastQuestion={false}
        onPrevious={() => console.log('Previous clicked')}
        onNext={() => console.log('Next clicked')}
        onSubmit={() => console.log('Submit clicked')}
      />
    </div>
  );
}