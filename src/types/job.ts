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
