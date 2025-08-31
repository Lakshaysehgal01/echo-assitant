import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const getOne = query({
  args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "Unauthorized",
        message: "Invalid Session",
      });
    }
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      return null;
    }

    return {
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId,
    };
  },
});

export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "Unauthorized",
        message: "Invalid Session",
      });
    }
    const threadId = "123"; // replace when thread creation is present
    const conversationId = await ctx.db.insert("conversations", {
      contactSessionId: session._id,
      organizationId: args.organizationId,
      status: "unresolved",
      threadId,
    });
    return conversationId;
  },
});
