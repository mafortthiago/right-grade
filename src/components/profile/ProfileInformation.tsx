import React from "react";
import { BsEnvelopeAtFill, BsPersonSquare } from "react-icons/bs";
import { Teacher } from "../../store/teacher/interfaces/Teacher";

interface ProfileInformationProps {
  teacher: Teacher;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({ teacher }) => {
  return (
    <div className="w-3/4 flex flex-col sm:flex-row items-center sm:mb-2">
      <BsPersonSquare className="w-20 h-20" />
      <div className="mt-1 sm:ml-6 flex flex-col justify-center items-center sm:items-start">
        <h3 className="font-medium">{teacher.name}</h3>
        <p className="flex items-center">
          <BsEnvelopeAtFill />
          <span className="ml-2">{teacher.email}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileInformation;
