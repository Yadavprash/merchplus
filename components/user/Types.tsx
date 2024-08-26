// Type for the user
interface User {
    name: string;
    email: string;
    id: string;
  }
  
  // Type for the data object
  interface Data {
    user: User;
    expires: string;
  }
  
  // Type for the entire response
export interface AuthResponse {
    data: Data;
    status: string;
  }