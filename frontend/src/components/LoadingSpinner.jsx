function LoadingSpinner({ text = "Loading..." }) {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <h3>{text}</h3>
            <p>Please wait...</p>
        </div>
    );
}

export default LoadingSpinner;