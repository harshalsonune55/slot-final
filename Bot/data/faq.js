// Static knowledge chunks embedded into the vector store for RAG.
// Keep each chunk short and self-contained — they're retrieved independently.
export const faqChunks = [
  {
    source: "how-it-works",
    text: "Slot is a tech assignment help platform. Students submit an assignment with title, subject, description and deadline (optionally attaching files). An expert reviews it, the student pays, and the expert delivers a completed solution.",
  },
  {
    source: "how-it-works",
    text: "Assignment status lifecycle: 'Pending Payment' means the assignment was submitted but not yet paid for. 'Pending' means it has been paid for and is awaiting expert review. 'In Progress' means an expert is actively working on it. 'Completed' means the solution is ready for the student to download.",
  },
  {
    source: "submission",
    text: "To submit a new assignment, a student provides a title, subject, a description of the requirements, an optional deadline, and can attach a single file (PDF, DOC, DOCX, TXT, image, ZIP or RAR, up to 20MB).",
  },
  {
    source: "payment",
    text: "Payments are processed securely through Razorpay in Indian Rupees (INR). After an assignment is reviewed, the student receives a payment request; once paid, the assignment status moves from 'Pending Payment' to 'Pending' and an expert begins work.",
  },
  {
    source: "support",
    text: "Students can track all of their assignments and payment history from the 'My Assignments' and 'Payments' sections of the Slot dashboard. The Telegram bot can also answer questions about assignment status, payment history, and submit new assignment requests once the student's account is linked.",
  },
  {
    source: "delivery",
    text: "Typical turnaround time for a completed solution is a few hours to a few days depending on the complexity of the assignment and the deadline provided. Students are notified once their assignment status changes to 'Completed'.",
  },
];
