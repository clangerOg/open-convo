export type ServiceResult<T> =
  | {
      success: true;
      error?: undefined | null;
      data: T;
    }
  | {
      success: false;
      error: string;
      data: null;
    };
