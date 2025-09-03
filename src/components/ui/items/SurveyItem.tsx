'use client';

import React from 'react';

interface Topic {
  id: string;
  title: string;
  isMine: boolean;
  recommendUsers: string[];
  tags: string[];
  isLiked?: boolean;
}

interface CardComponentProps {
  topic: Topic;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
}

const RecommendIcon = ({ isLiked }: { isLiked?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.568" strokeLinecap="round" strokeLinejoin="round" className={isLiked ? 'text-[#F03131]' : 'text-gray-900'} >
        <path d="M17.9201 12.448H1.12012M3.64012 2.84805C3.64012 1.96805 4.39612 1.24805 5.32012 1.24805H13.7201C14.1657 1.24805 14.593 1.41662 14.9081 1.71668C15.2231 2.01673 15.4001 2.4237 15.4001 2.84805V12.448H3.64012V2.84805Z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-red-500 transition-colors" >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

const CardComponent = ({ topic, onDelete, onLike }: CardComponentProps) => {
  const { id, title, isMine, recommendUsers, tags, isLiked } = topic;
  const votes = recommendUsers.length;

  return (
    <div
      className="bg-[#F9F9F9] rounded-xl p-6 w-80 h-[180px] flex flex-col relative transition-all duration-200 ease-in-out hover:translate-y-[-5px]"
    >
      {isMine && (
        <button
          className="absolute top-5 right-5 bg-none border-none cursor-pointer p-1 rounded-full hover:bg-gray-100"
          onClick={() => onDelete(id)}
          aria-label="삭제"
        >
          <TrashIcon />
        </button>
      )}
      <div className="text-sm text-gray-600 mb-4">
        {tags && tags.length > 0 ? tags.join(' · ') : ''}
      </div>
      <div className="text-xl font-bold leading-tight mb-6 text-gray-800">
        {title}
      </div>
      <footer className="flex justify-end items-center mt-auto">
        <button
          onClick={() => onLike(id)}
          className="flex items-center text-sm text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="추천하기"
        >
          <RecommendIcon isLiked={isLiked} />
          <span className="text-[#F03131] font-bold ml-1.5">
            {votes}표
          </span>
        </button>
      </footer>
    </div>
  );
};

export default CardComponent;