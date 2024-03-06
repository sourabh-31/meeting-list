import React from "react";
import MeetingItem from "./MeetingItem";

const MeetingCard = ({ meeting }) => {
  return (
    <div className={`p-6 mt-8 mb-4 border-[1px] border-[#ffe8cc] bg-[#fff4e6]`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-[#595959]">
          Presented by: {meeting.MinutesBy}
        </span>
      </div>
      <MeetingItem label="Present:">{meeting.Present}</MeetingItem>
      <MeetingItem label="Apologies:">{meeting.Apologies}</MeetingItem>
      <MeetingItem label="Agenda Items:">{meeting["Agenda items"]}</MeetingItem>
      <MeetingItem label="Key Discussion Points:">
        {meeting["Key discussion points"]}
      </MeetingItem>
      <MeetingItem label="Any Later Changes?">
        {meeting["Any later changes?"]}
      </MeetingItem>
      <MeetingItem label="Action Items:">{meeting["Action items"]}</MeetingItem>
      <MeetingItem label="Action Item Done?">
        {meeting["Action item done?"]}
      </MeetingItem>
      <MeetingItem label="Outcomes:">
        {meeting["Outcomes and any further action items arising?"]}
      </MeetingItem>
      <MeetingItem label="Ideas for Further Discussion:">
        {meeting["Ideas that need further discussion"]}
      </MeetingItem>
    </div>
  );
};

export default MeetingCard;
