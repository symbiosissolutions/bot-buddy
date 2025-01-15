import { BASE_URL, SECRET_KEY } from "../constants/config";

class BuddyError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "BuddyError";
  }
}

export const buddyService = {
  async searchByTag(tag: string) {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/buddies/${tag}`, {
        headers: {
          "Content-Type": "application/json",
          "secret-key": SECRET_KEY,
        },
      });

      if (!response.ok) {
        throw new BuddyError(
          response.status === 404
            ? `Buddy with tag "${tag}" not found`
            : "Failed to search buddy",
          response.status,
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof BuddyError) {
        throw error;
      }
      throw new BuddyError("Network error occurred");
    }
  },

  async createBuddy(formData: FormData) {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/buddies/create`, {
        method: "POST",
        headers: {
          "secret-key": SECRET_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new BuddyError("Failed to create buddy", response.status);
      }

      return response.json();
    } catch (error) {
      if (error instanceof BuddyError) {
        throw error;
      }
      throw new BuddyError("Network error occurred");
    }
  },

  async updateBuddy(buddyTag: string, formData: FormData) {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/buddies/${buddyTag}`, {
        method: "PUT",
        headers: {
          "secret-key": SECRET_KEY,
          "buddy-tag": buddyTag,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new BuddyError("Failed to update buddy", response.status);
      }

      return response.json();
    } catch (error) {
      if (error instanceof BuddyError) {
        throw error;
      }
      throw new BuddyError("Network error occurred");
    }
  },
};
