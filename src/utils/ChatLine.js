import React from "react";

function ChatLine(props) {
  const { userAvatar, content, time, type } = props;

  return (
    <div className="w-full">
      {type === "sender" ? (
        <div className="flex justify-end gap-x-4 px-6 py-1 ">
          {/* Content */}
          <div className="flex flex-col justify-end px-4 py-2 space-y-2 w-fit h-fit text-white rounded-2xl rounded-tl-none bg-violet-600">
            <div className="text-[15px] text-right ">{content}</div>
            <div className="text-xs mt-2 text-right">{time}</div>
          </div>
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          ></img>
        </div>
      ) : type === "receiver" ? (
        <div className="flex justify-start gap-x-4 px-6 py-1 w-full">
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          ></img>

          {/* Content */}
          <div className="flex flex-col px-4 py-2 space-y-2 h-fit text-gray-700 rounded-2xl rounded-tl-none bg-gray-100">
            <div className="text-[15px] ">{content}</div>
            <div className="text-xs mt-2 ">{time}</div>
          </div>
        </div>
      ) : (
        <div>{/* Default case or other conditions */}</div>
      )}
    </div>
  );
}

export default ChatLine;
