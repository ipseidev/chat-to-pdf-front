import React from 'react'

type MessageProps = {
    message: string;
    avatar: string;
    side: string;
}

export default function Message({message, avatar, side}: MessageProps) {

    const isLeft = side === 'left';

  return (
                <div className={`col-start-${isLeft ? "1" : "6"} col-end-${isLeft ? "8" : "13"} p-3 rounded-lg`}>
                      <div className={`flex items-center ${isLeft ? "flex-row " : "justify-start flex-row-reverse"}`}>
                        <div
                          className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                        >
                            {avatar}
                        </div>
                        <div
                          className={`relative  text-sm ${isLeft ? "bg-white ml-3" : "bg-indigo-100 mr-3"} py-2 px-4 shadow rounded-xl`}
                        >
                          <div>
                            {message}
                          </div>
                        </div>
                      </div>
                    </div>  
    )
}
