// Data model: supported lead lifecycle statuses
export const STATUSES = [
  "New",
  "Contacted",
  "Follow Up",
  "Appointment Booked",
  "Converted",
  "Lost",
];

// Seed generator: creates realistic in-memory fallback dataset
function generateDummyData() {
  const leads = [];
  const today = new Date();

  for (let i = 0; i < 150; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date();
    createdAt.setDate(today.getDate() - randomDaysAgo);

    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];

    leads.push({
      id: i + 1,
      status,
      revenue: status === "Converted" ? Math.floor(Math.random() * 5000) + 500 : 0,
      createdAt,
    });
  }

  return leads;
}

export const leads = generateDummyData();
