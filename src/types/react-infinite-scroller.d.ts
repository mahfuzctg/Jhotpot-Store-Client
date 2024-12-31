declare module 'react-infinite-scroller' {
    import * as React from 'react';
  
    interface InfiniteScrollProps {
      pageStart?: number;
      loadMore: (page: number) => void;
      hasMore?: boolean;
      loader?: React.ReactNode;
      threshold?: number;
      useWindow?: boolean;
      initialLoad?: boolean;
      getScrollParent?: () => HTMLElement | null;
      className?: string;
      element?: string;
      children: React.ReactNode;
    }
  
    const InfiniteScroll: React.FC<InfiniteScrollProps>;
    export default InfiniteScroll;
  }
  