import User from "@/models/Users";
import { sendEmail } from "@/utils/data";
import { NextRequest } from "next/server";

type EmailParams = {
  title: string;
  message: string;
  subject: string;
  email: string;
};

export async function POST(request: NextRequest) {
  try {
    let { message, title, subject, email }: EmailParams = await request.json();
    let userInfo = await User.findOne({
      where: { email },
    });

    if (userInfo) {
      await sendEmail({ message, title, subject, email });
      return new Response(
        JSON.stringify({
          message: `Email sent`,
        }),
        { status: 201 },
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Email does not exist.",
        }),
        { status: 404 },
      );
    }
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        message: String(err),
      }),
      { status: 400 },
    );
  }
}
