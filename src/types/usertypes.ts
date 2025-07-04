export interface UserSignupDataType {
  username: string;
  email: string;
  password: string;
  profilePic: string;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  role: "Admin" | "Manager" | "Member";
  profilePic: string;
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
  __v: number;
}

export interface UserSignupDatatype {
  username: string;
  email: string;
  password: string;
  profilePic: string;
}

export interface TaskCreateDataType {
  title: string;
  description: string;
  assignedTo: string;
}
export interface TaskUpdateDataType {
  title: string;
  description: string;
  assignedTo: string;
  status: string;
}
export interface TaskDataType {
  _id: string;
  title: string;
  description: string;
  status: "TO DO" | "In Progress" | "Done"; // extend as needed
  assignedTo: string;
  assignedToUserId: {
    _id: string;
    username: string;
    profilePic: string;
  }; // populated user object
  createdBy: string; // still a string (user ID)
  createdAt: string; // ISO date string, or use `Date` if parsed
  updatedAt: string;
  __v: number; // version key from Mongoose
}
