/**
 * Replace these methods with your real backend integration later.
 * The UI already consumes mock data from context, so this file is here to
 * show you the shape of the API layer you can gradually wire in.
 */

export const api = {
  signIn: async (payload: { email: string; password: string }) => {
    console.log("TODO connect signIn", payload);
    return { ok: true };
  },
  fetchProfile: async () => {
    console.log("TODO connect fetchProfile");
    return null;
  },
  fetchOpportunities: async () => {
    console.log("TODO connect fetchOpportunities");
    return [];
  },
  applyToOpportunity: async (opportunityId: string) => {
    console.log("TODO connect applyToOpportunity", opportunityId);
    return { ok: true };
  },
};
