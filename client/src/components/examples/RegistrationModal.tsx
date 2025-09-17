import RegistrationModal from '../RegistrationModal';

export default function RegistrationModalExample() {
  return (
    <RegistrationModal
      isOpen={true}
      onSubmit={(data) => console.log('Registration submitted:', data)}
    />
  );
}