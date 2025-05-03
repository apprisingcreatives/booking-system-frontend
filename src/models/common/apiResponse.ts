export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  data: {
    message: string;
  };
  error: {
    type: string;
    details?: string[];
  };
}

export interface ApiMessageResponse {
  message: string;
}
