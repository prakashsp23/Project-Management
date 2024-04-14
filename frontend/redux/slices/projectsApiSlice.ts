import { apiSlice } from "./apiSlice";
const PROJETS_URL = "/projects";

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProject: builder.mutation({
      query: () => ({
        url: `${PROJETS_URL}/`,
        method: "GET",
      }),
    }),
    getProjectById: builder.mutation({
      query: (data) => ({
        url: `${PROJETS_URL}/${data?.id}`,
        method: "GET",
      }),
    }),
    getProjectsByStudentId: builder.mutation({
      query: (data) => ({
        url: `${PROJETS_URL}/student/${data?.id}`,
        method: "GET",
      }),
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: `${PROJETS_URL}`,
        method: "Post",
        body: data,
      }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${PROJETS_URL}/${data?.id}`,
        method: "Post",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProjectMutation,
  useGetProjectsByStudentIdMutation,
  useCreateProjectMutation,
  useGetProjectByIdMutation,
  useUpdateProjectMutation,
} = projectsApiSlice;
