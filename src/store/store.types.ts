export interface ReduxErrorProps {
  status?: number;
  data?: {
    message?: string;
    error?: string;
    statusCode?: number;
  };
}
