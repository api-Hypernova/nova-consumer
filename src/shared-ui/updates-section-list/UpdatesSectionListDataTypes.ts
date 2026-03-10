// Define the data types
type User = {
  name: string;
  message: string;
  avatar: string; // URL for the avatar image
};

type UpdatesSectionListItem = {
  id: string; // Unique identifier for the notification
  type: string;
  time: string | null; // Can be null if no time is provided
  user: User;
};

type UpdatesSectionListDataType= {
  title: string; // Section title, e.g., "Today" or "Last Week"
  id: string;
  data: UpdatesSectionListItem[]; // Array of notifications in this section
};
