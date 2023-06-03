import React, { useState } from "react";

function PullOutComponent() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const togglePullOut = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="container">
            <div className={`pullout ${isOpen ? "open" : ""}`}>
                <button onClick={togglePullOut}>Toggle</button>
                <div className="content">
                    <p>Content goes here</p>
                </div>
            </div>
        </div>
    )
}

export default PullOutComponent;