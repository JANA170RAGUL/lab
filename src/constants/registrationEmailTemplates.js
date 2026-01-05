/* =========================================================
   SYSTEM-LOCKED REGISTRATION EMAIL TEMPLATES
   DO NOT MODIFY WITHOUT GOVERNANCE APPROVAL
   ========================================================= */

export const REGISTRATION_EMAIL_TEMPLATES = {
  APPROVAL: {
    subject: "Registration Approved – AICTE IDEA Lab Event",
    body: ({ studentName, eventName, eventDates }) => `
Dear ${studentName},

We are pleased to inform you that your registration for the event
"${eventName}" scheduled on ${eventDates}
has been successfully approved.

You are now eligible to participate in all activities related to this event.
Further instructions regarding attendance and feedback will be shared
through the student portal.

We look forward to your active participation.

Best regards,
AICTE IDEA Lab
`,
  },

  REJECTION: {
    subject: "Registration Update – AICTE IDEA Lab Event",
    body: ({ studentName, eventName }) => `
Dear ${studentName},

Thank you for showing interest in the AICTE IDEA Lab event
"${eventName}".

After careful consideration, we regret to inform you that your
registration could not be approved for this event.

We sincerely encourage you to apply for upcoming IDEA Lab activities,
and we look forward to your participation in future events.

Best wishes for your continued learning journey.

Warm regards,
AICTE IDEA Lab
`,
  },
};