import { CircularProgress } from "@nextui-org/react";

const Loading = () => {
    return (
        <div className="flex items-center px-6 justify-center w-6 h-6">
            <CircularProgress size="sm" color="secondary" aria-label="Loading..." />
        </div>
    );
};

export default Loading;
