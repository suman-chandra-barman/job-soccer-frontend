export interface Video {
  url: string;
  duration: number;
  title: string;
  uploadedAt: string;
  _id: string;
}

export interface Height {
  size: number;
  unit: string;
}

export interface Weight {
  size: number;
  unit: string;
}

export interface Profile {
  _id: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  phoneNumber: string;
  gender: string;
  height: Height;
  currentClub: string;
  category: string;
  position: string;
  agent: string;
  socialMedia: string;
  satOrAct: string;
  availability: string;
  weight: Weight;
  collegeOrUniversity: string;
  foot: string;
  league: string;
  schoolName: string;
  diploma: string;
  gpa: string;
  country: string;
  videos: Video[];
  createdAt: string;
  updatedAt: string;
}

export interface ICandidate {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage: string | null;
  userType: string;
  profile: Profile;
}
