import React from "react";
import { FieldStaffPosition } from "@/constants/video.constant";

interface CoachingQuestionsProps {
  fieldStaffPosition:
    | FieldStaffPosition.HEAD_COACH
    | FieldStaffPosition.ASSISTANT_COACH;
}

const headCoachQuestions = [
  {
    section: "A. Background & Role Definition",
    questions: [
      "Can you describe your coaching background and pathway to your current level?",
      "How would you describe your coaching philosophy, and how has it evolved over time?",
      "What do you see as your main responsibilities as a head coach within a club or organization?",
    ],
  },
  {
    section: "B. Technical & Tactical Expertise",
    questions: [
      "How do you evaluate team tactical performance during matches?",
      "How do you assess whether players understand and apply your game principles?",
      "How do you analyze match data or video to improve team performance?",
    ],
  },
  {
    section: "C. Methodology, Training & Playing Model",
    questions: [
      "How do you structure your training sessions and weekly planning to reflect your coaching methodology?",
      "What are your main game principles, and how do you ensure they are applied consistently during matches?",
      "When you introduce a new tactical concept, how do you teach it so all players understand and can execute it?",
    ],
  },
  {
    section: "D. Leadership & Communication",
    questions: [
      "How do you establish your authority and leadership within a new team?",
      "Describe a moment when you had to make an unpopular decision. How did you handle it?",
      "Describe a situation where you had to communicate a difficult decision to your team. What was your approach?",
    ],
  },
  {
    section: "E. Adaptability & Problem Solving",
    questions: [
      "Describe a match where your original game plan did not work. What did you change and why?",
      "Tell us about a time when you had to coach with limited resources (time, staff, facilities, injuries). How did you manage it?",
      "How do you adjust your coaching approach to different age groups and competitive levels?",
    ],
  },
  {
    section: "F. Professionalism, Staff Building & Evaluation",
    questions: [
      "What do you consider to be your main strengths as a coach, and which areas are you actively working to improve?",
      "What has been the toughest professional challenge you have faced as a coach, and how did you overcome it?",
      "What is your process for selecting and building your coaching staff?",
    ],
  },
];

const assistantCoachQuestions = [
  {
    section: "A. Role & Support",
    questions: [
      "How do you define your role as an assistant coach within a technical staff?",
      "How do you support the head coach's vision and game model on a daily basis?",
      "How do you adapt when your personal ideas differ from the head coach's decisions?",
    ],
  },
  {
    section: "B. Technical & Tactical Expertise",
    questions: [
      "How do you analyze team performance during matches?",
      "How do you contribute tactically during training sessions?",
      "How do you support tactical corrections during games?",
    ],
  },
  {
    section: "C. Training & Methodology",
    questions: [
      "What is your role in planning and delivering training sessions?",
      "How do you ensure training content aligns with the team's tactical principles?",
      "How do you contribute to individual player development during the week?",
    ],
  },
  {
    section: "D. Match Preparation & Analysis",
    questions: [
      "What is your involvement in match preparation and opponent analysis?",
      "How do you communicate key tactical information to players before a match?",
      "What is your role during matches (bench management, feedback, observation)?",
    ],
  },
  {
    section: "E. Communication, Leadership & Collaboration",
    questions: [
      "How do you communicate with players while respecting the head coach's authority?",
      "How do you handle players who are frustrated with playing time or role?",
      "How do you collaborate with other staff (fitness, goalkeeper, analyst, medical)?",
    ],
  },
  {
    section: "F. Professional Development & Evaluation",
    questions: [
      "How do you evaluate your own performance as an assistant coach?",
      "What skills or experiences are you currently developing to grow in your coaching career?",
      "How do you contribute to maintaining a positive and professional team environment?",
    ],
  },
];

export function CoachingQuestions({
  fieldStaffPosition,
}: CoachingQuestionsProps) {
  const questions =
    fieldStaffPosition === FieldStaffPosition.HEAD_COACH
      ? headCoachQuestions
      : assistantCoachQuestions;

  const title =
    fieldStaffPosition === FieldStaffPosition.HEAD_COACH
      ? "Head Coach – Interview Questionnaire (18 Questions)"
      : "Assistant Coach – Evaluation Questionnaire (18 Questions)";

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">
        Please record a video answering the following questions and upload it in
        the sections below:
      </p>

      <div className="space-y-4">
        {questions.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-2">
            <h4 className="font-semibold text-gray-800 text-sm">
              {section.section}
            </h4>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              {section.questions.map((question, questionIndex) => (
                <li key={questionIndex} className="text-sm text-gray-700">
                  {question}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
