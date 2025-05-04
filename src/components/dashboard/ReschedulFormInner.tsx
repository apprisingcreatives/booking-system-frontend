import { Form, useFormikContext } from "formik";
import {
  Button,
  ErrorTypography,
  InputLabel,
  TimeSelectInput,
} from "../common";
import { useMemo } from "react";
import { DentistAppointment } from "../../hooks/useGetDentistAppointments";

const RescheduleFormInner = ({
  onCancelReschedule,
  errorMessage,
  loading,
  appointmentDates,
}: {
  onCancelReschedule: () => void;
  refetchAppointments: () => void;
  errorMessage: string | null;
  loading: boolean;
  appointmentDates: DentistAppointment[];
}) => {
  const { values } = useFormikContext<{
    appointmentDate: string;
    time: string;
  }>();

  const bookedTimesForDate = useMemo(() => {
    if (!values.appointmentDate) return [];

    return (
      appointmentDates
        ?.filter((appt) => {
          const apptDate = new Date(appt.appointmentDate);
          const datePart = apptDate.toISOString().split("T")[0];
          return datePart === values.appointmentDate;
        })
        .map((appt) => {
          const apptDate = new Date(appt.appointmentDate);
          return apptDate.toTimeString().slice(0, 5);
        }) || []
    );
  }, [appointmentDates, values.appointmentDate]);

  return (
    <Form className="space-y-4">
      {errorMessage && <ErrorTypography>{errorMessage}</ErrorTypography>}
      <div className="flex md:flex-row flex-col justify-between gap-4">
        <InputLabel
          id="appointmentDate"
          label="Select Date"
          name="appointmentDate"
          type="date"
          className="flex-1"
          minDateToday
        />
        <TimeSelectInput
          name="time"
          label="Select Time"
          id="time"
          bookedTimes={bookedTimesForDate}
          className="flex-1"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-2 justify-end">
        <Button variant="primary" type="submit" loading={loading}>
          Reschedule
        </Button>
        <Button variant="secondary" onClick={onCancelReschedule}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default RescheduleFormInner;
