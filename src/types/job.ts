export interface TJob {
  _id: string;
  jobTitle: string;
  jobOverview: string;
  jobCategory: string;
  position: string;
  location: string;
  country: string;
  requirements: string;
  additionalRequirements?: string;
  requiredSkills: string;
  requiredAiScore: number;
  experience: string;
  salary: {
    min: number;
    max: number;
  };
  contractType: string;
  creator: {
    creatorId: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      profileImage: string | null;
      role: string;
    };
    creatorRole: string;
  };
  responsibilities: string;
  applicationCount: number;
  searchKeywords: string[];
  status: string;
  deadline: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface TJobCountByRole {
  jobCount: number;
  role: string;
}

export interface TSavedJob {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: null | string;
  };
  jobId: TJob;
  userType: string;
  userRole: string;
  createdAt: string;
  updatedAt: string;
}

export interface TAppliedJob {
  _id: string;
  jobId: TJob;
  candidateId: string;
  appliedAt: string;
  aiMatchPercentage: number;
  resumeUrl: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
