export interface PaginationInterface {
    pageIndex: number;
    totalCount: number;
    pageSize: number;
    onPageIndexChanged?: (pageIndex: number) => void;
    onPageSizeChanged?: (pageSize: number) => void;
    isRemoveTexts: boolean;
    isReversedSections: boolean;
    idRef: string;
    parentTranslationPath: string;
    translationPath: string;
    perPageText: string;
    pagesText: string;
    ofText: string;
    numberOfItemsBefore: number;
    numberOfItemsAfter: number;
  }
