import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Apply Clerk middleware
export const requireAuth = ClerkExpressRequireAuth();
