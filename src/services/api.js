// Mock API Service

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDashboardStats = async (userId) => {
  await delay(600); 

  if (userId === "user1") {
    return {
      totalCalls: 0,
      totalMinutes: 0,
      successRate: 0,
      activeContacts: 0,
    };
  }

  
  return {
    totalCalls: 1248,
    totalMinutes: 3450,
    successRate: 84.5,
    activeContacts: 342,
  };
};

export const fetchRecentCalls = async (userId) => {
  await delay(800);

  if (userId === "user1") {
    return [];
  }

  return [
    {
      id: "call-1",
      contactName: "Alice Johnson",
      contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      duration: 345,
      status: "completed",
      date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), 
      sentiment: "positive",
    },
    {
      id: "call-2",
      contactName: "Bob Smith",
      contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      duration: 120,
      status: "missed",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), 
      sentiment: "neutral",
    },
    {
      id: "call-3",
      contactName: "Charlie Davis",
      contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      duration: 890,
      status: "completed",
      date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), 
      sentiment: "positive",
    },
    {
      id: "call-4",
      contactName: "Diana Prince",
      contactAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
      duration: 45,
      status: "voicemail",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), 
      sentiment: "negative",
    },
  ];
};
