// src/utils/registrationEmailSelector.js

export function getRegistrationEmailTemplate({
  decision,
  studentName,
  eventName,
  eventDates,
}) {
  if (decision === "APPROVED") {
    return {
      subject: `Registration Approved: ${eventName}`,
      body: `
Dear ${studentName},

We are pleased to inform you that your registration for the event
"${eventName}" scheduled on ${eventDates} has been approved.

You may now participate in the event as per the schedule.
Further instructions regarding attendance and feedback will be shared
through the portal.

We look forward to your active participation.

Regards,
AICTE IDEA Lab Team
      `.trim(),
    };
  }

  if (decision === "REJECTED") {
    return {
      subject: `Registration Update: ${eventName}`,
      body: `
Dear ${studentName},

Thank you for your interest in the event
"${eventName}" scheduled on ${eventDates}.

After careful review, we regret to inform you that your registration
could not be approved for this event.

We sincerely encourage you to continue applying for future
AICTE IDEA Lab events, and we look forward to your participation
in upcoming opportunities.

Warm regards,
AICTE IDEA Lab Team
      `.trim(),
    };
  }

  return null;
}