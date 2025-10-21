# Appointments Calendar Feature

## Overview

The Appointments Calendar feature provides a comprehensive view of all appointments in a calendar format, similar to Google Calendar. It displays appointments from MongoDB and allows users to view detailed information about each appointment.

## Features

### 1. Calendar View

- **Multiple View Options:**
  - Month view (default)
  - Week view
  - Day view
  - List view
- **Color-coded appointments** based on status:
  - 🟡 **Yellow** - Pending
  - 🔵 **Blue** - Confirmed
  - 🟣 **Purple** - In Progress
  - 🟢 **Green** - Completed
  - 🔴 **Red** - Cancelled
  - ⚫ **Gray** - No Show

### 2. Appointment Details Modal

Clicking on any appointment event shows detailed information:

- Patient information (name, email, phone)
- Chiropractor information (name, specialization, email, phone)
- Service details (name, description, duration, price)
- Facility information (name, address, phone)
- Payment details (amount, method, status)
- Appointment notes (if any)

### 3. Role-Based Access

The page adapts based on user role:

- **Patient**: Shows their own appointments with chiropractor names
- **Client Admin/User**: Shows all facility appointments with patient names
- **Chiropractor**: Shows their assigned appointments with patient names

## Technical Implementation

### Frontend Components

#### 1. `AppointmentsPage.tsx`

Location: `src/pages/AppointmentsPage.tsx`

Main calendar page that:

- Fetches appointments based on user role
- Transforms appointments to FullCalendar event format
- Handles event clicks to show details modal
- Provides navigation to booking page

**Key Features:**

- Uses FullCalendar with multiple plugins (dayGrid, timeGrid, interaction, list)
- Responsive design with Tailwind CSS
- Status legend for easy reference
- Empty state with call-to-action button

#### 2. `AppointmentDetailsModal.tsx`

Location: `src/components/dashboard/AppointmentDetailsModal.tsx`

Modal component that displays:

- Status badges (appointment status and payment status)
- Formatted date and time
- All related information (patient, chiropractor, service, facility)
- Payment details

**Features:**

- Color-coded status badges
- Clean, organized layout with sections
- Responsive design

#### 3. `useGetAppointments.ts`

Location: `src/hooks/useGetAppointments.ts`

Custom hook for fetching appointments with:

- Support for multiple query types (facility, patient, chiropractor)
- Loading state management
- Error handling
- TypeScript support

**Usage:**

```typescript
const { sendRequest, loading, errorMessage, appointments } =
  useGetAppointments();

// Fetch facility appointments
sendRequest({ facilityId: 'facility_id' });

// Fetch patient appointments
sendRequest({ patientId: 'patient_id' });

// Fetch chiropractor appointments
sendRequest({ chiropractorId: 'chiropractor_id' });
```

### Backend Updates

#### 1. Updated Controllers

Location: `src/controllers/appointmentController.ts`

Enhanced the following functions with proper population:

- `getFacilityAppointments`: Now populates patient, chiropractor, service, and facility
- `getPatientAppointments`: Full population of related data
- `getChiropractorAppointments`: Complete appointment details

**Population includes:**

- Patient: fullName, email, phone
- Chiropractor: name, specialization, email, phone
- Service: name, description, price, durationMinutes
- Facility: name, address, phoneNumber

All results are sorted by appointmentDate in ascending order.

### Routes

The appointments calendar is available at:

- `/facilities/:facilityId/appointments` - For facility admins/users
- `/patients/:patientId/appointments` - For patients
- `/chiropractor/appointments` - For chiropractors

Protected routes ensure only authorized users can access their respective appointment views.

## Dependencies

### Frontend

- `@fullcalendar/react` - Calendar component
- `@fullcalendar/daygrid` - Month view
- `@fullcalendar/timegrid` - Week/day views
- `@fullcalendar/interaction` - User interactions
- `@fullcalendar/list` - List view
- `date-fns` - Date formatting utilities

### Backend

- `mongoose` - MongoDB ORM (already installed)

## Installation

The necessary dependencies have already been installed. If you need to reinstall:

```bash
cd dentist-appointment-frontend
npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction @fullcalendar/list date-fns
```

## Usage

### For Patients

1. Navigate to "My Appointments" or `/patients/:patientId/appointments`
2. View your appointments in calendar format
3. Click on any appointment to see detailed information
4. Click "Book Appointment" to schedule a new appointment

### For Facility Users (Admin/User)

1. Navigate to facility appointments at `/facilities/:facilityId/appointments`
2. View all facility appointments across all patients and chiropractors
3. Click on any appointment to see patient and service details
4. Click "Create Appointment" to schedule a new appointment for a patient

### For Chiropractors

1. Navigate to `/chiropractor/appointments`
2. View all your assigned appointments
3. Click on any appointment to see patient details
4. See your schedule in calendar format

## Customization

### Changing Calendar Configuration

Edit `AppointmentsPage.tsx` to modify:

- **Initial view**: Change `initialView` prop
- **Time slots**: Modify `slotMinTime` and `slotMaxTime`
- **Weekend display**: Toggle `weekends` prop
- **Max events per day**: Adjust `dayMaxEvents` prop

### Adding More Status Colors

In `AppointmentsPage.tsx`, update the status-to-color mapping in the `calendarEvents` useMemo:

```typescript
switch (appointment.status) {
  case AppointmentStatus.YourNewStatus:
    backgroundColor = '#hexcolor';
    borderColor = '#hexcolor';
    break;
  // ... other cases
}
```

### Customizing Event Title Format

Modify the title-building logic based on user role in the `calendarEvents` useMemo.

## Future Enhancements

Potential features to add:

1. **Drag-and-drop rescheduling**: Allow dragging events to new dates
2. **Filtering**: Add filters by chiropractor, service, or status
3. **Search**: Search appointments by patient name or service
4. **Export**: Export appointments to PDF or CSV
5. **Recurring appointments**: Support for recurring appointment schedules
6. **Real-time updates**: WebSocket integration for live appointment updates
7. **Notifications**: Show upcoming appointments
8. **Appointment creation**: Click on empty calendar slot to create new appointment

## Troubleshooting

### Calendar not showing appointments

1. Check browser console for errors
2. Verify appointments are being fetched (check Network tab)
3. Ensure appointments have valid dates
4. Check that user has proper permissions

### Modal not opening

1. Verify appointment data is properly populated
2. Check console for errors
3. Ensure Modal component is properly imported

### Wrong appointments showing

1. Verify user role is correctly identified
2. Check API endpoint being called
3. Verify backend population is working

## API Endpoints

### Get Facility Appointments

```
GET /api/appointments/facility/:id
Authorization: Bearer token
Roles: ClientAdmin, ClientUser
```

### Get Patient Appointments

```
GET /api/appointments/patient/:id
Authorization: Bearer token
Roles: Patient
```

### Get Chiropractor Appointments

```
GET /api/appointments/chiropractor/:id
Authorization: Bearer token
Roles: Chiropractor
```

All endpoints return:

```json
{
  "result": 10,
  "appointments": [
    {
      "id": "...",
      "appointmentDate": "2025-10-21T14:00:00.000Z",
      "appointmentTime": "14:00",
      "status": "confirmed",
      "paymentStatus": "paid",
      "paymentAmount": 500,
      "patient": {
        "fullName": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890"
      },
      "chiropractor": {
        "name": "Dr. Smith",
        "specialization": "Sports Therapy",
        "email": "smith@example.com"
      },
      "service": {
        "name": "Spinal Adjustment",
        "description": "...",
        "price": 500,
        "durationMinutes": 30
      },
      "facility": {
        "name": "Main Clinic",
        "address": "123 Main St",
        "phoneNumber": "555-0100"
      }
    }
  ]
}
```

## Credits

- Built with [FullCalendar](https://fullcalendar.io/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
