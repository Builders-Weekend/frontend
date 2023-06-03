import "../styles/TogglePullOutComponent.css";

interface IPullOutComponentProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function TogglePutOutComponent({ isOpen, setIsOpen }: IPullOutComponentProps) {
  const togglePullOut = () => {
    setIsOpen(!isOpen);
  };

  return <button onClick={togglePullOut}>Toggle</button>;
}

export default TogglePutOutComponent;
