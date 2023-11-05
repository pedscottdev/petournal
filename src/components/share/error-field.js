const ErrorField = ({ main, sub }) => {
    return (
        <p className="text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">{main ? main : ""}</span>
            {sub ? sub : ""}
        </p>
    );
};

export default ErrorField;
