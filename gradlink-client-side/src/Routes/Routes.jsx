import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Verify from "../pages/Verify";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Dashboard Components/DashboardHome";
import Profile from "../Dashboard Components/Profile";
import Projects from "../Dashboard Components/Projects";
import CreateProject from "../Dashboard Components/CreateProject";
import CollaborationRequest from "../Dashboard Components/CollaborationRequest";
import Job from "../Dashboard Components/Job";
import CreateJob from "../Dashboard Components/CreateJob";
import MyJobPost from "../Dashboard Components/MyJobPost";
import Event from "../Dashboard Components/Event";
import CreateEvent from "../Dashboard Components/CreateEvent";
import MyEvents from "../Dashboard Components/MyEvents";
import CreateMentorship from "../Dashboard Components/CreateMentorship";
import Mentorship from "../Dashboard Components/Mentorship";
import MentorshipRequests from "../Dashboard Components/MentorshipRequests";
import Recommendations from "../Dashboard Components/Recommendations";
import Users from "../Dashboard Components/Users";
import UniDatabase from "../Dashboard Components/UniDatabase";
import PendingVerify from "../Dashboard Components/PendingVerify";
import ProjectsDashboard from "../Dashboard Components/ProjectsDashboard";
import AllProjects from "../pages/AllProjects";
import AppliedJobs from "../Dashboard Components/Student Components/AppliedJobs";
import RegisteredEvent from "../Dashboard Components/Student Components/RegisteredEvent";
import AllJobs from "../pages/AllJobs";
import AllMentorshipPosts from "../pages/AllMentorshipPosts";
import PrivateRoutes from "./PrivateRoutes";
import RecommendationsList from "../pages/RecommendationsList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error></Error>,

    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/verify",
        element: (
          <PrivateRoutes>
            <Verify />
          </PrivateRoutes>
        ),
      },
      {
        path: "/allprojects",
        element: <PrivateRoutes><AllProjects /></PrivateRoutes>
      },
      {
        path: "/alljobs",
        element: <PrivateRoutes><AllJobs /></PrivateRoutes>
      },
      {
        path: "/all-mentorship-posts",
        element: <PrivateRoutes><AllMentorshipPosts /></PrivateRoutes>
      },
      {
        path: "/ask-recommendation",
        element: <PrivateRoutes><RecommendationsList /></PrivateRoutes>
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
    children: [
      {
        path: "/dashboard",
        Component: DashboardHome,
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
      {
        path: "/dashboard/projects",
        Component: ProjectsDashboard,
      },
      {
        path: "/dashboard/projects/create",
        Component: CreateProject,
      },
      {
        path: "/dashboard/projects/collaborations",
        Component: CollaborationRequest,
      },
      {
        path: "/dashboard/jobs",
        Component: Job,
      },
      {
        path: "/dashboard/jobs/create",
        Component: CreateJob,
      },
      // {
      //   path: "/dashboard/jobs/job-app",
      //   Component: MyJobPost,
      // },
      {
        path: "/dashboard/events",
        Component: Event,
      },
      {
        path: "/dashboard/events/create",
        Component: CreateEvent,
      },

      {
        path: "/dashboard/mentorship",
        Component: Mentorship,
      },
      {
        path: "/dashboard/mentorship/create",
        Component: CreateMentorship,
      },
      {
        path: "/dashboard/mentorship/requests",
        Component: MentorshipRequests,
      },
      {
        path: "/dashboard/recommendations",
        Component: Recommendations,
      },
      {
        path: "/dashboard/admin/users",
        Component: Users,
      },
      {
        path: "/dashboard/admin/university-database",
        Component: UniDatabase,
      },
      {
        path: "/dashboard/admin/pending-verification",
        Component: PendingVerify,
      },
      {
        path: "/dashboard/admin/verified-users",
      },
      {
        path: "/dashboard/admin/alumni-list",
      },
      {
        path: "/dashboard/admin/students-list",
      },
      {
        path: "/dashboard/admin/reports",
      },
      {
        path: "/dashboard/jobs/applied",
        Component: AppliedJobs,
      },
      {
        path: "/dashboard/events/registered",
        Component: RegisteredEvent,
      },
      {},
    ],
  },
]);
