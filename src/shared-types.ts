interface ApiResponse<R> {
  status: number;
  data: R;
}

interface ApiError {
  message: string;
}

export type { ApiResponse, ApiError };