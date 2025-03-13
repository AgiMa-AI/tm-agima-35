
import React from 'react';

const AuthDecorations = () => {
  return (
    <>
      {/* 顶部动态图形元素 - 调整移动端尺寸和位置 */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <div className="brand-gradient h-16 sm:h-24 w-full opacity-20 blur-3xl -mt-8 sm:-mt-12"></div>
        <div className="relative">
          <div className="absolute left-1/4 -top-2 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-primary/20 float-animation" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute left-1/2 -top-6 sm:-top-8 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-primary/10 float-animation" style={{animationDelay: '0s'}}></div>
          <div className="absolute right-1/4 -top-3 sm:-top-4 w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-primary/15 float-animation" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      {/* 底部装饰元素 - 调整移动端尺寸和位置 */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="relative">
          <div className="absolute left-1/5 bottom-10 sm:bottom-16 w-10 sm:w-16 h-10 sm:h-16 rounded-full bg-primary/20 float-animation" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute left-2/3 bottom-6 sm:bottom-10 w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-primary/15 float-animation" style={{animationDelay: '0.7s'}}></div>
        </div>
        <div className="brand-gradient h-16 sm:h-24 w-full opacity-20 blur-3xl"></div>
      </div>
    </>
  );
};

export default AuthDecorations;
