import { createClerkClient } from "@clerk/backend";
import { action } from "../_generated/server";
import { v } from "convex/values";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY || "",
});

export const valid = action({
  args: {
    organizationId: v.string(),
  },
  handler: async (_, args) => {
    try {
      console.log(args.organizationId);
      const organizationId = await clerkClient.organizations.getOrganization({
        organizationId: args.organizationId,
      });
      return { valid: true };
    } catch (error) {
      console.log(error);
      return { valid: false, reason: "Organization not there" };
    }
  },
});
