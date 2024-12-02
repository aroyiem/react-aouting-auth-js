import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEventPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import EventDetailPage, {
    loader as eventDetailLoader,
    action as deleteEventAction,
} from './pages/EventDetailPage.jsx';
import EventsPage, { loader as eventsLoader } from './pages/EventsPage.jsx';
import EventsRootLayout from './pages/EventsRootLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import NewEventPage from './pages/NewEventPage.jsx';
import RootLayout from './pages/RootLayout.jsx';
import { action as manipulateEventAction } from './components/EventForm.jsx';
import NewsletterPage, { action as newsletterAction } from './pages/NewsletterPage.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'events',
                element: <EventsRootLayout />,
                children: [
                    {
                        index: true,
                        element: <EventsPage />,
                        loader: eventsLoader,
                    },
                    {
                        path: ':eventId',
                        id: 'event-detail',
                        loader: eventDetailLoader,
                        children: [
                            {
                                index: true,
                                element: <EventDetailPage />,
                                action: deleteEventAction,
                            },
                            {
                                path: 'edit',
                                element: <EditEventPage />,
                                action: manipulateEventAction,
                            },
                        ],
                    },
                    {
                        path: 'new',
                        element: <NewEventPage />,
                        action: manipulateEventAction,
                    },
                ],
            },
            {
                path: 'newsletter',
                element: <NewsletterPage />,
                action: newsletterAction,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
