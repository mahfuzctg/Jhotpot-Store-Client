declare module 'react-infinite-scroll-component' {
    import * as React from 'react';
  
    interface InfiniteScrollProps {
      dataLength: number;
      next: () => void;
      hasMore: boolean;
      loader?: React.ReactNode;
      endMessage?: React.ReactNode;
      scrollableTarget?: string;
      style?: React.CSSProperties;
      children: React.ReactNode;
    }
  
    const InfiniteScroll: React.FC<InfiniteScrollProps>;
    export default InfiniteScroll;
  }
  