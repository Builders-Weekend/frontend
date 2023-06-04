import "../styles/TogglePullOutComponent.css";

interface IPullOutComponentProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function TogglePutOutComponent({ isOpen, setIsOpen }: IPullOutComponentProps) {
  const togglePullOut = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="button-container">
      <button onClick={togglePullOut} className={`button ${isOpen ? 'active': 'inactive'}`}>
        {!isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="button"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="button"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default TogglePutOutComponent;
