// Video constants and configuration

// Video Type Enum
export enum VideoType {
  PRE_RECORDED_INTERVIEW = "Pre-recorded Interview",
  TECHNICAL = "Technical",
  TACTICAL = "Tactical",
  GAME_PRINCIPALS = "Game's Principals",
  METHODOLOGY = "Methodology",
  TRAINING_METHODOLOGY = "Training Methodology",
  SCOUTING_METHODOLOGY = "Scouting Methodology",
  YOUTH_DEVELOPMENT_METHODOLOGY = "Youth Development Methodology",
  CLUB_PHILOSOPHY_METHODOLOGY = "Club's Philosophy & Methodology",
  PLAYER_RECRUITMENT_METHODOLOGY = "Player Recruitment Methodology",
  COACHING_RECRUITMENT_METHODOLOGY = "Coaching Recruitment Methodology",
  HIGHLIGHTS = "Highlights",
}

export enum TPosition {
  HEAD_COACH = "Head Coach",
  ASSISTANT_COACH = "Assistant Coach",
  GK_COACH = "GK Coach",
  MENTAL_COACH = "Mental Coach",
  VIDEO_ANALYST_COACH = "Video Analyst Coach",
  SPECIFIC_OFFENSIVE_COACH = "Specific Offensive Coach",
  SPECIFIC_DEFENSIVE_COACH = "Specific Defensive Coach",
  SPECIFIC_TECHNICAL_COACH = "Specific Technical Coach",
  SCOUT = "Scout",
  TECHNICAL_DIRECTOR = "Technical Director",
  ACADEMY_DIRECTOR = "Academy Director",
  DIRECTOR_OF_COACHING = "Director of Coaching",
}

export enum PlayerRole {
  PROFESSIONAL_PLAYER = "Professional Player",
  AMATEUR_PLAYER = "Amateur Player",
}

export enum OfficeStaffPosition {
  ADMINISTRATIVE_DIRECTOR = "Administrative Director",
  COMMUNITY_MANAGER = "Community Manager",
  DATA_ANALYST = "Data Analyst",
  DIGITAL_MARKETING = "Digital Marketing",
  MEDICAL_STAFF = "Medical Staff",
  PERFORMANCE_STAFF = "Performance Staff",
  EQUIPMENT_STAFF = "Equipment Staff",
  SALES = "Sales",
}

export interface IVideoRequirement {
  type: VideoType;
  required: boolean;
}

export interface IPositionVideoConfig {
  position: string;
  totalVideos: number;
  maxDuration: number; // seconds
  requiredVideoTypes: IVideoRequirement[];
  forbiddenVideoTypes?: VideoType[];
}

// Small helper types
export interface IVideo {
  url?: string;
  file?: File;
  duration?: number;
  type?: VideoType;
}

// Video Requirements Configuration for each position
export const VIDEO_REQUIREMENTS: Record<string, IPositionVideoConfig> = {
  // ON FIELD STAFF
  [TPosition.HEAD_COACH]: {
    position: TPosition.HEAD_COACH,
    totalVideos: 4,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.TECHNICAL, required: true },
      { type: VideoType.TACTICAL, required: true },
      { type: VideoType.GAME_PRINCIPALS, required: true },
    ],
  },

  [TPosition.ASSISTANT_COACH]: {
    position: TPosition.ASSISTANT_COACH,
    totalVideos: 4,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.TECHNICAL, required: true },
      { type: VideoType.TACTICAL, required: true },
      { type: VideoType.GAME_PRINCIPALS, required: true },
    ],
  },

  [TPosition.GK_COACH]: {
    position: TPosition.GK_COACH,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: true },
    ],
  },

  [TPosition.MENTAL_COACH]: {
    position: TPosition.MENTAL_COACH,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: true },
    ],
  },

  [TPosition.VIDEO_ANALYST_COACH]: {
    position: TPosition.VIDEO_ANALYST_COACH,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: true },
    ],
  },

  [TPosition.SPECIFIC_OFFENSIVE_COACH]: {
    position: TPosition.SPECIFIC_OFFENSIVE_COACH,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.TRAINING_METHODOLOGY, required: true },
    ],
  },

  [TPosition.SPECIFIC_DEFENSIVE_COACH]: {
    position: TPosition.SPECIFIC_DEFENSIVE_COACH,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.TRAINING_METHODOLOGY, required: true },
    ],
  },

  [TPosition.SPECIFIC_TECHNICAL_COACH]: {
    position: TPosition.SPECIFIC_TECHNICAL_COACH,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.TRAINING_METHODOLOGY, required: true },
    ],
  },

  [TPosition.SCOUT]: {
    position: TPosition.SCOUT,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.SCOUTING_METHODOLOGY, required: true },
    ],
  },

  [TPosition.TECHNICAL_DIRECTOR]: {
    position: TPosition.TECHNICAL_DIRECTOR,
    totalVideos: 3,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.CLUB_PHILOSOPHY_METHODOLOGY, required: true },
      { type: VideoType.PLAYER_RECRUITMENT_METHODOLOGY, required: true },
    ],
  },

  [TPosition.ACADEMY_DIRECTOR]: {
    position: TPosition.ACADEMY_DIRECTOR,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.YOUTH_DEVELOPMENT_METHODOLOGY, required: true },
    ],
  },

  [TPosition.DIRECTOR_OF_COACHING]: {
    position: TPosition.DIRECTOR_OF_COACHING,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.COACHING_RECRUITMENT_METHODOLOGY, required: true },
    ],
  },

  // OFFICE STAFF (all have same structure)
  [OfficeStaffPosition.ADMINISTRATIVE_DIRECTOR]: {
    position: OfficeStaffPosition.ADMINISTRATIVE_DIRECTOR,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: false }, // Optional
    ],
  },

  [OfficeStaffPosition.COMMUNITY_MANAGER]: {
    position: OfficeStaffPosition.COMMUNITY_MANAGER,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: false }, // Optional
    ],
  },

  [OfficeStaffPosition.DATA_ANALYST]: {
    position: OfficeStaffPosition.DATA_ANALYST,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: false }, // Optional
    ],
  },

  [OfficeStaffPosition.DIGITAL_MARKETING]: {
    position: OfficeStaffPosition.DIGITAL_MARKETING,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: false }, // Optional
    ],
  },

  [OfficeStaffPosition.MEDICAL_STAFF]: {
    position: OfficeStaffPosition.MEDICAL_STAFF,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: false }, // Optional
    ],
  },

  [OfficeStaffPosition.PERFORMANCE_STAFF]: {
    position: OfficeStaffPosition.PERFORMANCE_STAFF,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: false }, // Optional
    ],
  },

  [OfficeStaffPosition.EQUIPMENT_STAFF]: {
    position: OfficeStaffPosition.EQUIPMENT_STAFF,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: false }, // Optional
    ],
  },

  [OfficeStaffPosition.SALES]: {
    position: OfficeStaffPosition.SALES,
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.PRE_RECORDED_INTERVIEW, required: true },
      { type: VideoType.METHODOLOGY, required: false }, // Optional
    ],
  },

  // PLAYERS
  "Professional Player": {
    position: "Professional Player",
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.HIGHLIGHTS, required: true },
      { type: VideoType.HIGHLIGHTS, required: true },
    ],
    forbiddenVideoTypes: [VideoType.PRE_RECORDED_INTERVIEW], // Players don't need interview
  },

  "Amateur Player": {
    position: "Amateur Player",
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.HIGHLIGHTS, required: true },
      { type: VideoType.HIGHLIGHTS, required: true },
    ],
    forbiddenVideoTypes: [VideoType.PRE_RECORDED_INTERVIEW], // Players don't need interview
  },

  // HIGH SCHOOL & COLLEGE/UNIVERSITY (Student Players)
  "High School": {
    position: "High School",
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.HIGHLIGHTS, required: true },
      { type: VideoType.HIGHLIGHTS, required: true },
    ],
    forbiddenVideoTypes: [VideoType.PRE_RECORDED_INTERVIEW], // Players don't need interview
  },

  "College/University": {
    position: "College/University",
    totalVideos: 2,
    maxDuration: 180,
    requiredVideoTypes: [
      { type: VideoType.HIGHLIGHTS, required: true },
      { type: VideoType.HIGHLIGHTS, required: true },
    ],
    forbiddenVideoTypes: [VideoType.PRE_RECORDED_INTERVIEW], // Players don't need interview
  },
};

export const getVideoRequirements = (position: string) => {
  const requirements = VIDEO_REQUIREMENTS[position];
  if (!requirements)
    throw new Error(`No video requirements found for position: ${position}`);
  return requirements;
};

export const isOfficeStaff = (position: string): boolean => {
  return Object.values(OfficeStaffPosition).includes(
    position as OfficeStaffPosition
  );
};

export const isPlayer = (position: string): boolean => {
  return (
    position === "Professional Player" ||
    position === "Amateur Player" ||
    position === "High School" ||
    position === "College/University"
  );
};
