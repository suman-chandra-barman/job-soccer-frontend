import React from "react";
import { FieldStaffPosition } from "@/constants/video.constant";
import {
  assistantCoachQuestions,
  gkCoachQuestions,
  headCoachQuestions,
  mentalCoachQuestions,
  videoAnalystQuestions,
} from "@/constants/questions";

interface CoachingQuestionsProps {
  fieldStaffPosition:
    | FieldStaffPosition.HEAD_COACH
    | FieldStaffPosition.ASSISTANT_COACH
    | FieldStaffPosition.GK_COACH
    | FieldStaffPosition.MENTAL_COACH
    | FieldStaffPosition.VIDEO_ANALYST_COACH;
}

export function CoachingQuestions({
  fieldStaffPosition,
}: CoachingQuestionsProps) {
  let questions;
  let title;

  switch (fieldStaffPosition) {
    case FieldStaffPosition.HEAD_COACH:
      questions = headCoachQuestions;
      title = "Head Coach – Interview Questionnaire (18 Questions)";
      break;
    case FieldStaffPosition.ASSISTANT_COACH:
      questions = assistantCoachQuestions;
      title = "Assistant Coach – Evaluation Questionnaire (18 Questions)";
      break;
    case FieldStaffPosition.GK_COACH:
      questions = gkCoachQuestions;
      title = "Goalkeeper Coach – Interview Questionnaire (18 Questions)";
      break;
    case FieldStaffPosition.MENTAL_COACH:
      questions = mentalCoachQuestions;
      title = "Mental Coach – Interview Questionnaire (18 Questions)";
      break;
    case FieldStaffPosition.VIDEO_ANALYST_COACH:
      questions = videoAnalystQuestions;
      title = "Video Analyst – Interview Questionnaire (18 Questions)";
      break;
    default:
      questions = headCoachQuestions;
      title = "Interview Questionnaire (18 Questions)";
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">
        Please record videos answering the following questions and upload it in
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
