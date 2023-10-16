import User from "@/models/Users";
import Doctor from "@/models/Doctors";
import Patient from "@/models/Patients";
import Appointment from "@/models/Appointments";

import { NextRequest } from "next/server";
import Room from "@/models/Rooms";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const doctoremail = data.doctorEmail as string;
    const patientemail = data.patientEmail as string;
    const reason = data.reason as string;
    const adminUserId = data.userId as string;
    console.log(adminUserId)
    const note = data.note as string;
    const appointmentDate = data.appointmentDate as string;

    const doctorfromUser = await User.findOne({
      where: { email: doctoremail },
    });
    const patientfromUser = await User.findOne({
      where: { email: patientemail },
    });

    if (doctorfromUser && patientfromUser) {
      const doctorUserId = doctorfromUser.userId;
      const patientUserId = patientfromUser.userId;

      console.log(adminUserId,doctorUserId,patientUserId)
      const rooms = await Room.bulkCreate([
        { userOneId: adminUserId, userTwoId: doctorUserId },
        { userOneId: adminUserId, userTwoId: patientUserId },
        { userOneId: doctorUserId, userTwoId: patientUserId },
      ]);

      const doctor = await Doctor.findOne({ where: { userId: doctorUserId } });
      const patient = await Patient.findOne({
        where: { userId: patientUserId },
      });

      if (doctor && patient) {
        const { doctorId } = doctor.dataValues;
        const { patientId } = patient.dataValues;

        const appointmentOne = await Appointment.create({
          appointmentStatus: "pending",
          doctorId,
          reason,
          note,
          patientId,
          appointmentDate,
        });

        return new Response(
          JSON.stringify({
            message: "New appointment has been created",
            appointmentOne,
            rooms,
          }),
          {
            status: 201,
          },
        );
      } else {
        console.log("Doctor or patient not found.");
        return new Response(JSON.stringify({ message: "missing fields" }), {
          status: 404,
        });
      }
    }
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "server error", error: error.message }),
      {
        status: 400,
      },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const appointmentId = data.appointmentId as string;
    const appointmentStatus = data.appointmentStatus as string;
    const reason = data.reason as string;
    const note = data.note as string;
    const appointmentDate = data.appointmentDate as string;
    const appointment = await Appointment.update(
      {
        note,
        reason,
        appointmentStatus,
        appointmentDate: appointmentDate,
      },
      { where: { appointmentId } },
    );

    return new Response(
      JSON.stringify({
        message: "appointment updated successfully",
        appointment,
      }),
      { status: 202 },
    );
  } catch (error: any) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Server Error", error: error.message }),
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const appointmentId = url.searchParams.get("appointmentId");
    const appointment = await Appointment.findOne({
      where: { appointmentId: appointmentId },
    });
    console.log("the identifier", appointmentId);
    if (!appointment) {
      return new Response(
        JSON.stringify({ message: "appointment not found" }),
        { status: 404 },
      );
    }
    await appointment.destroy();
    return new Response(JSON.stringify({ message: "appointment deleted" }), {
      status: 203,
    });
  } catch (error: any) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Server Error", error: error.message }),
      { status: 500 },
    );
  }
}
